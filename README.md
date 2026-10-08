# Intellicore Company



A full-stack digital agency and product studio website built with React on the frontend and Express + MongoDB on the backend. The project presents a polished brand experience for a fictional consultancy called Nexora Labs, with services, case studies, project filtering/search, and a working contact form that persists submissions in MongoDB.

This repository contains the complete implementation for the web platform and its API layer.

## Project overview

This application is designed as a modern marketing + portfolio website for a digital product studio. It combines a high-end branded landing experience with structured content pages and a backend API for project and contact data.

The platform includes:

- A premium landing page with hero, services, proof points, testimonials, and CTAs
- An About page describing the studio’s mission, values, processes, and team
- A Services page detailing delivery offerings such as web development, mobile, UX, cloud, AI, and custom software
- A Projects page with search and category filtering
- Dynamic project detail pages using slug-based routing
- A contact form with client-side validation and server-side validation
- An Express API that exposes project data and handles contact submissions
- MongoDB persistence for lead/contact requests

## Brand and product positioning


- strategic consulting
- product design and UX
- frontend and backend engineering
- AI and automation
- cloud infrastructure and DevOps
- custom software systems

## Tech stack

### Frontend
- React 19
- Vite 8
- React Router DOM 7
- Framer Motion
- Lucide React
- Tailwind CSS 4
- Custom CSS design system and page styling

### Backend
- Node.js
- Express 5
- MongoDB via Mongoose
- CORS
- dotenv

### Data and persistence
- MongoDB database connection
- Project schema with slug-based retrieval
- Contact model for inquiry submissions

## Repository structure

```text
intellicore-company/
├── client/
│   ├── public/
│   │   ├── favicon.svg
│   │   ├── icons.svg
│   │   └── images/
│   ├── src/
│   │   ├── components/
│   │   ├── data/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── utils/
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   └── vite.config.*
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── README.md
└── .gitignore (if present in the workspace)
```

## Architecture overview

The project is split into two primary runtime systems:

### 1) Client app
The frontend is a single-page React application using browser routing. It uses route-based pages for:

- `/` — Home
- `/about` — About
- `/services` — Services
- `/projects` — Portfolio listing
- `/projects/:slug` — Individual project detail
- `/contact` — Contact form
- `*` — NotFound

The frontend communicates with the backend through a central API client that wraps `fetch` requests.

### 2) Express API
The backend provides a lightweight REST API with CORS enabled and request validation. It exposes:

- project listing
- project detail lookup by slug
- health check endpoint
- contact lead submission

## Frontend capabilities

### Home page
The landing page integrates several sections:

- hero section with strong messaging and CTAs
- stats widgets
- service overview cards
- principles or delivery methodology
- featured projects
- project process steps
- testimonials
- final CTA area

### About page
This page communicates the studio’s story, values, mission, timeline, and technical capability mix. It is structured to feel editorial and premium rather than generic corporate.

### Services page
The service content is presented as a set of strategic and technical offerings such as:

- Web Development
- Mobile Development
- UI/UX Design
- Cloud & DevOps
- AI & Automation
- Custom Software

Each service includes descriptive copy, capabilities, technologies, and feature summaries.

### Projects page
The projects page is data-driven and supports:

- category filter buttons
- free-text search
- animated cards
- project loading states
- retry handling when the API is unavailable

Project cards are generated from shared content modules and API-backed data.

### Project detail page
Each project detail page reads a slug from the URL and displays deeper information about:

- problem/challenge
- approach
- highlights
- outcome
- technology stack
- status and category

### Contact page
The contact form includes:

- validation on blur and submit
- field limits and formats
- accessible full-structure labeling
- success/error messaging
- submission payload to the backend API

## Backend features

### Health check endpoint
The server exposes:

```http
GET /api/health
```

This returns a status such as:

```json
{
  "status": "ok",
  "database": "connected",
  "timestamp": "2026-10-07T00:00:00.000Z"
}
```

### Projects API

```http
GET /api/projects
GET /api/projects/:slug
```

The project API returns an array of projects or a single project object as JSON.

### Contact API

```http
POST /api/contact
```

This endpoint accepts a JSON body containing:

- name
- email
- phone
- company
- service
- budget
- message

The backend validates that:

- fields are correct types
- the request is not empty
- email format is valid
- name and message are long enough
- phone format is valid when provided
- unexpected fields are rejected

On success:

```json
{
  "success": true,
  "message": "Contact request received",
  "data": {
    "id": "..."
  }
}
```

## MongoDB models

### Project model
The `Project` schema includes:

- title
- slug
- description
- category
- image
- gallery
- technologies
- features
- results
- liveUrl
- githubUrl
- featured
- createdAt

The slug is unique, lowercase, and must match a strict pattern for safe URL usage.

### Contact model
The `Contact` schema includes:

- name
- email
- phone
- company
- service
- budget
- message
- createdAt

Validation includes trimming, required fields, maximum lengths, and a regex for valid email addresses.

## Environment setup

### Client environment variables
Create a `.env` file inside `client/` using the `.env.example` file as a template:

```env
VITE_API_URL=http://localhost:5000/api
VITE_SITE_URL=https://nexoralabs.com
```

### Server environment variables
Create a `.env` file inside `server/` using the provided example:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/nexora_labs
CLIENT_URL=http://localhost:5173
# Optional DNS resolver override for MongoDB SRV lookup failures.
# MONGO_DNS_SERVERS=1.1.1.1,8.8.8.8
```

## Installation

From the project root:

```bash
cd client
npm install
```

Then in the server directory:

```bash
cd ../server
npm install
```

## Running the application

### Start the backend

```bash
cd server
npm run dev
```

The server starts with Node’s file watcher and listens on the configured port (default `5000`).

### Start the frontend

```bash
cd client
npm run dev
```

The Vite dev server usually runs on:

```text
http://localhost:5173
```

### Production build

Frontend:

```bash
cd client
npm run build
```

Preview the production build:

```bash
cd client
npm run preview
```

Backend production start:

```bash
cd server
npm start
```

## Development notes

### Client-side architecture
The client uses a simple but clear component structure:

- `components/` — shared UI blocks like buttons, nav, footer, cards, and sections
- `pages/` — route-level pages
- `data/` — static content for navigation, home, services, projects, and about sections
- `services/` — API client helpers
- `hooks/` — reusable page logic such as document title updates
- `layouts/` — page shell wrappers
- `styles/` — global visual system and theme tokens

### State management
The frontend does not use Redux or React Context for application state. It uses React's local `useState` hook for page- and component-level state, including project loading/filter/search state, contact form values and validation, and the navigation menu state. This keeps state close to the UI that owns and updates it.

### Server architecture
The backend is kept modular and is organized around:

- `config/` — database configuration
- `controllers/` — route action handlers
- `middleware/` — validation and error handling
- `models/` — MongoDB schemas
- `routes/` — API route definitions

### Cross-origin behavior
The Express server uses CORS with a whitelist derived from `CLIENT_URL` and accepts only configured origins. This prevents unrestricted cross-origin access during local development and production deployment.

## Project data model

The content is split between static design/content modules and dynamic project data.

### Static content examples
The frontend uses files such as:

- `client/src/data/homeContent.js`
- `client/src/data/aboutContent.js`
- `client/src/data/services.js`
- `client/src/data/navigation.js`

These files define service information, section text, stats, and navigation items shown throughout the site.

### Project dataset examples
The project portfolio is backed by dynamic arrays and API content, including concept stories such as:

- Finova
- ShopVerse
- Aperture
- Northline
- Monument
- Lumen

These concepts cover fintech, e-commerce, AI, productivity, property systems, and personal finance experiences.

## Testing the API with Postman

Start the backend and make sure MongoDB is available before sending requests. In Postman, create an environment with:

| Variable | Initial value |
| --- | --- |
| `baseUrl` | `http://localhost:5000` |

Use the selected environment for the requests below. For JSON requests, set **Body → raw → JSON**; Postman will send `Content-Type: application/json`. All API routes are under `{{baseUrl}}/api`.

### API route checklist

| Method | URL | Purpose | Success status |
| --- | --- | --- | --- |
| `GET` | `{{baseUrl}}/api/health` | Check API and MongoDB connection | `200` when connected |
| `GET` | `{{baseUrl}}/api/projects` | List projects | `200` |
| `GET` | `{{baseUrl}}/api/projects/finova` | Get a project by slug (replace `finova` with a slug present in your database) | `200` |
| `POST` | `{{baseUrl}}/api/contact` | Submit a contact request | `201` |

### 1. Health check

**Request:** `GET {{baseUrl}}/api/health`

No request body is needed. When MongoDB is connected, expect `200 OK`:

```json
{
  "status": "ok",
  "database": "connected",
  "timestamp": "2026-10-07T00:00:00.000Z"
}
```

If the database connection drops after the server starts, the endpoint returns `503 Service Unavailable` with `"status": "unavailable"` and `"database": "disconnected"`.

### 2. List projects

**Request:** `GET {{baseUrl}}/api/projects`

No request body is needed. Expect `200 OK` with the projects sorted with featured items first and newest items next:

```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "title": "Finova",
      "slug": "finova"
    }
  ]
}
```

The `data` array contains the full project documents; the example above is shortened to show the response shape.

### 3. Get a project by slug

**Request:** `GET {{baseUrl}}/api/projects/finova`

Replace `finova` with the slug of a project in your database. Expect `200 OK`:

```json
{
  "success": true,
  "data": {
    "title": "Finova",
    "slug": "finova"
  }
}
```

The `data` object contains the full project document. A slug that does not match a project returns `404 Not Found`:

```json
{
  "success": false,
  "message": "Project not found"
}
```

### 4. Submit a contact request

**Request:** `POST {{baseUrl}}/api/contact`

Set **Body → raw → JSON** and send:

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "+1 555 010 0200",
  "company": "Example Studio",
  "service": "Web Development",
  "budget": "$20k - $50k",
  "message": "We need a polished product website and custom app experience."
}
```

`name`, `email`, and `message` are required. The other fields are optional and may be omitted or sent as empty strings. All supplied values must be strings. The API trims values, validates the email and optional phone, and rejects unknown fields. Field length limits are: name 100, email 254, phone 30, company 160, service 120, budget 80, and message 5000 characters. Name must contain at least 2 characters and message at least 10.

Expect `201 Created`:

```json
{
  "success": true,
  "message": "Contact request received",
  "data": {
    "id": "created-contact-id"
  }
}
```

### Contact validation checks

Use the same `POST {{baseUrl}}/api/contact` route to verify error handling. Each invalid request should return `400 Bad Request` with `"success": false` and a descriptive `"message"`:

| Check | Example change to the valid JSON | Expected message |
| --- | --- | --- |
| Missing/short name | Set `"name": "J"` | `Name must be at least 2 characters` |
| Missing/invalid email | Remove `email` or set `"email": "not-an-email"` | `A valid email address is required` |
| Missing/short message | Set `"message": "Short"` | `Message must be at least 10 characters` |
| Invalid phone | Set `"phone": "abc"` | `Phone number is invalid` |
| Non-string field | Set `"name": 123` | `name must be a string` |
| Unknown field | Add `"subject": "Hello"` | `Unknown field: subject` |
| Field over its limit | Send a `name` longer than 100 characters | `name must be 100 characters or fewer` |
| Non-object body | Send a JSON array instead of an object | `Request body must be a JSON object` |

In development, error responses can additionally contain an `"error"` property with the error type. In production, that property is omitted.

### Unknown route check

**Request:** `GET {{baseUrl}}/api/unknown`

Expect `404 Not Found` with a JSON error response whose message identifies the requested method and path. Only the routes listed above are implemented; there are no project-create, project-update, or project-delete endpoints.

## Quick start summary

```bash
# Terminal 1: backend
cd server
npm install
cp .env.example .env
npm run dev

# Terminal 2: frontend
cd client
npm install
cp .env.example .env
npm run dev
```

Then open:

```text
http://localhost:5173
```



## Conclusion

This repository is a complete full-stack digital studio website with a strong front-end brand experience, a usable project portfolio, and a robust backend for contact and project APIs. It is a good example of a modern React + Express + MongoDB architecture, combining marketing-site design with real data-driven functionality.
