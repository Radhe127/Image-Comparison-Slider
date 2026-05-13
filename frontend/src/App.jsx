import { useState, useEffect, useRef, useCallback } from 'react'
import Navbar from './components/Navbar.jsx'
import ArrayContainer from './components/ArrayContainer.jsx'
import InfoPanel from './components/InfoPanel.jsx'
import CustomArrayInput from './components/CustomArrayInput.jsx'

const API_BASE = import.meta.env.VITE_API_URL;
const SPEED_DELAYS = [600, 180, 60, 20, 5]  // ms per step (speed 1–5)

function generateRandomArray(size) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 580) + 20)
}

export default function App() {
  const [array, setArray]               = useState([])
  const [barColors, setBarColors]       = useState([])
  const [arraySize, setArraySize]       = useState(60)
  const [speed, setSpeed]               = useState(4)
  const [isSorting, setIsSorting]       = useState(false)
  const [selectedAlgo, setSelectedAlgo] = useState(null)
  const [stats, setStats]               = useState({ comparisons: 0, swaps: 0, time: 0 })
  const [isCustomMode, setIsCustomMode] = useState(false)
  const [showCustom, setShowCustom]     = useState(false)

  const animTimerRef = useRef(null)
  const arrayRef     = useRef([])  // always holds the latest array values for animation

  // ── Generate random array ─────────────────────
  const generateArray = useCallback((size) => {
    if (animTimerRef.current) clearTimeout(animTimerRef.current)
    const arr = generateRandomArray(size)
    arrayRef.current = arr
    setArray(arr)
    setBarColors(new Array(arr.length).fill('default'))
    setStats({ comparisons: 0, swaps: 0, time: 0 })
    setIsSorting(false)
    setSelectedAlgo(null)
    setIsCustomMode(false)
  }, [])

  useEffect(() => { generateArray(arraySize) }, []) // eslint-disable-line

  // ── Apply a custom-typed array ────────────────
  const applyCustomArray = (nums) => {
    if (animTimerRef.current) clearTimeout(animTimerRef.current)
    arrayRef.current = nums
    setArray(nums)
    setArraySize(nums.length)
    setBarColors(new Array(nums.length).fill('default'))
    setStats({ comparisons: 0, swaps: 0, time: 0 })
    setIsSorting(false)
    setSelectedAlgo(null)
    setIsCustomMode(true)
  }

  // ── Size slider ───────────────────────────────
  const handleSizeChange = (size) => {
    setArraySize(size)
    generateArray(size)
  }

  // ── Animation engine ──────────────────────────
  const animateSteps = (steps, sortedArray, delay) => {
    return new Promise((resolve) => {
      const arr    = [...arrayRef.current]
      const colors = new Array(arr.length).fill('default')
      let i = 0

      const tick = () => {
        if (i >= steps.length) {
          setArray([...sortedArray])
          setBarColors(new Array(sortedArray.length).fill('sorted'))
          animTimerRef.current = setTimeout(() => {
            setBarColors(new Array(sortedArray.length).fill('default'))
            resolve()
          }, 800)
          return
        }

        const step = steps[i]

        // Reset non-permanent highlights
        for (let k = 0; k < colors.length; k++) {
          if (colors[k] !== 'sorted') colors[k] = 'default'
        }

        if (step.type === 'COMPARE') {
          colors[step.indices[0]] = 'compare'
          colors[step.indices[1]] = 'compare'

        } else if (step.type === 'SWAP') {
          const [a, b] = step.indices
          ;[arr[a], arr[b]] = [arr[b], arr[a]]
          colors[a] = 'swap'
          colors[b] = 'swap'
          setArray([...arr])

        } else if (step.type === 'OVERWRITE') {
          arr[step.index] = step.value
          colors[step.index] = 'overwrite'
          setArray([...arr])

        } else if (step.type === 'SORTED') {
          colors[step.index] = 'sorted'
        }

        setBarColors([...colors])
        i++
        animTimerRef.current = setTimeout(tick, delay)
      }
      tick()
    })
  }

  // ── Run algorithm ─────────────────────────────
  const runSort = async (algo) => {
    if (isSorting) return
    setIsSorting(true)
    setSelectedAlgo(algo)
    setStats({ comparisons: 0, swaps: 0, time: 0 })

    const t0 = performance.now()

    try {
      const res = await fetch(`${API_BASE}/${algo}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ array: arrayRef.current }),
      })
      if (!res.ok) throw new Error(`Server error ${res.status}`)
      const data = await res.json()

      await animateSteps(data.steps, data.sortedArray, SPEED_DELAYS[speed - 1])

      setStats({
        comparisons: data.comparisons,
        swaps:       data.swaps,
        time:        ((performance.now() - t0) / 1000).toFixed(2),
      })
    } catch (err) {
      console.error(err)
      alert(`Could not reach backend.\n\nMake sure Spring Boot is running on port 8080.\n\n${err.message}`)
    }

    setIsSorting(false)
  }

  return (
    <div className="app">
      <Navbar
        arraySize={arraySize}
        speed={speed}
        isSorting={isSorting}
        selectedAlgo={selectedAlgo}
        isCustomMode={isCustomMode}
        onSizeChange={handleSizeChange}
        onSpeedChange={setSpeed}
        onGenerate={() => generateArray(arraySize)}
        onAlgoSelect={runSort}
        onOpenCustom={() => setShowCustom(true)}
      />

      <section className="main-section">
        <InfoPanel side="left"  stats={stats} isSorting={isSorting} selectedAlgo={selectedAlgo} />
        <ArrayContainer array={array} barColors={barColors} />
        <InfoPanel side="right" stats={stats} isSorting={isSorting} selectedAlgo={selectedAlgo} />
      </section>

      <footer className="footer">
        <span className="footer-note">
          {isCustomMode
            ? `Custom array · ${array.length} elements — select an algorithm above to sort`
            : 'Bars represent element values · select an algorithm to begin'}
        </span>
      </footer>

      {showCustom && (
        <CustomArrayInput
          onApply={applyCustomArray}
          onClose={() => setShowCustom(false)}
        />
      )}
    </div>
  )
}
