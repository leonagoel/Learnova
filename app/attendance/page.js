"use client";

import { Navbar } from "@/components/Navbar";
import FaceRecognizer from "@/components/FaceRecognizer";
import useLabels from "@/components/useLabels";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AttendancePage = () => {
  const { labels, loading, error } = useLabels();
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  // Handle redirect safely
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

  // If no user, return nothing until redirect
  if (!user) return null;

  // Loading state for labels
  if (loading) {
    return (
      <div className="min-h-screen pt-10 bg-gradient-to-br from-slate-400 to-slate-900">
        <Navbar />
        <div className="flex items-center justify-center mt-10">
          <span className="text-indigo-300 text-xl animate-pulse">
            Loading labels...
          </span>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen pt-10 bg-gradient-to-br from-slate-400 to-slate-900">
        <Navbar />
        <div className="flex items-center justify-center mt-10">
          <span className="text-red-500 text-xl">Error loading labels!</span>
        </div>
      </div>
    );
  }

  // ✅ Authenticated + Labels Ready
  return (
    <div className="min-h-screen pt-10 bg-gradient-to-br from-slate-400 to-slate-900">
      <Navbar />
      <FaceRecognizer labels={labels} />
    </div>
  );
};

export default AttendancePage;
