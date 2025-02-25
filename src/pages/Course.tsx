
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const courses = [
  {
    id: 1,
    title: "Introduction to Inspire Bot Pins",
    description: "Learn about the Inspire Bot's pin layout including servo controls, sensors, and motor connections. Perfect for beginners starting their robotics journey.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800",
    category: "Beginner",
    duration: "30 min",
    content: [
      {
        title: "Understanding Pin Layout",
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
        title: "Motor Control Basics",
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
    content: [
      {
        title: "Basic Movement Controls",
        description: "Understanding how to control individual motors:",
        points: [
          "Forward Movement: Both motors forward",
          "Reverse Movement: Both motors reverse",
          "Left Turn: Right motor forward, left motor stop/reverse",
          "Right Turn: Left motor forward, right motor stop/reverse"
        ]
      },
      {
        title: "Pin Control Combinations",
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
  // ... Additional courses would be defined here
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

          <p className="text-lg text-muted-foreground">{course.description}</p>

          <div className="grid gap-8 mt-8">
            {course.content?.map((section, index) => (
              <div key={index} className="space-y-4">
                <h2 className="text-2xl font-semibold">{section.title}</h2>
                <p className="text-muted-foreground">{section.description}</p>
                <ul className="list-disc pl-6 space-y-2">
                  {section.points.map((point, i) => (
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
