const ALGORITHMS = [
  { id: 'bubble',    label: 'Bubble' },
  { id: 'selection', label: 'Selection' },
  { id: 'insertion', label: 'Insertion' },
  { id: 'merge',     label: 'Merge' },
  { id: 'quick',     label: 'Quick' },
  { id: 'heap',      label: 'Heap' },
]

export default function Navbar({
  arraySize, speed, isSorting, selectedAlgo, isCustomMode,
  onSizeChange, onSpeedChange, onGenerate, onAlgoSelect, onOpenCustom,
}) {
  return (
    <header className="navbar">
      {/* ── LEFT controls ── */}
      <div className="nav-controls">

        <div className="slider-row">
          <label className="slider-label">Size</label>
          <input
            className="slider"
            type="range" min={5} max={150} step={1}
            value={arraySize}
            disabled={isSorting}
            onChange={(e) => onSizeChange(Number(e.target.value))}
          />
          <span className="slider-value">{arraySize}</span>
        </div>

        <div className="slider-row">
          <label className="slider-label">Speed</label>
          <input
            className="slider"
            type="range" min={1} max={5} step={1}
            value={speed}
            disabled={isSorting}
            onChange={(e) => onSpeedChange(Number(e.target.value))}
          />
          <span className="slider-value">{['Slow','','Medium','','Fast'][speed - 1]}</span>
        </div>

        <div className="btn-row">
          <button
            className="btn-generate"
            onClick={onGenerate}
            disabled={isSorting}
            title="Generate a new random array"
          >
            ⟳ Random
          </button>
          <button
            className={`btn-generate btn-custom ${isCustomMode ? 'btn-custom--active' : ''}`}
            onClick={onOpenCustom}
            disabled={isSorting}
            title="Enter your own numbers"
          >
            ✎ Custom
          </button>
        </div>

      </div>

      {/* ── RIGHT: title + algo buttons ── */}
      <div className="nav-right">
        <h1 className="nav-title">Sorting Visualizer</h1>

        <div className="algo-buttons">
          {ALGORITHMS.map(({ id, label }) => (
            <button
              key={id}
              className={[
                'btn-algo',
                isSorting && selectedAlgo !== id ? 'btn-locked' : '',
                selectedAlgo === id ? 'btn-selected' : 'btn-unselected',
              ].join(' ')}
              onClick={() => onAlgoSelect(id)}
              disabled={isSorting}
              title={`Run ${label} Sort`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}
