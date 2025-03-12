import { parseStringPromise } from "xml2js";

export const parseKML = async (kmlContent) => {
  const result = await parseStringPromise(kmlContent, { explicitArray: false });
  return result;
};

export const getSummary = (kmlData) => {
  const counts = {};
  const traverse = (obj) => {
    if (obj && typeof obj === "object") {
      if (obj.name) {
        counts[obj.name] = (counts[obj.name] || 0) + 1;
      }
      Object.values(obj).forEach(traverse);
    }
  };
  traverse(kmlData);
  return counts;
};

export const getDetails = (kmlData) => {
  const details = [];
  const traverse = (obj) => {
    if (obj && typeof obj === "object") {
      if (obj.LineString || obj.MultiLineString) {
        const type = obj.LineString ? "LineString" : "MultiLineString";
        // const coordinates = obj.LineString?.coordinates || obj.MultiLineString?.coordinates;
        // const length = coordinates ? coordinates.split(" ").length : 0;
        // details.push({ type, length });
        const coordinates = obj.LineString?.coordinates || obj.MultiLineString?.coordinates;
        if (coordinates) {
          const coordinatePairs = coordinates.trim().split(/\s+/);
          const length = Math.floor(coordinatePairs.length); 
          details.push({ type, length });
        } else {
          details.push({ type, length: 0 });
        }
        
      }
      Object.values(obj).forEach(traverse);
    }
  };
  traverse(kmlData);
  return details;
};