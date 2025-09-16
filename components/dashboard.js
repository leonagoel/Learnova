"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Activity,
  TrendingUp,
  Clock,
  BookOpen,
  Award,
  Target,
  Calendar,
  Filter,
  Download,
  Eye,
  BarChart3,
  PieChart,
  LineChart,
  Zap,
  Star,
  CheckCircle,
  XCircle,
  AlertCircle,
  Play,
  Pause,
  RotateCcw,
  ArrowUp,
  ArrowDown,
  Minus,
  Users,
  Globe,
  Trophy,
  Sparkles,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Navbar } from "@/components/Navbar";

export default function ActivityDashboard() {
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState("week");
  const [selectedView, setSelectedView] = useState("overview");
  const [activeFilter, setActiveFilter] = useState("all");

  // Mock data for the dashboard
  const activityData = {
    overview: {
      totalHours: 47.5,
      coursesCompleted: 12,
      currentStreak: 15,
      weeklyGoal: 10,
      weeklyProgress: 8.5,
    },
    weeklyStats: [
      { day: "Mon", hours: 2.5, courses: 1, attendance: true },
      { day: "Tue", hours: 3.2, courses: 2, attendance: true },
      { day: "Wed", hours: 1.8, courses: 1, attendance: true },
      { day: "Thu", hours: 4.1, courses: 2, attendance: false },
      { day: "Fri", hours: 2.9, courses: 1, attendance: true },
      { day: "Sat", hours: 0, courses: 0, attendance: false },
      { day: "Sun", hours: 1.5, courses: 1, attendance: true },
    ],
    recentActivities: [
      {
        id: 1,
        type: "course_completed",
        title: "Advanced React Patterns",
        duration: "2h 45m",
        score: 95,
        timestamp: "2 hours ago",
        status: "completed",
      },
      {
        id: 2,
        type: "quiz_passed",
        title: "JavaScript Fundamentals Quiz",
        duration: "15m",
        score: 88,
        timestamp: "5 hours ago",
        status: "completed",
      },
      {
        id: 3,
        type: "course_started",
        title: "UI/UX Design Principles",
        duration: "1h 20m",
        score: 0,
        timestamp: "1 day ago",
        status: "in_progress",
      },
      {
        id: 4,
        type: "attendance_marked",
        title: "Daily Check-in",
        duration: "1m",
        score: 0,
        timestamp: "2 days ago",
        status: "completed",
      },
      {
        id: 5,
        type: "assignment_submitted",
        title: "Portfolio Project",
        duration: "3h 30m",
        score: 92,
        timestamp: "3 days ago",
        status: "completed",
      },
    ],
    achievements: [
      {
        name: "Learning Streak",
        value: 15,
        max: 30,
        icon: Zap,
        color: "from-orange-400 to-red-500",
      },
      {
        name: "Course Master",
        value: 12,
        max: 20,
        icon: BookOpen,
        color: "from-blue-400 to-cyan-500",
      },
      {
        name: "Quiz Champion",
        value: 8,
        max: 10,
        icon: Trophy,
        color: "from-yellow-400 to-orange-500",
      },
      {
        name: "Perfect Attendance",
        value: 25,
        max: 30,
        icon: CheckCircle,
        color: "from-green-400 to-emerald-500",
      },
    ],
    categories: [
      {
        name: "Programming",
        hours: 18.5,
        percentage: 39,
        color: "bg-blue-500",
      },
      { name: "Design", hours: 12.2, percentage: 26, color: "bg-purple-500" },
      { name: "Business", hours: 8.8, percentage: 18, color: "bg-green-500" },
      { name: "Marketing", hours: 5.1, percentage: 11, color: "bg-pink-500" },
      { name: "Other", hours: 2.9, percentage: 6, color: "bg-gray-500" },
    ],
    monthlyProgress: [
      { month: "Jan", hours: 45, courses: 8, attendance: 28 },
      { month: "Feb", hours: 52, courses: 10, attendance: 26 },
      { month: "Mar", hours: 38, courses: 7, attendance: 30 },
      { month: "Apr", hours: 47, courses: 12, attendance: 29 },
    ],
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case "course_completed":
        return CheckCircle;
      case "course_started":
        return Play;
      case "quiz_passed":
        return Target;
      case "attendance_marked":
        return Calendar;
      case "assignment_submitted":
        return BookOpen;
      default:
        return Activity;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "text-green-400";
      case "in_progress":
        return "text-blue-400";
      case "failed":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  const filteredActivities = useMemo(() => {
    if (activeFilter === "all") return activityData.recentActivities;
    return activityData.recentActivities.filter(
      (activity) => activity.type === activeFilter
    );
  }, [activeFilter]);

  const StatCard = ({
    title,
    value,
    change,
    icon: Icon,
    trend,
    color = "from-blue-400 to-cyan-500",
  }) => (
    <div className="bg-black/20 backdrop-blur-2xl rounded-2xl border border-white/10 p-6 hover:bg-black/30 transition-all duration-300 group relative overflow-hidden">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
      />
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <Icon className="h-8 w-8 text-white/80 group-hover:text-white transition-colors duration-300" />
          {trend && (
            <div
              className={`flex items-center text-xs px-2 py-1 rounded-full ${
                trend === "up"
                  ? "bg-green-500/20 text-green-400"
                  : trend === "down"
                  ? "bg-red-500/20 text-red-400"
                  : "bg-gray-500/20 text-gray-400"
              }`}
            >
              {trend === "up" ? (
                <ArrowUp className="h-3 w-3 mr-1" />
              ) : trend === "down" ? (
                <ArrowDown className="h-3 w-3 mr-1" />
              ) : (
                <Minus className="h-3 w-3 mr-1" />
              )}
              {change}
            </div>
          )}
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white mb-1">{value}</h3>
          <p className="text-white/60 text-sm">{title}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 pt-20">
      {/* Background Effects */}
      <Navbar/>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.1),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(168,85,247,0.1),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(34,197,94,0.08),transparent_50%)]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
              <Activity className="h-8 w-8 mr-3 text-blue-400" />
              Activity Dashboard
              <Sparkles className="ml-3 h-6 w-6 text-yellow-400 animate-pulse" />
            </h1>
            <p className="text-white/60">
              Track your learning progress and achievements
            </p>
          </div>

          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            {/* Period Selector */}
            <div className="flex bg-black/20 backdrop-blur-xl border border-white/10 rounded-lg p-1">
              {["day", "week", "month", "year"].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    selectedPeriod === period
                      ? "bg-blue-500 text-white shadow-lg"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </button>
              ))}
            </div>

            {/* Export Button */}
            <Button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        {/* Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Learning Hours"
            value={`${activityData.overview.totalHours}h`}
            change="+12%"
            trend="up"
            icon={Clock}
            color="from-blue-400 to-cyan-500"
          />
          <StatCard
            title="Courses Completed"
            value={activityData.overview.coursesCompleted}
            change="+3"
            trend="up"
            icon={BookOpen}
            color="from-green-400 to-emerald-500"
          />
          <StatCard
            title="Current Streak"
            value={`${activityData.overview.currentStreak} days`}
            change="Personal Best!"
            trend="up"
            icon={Zap}
            color="from-orange-400 to-red-500"
          />
          <StatCard
            title="Weekly Progress"
            value={`${activityData.overview.weeklyProgress}/${activityData.overview.weeklyGoal}h`}
            change="85%"
            trend="up"
            icon={Target}
            color="from-purple-400 to-pink-500"
          />
        </div>
        {/* View Selector */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { id: "overview", label: "Overview", icon: BarChart3 },
            { id: "progress", label: "Progress", icon: TrendingUp },
            { id: "achievements", label: "Achievements", icon: Award },
            { id: "analytics", label: "Analytics", icon: PieChart },
          ].map((view) => (
            <button
              key={view.id}
              onClick={() => setSelectedView(view.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                selectedView === view.id
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                  : "bg-black/20 text-white/70 hover:text-white hover:bg-black/30 border border-white/10"
              }`}
            >
              <view.icon className="h-4 w-4" />
              <span>{view.label}</span>
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {selectedView === "overview" && (
              <>
                {/* Weekly Activity Chart */}
                <div className="bg-black/20 backdrop-blur-2xl rounded-3xl border border-white/10 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white flex items-center">
                      <BarChart3 className="h-6 w-6 mr-2 text-blue-400" />
                      Weekly Activity
                    </h3>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-400 rounded-full mr-2" />
                        <span className="text-white/60">Hours</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-400 rounded-full mr-2" />
                        <span className="text-white/60">Courses</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {activityData.weeklyStats.map((day, index) => (
                      <div
                        key={day.day}
                        className="flex items-center space-x-4"
                      >
                        <div className="w-12 text-white/60 text-sm font-medium">
                          {day.day}
                        </div>
                        <div className="flex-1 flex items-center space-x-2">
                          {/* Hours Bar */}
                          <div className="flex-1 bg-white/10 rounded-full h-3 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full transition-all duration-500"
                              style={{ width: `${(day.hours / 5) * 100}%` }}
                            />
                          </div>
                          <span className="text-white/80 text-sm w-12">
                            {day.hours}h
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              day.attendance ? "bg-green-400" : "bg-red-400"
                            }`}
                          />
                          <span className="text-white/60 text-sm w-8">
                            {day.courses}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activities */}
                <div className="bg-black/20 backdrop-blur-2xl rounded-3xl border border-white/10 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white flex items-center">
                      <Activity className="h-6 w-6 mr-2 text-green-400" />
                      Recent Activities
                    </h3>
                    <div className="flex items-center space-x-2">
                      <select
                        value={activeFilter}
                        onChange={(e) => setActiveFilter(e.target.value)}
                        className="bg-black/30 border border-white/20 text-white text-sm rounded-lg px-3 py-1 focus:border-blue-400 outline-none"
                      >
                        <option value="all">All Activities</option>
                        <option value="course_completed">
                          Completed Courses
                        </option>
                        <option value="quiz_passed">Quiz Results</option>
                        <option value="attendance_marked">Attendance</option>
                      </select>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        <Filter className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {filteredActivities.map((activity) => {
                      const IconComponent = getActivityIcon(activity.type);
                      return (
                        <div
                          key={activity.id}
                          className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 group"
                        >
                          <div className="flex items-center space-x-4">
                            <div
                              className={`p-2 rounded-lg ${getStatusColor(
                                activity.status
                              )} bg-current/20`}
                            >
                              <IconComponent className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="font-medium text-white group-hover:text-blue-400 transition-colors">
                                {activity.title}
                              </h4>
                              <div className="flex items-center space-x-4 text-sm text-white/60">
                                <span>{activity.timestamp}</span>
                                <span>{activity.duration}</span>
                                {activity.score > 0 && (
                                  <span className="text-green-400 font-medium">
                                    {activity.score}%
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-white/60 hover:text-white"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            {selectedView === "progress" && (
              <div className="bg-black/20 backdrop-blur-2xl rounded-3xl border border-white/10 p-6">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <TrendingUp className="h-6 w-6 mr-2 text-blue-400" />
                  Learning Progress
                </h3>

                {/* Monthly Progress */}
                <div className="space-y-6">
                  {activityData.monthlyProgress.map((month, index) => (
                    <div key={month.month} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-white">
                          {month.month} 2024
                        </h4>
                        <div className="flex items-center space-x-4 text-sm text-white/60">
                          <span>{month.hours}h</span>
                          <span>{month.courses} courses</span>
                          <span>{month.attendance} days</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span className="text-white/60">Hours</span>
                            <span className="text-blue-400">
                              {month.hours}h
                            </span>
                          </div>
                          <div className="w-full bg-white/10 rounded-full h-2">
                            <div
                              className="h-full bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full"
                              style={{ width: `${(month.hours / 60) * 100}%` }}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span className="text-white/60">Courses</span>
                            <span className="text-green-400">
                              {month.courses}
                            </span>
                          </div>
                          <div className="w-full bg-white/10 rounded-full h-2">
                            <div
                              className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
                              style={{
                                width: `${(month.courses / 15) * 100}%`,
                              }}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span className="text-white/60">Attendance</span>
                            <span className="text-orange-400">
                              {month.attendance}
                            </span>
                          </div>
                          <div className="w-full bg-white/10 rounded-full h-2">
                            <div
                              className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full"
                              style={{
                                width: `${(month.attendance / 31) * 100}%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedView === "achievements" && (
              <div className="bg-black/20 backdrop-blur-2xl rounded-3xl border border-white/10 p-6">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <Award className="h-6 w-6 mr-2 text-yellow-400" />
                  Achievement Progress
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {activityData.achievements.map((achievement, index) => (
                    <div
                      key={achievement.name}
                      className="bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
                    >
                      <div className="flex items-center space-x-4 mb-4">
                        <div
                          className={`p-3 rounded-xl bg-gradient-to-br ${achievement.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}
                        >
                          <achievement.icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-white">
                            {achievement.name}
                          </h4>
                          <p className="text-white/60 text-sm">
                            {achievement.value} / {achievement.max}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-white/60">Progress</span>
                          <span className="text-white font-medium">
                            {Math.round(
                              (achievement.value / achievement.max) * 100
                            )}
                            %
                          </span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-3">
                          <div
                            className={`h-full bg-gradient-to-r ${achievement.color} rounded-full transition-all duration-500`}
                            style={{
                              width: `${
                                (achievement.value / achievement.max) * 100
                              }%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedView === "analytics" && (
              <div className="bg-black/20 backdrop-blur-2xl rounded-3xl border border-white/10 p-6">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <PieChart className="h-6 w-6 mr-2 text-purple-400" />
                  Learning Analytics
                </h3>

                {/* Category Breakdown */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-white">Time by Category</h4>
                  {activityData.categories.map((category, index) => (
                    <div key={category.name} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-white/80">{category.name}</span>
                        <span className="text-white/60">
                          {category.hours}h ({category.percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div
                          className={`h-full ${category.color} rounded-full transition-all duration-500`}
                          style={{ width: `${category.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-black/20 backdrop-blur-2xl rounded-2xl border border-white/10 p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                <Zap className="h-5 w-5 mr-2 text-yellow-400" />
                Quick Stats
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/60">Today's Goal</span>
                  <span className="text-white font-medium">2/3 hours</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full w-2/3" />
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-white/60">This Week</span>
                  <span className="text-white font-medium">17/20 hours</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className="h-full bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full"
                    style={{ width: "85%" }}
                  />
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-white/60">Monthly Target</span>
                  <span className="text-white font-medium">47/80 hours</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className="h-full bg-gradient-to-r from-purple-400 to-pink-500 rounded-full"
                    style={{ width: "59%" }}
                  />
                </div>
              </div>
            </div>
            {/* Leaderboard */}
            <div className="bg-black/20 backdrop-blur-2xl rounded-2xl border border-white/10 p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                <Users className="h-5 w-5 mr-2 text-blue-400" />
                Weekly Leaderboard
              </h3>
              <div className="space-y-3">
                {[
                  { name: "Alex Johnson", hours: 23.5, rank: 1, avatar: "AJ" },
                  {
                    name: "You",
                    hours: 17.2,
                    rank: 2,
                    avatar: "ME",
                    isUser: true,
                  },
                  { name: "Sarah Chen", hours: 15.8, rank: 3, avatar: "SC" },
                  { name: "Mike Davis", hours: 14.2, rank: 4, avatar: "MD" },
                  { name: "Lisa Wang", hours: 12.9, rank: 5, avatar: "LW" },
                ].map((person) => (
                  <div
                    key={person.name}
                    className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                      person.isUser
                        ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30"
                        : "bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                          person.rank === 1
                            ? "bg-gradient-to-r from-yellow-400 to-orange-500"
                            : person.rank === 2
                            ? "bg-gradient-to-r from-gray-400 to-gray-500"
                            : person.rank === 3
                            ? "bg-gradient-to-r from-amber-600 to-amber-700"
                            : "bg-gradient-to-r from-gray-600 to-gray-700"
                        }`}
                      >
                        {person.avatar}
                      </div>
                      <div>
                        <p
                          className={`text-sm font-medium ${
                            person.isUser ? "text-white" : "text-white/80"
                          }`}
                        >
                          {person.name}
                        </p>
                        <p className="text-xs text-white/60">#{person.rank}</p>
                      </div>
                    </div>
                    <span className="text-white/80 font-medium">
                      {person.hours}h
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {/* Upcoming Goals */}
            <div className="bg-black/20 backdrop-blur-2xl rounded-2xl border border-white/10 p-6">
              <h3 className="text-lg font-bold text-white mb-4">
                <Target className="h-5 w-5 mr-2 text-purple-400" />             
                  Upcoming Goals              {" "}
              </h3>
                           {" "}
              <div className="space-y-3">
                               {" "}
                {[
                  {
                    title: "Complete 'React Hooks' course",
                    progress: 70,
                    icon: BookOpen,
                  },
                  {
                    title: "Submit 'Advanced JS' assignment",
                    progress: 0,
                    icon: Clock,
                  },
                  { title: "Achieve 30-day streak", progress: 50, icon: Zap },
                ].map((goal, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <goal.icon className="h-4 w-4 text-white/60" />
                      <span className="text-sm font-medium text-white/80">
                        {goal.title}
                      </span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div
                        className="h-full bg-gradient-to-r from-purple-400 to-pink-500 rounded-full"
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 