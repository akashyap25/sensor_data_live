import React from 'react';
import ChartConfig from '../chartConfig';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-moment';
import './chart.css';

function Chart({ data }) {
  const chartData = {
    labels: data.map((item) => item.Timestamp),
    datasets: [
      {
        label: 'Temperature',
        data: data.map((item) => item.Temperature),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      },
      {
        label: 'Humidity',
        data: data.map((item) => item.Humidity),
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
        },
      },
    },
    plugins: {
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: (context) => {
            const datasetLabel = context.dataset.label || '';
            const value = context.parsed.y;
            return `${datasetLabel}: ${value}`;
          },
        },
      },
      onClick: (event, elements) => {
        // Handle click event and display alert
        if (elements.length > 0) {
          const { dataIndex } = elements[0];
          const xValue = chartData.labels[dataIndex];
          const datasets = elements.map((element) => element.datasetIndex);
          const dataValues = datasets.reduce((acc, datasetIndex) => {
            const datasetLabel = chartData.datasets[datasetIndex].label;
            const yValue = chartData.datasets[datasetIndex].data[dataIndex];
            acc.push(`${datasetLabel}: ${yValue}`);
            return acc;
          }, []);

          alert(`Time: ${xValue}\n${dataValues.join('\n')}`);
        }
      },
    },
  };

  return (
    <div className="chart-container">
      <div className="chart-title">Temperature and Humidity Chart</div>
      <Line data={chartData} options={chartOptions} className="chart-canvas" />
      <div className="chart-legend">
        <div className="chart-legend-item">
          <div className="chart-legend-color" style={{ backgroundColor: 'rgba(255, 99, 132, 1)' }}></div>
          <div className="chart-legend-text">Temperature</div>
        </div>
        <div className="chart-legend-item">
          <div className="chart-legend-color" style={{ backgroundColor: 'rgba(54, 162, 235, 1)' }}></div>
          <div className="chart-legend-text">Humidity</div>
        </div>
      </div>
      <div className="chart-x-axis-label">Time</div>
      <div className="chart-y-axis-label">Value</div>
    </div>
  );
}

export default Chart;
