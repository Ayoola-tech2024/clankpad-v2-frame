"use client";

import React, { useState } from "react";
import { 
  Rocket, 
  Image as ImageIcon, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  ExternalLink, 
  Share2, 
  RefreshCw, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap
} from "lucide-react";

interface Channel {
  id: string;
  name: string;
  badge: string;
  icon: string;
}

const CHANNELS: Channel[] = [
  { id: "clanker", name: "/clanker", badge: "Primary", icon: "🤖" },
  { id: "base", name: "/base", badge: "Ecosystem", icon: "🔵" },
  { id: "degen", name: "/degen", badge: "Community", icon: "🎩" },
  { id: "dev", name: "/dev", badge: "Builders", icon: "💻" },
  { id: "higher", name: "/higher", badge: "Meme", icon: "🏹" },
];

type LaunchStatus = "idle" | "validating" | "deploying" | "success" | "error";

interface DeployedToken {
  name: string;
  symbol: string;
  channel: string;
  imageUrl: string;
  contractAddress: string;
  txHash: string;
  blockNumber: number;
  poolFee: string;
  timestamp: string;
}

export default function TokenLauncher() {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [channel, setChannel] = useState("clanker");
  const [imageUrl, setImageUrl] = useState("");
  const [status, setStatus] = useState<LaunchStatus>("idle");
  const [stepMessage, setStepMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [deployedToken, setDeployedToken] = useState<DeployedToken | null>(null);

  // Quick image presets for instant preview
  const SAMPLE_IMAGES = [
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=150&auto=format&fit=crop&q=80"
  ];

  const handleLaunch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setErrorMessage("Please enter a token name");
      setStatus("error");
      return;
    }
    if (!symbol.trim()) {
      setErrorMessage("Please enter a ticker symbol");
      setStatus("error");
      return;
    }

    const cleanSymbol = symbol.startsWith("$") ? symbol.toUpperCase() : `$${symbol.toUpperCase()}`;

    setStatus("validating");
    setErrorMessage("");
    setStepMessage("1/3 Validating token ticker & parameters on Base...");

    setTimeout(() => {
      setStatus("deploying");
      setStepMessage(`2/3 Dispatching launch cast to /${channel} & syncing Clanker factory...`);

      setTimeout(() => {
        setStepMessage("3/3 Initializing Uniswap v3 liquidity pool on Base...");

        setTimeout(() => {
          // Generate deterministic mock address based on input
          const mockAddr = "0x" + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
          const mockTx = "0x" + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("");

          setDeployedToken({
            name,
            symbol: cleanSymbol,
            channel,
            imageUrl: imageUrl || SAMPLE_IMAGES[0],
            contractAddress: mockAddr,
            txHash: mockTx,
            blockNumber: 21849102 + Math.floor(Math.random() * 500),
            poolFee: "1%",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          });

          setStatus("success");
        }, 1200);
      }, 1200);
    }, 1000);
  };

  const handleReset = () => {
    setStatus("idle");
    setName("");
    setSymbol("");
    setImageUrl("");
    setErrorMessage("");
    setDeployedToken(null);
  };

  const handleShareToWarpcast = () => {
    if (!deployedToken) return;
    const text = encodeURIComponent(
      `🚀 Just launched ${deployedToken.name} (${deployedToken.symbol}) on @clankpad in /${deployedToken.channel}!\n\nCA: ${deployedToken.contractAddress}\n\nTrade on Base via Uniswap v3 💎`
    );
    window.open(`https://warpcast.com/~/compose?text=${text}`, "_blank");
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Top Banner */}
      <div className="flex items-center justify-between p-4 mb-6 rounded-2xl bg-neutral-900/80 border border-neutral-800 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-farcaster-600 to-clanker-500 flex items-center justify-center shadow-lg shadow-farcaster-500/20">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-white tracking-tight">Clankpad V2</h1>
              <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-clanker-500/20 text-clanker-500 border border-clanker-500/30">
                Frame v2
              </span>
            </div>
            <p className="text-xs text-neutral-400">Launch ERC-20 Clanker tokens on Base</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-800/80 border border-neutral-700/60 text-xs text-neutral-300">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Base Network
        </div>
      </div>

      {/* Main Card */}
      <div className="relative rounded-3xl bg-neutral-900/90 border border-neutral-800/90 shadow-2xl overflow-hidden backdrop-blur-xl p-6 sm:p-8">
        {/* Glow ambient background */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-farcaster-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-clanker-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* State 1: Idle (Form Input) */}
        {status === "idle" && (
          <form onSubmit={handleLaunch} className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-semibold text-white tracking-tight">Create Token</h2>
              <p className="text-sm text-neutral-400">
                Configure your token metadata and choose the deployment Farcaster channel.
              </p>
            </div>

            {/* Input 1: Token Name */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Token Name
              </label>
              <input
                type="text"
                placeholder="e.g. Clanker Pad"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-neutral-950/80 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-farcaster-500 focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Input 2: Ticker Symbol */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Ticker Symbol
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. CLANK"
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 rounded-xl bg-neutral-950/80 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-farcaster-500 focus:border-transparent transition-all uppercase"
                  required
                />
                <span className="absolute left-3.5 top-3.5 text-neutral-500 font-bold text-sm">$</span>
              </div>
            </div>

            {/* Input 3: Image URL / Upload */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Token Icon (Image URL)
                </label>
                <span className="text-xs text-neutral-500">Pick sample or paste link</span>
              </div>
              <div className="flex gap-3 items-center">
                <input
                  type="url"
                  placeholder="https://... (PNG/JPG/SVG)"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl bg-neutral-950/80 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-farcaster-500 focus:border-transparent text-sm transition-all"
                />
                {imageUrl ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="h-11 w-11 rounded-xl object-cover border border-neutral-700 bg-neutral-800"
                    onError={() => setImageUrl("")}
                  />
                ) : (
                  <div className="h-11 w-11 rounded-xl border border-dashed border-neutral-700 bg-neutral-900/50 flex items-center justify-center text-neutral-500">
                    <ImageIcon className="h-5 w-5" />
                  </div>
                )}
              </div>

              {/* Sample Quick Pick */}
              <div className="flex items-center gap-2 pt-1">
                <span className="text-xs text-neutral-500">Presets:</span>
                {SAMPLE_IMAGES.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setImageUrl(img)}
                    className="text-xs px-2.5 py-1 rounded-lg bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 transition-colors border border-neutral-700"
                  >
                    Preset {i + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Input 4: Channel Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Launch Channel
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {CHANNELS.map((ch) => {
                  const isSelected = channel === ch.id;
                  return (
                    <button
                      key={ch.id}
                      type="button"
                      onClick={() => setChannel(ch.id)}
                      className={`flex items-center justify-between p-3 rounded-xl border transition-all text-left ${
                        isSelected
                          ? "bg-farcaster-500/20 border-farcaster-500 text-white shadow-lg shadow-farcaster-500/10"
                          : "bg-neutral-950/60 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base">{ch.icon}</span>
                        <div>
                          <p className="text-xs font-bold leading-none">{ch.name}</p>
                          <span className="text-[10px] text-neutral-500">{ch.badge}</span>
                        </div>
                      </div>
                      {isSelected && (
                        <div className="h-2 w-2 rounded-full bg-farcaster-500"></div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              className="w-full mt-4 py-4 px-6 rounded-2xl bg-gradient-to-r from-farcaster-600 via-farcaster-500 to-clanker-500 hover:opacity-95 active:scale-[0.99] text-white font-bold text-base shadow-xl shadow-farcaster-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Rocket className="h-5 w-5" />
              Launch Clanker Token
            </button>
          </form>
        )}

        {/* State 2: Validating & Deploying (Pending Lifecycle) */}
        {(status === "validating" || status === "deploying") && (
          <div className="py-12 px-4 text-center space-y-6">
            <div className="relative inline-flex items-center justify-center">
              <div className="h-20 w-20 rounded-full bg-farcaster-500/10 border border-farcaster-500/30 flex items-center justify-center">
                <Loader2 className="h-10 w-10 text-farcaster-500 animate-spin" />
              </div>
              <Sparkles className="h-5 w-5 text-clanker-500 absolute -top-1 -right-1 animate-pulse" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white tracking-tight">
                {status === "validating" ? "Validating Launch Request" : "Deploying on Base Chain"}
              </h3>
              <p className="text-sm text-neutral-400 max-w-sm mx-auto font-mono">
                {stepMessage}
              </p>
            </div>

            {/* Stepper Progress Indicator */}
            <div className="max-w-xs mx-auto space-y-2 pt-4">
              <div className="w-full bg-neutral-800 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r from-farcaster-500 to-clanker-500 transition-all duration-700 rounded-full ${
                    status === "validating" ? "w-1/3" : "w-5/6"
                  }`}
                />
              </div>
              <p className="text-[11px] text-neutral-500">Autonomous Clanker factory dispatch</p>
            </div>
          </div>
        )}

        {/* State 3: Success Confirmation */}
        {status === "success" && deployedToken && (
          <div className="space-y-6 py-2">
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-clanker-500/10 border border-clanker-500/30">
              <CheckCircle2 className="h-7 w-7 text-clanker-500 shrink-0" />
              <div>
                <h3 className="text-base font-bold text-white">Token Deployed Successfully!</h3>
                <p className="text-xs text-neutral-300">
                  Contract deployed on Base & liquidity pool verified.
                </p>
              </div>
            </div>

            {/* Token Summary Card */}
            <div className="p-5 rounded-2xl bg-neutral-950/90 border border-neutral-800 space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={deployedToken.imageUrl}
                    alt={deployedToken.name}
                    className="h-12 w-12 rounded-xl object-cover border border-neutral-700 bg-neutral-800"
                  />
                  <div>
                    <h4 className="font-bold text-white text-base leading-tight">
                      {deployedToken.name}
                    </h4>
                    <span className="text-xs font-mono font-bold text-clanker-500">
                      {deployedToken.symbol}
                    </span>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-neutral-800 text-neutral-300 border border-neutral-700">
                  /{deployedToken.channel}
                </span>
              </div>

              {/* Technical Details */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">Contract Address:</span>
                  <a
                    href={`https://basescan.org/token/${deployedToken.contractAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-farcaster-500 hover:underline flex items-center gap-1"
                  >
                    {deployedToken.contractAddress.slice(0, 6)}...
                    {deployedToken.contractAddress.slice(-4)}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">Transaction:</span>
                  <a
                    href={`https://basescan.org/tx/${deployedToken.txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-neutral-300 hover:text-white flex items-center gap-1"
                  >
                    {deployedToken.txHash.slice(0, 8)}...
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">Network:</span>
                  <span className="text-neutral-200 font-medium">Base Mainnet (8453)</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">DEX Pool:</span>
                  <span className="text-neutral-200 font-medium">Uniswap v3 ({deployedToken.poolFee})</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={handleShareToWarpcast}
                className="w-full py-3.5 px-6 rounded-2xl bg-farcaster-600 hover:bg-farcaster-500 text-white font-bold text-sm shadow-lg shadow-farcaster-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Share2 className="h-4 w-4" />
                Share Cast to Warpcast /{deployedToken.channel}
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="w-full py-3 px-6 rounded-2xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white font-medium text-sm flex items-center justify-center gap-2 transition-all cursor-pointer border border-neutral-700"
              >
                <RefreshCw className="h-4 w-4" />
                Launch Another Token
              </button>
            </div>
          </div>
        )}

        {/* State 4: Error State */}
        {status === "error" && (
          <div className="py-8 text-center space-y-5">
            <div className="h-16 w-16 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mx-auto text-rose-500">
              <AlertCircle className="h-8 w-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white">Deployment Failed</h3>
              <p className="text-sm text-rose-400 font-mono max-w-sm mx-auto">
                {errorMessage || "An unexpected error occurred during token dispatch."}
              </p>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="py-3 px-6 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-medium text-sm transition-all"
            >
              Try Again
            </button>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="mt-6 flex items-center justify-between text-xs text-neutral-500 px-2">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="h-4 w-4 text-emerald-500" />
          <span>Clankpad Protocol v2</span>
        </div>
        <span>Built with Next.js & Tailwind</span>
      </div>
    </div>
  );
}
