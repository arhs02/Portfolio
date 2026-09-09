import { useMemo } from "react";

export default function ProjectFilters({
  projects,
  activeTech,
  setActiveTech,
  sortBy,
  setSortBy,
}) {
  const techOptions = useMemo(() => {
    const set = new Set();
    projects.forEach((p) => (p.tech || []).forEach((t) => set.add(t)));
    return ["All", ...Array.from(set).sort()];
  }, [projects]);

  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap gap-2">
        {techOptions.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTech(t === "All" ? null : t)}
            className={`rounded-full px-3 py-1.5 text-sm border transition-colors ${
              (activeTech ?? "All") === t
                ? "bg-[var(--accent)] text-[var(--paper)] border-[var(--accent)]"
                : "text-[var(--ink)] border-[var(--line)] hover:border-[var(--accent)]"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <div>
        <label className="mr-2 text-[var(--ink-dim)] text-sm">Sort</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-md bg-[var(--paper)] text-[var(--ink)] border border-[var(--line)] px-2 py-1 text-sm"
        >
          <option value="newest">Newest</option>
          <option value="impact">Impact</option>
          <option value="perf">Performance</option>
        </select>
      </div>
    </div>
  );
}
