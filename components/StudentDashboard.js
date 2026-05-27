"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";

export default function StudentDashboard() {
  const containerRef = useRef(null);

  useEffect(() => {
    // 1. Wrap GSAP animations in a context scoped to containerRef
    const ctx = gsap.context(() => {
      
      gsap.from(".animate-card", {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out"
      });

    }, containerRef); 

    // 2. Kill trailing animation frames instantly when unmounting to fix memory leaks!
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="animate-card p-4 bg-card rounded-xl shadow">Attendance Stats</div>
        <div className="animate-card p-4 bg-card rounded-xl shadow">Upcoming Classes</div>
        <div className="animate-card p-4 bg-card rounded-xl shadow">Recent Notices</div>
      </div>
    </div>
  );
}