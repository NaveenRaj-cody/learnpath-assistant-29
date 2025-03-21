
import React, { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

const GradientBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Colors based on theme
    const colors = isDark 
      ? ['#1e1b4b', '#312e81', '#4338ca', '#3730a3'] 
      : ['#dbeafe', '#bfdbfe', '#93c5fd', '#60a5fa'];
    
    // Create gradient points
    const points = Array.from({ length: 6 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: Math.random() * 0.5 - 0.25,
      vy: Math.random() * 0.5 - 0.25,
      radius: Math.random() * (isDark ? 600 : 500) + 200,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
    
    const draw = () => {
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Create gradient background
      const baseColor = isDark ? '#030712' : '#f8fafc';
      ctx.fillStyle = baseColor;
      ctx.fillRect(0, 0, width, height);
      
      // Draw gradient blobs
      points.forEach(point => {
        const gradient = ctx.createRadialGradient(
          point.x, point.y, 0, 
          point.x, point.y, point.radius
        );
        
        gradient.addColorStop(0, point.color + (isDark ? '60' : '40'));
        gradient.addColorStop(1, point.color + '00');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Move points slowly
        point.x += point.vx;
        point.y += point.vy;
        
        // Bounce at edges
        if (point.x < 0 || point.x > width) point.vx *= -1;
        if (point.y < 0 || point.y > height) point.vy *= -1;
      });
      
      requestAnimationFrame(draw);
    };
    
    draw();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isDark]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 -z-10 w-full h-full"
      style={{ opacity: 0.8 }}
    />
  );
};

export default GradientBackground;
