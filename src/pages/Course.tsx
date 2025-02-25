
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, PlayCircle, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const courses = [
  {
    id: 1,
    title: "Introduction to Inspire Bot Pins",
    description: "Learn about the Inspire Bot's pin layout including servo controls, sensors, and motor connections. Perfect for beginners starting their robotics journey.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800",
    category: "Beginner",
    duration: "30 min",
    lessons: [
      {
        id: 1,
        title: "Understanding Pin Layout",
        duration: "15 min",
        description: "The Inspire Bot features multiple pins for different functionalities:",
        points: [
          "Servo Control Pins: P0 (Built-in Servo), P1 (Additional Servo)",
          "Ultrasonic Sensor Pins: P2, P8",
          "Line Following Sensor: P3",
          "LED Control: P16",
          "Motor Control Pins: P12-P15"
        ]
      },
      {
        id: 2,
        title: "Motor Control Basics",
        duration: "15 min",
        description: "Learn the fundamental pin combinations for motor control:",
        points: [
          "Left Motor Forward: P12 = 0, P13 = 1",
          "Left Motor Reverse: P12 = 1, P13 = 0",
          "Right Motor Forward: P14 = 1, P15 = 0",
          "Right Motor Reverse: P14 = 0, P15 = 1"
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Motor Control Fundamentals",
    description: "Master motor control using pins 12-15. Learn how to make your Inspire Bot move forward, reverse, and turn using precise pin control combinations.",
    image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&q=80&w=800",
    category: "Beginner",
    duration: "45 min",
    lessons: [
      {
        id: 1,
        title: "Basic Movement Controls",
        duration: "20 min",
        description: "Understanding how to control individual motors:",
        points: [
          "Forward Movement: Both motors forward",
          "Reverse Movement: Both motors reverse",
          "Left Turn: Right motor forward, left motor stop/reverse",
          "Right Turn: Left motor forward, right motor stop/reverse"
        ]
      },
      {
        id: 2,
        title: "Pin Control Combinations",
        duration: "25 min",
        description: "Learn the exact pin states for each movement:",
        points: [
          "Forward: Left(P12=0, P13=1) + Right(P14=1, P15=0)",
          "Reverse: Left(P12=1, P13=0) + Right(P14=0, P15=1)",
          "Left Turn: Left(P12=1, P13=0) + Right(P14=1, P15=0)",
          "Right Turn: Left(P12=0, P13=1) + Right(P14=0, P15=1)"
        ]
      }
    ]
  }
];

const Course = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const course = courses.find(c => c.id === Number(id));

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-accent/20">
        <div className="container py-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Courses
          </Button>
          <h1 className="text-4xl font-bold tracking-tight">Course Not Found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20">
      <div className="container py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Courses
        </Button>
        
        <div className="space-y-8">
          <div className="relative h-[300px] rounded-lg overflow-hidden">
            <img
              src={course.image}
              alt={course.title}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="text-center text-white p-6">
                <h1 className="text-4xl font-bold tracking-tight mb-4">
                  {course.title}
                </h1>
                <div className="flex items-center justify-center gap-4">
                  <Badge variant="secondary">
                    {course.category}
                  </Badge>
                  <Badge variant="outline" className="bg-white/10">
                    {course.duration}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Button size="lg" className="gap-2">
              <PlayCircle className="h-5 w-5" />
              Start Course
            </Button>
          </div>

          <p className="text-lg text-muted-foreground">{course.description}</p>

          <div className="grid gap-8 mt-8">
            <h2 className="text-3xl font-bold">Course Content</h2>
            {course.lessons?.map((lesson, index) => (
              <div key={index} className="space-y-4 border rounded-lg p-6 hover:border-primary transition-colors">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">
                      Lesson {index + 1}: {lesson.title}
                    </h3>
                    <Badge variant="outline" className="mt-2">
                      {lesson.duration}
                    </Badge>
                  </div>
                  <Button variant="ghost" size="icon">
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
                <p className="text-muted-foreground">{lesson.description}</p>
                <ul className="list-disc pl-6 space-y-2">
                  {lesson.points.map((point, i) => (
                    <li key={i} className="text-muted-foreground">{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;
