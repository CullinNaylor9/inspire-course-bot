
import { AIHelper } from "@/components/AIHelper";
import { CourseCard } from "@/components/CourseCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

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

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20">
      <div className="container py-8 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Inspire Bot Courses</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Master the Inspire Bot with our comprehensive courses covering pin control, sensors, and advanced robotics.
          </p>
        </div>

        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search courses..."
            className="pl-10"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
      </div>
      
      <AIHelper />
    </div>
  );
};

export default Index;
