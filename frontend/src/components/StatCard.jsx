function StatCard({ title, value, description }) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
        <p className="text-sm text-slate-400">
          {title}
        </p>
  
        <h2 className="mt-2 text-3xl font-bold text-white">
          {value}
        </h2>
  
        <p className="mt-2 text-sm text-slate-500">
          {description}
        </p>
      </div>
    )
  }
  
  export default StatCard