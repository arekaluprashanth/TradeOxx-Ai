# TradeOxx AI — Full-Stack Project Architecture

Welcome to **TradeOxx AI**, a modern, full-stack trading simulation platform that allows users to practice stock and crypto trading. This document maps out the entire directory structure, explaining the role of every key file and folder to help clients, developers, and project maintainers easily understand and work with the codebase.

---

## 📁 Project Overview & Layout

The project is structured as a monorepo consisting of a decoupled frontend client, a backend simulation engine, Docker configurations, and a native Android project wrap.

```
TradeOxx Ai/
├── .github/                # Automation and CI/CD pipelines
├── android/                # Capacitor-generated native Android app wrapping the web build
├── api/                    # Serverless routing proxy for Vercel deployment
├── backend/                # Node.js + Express API server simulating financial markets
├── client/                 # React + Vite + Tailwind CSS frontend interface
├── docker/                 # Container files for local and cloud Docker deployments
└── configs & workflows     # CI/CD workflows and deployment configurations
```

---

## 📂 Detailed File & Directory Map

### 1. Root Configuration & Dependencies
These files manage dependencies, scripts, build workflows, and deployment targets.

- [package.json](file:///c:/Users/prash/Downloads/TradeOxx%20Ai/package.json): Defines root scripts for the monorepo workspace to concurrently install, develop, build, and deploy both backend and client (e.g., `npm run dev`, `npm run build`, `npm run install:all`).
- [vercel.json](file:///c:/Users/prash/Downloads/TradeOxx%20Ai/vercel.json): Configures routes, output directory, and serverless path rewrites for serverless Vercel cloud deployment.
- [.vercelignore](file:///c:/Users/prash/Downloads/TradeOxx%20Ai/.vercelignore): Specifies files and directories (like `android/` and `docker/`) that Vercel should skip uploading to optimize build speeds.
- [.gitignore](file:///c:/Users/prash/Downloads/TradeOxx%20Ai/.gitignore): Prevents build folders (`client/dist`), dependencies (`node_modules`), keys, and environment overrides from being committed to version control.

---

### 2. Frontend Client (`/client`)
Built using **React (TypeScript)**, **Vite** (bundler), and **Tailwind CSS** (for styling).

- **`/src/pages/`**: Represents individual view layouts loaded by React Router:
  - [DashboardPage.tsx](file:///c:/Users/prash/Downloads/TradeOxx%20Ai/client/src/pages/DashboardPage.tsx): Main hub containing user portfolio stats, recent trades, and account summary.
  - [PortfolioPage.tsx](file:///c:/Users/prash/Downloads/TradeOxx%20Ai/client/src/pages/PortfolioPage.tsx): Displays asset allocations, detailed holdings, and net asset value (NAV) progress.
  - [WatchlistPage.tsx](file:///c:/Users/prash/Downloads/TradeOxx%20Ai/client/src/pages/WatchlistPage.tsx): Allows users to add, monitor, and remove assets from their custom dashboard lists.
  - [ChartsPage.tsx](file:///c:/Users/prash/Downloads/TradeOxx%20Ai/client/src/pages/ChartsPage.tsx): Interactive charting interface supporting multiple assets.
  - [StrategyPage.tsx](file:///c:/Users/prash/Downloads/TradeOxx%20Ai/client/src/pages/StrategyPage.tsx): View for creating, testing, and applying customized algorithmic trading parameters.
  - [SettingsPage.tsx](file:///c:/Users/prash/Downloads/TradeOxx%20Ai/client/src/pages/SettingsPage.tsx): Settings for simulation resets, trading limits, and profile edits.
- **`/src/components/`**: Reusable modular widgets:
  - `/auth/`: Modal elements and forms for handling Login, Signup, and Password changes.
  - `/charts/`: Contains Recharts wrappers rendering interactive candlestick charts, order books, and depth charts.
  - `/dashboard/`: Layout widgets like `Sidebar`, `TopNav`, `BottomNav`, and notifications.
  - `/portfolio/`: Interactive graphs showing holdings, asset breakdowns, and trade histories.
  - `/trading/`: The trading widget supporting Buy/Sell market orders and order validation checks.
  - `/ui/`: Generic style tokens (e.g., custom glassmorphism containers, modal overlay templates, buttons).
- **`/src/stores/`**: Managed by **Zustand** for global, lightweight React state tracking:
  - `authStore.ts`: Global state tracking logged-in user profiles and JSON Web Tokens.
  - `marketStore.ts`: Feeds live asset quotes and updates lists across all active views.
  - `portfolioStore.ts`: Handles virtual balances, current holdings, and PnL calculation states.
- **`/src/hooks/`**: Custom React Hooks:
  - `useMarketData.ts`: Handles interval polling of backend pricing simulation APIs.

---

### 3. Backend Service (`/backend`)
A lightweight, fast **Express.js API server** running on Node.js.

- [index.js](file:///c:/Users/prash/Downloads/TradeOxx%20Ai/backend/src/index.js): Express app entry point. Sets up CORS policies, helmet security headers, rate limiting, request routing, and starts the market tick simulation loop.
- **`/src/engine/`**:
  - [marketEngine.js](file:///c:/Users/prash/Downloads/TradeOxx%20Ai/backend/src/engine/marketEngine.js): The heart of the simulator. Uses mathematical drift algorithms to simulate real-time price ticks for assets like Apple (AAPL), Tesla (TSLA), Bitcoin (BTC), and Ethereum (ETH) every 2 seconds without external api costs.
- **`/src/store/`**:
  - [dataStore.js](file:///c:/Users/prash/Downloads/TradeOxx%20Ai/backend/src/store/dataStore.js): Custom stateless database persistence file. In serverless environments (like Vercel), it safely persists registered accounts, cash balances, and holdings inside `/tmp/tradeoxx-data` on the fly.
- **`/src/routes/`**: Handles HTTP API routes:
  - [auth.js](file:///c:/Users/prash/Downloads/TradeOxx%20Ai/backend/src/routes/auth.js): Resolves user registration, password hashing (bcrypt), and login token generation (JWT).
  - [market.js](file:///c:/Users/prash/Downloads/TradeOxx%20Ai/backend/src/routes/market.js): Serves current simulated prices, order book levels, and asset metadata.
  - [portfolio.js](file:///c:/Users/prash/Downloads/TradeOxx%20Ai/backend/src/routes/portfolio.js): Handles order execution (Buy/Sell) and checks user balance restrictions before validating trades.
  - [watchlist.js](file:///c:/Users/prash/Downloads/TradeOxx%20Ai/backend/src/routes/watchlist.js): Persists assets added to user watchlists.
  - [strategies.js](file:///c:/Users/prash/Downloads/TradeOxx%20Ai/backend/src/routes/strategies.js): Processes algorithm simulations and parameters.
- **`/src/middleware/`**:
  - `auth.js`: Verifies bearer JWT header tokens before allowing clients access to private trading and profile endpoints.

---

### 4. Docker Infrastructure (`/docker`)
Standardized containers to build and run the entire stack locally or in the cloud.

- [docker-compose.yml](file:///c:/Users/prash/Downloads/TradeOxx%20Ai/docker/docker-compose.yml): Coordinates and runs the server container (exposed privately) and the client container (exposed on port 80) inside a bridge network.
- [compose-traefik.yml](file:///c:/Users/prash/Downloads/TradeOxx%20Ai/docker/compose-traefik.yml): Alternate compose file supporting Traefik reverse proxy headers, TLS termination, and Let's Encrypt certificates.
- [Dockerfile.client](file:///c:/Users/prash/Downloads/TradeOxx%20Ai/docker/Dockerfile.client): Multi-stage Docker build file that compiles the React application and serves the bundle statically using an optimized Nginx container.
- [Dockerfile.server](file:///c:/Users/prash/Downloads/TradeOxx%20Ai/docker/Dockerfile.server): Builds the Node.js production runtime for running the backend simulated API.

---

### 5. Native Android Wrap (`/android`)
Generates the compilation wrapper for deployment on Android devices.

- [build.gradle](file:///c:/Users/prash/Downloads/TradeOxx%20Ai/android/app/build.gradle): Specifies compilation target SDK configurations, the namespace (`com.tradeoxx.ai`), and the package ID (`com.tradeoxx.ai`).
- [strings.xml](file:///c:/Users/prash/Downloads/TradeOxx%20Ai/android/app/src/main/res/values/strings.xml): Defines app metadata resources including string displays, schemas, and native activity names.
- [MainActivity.java](file:///c:/Users/prash/Downloads/TradeOxx%20Ai/android/app/src/main/java/com/tradeoxx/ai/MainActivity.java): Main entry point extending BridgeActivity, pre-configured with refresh-rate modifiers for 90Hz/120Hz/165Hz Android screens.

---

### 6. GitHub Actions Workflows (`/.github/workflows`)
- [deploy.yml](file:///c:/Users/prash/Downloads/TradeOxx%20Ai/.github/workflows/deploy.yml): Automatic CI/CD pipeline triggered on code pushes to building Docker images and deploying them to production hosting.
