function Sidebar() {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-10">PRANA</h1>

      <nav className="space-y-3">
        <button
          onClick={() => scrollToSection("dashboard")}
          className="w-full text-left px-4 py-3 rounded-lg bg-slate-800"
        >
          Dashboard
        </button>

        <button
          onClick={() => scrollToSection("risk-map")}
          className="w-full text-left px-4 py-3 rounded-lg hover:bg-slate-800"
        >
          Risk Map
        </button>

        <button
          onClick={() => scrollToSection("villages")}
          className="w-full text-left px-4 py-3 rounded-lg hover:bg-slate-800"
        >
          Villages
        </button>

        <button
          onClick={() => scrollToSection("relocation")}
          className="w-full text-left px-4 py-3 rounded-lg hover:bg-slate-800"
        >
          Relocation
        </button>

        <button
          onClick={() => scrollToSection("analytics")}
          className="w-full text-left px-4 py-3 rounded-lg hover:bg-slate-800"
        >
          Analytics
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;
