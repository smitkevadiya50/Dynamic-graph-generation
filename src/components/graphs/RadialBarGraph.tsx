// src/components/graphs/RadialBarGraph.tsx
import React from 'react';
import {
  RadialBarChart,
  RadialBar,
  Legend,
  Tooltip,
  Cell,
} from 'recharts';

interface RadialBarGraphProps {
  data: any[];
  width: number;
  height: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FFBB28', '#00C49F', '#0088FE', '#FF8042'];

const RadialBarGraph: React.FC<RadialBarGraphProps> = ({ data, width, height }) => {
  return (
    <RadialBarChart
      width={width}
      height={height}
      cx="30%" // Center the chart horizontally
      cy="50%" // Center the chart vertically
      innerRadius="10%"
      outerRadius="100%"
      data={data}
    >
      <RadialBar
        background
        dataKey="value"
        label={false} // Disable labels inside the chart
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </RadialBar>
      <Tooltip />
      <Legend
        verticalAlign="middle"
        align="right"
        layout="vertical"
        wrapperStyle={{ maxHeight: height - 20, maxWidth: width / 3, overflowY: 'auto', marginLeft: 20 }}
        payload={data.map((item, index) => ({
          id: item.name,
          type: 'square',
          value: item.name,
          color: COLORS[index % COLORS.length],
        }))}
      />
    </RadialBarChart>
  );
};

export default RadialBarGraph;
