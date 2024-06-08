// src/components/Graph.tsx
import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import graphTypes from './graphs';

interface GraphProps {
  data: any[];
  graphType: string;
  xKey: string;
  yKey: string;
  width: number;
  height: number;
}

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
    const GraphComponent = graphTypes.find(graph => graph.type === graphType)?.component;
    if (GraphComponent) {
      return <GraphComponent data={data} xKey={xKey} yKey={yKey} width={width} height={height} />;
    }
    return null;
  };

  return (
    <div>
      <div ref={graphRef}>{renderGraph()}</div>
      <button onClick={downloadImage} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Download Graph</button>
    </div>
  );
};

export default Graph;
