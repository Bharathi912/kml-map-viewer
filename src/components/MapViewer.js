import React, { useState } from "react";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function MapViewer({ kmlData }) {

  const [errorMessage, setErrorMessage] = useState(null); 


  const getPolylines = (kmlData) => {
    const polylines = [];
    let hasInvalidCoordinate = false; // Flag to track invalid coordinates


    const traverse = (obj) => {
      if (obj && typeof obj === "object") {
        if (obj.LineString || obj.MultiLineString) {
          const coordinates = obj.LineString?.coordinates || obj.MultiLineString?.coordinates;
          if (coordinates) {
            const points = coordinates
              .trim()
              .split(" ")
              .map((coord) => {
                const [lng, lat] = coord.split(",").map(Number);
                if (isNaN(lat) || isNaN(lng)) {
                  //console.error("Invalid coordinate:", coord); // Log invalid coordinates
                  if (!hasInvalidCoordinate) {
                   // setErrorMessage(true)
                    hasInvalidCoordinate = true; // Set flag to true
                  }
                  return null;
                }
                return [lat, lng];
              })
              .filter((point) => point !== null); // Filter out invalid points
            if (points.length > 0) {
              polylines.push(points);
            }
          }
        }
        Object.values(obj).forEach(traverse);
      }
    };
    traverse(kmlData);
    return polylines;
  };

  const polylines = getPolylines(kmlData);

  if (polylines.length === 0) {
    return <div>No valid polylines found in the KML file.</div>;
  }

  return (

    <>
   

    <MapContainer center={[0, 0]} zoom={2} style={{ height: "400px", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {polylines.map((line, index) => (
        <Polyline key={index} positions={line} />
      ))}
    </MapContainer>
    </>
  );
}

export default MapViewer;