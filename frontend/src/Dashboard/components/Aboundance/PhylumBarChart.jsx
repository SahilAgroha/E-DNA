import React from 'react';

const PhylumBarChart = ({ data }) => {
    // In a real application, you would process the 'data' prop and
    // render a chart using a library like Recharts or Chart.js.
    // The data format is Array<[string, number]>, e.g., [["Bacteria", 1170], ["Eukaryota", 953]]

    if (!data || data.length === 0) {
        return <p className="text-gray-500">No phylum data to display.</p>;
    }

    return (
        <div className="bg-gray-100 p-4 rounded-md">
            {/* Placeholder for your charting library's component */}
            <p>Phylum Bar Chart will be rendered here.</p>
            <pre className="mt-2 text-xs overflow-auto">
                {JSON.stringify(data, null, 2)}
            </pre>
        </div>
    );
};

export default PhylumBarChart;