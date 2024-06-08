// src/components/graphs/AreaGraph.tsx
import React from 'react';
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Label,
} from 'recharts';

interface AreaGraphProps {
  data: any[];
  xKey: string;
  yKey: string;
  width: number;
  height: number;
}

const AreaGraph: React.FC<AreaGraphProps> = ({ data, xKey, yKey, width, height }) => {
  return (
    <AreaChart width={width} height={height} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 40 }}>
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="name">
        <Label value={xKey} offset={-30} position="insideBottom" />
      </XAxis>
      <YAxis>
        <Label value={yKey} angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
      </YAxis>
      <Tooltip />
      <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
    </AreaChart>
  );
};

export default AreaGraph;
