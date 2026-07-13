# TradeOxx Ai 🚀

**TradeOxx Ai** is a modern, full-stack simulated paper trading platform. It provides a risk-free environment for users to practice trading stocks and cryptocurrencies using real-time market simulation, portfolio tracking, and interactive charting.

---

## 🌟 Key Features

* **Real-Time Market Simulation**: A sophisticated backend engine simulates live price movements for popular assets (AAPL, TSLA, BTC, ETH) without requiring paid external APIs.
* **Paper Trading Portfolio**: Users start with $100,000 in virtual currency to buy and sell assets. The platform calculates Realized PnL, Unrealized PnL, and Cost Basis in real-time.
* **Stateless Cloud Architecture**: Engineered to run entirely on serverless platforms (like Vercel) without needing a dedicated database. User profiles and portfolios are seamlessly auto-synced across cloud instances on the fly.
* **Interactive Financial Charts**: Beautiful, responsive candlestick charts powered by lightweight charting libraries.
* **Modern UI/UX**: Designed with a sleek "Dark Mode" aesthetic, glassmorphism elements, and smooth animations reminiscent of premium fintech apps.

---

## 🛠️ Technology Stack

**Frontend (Client)**
* **Framework**: React 18 powered by Vite for lightning-fast HMR and building.
* **Styling**: Tailwind CSS for utility-first, highly responsive design.
* **State Management**: Zustand for lightweight global state (Auth, Portfolio).
* **Routing**: React Router (HashRouter) for static-friendly navigation.
* **Data Fetching**: Axios & React Query for caching and polling.
* **Icons & Animation**: Lucide React & Framer Motion.

**Backend (Server)**
* **Runtime**: Node.js
* **Framework**: Express.js
* **Authentication**: JWT (JSON Web Tokens) & bcryptjs for secure password hashing.
* **Storage**: In-memory JSON DataStore engineered for Vercel's ephemeral serverless environment.

---

## 📂 Project Structure

The project uses a monorepo approach, keeping the frontend and backend cleanly separated but easy to deploy together.

```text
TradeOxx Ai/
├── client/                 # React Frontend Application
│   ├── src/
│   │   ├── components/     # Reusable UI elements (Dashboard, Modals, Forms)
│   │   ├── pages/          # Main route views
│   │   ├── stores/         # Zustand global state managers
│   │   ├── hooks/          # Custom React hooks (e.g., useMarketData)
│   │   └── lib/            # Utilities and API interceptors
│   ├── index.html          # Vite entry point
│   └── vite.config.ts      # Vite configuration
│
├── backend/                # Node.js Express Server
│   ├── src/
│   │   ├── engine/         # Live market simulation engine
│   │   ├── middleware/     # JWT Authentication interceptors
│   │   ├── routes/         # API endpoints (auth, portfolio, market)
│   │   └── store/          # Stateless database logic
│   └── package.json
│
├── package.json            # Root workspace scripts
└── vercel.json             # Vercel deployment configuration
```

---

## 💻 Running Locally

Running the project on your local machine is incredibly simple.

**Prerequisites:**
* Node.js (v18 or higher)
* npm or yarn

**1. Install Dependencies**
From the root folder, run the following command to install dependencies for both the frontend and the backend simultaneously:
```bash
npm run install:all
```

**2. Start the Application**
Run both the React frontend and the Express backend concurrently with a single command:
```bash
npm run dev
```

* The **Frontend** will be available at: `http://localhost:5173`
* The **Backend API** will be available at: `http://localhost:3001`

*(Note: The frontend is pre-configured to automatically proxy API requests to port 3001 during local development).*

---

## ☁️ Deployment

This application is configured for seamless deployment on **Vercel**. 

1. Push your code to a GitHub repository.
2. Import the repository into Vercel.
3. Vercel will automatically detect the `vercel.json` file.
4. The frontend will be built and served statically from `client/dist`.
5. The backend will be converted into serverless functions served at `/api/*`.

Because the app uses a custom stateless data store, you do **not** need to set up an external database (like PostgreSQL or MongoDB) for the platform to function! Users can register, log in, and trade entirely in memory.
