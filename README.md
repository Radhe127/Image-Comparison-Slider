# Sorting Visualizer — Spring Boot + React

A full-stack sorting visualizer with a Spring Boot REST API backend and a React (Vite) frontend.

## Architecture

```
┌──────────────────────────────┐        HTTP POST /api/sort/{algo}
│   React Frontend (Vite)      │ ─────────────────────────────────► │  Spring Boot Backend  │
│   localhost:5173             │ ◄───────────────────────────────── │  localhost:8080       │
│                              │   { steps[], sortedArray, stats }  │                       │
└──────────────────────────────┘                                    └───────────────────────┘
```

Each algorithm runs on the backend and returns a list of **animation steps** (COMPARE, SWAP, OVERWRITE, SORTED). The React frontend plays them back frame-by-frame with configurable speed.

## Algorithms Supported

| Algorithm      | Best       | Average    | Worst      | Space    |
|----------------|------------|------------|------------|----------|
| Bubble Sort    | O(n)       | O(n²)      | O(n²)      | O(1)     |
| Selection Sort | O(n²)      | O(n²)      | O(n²)      | O(1)     |
| Insertion Sort | O(n)       | O(n²)      | O(n²)      | O(1)     |
| Merge Sort     | O(n log n) | O(n log n) | O(n log n) | O(n)     |
| Quick Sort     | O(n log n) | O(n log n) | O(n²)      | O(log n) |
| Heap Sort      | O(n log n) | O(n log n) | O(n log n) | O(1)     |

## Prerequisites

- **Java 17+** and **Maven 3.8+**
- **Node.js 18+** and **npm 9+**

---

## Running the Backend (Spring Boot)

```bash
cd backend
mvn spring-boot:run
```

The API will start at `http://localhost:8080`.

### Test the health endpoint:
```bash
curl http://localhost:8080/api/sort/health
```

### Manual test a sort:
```bash
curl -X POST http://localhost:8080/api/sort/bubble \
  -H "Content-Type: application/json" \
  -d '{"array": [5, 3, 8, 1, 9, 2]}'
```

---

## Running the Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

> The Vite dev server proxies `/api/*` to `http://localhost:8080`, so no CORS issues in development.

---

## API Reference

### POST `/api/sort/{algorithm}`

**Path params:** `bubble` | `selection` | `insertion` | `merge` | `quick` | `heap`

**Request body:**
```json
{ "array": [64, 34, 25, 12, 22, 11, 90] }
```

**Response:**
```json
{
  "steps": [
    { "type": "COMPARE",  "indices": [0, 1], "index": -1, "value": -1 },
    { "type": "SWAP",     "indices": [0, 1], "index": -1, "value": -1 },
    { "type": "OVERWRITE","indices": [],     "index": 2,  "value": 25 },
    { "type": "SORTED",   "indices": [],     "index": 5,  "value": -1 }
  ],
  "sortedArray": [11, 12, 22, 25, 34, 64, 90],
  "comparisons": 21,
  "swaps": 8
}
```

### Step Types

| Type        | Description                                    |
|-------------|------------------------------------------------|
| `COMPARE`   | Two bars being compared (highlighted in red)   |
| `SWAP`      | Two bars being swapped (highlighted in orange) |
| `OVERWRITE` | One bar gets a new value (merge sort)          |
| `SORTED`    | Bar is in its final position (green)           |

---

## Project Structure

```
sorting-visualizer/
├── backend/
│   ├── pom.xml
│   └── src/main/java/com/sortvisualizer/
│       ├── SortingVisualizerApplication.java
│       ├── controller/SortController.java
│       ├── model/
│       │   ├── SortRequest.java
│       │   ├── SortResponse.java
│       │   └── SortStep.java
│       └── service/SortingService.java
│
└── frontend/
    ├── package.json
    ├── vite.config.js
    ├── index.html
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── styles/App.css
        └── components/
            ├── Navbar.jsx
            ├── ArrayContainer.jsx
            └── InfoPanel.jsx
```
