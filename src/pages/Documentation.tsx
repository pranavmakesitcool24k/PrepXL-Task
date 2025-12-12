import { FileText, Code, Lightbulb, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';

export default function Documentation() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-10 bg-background/80">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-xl font-semibold gradient-text">Project Documentation</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Fullstack Development Project - Pranav Pardeshi
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Author Info */}
        <section className="mb-10 p-6 rounded-xl card-gradient border border-border">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
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

        {/* Task 1: Frontend */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Code className="w-5 h-5 text-primary" />
            Task 1: Circular Audio Equalizer UI
          </h2>
          
          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-card border border-border">
              <h3 className="text-sm font-semibold text-foreground mb-3">Implementation Details</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                  <span><strong>MediaStream API:</strong> Accesses microphone with echo cancellation, noise suppression, and auto gain control enabled for clean audio input.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                  <span><strong>Web Audio API:</strong> Uses AnalyserNode with FFT size of 512 (256 frequency bins) and smoothingTimeConstant of 0.8 for balanced responsiveness.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                  <span><strong>Canvas Rendering:</strong> Custom circular visualizer with 64 frequency bars arranged radially around a central pulsing orb.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                  <span><strong>60 FPS Animation:</strong> Uses requestAnimationFrame for smooth rendering with data smoothing to prevent jittery movements.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                  <span><strong>Visual Effects:</strong> Dynamic glow effects, gradient coloring (cyan to violet), and responsive scaling for different screen sizes.</span>
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-card border border-border">
              <h3 className="text-sm font-semibold text-foreground mb-3">Key Files</h3>
              <ul className="space-y-1.5 text-sm font-mono text-muted-foreground">
                <li>• src/hooks/useAudioAnalyzer.ts - Audio processing hook</li>
                <li>• src/components/CircularEqualizer.tsx - Canvas visualization</li>
                <li>• src/pages/Equalizer.tsx - Main equalizer page</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Task 2: Backend */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Code className="w-5 h-5 text-primary" />
            Task 2: Real-Time Streaming Transcription Backend
          </h2>
          
          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-card border border-border">
              <h3 className="text-sm font-semibold text-foreground mb-3">Architecture Design</h3>
              <p className="text-sm text-muted-foreground mb-4">
                The backend service would be implemented as a Spring Boot application using WebFlux for reactive streaming.
              </p>
              
              <div className="p-4 rounded-lg bg-secondary/30 font-mono text-xs overflow-x-auto">
                <pre className="text-foreground">{`// Spring Boot Controller (WebFlux)
@RestController
@RequestMapping("/api/transcribe")
public class TranscriptionController {
    
    private final GeminiService geminiService;
    
    @PostMapping(value = "/stream", 
                 consumes = MediaType.APPLICATION_OCTET_STREAM_VALUE,
                 produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<String> streamTranscription(
            @RequestBody Flux<DataBuffer> audioChunks) {
        
        return audioChunks
            .buffer(Duration.ofMillis(100)) // Small buffer for low latency
            .flatMap(chunks -> {
                byte[] audioData = mergeChunks(chunks);
                return geminiService.transcribeChunk(audioData);
            })
            .doOnError(e -> log.error("Transcription error", e));
    }
}

// Gemini API Service
@Service
public class GeminiService {
    
    private final WebClient webClient;
    
    public Flux<String> transcribeChunk(byte[] audioData) {
        return webClient.post()
            .uri("/v1/models/gemini-pro:streamGenerateContent")
            .bodyValue(buildRequest(audioData))
            .retrieve()
            .bodyToFlux(TranscriptionResponse.class)
            .map(response -> response.getText());
    }
}`}</pre>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-card border border-border">
              <h3 className="text-sm font-semibold text-foreground mb-3">Key Features</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span><strong>WebFlux Reactive Streams:</strong> Non-blocking I/O for handling concurrent audio streams efficiently.</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span><strong>SSE (Server-Sent Events):</strong> Real-time streaming of partial transcriptions back to client.</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span><strong>Backpressure Handling:</strong> Manages network fluctuations with reactive backpressure mechanisms.</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span><strong>Chunk Processing:</strong> Audio chunks buffered in 100ms intervals before forwarding to Gemini API.</span>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-1">Implementation Note</h4>
                  <p className="text-xs text-muted-foreground">
                    The Spring Boot backend requires a separate Java runtime environment. The frontend demo includes a 
                    simulated transcription display. For production deployment, the Spring Boot service would run 
                    independently and connect via WebSocket or SSE.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Task 3: Website Enhancement */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-primary" />
            Task 3: PrepXL.app Website Enhancement Suggestions
          </h2>
          
          <div className="space-y-4">
            {/* Hero Section */}
            <div className="p-5 rounded-xl bg-card border border-border">
              <h3 className="text-sm font-semibold text-foreground mb-3">1. Hero Section Improvements</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xs font-semibold text-destructive mb-2">Current Issues:</h4>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li>• Large amount of empty white space</li>
                    <li>• Tagline lacks visual emphasis</li>
                    <li>• Single CTA button without secondary option</li>
                    <li>• No social proof or trust indicators</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-green-500 mb-2">Recommended Changes:</h4>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li>• Add animated background or subtle patterns</li>
                    <li>• Include user count or testimonial snippet</li>
                    <li>• Add secondary CTA like "Watch Demo"</li>
                    <li>• Include company logos or success metrics</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="p-5 rounded-xl bg-card border border-border">
              <h3 className="text-sm font-semibold text-foreground mb-3">2. Navigation & UX</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xs font-semibold text-destructive mb-2">Current Issues:</h4>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li>• Navigation items lack hover feedback</li>
                    <li>• No mobile hamburger menu visible</li>
                    <li>• "Become an Investor" placement unusual</li>
                    <li>• No search functionality</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-green-500 mb-2">Recommended Changes:</h4>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li>• Add hover animations and active states</li>
                    <li>• Implement responsive mobile navigation</li>
                    <li>• Move investor link to footer</li>
                    <li>• Add search bar for interview topics</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Content Carousel */}
            <div className="p-5 rounded-xl bg-card border border-border">
              <h3 className="text-sm font-semibold text-foreground mb-3">3. Topic Tags/Carousel Section</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xs font-semibold text-destructive mb-2">Current Issues:</h4>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li>• Tags appear flat and disconnected</li>
                    <li>• No visual grouping by category</li>
                    <li>• Scrolling behavior unclear to users</li>
                    <li>• Text spacing inconsistent (e.g., "SystemDesign")</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-green-500 mb-2">Recommended Changes:</h4>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li>• Add card styling with hover effects</li>
                    <li>• Group topics by domain (Tech, Medical, etc.)</li>
                    <li>• Add scroll indicators or navigation arrows</li>
                    <li>• Fix text spacing: "System Design"</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Visual Design */}
            <div className="p-5 rounded-xl bg-card border border-border">
              <h3 className="text-sm font-semibold text-foreground mb-3">4. Visual Design Enhancements</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xs font-semibold text-destructive mb-2">Current Issues:</h4>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li>• Color palette limited to purple/white</li>
                    <li>• No visual hierarchy between sections</li>
                    <li>• Button styling too basic</li>
                    <li>• Missing illustrations or icons</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-green-500 mb-2">Recommended Changes:</h4>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li>• Introduce secondary accent colors</li>
                    <li>• Add subtle section backgrounds</li>
                    <li>• Enhance button with gradients/shadows</li>
                    <li>• Add relevant icons to topic cards</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Additional Features */}
            <div className="p-5 rounded-xl bg-card border border-border">
              <h3 className="text-sm font-semibold text-foreground mb-3">5. Additional Feature Suggestions</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span><strong>Progress Tracking:</strong> Add a dashboard preview showing how users can track their interview prep progress.</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span><strong>Testimonials Section:</strong> Include success stories from users who landed jobs using PrepXL.</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span><strong>Feature Comparison:</strong> Add a section comparing PrepXL features vs competitors.</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span><strong>Interactive Demo:</strong> Provide a quick interactive preview of the platform's capabilities.</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span><strong>FAQ Section:</strong> Add common questions about the platform, pricing, and interview prep tips.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Summary */}
        <section className="p-6 rounded-xl card-gradient border border-primary/30">
          <h2 className="text-lg font-semibold text-foreground mb-4">Project Summary</h2>
          <p className="text-sm text-muted-foreground mb-4">
            This project includes a fully functional circular audio equalizer with real-time frequency visualization,
            a demonstration of the streaming transcription interface, comprehensive backend architecture documentation,
            and detailed UI/UX improvement suggestions for PrepXL.app.
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
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-16 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            Submitted by <span className="text-foreground font-medium">Pranav Pardeshi</span>
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            imailpranav24k@gmail.com
          </p>
        </div>
      </footer>
    </div>
  );
}
