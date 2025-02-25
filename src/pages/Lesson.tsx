import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";

const courses = [
  {
    id: 1,
    title: "Introduction to Inspire Bot Pins",
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

const Lesson = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();

  const course = courses.find(c => c.id === Number(courseId));
  const lesson = course?.lessons.find(l => l.id === Number(lessonId));

  if (!course || !lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-accent/20">
        <div className="container py-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Course
          </Button>
          <h1 className="text-4xl font-bold tracking-tight">Lesson Not Found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20">
      <div className="container py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate(`/course/${courseId}`)}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Course
        </Button>

        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              {lesson.title}
            </h1>
            <Badge variant="outline">
              {lesson.duration}
            </Badge>
          </div>

          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-lg">{lesson.description}</p>
            <ul className="space-y-4">
              {lesson.points.map((point, index) => (
                <li key={index} className="text-muted-foreground">
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lesson;
