// src/components/DataTable.tsx
import React, { useState, useEffect } from 'react';

interface DataTableProps {
  data: any[];
  onDataChange: (data: any[]) => void;
}

const DataTable: React.FC<DataTableProps> = ({ data, onDataChange }) => {
  const [tableData, setTableData] = useState(data);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const handleCellChange = (rowIndex: number, columnName: string, value: string) => {
    const newData = [...tableData];
    newData[rowIndex] = { ...newData[rowIndex], [columnName]: value };
    setTableData(newData);
    onDataChange(newData);
  };

  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          {Object.keys(data[0]).map((key, columnIndex) => (
            <th key={columnIndex} className="py-2 px-4 border">{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {Object.keys(row).map((columnName, columnIndex) => (
              <td key={columnIndex} className="py-2 px-4 border">
                <input
                  type="text"
                  value={row[columnName]}
                  onChange={(e) => handleCellChange(rowIndex, columnName, e.target.value)}
                  className="w-full"
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
