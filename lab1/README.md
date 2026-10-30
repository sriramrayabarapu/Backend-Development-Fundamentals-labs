# Lab 01 - Introduction to Node.js & Express

## Overview
This laboratory project demonstrates the fundamentals of building web servers using Node.js:
1. A basic HTTP server built with Node's native `http` module (`plain-server.js`).
2. A REST API server built with the Express framework (`server.js`).

---

## Project Structure
```text
Node.js/
└── lab-01/
    ├── plain-server.js       # Native Node.js HTTP server
    ├── server.js             # Express.js web server
    ├── package.json          # Project configuration & dependencies
    ├── package-lock.json     # Dependency lockfile
    ├── README.md             # Project documentation
    ├── .gitignore            # Git ignore configuration
    └── screenshots/          # Output and testing screenshots
```

---

## Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- npm (Node Package Manager)

---

## Installation

1. Navigate to the `lab-01` directory:
   ```bash
   cd lab-01
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

---

## Running the Servers

### 1. Plain HTTP Server (`plain-server.js`)
Uses the built-in `http` module to create a simple HTTP server on port 3000.

- **Start command:**
  ```bash
  node plain-server.js
  ```
- **Console Output:**
  ```text
  Server running on port 3000
  ```
- **Endpoint:** `GET http://localhost:3000/`
- **Response:**
  ```text
  Hello
  ```

---

### 2. Express Server (`server.js`)
Uses Express.js to define multiple routing endpoints and custom 404 handling.

- **Start command:**
  ```bash
  node server.js
  ```
- **Console Output:**
  ```text
  Express server running on port 3000
  ```

#### Routes:
| Method | Route | Description | Expected Output |
|--------|-------|-------------|-----------------|
| `GET` | `/` | Root welcome route | `Welcome to my Express server!` |
| `GET` | `/about` | Returns student details (JSON) | `{"name": "SRIRAM", "section": "CSE(GENAI)"}` |
| `GET` | `/time` | Returns server timestamp (JSON) | `{"currentDateTime": "<timestamp>"}` |
| `*` | Any other path | Custom 404 handler | `404 - Page Not Found` |

---

## Testing the Endpoints

### Using cURL / PowerShell:
```powershell
# Root route
curl http://localhost:3000/

# About route
curl http://localhost:3000/about

# Time route
curl http://localhost:3000/time

# 404 route
curl http://localhost:3000/random
```

---

## Screenshots
Screenshots of the running servers and endpoint responses can be saved in the [`screenshots/`](./screenshots/) directory.
