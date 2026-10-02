import type { Metadata } from "next";
import "./globals.css";

const frameMetadata = {
  version: "next",
  imageUrl: "https://clankpad-v2.vercel.app/og-image.png",
  button: {
    title: "Launch Token with Clankpad",
    action: {
      type: "launch_frame",
      name: "Clankpad V2",
      url: "https://clankpad-v2.vercel.app",
      splashImageUrl: "https://clankpad-v2.vercel.app/splash.png",
      splashBackgroundColor: "#0a0b0e"
    }
  }
};

export const metadata: Metadata = {
  title: "Clankpad V2 | Launch Clanker Tokens in Farcaster",
  description: "Next-gen Farcaster Frame V2 for launching ERC-20 tokens via Clanker on Base",
  other: {
    "fc:frame": JSON.stringify(frameMetadata),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-farcaster-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
