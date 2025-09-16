"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import ProfilePage from "@/components/profile";

const Profile = () => {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth");
    }
  }, [authLoading, user, router]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <span className="text-indigo-300 text-xl animate-pulse">
          Checking authentication...
        </span>
      </div>
    );
  }

  if (!user) return null; // avoid flash before redirect

  // ✅ Authenticated user
  return <ProfilePage />;
};

export default Profile;
