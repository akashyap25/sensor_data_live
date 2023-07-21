import React from 'react';
import ChartConfig from '../chartConfig';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-moment';

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
        type: 'time', // Use 'time' scale for the x-axis
        time: {
          unit: 'day', // You can adjust the time unit as per your data
        },
      },
    },
  };

  return (
    <div>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
}

export default Chart;
