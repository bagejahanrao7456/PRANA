function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-10">PRANA</h1>

      <nav className="space-y-3">
        <button className="w-full text-left px-4 py-3 rounded-lg bg-slate-800">
          Dashboard
        </button>

        <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-slate-800">
          Risk Map
        </button>

        <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-slate-800">
          Villages
        </button>

        <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-slate-800">
          Relocation
        </button>

        <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-slate-800">
          Analytics
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;
