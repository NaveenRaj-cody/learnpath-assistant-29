
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
    
    // Colors based on new color palette
    const colors = isDark 
      ? ['#1E88E5', '#43A047', '#7E57C2', '#5c6bc0'] 
      : ['#1E88E5', '#43A047', '#7E57C2', '#64B5F6'];
    
    // Create gradient points - fewer points for cleaner look
    const points = Array.from({ length: 4 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: Math.random() * 0.4 - 0.2, // Slower movement
      vy: Math.random() * 0.4 - 0.2, // Slower movement
      radius: Math.random() * (isDark ? 400 : 350) + 150,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
    
    const draw = () => {
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Create gradient background
      const baseColor = isDark ? '#121212' : '#FFFFFF';
      ctx.fillStyle = baseColor;
      ctx.fillRect(0, 0, width, height);
      
      // Draw gradient blobs with softer gradients
      points.forEach(point => {
        const gradient = ctx.createRadialGradient(
          point.x, point.y, 0, 
          point.x, point.y, point.radius
        );
        
        gradient.addColorStop(0, point.color + (isDark ? '20' : '15')); // More subtle
        gradient.addColorStop(1, point.color + '00');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Move points very slowly
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
      style={{ opacity: 0.7 }} // Reduce opacity for subtlety
    />
  );
};

export default GradientBackground;
