
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import BlockEditor from '@/components/BlockEditor';

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
        introduction: "Welcome to your first lesson on the Inspire Bot! Your robot is equipped with 17 programmable pins that control everything from motor movement to sensor readings. Understanding these pins is the foundation of all robot programming. In this lesson, we'll explore the purpose of each pin and how they work together.",
        sections: [
          {
            title: "Inspire Bot Pin Layout Overview",
            content: "The Inspire Bot features a comprehensive pin layout that gives you complete control over its functionality:",
            details: [
              {
                subtitle: "Pin Categories and Organization",
                explanation: "The 17 pins (P0-P16) are organized into functional groups that control different aspects of your robot:",
                listItems: [
                  "Control Pins (P0, P1): For servo motor control",
                  "Sensor Pins (P2, P3, P8): For ultrasonic and line following sensors",
                  "General Purpose I/O (P4-P7, P9-P11): For custom components",
                  "Motor Control Pins (P12-P15): For movement control",
                  "Indicator Pin (P16): For onboard LED control"
                ]
              },
              {
                subtitle: "Complete Pin Reference",
                explanation: "Here's a detailed breakdown of all pins and their specific functions:",
                listItems: [
                  "P0: Built-in Servo Motor Control (0-180 degrees)",
                  "P1: External Servo Connection",
                  "P2: Ultrasonic Sensor (Trigger)",
                  "P3: Line Following Sensor",
                  "P4-P7: General Purpose I/O",
                  "P8: Ultrasonic Sensor (Echo)",
                  "P9-P11: General Purpose I/O",
                  "P12: Left Motor Direction Control (0=Backward, 1=Forward)",
                  "P13: Left Motor Speed Control (0=Stop, 1=Run)",
                  "P14: Right Motor Direction Control (0=Backward, 1=Forward)", 
                  "P15: Right Motor Speed Control (0=Stop, 1=Run)",
                  "P16: Onboard LED Control (0=Off, 1=On)"
                ]
              }
            ]
          },
          {
            title: "Servo Control System",
            content: "Servo motors allow for precise angle control, making them perfect for robot arms, sensors, and other components that need exact positioning:",
            details: [
              {
                subtitle: "Built-in Servo (P0)",
                explanation: "P0 controls the robot's main servo motor. This versatile component can be positioned at any angle between 0° and 180°, allowing for precise movement control. You can use this servo for a robotic arm, sensor platform, or even a head that can look around.",
                codingChallenge: {
                  question: "Program the servo to sweep back and forth continuously. Fill in the missing values to control the servo angle:",
                  initialCode: `
Run Forever
    Digital Write Pin P??? to ???
    Wait 1000 milliseconds
    Digital Write Pin P??? to ???
    Wait 1000 milliseconds`,
                  solution: `
Run Forever
    Digital Write Pin P0 to 0
    Wait 1000 milliseconds
    Digital Write Pin P0 to 180
    Wait 1000 milliseconds`,
                  hints: [
                    "The servo is connected to pin P0",
                    "Servo angles range from 0 to 180 degrees",
                    "1000 milliseconds equals 1 second of waiting time",
                    "Make sure to add pauses between movements to see the servo move"
                  ]
                }
              },
              {
                subtitle: "External Servo Connection (P1)",
                explanation: "Pin P1 allows you to connect an additional servo motor to your robot. This gives you the flexibility to add more complex movement capabilities, such as a gripper or a second joint in a robotic arm. Just like the built-in servo, this one can also be controlled with angles from 0° to 180°."
              }
            ]
          },
          {
            title: "Motor Control System",
            content: "The four motor control pins (P12-P15) work together in pairs to control your robot's movement. Understanding how these pins interact is essential for creating any kind of movement pattern:",
            details: [
              {
                subtitle: "Motor Pin Reference",
                explanation: "The motors are controlled using these specific pins working in pairs:",
                listItems: [
                  "P12: Left Motor Direction (0 = Backward, 1 = Forward)",
                  "P13: Left Motor Enable (0 = Stop, 1 = Run)",
                  "P14: Right Motor Direction (0 = Backward, 1 = Forward)",
                  "P15: Right Motor Enable (0 = Stop, 1 = Run)"
                ]
              },
              {
                subtitle: "Basic Movement",
                explanation: "By controlling the direction and enable pins together, you can create different movement patterns. For example, setting both direction pins to 1 makes the robot move forward, while setting them differently makes it turn.",
                codingChallenge: {
                  question: "Create a square movement pattern using the motor control pins. Program the robot to move in a square by alternating between moving forward and turning right.",
                  initialCode: `
Run Forever
    Digital Write Pin P??? to ???
    Digital Write Pin P??? to ???
    Wait 2000 milliseconds
    Digital Write Pin P??? to ???
    Digital Write Pin P??? to ???
    Wait 1000 milliseconds`,
                  solution: `
Run Forever
    Digital Write Pin P12 to 1
    Digital Write Pin P14 to 1
    Wait 2000 milliseconds
    Digital Write Pin P12 to 1
    Digital Write Pin P14 to 0
    Wait 1000 milliseconds`,
                  hints: [
                    "For forward movement, both motors should move forward (P12=1, P14=1)",
                    "For a right turn, the left motor should move forward while the right motor moves backward or stops (P12=1, P14=0)",
                    "The robot should move forward for 2 seconds, then turn right for 1 second",
                    "This pattern creates one corner of a square - repeating this pattern four times makes a complete square"
                  ]
                }
              },
              {
                subtitle: "Common Movement Commands",
                explanation: "Here are the standard pin combinations for different movement patterns:",
                listItems: [
                  "Move Forward: P12=1, P14=1 (Both motors forward)",
                  "Move Backward: P12=0, P14=0 (Both motors backward)",
                  "Turn Left: P12=0, P14=1 (Left backward, right forward)",
                  "Turn Right: P12=1, P14=0 (Left forward, right backward)",
                  "Stop: Set P13=0 and P15=0 (Disable both motors)"
                ]
              }
            ]
          },
          {
            title: "Sensor Interface System",
            content: "The Inspire Bot is equipped with several sensor pins that allow it to detect and interact with its environment:",
            details: [
              {
                subtitle: "Ultrasonic Sensor (P2, P8)",
                explanation: "The ultrasonic sensor helps your robot detect objects and measure distances. It works by sending out sound waves from the trigger pin (P2) and measuring how long it takes for them to bounce back to the echo pin (P8). This can be used for obstacle avoidance, mapping, and object detection."
              },
              {
                subtitle: "Line Following Sensor (P3)",
                explanation: "The line following sensor on pin P3 detects contrast differences between surfaces, making it perfect for following lines on the floor. This is commonly used in robotics competitions and demonstrations, allowing the robot to automatically follow a predefined path."
              },
              {
                subtitle: "LED Indicator (P16)",
                explanation: "The onboard LED connected to pin P16 gives your robot the ability to provide visual feedback. You can use it as a status indicator, a warning light, or even to signal different operational modes. For instance, you might have it blink when the robot detects an obstacle or stay solid when it's following a line."
              }
            ]
          }
        ],
        summary: "In this lesson, you've learned about the comprehensive pin layout of your Inspire Bot. You now understand how the servo control pins (P0, P1), motor control pins (P12-P15), sensor pins (P2, P3, P8), and the LED pin (P16) all work together to create a fully functional robot. This knowledge serves as the foundation for all the programming you'll do with your robot in future lessons.",
        practiceExercise: "Try creating a more complex movement pattern by combining the pin controls you've learned. Can you make the robot move in a triangle pattern? How about a zigzag? Remember to use the appropriate pin combinations and timing to achieve the desired movements."
      },
      {
        id: 2,
        title: "Advanced Pin Controls",
        duration: "20 min",
        description: "Dive deeper into pin control and learn about sensor integration.",
        introduction: "Now that you understand the basics of pin control, let's explore more advanced concepts and how to integrate sensors with our robot.",
        sections: [
          {
            title: "Sensor Pins Reference",
            content: "Your Inspire Bot has several sensor pins:",
            details: [
              {
                subtitle: "Sensor Pin Layout",
                explanation: "These pins connect to various sensors on your robot:",
                listItems: [
                  "P2: Ultrasonic Sensor Trigger Pin",
                  "P8: Ultrasonic Sensor Echo Pin",
                  "P3: Line Following Sensor Input",
                  "P16: Onboard LED (useful for status indicators)"
                ]
              }
            ]
          },
          {
            title: "Sensor Integration",
            content: "Learn how to use the ultrasonic sensor for obstacle detection:",
            details: [
              {
                subtitle: "Ultrasonic Sensor (P2)",
                explanation: "The ultrasonic sensor helps your robot detect obstacles. We'll learn how to read sensor data and make decisions based on it.",
                codingChallenge: {
                  question: "Create an obstacle avoidance program. Fill in the missing values:",
                  initialCode: `
Run Forever
    If Distance < ???
        Digital Write Pin P??? to ???
        Digital Write Pin P??? to ???
        Wait ??? milliseconds
    Else
        Digital Write Pin P??? to ???
        Digital Write Pin P??? to ???`,
                  solution: `
Run Forever
    If Distance < 20
        Digital Write Pin P12 to 0
        Digital Write Pin P14 to 1
        Wait 1000 milliseconds
    Else
        Digital Write Pin P12 to 1
        Digital Write Pin P14 to 1`,
                  hints: [
                    "20cm is a good distance for obstacle detection",
                    "To turn away from an obstacle, make the motors rotate in opposite directions",
                    "The wait time determines how long the robot turns"
                  ]
                }
              }
            ]
          }
        ],
        summary: "You've learned how to integrate sensors with motor controls to create smarter robot behaviors.",
        practiceExercise: "Try modifying the obstacle avoidance program to make the robot turn right instead of left when it detects an obstacle."
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
        duration: "25 min",
        description: "Master the fundamentals of robot movement using motor control commands.",
        introduction: "In this lesson, we'll learn how to create precise movement patterns using motor control commands.",
        sections: [
          {
            title: "Motor Pins Overview",
            content: "Before we begin programming movements, let's review the motor control pins:",
            details: [
              {
                subtitle: "Motor Control Pins",
                explanation: "The Inspire Bot uses these pins for motor control:",
                listItems: [
                  "P12: Left Motor Direction (0 = Backward, 1 = Forward)",
                  "P13: Left Motor Enable (0 = Stop, 1 = Run)",
                  "P14: Right Motor Direction (0 = Backward, 1 = Forward)",
                  "P15: Right Motor Enable (0 = Stop, 1 = Run)"
                ]
              },
              {
                subtitle: "Movement Combinations",
                explanation: "Remember these common pin combinations:",
                listItems: [
                  "Move Forward: P12=1, P14=1",
                  "Move Backward: P12=0, P14=0",
                  "Turn Left: P12=0, P14=1",
                  "Turn Right: P12=1, P14=0",
                  "Stop: P13=0, P15=0"
                ]
              }
            ]
          },
          {
            title: "Movement Patterns",
            content: "Create complex movement patterns using motor controls:",
            details: [
              {
                subtitle: "Creating Patterns",
                explanation: "Learn to combine basic movements to create complex patterns.",
                codingChallenge: {
                  question: "Create a zigzag pattern. Fill in the missing values to make the robot move in a zigzag:",
                  initialCode: `
Run Forever
    Digital Write Pin P??? to ???
    Digital Write Pin P??? to ???
    Wait ??? milliseconds
    Digital Write Pin P??? to ???
    Digital Write Pin P??? to ???
    Wait ??? milliseconds`,
                  solution: `
Run Forever
    Digital Write Pin P12 to 0
    Digital Write Pin P14 to 1
    Wait 1000 milliseconds
    Digital Write Pin P12 to 1
    Digital Write Pin P14 to 0
    Wait 1000 milliseconds`,
                  hints: [
                    "To create a zigzag, alternate between turning left and right",
                    "1000 milliseconds gives a good turning angle",
                    "When motors rotate in opposite directions, the robot turns"
                  ]
                }
              }
            ]
          }
        ],
        summary: "You've learned how to create complex movement patterns by combining basic motor controls.",
        practiceExercise: "Try creating a figure-eight pattern using the motor control commands you've learned."
      },
      {
        id: 2,
        title: "Speed Control",
        duration: "30 min",
        description: "Learn to control robot speed and create smooth movements.",
        introduction: "In this lesson, we'll explore how to control the speed of your robot's motors for precise movements.",
        sections: [
          {
            title: "Variable Speed Control",
            content: "Learn to adjust motor speeds for smooth movement:",
            details: [
              {
                subtitle: "Digital Pin States",
                explanation: "Remember that each motor has a direction pin and an enable pin:",
                listItems: [
                  "Direction Pins (P12, P14): Control forward/backward (1=forward, 0=backward)",
                  "Enable Pins (P13, P15): Control whether the motor runs (1=run, 0=stop)"
                ]
              },
              {
                subtitle: "Speed Adjustment",
                explanation: "Control the speed of each motor independently for precise movements.",
                codingChallenge: {
                  question: "Create a smooth turning pattern. Set the appropriate speed values:",
                  initialCode: `
Run Forever
    Digital Write Pin P??? to ???
    Digital Write Pin P??? to ???
    Wait ??? milliseconds
    Digital Write Pin P??? to ???
    Digital Write Pin P??? to ???
    Wait ??? milliseconds`,
                  solution: `
Run Forever
    Digital Write Pin P12 to 1
    Digital Write Pin P14 to 1
    Wait 2000 milliseconds
    Digital Write Pin P12 to 1
    Digital Write Pin P14 to 0
    Wait 2000 milliseconds`,
                  hints: [
                    "Digital write pins can be set to 0 or 1",
                    "Different pin settings create different movement patterns",
                    "Longer wait times create wider turns"
                  ]
                }
              }
            ]
          }
        ],
        summary: "You now understand how to control motor pins for precise movement control.",
        practiceExercise: "Experiment with different pin combinations to create a smooth circular pattern."
      }
    ]
  }
];

const CodeEditor = ({ challenge, onSubmit }: { 
  challenge: { 
    question: string; 
    initialCode: string; 
    solution: string; 
    hints?: string[];
  }; 
  onSubmit: (code: string) => void; 
}) => {
  const [currentHint, setCurrentHint] = useState(0);
  const { toast } = useToast();

  const parseCodeToBlocks = (code: string): { availableBlocks: any[], initialBlocks: any[] } => {
    const lines = code.trim().split('\n').filter(line => line.trim() !== '');
    
    const blocks = lines.map((line, index) => ({
      id: `block-${index}`,
      content: line.trim(),
      type: line.includes('Wait') ? 'basic' : 
            line.includes('Function') || line.includes('Run Forever') || line.includes('Repeat') || line.includes('If') ? 'control' :
            line.includes('Motor') ? 'movement' : 'servo',
      hasInput: line.includes('???'),
      hasPin: line.includes('P???')
    }));

    const initialBlocks = blocks.filter(b => !b.content.includes('???'));
    const availableBlocks = blocks.filter(b => b.content.includes('???'));

    return { availableBlocks, initialBlocks };
  };

  const { availableBlocks, initialBlocks } = parseCodeToBlocks(challenge.initialCode);

  const showHint = () => {
    if (challenge.hints && currentHint < challenge.hints.length) {
      toast({
        title: "Hint",
        description: challenge.hints[currentHint],
      });
      setCurrentHint(prev => prev + 1);
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-lg font-medium">{challenge.question}</p>
      <BlockEditor
        initialBlocks={initialBlocks}
        availableBlocks={availableBlocks}
        onSubmit={onSubmit}
      />
      {challenge.hints && currentHint < challenge.hints.length && (
        <Button variant="outline" onClick={showHint}>
          Get Hint
        </Button>
      )}
    </div>
  );
};

const Lesson = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const [showSolution, setShowSolution] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  const course = courses.find(c => c.id === Number(courseId));
  const lesson = course?.lessons.find(l => l.id === Number(lessonId));

  const handleCodeSubmit = (code: string, sectionIndex: number, detailIndex: number) => {
    const detail = lesson?.sections[sectionIndex].details[detailIndex];
    if (!detail?.codingChallenge?.solution) return;

    // Normalize both strings by removing all whitespace
    const normalizedSolution = detail.codingChallenge.solution.replace(/\s+/g, '');
    
    // For wait blocks, we need to allow any valid milliseconds value
    let normalizedSubmission = code.replace(/\s+/g, '');
    
    // Extract wait values from both the submission and solution for comparison
    const submissionWaitValues = (code.match(/Wait\s+(\d+)\s+milliseconds/g) || []).map(
      m => parseInt(m.replace(/Wait\s+(\d+)\s+milliseconds/, '$1'))
    );
    
    const solutionWaitValues = (detail.codingChallenge.solution.match(/Wait\s+(\d+)\s+milliseconds/g) || []).map(
      m => parseInt(m.replace(/Wait\s+(\d+)\s+milliseconds/, '$1'))
    );
    
    // Replace wait values in normalized strings for flexible comparison
    let normalizedSolutionForComparison = normalizedSolution;
    let normalizedSubmissionForComparison = normalizedSubmission;
    
    // Allow any wait time values to match
    if (submissionWaitValues.length === solutionWaitValues.length && submissionWaitValues.length > 0) {
      // Replace all wait times with a fixed placeholder for comparison
      solutionWaitValues.forEach((_, index) => {
        normalizedSolutionForComparison = normalizedSolutionForComparison.replace(
          new RegExp(`Wait${solutionWaitValues[index]}milliseconds`), 
          'WaitXXXmilliseconds'
        );
        normalizedSubmissionForComparison = normalizedSubmissionForComparison.replace(
          new RegExp(`Wait${submissionWaitValues[index]}milliseconds`), 
          'WaitXXXmilliseconds'
        );
      });
    }

    console.log("Comparing submission:", normalizedSubmissionForComparison);
    console.log("With solution:", normalizedSolutionForComparison);
    
    if (normalizedSubmissionForComparison === normalizedSolutionForComparison) {
      toast({
        title: "Correct!",
        description: "Your solution matches the expected output. Great job!",
      });
      setShowSolution({ ...showSolution, [`${sectionIndex}-${detailIndex}`]: true });
    } else {
      toast({
        title: "Not quite right",
        description: "Try again! Use the hints if you need help.",
        variant: "destructive",
      });
    }
  };

  const goToNextLesson = () => {
    const currentLessonIndex = course?.lessons.findIndex(l => l.id === Number(lessonId)) ?? -1;
    if (course && currentLessonIndex < course.lessons.length - 1) {
      navigate(`/course/${courseId}/lesson/${course.lessons[currentLessonIndex + 1].id}`);
    }
  };

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

  const isLastLesson = course.lessons[course.lessons.length - 1].id === Number(lessonId);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20">
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Courses
          </Button>

          {!isLastLesson && (
            <Button onClick={goToNextLesson}>
              Next Lesson
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>

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

            {lesson.sections?.map((section, sectionIndex) => (
              <Card key={sectionIndex} className="p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
                <p className="text-lg mb-6">{section.content}</p>

                {section.details?.map((detail, detailIndex) => (
                  <div key={detailIndex} className="mb-6">
                    <h3 className="text-xl font-semibold mb-3">{detail.subtitle}</h3>
                    <p className="mb-4">{detail.explanation}</p>
                    
                    {detail.listItems && (
                      <ul className="list-disc pl-6 space-y-2 mb-4">
                        {detail.listItems.map((item, i) => (
                          <li key={i} className="text-muted-foreground">{item}</li>
                        ))}
                      </ul>
                    )}

                    {detail.codingChallenge && (
                      <div className="mt-6 bg-accent/20 p-6 rounded-lg">
                        <CodeEditor 
                          challenge={detail.codingChallenge}
                          onSubmit={(code) => handleCodeSubmit(code, sectionIndex, detailIndex)}
                        />
                        {showSolution[`${sectionIndex}-${detailIndex}`] && (
                          <div className="mt-4">
                            <h4 className="font-semibold mb-2">Solution:</h4>
                            <div className="bg-black/90 text-white p-4 rounded-md font-mono whitespace-pre">
                              {detail.codingChallenge.solution}
                            </div>
                          </div>
                        )}
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
