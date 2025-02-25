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
        introduction: "The Inspire Bot is equipped with multiple pins that control various functions. Understanding these pins is crucial for programming your robot effectively. Let's explore each pin category and its purpose.",
        sections: [
          {
            title: "Servo Control System",
            content: "The servo system uses P0 pin for precise motor control:",
            details: [
              {
                subtitle: "Built-in Servo (P0)",
                explanation: "P0 is dedicated to the robot's built-in servo motor. This pin can output PWM signals to control the servo's position with precision. The signal ranges from 0° to 180°.",
                codingChallenge: {
                  question: "Make the servo move back and forth continuously. Set the servo angle and add appropriate pauses:",
                  initialCode: `
Run Forever
    Digital Write Pin P??? to ???
    Wait ??? milliseconds
    Digital Write Pin P??? to ???
    Wait ??? milliseconds`,
                  solution: `
Run Forever
    Digital Write Pin P0 to 0
    Wait 1000 milliseconds
    Digital Write Pin P0 to 180
    Wait 1000 milliseconds`,
                  hints: [
                    "Remember that servo angles range from 0 to 180 degrees",
                    "1000 milliseconds equals 1 second",
                    "Don't forget to add pauses between movements to see the servo move"
                  ]
                }
              }
            ]
          },
          {
            title: "Motor Control System",
            content: "Four pins (P12-P15) work in pairs to control the robot's movement:",
            details: [
              {
                subtitle: "Basic Movement",
                explanation: "Control both motors using digital write pins to make the robot move in different patterns:",
                codingChallenge: {
                  question: "Create a square movement pattern. Complete the missing values to make the robot move forward and turn right:",
                  initialCode: `
Function Move Forward
    Digital Write Pin P??? to 1
    Digital Write Pin P??? to 1
    Wait 2000 milliseconds

Function Turn Right
    Digital Write Pin P??? to 1
    Digital Write Pin P??? to 0
    Wait ??? milliseconds

Run Forever
    Repeat 4 times
        Move Forward
        Turn Right`,
                  solution: `
Function Move Forward
    Digital Write Pin P12 to 1
    Digital Write Pin P14 to 1
    Wait 2000 milliseconds

Function Turn Right
    Digital Write Pin P12 to 1
    Digital Write Pin P14 to 0
    Wait 1000 milliseconds

Run Forever
    Repeat 4 times
        Move Forward
        Turn Right`,
                  hints: [
                    "Use pins P12 and P14 for forward movement",
                    "The robot needs to make 4 movements to create a square",
                    "After each forward movement, turn right 90 degrees",
                    "1000 milliseconds gives enough time for a 90-degree turn"
                  ]
                }
              }
            ]
          }
        ],
        summary: "Understanding these pin controls is essential for programming your Inspire Bot. These basic movements can be combined to create complex patterns and behaviors.",
        practiceExercise: "Try creating different movement patterns by combining pin controls. Can you make the robot move in a triangle pattern?"
      },
      {
        id: 2,
        title: "Advanced Pin Controls",
        duration: "20 min",
        description: "Dive deeper into pin control and learn about sensor integration.",
        introduction: "Now that you understand the basics of pin control, let's explore more advanced concepts and how to integrate sensors with our robot.",
        sections: [
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
        Left Motor ???
        Right Motor ???
        Wait ??? milliseconds
    Else
        Left Motor Forward
        Right Motor Forward`,
                  solution: `
Run Forever
    If Distance < 20
        Left Motor Reverse
        Right Motor Forward
        Wait 1000 milliseconds
    Else
        Left Motor Forward
        Right Motor Forward`,
                  hints: [
                    "20cm is a good distance for obstacle detection",
                    "To turn away from an obstacle, one motor should go forward while the other reverses",
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
        description: "Master the fundamentals of robot movement using motor controls.",
        introduction: "In this lesson, we'll learn how to create precise movement patterns using motor control commands.",
        sections: [
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
    Left Motor ???
    Right Motor Forward
    Wait ??? milliseconds
    Left Motor Forward
    Right Motor ???
    Wait ??? milliseconds`,
                  solution: `
Run Forever
    Left Motor Stop
    Right Motor Forward
    Wait 1000 milliseconds
    Left Motor Forward
    Right Motor Stop
    Wait 1000 milliseconds`,
                  hints: [
                    "To create a zigzag, alternate between turning left and right",
                    "1000 milliseconds gives a good turning angle",
                    "When one motor stops while the other moves, the robot turns"
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
                subtitle: "Speed Adjustment",
                explanation: "Control the speed of each motor independently for precise movements.",
                codingChallenge: {
                  question: "Create a smooth turning pattern. Set the appropriate speed values:",
                  initialCode: `
Run Forever
    Set Left Motor Speed ???
    Set Right Motor Speed ???
    Wait ??? milliseconds
    Set Left Motor Speed ???
    Set Right Motor Speed ???
    Wait ??? milliseconds`,
                  solution: `
Run Forever
    Set Left Motor Speed 100
    Set Right Motor Speed 50
    Wait 2000 milliseconds
    Set Left Motor Speed 50
    Set Right Motor Speed 100
    Wait 2000 milliseconds`,
                  hints: [
                    "Speed values range from 0 to 100",
                    "Different speeds on each motor create turning motion",
                    "Longer wait times create wider turns"
                  ]
                }
              }
            ]
          }
        ],
        summary: "You now understand how to control motor speeds for precise movement control.",
        practiceExercise: "Experiment with different speed combinations to create a smooth circular pattern."
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
            line.includes('Function') || line.includes('Run Forever') || line.includes('Repeat') ? 'control' :
            line.includes('Motor') ? 'movement' : 'servo',
      hasInput: line.includes('???')
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

    const solution = detail.codingChallenge.solution.replace(/\s/g, '');
    const submission = code.replace(/\s/g, '');
    
    if (submission === solution) {
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
            onClick={() => navigate(`/course/${courseId}`)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Course
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
