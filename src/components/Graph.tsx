// src/components/Graph.tsx
import React from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Label,
  LabelList,
} from 'recharts';

interface GraphProps {
  data: any[];
  graphType: string;
  xKey: string;
  yKey: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Graph: React.FC<GraphProps> = ({ data, graphType, xKey, yKey }) => {
  const renderGraph = () => {
    switch (graphType) {
      case 'Line':
        return (
          <LineChart width={500} height={300} data={data}>
            <Line type="monotoneX" dataKey="value" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name">
              <Label value={xKey} offset={-5} position="insideBottom" />
            </XAxis>
            <YAxis>
              <Label value={yKey} angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
            </YAxis>
            <Tooltip />
          </LineChart>
        );
      case 'Bar':
        return (
          <BarChart width={500} height={300} data={data}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name">
              <Label value={xKey} offset={-5} position="insideBottom" />
            </XAxis>
            <YAxis>
              <Label value={yKey} angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
            </YAxis>
            <Bar dataKey="value" fill="#8884d8">
              <LabelList dataKey="name" position="top" />
            </Bar>
            <Tooltip />
          </BarChart>
        );
      case 'Pie':
        return (
          <PieChart width={400} height={400}>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        );
      default:
        return null;
    }
  };

  return <div>{renderGraph()}</div>;
};

export default Graph;
