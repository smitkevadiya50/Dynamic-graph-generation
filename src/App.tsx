// src/App.tsx
import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar'; // Import the NavBar component
import FilePicker from './components/FilePicker';
import DataTable from './components/DataTable';
import Dashboard from './components/Dashboard';
import LoadingEffect from './components/LoadingScreen'; // Import the new loading component
import Papa from 'papaparse';
import * as XLSX from 'xlsx';

const App: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [dashboards, setDashboards] = useState<number[]>([1]);

  const removeDashboard = (id: number) => {
    setDashboards(dashboards.filter(dashboardId => dashboardId !== id));
  };

  const handleFilesUploaded = (files: File[]) => {
    const file = files[0];
    setLoading(true);
    const reader = new FileReader();

    reader.onload = (event) => {
      const result = event.target?.result;
      if (file.type === 'text/csv') {
        const parsedData = Papa.parse(result as string, { header: true });
        setData(parsedData.data);
        setLoading(false);
      } else if (file.type.includes('excel') || file.type.includes('spreadsheetml')) {
        const workbook = XLSX.read(result, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        setData(jsonData);
        setLoading(false);
      } else {
        setError('File type not supported');
        setLoading(false);
      }
    };

    if (file.type === 'text/csv') {
      reader.readAsText(file);
    } else {
      reader.readAsBinaryString(file);
    }
  };

  const handleDataChange = (updatedData: any[]) => {
    setData(updatedData);
  };

  const addNewDashboard = () => {
    setDashboards([...dashboards, dashboards.length + 1]);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {loading && <LoadingEffect />} {/* Use the new loading component */}
      <NavBar /> {/* Add the NavBar component */}
      <div className="flex flex-col items-center justify-center flex-grow">
        <FilePicker onFilesUploaded={handleFilesUploaded} />
        {error && <p className="text-red-500">{error}</p>}
        {data.length > 0 && (
          <div className="flex flex-col w-full mt-4 p-4">
            <div className="flex justify-between mb-4">
              <h2 className="text-lg font-semibold mb-2">Dashboards</h2>
              <button onClick={addNewDashboard} className="bg-blue-700 text-white px-4 py-2 rounded">
                Add New Dashboard
              </button>
            </div>
            <div className="flex-row xl:flex-row w-full space-y-4 xl:space-y-0 md:space-x-4">
              {dashboards.map((dashboardId) => (
                <Dashboard key={dashboardId} data={data} onRemove={() => removeDashboard(dashboardId)} />
              ))}
            </div>
            <div className="w-full mt-4 p-4">
              <div className="w-full">
                <h2 className="text-lg font-semibold mb-2">Edit Data:</h2>
                <DataTable data={data} onDataChange={handleDataChange} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
