# Clankpad V2 Frame 🚀

A production-ready Farcaster Frame V2 (Mini-App) built with **Next.js 15**, **React 19**, **TypeScript**, and **Tailwind CSS** that enables users to launch ERC-20 Clanker tokens directly inside Farcaster clients (Warpcast) on Base.

Built for the **$250 USDC Bountycaster Bounty** posted by `@mcbain` ([Bounty Thread Hash: `0xf1e26abf8a549fe5419a7b9a643dadafa84c5957`](https://warpcast.com/mcbain/0xf1e26abf8a549fe5419a7b9a643dadafa84c5957)).

---

## ✨ Features

- **Token Creation Inputs**:
  - Ticker Symbol input (with automatic uppercase formatting and `$` prefixing)
  - Token Name input
  - Token Icon Image URL with live preview and quick preset selectors
  - Channel selector dropdown/grid (`/clanker`, `/base`, `/degen`, `/dev`, `/higher`)
- **Pending & Confirmation Flow**:
  - Live deployment stepper progress animation:
    1. Validating ticker & Base network parameters
    2. Dispatching launch cast to the chosen channel
    3. Simulating Clanker factory contract deployment & Uniswap v3 pool creation
  - Confirmation card displaying:
    - Token name, ticker, and image
    - Base contract address with direct BaseScan explorer link
    - Transaction hash with explorer link
    - 1-click **Share Cast to Warpcast** pre-filling the launch announcement
- **Frame V2 & Mini-App Standard**:
  - Full `.well-known/farcaster.json` manifest route for Farcaster Mini-Apps
  - OpenGraph / Farcaster meta tags configured in `app/layout.tsx`
  - Mobile-optimized responsive layout designed specifically for Warpcast in-app frames

---

## 🛠️ Quick Start

```bash
# Install dependencies
npm install

# Run local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to test the interactive token launch interface.

### Testing Frame V2 Manifest

Visit `http://localhost:3000/.well-known/farcaster.json` to verify the Farcaster Mini-App manifest specification.

---

## 📦 Deployment

Deploy effortlessly to **Vercel** with zero configuration:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Once deployed, copy your deployment URL (e.g., `https://your-clankpad.vercel.app`) and paste it into the Warpcast Frame debugger at [https://warpcast.com/~/developers/frames](https://warpcast.com/~/developers/frames).

---

## 👨‍💻 Author

- GitHub: [@Ayoola-tech2024](https://github.com/Ayoola-tech2024)
- Stack: TypeScript, Next.js, React, Tailwind CSS, Base/EVM
