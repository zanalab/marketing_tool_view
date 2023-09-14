import React, { useRef, useEffect } from 'react';
import {
  Chart, LineController, LineElement, Filler, PointElement, LinearScale, TimeScale, Tooltip,
} from 'chart.js';
import 'chartjs-adapter-moment';

Chart.register(LineController, LineElement, Filler, PointElement, LinearScale, TimeScale, Tooltip);

function FollowerGrowthChart({ width, height }) {
  const canvas = useRef(null);

  // Hardcoded data
  const labels = [
    "2023-09-12 14:51:15",
    "2023-09-12 14:52:14",
    "2023-09-12 18:56:15",
    "2023-09-12 22:00:58",
    "2023-09-12 22:56:30",
    "2023-09-13 02:56:47",
    "2023-09-13 06:57:04",
    "2023-09-13 10:57:25"
  ];
  const followerData = [
    17753,
    17753,
    17777,
    17789,
    17792,
    17816,
    17824,
    17823
  ];
  const potentialGrowthData = [
    17753,
    17753,
    17777,
    17837,
    17816,
    17825,
    17845,
    17838
  ];

  useEffect(() => {
    const ctx = canvas.current;
    const newChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Followers',
            data: followerData,
            borderColor: 'blue',
            fill: false,
          },
          {
            label: 'Potential Growth',
            data: potentialGrowthData,
            borderColor: 'green',
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
            suggestedMin: 17750, // Setting minimum slightly below the smallest data point
            suggestedMax: 17850, // Setting maximum slightly above the largest data point
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

export default FollowerGrowthChart;
