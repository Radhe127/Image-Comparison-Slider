const COLOR_MAP = {
  default:   'var(--bar-default)',
  compare:   'var(--bar-compare)',
  swap:      'var(--bar-swap)',
  overwrite: 'var(--bar-overwrite)',
  sorted:    'var(--bar-sorted)',
}

const GLOW_MAP = {
  compare:   '0 0 10px var(--bar-compare), 0 0 22px rgba(247,37,133,0.45)',
  swap:      '0 0 10px var(--bar-swap),    0 0 22px rgba(255,159,28,0.45)',
  overwrite: '0 0 10px var(--bar-overwrite), 0 0 20px rgba(157,78,221,0.4)',
  sorted:    'none',
  default:   'none',
}

const GRID_LINES = 5

export default function ArrayContainer({ array, barColors }) {
  if (!array.length) return null

  const maxVal   = Math.max(...array)
  const showVals = array.length <= 50
  const showIdxs = array.length <= 25
  const gap      = array.length <= 30 ? 4 : array.length <= 60 ? 2 : array.length <= 100 ? 1 : 0

  return (
    <div className="array-wrapper">

      {/* Y-axis grid lines */}
      <div className="grid-lines" aria-hidden="true">
        {Array.from({ length: GRID_LINES }, (_, i) => {
          const pct = ((i + 1) / GRID_LINES) * 100
          const val = Math.round((maxVal * (i + 1)) / GRID_LINES)
          return (
            <div key={i} className="grid-line" style={{ bottom: `${pct}%` }}>
              <span className="grid-label">{val}</span>
            </div>
          )
        })}
      </div>

      {/* Bars */}
      <div className="array-container">
        {array.map((val, idx) => {
          const color = barColors[idx] ?? 'default'
          return (
            <div
              key={idx}
              className={`bar-wrapper ${showIdxs ? 'bar-wrapper--indexed' : ''}`}
              style={{ width: `calc(${100 / array.length}% - ${gap}px)`, marginRight: `${gap}px` }}
            >
              {showVals && (
                <span
                  className={`bar-value ${color !== 'default' && color !== 'sorted' ? 'bar-value--active' : ''}`}
                  style={{ color: COLOR_MAP[color] }}
                >
                  {val}
                </span>
              )}

              <div
                className={`bar bar--${color}`}
                style={{
                  height: `${(val / maxVal) * 100}%`,
                  background: getGradient(color),
                  boxShadow: GLOW_MAP[color] ?? 'none',
                }}
                title={`[${idx}] = ${val}`}
              />

              {showIdxs && <span className="bar-index">{idx}</span>}
            </div>
          )
        })}
      </div>

      <div className="axis-line" />
    </div>
  )
}

function getGradient(color) {
  const g = {
    default:   'linear-gradient(to top, #0090c5 0%, #4cc9f0 100%)',
    compare:   'linear-gradient(to top, #c2006a 0%, #f72585 100%)',
    swap:      'linear-gradient(to top, #cc6c00 0%, #ff9f1c 100%)',
    overwrite: 'linear-gradient(to top, #4b007a 0%, #9d4edd 100%)',
    sorted:    'linear-gradient(to top, #029c75 0%, #06d6a0 100%)',
  }
  return g[color] ?? g.default
}
