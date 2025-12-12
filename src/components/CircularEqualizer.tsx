import { useRef, useEffect, useCallback } from 'react';

interface CircularEqualizerProps {
  isActive: boolean;
  getFrequencyData: () => Uint8Array | null;
  size?: number;
}

export function CircularEqualizer({ isActive, getFrequencyData, size = 400 }: CircularEqualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const smoothedDataRef = useRef<number[]>([]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const baseRadius = Math.min(centerX, centerY) * 0.35;
    const maxBarHeight = Math.min(centerX, centerY) * 0.45;

    // Clear canvas with fade effect for trail
    ctx.fillStyle = 'rgba(12, 15, 20, 0.15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const frequencyData = getFrequencyData();
    
    if (!frequencyData || !isActive) {
      // Draw idle state
      drawIdleState(ctx, centerX, centerY, baseRadius);
      animationRef.current = requestAnimationFrame(draw);
      return;
    }

    // Number of bars around the circle
    const numBars = 64;
    const barsToUse = Math.min(numBars, frequencyData.length);
    
    // Initialize smoothed data if needed
    if (smoothedDataRef.current.length !== barsToUse) {
      smoothedDataRef.current = new Array(barsToUse).fill(0);
    }

    // Smooth the frequency data
    const smoothingFactor = 0.3;
    for (let i = 0; i < barsToUse; i++) {
      const dataIndex = Math.floor((i / barsToUse) * frequencyData.length);
      const targetValue = frequencyData[dataIndex] / 255;
      smoothedDataRef.current[i] += (targetValue - smoothedDataRef.current[i]) * smoothingFactor;
    }

    // Draw outer glow rings
    drawGlowRings(ctx, centerX, centerY, baseRadius, smoothedDataRef.current);

    // Draw frequency bars
    for (let i = 0; i < barsToUse; i++) {
      const angle = (i / barsToUse) * Math.PI * 2 - Math.PI / 2;
      const barHeight = smoothedDataRef.current[i] * maxBarHeight + 2;
      
      const startX = centerX + Math.cos(angle) * baseRadius;
      const startY = centerY + Math.sin(angle) * baseRadius;
      const endX = centerX + Math.cos(angle) * (baseRadius + barHeight);
      const endY = centerY + Math.sin(angle) * (baseRadius + barHeight);

      // Create gradient for each bar
      const gradient = ctx.createLinearGradient(startX, startY, endX, endY);
      const hue = 190 + (i / barsToUse) * 90; // Cyan to violet
      gradient.addColorStop(0, `hsla(${hue}, 100%, 50%, 0.8)`);
      gradient.addColorStop(1, `hsla(${hue}, 100%, 70%, 0.2)`);

      // Draw bar
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Draw glow effect for active bars
      if (smoothedDataRef.current[i] > 0.3) {
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = `hsla(${hue}, 100%, 60%, ${smoothedDataRef.current[i] * 0.3})`;
        ctx.lineWidth = 8;
        ctx.stroke();
      }
    }

    // Draw center circle with pulse
    const avgVolume = smoothedDataRef.current.reduce((a, b) => a + b, 0) / barsToUse;
    drawCenterCircle(ctx, centerX, centerY, baseRadius * 0.6, avgVolume);

    // Draw inner decorative ring
    drawInnerRing(ctx, centerX, centerY, baseRadius * 0.8, avgVolume);

    animationRef.current = requestAnimationFrame(draw);
  }, [isActive, getFrequencyData]);

  const drawIdleState = (
    ctx: CanvasRenderingContext2D,
    centerX: number,
    centerY: number,
    radius: number
  ) => {
    const time = Date.now() / 1000;
    
    // Animated idle ring
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = `hsla(190, 100%, 50%, ${0.3 + Math.sin(time * 2) * 0.1})`;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Pulsing center
    const pulseRadius = radius * 0.5 * (1 + Math.sin(time * 3) * 0.05);
    const gradient = ctx.createRadialGradient(
      centerX, centerY, 0,
      centerX, centerY, pulseRadius
    );
    gradient.addColorStop(0, 'hsla(190, 100%, 50%, 0.3)');
    gradient.addColorStop(1, 'hsla(190, 100%, 50%, 0)');
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, pulseRadius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
  };

  const drawGlowRings = (
    ctx: CanvasRenderingContext2D,
    centerX: number,
    centerY: number,
    radius: number,
    data: number[]
  ) => {
    const avgVolume = data.reduce((a, b) => a + b, 0) / data.length;
    
    // Outer glow
    const gradient = ctx.createRadialGradient(
      centerX, centerY, radius,
      centerX, centerY, radius * 2.5
    );
    gradient.addColorStop(0, `hsla(190, 100%, 50%, ${avgVolume * 0.2})`);
    gradient.addColorStop(0.5, `hsla(240, 80%, 60%, ${avgVolume * 0.1})`);
    gradient.addColorStop(1, 'transparent');
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 2.5, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
  };

  const drawCenterCircle = (
    ctx: CanvasRenderingContext2D,
    centerX: number,
    centerY: number,
    radius: number,
    intensity: number
  ) => {
    const pulseRadius = radius * (1 + intensity * 0.15);
    
    // Gradient fill
    const gradient = ctx.createRadialGradient(
      centerX, centerY, 0,
      centerX, centerY, pulseRadius
    );
    gradient.addColorStop(0, `hsla(190, 100%, 60%, ${0.4 + intensity * 0.3})`);
    gradient.addColorStop(0.7, `hsla(240, 80%, 50%, ${0.2 + intensity * 0.2})`);
    gradient.addColorStop(1, 'transparent');
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, pulseRadius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Border ring
    ctx.beginPath();
    ctx.arc(centerX, centerY, pulseRadius * 0.9, 0, Math.PI * 2);
    ctx.strokeStyle = `hsla(190, 100%, 50%, ${0.5 + intensity * 0.3})`;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  };

  const drawInnerRing = (
    ctx: CanvasRenderingContext2D,
    centerX: number,
    centerY: number,
    radius: number,
    intensity: number
  ) => {
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = `hsla(190, 100%, 50%, ${0.2 + intensity * 0.2})`;
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 8]);
    ctx.stroke();
    ctx.setLineDash([]);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas resolution for retina displays
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }

    // Start animation loop
    animationRef.current = requestAnimationFrame(draw);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [size, draw]);

  return (
    <canvas
      ref={canvasRef}
      className="rounded-full"
      style={{
        width: size,
        height: size,
      }}
    />
  );
}
