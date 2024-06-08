// src/components/graphs/BarGraph.tsx
import React from 'react';
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Label,
} from 'recharts';

interface BarGraphProps {
  data: any[];
  xKey: string;
  yKey: string;
  width: number;
  height: number;
}

const BarGraph: React.FC<BarGraphProps> = ({ data, xKey, yKey, width, height }) => {
  return (
    <BarChart width={width} height={height} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 40 }}>
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="name">
        <Label value={xKey} offset={-30} position="insideBottom" />
      </XAxis>
      <YAxis>
        <Label value={yKey} angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
      </YAxis>
      <Bar dataKey="value" fill="#8884d8" />
      <Tooltip />
    </BarChart>
  );
};

export default BarGraph;
