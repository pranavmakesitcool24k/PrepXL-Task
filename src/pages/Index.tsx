import { Link } from 'react-router-dom';
import { Headphones, FileText, ExternalLink, Github, Mail } from 'lucide-react';

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Header */}
      <header className="relative border-b border-border/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">PP</span>
              </div>
              <span className="font-semibold text-foreground">Pranav Pardeshi</span>
            </div>
            <a 
              href="mailto:imailpranav24k@gmail.com"
              className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
            >
              <Mail className="w-4 h-4" />
              Contact
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Audio Visualizer</span>
            <br />
            <span className="text-foreground">& Transcription Platform</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-2">
            Real-time circular frequency visualization with streaming transcription
          </p>
          <p className="text-sm text-muted-foreground">
            Pranav Pardeshi • December 2024
          </p>
        </div>

        {/* Project Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
          {/* Equalizer Card */}
          <Link 
            to="/equalizer"
            className="group p-6 rounded-2xl card-gradient border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <Headphones className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">Audio Equalizer</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Real-time circular frequency visualizer using Web Audio API with smooth 60 FPS animations and microphone input.
            </p>
            <div className="flex items-center gap-2 text-primary text-sm font-medium">
              Open Demo
              <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Documentation Card */}
          <Link 
            to="/documentation"
            className="group p-6 rounded-2xl card-gradient border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
          >
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
              <FileText className="w-6 h-6 text-accent" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">Documentation</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Complete project documentation including backend architecture, implementation details, and PrepXL.app enhancement suggestions.
            </p>
            <div className="flex items-center gap-2 text-accent text-sm font-medium">
              View Docs
              <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        {/* Tech Stack */}
        <div className="max-w-2xl mx-auto">
          <h3 className="text-center text-sm font-semibold text-muted-foreground mb-4">Built With</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {['React', 'TypeScript', 'Tailwind CSS', 'Web Audio API', 'Canvas 2D', 'Spring Boot (Backend)'].map((tech) => (
              <span 
                key={tech}
                className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Features Overview */}
        <div className="max-w-3xl mx-auto mt-16">
          <h3 className="text-lg font-semibold text-foreground text-center mb-6">Project Features</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                <span className="text-green-500 text-sm font-bold">1</span>
              </div>
              <div>
                <h4 className="text-sm font-medium text-foreground">Circular Audio Equalizer UI</h4>
                <p className="text-xs text-muted-foreground">MediaStream API, Web Audio API, Canvas rendering at 60 FPS</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                <span className="text-green-500 text-sm font-bold">2</span>
              </div>
              <div>
                <h4 className="text-sm font-medium text-foreground">Real-Time Streaming Transcription</h4>
                <p className="text-xs text-muted-foreground">Spring Boot WebFlux architecture with SSE streaming</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                <span className="text-green-500 text-sm font-bold">3</span>
              </div>
              <div>
                <h4 className="text-sm font-medium text-foreground">UI/UX Enhancement Proposals</h4>
                <p className="text-xs text-muted-foreground">Comprehensive audit with specific improvement recommendations</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-border/50 py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-sm text-foreground font-medium">Pranav Pardeshi</p>
              <p className="text-xs text-muted-foreground">imailpranav24k@gmail.com</p>
            </div>
            <p className="text-xs text-muted-foreground">
              Fullstack Development Project • December 2024
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
