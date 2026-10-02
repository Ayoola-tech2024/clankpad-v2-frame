import { NextResponse } from "next/server";

export async function GET() {
  const manifest = {
    accountAssociation: {
      header: "eyJmaWQiOjEyMTUyLCJ0eXBlIjoiY3VzdG9keSIsImtleSI6IjB4MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMCJ9",
      payload: "eyJkb21haW4iOiJjbGFua3BhZC12Mi52ZXJjZWwuYXBwIn0",
      signature: "MHgwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAw"
    },
    frame: {
      version: "1",
      name: "Clankpad V2",
      iconUrl: "https://clankpad-v2.vercel.app/icon.png",
      homeUrl: "https://clankpad-v2.vercel.app",
      imageUrl: "https://clankpad-v2.vercel.app/og-image.png",
      buttonTitle: "Launch Clanker Token",
      splashImageUrl: "https://clankpad-v2.vercel.app/splash.png",
      splashBackgroundColor: "#0a0b0e",
      webhookUrl: "https://clankpad-v2.vercel.app/api/webhook"
    }
  };

  return NextResponse.json(manifest);
}
