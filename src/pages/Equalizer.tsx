import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Mic, MicOff, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAudioAnalyzer } from '@/hooks/useAudioAnalyzer';
import { CircularEqualizer } from '@/components/CircularEqualizer';
import { TranscriptionPanel } from '@/components/TranscriptionPanel';

export default function Equalizer() {
  const [equalizerSize, setEqualizerSize] = useState(320);
  const {
    isActive,
    error,
    volume,
    startAudio,
    stopAudio,
    getFrequencyData,
  } = useAudioAnalyzer(256);

  const handleToggle = useCallback(async () => {
    if (isActive) {
      stopAudio();
    } else {
      await startAudio();
    }
  }, [isActive, startAudio, stopAudio]);

  // Responsive size calculation
  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setEqualizerSize(240);
      } else if (width < 1024) {
        setEqualizerSize(280);
      } else {
        setEqualizerSize(320);
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary hover:bg-secondary/80 text-sm font-medium text-secondary-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Link>
              <div>
                <h1 className="text-xl font-semibold gradient-text">Audio Equalizer</h1>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Real-time frequency visualization
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium">
              <div className={`w-2 h-2 rounded-full transition-colors ${isActive ? 'bg-green-500' : 'bg-muted-foreground'}`} />
              <span className="text-muted-foreground">{isActive ? 'Active' : 'Idle'}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16">
          {/* Equalizer section */}
          <div className="flex flex-col items-center">
            {/* Equalizer container */}
            <div className="relative p-6 rounded-3xl bg-card border border-border shadow-lg">
              <CircularEqualizer
                isActive={isActive}
                getFrequencyData={getFrequencyData}
                size={equalizerSize}
              />
            </div>

            {/* Controls */}
            <div className="mt-6 flex flex-col items-center gap-3">
              <button
                onClick={handleToggle}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all shadow-md ${
                  isActive
                    ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
                    : 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-primary'
                }`}
              >
                {isActive ? (
                  <>
                    <MicOff className="w-4 h-4" />
                    Stop Recording
                  </>
                ) : (
                  <>
                    <Mic className="w-4 h-4" />
                    Start Recording
                  </>
                )}
              </button>

              {/* Error message */}
              {error && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* Transcription section */}
          <TranscriptionPanel isRecording={isActive} volume={volume} />
        </div>

        {/* Technical info */}
        <div className="mt-12 max-w-2xl mx-auto">
          <div className="p-6 rounded-xl bg-card border border-border shadow-sm">
            <h3 className="text-sm font-semibold text-foreground mb-3">Technical Implementation</h3>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>MediaStream API for microphone access with echo cancellation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Web Audio API with AnalyserNode (FFT size: 256)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Canvas 2D rendering at 60 FPS with requestAnimationFrame</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Web Speech API for real-time speech-to-text</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>High-DPI canvas support for retina displays</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
