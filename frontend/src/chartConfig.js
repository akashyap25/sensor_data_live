import { Chart, LineController, LineElement, PointElement, LinearScale, TimeScale,CategoryScale } from 'chart.js';

Chart.register(LineController, LineElement, PointElement, LinearScale, TimeScale,CategoryScale);

export default Chart;
