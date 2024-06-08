// src/components/graphs/RadarGraph.tsx
import React from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  Legend,
} from 'recharts';

interface RadarGraphProps {
  data: any[];
  width: number;
  height: number;
}

const RadarGraph: React.FC<RadarGraphProps> = ({ data, width, height }) => {
  return (
    <RadarChart cx={width / 2} cy={height / 2} outerRadius={Math.min(width, height) / 2 - 10} width={width} height={height} data={data}>
      <PolarGrid />
      <PolarAngleAxis dataKey="name" />
      <PolarRadiusAxis />
      <Radar name="Radar" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
      <Tooltip />
      <Legend />
    </RadarChart>
  );
};

export default RadarGraph;
