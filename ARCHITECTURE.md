# TradeOxx AI — Technical System Architecture

This document outlines the system architecture of **TradeOxx AI**, a high-performance full-stack simulated trading platform, mapped across the 13 foundational system design areas.

---

## 1. Frontend
The frontend is a single-page application (SPA) optimized for ultra-smooth responsiveness and high-frequency UI updates.

*   **Core Framework**: React 18 powered by **Vite** for rapid hot-module reloading (HMR) and optimized minified production builds.
*   **Design & Styling**: Tailored vanilla CSS styled with a sleek, premium dark-mode fintech aesthetic. Responsive layouts are fluidly adjusted to support full-screen ratios on both mobile devices and desktop screens.
*   **State Management**: **Zustand** stores handle lightweight, reactive client-side state:
    *   [authStore.js](file:///c:/Users/prash/Downloads/TradeOxx%20Ai/client/src/stores/authStore.js): Manages active session context and token storage.
    *   [marketStore.js](file:///c:/Users/prash/Downloads/TradeOxx%20Ai/client/src/stores/marketStore.js): Receives interval price quotes and triggers fast UI updates.
    *   [portfolioStore.js](file:///c:/Users/prash/Downloads/TradeOxx%20Ai/client/src/stores/portfolioStore.js): Computes real-time PnL, holdings, and transaction history locally.
*   **Interactive Graphics**: Recharts engine generates clean, real-time candlestick charts and portfolio asset allocations.
*   **Apexx AI Integration**: The [ChatBot.jsx](file:///c:/Users/prash/Downloads/TradeOxx%20Ai/client/src/components/ui/ChatBot.jsx) interface is built directly into the client, wired to the global market state and portfolio indicators for live, context-aware financial audit replies.
*   **Smooth Display Refresh**: Native settings are tuned to render up to **165Hz refresh rates**, minimizing frame latency for active chart scaling and slider interactions.

---

## 2. APIs & Backend Logic
The backend is an event-driven service built on **Node.js** and **Express.js** that simulates real-world market operations.

*   **API Routes**: Separate modular endpoint controllers process trading requests:
    *   [auth.js](file:///c:/Users/prash/Downloads/TradeOxx%20Ai/server/src/routes/auth.js): Handles user sign-up, sign-in, and credentials.
    *   [market.js](file:///c:/Users/prash/Downloads/TradeOxx%20Ai/server/src/routes/market.js): Serves simulated asset details, historic quotes, and metrics.
    *   [portfolio.js](file:///c:/Users/prash/Downloads/TradeOxx%20Ai/server/src/routes/portfolio.js): Processes simulated order executions and checks balance limits.
*   **Simulation Engine**: The [marketEngine.js](file:///c:/Users/prash/Downloads/TradeOxx%20Ai/server/src/engine/marketEngine.js) runs an interval loop every 2 seconds. It uses mathematical drift models to simulate realistic fluctuations for 16 major financial assets (stocks/crypto) without external API dependencies.

---

## 3. Database & Storage
The application utilizes an ephemeral data system designed for low-latency writes and serverless compatibility.

*   **In-Memory Database**: [dataStore.js](file:///c:/Users/prash/Downloads/TradeOxx%20Ai/server/src/models/dataStore.js) operates a fast in-memory document store.
*   **Local File Persistence**: Periodically serializes updates to a JSON database at [store.json](file:///c:/Users/prash/Downloads/TradeOxx%20Ai/server/data/store.json).
*   **Serverless Temp Storage**: When deployed to serverless providers (like Vercel), data operations are automatically rerouted to write files directly to `/tmp/tradeoxx-data` to conform with read-only root directory limitations.

---

## 4. Auth & Permission
Access control is implemented via secure, standard JWT token validation mechanisms.

*   **Password Hashing**: User passwords are encrypted on register and verified on login using **bcryptjs** (10 salt rounds).
*   **Session Token**: The server generates JSON Web Tokens (JWT) signed using a secure secret key.
*   **Route Protection**: The [auth.js](file:///c:/Users/prash/Downloads/TradeOxx%20Ai/server/src/middleware/auth.js) middleware validates authorization header tokens (`Bearer <token>`) on all protected client requests (e.g., executing trades or fetching portfolio parameters).

---

## 5. Hosting & Deployment
The repository is optimized for quick, automated deployments.

*   **Configuration**: [vercel.json](file:///c:/Users/prash/Downloads/TradeOxx%20Ai/vercel.json) orchestrates output build directories and sets path rewrites:
    *   Statically serves the built React client (`/client/dist`).
    *   Proxies all `/api/*` endpoints to the serverless function handler located in `/api/index.js`.
*   **Vercel Build Target**: Built automatically by installing workspace dependencies and running client compiling steps.

---

## 6. Cloud & Compute
The platform is built to run across standard cloud environments.

*   **Serverless Compute**: Functions run statelessly on demand inside Vercel's compute nodes, optimizing server resources.
*   **Docker Compute Options**: Custom configurations are provided in [Dockerfile.server](file:///c:/Users/prash/Downloads/TradeOxx%20Ai/docker/Dockerfile.server) and [Dockerfile.client](file:///c:/Users/prash/Downloads/TradeOxx%20Ai/docker/Dockerfile.client) to bundle compile steps for standard cloud container platforms (AWS ECS, Google Cloud Run).

---

## 7. CI/CD & Version Control
Version control and pipeline tasks are managed directly in GitHub.

*   **Source Sync**: Git coordinates code changes under `main` branch versioning.
*   **Automation Pipelines**: [create-project.yml](file:///c:/Users/prash/Downloads/TradeOxx%20Ai/.github/workflows/create-project.yml) automates project settings:
    *   Triggers on `push` event workflows to setup, link, and refresh repository projects.

---

## 8. Security & RLS
Multiple security layers protect the interface and connection routes.

*   **CORS (Cross-Origin Resource Sharing)**: Configured inside the server to restrict requests to allowed origins or handle sessions credentials safely.
*   **Helmet Headers**: Automatically integrates standard HTTP security headers to protect from cross-site scripting (XSS), clickjacking, and injection vectors.
*   **Client Validation**: Inputs (like payment details, quantities, and email changes) are sanitized and validated on the client side before hitting the API.

---

## 9. Rate Limiting
Protects endpoints against brute force attempts and denial of service attacks.

*   **Rate Limiter**: Configured with `express-rate-limit` middleware.
*   **Rule Set**: Limits each unique IP address to a maximum of 200 requests within a 15-minute window on all `/api/` paths, returning HTTP 429 Too Many Requests if exceeded.

---

## 10. Caching & CDN
Accelerates page loads and asset delivery globally.

*   **Static Asset CDN**: Minified CSS, JSX, and icons are deployed to Vercel's global Edge Network, serving content from nodes nearest to the user.
*   **Client Cache**: Assets build files use unique hash identifiers (`index-B8lNnwWY.css`), allowing browsers to cache files permanently until subsequent updates are released.

---

## 11. Load Balancing & Scaling
Designed to manage traffic growth through decoupling.

*   **Separation of Concerns**: Decoupling the client code (served statically via CDN) and API logic (processed via serverless backend instances) ensures that sudden traffic spikes on the landing page do not exhaust backend compute resources.
*   **Reverse Proxy Options**: The [compose-traefik.yml](file:///c:/Users/prash/Downloads/TradeOxx%20Ai/docker/compose-traefik.yml) container config provides Traefik rule settings to run multiple scaled containers behind a local load balancer.

---

## 12. Error Tracking & Logs
Provides logs to audit operations and trace errors.

*   **Request Logs**: Morgan middleware formats and prints detailed HTTP request/response stats (`morgan('combined')`) to standard logs.
*   **Diagnostic Warnings**: DataStore loading processes include catch blocks to capture and output filesystem errors (`[DataStore] Failed to load store file`).

---

## 13. Availability & Recovery
Ensures high availability and recovery from instance recycles.

*   **Stateless Recovery**: Since serverless nodes are ephemeral, if a user profile is missing in the current memory segment, [dataStore.js](file:///c:/Users/prash/Downloads/TradeOxx%20Ai/server/src/models/dataStore.js#L137-L148) queries and auto-creates a recovery user/portfolio record using context parameters from their authenticated JWT token in under 2 milliseconds.
*   **Data Seeding Fallback**: If the local file storage fails or is deleted, seed fallbacks initialize empty arrays to prevent server crash loops.
