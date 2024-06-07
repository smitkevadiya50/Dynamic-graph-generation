// src/components/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import Graph from './Graph';
import Select from 'react-select';

interface DashboardProps {
  data: any[];
  onRemove: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ data, onRemove }) => {
  const [graphType, setGraphType] = useState<string>('Bar');
  const [xKey, setXKey] = useState<string>('');
  const [yKey, setYKey] = useState<string>('');
  const [graphData, setGraphData] = useState<any[]>([]);
  const [width, setWidth] = useState<number>(500);
  const [height, setHeight] = useState<number>(300);
  const [selectedXValues, setSelectedXValues] = useState<any[]>([]);

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

    let processedData = Object.keys(aggregatedData).map((key) => ({
      name: key,
      value: aggregatedData[key].total / aggregatedData[key].count,
    }));

    // Filter the processed data based on selected X values
    if (selectedXValues.length > 0) {
      processedData = processedData.filter(item => selectedXValues.includes(item.name));
    }

    setGraphData(processedData);
  };

  useEffect(() => {
    if (xKey && yKey) {
      processData(data);
    }
  }, [xKey, yKey, data, selectedXValues]);

  const handleXValuesChange = (selectedOptions: any) => {
    if (selectedOptions === null) {
      setSelectedXValues([]);
    } else {
      const values = selectedOptions.map((option: any) => option.value);
      setSelectedXValues(values);
    }
  };

  const xOptions = [...new Set(data.map(item => item[xKey]))].map(value => ({ value, label: value }));

  return (
    <div className="flex flex-col border-2 p-2 rounded-lg">
      <div className="mb-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Graph Options:</h2>
          <button onClick={onRemove} className="bg-red-500 text-white px-2 py-1 rounded">
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
          <div>
            <label className="block mb-1">Width:</label>
            <input
              type="number"
              value={width}
              onChange={(e) => setWidth(parseInt(e.target.value))}
              className="p-2 border rounded w-24"
            />
          </div>
          <div>
            <label className="block mb-1">Height:</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(parseInt(e.target.value))}
              className="p-2 border rounded w-24"
            />
          </div>
        </div>
        {xKey && (
          <div className="flex space-x-4 mb-4">
            <div className="w-full">
              <label className="block mb-1">Select X-Axis Values:</label>
              <Select
                isMulti
                options={xOptions}
                onChange={handleXValuesChange}
                isSearchable
                placeholder="Select X-Axis Values"
                className="p-2 border rounded w-full"
              />
            </div>
          </div>
        )}
      </div>
      <div className="w-full p-2">
        <h2 className="text-lg font-semibold mb-2">Graph:</h2>
        {xKey && yKey ? (
          <Graph data={graphData} graphType={graphType} xKey={xKey} yKey={yKey} width={width} height={height} />
        ) : (
          <p>Please select columns for X and Y axes.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
