import React from 'react';

const GenusHeatmap = ({ data }) => {
    // In a real application, you would process the 'data' prop to
    // render a heatmap using a library like D3.js or a specialized React component.
    // The data format is Array<[string, number]>, e.g., [["Bacteroides", 192], ["Agaricus", 54]]
    
    if (!data || data.length === 0) {
        return <p className="text-gray-500">No genus data to display.</p>;
    }

    return (
        <div className="bg-gray-100 p-4 rounded-md">
            {/* Placeholder for your charting library's heatmap component */}
            <p>Genus Heatmap will be rendered here.</p>
            <pre className="mt-2 text-xs overflow-auto">
                {JSON.stringify(data, null, 2)}
            </pre>
        </div>
    );
};

export default GenusHeatmap;