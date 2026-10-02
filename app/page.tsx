import TokenLauncher from "@/components/TokenLauncher";

export default function Home() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 bg-gradient-to-b from-[#0a0b0e] via-[#0d0f14] to-[#0a0b0e]">
      <TokenLauncher />
    </main>
  );
}
