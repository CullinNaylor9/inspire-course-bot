import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";

const courses = [
  {
    id: 1,
    title: "Introduction to Inspire Bot Pins",
    lessons: [
      {
        id: 1,
        title: "Understanding Pin Layout",
        duration: "15 min",
        description: "Learn about the essential pin configuration of your Inspire Bot and how each pin contributes to different functionalities.",
        introduction: "The Inspire Bot is equipped with multiple pins that control various functions. Understanding these pins is crucial for programming your robot effectively. Let's explore each pin category and its purpose.",
        sections: [
          {
            title: "Servo Control System",
            content: "The servo system uses two primary pins for precise motor control:",
            details: [
              {
                subtitle: "Built-in Servo (P0)",
                explanation: "P0 is dedicated to the robot's built-in servo motor. This pin can output PWM signals to control the servo's position with precision. The signal ranges from 0° to 180°, where:",
                examples: [
                  "0° = 500μs pulse",
                  "90° = 1500μs pulse",
                  "180° = 2500μs pulse"
                ]
              },
              {
                subtitle: "Additional Servo Port (P1)",
                explanation: "P1 provides connectivity for an external servo motor, allowing you to add more movement capabilities to your robot. This pin follows the same PWM principles as P0."
              }
            ]
          },
          {
            title: "Sensor Integration",
            content: "The Inspire Bot features multiple sensor pins for environmental awareness:",
            details: [
              {
                subtitle: "Ultrasonic Sensor System (P2, P8)",
                explanation: "The ultrasonic sensor system uses two pins for distance measurement:",
                points: [
                  "P2 (Trigger): Sends the ultrasonic pulse",
                  "P8 (Echo): Receives the reflected signal",
                  "Distance calculation: (Echo time × Speed of sound) ÷ 2"
                ]
              },
              {
                subtitle: "Line Following Sensor (P3)",
                explanation: "P3 connects to the line following sensor, enabling the robot to follow paths and detect surface changes. The sensor returns:",
                points: [
                  "Digital 1: When over a dark surface",
                  "Digital 0: When over a light surface"
                ]
              }
            ]
          },
          {
            title: "LED Control System",
            content: "P16 manages the robot's LED indicators:",
            details: [
              {
                subtitle: "LED Programming (P16)",
                explanation: "This pin controls the onboard LED, useful for status indication and debugging:",
                points: [
                  "Digital HIGH (1): LED ON",
                  "Digital LOW (0): LED OFF",
                  "PWM signals: Adjustable brightness"
                ]
              }
            ]
          },
          {
            title: "Motor Control System",
            content: "Four pins (P12-P15) work in pairs to control the robot's movement:",
            details: [
              {
                subtitle: "Left Motor Control (P12, P13)",
                explanation: "These pins work together to control the left motor direction:",
                table: [
                  ["P12", "P13", "Result"],
                  ["0", "1", "Forward"],
                  ["1", "0", "Reverse"],
                  ["0", "0", "Stop"]
                ]
              },
              {
                subtitle: "Right Motor Control (P14, P15)",
                explanation: "Similarly, these pins control the right motor:",
                table: [
                  ["P14", "P15", "Result"],
                  ["1", "0", "Forward"],
                  ["0", "1", "Reverse"],
                  ["0", "0", "Stop"]
                ]
              }
            ]
          }
        ],
        summary: "Understanding these pin configurations is essential for programming your Inspire Bot. Each pin serves a specific purpose and, when used correctly, allows you to create complex behaviors and interactions.",
        practiceExercise: "Try connecting an LED to P16 and create a simple blinking pattern. This will help you understand digital output control."
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
            <p className="text-xl mb-8">{lesson.introduction}</p>

            {lesson.sections?.map((section, index) => (
              <Card key={index} className="p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
                <p className="text-lg mb-6">{section.content}</p>

                {section.details?.map((detail, detailIndex) => (
                  <div key={detailIndex} className="mb-6">
                    <h3 className="text-xl font-semibold mb-3">{detail.subtitle}</h3>
                    <p className="mb-4">{detail.explanation}</p>

                    {detail.points && (
                      <ul className="list-disc pl-6 space-y-2 mb-4">
                        {detail.points.map((point, pointIndex) => (
                          <li key={pointIndex} className="text-muted-foreground">{point}</li>
                        ))}
                      </ul>
                    )}

                    {detail.examples && (
                      <div className="bg-muted p-4 rounded-md mb-4">
                        <h4 className="font-semibold mb-2">Examples:</h4>
                        <ul className="list-disc pl-6 space-y-2">
                          {detail.examples.map((example, exampleIndex) => (
                            <li key={exampleIndex} className="text-muted-foreground">{example}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {detail.table && (
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-border">
                          <thead>
                            <tr>
                              {detail.table[0].map((header, i) => (
                                <th key={i} className="px-4 py-2 text-left font-semibold">{header}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border">
                            {detail.table.slice(1).map((row, rowIndex) => (
                              <tr key={rowIndex}>
                                {row.map((cell, cellIndex) => (
                                  <td key={cellIndex} className="px-4 py-2">{cell}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                ))}
              </Card>
            ))}

            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Summary</h2>
              <p className="text-lg mb-6">{lesson.summary}</p>
            </div>

            <div className="bg-primary/5 p-6 rounded-lg mt-8">
              <h2 className="text-xl font-bold mb-4">Practice Exercise</h2>
              <p className="text-lg">{lesson.practiceExercise}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lesson;
