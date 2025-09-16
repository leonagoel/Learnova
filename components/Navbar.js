"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  BookOpen,
  ChevronDown,
  User,
  Activity,
  LogOut,
  Settings,
  Sparkles,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const dropdownRef = useRef(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && event.target && dropdownRef.current.contains) {
        if (!dropdownRef.current.contains(event.target)) {
          setIsDropdownOpen(false);
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    setIsMenuOpen(false);
  };

  // Get user initials for avatar fallback
  const getUserInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Get user display name safely
  const getUserDisplayName = () => {
    if (user?.displayName) return user.displayName;
    if (user?.email) return user.email.split("@")[0];
    return "User";
  };

  // Get user profile image safely
  const getUserPhoto = () => {
    // console.log(user.photoURL);
    return user?.photoURL || null;
  };

  return (
    <>
      {/* Premium gradient background overlay */}
      <div className="fixed w-full top-0 z-40 h-20 bg-gradient-to-b from-black/60 via-black/20 to-transparent pointer-events-none" />

      <nav
        className={`fixed w-full top-0 z-50 transition-all duration-500 ease-in-out ${
          scrolled
            ? "backdrop-blur-3xl border-b border-white/20 bg-black/40 shadow-2xl shadow-black/50"
            : "backdrop-blur-2xl border-b border-white/10 bg-black/20"
        }`}
      >
        {/* Premium shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 animate-shimmer opacity-0 hover:opacity-100 transition-opacity duration-1000" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex justify-between items-center h-16">
            {/* Enhanced Logo */}
            <Link
              href="/"
              className="flex items-center space-x-3 group relative"
            >
              <div className="relative transform transition-all duration-300 group-hover:scale-110">
                <div className="absolute inset-0 bg-gradient-to-r from-accent via-blue-500 to-purple-500 rounded-full blur-md opacity-0 group-hover:opacity-60 transition-all duration-300 animate-pulse" />
                <div className="relative bg-gradient-to-br from-accent to-blue-500 p-2 rounded-xl shadow-lg group-hover:shadow-2xl group-hover:shadow-accent/50 transition-all duration-300">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-yellow-400 opacity-0 group-hover:opacity-100 transition-all duration-300 animate-bounce" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-white via-accent to-blue-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                  Learnova
                </span>
                <span className="text-xs text-white/50 font-medium tracking-widest uppercase transition-all duration-300">
                  Premium
                </span>
              </div>
            </Link>

            {/* Enhanced Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {[
                { href: "/", label: "Home" },
                { href: "/activity", label: "Activity" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ].map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative px-4 py-2 text-white/80 hover:text-white transition-all duration-300 font-medium group overflow-hidden rounded-lg"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="relative z-10">{item.label}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg" />
                  <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-accent to-blue-500 group-hover:w-full group-hover:left-0 transition-all duration-300" />
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg animate-pulse" />
                </Link>
              ))}

              {/* Enhanced Auth Section */}
              {user ? (
                <div className="flex items-center space-x-4 ml-6">
                  <Link href="/attendance">
                    <Button className="relative bg-gradient-to-r from-accent to-blue-500 hover:from-accent/90 hover:to-blue-600 text-white font-medium shadow-lg hover:shadow-2xl hover:shadow-accent/30 transition-all duration-300 hover:scale-105 group overflow-hidden">
                      <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="relative flex items-center">
                        Make Attendance
                        <Sparkles className="ml-2 h-4 w-4 transition-all duration-300" />
                      </span>
                    </Button>
                  </Link>

                  {/* Enhanced User Dropdown */}
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex items-center space-x-3 p-2 rounded-xl text-white hover:text-accent transition-all duration-300 group hover:bg-white/5"
                    >
                      <div className="relative">
                        {getUserPhoto() ? (
                          <img
                            src={getUserPhoto()}
                            alt="Profile"
                            className="w-10 h-10 rounded-full border-2 border-accent/50 group-hover:border-accent transition-all duration-300 object-cover group-hover:scale-110 shadow-lg"
                            onError={(e) => {
                              e.target.style.display = "none";
                              e.target.nextElementSibling.style.display =
                                "flex";
                            }}
                          />
                        ) : null}
                        <div
                          className={`w-10 h-10 rounded-full bg-gradient-to-br from-accent via-blue-500 to-purple-500 flex items-center justify-center border-2 border-accent/50 group-hover:border-accent transition-all duration-300 shadow-lg group-hover:scale-110 ${
                            getUserPhoto() ? "hidden" : "flex"
                          }`}
                        >
                          <span className="text-sm font-bold text-white">
                            {getUserInitials(getUserDisplayName())}
                          </span>
                        </div>
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-black animate-pulse" />
                      </div>
                      <div className="hidden lg:block">
                        <p className="text-sm font-medium">
                          {getUserDisplayName()}
                        </p>
                        <p className="text-xs text-white/60">Premium User</p>
                      </div>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-300 ${
                          isDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Enhanced Dropdown Menu */}
                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-3 min-w-56 bg-black/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/20 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl" />

                        <div className="relative px-4 py-4 border-b border-white/10">
                          <div className="flex items-center space-x-3">
                            {getUserPhoto() ? (
                              <img
                                src={getUserPhoto()}
                                alt="Profile"
                                className="w-12 h-12 rounded-full border-2 border-accent/50 object-cover shadow-lg"
                              />
                            ) : (
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent via-blue-500 to-purple-500 flex items-center justify-center border-2 border-accent/50 shadow-lg">
                                <span className="text-sm font-bold text-white">
                                  {getUserInitials(getUserDisplayName())}
                                </span>
                              </div>
                            )}
                            <div>
                              <p className="text-sm text-white font-medium">
                                {getUserDisplayName()}
                              </p>
                              <p className="text-xs text-white/60">
                                {user?.email || ""}
                              </p>
                              <div className="flex items-center mt-1">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full mr-1" />
                                <span className="text-xs text-yellow-400 font-medium">
                                  Premium
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="relative py-2">
                          {[
                            { href: "/profile", icon: User, label: "Profile" },
                            {
                              href: "/dashboard",
                              icon: Activity,
                              label: "Activity Dashboard",
                            },
                            {
                              href: "/settings",
                              icon: Settings,
                              label: "Settings",
                            },
                          ].map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="flex items-center px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-gradient-to-r hover:from-accent/10 hover:to-blue-500/10 transition-all duration-200 group"
                              onClick={() => setIsDropdownOpen(false)}
                            >
                              <item.icon className="h-4 w-4 mr-3 group-hover:text-accent transition-colors duration-200" />
                              {item.label}
                              <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <ChevronDown className="h-3 w-3 -rotate-90" />
                              </div>
                            </Link>
                          ))}

                          <hr className="my-2 border-white/10" />

                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center px-4 py-3 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200 group"
                          >
                            <LogOut className="h-4 w-4 mr-3 group-hover:text-red-300 transition-colors duration-200" />
                            Logout
                            <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              <ChevronDown className="h-3 w-3 -rotate-90" />
                            </div>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="ml-6">
                  <Link href="/auth">
                    <Button className="relative bg-gradient-to-r from-accent to-blue-500 hover:from-accent/90 hover:to-blue-600 text-white font-medium shadow-lg hover:shadow-2xl hover:shadow-accent/30 transition-all duration-300 hover:scale-105 group overflow-hidden">
                      <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="relative flex items-center">
                        Login / Signup
                        <Sparkles className="ml-2 h-4 w-4 transition-all duration-300" />
                      </span>
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Enhanced Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-accent hover:bg-white/10 transition-all duration-300 hover:scale-110 relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded" />
                {isMenuOpen ? (
                  <X className="h-7 w-7 relative z-10" />
                ) : (
                  <Menu className="h-7 w-7 relative z-10" />
                )}
              </Button>
            </div>
          </div>

          {/* Enhanced Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden animate-in slide-in-from-top duration-300">
              <div className="px-2 pt-4 pb-4 space-y-2 bg-black/40 backdrop-blur-2xl border-t border-white/20 rounded-b-2xl shadow-2xl mt-2">
                {[
                  { href: "/", label: "Home" },
                  { href: "/activity", label: "Activity" },
                  { href: "/about", label: "About" },
                  { href: "/contact", label: "Contact" },
                ].map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-3 text-white/80 hover:text-white hover:bg-gradient-to-r hover:from-accent/10 hover:to-blue-500/10 transition-all duration-300 rounded-xl font-medium group"
                    onClick={() => setIsMenuOpen(false)}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-center justify-between">
                      {item.label}
                      <ChevronDown className="h-4 w-4 -rotate-90 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    </div>
                  </Link>
                ))}

                <div className="px-2 py-4 space-y-3 border-t border-white/10 mt-4">
                  {user ? (
                    <>
                      {/* Enhanced User Info in Mobile */}
                      <div className="flex items-center space-x-4 py-4 px-4 bg-gradient-to-r from-white/5 to-transparent rounded-xl border border-white/10">
                        {getUserPhoto() ? (
                          <img
                            src={getUserPhoto()}
                            alt="Profile"
                            className="w-12 h-12 rounded-full border-2 border-accent/50 object-cover shadow-lg"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent via-blue-500 to-purple-500 flex items-center justify-center border-2 border-accent/50 shadow-lg">
                            <span className="text-sm font-bold text-white">
                              {getUserInitials(getUserDisplayName())}
                            </span>
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="text-sm text-white font-medium">
                            {getUserDisplayName()}
                          </p>
                          <p className="text-xs text-white/60">
                            {user?.email || ""}
                          </p>
                          <div className="flex items-center mt-1">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full mr-1" />
                            <span className="text-xs text-yellow-400 font-medium">
                              Premium User
                            </span>
                          </div>
                        </div>
                      </div>

                      <Link
                        href="/attendance"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Button className="w-full bg-gradient-to-r from-accent to-blue-500 hover:from-accent/90 hover:to-blue-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 group">
                          <span className="flex items-center">
                            Make Attendance
                            <Sparkles className="ml-2 h-4 w-4 transition-all duration-300" />
                          </span>
                        </Button>
                      </Link>

                      {[
                        { href: "/profile", icon: User, label: "Profile" },
                        {
                          href: "/dashboard",
                          icon: Activity,
                          label: "Activity Dashboard",
                        },
                        {
                          href: "/settings",
                          icon: Settings,
                          label: "Settings",
                        },
                      ].map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center px-4 py-3 text-white/80 hover:text-white hover:bg-gradient-to-r hover:from-accent/10 hover:to-blue-500/10 transition-all duration-300 rounded-xl group"
                        >
                          <item.icon className="h-5 w-5 mr-3 group-hover:text-accent transition-colors duration-300" />
                          {item.label}
                          <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <ChevronDown className="h-4 w-4 -rotate-90" />
                          </div>
                        </Link>
                      ))}

                      <Button
                        className="w-full bg-gradient-to-r from-red-600/80 to-red-700/80 hover:from-red-700 hover:to-red-800 text-white font-medium shadow-lg transition-all duration-300 group"
                        onClick={handleLogout}
                      >
                        <LogOut className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                        Logout
                      </Button>
                    </>
                  ) : (
                    <Link href="/auth" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full bg-gradient-to-r from-accent to-blue-500 hover:from-accent/90 hover:to-blue-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 group">
                        <span className="flex items-center">
                          Login / Signup
                          <Sparkles className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                        </span>
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(200%) skewX(-12deg);
          }
        }
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
      `}</style>
    </>
  );
}
