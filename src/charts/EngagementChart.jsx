import React, { useRef, useEffect } from 'react';
import {
  Chart, LineController, LineElement, Filler, PointElement, LinearScale, TimeScale, Tooltip,
} from 'chart.js';
import 'chartjs-adapter-moment';

Chart.register(LineController, LineElement, Filler, PointElement, LinearScale, TimeScale, Tooltip);

function EngagementChart({ width, height }) {
  const canvas = useRef(null);

  // Hardcoded static data
  const labels = [
    "2023-09-12 14:51:15",
    "2023-09-12 22:00:58"
  ];
  const likeEngagementData = [4.35, 4.29];
  const commentEngagementData = [0.28, 0.27];
  const likeOptimalData = [6, 6];
  const commentOptimalData = [1.5, 1.5];

  useEffect(() => {
    const ctx = canvas.current;
    const newChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Like Engagement',
            data: likeEngagementData,
            borderColor: 'blue',
            fill: false,
          },
          {
            label: 'Comment Engagement',
            data: commentEngagementData,
            borderColor: 'green',
            fill: false,
          },
          {
            label: 'Like Optimal',
            data: likeOptimalData,
            borderColor: 'purple',
            borderDash: [5, 5],
            fill: false,
          },
          {
            label: 'Comment Optimal',
            data: commentOptimalData,
            borderColor: 'orange',
            borderDash: [5, 5],
            fill: false,
          },
        ],
      },
      options: {
        layout: {
          padding: 20,
        },
        scales: {
          y: {
            suggestedMin: 0, 
            suggestedMax: 7, 
          },
          x: {
            type: 'time',
            time: {
              parser: 'YYYY-MM-DD HH:mm:ss',
              unit: 'day',
              tooltipFormat: 'MMM DD, H:mm:ss a',
            },
          },
        },
        plugins: {
          legend: {
            display: true,
          },
        },
        interaction: {
          intersect: false,
          mode: 'nearest',
        },
        animation: false,
        maintainAspectRatio: false,
      },
    });
    return () => newChart.destroy();
  }, []);

  return (
    <div className="grow">
      <canvas ref={canvas} width={width} height={height}></canvas>
    </div>
  );
}

export default EngagementChart;
