import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import StatCard from "./components/StatCard";
import RiskMap from "./components/RiskMap";
import RelocationSite from "./components/RelocationSite";

function App() {
  const [villages, setVillages] = useState([]);
  const [selectedVillage, setSelectedVillage] = useState(null);
  const [relocationSites, setRelocationSites] = useState([]);
  useEffect(() => {
    if (selectedVillage) {
      setTimeout(() => {
        document
          .getElementById("village-details")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [selectedVillage]);
  useEffect(() => {
    if (!selectedVillage) return;

    fetch(
      `http://localhost:5001/api/relocation-sites?villageId=${selectedVillage.id}`
    )
      .then((response) => response.json())
      .then((data) => {
        setRelocationSites(data);
      })
      .catch((error) => {
        console.error("Error fetching relocation sites:", error);
      });
  }, [selectedVillage]);
  const highRiskCount = villages.filter(
    (village) => village.riskLevel === "HIGH"
  ).length;

  const redZoneCount = villages.filter(
    (village) => village.redZone === true
  ).length;

  const relocationCount = villages.filter(
    (village) => village.relocationPriority !== "MONITOR"
  ).length;

  const mediumRiskCount = villages.filter(
    (village) => village.riskLevel === "MEDIUM"
  ).length;

  const lowRiskCount = villages.filter(
    (village) => village.riskLevel === "LOW"
  ).length;

  const immediateCount = villages.filter(
    (village) => village.relocationPriority === "IMMEDIATE"
  ).length;

  const shortTermCount = villages.filter(
    (village) => village.relocationPriority === "SHORT-TERM"
  ).length;

  const mediumTermCount = villages.filter(
    (village) => village.relocationPriority === "MEDIUM-TERM"
  ).length;

  const monitorCount = villages.filter(
    (village) => village.relocationPriority === "MONITOR"
  ).length;
  function App() {
    const [villages, setVillages] = useState([]);
    const [selectedVillage, setSelectedVillage] = useState(null);
    const [relocationSites, setRelocationSites] = useState([]);
    useEffect(() => {
      if (selectedVillage) {
        setTimeout(() => {
          document
            .getElementById("village-details")
            ?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }, [selectedVillage]);
    useEffect(() => {
      if (!selectedVillage) return;

      fetch(
        `http://localhost:5001/api/relocation-sites?villageId=${selectedVillage.id}`
      )
        .then((response) => response.json())
        .then((data) => {
          setRelocationSites(data);
        })
        .catch((error) => {
          console.error("Error fetching relocation sites:", error);
        });
    }, [selectedVillage]);
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

        <main id="dashboard" className="flex-1 p-8">
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

          <div id="risk-map" className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Interactive Risk Map</h2>

            <RiskMap onVillageSelect={setSelectedVillage} />
          </div>
          {selectedVillage && (
            <div
              id="village-details"
              className="mt-8 rounded-xl border border-slate-800 bg-slate-900 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{selectedVillage.name}</h2>

                  <p className="mt-1 text-slate-400">Village Risk Assessment</p>
                </div>

                <button
                  onClick={() => setSelectedVillage(null)}
                  className="rounded-lg bg-slate-800 px-4 py-2 hover:bg-slate-700"
                >
                  Close
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="bg-slate-800 rounded-lg p-4">
                  <p className="text-sm text-slate-400">Population</p>
                  <p className="text-xl font-bold mt-1">
                    {selectedVillage.population}
                  </p>
                </div>

                <div className="bg-slate-800 rounded-lg p-4">
                  <p className="text-sm text-slate-400">Hazard Score</p>
                  <p className="text-xl font-bold mt-1">
                    {selectedVillage.hazardScore}
                  </p>
                </div>

                <div className="bg-slate-800 rounded-lg p-4">
                  <p className="text-sm text-slate-400">Vulnerability</p>
                  <p className="text-xl font-bold mt-1">
                    {selectedVillage.vulnerabilityScore}
                  </p>
                </div>

                <div className="bg-slate-800 rounded-lg p-4">
                  <p className="text-sm text-slate-400">Disaster History</p>
                  <p className="text-xl font-bold mt-1">
                    {selectedVillage.disasterHistoryScore}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                <div className="bg-slate-800 rounded-lg p-4">
                  <p className="text-sm text-slate-400">Risk Score</p>
                  <p className="text-2xl font-bold mt-1">
                    {selectedVillage.riskScore}
                  </p>
                </div>

                <div className="bg-slate-800 rounded-lg p-4">
                  <p className="text-sm text-slate-400">Risk Level</p>
                  <p className="text-xl font-bold mt-1">
                    {selectedVillage.riskLevel}
                  </p>
                </div>

                <div className="bg-slate-800 rounded-lg p-4">
                  <p className="text-sm text-slate-400">Red Zone</p>
                  <p className="text-xl font-bold mt-1">
                    {selectedVillage.redZone ? "YES" : "NO"}
                  </p>
                </div>

                <div className="bg-slate-800 rounded-lg p-4">
                  <p className="text-sm text-slate-400">Relocation Priority</p>
                  <p className="text-xl font-bold mt-1">
                    {selectedVillage.relocationPriority}
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-lg bg-slate-800 p-5">
                <h3 className="text-lg font-semibold">
                  Why is this village at risk?
                </h3>

                <div className="mt-3 space-y-2 text-slate-300">
                  <p>Hazard Score: {selectedVillage.hazardScore}/100</p>
                  <p>
                    Vulnerability Score: {selectedVillage.vulnerabilityScore}
                    /100
                  </p>
                  <p>
                    Disaster History Score:{" "}
                    {selectedVillage.disasterHistoryScore}
                    /100
                  </p>
                  <p>Flood Risk: {selectedVillage.floodRisk}</p>
                  <p>Landslide Risk: {selectedVillage.landslideRisk}</p>
                </div>
              </div>
            </div>
          )}
          <RelocationSite sites={relocationSites} village={selectedVillage} />
        </main>
      </div>
    );
  }

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

      <main id="dashboard" className="flex-1 p-8">
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

        <div id="risk-map" className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Interactive Risk Map</h2>

          <RiskMap onVillageSelect={setSelectedVillage} />
        </div>
        {selectedVillage && (
          <div
            id="village-details"
            className="mt-8 rounded-xl border border-slate-800 bg-slate-900 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">{selectedVillage.name}</h2>

                <p className="mt-1 text-slate-400">Village Risk Assessment</p>
              </div>

              <button
                onClick={() => setSelectedVillage(null)}
                className="rounded-lg bg-slate-800 px-4 py-2 hover:bg-slate-700"
              >
                Close
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-slate-800 rounded-lg p-4">
                <p className="text-sm text-slate-400">Population</p>
                <p className="text-xl font-bold mt-1">
                  {selectedVillage.population}
                </p>
              </div>

              <div className="bg-slate-800 rounded-lg p-4">
                <p className="text-sm text-slate-400">Hazard Score</p>
                <p className="text-xl font-bold mt-1">
                  {selectedVillage.hazardScore}
                </p>
              </div>

              <div className="bg-slate-800 rounded-lg p-4">
                <p className="text-sm text-slate-400">Vulnerability</p>
                <p className="text-xl font-bold mt-1">
                  {selectedVillage.vulnerabilityScore}
                </p>
              </div>

              <div className="bg-slate-800 rounded-lg p-4">
                <p className="text-sm text-slate-400">Disaster History</p>
                <p className="text-xl font-bold mt-1">
                  {selectedVillage.disasterHistoryScore}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
              <div className="bg-slate-800 rounded-lg p-4">
                <p className="text-sm text-slate-400">Risk Score</p>
                <p className="text-2xl font-bold mt-1">
                  {selectedVillage.riskScore}
                </p>
              </div>

              <div className="bg-slate-800 rounded-lg p-4">
                <p className="text-sm text-slate-400">Risk Level</p>
                <p className="text-xl font-bold mt-1">
                  {selectedVillage.riskLevel}
                </p>
              </div>

              <div className="bg-slate-800 rounded-lg p-4">
                <p className="text-sm text-slate-400">Red Zone</p>
                <p className="text-xl font-bold mt-1">
                  {selectedVillage.redZone ? "YES" : "NO"}
                </p>
              </div>

              <div className="bg-slate-800 rounded-lg p-4">
                <p className="text-sm text-slate-400">Relocation Priority</p>
                <p className="text-xl font-bold mt-1">
                  {selectedVillage.relocationPriority}
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-lg bg-slate-800 p-5">
              <h3 className="text-lg font-semibold">
                Why is this village at risk?
              </h3>

              <div className="mt-3 space-y-2 text-slate-300">
                <p>Hazard Score: {selectedVillage.hazardScore}/100</p>
                <p>
                  Vulnerability Score: {selectedVillage.vulnerabilityScore}/100
                </p>
                <p>
                  Disaster History Score: {selectedVillage.disasterHistoryScore}
                  /100
                </p>
                <p>Flood Risk: {selectedVillage.floodRisk}</p>
                <p>Landslide Risk: {selectedVillage.landslideRisk}</p>
              </div>
            </div>
          </div>
        )}
        <RelocationSite sites={relocationSites} village={selectedVillage} />
        <div id="analytics" className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Analytics</h2>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
              <h3 className="text-lg font-semibold">Risk Distribution</h3>

              <div className="mt-4 space-y-3 text-slate-300">
                <p>High Risk: {highRiskCount}</p>
                <p>Medium Risk: {mediumRiskCount}</p>
                <p>Low Risk: {lowRiskCount}</p>
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
              <h3 className="text-lg font-semibold">Relocation Priority</h3>

              <div className="mt-4 space-y-3 text-slate-300">
                <p>Immediate: {immediateCount}</p>
                <p>Short-Term: {shortTermCount}</p>
                <p>Medium-Term: {mediumTermCount}</p>
                <p>Monitor: {monitorCount}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
