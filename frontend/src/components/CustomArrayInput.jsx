import { useState, useEffect } from 'react'

const PRESETS = [
  { label: 'Reverse Sorted', gen: (n) => Array.from({ length: n }, (_, i) => n - i) },
  { label: 'Nearly Sorted',  gen: (n) => {
      const a = Array.from({ length: n }, (_, i) => i + 1)
      for (let i = 0; i < Math.ceil(n * 0.1); i++) {
        const x = Math.floor(Math.random() * n)
        const y = Math.floor(Math.random() * n)
        ;[a[x], a[y]] = [a[y], a[x]]
      }
      return a
  }},
  { label: 'Few Unique',     gen: (n) => Array.from({ length: n }, () => Math.floor(Math.random() * 5) * 20 + 20) },
  { label: 'Sawtooth',       gen: (n) => Array.from({ length: n }, (_, i) => ((i % 10) + 1) * Math.floor(600 / 10)) },
]

function parseInput(raw) {
  // Accept comma, space, semicolon, newline as separators
  const tokens = raw.split(/[\s,;\n]+/).filter(Boolean)
  const nums = []
  const errors = []

  tokens.forEach((t, i) => {
    const n = Number(t)
    if (!t.match(/^-?\d+(\.\d+)?$/)) {
      errors.push(`"${t}" is not a number`)
    } else if (n < 1 || n > 1000) {
      errors.push(`${n} must be between 1 and 1000`)
    } else {
      nums.push(Math.round(n))
    }
  })

  return { nums, errors }
}

export default function CustomArrayInput({ onApply, onClose }) {
  const [raw, setRaw]         = useState('')
  const [nums, setNums]       = useState([])
  const [errors, setErrors]   = useState([])
  const [presetN, setPresetN] = useState(20)

  useEffect(() => {
    const { nums: n, errors: e } = parseInput(raw)
    setNums(n)
    setErrors(e)
  }, [raw])

  const handleApply = () => {
    if (nums.length >= 2 && errors.length === 0) {
      onApply(nums)
      onClose()
    }
  }

  const handlePreset = (preset) => {
    const arr = preset.gen(presetN)
    setRaw(arr.join(', '))
  }

  const isValid = nums.length >= 2 && errors.length === 0

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">Custom Array Input</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        {/* Presets */}
        <div className="preset-section">
          <p className="preset-label">Presets</p>
          <div className="preset-size-row">
            <span className="preset-size-label">Size:</span>
            <input
              type="range" min={5} max={80} step={1}
              value={presetN}
              onChange={(e) => setPresetN(Number(e.target.value))}
              className="slider preset-slider"
            />
            <span className="preset-size-val">{presetN}</span>
          </div>
          <div className="preset-buttons">
            {PRESETS.map((p) => (
              <button key={p.label} className="btn-preset" onClick={() => handlePreset(p)}>
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="modal-divider" />

        {/* Manual input */}
        <p className="input-label">
          Type your numbers <span className="input-hint">(comma or space separated · range 1–1000)</span>
        </p>
        <textarea
          className={`num-textarea ${errors.length > 0 ? 'num-textarea--error' : nums.length >= 2 ? 'num-textarea--valid' : ''}`}
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          placeholder="e.g.  42, 7, 98, 3, 55, 21, 76"
          rows={4}
          spellCheck={false}
        />

        {/* Errors */}
        {errors.length > 0 && (
          <ul className="error-list">
            {errors.slice(0, 3).map((e, i) => <li key={i}>{e}</li>)}
            {errors.length > 3 && <li>…and {errors.length - 3} more</li>}
          </ul>
        )}

        {/* Preview chips */}
        {nums.length > 0 && errors.length === 0 && (
          <div className="preview-section">
            <p className="preview-label">Preview — {nums.length} element{nums.length !== 1 ? 's' : ''}</p>
            <div className="preview-chips">
              {nums.slice(0, 40).map((n, i) => (
                <span key={i} className="chip">{n}</span>
              ))}
              {nums.length > 40 && <span className="chip chip--more">+{nums.length - 40}</span>}
            </div>
          </div>
        )}

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button
            className="btn-apply"
            onClick={handleApply}
            disabled={!isValid}
          >
            ✓ Visualize This Array
          </button>
        </div>
      </div>
    </div>
  )
}
