import { useRef, useState, useCallback, useEffect } from 'react';

interface AudioAnalyzerState {
  isActive: boolean;
  isInitialized: boolean;
  error: string | null;
  volume: number;
}

interface AudioAnalyzerReturn extends AudioAnalyzerState {
  analyzerRef: React.RefObject<AnalyserNode | null>;
  startAudio: () => Promise<void>;
  stopAudio: () => void;
  getFrequencyData: () => Uint8Array | undefined;
}

export function useAudioAnalyzer(fftSize: number = 256): AudioAnalyzerReturn {
  const [state, setState] = useState<AudioAnalyzerState>({
    isActive: false,
    isInitialized: false,
    error: null,
    volume: 0,
  });

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyzerRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startAudio = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, error: null }));

      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      streamRef.current = stream;

      // Create audio context
      const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      audioContextRef.current = audioContext;

      // Create analyzer node
      const analyzer = audioContext.createAnalyser();
      analyzer.fftSize = fftSize;
      analyzer.smoothingTimeConstant = 0.8;
      analyzerRef.current = analyzer;

      // Create data array for frequency data
      const bufferLength = analyzer.frequencyBinCount;
      dataArrayRef.current = new Uint8Array(bufferLength);

      // Connect microphone to analyzer
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyzer);
      sourceRef.current = source;

      setState({
        isActive: true,
        isInitialized: true,
        error: null,
        volume: 0,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to access microphone';
      setState(prev => ({
        ...prev,
        error: errorMessage,
        isActive: false,
      }));
    }
  }, [fftSize]);

  const stopAudio = useCallback(() => {
    // Stop all tracks
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    // Disconnect source
    if (sourceRef.current) {
      sourceRef.current.disconnect();
      sourceRef.current = null;
    }

    // Close audio context
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    analyzerRef.current = null;
    dataArrayRef.current = null;

    setState({
      isActive: false,
      isInitialized: false,
      error: null,
      volume: 0,
    });
  }, []);

  const getFrequencyData = useCallback(() => {
    if (!analyzerRef.current || !dataArrayRef.current) return undefined;
    
    // Cast to satisfy TypeScript's strict Uint8Array typing
    const dataArray = dataArrayRef.current as unknown as Uint8Array<ArrayBuffer>;
    analyzerRef.current.getByteFrequencyData(dataArray);
    
    // Calculate average volume
    let sum = 0;
    const len = dataArrayRef.current.length;
    for (let i = 0; i < len; i++) {
      sum += dataArrayRef.current[i];
    }
    const avgVolume = sum / len / 255;
    
    setState(prev => ({ ...prev, volume: avgVolume }));
    
    return dataArrayRef.current as Uint8Array;
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, [stopAudio]);

  return {
    ...state,
    analyzerRef,
    startAudio,
    stopAudio,
    getFrequencyData,
  };
}
