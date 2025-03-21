
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
        title: "Getting Started with Pins",
        duration: "15 min",
        description: "Learn how to interact with pins through basic programming:",
        points: [
          "Digital vs. Analog Pins",
          "Setting Pin Modes (Input/Output)",
          "Reading Sensor Data",
          "Writing Control Signals",
          "Basic Debugging Techniques"
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
  },
  {
    id: 3,
    title: "Servo and Sensor Integration",
    description: "Explore how to use the built-in servo (P0), additional servo (P1), and integrate ultrasonic sensors (P2, P8) for advanced robot control.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
    category: "Intermediate",
    duration: "60 min",
    lessons: [
      {
        id: 1,
        title: "Servo Motor Programming",
        duration: "25 min",
        description: "Learn to control servo positioning with precision:",
        points: [
          "Understanding servo angle control (0-180 degrees)",
          "Programming the built-in servo on P0",
          "Adding an external servo on P1",
          "Creating smooth movements with timing",
          "Building a grabber mechanism"
        ]
      },
      {
        id: 2,
        title: "Ultrasonic Distance Sensing",
        duration: "35 min",
        description: "Implement distance detection for obstacle avoidance:",
        points: [
          "How ultrasonic sensors work (P2, P8)",
          "Calculating distance from echo time",
          "Setting up detection thresholds",
          "Implementing obstacle detection algorithms",
          "Creating responsive behaviors based on distance"
        ]
      }
    ]
  },
  {
    id: 4,
    title: "Line Following and LED Control",
    description: "Build intelligent behaviors using the line following sensor (P3) and control LED lights (P16) for visual feedback and night operations.",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&q=80&w=800",
    category: "Intermediate",
    duration: "45 min",
    lessons: [
      {
        id: 1,
        title: "Line Detection Fundamentals",
        duration: "20 min",
        description: "Master line following techniques using the P3 sensor:",
        points: [
          "How infrared line sensors work",
          "Calibrating for different surfaces",
          "Reading and interpreting sensor values",
          "Creating control loops for line following",
          "Handling intersections and gaps"
        ]
      },
      {
        id: 2,
        title: "LED Signaling Systems",
        duration: "25 min",
        description: "Implement visual feedback through LED control on P16:",
        points: [
          "Basic LED control (on/off/blink patterns)",
          "Color-coded status indicators",
          "Using LEDs for debugging",
          "Creating light patterns for different robot states",
          "Implementing low-light operation modes"
        ]
      }
    ]
  },
  {
    id: 5,
    title: "Advanced Movement Patterns",
    description: "Create complex movement patterns by combining motor controls. Learn how to make your robot navigate obstacles and perform precise maneuvers.",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=800",
    category: "Advanced",
    duration: "90 min",
    lessons: [
      {
        id: 1,
        title: "Precision Movement Programming",
        duration: "40 min",
        description: "Create advanced movement routines for specific tasks:",
        points: [
          "Implementing speed control algorithms",
          "Creating precise turning angles (45°, 90°, 180°)",
          "Programming complex patterns (figure-8, spiral, etc.)",
          "Using timing and sequencing for choreographed movements",
          "Calibrating motor outputs for straight lines"
        ]
      },
      {
        id: 2,
        title: "Obstacle Course Navigation",
        duration: "50 min",
        description: "Combine sensors and motors for autonomous navigation:",
        points: [
          "Mapping an environment with sensors",
          "Implementing wall-following algorithms",
          "Creating decision trees for path selection",
          "Handling different surface types",
          "Recovering from difficult positions"
        ]
      }
    ]
  },
  {
    id: 6,
    title: "Complete Robot Programming",
    description: "Bring everything together by creating a fully autonomous robot using all sensors, motors, and LED indicators for complex behaviors.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
    category: "Advanced",
    duration: "120 min",
    lessons: [
      {
        id: 1,
        title: "Integrating Multiple Systems",
        duration: "55 min",
        description: "Combine all robot components into a cohesive system:",
        points: [
          "Creating a sensor fusion system",
          "Building a hierarchical control structure",
          "Implementing priority-based decision making",
          "Managing multiple inputs and outputs",
          "Optimizing code for reliability"
        ]
      },
      {
        id: 2,
        title: "Autonomous Mission Programming",
        duration: "65 min",
        description: "Program your robot to complete complex missions autonomously:",
        points: [
          "Defining mission objectives and success criteria",
          "Creating state machines for different behaviors",
          "Implementing error detection and recovery",
          "Building in fail-safes and timeouts",
          "Testing and refining autonomous performance"
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

  const handleStartCourse = () => {
    navigate(`/course/${id}/lesson/1`);
  };

  const handleLessonClick = (lessonId: number) => {
    navigate(`/course/${id}/lesson/${lessonId}`);
  };

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
              src={course?.image}
              alt={course?.title}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="text-center text-white p-6">
                <h1 className="text-4xl font-bold tracking-tight mb-4">
                  {course?.title}
                </h1>
                <div className="flex items-center justify-center gap-4">
                  <Badge variant="secondary">
                    {course?.category}
                  </Badge>
                  <Badge variant="outline" className="bg-white/10">
                    {course?.duration}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Button size="lg" className="gap-2" onClick={handleStartCourse}>
              <PlayCircle className="h-5 w-5" />
              Start Course
            </Button>
          </div>

          <p className="text-lg text-muted-foreground">{course?.description}</p>

          <div className="grid gap-8 mt-8">
            <h2 className="text-3xl font-bold">Course Content</h2>
            {course?.lessons?.map((lesson, index) => (
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
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleLessonClick(lesson.id)}
                  >
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
