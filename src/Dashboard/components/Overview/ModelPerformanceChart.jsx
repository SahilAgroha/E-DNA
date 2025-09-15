import React, { useEffect, useRef } from 'react';

const ModelPerformanceChart = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 200;

    // Sample data for the curve
    const dataPoints = [
      { x: 0, y: 120 },
      { x: 100, y: 100 },
      { x: 200, y: 140 },
      { x: 300, y: 80 },
      { x: 400, y: 60 },
      { x: 500, y: 40 },
      { x: 600, y: 30 }
    ];

    // Draw gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(0, 'rgba(236, 72, 153, 0.3)');
    gradient.addColorStop(1, 'rgba(59, 130, 246, 0.1)');

    // Draw the curve
    ctx.beginPath();
    ctx.moveTo(0, 200);
    
    dataPoints.forEach((point, index) => {
      if (index === 0) {
        ctx.lineTo(point.x, point.y);
      } else {
        const prevPoint = dataPoints[index - 1];
        const cpx = (prevPoint.x + point.x) / 2;
        ctx.quadraticCurveTo(cpx, prevPoint.y, point.x, point.y);
      }
    });
    
    ctx.lineTo(600, 200);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw the line
    ctx.beginPath();
    ctx.moveTo(dataPoints[0].x, dataPoints[0].y);
    dataPoints.forEach((point, index) => {
      if (index === 0) return;
      const prevPoint = dataPoints[index - 1];
      const cpx = (prevPoint.x + point.x) / 2;
      ctx.quadraticCurveTo(cpx, prevPoint.y, point.x, point.y);
    });
    ctx.strokeStyle = '#ec4899';
    ctx.lineWidth = 3;
    ctx.stroke();
  }, []);

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Model Performance</h2>
      <div className="relative">
        <canvas ref={canvasRef} className="w-full h-auto" />
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
          <div className="bg-gray-800 rounded-lg px-4 py-2 text-center">
            <div className="text-gray-400 text-sm">Accuracy Score</div>
            <div className="text-white text-3xl font-bold">95.8%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelPerformanceChart;
