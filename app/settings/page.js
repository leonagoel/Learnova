"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import SettingsPage from "@/components/settings";

const Settings = () => {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  // Handle redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth");
    }
  }, [authLoading, user, router]);

  // While checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <span className="text-indigo-300 text-xl animate-pulse">
          Checking authentication...
        </span>
      </div>
    );
  }

  // If no user, return nothing (until redirect)
  if (!user) return null;

  // ✅ Authenticated
  return <SettingsPage />;
};

export default Settings;
