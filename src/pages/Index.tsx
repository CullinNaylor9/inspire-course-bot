
import { AIHelper } from "@/components/AIHelper";
import { CourseCard } from "@/components/CourseCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const placeholderCourses = [
  {
    title: "Getting Started with Inspire Bot",
    description: "Learn the basics of Inspire Bot and how to set it up with your Microbit.",
    image: "/placeholder.svg",
    category: "Beginner",
    duration: "30 min",
  },
  {
    title: "Understanding Microbit Pins",
    description: "Deep dive into Microbit pins and their functions with Inspire Bot.",
    image: "/placeholder.svg",
    category: "Intermediate",
    duration: "45 min",
  },
  {
    title: "Advanced Inspire Bot Projects",
    description: "Create complex projects using Inspire Bot and Microbit.",
    image: "/placeholder.svg",
    category: "Advanced",
    duration: "60 min",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20">
      <div className="container py-8 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Inspire Bot Courses</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Learn how to master the Inspire Bot with our comprehensive courses.
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
          {placeholderCourses.map((course, index) => (
            <CourseCard key={index} {...course} />
          ))}
        </div>
      </div>
      
      <AIHelper />
    </div>
  );
};

export default Index;
