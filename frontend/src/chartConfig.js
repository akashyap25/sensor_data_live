import { Chart, LineController, LineElement, PointElement, LinearScale, TimeScale } from 'chart.js';

Chart.register(LineController, LineElement, PointElement, LinearScale, TimeScale);

export default Chart;
