import React, { useState } from "react";

function FileUploader({ onFileUpload }) {
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file type
      if (!file.name.endsWith(".kml")) {
        setError("Invalid file type. Please upload a .kml file.");
        e.target.value = ""; // Clear the file input
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const kmlContent = event.target.result;
        if (validateKML(kmlContent)) {
          setError(""); // Clear any previous error
          onFileUpload(kmlContent); // Pass valid KML content to parent
        } else {
          setError("Invalid KML file structure. Please upload a valid KML file.");
          e.target.value = ""; // Clear the file input
        }
      };
      reader.readAsText(file);
    }
  };

  // Function to validate KML structure
  const validateKML = (kmlContent) => {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(kmlContent, "text/xml");

      // Check for required KML tags
      const kmlTag = xmlDoc.getElementsByTagName("kml");
      const documentTag = xmlDoc.getElementsByTagName("Document");
      const placemarkTag = xmlDoc.getElementsByTagName("Placemark");

      // If any required tag is missing, the file is invalid
      if (kmlTag.length === 0 || documentTag.length === 0 || placemarkTag.length === 0) {
        return false;
      }

      return true; // File is valid
    } catch (error) {
      console.error("Error parsing KML file:", error);
      return false; // File is invalid
    }
  };

  return (
    <div>
      <input type="file" accept=".kml" onChange={handleFileChange} />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default FileUploader;