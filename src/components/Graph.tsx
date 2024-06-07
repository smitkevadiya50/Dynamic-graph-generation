// src/components/Graph.tsx
import React, { useRef } from 'react';
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
  ResponsiveContainer,
  Legend,
} from 'recharts';
import html2canvas from 'html2canvas';

interface GraphProps {
  data: any[];
  graphType: string;
  xKey: string;
  yKey: string;
  width: number;
  height: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Graph: React.FC<GraphProps> = ({ data, graphType, xKey, yKey, width, height }) => {
  const graphRef = useRef<HTMLDivElement>(null);

  const downloadImage = async () => {
    if (graphRef.current) {
      const canvas = await html2canvas(graphRef.current);
      const dataURL = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'graph.png';
      link.click();
    }
  };

  const renderGraph = () => {
    switch (graphType) {
      case 'Line':
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
      case 'Bar':
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
      case 'Pie':
        return (
          <PieChart width={width} height={height}>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}`}
              aria-label='inside'
              
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div ref={graphRef}>{renderGraph()}</div>
      <button onClick={downloadImage} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Download Graph</button>
    </div>
  );
};

export default Graph;
