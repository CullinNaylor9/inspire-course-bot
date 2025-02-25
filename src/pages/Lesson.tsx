import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import BlockEditor from '@/components/BlockEditor';

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
      type: line.includes('pins.') ? 'pins' : 
            line.includes('function') ? 'function' :
            line.includes('for') || line.includes('if') ? 'control' : 'basic'
    }));

    const initialBlocks = blocks.filter(b => !b.content.includes('???'));
    const availableBlocks = [
      ...blocks.filter(b => b.content.includes('???')),
      {
        id: 'block-pause-1000',
        content: 'basic.pause(1000)',
        type: 'basic'
      },
      {
        id: 'block-pause-2000',
        content: 'basic.pause(2000)',
        type: 'basic'
      }
    ];

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
                ],
                makeCodeExample: `
// Control built-in servo on P0
pins.servoWritePin(AnalogPin.P0, 90)
// Wait 1 second
basic.pause(1000)
// Move servo to different position
pins.servoWritePin(AnalogPin.P0, 180)
`,
                codingChallenge: {
                  question: "Fix the code below to make the servo move from 0° to 180° and back in a continuous loop:",
                  initialCode: `
// Complete the basic.forever function
basic.forever(function () {
    // Move servo to 0 degrees
    pins.servoWritePin(AnalogPin.P0, ???)
    // Wait for 1 second
    basic.pause(???)
    // Move servo to 180 degrees
    pins.servoWritePin(AnalogPin.P0, ???)
    // Add another pause here
})`,
                  solution: `
basic.forever(function () {
    pins.servoWritePin(AnalogPin.P0, 0)
    basic.pause(1000)
    pins.servoWritePin(AnalogPin.P0, 180)
    basic.pause(1000)
})`,
                  hints: [
                    "Remember that servo angles range from 0 to 180 degrees",
                    "The pause function takes milliseconds as input (1000ms = 1 second)",
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
                explanation: "Control both motors for forward movement:",
                makeCodeExample: `
// Move forward
pins.digitalWritePin(DigitalPin.P12, 0)
pins.digitalWritePin(DigitalPin.P13, 1)
pins.digitalWritePin(DigitalPin.P14, 1)
pins.digitalWritePin(DigitalPin.P15, 0)
`,
                codingChallenge: {
                  question: "Create a function that makes the robot move in a square pattern. Complete the missing pin values:",
                  initialCode: `
// Function to move forward for 2 seconds
function moveForward() {
    pins.digitalWritePin(DigitalPin.P12, ???)
    pins.digitalWritePin(DigitalPin.P13, ???)
    pins.digitalWritePin(DigitalPin.P14, ???)
    pins.digitalWritePin(DigitalPin.P15, ???)
    basic.pause(2000)
}

// Function to turn right for 1 second
function turnRight() {
    pins.digitalWritePin(DigitalPin.P12, ???)
    pins.digitalWritePin(DigitalPin.P13, ???)
    pins.digitalWritePin(DigitalPin.P14, ???)
    pins.digitalWritePin(DigitalPin.P15, ???)
    basic.pause(1000)
}

// Create square pattern
basic.forever(function () {
    // Add your code here to create a square pattern
    // Hint: Use moveForward() and turnRight() functions
})`,
                  solution: `
function moveForward() {
    pins.digitalWritePin(DigitalPin.P12, 0)
    pins.digitalWritePin(DigitalPin.P13, 1)
    pins.digitalWritePin(DigitalPin.P14, 1)
    pins.digitalWritePin(DigitalPin.P15, 0)
    basic.pause(2000)
}

function turnRight() {
    pins.digitalWritePin(DigitalPin.P12, 0)
    pins.digitalWritePin(DigitalPin.P13, 1)
    pins.digitalWritePin(DigitalPin.P14, 0)
    pins.digitalWritePin(DigitalPin.P15, 0)
    basic.pause(1000)
}

basic.forever(function () {
    for (let i = 0; i < 4; i++) {
        moveForward()
        turnRight()
    }
})`,
                  hints: [
                    "For forward movement, both motors should rotate forward",
                    "For right turns, only the left motor should rotate",
                    "Remember: P12/P13 control the left motor, P14/P15 control the right motor",
                    "The square pattern requires 4 repetitions of forward movement and right turns"
                  ]
                }
              }
            ]
          }
        ],
        summary: "Understanding these pin configurations is essential for programming your Inspire Bot. Each pin serves a specific purpose and, when used correctly, allows you to create complex behaviors and interactions.",
        practiceExercise: "Try connecting an LED to P16 and create a simple blinking pattern. This will help you understand digital output control."
      }
    ]
  }
];

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

                    {detail.makeCodeExample && (
                      <div className="bg-black/90 text-white p-4 rounded-md mb-4 font-mono whitespace-pre">
                        {detail.makeCodeExample}
                      </div>
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
