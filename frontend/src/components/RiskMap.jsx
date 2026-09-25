import { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";

function RiskMap({ onVillageSelect }) {
  const [villages, setVillages] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/api/villages")
      .then((response) => response.json())
      .then((data) => {
        setVillages(data);
      })
      .catch((error) => {
        console.error("Error fetching villages:", error);
      });
  }, []);

  const position = [28.6139, 77.209];

  // Decide marker color based on risk level
  const getRiskColor = (riskLevel) => {
    if (riskLevel === "HIGH") {
      return "red";
    }

    if (riskLevel === "MEDIUM") {
      return "orange";
    }

    return "green";
  };

  return (
    <div className="relative h-[500px] w-full overflow-hidden rounded-xl border border-slate-800">
      <MapContainer center={position} zoom={10} className="h-full w-full">
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {villages.map((village) => {
          const riskColor = getRiskColor(village.riskLevel);

          return (
            <CircleMarker
              key={village.id}
              center={[village.latitude, village.longitude]}
              radius={10}
              pathOptions={{
                color: riskColor,
                fillColor: riskColor,
                fillOpacity: 0.8,
              }}
            >
              
                <Popup>
                  <strong>{village.name}</strong>
                  <br />
                  Population: {village.population}
                  <br />
                  Risk Score: {village.riskScore}
                  <br />
                  Risk Level: {village.riskLevel}
                  <br />
                  Red Zone: {village.redZone ? "YES" : "NO"}
                  <br />
                  Priority: {village.relocationPriority}
                  <br />
                  <button
                    onClick={() => onVillageSelect(village)}
                    className="mt-2 rounded bg-slate-900 px-3 py-2 text-white"
                  >
                    View Details
                  </button>
                  
                </Popup>
             
            </CircleMarker>
          );
        })}
      </MapContainer>

      {/* Risk Legend */}
      <div className="absolute top-4 right-4 z-[1000] bg-white rounded-lg shadow-lg p-4 text-sm">
        <h3 className="font-bold text-slate-800 mb-3">Risk Level</h3>

        <div className="flex items-center gap-2 mb-2">
          <span className="w-3 h-3 rounded-full bg-red-500"></span>
          <span className="text-slate-700">High Risk</span>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <span className="w-3 h-3 rounded-full bg-orange-500"></span>
          <span className="text-slate-700">Medium Risk</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-green-500"></span>
          <span className="text-slate-700">Low Risk</span>
        </div>
      </div>
    </div>
  );
}

export default RiskMap;
