// src/components/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import Graph from './Graph';

interface DashboardProps {
  data: any[];
}

const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  const [graphType, setGraphType] = useState<string>('Bar');
  const [xKey, setXKey] = useState<string>('');
  const [yKey, setYKey] = useState<string>('');
  const [graphData, setGraphData] = useState<any[]>([]);

  const processData = (data: any[]) => {
    if (!xKey || !yKey) return;

    const aggregatedData: { [key: string]: { count: number; total: number } } = {};

    data.forEach((row) => {
      const xValue = row[xKey];
      const yValue = parseFloat(row[yKey]);

      if (!aggregatedData[xValue]) {
        aggregatedData[xValue] = { count: 0, total: 0 };
      }

      aggregatedData[xValue].count += 1;
      aggregatedData[xValue].total += yValue;
    });

    const processedData = Object.keys(aggregatedData).map((key) => ({
      name: key,
      value: aggregatedData[key].total / aggregatedData[key].count,
    }));

    setGraphData(processedData);
  };

  useEffect(() => {
    if (xKey && yKey) {
      processData(data);
    }
  }, [xKey, yKey, data]);

  return (
    <div className="flex flex-col border-2 p-2 rounded-lg">
      <div className="mb-4">
        <div className='flex justify-between items-center mb-4'>
        <div><h2 className="text-lg font-semibold mb-2">Graph Options:</h2></div>
        <button className="bg-red-500 text-white px-2 py-1 rounded">
              Remove
            </button>
        </div>
        <div className="flex space-x-4 mb-4">
          <div>
            <label className="block mb-1">X-Axis:</label>
            <select value={xKey} onChange={(e) => setXKey(e.target.value)} className="p-2 border rounded">
              <option value="">Select Column</option>
              {Object.keys(data[0]).map((key) => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1">Y-Axis:</label>
            <select value={yKey} onChange={(e) => setYKey(e.target.value)} className="p-2 border rounded">
              <option value="">Select Column</option>
              {Object.keys(data[0]).map((key) => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1">Graph Type:</label>
            <select value={graphType} onChange={(e) => setGraphType(e.target.value)} className="p-2 border rounded">
              <option value="Line">Line</option>
              <option value="Bar">Bar</option>
              <option value="Pie">Pie</option>
            </select>
          </div>
        </div>
      </div>
      <div className="w-full p-2">
        <h2 className="text-lg font-semibold mb-2">Graph:</h2>
        {xKey && yKey ? <Graph data={graphData} graphType={graphType} xKey={xKey} yKey={yKey} /> : <p>Please select columns for X and Y axes.</p>}
      </div>
    </div>
  );
};

export default Dashboard;
