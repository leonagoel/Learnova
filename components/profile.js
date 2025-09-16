"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit3,
  Save,
  X,
  Upload,
  Camera,
  Star,
  Award,
  Clock,
  Activity,
  BookOpen,
  Sparkles,
  Shield,
  Crown,
  Zap,
  TrendingUp,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Navbar } from "@/components/Navbar";

export default function ProfilePage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    displayName: user?.displayName || "",
    email: user?.email || "",
    phone: "",
    location: "",
    bio: "Passionate learner exploring the world of knowledge through Learnova Premium.",
    website: "",
    linkedin: "",
    twitter: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    // Handle save logic here
    setIsEditing(false);
    // You would typically make an API call here
  };

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const getUserPhoto = () => {
    // console.log(user?.photoURL);
    return user?.photoURL || null;
  };

  const getUserInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Mock data for achievements and activity
  const achievements = [
    {
      icon: Crown,
      title: "Premium Member",
      description: "Exclusive access to all features",
      color: "from-yellow-400 to-orange-500",
    },
    {
      icon: Star,
      title: "Learning Streak",
      description: "30 days consecutive learning",
      color: "from-blue-400 to-purple-500",
    },
    {
      icon: Award,
      title: "Top Performer",
      description: "95% completion rate",
      color: "from-green-400 to-emerald-500",
    },
    {
      icon: Zap,
      title: "Quick Learner",
      description: "Completed 50+ courses",
      color: "from-pink-400 to-red-500",
    },
  ];

  const stats = [
    {
      label: "Courses Completed",
      value: "47",
      icon: BookOpen,
      change: "+5 this month",
    },
    {
      label: "Learning Hours",
      value: "127",
      icon: Clock,
      change: "+12 this week",
    },
    { label: "Achievements", value: "23", icon: Award, change: "+3 new" },
    {
      label: "Streak Days",
      value: "30",
      icon: TrendingUp,
      change: "Personal best!",
    },
  ];

  const recentActivity = [
    {
      type: "course",
      title: "Advanced React Patterns",
      time: "2 hours ago",
      progress: 85,
    },
    {
      type: "achievement",
      title: "Earned 'Quick Learner' badge",
      time: "1 day ago",
      progress: 100,
    },
    {
      type: "course",
      title: "UI/UX Design Fundamentals",
      time: "3 days ago",
      progress: 60,
    },
    {
      type: "attendance",
      title: "Marked attendance",
      time: "5 days ago",
      progress: 100,
    },
  ];

  const tabs = [
    { id: "overview", label: "Overview", icon: User },
    { id: "activity", label: "Activity", icon: Activity },
    { id: "achievements", label: "Achievements", icon: Award },
    { id: "settings", label: "Settings", icon: Edit3 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 pt-20">
      {/* Background Effects */}
        <Navbar/>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(34,197,94,0.1),transparent_50%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-black/20 backdrop-blur-2xl rounded-3xl border border-white/10 p-8 mb-8 relative overflow-hidden">
          {/* Header Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-50" />
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.02)_50%,transparent_75%)] bg-[length:60px_60px]" />

          <div className="relative flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
            {/* Profile Image */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-lg opacity-0 group-hover:opacity-60 transition-all duration-300" />
              {getUserPhoto() ? (
                <img
                  src={user?.photoURL}
                  alt="Profile"
                  className="relative w-32 h-32 rounded-full border-4 border-white/20 object-cover shadow-2xl group-hover:scale-105 transition-all duration-300"
                />
              ) : (
                <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center border-4 border-white/20 shadow-2xl group-hover:scale-105 transition-all duration-300">
                  <span className="text-3xl font-bold text-white">
                    {getUserInitials(formData.displayName)}
                  </span>
                </div>
              )}

              {/* Premium Badge */}
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-2 border-2 border-black shadow-lg">
                <Crown className="h-5 w-5 text-black" />
              </div>

              {/* Upload Button */}
              <button
                onClick={handleImageUpload}
                className="absolute bottom-0 right-0 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-full p-3 border-2 border-white/20 shadow-lg hover:scale-110 transition-all duration-300 group"
              >
                <Camera className="h-4 w-4 text-white" />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
              />
            </div>

            {/* Profile Info */}
            <div className="flex-1 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div>
                  {isEditing ? (
                    <input
                      name="displayName"
                      value={formData.displayName}
                      onChange={handleInputChange}
                      className="text-3xl font-bold bg-transparent border-b-2 border-white/30 focus:border-blue-400 outline-none text-white mb-2"
                      placeholder="Your Name"
                    />
                  ) : (
                    <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
                      {formData.displayName}
                      <Sparkles className="ml-3 h-6 w-6 text-yellow-400 animate-pulse" />
                    </h1>
                  )}

                  <div className="flex items-center space-x-4 text-white/80">
                    <div className="flex items-center">
                      <Shield className="h-4 w-4 mr-1 text-green-400" />
                      <span className="text-sm font-medium">
                        Premium Member
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 text-yellow-400" />
                      <span className="text-sm">Level 7 Learner</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  {isEditing ? (
                    <>
                      <Button
                        onClick={handleSave}
                        className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                      <Button
                        onClick={() => setIsEditing(false)}
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button
                      onClick={() => setIsEditing(true)}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 group"
                    >
                      <Edit3 className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                      Edit Profile
                    </Button>
                  )}
                </div>
              </div>

              {/* Bio */}
              <div>
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:border-blue-400 outline-none resize-none"
                    placeholder="Tell us about yourself..."
                  />
                ) : (
                  <p className="text-white/80 text-lg leading-relaxed">
                    {formData.bio}
                  </p>
                )}
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                {[
                  {
                    icon: Mail,
                    label: "Email",
                    value: formData.email,
                    name: "email",
                  },
                  {
                    icon: Phone,
                    label: "Phone",
                    value: formData.phone,
                    name: "phone",
                    placeholder: "+1 (555) 123-4567",
                  },
                  {
                    icon: MapPin,
                    label: "Location",
                    value: formData.location,
                    name: "location",
                    placeholder: "City, Country",
                  },
                  {
                    icon: Calendar,
                    label: "Member Since",
                    value: "January 2024",
                    readonly: true,
                  },
                ].map((item) => (
                  <div
                    key={item.name || item.label}
                    className="flex items-center space-x-3 text-white/80"
                  >
                    <item.icon className="h-5 w-5 text-blue-400" />
                    <div className="flex-1">
                      <p className="text-xs text-white/60 uppercase tracking-wide">
                        {item.label}
                      </p>
                      {isEditing && !item.readonly ? (
                        <input
                          name={item.name}
                          value={item.value}
                          onChange={handleInputChange}
                          className="bg-transparent border-b border-white/20 focus:border-blue-400 outline-none text-sm py-1 w-full"
                          placeholder={item.placeholder}
                        />
                      ) : (
                        <p className="text-sm font-medium">
                          {item.value || "Not provided"}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="bg-black/20 backdrop-blur-2xl rounded-2xl border border-white/10 p-6 hover:bg-black/30 transition-all duration-300 group relative overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className="h-8 w-8 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                  <div className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">
                    {stat.change}
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </h3>
                  <p className="text-white/60 text-sm">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-black/20 backdrop-blur-2xl rounded-3xl border border-white/10 overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-white/10">
            <nav className="flex space-x-8 px-8 py-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-3 px-4 border-b-2 transition-all duration-300 ${
                    activeTab === tab.id
                      ? "border-blue-400 text-blue-400"
                      : "border-transparent text-white/60 hover:text-white hover:border-white/20"
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-8">
                {/* Achievements */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                    <Award className="h-6 w-6 mr-2 text-yellow-400" />
                    Recent Achievements
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {achievements.map((achievement, index) => (
                      <div
                        key={achievement.title}
                        className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
                      >
                        <div className="flex items-center space-x-4">
                          <div
                            className={`p-3 rounded-xl bg-gradient-to-br ${achievement.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}
                          >
                            <achievement.icon className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-white">
                              {achievement.title}
                            </h4>
                            <p className="text-white/60 text-sm">
                              {achievement.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                    <Activity className="h-6 w-6 mr-2 text-green-400" />
                    Recent Activity
                  </h3>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                      >
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              activity.type === "course"
                                ? "bg-blue-400"
                                : activity.type === "achievement"
                                ? "bg-yellow-400"
                                : "bg-green-400"
                            }`}
                          />
                          <div>
                            <p className="text-white font-medium">
                              {activity.title}
                            </p>
                            <p className="text-white/60 text-sm">
                              {activity.time}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-16 bg-white/10 rounded-full h-2">
                            <div
                              className={`h-full rounded-full ${
                                activity.progress === 100
                                  ? "bg-green-400"
                                  : "bg-blue-400"
                              }`}
                              style={{ width: `${activity.progress}%` }}
                            />
                          </div>
                          <span className="text-white/60 text-sm w-12">
                            {activity.progress}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Activity Tab */}
            {activeTab === "activity" && (
              <div className="text-center py-12">
                <Activity className="h-12 w-12 text-white/40 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  Detailed Activity Coming Soon
                </h3>
                <p className="text-white/60">
                  We're working on detailed activity tracking and analytics.
                </p>
              </div>
            )}

            {/* Achievements Tab */}
            {activeTab === "achievements" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map((achievement, index) => (
                  <div
                    key={achievement.title}
                    className="bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group text-center"
                  >
                    <div
                      className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${achievement.color} shadow-lg group-hover:scale-110 transition-transform duration-300 mb-4`}
                    >
                      <achievement.icon className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="font-semibold text-white mb-2">
                      {achievement.title}
                    </h4>
                    <p className="text-white/60 text-sm">
                      {achievement.description}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div className="text-center py-12">
                <Edit3 className="h-12 w-12 text-white/40 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  Advanced Settings
                </h3>
                <p className="text-white/60">
                  Profile settings and preferences will be available here.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
