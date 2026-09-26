import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Circle,
  Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5001";

function RiskMap({ onVillageSelect }) {
  const [villages, setVillages] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/villages`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch villages");
        }

        return response.json();
      })
      .then((data) => {
        setVillages(data);
      })
      .catch((error) => {
        console.error("Error fetching villages:", error);
        setVillages([]);
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
      <MapContainer
        center={position}
        zoom={10}
        className="h-full w-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Circle
          center={[28.62, 77.21]}
          radius={1800}
          pathOptions={{
            color: "blue",
            fillColor: "blue",
            fillOpacity: 0.15,
          }}
        >
          <Popup>
            <strong>Flood Hazard Zone</strong>
            <br />
            Area with elevated flood risk
          </Popup>
        </Circle>

        <Circle
          center={[28.6, 77.19]}
          radius={1400}
          pathOptions={{
            color: "orange",
            fillColor: "orange",
            fillOpacity: 0.15,
          }}
        >
          <Popup>
            <strong>Landslide Hazard Zone</strong>
            <br />
            Area with elevated landslide risk
          </Popup>
        </Circle>

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
                <div className="space-y-2">
                  <h3 className="text-base font-bold">
                    {village.name}
                  </h3>

                  <p>Population: {village.population}</p>
                  <p>Risk Score: {village.riskScore}</p>
                  <p>Risk Level: {village.riskLevel}</p>

                  <p>Flood Risk: {village.floodRisk}</p>
                  <p>Landslide Risk: {village.landslideRisk}</p>
                  <p>
                    Red Zone: {village.redZone ? "YES" : "NO"}
                  </p>
                  <p>
                    Priority: {village.relocationPriority}
                  </p>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onVillageSelect(village);
                    }}
                    className="mt-3 rounded bg-slate-900 px-3 py-2 text-white"
                  >
                    View Details
                  </button>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>

      {/* Risk Legend */}
      <div className="absolute top-4 right-4 z-[1000] bg-white rounded-lg shadow-lg p-4 text-sm">
        <h3 className="font-bold text-slate-800 mb-3">
          Risk Level
        </h3>

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