function RelocationSites({ sites, village }) {
  return (
    <div id="relocation" className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Relocation Sites</h2>
      {village && village.relocationPriority !== "MONITOR" && (
        <div className="mb-5 rounded-xl border border-slate-700 bg-slate-800 p-4">
          <h3 className="font-bold text-white">Recommended Relocation Sites</h3>

          <p className="mt-2 text-slate-300">
            {sites
              .filter((site) => site.suitability === "HIGH")
              .map((site) => site.name)
              .join(", ") || "No suitable site available"}
          </p>
        </div>
      )}

      {village && village.relocationPriority === "MONITOR" && (
        <div className="mb-5 rounded-xl border border-slate-700 bg-slate-800 p-4">
          <h3 className="font-bold text-white">Relocation Not Required</h3>

          <p className="mt-2 text-slate-300">
            This village is currently under monitoring.
          </p>
        </div>
      )}
      <div className="grid md:grid-cols-3 gap-5">
        {sites.map((site) => (
          <div
            key={site.id}
            className="rounded-xl border border-slate-800 bg-slate-900 p-5"
          >
            <h3 className="text-lg font-bold">{site.name}</h3>

            <p className="mt-2 text-slate-400">
              Capacity: {site.capacity} people
            </p>
            {village && (
              <p className="mt-2 font-semibold">
                Suitability: {site.suitability}
              </p>
            )}

            <p className="mt-2 font-semibold">
              {village
                ? site.capacity >= village.population
                  ? "Capacity Sufficient ✓"
                  : "Capacity Insufficient ✗"
                : "Select a village first"}
            </p>

            <div className="mt-4 text-sm space-y-1">
              <p>Land Available: {site.landAvailable ? "✓" : "✗"}</p>
              <p>Water: {site.facilities.water ? "✓" : "✗"}</p>
              <p>Hospital: {site.facilities.hospital ? "✓" : "✗"}</p>
              <p>School: {site.facilities.school ? "✓" : "✗"}</p>
              <p>Road: {site.facilities.road ? "✓" : "✗"}</p>
              <p>Electricity: {site.facilities.electricity ? "✓" : "✗"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RelocationSites;
