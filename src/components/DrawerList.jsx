import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const DrawerList = ({ menu, menu2, toggleDrawer }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuClick = (path) => {
    navigate(path);
    if (toggleDrawer) toggleDrawer();
  };

  return (
    <div className="h-screen w-64 flex flex-col relative overflow-hidden">
      {/* Enhanced Glassmorphism Background with Gradient Mesh */}
      <div className="absolute inset-0">
        {/* Multi-layer background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-slate-900/90"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-cyan-500/10 via-transparent to-pink-500/10"></div>
        <div className="absolute inset-0 backdrop-blur-xl"></div>
        
        {/* Floating background elements */}
        <div className="absolute top-20 left-8 w-32 h-32 bg-gradient-to-r from-cyan-400/15 to-blue-500/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-4 w-24 h-24 bg-gradient-to-r from-pink-400/15 to-rose-500/15 rounded-full blur-2xl animate-pulse delay-1000"></div>
        
        {/* Glass border */}
        <div className="absolute inset-0 border-r border-white/20 shadow-2xl shadow-black/50"></div>
      </div>
      
      {/* Enhanced Border Animations + Custom Scrollbar Styles */}
      <style jsx>{`
        @keyframes border-dance {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes glow-pulse {
          0%, 100% {
            box-shadow: 
              0 0 20px rgba(0, 240, 181, 0.3),
              0 0 40px rgba(0, 240, 181, 0.2),
              inset 0 0 20px rgba(0, 240, 181, 0.1);
          }
          50% {
            box-shadow: 
              0 0 30px rgba(0, 240, 181, 0.5),
              0 0 60px rgba(0, 240, 181, 0.3),
              inset 0 0 30px rgba(0, 240, 181, 0.2);
          }
        }

        @keyframes floating {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }

        .active-item {
          background: linear-gradient(135deg, 
            rgba(236, 72, 153, 0.3) 0%,
            rgba(251, 113, 133, 0.25) 25%,
            rgba(249, 115, 22, 0.3) 50%,
            rgba(236, 72, 153, 0.25) 75%,
            rgba(249, 115, 22, 0.3) 100%
          );
          background-size: 400% 400%;
          animation: border-dance 3s ease infinite, glow-pulse 2s ease-in-out infinite;
          border: 1px solid rgba(0, 240, 181, 0.4);
          position: relative;
          overflow: visible;
        }

        .active-item::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: inherit;
          background: linear-gradient(45deg, 
            transparent,
            rgba(0, 240, 181, 0.3),
            transparent,
            rgba(236, 72, 153, 0.3),
            transparent
          );
          background-size: 400% 400%;
          animation: border-dance 2s linear infinite;
          z-index: -1;
          filter: blur(4px);
        }

        .floating-element {
          animation: floating 3s ease-in-out infinite;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .neon-glow {
          filter: drop-shadow(0 0 8px rgba(0, 240, 181, 0.6));
        }

        /* Custom Scrollbar Styles for Entire Container */
        .full-scroll-container {
          scroll-behavior: smooth;
          overflow-y: auto;
          height: 100vh;
        }

        .full-scroll-container::-webkit-scrollbar {
          width: 6px;
        }

        .full-scroll-container::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
          margin: 8px;
        }

        .full-scroll-container::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, rgba(0, 240, 181, 0.6), rgba(59, 130, 246, 0.6));
          border-radius: 3px;
          box-shadow: 0 0 10px rgba(0, 240, 181, 0.3);
        }

        .full-scroll-container::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, rgba(0, 240, 181, 0.8), rgba(59, 130, 246, 0.8));
          box-shadow: 0 0 15px rgba(0, 240, 181, 0.5);
        }

        /* Firefox scrollbar */
        .full-scroll-container {
          scrollbar-width: thin;
          scrollbar-color: rgba(0, 240, 181, 0.6) rgba(255, 255, 255, 0.05);
        }

        /* Scroll fade effects for entire container */
        .scroll-container::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 20px;
          background: linear-gradient(to bottom, rgba(51, 65, 85, 0.9) 0%, transparent 100%);
          z-index: 30;
          pointer-events: none;
          width: 256px;
        }

        .scroll-container::after {
          content: '';
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: 20px;
          background: linear-gradient(to top, rgba(51, 65, 85, 0.9) 0%, transparent 100%);
          z-index: 30;
          pointer-events: none;
          width: 256px;
        }
      `}</style>
      
      {/* Entire Scrollable Content Container */}
      <div className="relative z-10 full-scroll-container scroll-container pr-2">
        <div className="min-h-full flex flex-col">
          {/* Enhanced Header Section */}
          <div className="px-6 py-8">
            {/* Logo and Brand with Floating Animation */}
            <div className="flex items-center space-x-4 mb-8 floating-element">
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-cyan-500/30 neon-glow">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                {/* Orbital rings around logo */}
                <div className="absolute inset-0 rounded-2xl border border-cyan-400/30 animate-ping"></div>
                <div className="absolute inset-0 rounded-2xl border border-blue-400/20 animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-white text-2xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                  E-dna
                </h1>
                <p className="text-cyan-300 text-xs uppercase tracking-widest font-semibold">AI/ML Platform</p>
              </div>
            </div>

            {/* Enhanced CML Badge */}
            <div className="glass-card rounded-2xl p-4 mb-6 floating-element" style={{animationDelay: '0.5s'}}>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <span className="text-white text-sm font-semibold">Connected ML</span>
                  <p className="text-emerald-300 text-xs">Status: Active</p>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Navigation Menu */}
          <div className="px-4 mb-8">
            <nav className="space-y-2">
              {menu.map((item, index) => {
                const isActive = location.pathname === item.path;
                return (
                  <div
                    key={index}
                    onClick={() => handleMenuClick(item.path)}
                    className={`
                      group relative flex items-center px-5 py-4 rounded-2xl cursor-pointer transition-all duration-500 ease-out
                      ${isActive 
                        ? 'active-item transform scale-105' 
                        : 'glass-card hover:bg-white/10 hover:shadow-2xl hover:shadow-cyan-500/10 hover:border-cyan-400/30 hover:scale-102'
                      }
                    `}
                    style={{
                      transitionDelay: `${index * 50}ms`
                    }}
                  >
                    {/* Content */}
                    <div className="relative flex items-center space-x-4 w-full z-10">
                      <div className={`
                        flex items-center justify-center w-7 h-7 transition-all duration-300
                        ${isActive 
                          ? 'text-white scale-125 neon-glow' 
                          : 'text-gray-400 group-hover:text-cyan-300 group-hover:scale-110'
                        }
                      `}>
                        {isActive ? item.activeIcon : item.icon}
                      </div>
                      
                      <span className={`
                        text-sm font-medium transition-all duration-300 flex-1
                        ${isActive 
                          ? 'text-white font-bold' 
                          : 'text-gray-300 group-hover:text-white'
                        }
                      `}>
                        {item.name}
                      </span>
                      
                      {/* Enhanced Chevron */}
                      {(item.path === "/data-sources" || item.name === "Data Sources") && (
                        <div className={`
                          transition-all duration-300 
                          ${isActive 
                            ? 'text-cyan-300 rotate-90' 
                            : 'text-gray-500 group-hover:text-cyan-400 group-hover:translate-x-1'
                          }
                        `}>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="transition-transform">
                            <path d="M6 12l4-4-4-4v8z"/>
                          </svg>
                        </div>
                      )}

                      {/* Active indicator dot */}
                      {isActive && (
                        <div className="absolute -right-2 top-1/2 transform -translate-y-1/2">
                          <div className="w-1 h-8 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full neon-glow"></div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </nav>
          </div>

          {/* Enhanced Bottom Section */}
          <div className="px-4 pb-6 mt-auto">
            {/* Elegant Divider */}
            <div className="relative mb-8">
              <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
              <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent blur-sm"></div>
            </div>
            
            {/* Enhanced Notification Bell */}
            <div className="flex justify-center mb-8">
              <button className="relative p-4 glass-card rounded-2xl hover:bg-white/15 border border-white/20 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20 group floating-element">
                <svg width="22" height="22" viewBox="0 0 20 20" fill="currentColor" className="text-gray-400 group-hover:text-cyan-300 transition-colors">
                  <path d="M10 2C7.8 2 6 3.8 6 6v3.5L4.5 11H2v2h16v-2h-2.5L14 9.5V6c0-2.2-1.8-4-4-4zm0 16c1.1 0 2-.9 2-2H8c0 1.1.9 2 2 2z"/>
                </svg>
                {/* Enhanced notification dot */}
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full border-2 border-slate-800 animate-pulse">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full animate-ping opacity-75"></div>
                </div>
              </button>
            </div>
            
            {/* Enhanced Settings Menu */}
            <nav className="space-y-2 mb-6">
              {menu2.map((item, index) => {
                const isActive = location.pathname === item.path;
                return (
                  <div
                    key={index}
                    onClick={() => handleMenuClick(item.path)}
                    className={`
                      group relative flex items-center px-5 py-4 rounded-2xl cursor-pointer transition-all duration-500 ease-out
                      ${isActive 
                        ? 'active-item transform scale-105' 
                        : 'glass-card hover:bg-white/10 hover:shadow-2xl hover:shadow-cyan-500/10 hover:border-cyan-400/30'
                      }
                    `}
                  >
                    <div className="relative flex items-center space-x-4 w-full z-10">
                      <div className={`
                        flex items-center justify-center w-7 h-7 transition-all duration-300
                        ${isActive 
                          ? 'text-white scale-125 neon-glow' 
                          : 'text-gray-400 group-hover:text-cyan-300 group-hover:scale-110'
                        }
                      `}>
                        {isActive ? item.activeIcon : item.icon}
                      </div>
                      
                      <span className={`
                        text-sm font-medium transition-all duration-300 flex-1
                        ${isActive 
                          ? 'text-white font-bold' 
                          : 'text-gray-300 group-hover:text-white'
                        }
                      `}>
                        {item.name}
                      </span>
                    </div>
                  </div>
                );
              })}
            </nav>
            
            {/* Enhanced User Profile Section */}
            <div className="glass-card rounded-2xl p-5 shadow-2xl shadow-black/20 floating-element" style={{animationDelay: '1s'}}>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                    <span className="text-white text-lg font-bold">J</span>
                  </div>
                  {/* Online status indicator */}
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-slate-800 animate-pulse"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-semibold truncate">John Doe</p>
                  <p className="text-cyan-300 text-xs truncate">john@edna.ai</p>
                  <div className="flex items-center mt-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                    <span className="text-green-300 text-xs">Online</span>
                  </div>
                </div>
                {/* Settings icon */}
                <button className="p-2 rounded-lg hover:bg-white/10 transition-colors group">
                  <svg className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrawerList;
