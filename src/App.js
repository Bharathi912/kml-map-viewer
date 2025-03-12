import React, { useState } from "react";
import FileUploader from "./components/FileUploader";
import SummaryTable from "./components/SummaryTable";
import DetailedTable from "./components/DetailedTable";
import MapViewer from "./components/MapViewer";
import { parseKML, getSummary, getDetails } from "./utils/kmlUtils"; // Import utility functions
import './App.css';
import './index.css';

function App() {
  const [kmlData, setKmlData] = useState(null);
  const [summary, setSummary] = useState(null);
  const [details, setDetails] = useState(null);

  const [showSummary, setShowSummary] = useState(false);
  const [showDetails, setShowDetails] = useState(false);


  const handleFileUpload = async (kmlContent) => {
    const parsedData = await parseKML(kmlContent); // Parse KML content
    setKmlData(parsedData);
    setSummary(null);
    setDetails(null);
  };

  const handleSummary = () => {
    if (kmlData) {
      const summaryData = getSummary(kmlData); // Generate summary
      setSummary(summaryData);
      setDetails(null); // Hide details
      setShowDetails(false);
      setShowSummary(true);
    }
  };

  const handleDetails = () => {
    if (kmlData) {
      const detailsData = getDetails(kmlData); // Generate details
      setDetails(detailsData);
      setSummary(null);
      setShowSummary(false);
      setShowDetails(true);

    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">KML File Viewer</h1>

        {/* File Upload */}
        <div className="mb-4">
          <FileUploader onFileUpload={handleFileUpload} />
        </div>

        {/* Buttons */}
        {kmlData && (
          <div className="flex flex-wrap justify-center gap-4 my-4 sm:flex-nowrap">
            {!showSummary && (
              <button
                onClick={handleSummary}
                className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Show Summary
              </button>
            )}

            {showSummary && (
              <button
                onClick={() => {
                  setShowSummary(false);
                  setSummary(null);
                }}
                className="w-full sm:w-auto px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Close Summary
              </button>
            )}

            {!showDetails && (
              <button
                onClick={handleDetails}
                className="w-full sm:w-auto px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                Show Details
              </button>
            )}

            {showDetails && (
              <button
                onClick={() => {
                  setShowDetails(false);
                  setDetails(null);
                }}
                className="w-full sm:w-auto px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Close Details
              </button>
            )}
          </div>

        )}

        {/* Data Tables */}
        {summary && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Summary</h2>
            <SummaryTable data={summary} />
          </div>
        )}

        {details && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Details</h2>
            <DetailedTable data={details} />
          </div>
        )}

        {/* Map Viewer */}
        {kmlData && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Map View</h2>
            <MapViewer kmlData={kmlData} />
          </div>
        )}
      </div>
    </div>
  );

}

export default App;
