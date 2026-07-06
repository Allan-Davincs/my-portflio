"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SplashScreen } from "@/components/splash-screen";

export default function HomePage() {
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("splash-seen");
    if (seen) {
      router.replace("/docs/introduction");
    } else {
      setReady(true);
    }
  }, [router]);

  const handleComplete = () => {
    sessionStorage.setItem("splash-seen", "true");
    router.push("/docs/introduction");
  };

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#09090b]">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-700 border-t-zinc-400" />
      </div>
    );
  }

  if (!showSplash) return null;

  return <SplashScreen onComplete={handleComplete} />;
}
