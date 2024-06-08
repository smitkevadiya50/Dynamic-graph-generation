// src/components/graphs/ScatterGraph.tsx
import React from 'react';
import {
  ScatterChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Scatter,
  Label,
} from 'recharts';

interface ScatterGraphProps {
  data: any[];
  xKey: string;
  yKey: string;
  width: number;
  height: number;
}

const ScatterGraph: React.FC<ScatterGraphProps> = ({ data, xKey, yKey, width, height }) => {
  return (
    <ScatterChart width={width} height={height} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
      <CartesianGrid />
      <XAxis dataKey="name" name={xKey}>
        <Label value={xKey} offset={-30} position="insideBottom" />
      </XAxis>
      <YAxis dataKey="value" name={yKey}>
        <Label value={yKey} angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
      </YAxis>
      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
      <Scatter name="Scatter" data={data} fill="#8884d8" />
    </ScatterChart>
  );
};

export default ScatterGraph;
