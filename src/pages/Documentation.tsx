import { FileText, Sparkles, User } from 'lucide-react';

export default function Documentation() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-10 bg-background/80">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-xl font-semibold gradient-text">Project Documentation</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Project Summary */}
        <section className="mb-10 p-6 rounded-xl card-gradient border border-primary/30">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Project Summary
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            This project showcases a circular audio equalizer with real-time frequency visualization,
            a streaming transcription interface, and UI/UX improvement recommendations for PrepXL.app.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">React</span>
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">TypeScript</span>
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">Web Audio API</span>
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">Canvas 2D</span>
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">Spring Boot</span>
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">WebFlux</span>
          </div>
        </section>

        {/* Key Features */}
        <section className="mb-10 p-6 rounded-xl bg-card border border-border">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Key Features
          </h2>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
              <span><strong className="text-foreground">Real-Time Audio Visualization:</strong> Circular equalizer using Web Audio API with 256 frequency bins and 60 FPS canvas rendering.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
              <span><strong className="text-foreground">Microphone Integration:</strong> MediaStream API with noise suppression and echo cancellation for clean audio input.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
              <span><strong className="text-foreground">Streaming Transcription:</strong> Spring Boot WebFlux backend architecture for real-time audio-to-text conversion.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
              <span><strong className="text-foreground">Dynamic Visual Effects:</strong> Gradient coloring, glow effects, and responsive pulsing animations.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
              <span><strong className="text-foreground">PrepXL.app Analysis:</strong> Comprehensive UI/UX improvement suggestions for hero section, navigation, and visual design.</span>
            </li>
          </ul>
        </section>

        {/* Author Information */}
        <section className="p-6 rounded-xl card-gradient border border-border">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            Author Information
          </h2>
          <div className="grid gap-3 text-sm">
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground w-20">Name:</span>
              <span className="text-foreground font-medium">Pranav Pardeshi</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground w-20">Email:</span>
              <span className="text-foreground font-medium">imailpranav24k@gmail.com</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground w-20">Date:</span>
              <span className="text-foreground font-medium">December 2024</span>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-16 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs text-muted-foreground">
            © 2024 Pranav Pardeshi. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
