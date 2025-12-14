import { useEffect, useRef, memo } from 'react';
import { Mic, MicOff, Loader2, Volume2, AlertCircle } from 'lucide-react';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';

interface TranscriptionPanelProps {
  isRecording: boolean;
  volume: number;
}

export const TranscriptionPanel = memo(function TranscriptionPanel({ 
  isRecording, 
  volume 
}: TranscriptionPanelProps) {
  const {
    transcript,
    interimTranscript,
    isListening,
    isSupported,
    error,
    startListening,
    stopListening,
    clearTranscript,
  } = useSpeechRecognition();
  
  const scrollRef = useRef<HTMLDivElement>(null);

  // Start/stop speech recognition based on recording state
  useEffect(() => {
    if (isRecording) {
      clearTranscript();
      startListening();
    } else {
      stopListening();
    }
  }, [isRecording, startListening, stopListening, clearTranscript]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [transcript, interimTranscript]);

  return (
    <div className="w-full max-w-md">
      {/* Connection status */}
      <div className="flex items-center justify-between mb-4 px-4 py-3 rounded-xl bg-card border border-border shadow-sm">
        <div className="flex items-center gap-2">
          {isRecording ? (
            <Mic className="w-4 h-4 text-primary" />
          ) : (
            <MicOff className="w-4 h-4 text-muted-foreground" />
          )}
          <span className="text-sm font-medium text-foreground">
            {isRecording ? 'Recording...' : 'Microphone Off'}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full transition-colors ${
              isListening ? 'bg-green-500' : 'bg-muted-foreground'
            }`}
          />
          <span className="text-xs text-muted-foreground font-medium">
            {isListening ? 'Listening' : 'Idle'}
          </span>
        </div>
      </div>

      {/* Browser support warning */}
      {!isSupported && (
        <div className="mb-4 px-4 py-2 rounded-lg bg-amber-50 border border-amber-200 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600" />
          <span className="text-xs text-amber-700">
            Speech recognition not supported. Try Chrome or Edge.
          </span>
        </div>
      )}

      {/* Error display */}
      {error && (
        <div className="mb-4 px-4 py-2 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-destructive" />
          <span className="text-xs text-destructive">{error}</span>
        </div>
      )}

      {/* Volume indicator */}
      {isRecording && (
        <div className="mb-4 px-4">
          <div className="flex items-center gap-2 mb-1">
            <Volume2 className="w-3 h-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground font-medium">Input Level</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-100 rounded-full"
              style={{ width: `${Math.min(volume * 200, 100)}%` }}
            />
          </div>
        </div>
      )}

      {/* Transcription area */}
      <div
        ref={scrollRef}
        className="h-64 p-4 rounded-xl bg-card border border-border shadow-sm overflow-y-auto"
      >
        {transcript.length === 0 && !interimTranscript ? (
          <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
            {isRecording ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin mb-2 text-primary" />
                <p className="text-sm font-medium">Listening for speech...</p>
                <p className="text-xs mt-1">Speak clearly into your microphone</p>
              </>
            ) : (
              <>
                <Mic className="w-6 h-6 mb-2 text-muted-foreground/50" />
                <p className="text-sm">Click "Start Recording" to begin</p>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            {transcript.map((text, index) => (
              <p
                key={index}
                className="text-sm text-foreground leading-relaxed"
              >
                {text}
              </p>
            ))}
            {interimTranscript && (
              <p className="text-sm text-primary font-medium">
                {interimTranscript}
                <span className="animate-pulse ml-0.5">|</span>
              </p>
            )}
          </div>
        )}
      </div>

      {/* Info note */}
      <p className="mt-3 text-xs text-muted-foreground text-center">
        Real-time speech recognition powered by Web Speech API
      </p>
    </div>
  );
});
