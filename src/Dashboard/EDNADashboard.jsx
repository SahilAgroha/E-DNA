import React, { useState, useEffect, useRef } from 'react';
import EDNADrawerList from './EDNADrawerList';
import EDNARoutes from '../Routes/EDNARoutes';

// Animated Particles Background Component
const AnimatedBackground = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      const particles = [];
      const numParticles = 150;
      
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.8 + 0.2,
          pulse: Math.random() * 0.02 + 0.01
        });
      }
      return particles;
    };

    const createConnections = () => {
      const connections = [];
      const numConnections = 20;
      
      for (let i = 0; i < numConnections; i++) {
        connections.push({
          startX: Math.random() * canvas.width,
          startY: Math.random() * canvas.height,
          endX: Math.random() * canvas.width,
          endY: Math.random() * canvas.height,
          opacity: Math.random() * 0.3 + 0.1,
          animProgress: Math.random()
        });
      }
      return connections;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw particles
      particlesRef.current.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.opacity += Math.sin(Date.now() * particle.pulse) * 0.01;
        
        // Wrap around edges
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.y < 0) particle.y = canvas.height;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 200, 255, ${Math.abs(particle.opacity)})`;
        ctx.fill();
      });
      
      // Draw connecting lines
      const connectDistance = 120;
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const dx = particlesRef.current[i].x - particlesRef.current[j].x;
          const dy = particlesRef.current[i].y - particlesRef.current[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectDistance) {
            const opacity = (1 - distance / connectDistance) * 0.2;
            ctx.beginPath();
            ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y);
            ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y);
            ctx.strokeStyle = `rgba(100, 200, 255, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      
      animationId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    particlesRef.current = createParticles();
    animate();

    const handleResize = () => {
      resizeCanvas();
      particlesRef.current = createParticles();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{
        background: 'radial-gradient(ellipse at center, #1a2332 0%, #0f1419 70%, #000000 100%)',
      }}
    />
  );
};

const EDNADashboard = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const toggleDrawer = () => {
    // setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Main Dashboard Content */}
      <div className="relative z-10 flex h-screen">
        {/* Sidebar */}
        <div className={`${isDrawerOpen ? 'w-64' : 'w-0'} transition-all duration-300 overflow-hidden lg:block relative z-20`}>
          <EDNADrawerList toggleDrawer={toggleDrawer} />
        </div>
        
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto relative">
          {/* Header */}
          <div className="bg-transparent backdrop-blur-sm border-b border-white/10 p-4 flex items-center justify-between">
            {/* Mobile menu toggle */}
            <button
              onClick={toggleDrawer}
              className="lg:hidden p-2 rounded-md text-white hover:bg-white/10"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
              </svg>
            </button>

            {/* Logo */}
            <div className="text-white text-xl font-bold">
              E-dna <span className="text-sm text-gray-400">AI/ML</span>
            </div>

            {/* Search and Profile */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
                />
                <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center">
                <span className="text-white text-sm font-bold">U</span>
              </div>
            </div>
          </div>
          
          {/* Dashboard Content */}
          <div className="p-6 lg:p-8">
            <EDNARoutes />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EDNADashboard;
