// src/components/graphs/index.tsx
import LineGraph from './LineGraph';
import BarGraph from './BarGraph';
import PieGraph from './PieGraph';
import AreaGraph from './AreaGraph';
import RadarGraph from './RadarGraph';
import ScatterGraph from './ScatterGraph';
import BubbleGraph from './BubbleGraph';
import RadialBarGraph from './RadialBarGraph';

const graphTypes = [
  { type: 'Line', component: LineGraph },
  { type: 'Bar', component: BarGraph },
  { type: 'Pie', component: PieGraph },
  { type: 'Area', component: AreaGraph },
  { type: 'Radar', component: RadarGraph },
  { type: 'Scatter', component: ScatterGraph },
  { type: 'Bubble', component: BubbleGraph },
  { type: 'RadialBar', component: RadialBarGraph },
];

export default graphTypes;
