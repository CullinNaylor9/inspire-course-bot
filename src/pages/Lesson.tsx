
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

// Define types for our data structure
type Section = {
  title: string;
  content: string;
  points: string[];
};

type Lesson = {
  id: number;
  title: string;
  duration: string;
  description: string;
  content: string;
  sections?: Section[];
};

type Course = {
  id: number;
  title: string;
  lessons: Lesson[];
};

// This data structure needs to match the one in Course.tsx
const courses: Course[] = [
  {
    id: 1,
    title: "Introduction to Inspire Bot Pins",
    lessons: [
      {
        id: 1,
        title: "Understanding Pin Layout",
        duration: "15 min",
        description: "The Inspire Bot features multiple pins for different functionalities.",
        content: "In this lesson, we'll explore the pin layout of the Inspire Bot and understand how each pin contributes to the robot's functionality."
      },
      {
        id: 2,
        title: "Getting Started with Pins",
        duration: "15 min",
        description: "Learn how to interact with pins through basic programming.",
        content: "This lesson covers the fundamentals of interacting with pins, including setting modes, reading data, and controlling outputs."
      }
    ]
  },
  {
    id: 2,
    title: "Motor Control Fundamentals",
    lessons: [
      {
        id: 1,
        title: "Basic Movement Controls",
        duration: "20 min",
        description: "Understanding how to control individual motors.",
        content: "Learn how to control the basic movement of your robot by manipulating the motor control pins."
      },
      {
        id: 2,
        title: "Pin Control Combinations",
        duration: "25 min",
        description: "Learn the exact pin states for each movement.",
        content: "This lesson covers the specific pin combinations needed for different movement patterns."
      }
    ]
  },
  {
    id: 3,
    title: "Servo and Sensor Integration",
    lessons: [
      {
        id: 1,
        title: "Servo Motor Programming",
        duration: "25 min",
        description: "Learn to control servo positioning with precision.",
        content: "Master the art of servo control to create precise movements for your robot's appendages."
      },
      {
        id: 2,
        title: "Ultrasonic Distance Sensing",
        duration: "35 min",
        description: "Implement distance detection for obstacle avoidance.",
        content: "Learn how to use ultrasonic sensors to detect obstacles and implement avoidance strategies."
      }
    ]
  },
  {
    id: 4,
    title: "Line Following and LED Control",
    lessons: [
      {
        id: 1,
        title: "Line Detection Fundamentals",
        duration: "20 min",
        description: "Master line following techniques using the P3 sensor.",
        content: "Understand how to use infrared sensors to detect and follow lines with your robot."
      },
      {
        id: 2,
        title: "LED Signaling Systems",
        duration: "25 min",
        description: "Implement visual feedback through LED control on P16.",
        content: "Create sophisticated visual feedback systems using programmable LEDs."
      }
    ]
  },
  {
    id: 5,
    title: "Advanced Movement Patterns",
    lessons: [
      {
        id: 1,
        title: "Precision Movement Programming",
        duration: "40 min",
        description: "Create advanced movement routines for specific tasks.",
        content: "In this lesson, we'll explore how to create precise, controlled movements with your Inspire Bot. By combining timing, speed control, and careful programming, you can make your robot perform advanced maneuvers with high accuracy.",
        sections: [
          {
            title: "Creating Precise Turns",
            content: "Learn to program your robot to make exact-angle turns with repeatable accuracy:",
            points: [
              "On-the-spot turns: Left and right motors in opposite directions",
              "Arc turns: Both motors in same direction but at different speeds",
              "Point turns: One motor stopped, other motor active",
              "Turn angle determined by motor speed and duration"
            ]
          },
          {
            title: "Complex Movement Patterns",
            content: "Create sophisticated movement sequences for your robot:",
            points: [
              "Figure-8 patterns combining left and right turns",
              "Spiral movements with gradually changing motor speeds",
              "Grid-based navigation using precise movements",
              "Choreographed routines with timed sequences"
            ]
          },
          {
            title: "Calibrating Straight-Line Movement",
            content: "Achieve precise straight-line movement through careful calibration:",
            points: [
              "Compensating for motor variations",
              "Using timing to measure distance",
              "Creating self-correcting movement algorithms",
              "Implementing speed control for consistent movement"
            ]
          }
        ]
      },
      {
        id: 2,
        title: "Obstacle Course Navigation",
        duration: "50 min",
        description: "Combine sensors and motors for autonomous navigation.",
        content: "Learn to navigate complex environments by combining sensor data with advanced movement controls.",
        sections: [
          {
            title: "Environmental Detection",
            content: "Use sensors to build a map of the environment around your robot:",
            points: [
              "Multi-directional scanning with servo-mounted sensors",
              "Creating distance maps of surroundings",
              "Detecting and categorizing obstacle types",
              "Implementing emergency collision prevention"
            ]
          },
          {
            title: "Wall Following",
            content: "Create a robot that can navigate by following walls or boundaries:",
            points: [
              "Maintaining constant distance from walls",
              "Detecting and handling corners",
              "Following curved boundaries",
              "Recognizing doorways and openings"
            ]
          },
          {
            title: "Decision Trees for Navigation",
            content: "Implement hierarchical decision making for complex environments:",
            points: [
              "Prioritizing different sensor inputs",
              "Creating fallback behaviors",
              "Handling edge cases and unexpected situations",
              "Developing recovery strategies"
            ]
          }
        ]
      }
    ]
  },
  {
    id: 6,
    title: "Complete Robot Programming",
    lessons: [
      {
        id: 1,
        title: "Integrating Multiple Systems",
        duration: "55 min",
        description: "Combine all robot components into a cohesive system.",
        content: "Learn to integrate all the subsystems of your robot into a harmonious whole."
      },
      {
        id: 2,
        title: "Autonomous Mission Programming",
        duration: "65 min",
        description: "Program your robot to complete complex missions autonomously.",
        content: "Design and implement complete autonomous missions for your robot."
      }
    ]
  }
];

const Lesson = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState(0);

  const course = courses.find(c => c.id === Number(courseId));
  const lesson = course?.lessons?.find(l => l.id === Number(lessonId));

  const goToNextLesson = () => {
    const currentLessonIndex = course?.lessons.findIndex(l => l.id === Number(lessonId)) ?? -1;
    if (course && currentLessonIndex < course.lessons.length - 1) {
      navigate(`/course/${courseId}/lesson/${course.lessons[currentLessonIndex + 1].id}`);
    } else if (Number(courseId) < courses.length) {
      // Move to the first lesson of the next course
      navigate(`/course/${Number(courseId) + 1}/lesson/1`);
    } else {
      toast({
        title: "Congratulations!",
        description: "You have completed all lessons.",
      });
    }
  };

  const goToPreviousLesson = () => {
    const currentLessonIndex = course?.lessons.findIndex(l => l.id === Number(lessonId)) ?? -1;
    if (currentLessonIndex > 0) {
      navigate(`/course/${courseId}/lesson/${course.lessons[currentLessonIndex - 1].id}`);
    } else if (Number(courseId) > 1) {
      // Move to the last lesson of the previous course
      const prevCourse = courses.find(c => c.id === Number(courseId) - 1);
      if (prevCourse && prevCourse.lessons.length > 0) {
        navigate(`/course/${Number(courseId) - 1}/lesson/${prevCourse.lessons[prevCourse.lessons.length - 1].id}`);
      }
    }
  };

  if (!course || !lesson) {
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
          <div className="text-center py-16">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Lesson Not Found</h1>
            <p className="text-lg text-muted-foreground mb-8">
              The lesson you're looking for doesn't exist or is still under development.
            </p>
            <Button onClick={() => navigate(`/course/${courseId}`)}>
              Return to Course
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const isLastLesson = course.lessons[course.lessons.length - 1].id === Number(lessonId) && course.id === courses.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20">
      <div className="container py-8">
        <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate(`/course/${courseId}`)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Course
          </Button>

          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={goToPreviousLesson}
              disabled={Number(lessonId) === 1 && Number(courseId) === 1}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous Lesson
            </Button>
            
            {!isLastLesson && (
              <Button onClick={goToNextLesson}>
                Next Lesson
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              {lesson.title}
            </h1>
            <Badge variant="outline" className="mb-4">
              {lesson.duration}
            </Badge>
            <p className="text-xl text-muted-foreground">{lesson.description}</p>
          </div>

          <Card className="p-6">
            <div className="prose dark:prose-invert max-w-none">
              <p>{lesson.content}</p>

              {lesson.sections && (
                <div className="mt-8 space-y-8">
                  {lesson.sections.map((section, index) => (
                    <div key={index} className="mt-8">
                      <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
                      <p className="mb-4">{section.content}</p>
                      
                      {section.points && (
                        <ul className="list-disc pl-6 space-y-2">
                          {section.points.map((point, i) => (
                            <li key={i} className="text-muted-foreground">{point}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>

          <div className="flex justify-between mt-8">
            <Button 
              variant="outline" 
              onClick={goToPreviousLesson}
              disabled={Number(lessonId) === 1 && Number(courseId) === 1}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous Lesson
            </Button>
            
            {!isLastLesson && (
              <Button onClick={goToNextLesson}>
                Next Lesson
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lesson;
