"use client";
import { Navbar } from "@/components/Navbar";
import DarkVeil from "@/components/ui-block/DarkVeil";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Target,
  Heart,
  Lightbulb,
  GraduationCap,
  Users,
  Clock,
  Award,
  Globe,
  BookOpen,
  TrendingUp,
  Calendar,
  Building,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function AboutPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const companyStats = [
    { number: "2019", label: "Founded", icon: Calendar },
    { number: "500+", label: "Institutions", icon: Building },
    { number: "100K+", label: "Students", icon: Users },
    { number: "50+", label: "Countries", icon: Globe },
  ];

  const teamMembers = [
    {
      name: "Alex Smith",
      role: "CEO & Founder",
      initials: "AS",
      description:
        "Former school administrator with 15+ years in educational technology. Passionate about transforming institutional management through innovative solutions.",
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "Maria Johnson",
      role: "Head of Product",
      initials: "MJ",
      description:
        "Curriculum specialist and former teacher who deeply understands educational challenges. Leads our product vision and user experience design.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "David Lee",
      role: "CTO",
      initials: "DL",
      description:
        "Technology leader with expertise in scalable educational platforms. Ensures our systems can handle the demands of growing institutions.",
      color: "from-emerald-500 to-teal-500",
    },
    {
      name: "Sarah Chen",
      role: "Head of Customer Success",
      initials: "SC",
      description:
        "Dedicated to ensuring every institution maximizes their potential with Learnova. Former education consultant with deep industry knowledge.",
      color: "from-orange-500 to-red-500",
    },
  ];

  const milestones = [
    {
      year: "2019",
      title: "Company Founded",
      description:
        "Started with a vision to revolutionize educational administration",
    },
    {
      year: "2020",
      title: "First 50 Institutions",
      description:
        "Gained trust of early adopters across different educational sectors",
    },
    {
      year: "2022",
      title: "AI Integration",
      description:
        "Launched intelligent curriculum planning and predictive attendance analytics",
    },
    {
      year: "2024",
      title: "Global Expansion",
      description: "Reached 500+ institutions across 50+ countries worldwide",
    },
  ];

  return (
    <>
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <DarkVeil />

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute w-72 h-72 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-3xl"
            style={{
              left: "10%",
              top: "20%",
              transform: `translateY(${scrollY * 0.1}px)`,
            }}
          />
          <div
            className="absolute w-96 h-96 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-full blur-3xl"
            style={{
              right: "10%",
              top: "40%",
              transform: `translateY(${scrollY * -0.1}px)`,
            }}
          />
        </div>
      </div>

      <div className="min-h-screen relative z-50">
        <Navbar />

        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              About{" "}
              <span className="bg-gradient-to-r from-accent via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Learnova
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              We're revolutionizing educational administration through
              intelligent technology, empowering institutions to focus on what
              matters most - student success.
            </p>
          </div>
        </section>

        {/* Company Stats */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              {companyStats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-accent/30 transition-all duration-500 hover:scale-105">
                    <stat.icon className="w-8 h-8 text-accent mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:text-accent transition-colors duration-300">
                      {stat.number}
                    </div>
                    <p className="text-gray-400 font-medium group-hover:text-gray-300 transition-colors duration-300">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full border border-purple-500/30">
                  <BookOpen className="w-5 h-5 text-purple-400 mr-2" />
                  <span className="text-purple-300 font-medium">Our Story</span>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold text-white">
                  Born from Real Educational Challenges
                </h2>

                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>
                    Learnova was founded in 2019 by a team of educators and
                    technologists who experienced firsthand the inefficiencies
                    in educational administration. We saw talented teachers
                    spending countless hours on paperwork instead of teaching,
                    and administrators drowning in manual processes.
                  </p>

                  <p>
                    Our mission became clear: create intelligent tools that
                    automate routine tasks while providing valuable insights,
                    allowing educational professionals to focus on their core
                    purpose - nurturing student growth and success.
                  </p>

                  <p>
                    Today, we're proud to serve over 500 institutions across 50+
                    countries, helping transform the way educational
                    administration is handled worldwide.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-3xl p-8 border border-purple-500/20 backdrop-blur-sm">
                  <div className="text-center space-y-6">
                    <GraduationCap className="h-20 w-20 text-white mx-auto" />
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-white">
                        Our Vision
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        To become the global standard for educational
                        administration technology, enabling every institution to
                        operate efficiently while maintaining their focus on
                        educational excellence.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-purple-900/5 to-black/40" />

          <div className="max-w-7xl mx-auto relative">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-accent/20 to-purple-500/20 rounded-full border border-accent/30 mb-6">
                <Heart className="w-5 h-5 text-accent mr-2" />
                <span className="text-accent font-medium">Our Values</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                What Drives Us Forward
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Our core values guide every decision and shape every feature we
                build.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Target,
                  title: "Excellence",
                  description:
                    "We strive for perfection in every aspect of our platform, ensuring reliability and superior performance for our users.",
                  gradient: "from-blue-500 to-cyan-500",
                },
                {
                  icon: Heart,
                  title: "Education First",
                  description:
                    "Every decision we make prioritizes the educational mission, ensuring our tools enhance rather than complicate the learning process.",
                  gradient: "from-pink-500 to-rose-500",
                },
                {
                  icon: Lightbulb,
                  title: "Innovation",
                  description:
                    "We continuously evolve our platform with cutting-edge technology to stay ahead of educational needs and challenges.",
                  gradient: "from-purple-500 to-violet-500",
                },
              ].map((value, index) => (
                <Card
                  key={index}
                  className="group bg-black/40 border-white/10 hover:border-accent/50 transition-all duration-500 hover:scale-105"
                >
                  <CardHeader className="text-center">
                    <div
                      className={`mx-auto w-16 h-16 bg-gradient-to-br ${value.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <value.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-white group-hover:text-accent transition-colors duration-300">
                      {value.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                      {value.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full border border-emerald-500/30 mb-6">
                <Clock className="w-5 h-5 text-emerald-400 mr-2" />
                <span className="text-emerald-400 font-medium">
                  Our Journey
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Key Milestones
              </h2>
            </div>

            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start gap-6 group">
                  <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-accent to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                    {milestone.year}
                  </div>
                  <div className="flex-1 bg-white/5 rounded-2xl p-6 border border-white/10 group-hover:border-accent/30 transition-all duration-300">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors duration-300">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full border border-orange-500/30 mb-6">
                <Users className="w-5 h-5 text-orange-400 mr-2" />
                <span className="text-orange-400 font-medium">Our Team</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Meet the People Behind Learnova
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                A diverse team of educators, technologists, and innovators
                united by a shared passion for transforming education.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <Card
                  key={index}
                  className="group bg-black/40 border-white/10 hover:border-accent/50 transition-all duration-500 hover:scale-105"
                >
                  <CardContent className="pt-6 text-center">
                    <div
                      className={`w-24 h-24 bg-gradient-to-br ${member.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <span className="text-2xl font-bold text-white">
                        {member.initials}
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-accent transition-colors duration-300">
                      {member.name}
                    </h3>
                    <p className="text-accent font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                      {member.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-3xl p-12 text-center border border-purple-500/20 backdrop-blur-sm">
              <Award className="h-16 w-16 text-accent mx-auto mb-6" />

              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Transform Your Institution?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join the hundreds of educational institutions worldwide that
                trust Learnova to streamline their operations and enhance
                student outcomes.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-gradient-to-r from-accent to-purple-500 rounded-full text-white font-semibold hover:shadow-xl hover:shadow-accent/25 transition-all duration-300 hover:scale-105">
                  Get Started Today
                </button>
                <button className="px-8 py-4 bg-white/10 rounded-full text-white font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                  Contact Our Team
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
