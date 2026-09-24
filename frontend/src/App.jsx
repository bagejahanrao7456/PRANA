import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import StatCard from "./components/StatCard";
import RiskMap from "./components/RiskMap";

function App() {
  const [villages, setVillages] = useState([]);
  const highRiskCount = villages.filter(
    (village) => village.riskLevel === "HIGH"
  ).length;

  const redZoneCount = villages.filter(
    (village) => village.redZone === true
  ).length;

  const relocationCount = villages.filter(
    (village) => village.relocationPriority !== "MONITOR"
  ).length;
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

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      <Sidebar />

      <main className="flex-1 p-8">
        <div>
          <h1 className="text-3xl font-bold">Disaster Risk Dashboard</h1>

          <p className="mt-2 text-slate-400">
            Predictive Relocation & Risk Assessment Network
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
          <StatCard
            title="Total Villages"
            value={villages.length}
            description="Villages under assessment"
          />

          <StatCard
            title="High Risk"
            value={highRiskCount}
            description="Villages with high risk"
          />

          <StatCard
            title="Red Zone"
            value={redZoneCount}
            description="Unsafe settlement zones"
          />

          <StatCard
            title="Relocation Required"
            value={relocationCount}
            description="Villages requiring action"
          />
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Interactive Risk Map</h2>

          <RiskMap />
        </div>
      </main>
    </div>
  );
}

export default App;
