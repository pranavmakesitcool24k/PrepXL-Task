import { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Loader2, Volume2 } from 'lucide-react';

interface TranscriptionPanelProps {
  isRecording: boolean;
  volume: number;
}

export function TranscriptionPanel({ isRecording, volume }: TranscriptionPanelProps) {
  const [transcription, setTranscription] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [currentPartial, setCurrentPartial] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Simulate streaming transcription for demo purposes
  // In production, this would connect to the Spring Boot WebSocket server
  useEffect(() => {
    if (!isRecording) {
      setIsConnected(false);
      setCurrentPartial('');
      return;
    }

    setIsConnected(true);

    // Simulated transcription for demonstration
    const demoTexts = [
      "Hello, this is a demonstration",
      "of real-time audio transcription",
      "The system captures your voice",
      "and converts it to text instantly",
      "This would connect to Gemini API",
      "via the Spring Boot backend service",
    ];

    let textIndex = 0;
    let charIndex = 0;

    const interval = setInterval(() => {
      if (!isRecording) return;

      if (textIndex < demoTexts.length) {
        const currentText = demoTexts[textIndex];
        
        if (charIndex < currentText.length) {
          setCurrentPartial(currentText.substring(0, charIndex + 1));
          charIndex++;
        } else {
          setTranscription(prev => [...prev, currentText]);
          setCurrentPartial('');
          textIndex++;
          charIndex = 0;
        }
      } else {
        textIndex = 0;
      }
    }, 80);

    return () => clearInterval(interval);
  }, [isRecording]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [transcription, currentPartial]);

  return (
    <div className="w-full max-w-md">
      {/* Connection status */}
      <div className="flex items-center justify-between mb-4 px-4 py-2 rounded-lg bg-secondary/50">
        <div className="flex items-center gap-2">
          {isRecording ? (
            <Mic className="w-4 h-4 text-primary animate-pulse" />
          ) : (
            <MicOff className="w-4 h-4 text-muted-foreground" />
          )}
          <span className="text-sm font-medium">
            {isRecording ? 'Recording...' : 'Microphone Off'}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              isConnected ? 'bg-green-500' : 'bg-muted-foreground'
            }`}
          />
          <span className="text-xs text-muted-foreground">
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </div>

      {/* Volume indicator */}
      {isRecording && (
        <div className="mb-4 px-4">
          <div className="flex items-center gap-2 mb-1">
            <Volume2 className="w-3 h-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Input Level</span>
          </div>
          <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-75"
              style={{ width: `${Math.min(volume * 200, 100)}%` }}
            />
          </div>
        </div>
      )}

      {/* Transcription area */}
      <div
        ref={scrollRef}
        className="h-64 p-4 rounded-xl bg-card border border-border overflow-y-auto"
      >
        {transcription.length === 0 && !currentPartial ? (
          <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
            {isRecording ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin mb-2" />
                <p className="text-sm">Listening for speech...</p>
              </>
            ) : (
              <>
                <Mic className="w-6 h-6 mb-2 opacity-50" />
                <p className="text-sm">Click "Start Recording" to begin</p>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            {transcription.map((text, index) => (
              <p
                key={index}
                className="text-sm text-foreground opacity-90 animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {text}
              </p>
            ))}
            {currentPartial && (
              <p className="text-sm text-primary">
                {currentPartial}
                <span className="animate-pulse">|</span>
              </p>
            )}
          </div>
        )}
      </div>

      {/* Info note */}
      <p className="mt-3 text-xs text-muted-foreground text-center px-4">
        Note: This demo simulates transcription. In production, audio chunks would stream 
        to the Spring Boot backend and forward to Gemini API for real transcription.
      </p>
    </div>
  );
}
