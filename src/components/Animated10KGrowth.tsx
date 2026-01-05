import React, { useState, useEffect, useRef } from 'react';

const Animated10KGrowth = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);
  const chartRef = useRef(null);

  // Chart dimensions
  const width = 800;
  const height = 400;
  const padding = 60;

  // Data points for the curve (exponential growth)
  const generateDataPoints = () => {
    const points = [];
    for (let day = 0; day <= 100; day += 2) {
      // Exponential curve that reaches $10,000 at day 100
      const revenue = Math.pow(day / 100, 2.5) * 10000;
      points.push({
        day,
        revenue: Math.min(revenue, 10000)
      });
    }
    return points;
  };

  const dataPoints = generateDataPoints();

  // Convert data to SVG coordinates
  const getX = (day: number) => padding + (day / 100) * (width - 2 * padding);
  const getY = (revenue: number) => height - padding - (revenue / 10000) * (height - 2 * padding);

  // Create path string for the curve
  const createPath = (progress = 1) => {
    const visiblePoints = dataPoints.slice(0, Math.floor(dataPoints.length * progress));
    if (visiblePoints.length < 2) return '';

    let path = `M ${getX(visiblePoints[0].day)} ${getY(visiblePoints[0].revenue)}`;

    for (let i = 1; i < visiblePoints.length; i++) {
      const curr = visiblePoints[i];
      path += ` L ${getX(curr.day)} ${getY(curr.revenue)}`;
    }

    return path;
  };

  // Create area path for gradient fill
  const createAreaPath = (progress = 1) => {
    const visiblePoints = dataPoints.slice(0, Math.floor(dataPoints.length * progress));
    if (visiblePoints.length < 2) return '';

    let path = `M ${getX(visiblePoints[0].day)} ${getY(0)}`;
    path += ` L ${getX(visiblePoints[0].day)} ${getY(visiblePoints[0].revenue)}`;

    for (let i = 1; i < visiblePoints.length; i++) {
      const curr = visiblePoints[i];
      path += ` L ${getX(curr.day)} ${getY(curr.revenue)}`;
    }

    path += ` L ${getX(visiblePoints[visiblePoints.length - 1].day)} ${getY(0)}`;
    path += ' Z';

    return path;
  };

  // Intersection Observer for visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (chartRef.current) {
      observer.observe(chartRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Animation effect
  useEffect(() => {
    if (isVisible) {
      let start: number | null = null;
      const duration = 3000; // 3 seconds

      const animate = (timestamp: number) => {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setAnimationProgress(easeOutQuart);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isVisible]);

  return (
    <div className="w-full max-w-5xl mx-auto py-16 px-8 relative z-10">
      <div
        ref={chartRef}
        className="bg-black/20 backdrop-blur-xl rounded-2xl p-8 border border-white/25 shadow-2xl"
      >
        <svg
          width="100%"
          height="400"
          viewBox={`0 0 ${width} ${height}`}
          className="overflow-visible"
        >
          {/* Gradient definitions */}
          <defs>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FCD34D" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#FCD34D" stopOpacity="0.05" />
            </linearGradient>

            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#374151" />
              <stop offset={`${animationProgress * 100}%`} stopColor="#FCD34D" />
              <stop offset={`${animationProgress * 100 + 1}%`} stopColor="#374151" />
              <stop offset="100%" stopColor="#374151" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {/* Horizontal grid lines */}
          {[0, 2000, 4000, 6000, 8000, 10000].map((value) => (
            <g key={value}>
              <line
                x1={padding}
                y1={getY(value)}
                x2={width - padding}
                y2={getY(value)}
                stroke="#374151"
                strokeWidth="0.5"
                opacity="0.3"
              />
              <text
                x={padding - 10}
                y={getY(value)}
                fill="#9CA3AF"
                fontSize="12"
                textAnchor="end"
                dominantBaseline="middle"
                className="font-medium"
              >
                ${value.toLocaleString()}
              </text>
            </g>
          ))}

          {/* Vertical grid lines */}
          {[0, 20, 40, 60, 80, 100].map((day) => (
            <g key={day}>
              <line
                x1={getX(day)}
                y1={padding}
                x2={getX(day)}
                y2={height - padding}
                stroke="#374151"
                strokeWidth="0.5"
                opacity="0.3"
              />
              <text
                x={getX(day)}
                y={height - padding + 20}
                fill="#9CA3AF"
                fontSize="12"
                textAnchor="middle"
                className="font-medium"
              >
                {day}
              </text>
            </g>
          ))}

          {/* Area fill */}
          <path
            d={createAreaPath(animationProgress)}
            fill="url(#areaGradient)"
          />

          {/* Main curve line */}
          <path
            d={createPath(animationProgress)}
            stroke="url(#lineGradient)"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Animated dot at the end of the line */}
          {animationProgress > 0 && (
            <circle
              cx={getX(100 * animationProgress)}
              cy={getY(Math.pow(animationProgress, 2.5) * 10000)}
              r="6"
              fill="#FCD34D"
              className="drop-shadow-lg"
            >
              <animate
                attributeName="r"
                values="6;8;6"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
          )}

          {/* Chart title */}
          <text
            x={width / 2}
            y={height / 2 - 40}
            fill="#FFFFFF"
            fontSize="32"
            fontWeight="bold"
            textAnchor="middle"
            className="font-bold"
            opacity={animationProgress > 0.3 ? 1 : 0}
            style={{ transition: 'opacity 0.5s ease-in-out' }}
          >
            The Build to Profit
          </text>
          <text
            x={width / 2}
            y={height / 2 + 10}
            fill="#FFFFFF"
            fontSize="32"
            fontWeight="bold"
            textAnchor="middle"
            className="font-bold"
            opacity={animationProgress > 0.5 ? 1 : 0}
            style={{ transition: 'opacity 0.5s ease-in-out' }}
          >
            Effect
          </text>

          {/* Arrow and "This could be you" text */}
          {animationProgress > 0.7 && (
            <g opacity={animationProgress > 0.7 ? 1 : 0} style={{ transition: 'opacity 0.8s ease-in-out' }}>
              {/* Curved arrow pointing to the top of the curve */}
              <path
                d={`M ${width - 120} ${height / 2 + 80} Q ${width - 80} ${height / 2 + 40} ${width - 100} ${height / 2}`}
                stroke="#FCD34D"
                strokeWidth="2"
                fill="none"
                markerEnd="url(#arrowhead)"
              />

              {/* Arrow head */}
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="7"
                  refX="9"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon
                    points="0 0, 10 3.5, 0 7"
                    fill="#FCD34D"
                  />
                </marker>
              </defs>

              {/* "This could be you" text */}
              <text
                x={width - 120}
                y={height / 2 + 100}
                fill="#FCD34D"
                fontSize="16"
                fontWeight="600"
                textAnchor="middle"
                className="font-semibold"
              >
                This could be you
              </text>
            </g>
          )}

          {/* Axis labels */}
          <text
            x={padding - 40}
            y={height / 2}
            fill="#E5E7EB"
            fontSize="14"
            textAnchor="middle"
            transform={`rotate(-90, ${padding - 40}, ${height / 2})`}
            className="font-semibold"
          >
            Revenue
          </text>

          <text
            x={width / 2}
            y={height - 15}
            fill="#E5E7EB"
            fontSize="14"
            textAnchor="middle"
            className="font-semibold"
          >
            Days
          </text>
        </svg>

        {/* Stats that appear after animation */}
        <div
          className={`grid grid-cols-3 gap-6 mt-8 transition-all duration-1000 ${animationProgress > 0.8 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
        >
          <div className="text-center">
            <div className="text-yellow-400 text-2xl font-bold">$10,000+</div>
            <div className="text-gray-300 text-sm">Monthly Revenue</div>
          </div>
          <div className="text-center">
            <div className="text-yellow-400 text-2xl font-bold">90 Days</div>
            <div className="text-gray-300 text-sm">To Full System</div>
          </div>
          <div className="text-center">
            <div className="text-yellow-400 text-2xl font-bold">380+</div>
            <div className="text-gray-300 text-sm">Success Stories</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Animated10KGrowth; 
