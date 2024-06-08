// src/components/graphs/LineGraph.tsx
import React from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Label,
} from 'recharts';

interface LineGraphProps {
  data: any[];
  xKey: string;
  yKey: string;
  width: number;
  height: number;
}

const LineGraph: React.FC<LineGraphProps> = ({ data, xKey, yKey, width, height }) => {
  return (
    <LineChart width={width} height={height} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 40 }}>
      <Line type="monotoneX" dataKey="value" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="name">
        <Label value={xKey} offset={-30} position="insideBottom" />
      </XAxis>
      <YAxis>
        <Label value={yKey} angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
      </YAxis>
      <Tooltip />
    </LineChart>
  );
};

export default LineGraph;
