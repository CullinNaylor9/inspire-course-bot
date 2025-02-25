import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

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
                  question: "Fix the code below to make the servo move from 0° to 180° and back:",
                  initialCode: `
// Broken servo control code
pins.servoWritePin(AnalogPin.P0, ???)
basic.pause(1000)
pins.servoWritePin(AnalogPin.P0, ???)
basic.pause(1000)
`,
                  solution: `
pins.servoWritePin(AnalogPin.P0, 0)
basic.pause(1000)
pins.servoWritePin(AnalogPin.P0, 180)
basic.pause(1000)
`
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
                  question: "Complete the code to make the robot turn right:",
                  initialCode: `
// Left motor forward, right motor stop
pins.digitalWritePin(DigitalPin.P12, 0)
pins.digitalWritePin(DigitalPin.P13, 1)
// Complete right motor control
pins.digitalWritePin(DigitalPin.P14, ???)
pins.digitalWritePin(DigitalPin.P15, ???)
`,
                  solution: `
pins.digitalWritePin(DigitalPin.P12, 0)
pins.digitalWritePin(DigitalPin.P13, 1)
pins.digitalWritePin(DigitalPin.P14, 0)
pins.digitalWritePin(DigitalPin.P15, 0)
`
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

const CodeEditor = ({ challenge, onSubmit }: { 
  challenge: { 
    question: string; 
    initialCode: string; 
    solution: string; 
  }; 
  onSubmit: (code: string) => void; 
}) => {
  const [code, setCode] = useState(challenge.initialCode);

  return (
    <div className="space-y-4">
      <p className="text-lg font-medium">{challenge.question}</p>
      <Textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="font-mono min-h-[200px] bg-black/90 text-white p-4"
        placeholder="Write your code here..."
      />
      <Button onClick={() => onSubmit(code)}>
        Submit Solution
      </Button>
    </div>
  );
};

const Lesson = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const [showSolution, setShowSolution] = useState<Record<string, boolean>>({});

  const course = courses.find(c => c.id === Number(courseId));
  const lesson = course?.lessons.find(l => l.id === Number(lessonId));

  const handleCodeSubmit = (code: string, sectionIndex: number, detailIndex: number) => {
    setShowSolution({ ...showSolution, [`${sectionIndex}-${detailIndex}`]: true });
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
