# Lab 1: Node.js and Express Server

Live deployment URL: https://backend-development-fundamentals.vercel.app/


**Subject:** Backend Development Fundamentals  
**Year/Term:** Year II, Term II  
**University:** Aurora Deemed to be University  
**Faculty:** Mr. Joel Prashanth D

## Student Details

| Field | Details |
|---|---|
| Name | RAYABARAPU SRIRAM |
| Registration Number | 252U1R9136 |
| Section | S-26 |

## Project Objective

This lab demonstrates the fundamentals of creating and running a Node.js backend server with Express.js. It covers project initialization with npm, dependency installation, Express application setup, route handling, JSON responses, date and time generation, HTTP status codes, and handling unknown routes.

The project includes a basic Node.js HTTP server and an Express server that listens on port 3000.

## Technologies Used

- Node.js
- Express.js
- npm
- JavaScript (CommonJS)
- HTTP and JSON response handling

## Project Folder Structure

```text
lab-01/
├── plain-server.js
├── server.js
├── package.json
├── package-lock.json
├── README.md
├── .gitignore
└── screenshots/
    ├── home.png
    ├── about.png
    ├── time.png
    └── 404.png
```

## Installation and Execution

### Prerequisites

- Node.js and npm installed on the computer.
- Visual Studio Code or Antigravity editor.

### Install Dependencies

Open a terminal in the project directory and run:

```bash
npm install
```

If Express has not been installed, run:

```bash
npm install express
```

### Run the Plain Node.js Server

```bash
node plain-server.js
```

The server listens on port 3000. Open the following URL in your browser:

```text
http://localhost:3000
```

Expected response:

```text
Hello
```

Stop the server by pressing `Ctrl + C`.

### Run the Express Server

```bash
node server.js
```

Open the following URL:

```text
http://localhost:3000
```

Stop the server by pressing `Ctrl + C`.

**Note:** Only one of these servers should run on port 3000 at a time.

## Endpoints

| HTTP Method | Path | Description | Expected Status Code |
|---|---|---|---:|
| GET | `/` | Returns a welcome message | 200 |
| GET | `/about` | Returns student information in JSON format | 200 |
| GET | `/time` | Returns the current date and time using `new Date()` | 200 |
| GET | Any unknown path | Returns a page-not-found message | 404 |

### Example Requests

```text
http://localhost:3000/
http://localhost:3000/about
http://localhost:3000/time
http://localhost:3000/unknown
```

## Screenshots

Save screenshots of your working routes in the `screenshots/` folder.

### Home Route

![Screenshot](./Screenshot%202026-10-18%20211536.png)

### About Route

![Screenshot](./Screenshot%202026-10-18%20211548.png)

### Time Route

![Screenshot](./Screenshot%202026-10-18%20211557.png)

### 404 Route

![Screenshot](./Screenshot%202026-10-18%20211855.png )
## Deployment

The application can be deployed using a Node.js-compatible hosting service such as Render or Railway.

Configure the hosting service to install dependencies using `npm install` and start the application using `node server.js`.

For deployment, the server should use the port provided by the hosting environment when available.

**Live URL:** Not deployed yet.

After successful deployment, replace this line with the actual public URL.

## Problems Faced and Solutions

| Problem | Solution |
|---|---|
| Understanding npm project setup | Used `npm init -y` to create `package.json`. |
| Express was not available initially | Installed Express using `npm install express`. |
| Different routes need different response formats | Used `res.send()` for text and `res.json()` for JSON. |
| Generating the current date and time | Used `new Date()` in the `/time` route. |
| Handling unknown URLs | Added middleware to return a 404 response. |
| PowerShell blocked the npm command | Used `npm.cmd` to execute npm commands in PowerShell. |

## Learning Outcomes

- Created a Node.js project using npm.
- Understood the purpose of `package.json`, `package-lock.json`, and `node_modules`.
- Installed and used Express.js.
- Created an Express server listening on port 3000.
- Implemented GET routes and returned text and JSON responses.
- Generated the current date and time using `new Date()`.
- Used HTTP status codes 200 and 404.
- Learned to document and prepare a backend project for GitHub submission.

## Git Hygiene

Create a `.gitignore` file in the project root with the following entries:

```gitignore
node_modules/
.env
```

Do not commit `node_modules`, `.env`, passwords, API keys, or other secret information to GitHub.

## GitHub Repository

Add your GitHub repository URL here after uploading your project:

https://github.com/sriramrayabarapu/Backend-Development-Fundamentals
