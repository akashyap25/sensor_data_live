import React from 'react';
import { Line } from 'react-chartjs-2';
import { Tooltip } from 'chart.js';
import 'chartjs-adapter-moment';
import moment from 'moment'; // Import moment library for date formatting
import './chart.css';
import ChartConfig from '../chartConfig';

function Chart({ data }) {
  const formatTimestamp = (timestamp) => {
    return moment(timestamp * 1000).format('MMM D, YYYY h:mm A'); // Convert to milliseconds and format the timestamp to human-readable date and time
  };

  const temperatureHumidityData = {
    labels: data.map((item) => formatTimestamp(item.Timestamp)), // Format timestamp labels
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

  const xYZData = {
    labels: data.map((item) => formatTimestamp(item.Timestamp)), // Format timestamp labels
    datasets: [
      {
        label: 'X',
        data: data.map((item) => item.X),
        borderColor: 'rgba(255, 206, 86, 1)',
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        fill: true,
      },
      {
        label: 'Y',
        data: data.map((item) => item.Y),
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: true,
      },
      {
        label: 'Z',
        data: data.map((item) => item.Z),
        borderColor: 'rgba(0, 255, 0, 1)',
        backgroundColor: 'rgba(0, 255, 0, 0.2)',
        fill: true,
      },
    ],
  };

  const chartOptions = {
    tooltips: {
      enabled: false,
      custom: function (tooltipModel) {
        // Tooltip Element
        var tooltipEl = document.getElementById('chartjs-tooltip');

        // Create element on first render
        if (!tooltipEl) {
          tooltipEl = document.createElement('div');
          tooltipEl.id = 'chartjs-tooltip';
          tooltipEl.innerHTML = '<table></table>';
          document.body.appendChild(tooltipEl);
        }

        // Hide if no tooltip
        if (tooltipModel.opacity === 0) {
          tooltipEl.style.opacity = 0;
          return;
        }

        // Set caret Position
        tooltipEl.classList.remove('above', 'below', 'no-transform');
        if (tooltipModel.yAlign) {
          tooltipEl.classList.add(tooltipModel.yAlign);
        } else {
          tooltipEl.classList.add('no-transform');
        }

        function getBody(bodyItem) {
          return bodyItem.lines;
        }

        // Set Text
        if (tooltipModel.body) {
          var titleLines = tooltipModel.title || [];
          var bodyLines = tooltipModel.body.map(getBody);

          var innerHtml = '<thead>';

          titleLines.forEach(function (title) {
            innerHtml += '<tr><th>' + title + '</th></tr>';
          });
          innerHtml += '</thead><tbody>';

          bodyLines.forEach(function (body, i) {
            var colors = tooltipModel.labelColors[i];
            var style = 'background:' + colors.backgroundColor;
            style += '; border-color:' + colors.borderColor;
            style += '; border-width: 2px';
            var span = '<span style="' + style + '"></span>';
            innerHtml += '<tr><td>' + span + body + '</td></tr>';
          });

          // Display additional data from the dataset
          var datasetIndex = tooltipModel.dataPoints[0].datasetIndex;
          var datasetLabel = tooltipModel.datasets[datasetIndex].label;
          var value = data[tooltipModel.dataPoints[0].index][datasetLabel.toLowerCase()];

          innerHtml += '<tr><td>' + 'Value: ' + value + '</td></tr>';

          innerHtml += '</tbody>';

          var tableRoot = tooltipEl.querySelector('table');
          tableRoot.innerHTML = innerHtml;
        }

        // `this` will be the overall tooltip
        var position = this._chart.canvas.getBoundingClientRect();

        // Display, position, and set styles for font
        tooltipEl.style.opacity = 1;
        tooltipEl.style.position = 'absolute';
        tooltipEl.style.left =
          position.left + window.pageXOffset + tooltipModel.caretX + 'px';
        tooltipEl.style.top =
          position.top + window.pageYOffset + tooltipModel.caretY + 'px';
        tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
        tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
        tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
        tooltipEl.style.padding =
          tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
        tooltipEl.style.pointerEvents = 'none';
      },
    },
  };

  return (
    <div>
      <div className="chart-container">
        <div className="chart-title">Temperature and Humidity Chart</div>
        <Line data={temperatureHumidityData} options={chartOptions} className="chart-canvas" />
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

      <div className="chart-container">
        <div className="chart-title">X, Y, Z Chart</div>
        <Line data={xYZData} options={chartOptions} className="chart-canvas" />
        <div className="chart-legend">
          <div className="chart-legend-item">
            <div className="chart-legend-color" style={{ backgroundColor: 'rgba(255, 206, 86, 1)' }}></div>
            <div className="chart-legend-text">X</div>
          </div>
          <div className="chart-legend-item">
            <div className="chart-legend-color" style={{ backgroundColor: 'rgba(153, 102, 255, 1)' }}></div>
            <div className="chart-legend-text">Y</div>
          </div>
          <div className="chart-legend-item">
            <div className="chart-legend-color" style={{ backgroundColor: 'rgba(0, 255, 0, 1)' }}></div>
            <div className="chart-legend-text">Z</div>
          </div>
        </div>
        <div className="chart-x-axis-label">Time</div>
        <div className="chart-y-axis-label">Value</div>
      </div>
    </div>
  );
}

export default Chart;
