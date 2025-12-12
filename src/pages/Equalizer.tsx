import { useState } from 'react';
import { Mic, MicOff, AlertCircle } from 'lucide-react';
import { useAudioAnalyzer } from '@/hooks/useAudioAnalyzer';
import { CircularEqualizer } from '@/components/CircularEqualizer';
import { TranscriptionPanel } from '@/components/TranscriptionPanel';
import { ControlButton } from '@/components/ControlButton';

export default function Equalizer() {
  const [equalizerSize, setEqualizerSize] = useState(380);
  const {
    isActive,
    error,
    volume,
    startAudio,
    stopAudio,
    getFrequencyData,
  } = useAudioAnalyzer(512);

  const handleToggle = async () => {
    if (isActive) {
      stopAudio();
    } else {
      await startAudio();
    }
  };

  // Responsive size calculation
  useState(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setEqualizerSize(280);
      } else if (width < 1024) {
        setEqualizerSize(340);
      } else {
        setEqualizerSize(400);
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold gradient-text">Audio Equalizer</h1>
              <p className="text-xs text-muted-foreground mt-0.5">
                Real-time frequency visualization
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-500 animate-pulse' : 'bg-muted-foreground'}`} />
              {isActive ? 'Active' : 'Idle'}
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">
          {/* Equalizer section */}
          <div className="flex flex-col items-center">
            {/* Equalizer container */}
            <div className="relative">
              {/* Background glow */}
              <div
                className="absolute inset-0 rounded-full blur-3xl opacity-30 transition-opacity duration-500"
                style={{
                  background: isActive
                    ? 'radial-gradient(circle, hsl(190 100% 50% / 0.4), hsl(280 80% 60% / 0.2))'
                    : 'radial-gradient(circle, hsl(190 100% 50% / 0.1), transparent)',
                }}
              />
              
              {/* Equalizer canvas */}
              <div className="relative animate-float">
                <CircularEqualizer
                  isActive={isActive}
                  getFrequencyData={getFrequencyData}
                  size={equalizerSize}
                />
              </div>
            </div>

            {/* Controls */}
            <div className="mt-8 flex flex-col items-center gap-4">
              <ControlButton onClick={handleToggle} isActive={isActive}>
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
              </ControlButton>

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
        <div className="mt-16 max-w-2xl mx-auto">
          <div className="p-6 rounded-xl card-gradient border border-border">
            <h3 className="text-sm font-semibold text-foreground mb-3">Technical Implementation</h3>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>MediaStream API for microphone access with echo cancellation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Web Audio API with AnalyserNode (FFT size: 512, 256 frequency bins)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Canvas 2D rendering at 60 FPS with requestAnimationFrame</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Smooth data interpolation for fluid bar animations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>High-DPI canvas support for retina displays</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
