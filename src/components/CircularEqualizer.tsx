import { useRef, useEffect, useCallback, memo } from 'react';

interface CircularEqualizerProps {
  isActive: boolean;
  getFrequencyData: () => Uint8Array | null;
  size?: number;
}

export const CircularEqualizer = memo(function CircularEqualizer({ 
  isActive, 
  getFrequencyData, 
  size = 300 
}: CircularEqualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const smoothedDataRef = useRef<Float32Array | null>(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const displaySize = size;
    const centerX = displaySize / 2;
    const centerY = displaySize / 2;
    const baseRadius = displaySize * 0.25;
    const maxBarHeight = displaySize * 0.22;

    // Clear with light background
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, displaySize, displaySize);

    const frequencyData = getFrequencyData();
    const numBars = 48;
    
    // Initialize smoothed data
    if (!smoothedDataRef.current || smoothedDataRef.current.length !== numBars) {
      smoothedDataRef.current = new Float32Array(numBars);
    }

    if (!frequencyData || !isActive) {
      drawIdleState(ctx, centerX, centerY, baseRadius);
      animationRef.current = requestAnimationFrame(draw);
      return;
    }

    // Smooth the frequency data with optimized loop
    const smoothingFactor = 0.25;
    const dataLength = frequencyData.length;
    const smoothedData = smoothedDataRef.current;
    
    for (let i = 0; i < numBars; i++) {
      const dataIndex = Math.floor((i / numBars) * dataLength * 0.75);
      const targetValue = frequencyData[dataIndex] / 255;
      smoothedData[i] += (targetValue - smoothedData[i]) * smoothingFactor;
    }

    // Calculate average volume
    let avgVolume = 0;
    for (let i = 0; i < numBars; i++) {
      avgVolume += smoothedData[i];
    }
    avgVolume /= numBars;

    // Draw outer glow
    drawGlow(ctx, centerX, centerY, baseRadius + maxBarHeight, avgVolume);

    // Draw frequency bars
    const angleStep = (Math.PI * 2) / numBars;
    const startAngle = -Math.PI / 2;

    for (let i = 0; i < numBars; i++) {
      const angle = startAngle + i * angleStep;
      const value = smoothedData[i];
      const barHeight = value * maxBarHeight + 4;
      
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const startX = centerX + cos * baseRadius;
      const startY = centerY + sin * baseRadius;
      const endX = centerX + cos * (baseRadius + barHeight);
      const endY = centerY + sin * (baseRadius + barHeight);

      // Color gradient from blue to purple
      const hue = 220 + (i / numBars) * 42;
      const lightness = 50 + value * 15;
      
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.strokeStyle = `hsl(${hue}, 85%, ${lightness}%)`;
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.stroke();
    }

    // Draw center circle
    drawCenterCircle(ctx, centerX, centerY, baseRadius * 0.7, avgVolume);

    animationRef.current = requestAnimationFrame(draw);
  }, [isActive, getFrequencyData, size]);

  const drawIdleState = (
    ctx: CanvasRenderingContext2D,
    centerX: number,
    centerY: number,
    radius: number
  ) => {
    const time = Date.now() / 1000;
    
    // Subtle pulsing ring
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    const alpha = 0.15 + Math.sin(time * 2) * 0.05;
    ctx.strokeStyle = `hsla(220, 90%, 56%, ${alpha})`;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Center gradient
    const pulseScale = 1 + Math.sin(time * 2.5) * 0.03;
    const gradient = ctx.createRadialGradient(
      centerX, centerY, 0,
      centerX, centerY, radius * 0.6 * pulseScale
    );
    gradient.addColorStop(0, 'hsla(220, 90%, 56%, 0.12)');
    gradient.addColorStop(1, 'hsla(220, 90%, 56%, 0)');
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.6 * pulseScale, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Mic icon hint
    ctx.fillStyle = 'hsla(220, 10%, 46%, 0.6)';
    ctx.font = '600 14px Inter';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🎤', centerX, centerY);
  };

  const drawGlow = (
    ctx: CanvasRenderingContext2D,
    centerX: number,
    centerY: number,
    radius: number,
    intensity: number
  ) => {
    const gradient = ctx.createRadialGradient(
      centerX, centerY, radius * 0.5,
      centerX, centerY, radius * 1.3
    );
    gradient.addColorStop(0, `hsla(220, 90%, 56%, ${intensity * 0.15})`);
    gradient.addColorStop(0.5, `hsla(262, 83%, 58%, ${intensity * 0.08})`);
    gradient.addColorStop(1, 'transparent');
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 1.3, 0, Math.PI * 2);
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
    const scale = 1 + intensity * 0.08;
    const r = radius * scale;
    
    // Fill
    const gradient = ctx.createRadialGradient(
      centerX, centerY, 0,
      centerX, centerY, r
    );
    gradient.addColorStop(0, `hsla(220, 90%, 56%, ${0.2 + intensity * 0.15})`);
    gradient.addColorStop(0.7, `hsla(262, 83%, 58%, ${0.1 + intensity * 0.1})`);
    gradient.addColorStop(1, 'transparent');
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Border
    ctx.beginPath();
    ctx.arc(centerX, centerY, r * 0.85, 0, Math.PI * 2);
    ctx.strokeStyle = `hsla(220, 90%, 56%, ${0.3 + intensity * 0.2})`;
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    
    const ctx = canvas.getContext('2d', { alpha: false });
    if (ctx) {
      ctx.scale(dpr, dpr);
    }

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
      className="rounded-full shadow-lg"
      style={{
        width: size,
        height: size,
        backgroundColor: '#f8fafc',
      }}
    />
  );
});
