
import { AIHelper } from "@/components/AIHelper";
import { CourseCard } from "@/components/CourseCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Bot, ChevronRight, Zap, BookOpen, Award } from "lucide-react";
import { useState } from "react";

const courses = [
  {
    id: 1,
    title: "Introduction to Inspire Bot Pins",
    description: "Learn about the Inspire Bot's pin layout including servo controls, sensors, and motor connections. Perfect for beginners starting their robotics journey.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800",
    category: "Beginner",
    duration: "30 min",
  },
  {
    id: 2,
    title: "Motor Control Fundamentals",
    description: "Master motor control using pins 12-15. Learn how to make your Inspire Bot move forward, reverse, and turn using precise pin control combinations.",
    image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&q=80&w=800",
    category: "Beginner",
    duration: "45 min",
  },
  {
    id: 3,
    title: "Servo and Sensor Integration",
    description: "Explore how to use the built-in servo (P0), additional servo (P1), and integrate ultrasonic sensors (P2, P8) for advanced robot control.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
    category: "Intermediate",
    duration: "60 min",
  },
  {
    id: 4,
    title: "Line Following and LED Control",
    description: "Build intelligent behaviors using the line following sensor (P3) and control LED lights (P16) for visual feedback and night operations.",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&q=80&w=800",
    category: "Intermediate",
    duration: "45 min",
  },
  {
    id: 5,
    title: "Advanced Movement Patterns",
    description: "Create complex movement patterns by combining motor controls. Learn how to make your robot navigate obstacles and perform precise maneuvers.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800",
    category: "Advanced",
    duration: "90 min",
  },
  {
    id: 6,
    title: "Complete Robot Programming",
    description: "Bring everything together by creating a fully autonomous robot using all sensors, motors, and LED indicators for complex behaviors.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
    category: "Advanced",
    duration: "120 min",
  },
];

const features = [
  {
    title: "Interactive Learning",
    description: "Hands-on programming exercises with immediate feedback",
    icon: <Zap className="h-6 w-6 text-primary" />
  },
  {
    title: "Step-by-Step Guidance",
    description: "Progressive lessons from basic to advanced concepts",
    icon: <ChevronRight className="h-6 w-6 text-primary" />
  },
  {
    title: "Comprehensive Curriculum",
    description: "Cover all aspects of robotics from motors to sensors",
    icon: <BookOpen className="h-6 w-6 text-primary" />
  },
  {
    title: "Achievement System",
    description: "Earn badges and track your progress as you learn",
    icon: <Award className="h-6 w-6 text-primary" />
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = category ? course.category === category : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-900/30 to-primary/30 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2 space-y-6">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-2 animate-fade-in">
                <Bot className="w-4 h-4 mr-2" /> 
                Interactive Robotics Learning
              </div>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground">
                Master the <span className="text-primary">Inspire Bot</span> with Our Courses
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Comprehensive lessons covering pin control, sensors, and advanced robotics. Perfect for beginners and experienced programmers alike.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="font-medium">
                  Get Started
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="font-medium">
                  Browse Courses
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="w-full h-64 md:h-96 bg-accent rounded-lg overflow-hidden shadow-xl hover-scale">
                <img 
                  src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800" 
                  alt="Inspire Bot" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Learn With Us</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Our interactive courses are designed to make robotics fun and accessible for everyone
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-card/60 backdrop-blur-sm p-6 rounded-lg shadow-sm hover:shadow-md transition-all border border-accent">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="font-bold text-xl mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Course Section */}
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">
            Explore Our Courses
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From basic concepts to advanced techniques, we have the perfect course for you.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button 
            variant={category === null ? "default" : "outline"} 
            onClick={() => setCategory(null)}
            className="rounded-full"
          >
            All Courses
          </Button>
          <Button 
            variant={category === "Beginner" ? "default" : "outline"} 
            onClick={() => setCategory("Beginner")}
            className="rounded-full"
          >
            Beginner
          </Button>
          <Button 
            variant={category === "Intermediate" ? "default" : "outline"} 
            onClick={() => setCategory("Intermediate")}
            className="rounded-full"
          >
            Intermediate
          </Button>
          <Button 
            variant={category === "Advanced" ? "default" : "outline"} 
            onClick={() => setCategory("Advanced")}
            className="rounded-full"
          >
            Advanced
          </Button>
        </div>

        <div className="relative max-w-md mx-auto mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search courses..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-lg text-muted-foreground">No courses found matching your criteria.</p>
              <Button 
                variant="link" 
                onClick={() => {
                  setSearchQuery("");
                  setCategory(null);
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-primary/10 py-16 mt-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Begin Your Robotics Journey?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Start with our beginner courses and work your way up to creating fully autonomous robots.
          </p>
          <Button size="lg" className="font-medium">
            Get Started Today
          </Button>
        </div>
      </div>
      
      <AIHelper />
    </div>
  );
};

export default Index;
