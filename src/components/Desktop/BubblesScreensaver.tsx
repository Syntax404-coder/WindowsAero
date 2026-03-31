"use client";

import React, { useEffect, useRef, useCallback } from 'react';

interface Bubble {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  opacity: number;
}

const BUBBLE_COLORS = [
  { main: '#0080ff', rim: 'rgba(0, 128, 255, 0.5)' }, // Vista Blue
  { main: '#ff0080', rim: 'rgba(255, 0, 128, 0.5)' }, // Vista Pink/Red
  { main: '#a000ff', rim: 'rgba(160, 0, 255, 0.5)' }, // Vista Purple
];

export default function BubblesScreensaver() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bubblesRef = useRef<Bubble[]>([]);
  const requestRef = useRef<number>();

  const initBubbles = (width: number, height: number) => {
    const bubbles: Bubble[] = [];
    const count = 14;
    for (let i = 0; i < count; i++) {
      const radius = 35 + Math.random() * 45;
      const colorData = BUBBLE_COLORS[Math.floor(Math.random() * BUBBLE_COLORS.length)];
      bubbles.push({
        x: Math.random() * (width - radius * 2) + radius,
        y: Math.random() * (height - radius * 2) + radius,
        vx: (Math.random() - 0.5) * 2.2,
        vy: (Math.random() - 0.5) * 2.2,
        radius,
        color: colorData.main,
        opacity: 0.15 + Math.random() * 0.15,
      });
    }
    bubblesRef.current = bubbles;
  };

  const rotate = (vx: number, vy: number, angle: number) => {
    return {
      x: vx * Math.cos(angle) - vy * Math.sin(angle),
      y: vx * Math.sin(angle) + vy * Math.cos(angle),
    };
  };

  const resolveCollision = useCallback((b1: Bubble, b2: Bubble) => {
    const xVelocityDiff = b1.vx - b2.vx;
    const yVelocityDiff = b1.vy - b2.vy;

    const xDist = b2.x - b1.x;
    const yDist = b2.y - b1.y;

    // Prevent accidental overlap
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
      const angle = -Math.atan2(b2.y - b1.y, b2.x - b1.x);

      const m1 = 1;
      const m2 = 1;

      const u1 = rotate(b1.vx, b1.vy, angle);
      const u2 = rotate(b2.vx, b2.vy, angle);

      const v1 = { x: (u1.x * (m1 - m2)) / (m1 + m2) + (u2.x * 2 * m2) / (m1 + m2), y: u1.y };
      const v2 = { x: (u2.x * (m1 - m2)) / (m1 + m2) + (u1.x * 2 * m2) / (m1 + m2), y: u2.y };

      const vFinal1 = rotate(v1.x, v1.y, -angle);
      const vFinal2 = rotate(v2.x, v2.y, -angle);

      b1.vx = vFinal1.x;
      b1.vy = vFinal1.y;
      b2.vx = vFinal2.x;
      b2.vy = vFinal2.y;
    }
  }, []);

  const update = useCallback((width: number, height: number) => {
    const bubbles = bubblesRef.current;
    
    // Boundary collision
    bubbles.forEach(b => {
      if (b.x + b.radius >= width || b.x - b.radius <= 0) b.vx = -b.vx;
      if (b.y + b.radius >= height || b.y - b.radius <= 0) b.vy = -b.vy;
      
      b.x += b.vx;
      b.y += b.vy;

      // Handle inter-bubble collision
      bubbles.forEach(other => {
        if (b === other) return;
        const dx = b.x - other.x;
        const dy = b.y - other.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < b.radius + other.radius) {
          resolveCollision(b, other);
        }
      });
    });
  }, [resolveCollision]);

  const draw = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height);
    
    bubblesRef.current.forEach(b => {
      const colorSet = BUBBLE_COLORS.find(c => c.main === b.color) || BUBBLE_COLORS[0];
      
      ctx.save();
      
      // 1. Spectral Outer Glow (Rainbow Rim)
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.radius + 1, 0, Math.PI * 2);
      const rimGradient = ctx.createRadialGradient(b.x, b.y, b.radius - 2, b.x, b.y, b.radius + 1);
      rimGradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
      rimGradient.addColorStop(0.5, colorSet.rim);
      rimGradient.addColorStop(1, 'rgba(255, 255, 255, 0.1)');
      ctx.fillStyle = rimGradient;
      ctx.fill();

      // 2. Main Bubble Body (Translucent)
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
      const bodyGradient = ctx.createRadialGradient(
        b.x - b.radius * 0.2,
        b.y - b.radius * 0.2,
        b.radius * 0.2,
        b.x,
        b.y,
        b.radius
      );
      bodyGradient.addColorStop(0, 'rgba(255, 255, 255, 0.05)');
      bodyGradient.addColorStop(0.7, `rgba(${hexToRgb(b.color)}, 0.15)`);
      bodyGradient.addColorStop(1, `rgba(${hexToRgb(b.color)}, 0.4)`);
      ctx.fillStyle = bodyGradient;
      ctx.fill();

      // 3. Primary Specular Highlight (The 10 o'clock Shine)
      ctx.beginPath();
      ctx.ellipse(
        b.x - b.radius * 0.45,
        b.y - b.radius * 0.45,
        b.radius * 0.3,
        b.radius * 0.2,
        Math.PI / 4,
        0,
        Math.PI * 2
      );
      const shineGradient = ctx.createRadialGradient(
        b.x - b.radius * 0.45,
        b.y - b.radius * 0.45,
        0,
        b.x - b.radius * 0.45,
        b.y - b.radius * 0.45,
        b.radius * 0.3
      );
      shineGradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
      shineGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = shineGradient;
      ctx.fill();

      // 4. Secondary Reflection (Bottom Right)
      ctx.beginPath();
      ctx.arc(b.x + b.radius * 0.4, b.y + b.radius * 0.4, b.radius * 0.15, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.fill();

      ctx.restore();
    });
  }, []);

  function hexToRgb(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? 
      `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : 
      '255, 255, 255';
  }

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    update(canvas.width, canvas.height);
    draw(ctx, canvas.width, canvas.height);
    requestRef.current = requestAnimationFrame(animate);
  }, [update, draw]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (bubblesRef.current.length === 0) {
        initBubbles(canvas.width, canvas.height);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [animate]);

  return (
    <canvas 
      ref={canvasRef} 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100vw', 
        height: '100vh', 
        zIndex: 9999, 
        pointerEvents: 'none',
        background: 'transparent'
      }} 
    />
  );
}
