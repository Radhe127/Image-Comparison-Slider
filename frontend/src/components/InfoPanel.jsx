const ALGO_INFO = {
  bubble: {
    name: 'Bubble Sort',
    best: 'O(n)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)',
    desc: 'Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
  },
  selection: {
    name: 'Selection Sort',
    best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)',
    desc: 'Finds the minimum element from the unsorted part and places it at the beginning.',
  },
  insertion: {
    name: 'Insertion Sort',
    best: 'O(n)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)',
    desc: 'Builds the sorted array one item at a time by inserting each new element into its correct position.',
  },
  merge: {
    name: 'Merge Sort',
    best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)', space: 'O(n)',
    desc: 'Divides the array in half, recursively sorts each half, then merges the sorted halves.',
  },
  quick: {
    name: 'Quick Sort',
    best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)', space: 'O(log n)',
    desc: 'Picks a pivot, partitions the array around it, and recursively sorts each partition.',
  },
  heap: {
    name: 'Heap Sort',
    best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)', space: 'O(1)',
    desc: 'Builds a max-heap from the data, then repeatedly extracts the maximum to produce a sorted array.',
  },
}

export default function InfoPanel({ side, stats, isSorting, selectedAlgo }) {
  const info = selectedAlgo ? ALGO_INFO[selectedAlgo] : null

  if (side === 'left') {
    return (
      <div className="info-panel info-left">
        {info ? (
          <>
            <h2 className="info-algo-name">{info.name}</h2>
            <p className="info-desc">{info.desc}</p>
            <div className="complexity-grid">
              <span className="comp-label">Best</span>
              <span className="comp-value best">{info.best}</span>
              <span className="comp-label">Average</span>
              <span className="comp-value avg">{info.average}</span>
              <span className="comp-label">Worst</span>
              <span className="comp-value worst">{info.worst}</span>
              <span className="comp-label">Space</span>
              <span className="comp-value space">{info.space}</span>
            </div>
          </>
        ) : (
          <p className="info-placeholder">← Select an algorithm to start visualizing</p>
        )}
      </div>
    )
  }

  // right panel: live stats
  return (
    <div className="info-panel info-right">
      <h2 className="info-panel-title">Stats</h2>
      <div className="stats-grid">
        <span className="stat-label">Comparisons</span>
        <span className="stat-value">{stats.comparisons.toLocaleString()}</span>
        <span className="stat-label">Swaps</span>
        <span className="stat-value">{stats.swaps.toLocaleString()}</span>
        <span className="stat-label">Time</span>
        <span className="stat-value">{stats.time ? `${stats.time}s` : '—'}</span>
      </div>

      <div className="legend">
        <h3 className="legend-title">Legend</h3>
        {[
          { color: 'var(--bar-default)',   label: 'Unsorted' },
          { color: 'var(--bar-compare)',   label: 'Comparing' },
          { color: 'var(--bar-swap)',      label: 'Swapping' },
          { color: 'var(--bar-overwrite)', label: 'Overwriting' },
          { color: 'var(--bar-sorted)',    label: 'Sorted' },
        ].map(({ color, label }) => (
          <div key={label} className="legend-item">
            <span className="legend-dot" style={{ background: color }} />
            <span className="legend-label">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
