
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
                  "P13: Left Motor Enable Control (0=Stop, 1=Run)",
                  "P14: Right Motor Direction Control (0=Backward, 1=Forward)", 
                  "P15: Right Motor Enable Control (0=Stop, 1=Run)",
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
        title: "Advanced Movement Patterns",
        duration: "30 min",
        description: "Learn to control robot movement and create complex patterns.",
        introduction: "In this lesson, we'll explore how to create advanced movement patterns with your robot by precisely controlling the motors.",
        sections: [
          {
            title: "Complex Movement Patterns",
            content: "Learn to create more sophisticated movement patterns with your robot:",
            details: [
              {
                subtitle: "Pattern Fundamentals",
                explanation: "Creating complex patterns requires understanding how to sequence basic movements:",
                listItems: [
                  "Sequential commands: Execute one movement after another",
                  "Loops: Repeat movement patterns multiple times",
                  "Timed movements: Control duration of each movement",
                  "Direction changes: Smoothly transition between movements"
                ]
              },
              {
                subtitle: "Figure-Eight Pattern",
                explanation: "A figure-eight combines alternating left and right turns in a continuous pattern.",
                codingChallenge: {
                  question: "Create a figure-eight pattern. Fill in the missing values:",
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
    Wait 2000 milliseconds
    Digital Write Pin P12 to 1
    Digital Write Pin P14 to 0
    Wait 2000 milliseconds`,
                  hints: [
                    "For a figure-eight, alternate between left and right turns",
                    "Longer wait times create wider turns",
                    "Both motors need to be enabled (P13=1, P15=1)"
                  ]
                }
              }
            ]
          },
          {
            title: "Precision Movement",
            content: "Learn techniques for precise robot movement control:",
            details: [
              {
                subtitle: "Timing Control",
                explanation: "Precise timing allows for more accurate movements and patterns:",
                listItems: [
                  "Short waits (500ms) for tight turns",
                  "Medium waits (1000-1500ms) for standard turns",
                  "Long waits (2000ms+) for wide, sweeping turns",
                  "Consistent timing for repeatable patterns"
                ]
              },
              {
                subtitle: "Pattern Programming",
                explanation: "Combine multiple movement commands to create a dance pattern.",
                codingChallenge: {
                  question: "Create a simple dance pattern for your robot:",
                  initialCode: `
Run Forever
    Digital Write Pin P??? to ???
    Digital Write Pin P??? to ???
    Wait ??? milliseconds
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
    Wait 1000 milliseconds
    Digital Write Pin P12 to 0
    Digital Write Pin P14 to 0
    Wait 1000 milliseconds
    Digital Write Pin P12 to 1
    Digital Write Pin P14 to 0
    Wait 2000 milliseconds`,
                  hints: [
                    "Include forward, backward, and turning movements",
                    "Vary the wait times for different effects",
                    "A good dance combines different movements in a pattern"
                  ]
                }
              }
            ]
          }
        ],
        summary: "You've learned advanced techniques for creating complex movement patterns with your robot. These skills will allow you to program sophisticated behaviors and routines.",
        practiceExercise: "Try creating your own unique robot dance routine by combining different movements with varying wait times."
      }
    ]
  },
  {
    id: 3,
    title: "Servo and Sensor Integration",
    lessons: [
      {
        id: 1,
        title: "Servo Control Basics",
        duration: "20 min",
        description: "Learn how to control servo motors for precise positioning.",
        introduction: "Servo motors are essential components in robotics that allow for precise angular positioning. In this lesson, you'll learn how to control servos to create articulated movements for your robot.",
        sections: [
          {
            title: "Servo Fundamentals",
            content: "Understanding how servo motors work and how to control them:",
            details: [
              {
                subtitle: "Servo Pins",
                explanation: "Your Inspire Bot has two pins dedicated to servo control:",
                listItems: [
                  "P0: Built-in Servo Motor (0-180 degrees)",
                  "P1: External Servo Connection (0-180 degrees)",
                  "Both servos require digital signal input",
                  "The value sent determines the angle (0-180)"
                ]
              },
              {
                subtitle: "Basic Servo Control",
                explanation: "Controlling a servo is as simple as writing a value between 0 and 180 to the appropriate pin.",
                codingChallenge: {
                  question: "Program the main servo to move to specific positions. Fill in the missing values:",
                  initialCode: `
Run Forever
    Digital Write Pin P??? to ???
    Wait 1000 milliseconds
    Digital Write Pin P??? to ???
    Wait 1000 milliseconds
    Digital Write Pin P??? to ???
    Wait 1000 milliseconds`,
                  solution: `
Run Forever
    Digital Write Pin P0 to 0
    Wait 1000 milliseconds
    Digital Write Pin P0 to 90
    Wait 1000 milliseconds
    Digital Write Pin P0 to 180
    Wait 1000 milliseconds`,
                  hints: [
                    "The main servo is connected to pin P0",
                    "Use 0 for minimum position (far left)",
                    "Use 90 for center position",
                    "Use 180 for maximum position (far right)"
                  ]
                }
              }
            ]
          },
          {
            title: "Smooth Servo Movement",
            content: "Create fluid, natural-looking servo movements:",
            details: [
              {
                subtitle: "Incremental Movement",
                explanation: "Moving servos in small increments creates smoother motion:",
                listItems: [
                  "Small changes (5-15 degrees) appear more natural",
                  "Add small waits between movements (100-200ms)",
                  "Consistent timing helps maintain smooth operation",
                  "Sequence of small movements provides better control"
                ]
              },
              {
                subtitle: "Sweep Pattern",
                explanation: "Create a smooth scanning movement with the servo.",
                codingChallenge: {
                  question: "Program a smooth sweep pattern for the servo:",
                  initialCode: `
Run Forever
    For angle from ??? to ??? in steps of ???
        Digital Write Pin P??? to angle
        Wait ??? milliseconds
    For angle from ??? to ??? in steps of ???
        Digital Write Pin P??? to angle
        Wait ??? milliseconds`,
                  solution: `
Run Forever
    For angle from 0 to 180 in steps of 10
        Digital Write Pin P0 to angle
        Wait 100 milliseconds
    For angle from 180 to 0 in steps of 10
        Digital Write Pin P0 to angle
        Wait 100 milliseconds`,
                  hints: [
                    "Start at 0 degrees and go to 180 degrees",
                    "Use small steps (5-15 degrees) for smooth movement",
                    "Use short waits (50-150ms) between steps",
                    "Remember to sweep back to the starting position"
                  ]
                }
              }
            ]
          }
        ],
        summary: "You've learned how to control servo motors on your Inspire Bot, from basic positioning to smooth sweeping motions. These skills will allow you to create articulated robot arms, sensor platforms, and other mechanisms requiring precise angular control.",
        practiceExercise: "Try creating a 'nodding' motion with the servo by oscillating between 45 and 135 degrees. Can you make it look natural by using small incremental steps?"
      },
      {
        id: 2,
        title: "Ultrasonic Sensing",
        duration: "25 min",
        description: "Master ultrasonic sensor integration for distance detection.",
        introduction: "Ultrasonic sensors allow your robot to 'see' by detecting objects and measuring distances. In this lesson, you'll learn how to use the ultrasonic sensor to create smart, responsive behaviors.",
        sections: [
          {
            title: "Ultrasonic Sensor Basics",
            content: "Understanding how ultrasonic sensors work and how to read data from them:",
            details: [
              {
                subtitle: "Sensor Pins and Function",
                explanation: "Your robot's ultrasonic sensor uses two pins:",
                listItems: [
                  "P2: Trigger Pin (sends out sound pulse)",
                  "P8: Echo Pin (receives return pulse)",
                  "The sensor measures distance by timing sound reflections",
                  "Range: 2cm to 400cm with 0.3cm resolution"
                ]
              },
              {
                subtitle: "Reading Distance Values",
                explanation: "The Inspire Bot's programming system automatically calculates distance from the ultrasonic sensor and makes it available through the 'Distance' variable.",
                codingChallenge: {
                  question: "Create a basic distance detection program with LED feedback:",
                  initialCode: `
Run Forever
    If Distance < ???
        Digital Write Pin P??? to ???
    Else
        Digital Write Pin P??? to ???
    Wait 100 milliseconds`,
                  solution: `
Run Forever
    If Distance < 20
        Digital Write Pin P16 to 1
    Else
        Digital Write Pin P16 to 0
    Wait 100 milliseconds`,
                  hints: [
                    "20cm is a good threshold for close object detection",
                    "The LED is connected to pin P16",
                    "Turn on the LED when an object is detected nearby",
                    "Regular checking (every 100ms) provides responsive detection"
                  ]
                }
              }
            ]
          },
          {
            title: "Obstacle Avoidance",
            content: "Create a simple obstacle avoidance system:",
            details: [
              {
                subtitle: "Detection and Response",
                explanation: "Combining distance sensing with motor control creates automated obstacle avoidance:",
                listItems: [
                  "Continuously check distance while moving",
                  "Define a 'safe' threshold distance (typically 20-30cm)",
                  "Implement evasive action when threshold is crossed",
                  "Return to normal operation when path is clear"
                ]
              },
              {
                subtitle: "Basic Avoidance Algorithm",
                explanation: "Program your robot to avoid obstacles by turning away when detected.",
                codingChallenge: {
                  question: "Create a complete obstacle avoidance program:",
                  initialCode: `
Run Forever
    Digital Write Pin P13 to ???
    Digital Write Pin P15 to ???
    If Distance < ???
        Digital Write Pin P??? to ???
        Digital Write Pin P??? to ???
        Wait ??? milliseconds
    Else
        Digital Write Pin P??? to ???
        Digital Write Pin P??? to ???
    Wait 100 milliseconds`,
                  solution: `
Run Forever
    Digital Write Pin P13 to 1
    Digital Write Pin P15 to 1
    If Distance < 25
        Digital Write Pin P12 to 0
        Digital Write Pin P14 to 1
        Wait 1000 milliseconds
    Else
        Digital Write Pin P12 to 1
        Digital Write Pin P14 to 1
    Wait 100 milliseconds`,
                  hints: [
                    "Enable both motors (P13=1, P15=1)",
                    "Check if distance is less than 25cm",
                    "Turn left when obstacle detected (P12=0, P14=1)",
                    "Move forward when no obstacle (P12=1, P14=1)",
                    "Wait about 1 second during turns to clear the obstacle"
                  ]
                }
              }
            ]
          }
        ],
        summary: "You've learned how to integrate the ultrasonic sensor with your robot's movement system to create intelligent obstacle avoidance. This fundamental skill allows your robot to navigate environments autonomously.",
        practiceExercise: "Modify the obstacle avoidance program to include a warning signal with the LED (P16) that blinks rapidly when an obstacle is detected before the robot changes direction."
      }
    ]
  },
  {
    id: 4,
    title: "Line Following and LED Control",
    lessons: [
      {
        id: 1,
        title: "Line Following Fundamentals",
        duration: "30 min",
        description: "Learn to use the line following sensor for automated path navigation.",
        introduction: "Line following is one of the most common and useful robot behaviors. In this lesson, you'll learn how to use the line following sensor to make your robot automatically follow paths marked on the ground.",
        sections: [
          {
            title: "Line Sensor Basics",
            content: "Understanding how line following sensors work:",
            details: [
              {
                subtitle: "Sensor Principles",
                explanation: "The line following sensor on your Inspire Bot works by detecting contrast differences:",
                listItems: [
                  "Uses infrared reflection to detect dark vs. light surfaces",
                  "Connected to pin P3 on your robot",
                  "Returns 1 when over light surface (no line)",
                  "Returns 0 when over dark surface (line)",
                  "Best used with high-contrast lines (black on white)"
                ]
              },
              {
                subtitle: "Basic Line Reading",
                explanation: "Learn to read and respond to the line sensor data.",
                codingChallenge: {
                  question: "Create a program that turns on the LED when a line is detected:",
                  initialCode: `
Run Forever
    Digital Read Pin P??? to lineDetected
    If lineDetected == ???
        Digital Write Pin P16 to ???
    Else
        Digital Write Pin P16 to ???
    Wait 100 milliseconds`,
                  solution: `
Run Forever
    Digital Read Pin P3 to lineDetected
    If lineDetected == 0
        Digital Write Pin P16 to 1
    Else
        Digital Write Pin P16 to 0
    Wait 100 milliseconds`,
                  hints: [
                    "The line sensor is connected to pin P3",
                    "The sensor returns 0 when it detects a dark line",
                    "Turn on the LED (P16=1) when a line is detected",
                    "Turn off the LED (P16=0) when no line is detected"
                  ]
                }
              }
            ]
          },
          {
            title: "Simple Line Following",
            content: "Create a basic line following algorithm:",
            details: [
              {
                subtitle: "Following Algorithm",
                explanation: "The most basic line following approach uses a simple 'if-then-else' strategy:",
                listItems: [
                  "Check if the sensor detects a line",
                  "If no line is detected, turn in one direction until a line is found",
                  "If a line is detected, turn in the opposite direction",
                  "This creates a zig-zag motion that follows the line"
                ]
              },
              {
                subtitle: "Basic Line Follower",
                explanation: "Program the robot to follow a line using the line sensor.",
                codingChallenge: {
                  question: "Create a simple line following program:",
                  initialCode: `
Run Forever
    Digital Write Pin P13 to ???
    Digital Write Pin P15 to ???
    Digital Read Pin P??? to lineDetected
    If lineDetected == ???
        Digital Write Pin P??? to ???
        Digital Write Pin P??? to ???
    Else
        Digital Write Pin P??? to ???
        Digital Write Pin P??? to ???
    Wait 50 milliseconds`,
                  solution: `
Run Forever
    Digital Write Pin P13 to 1
    Digital Write Pin P15 to 1
    Digital Read Pin P3 to lineDetected
    If lineDetected == 0
        Digital Write Pin P12 to 0
        Digital Write Pin P14 to 1
    Else
        Digital Write Pin P12 to 1
        Digital Write Pin P14 to 0
    Wait 50 milliseconds`,
                  hints: [
                    "Enable both motors (P13=1, P15=1)",
                    "Read the line sensor on P3",
                    "When on the line (lineDetected=0), turn left",
                    "When off the line (lineDetected=1), turn right",
                    "Quick response time (50ms) for smoother following"
                  ]
                }
              }
            ]
          }
        ],
        summary: "You've learned the fundamentals of line following with your Inspire Bot, including how the line sensor works and how to implement a basic following algorithm. This skill allows your robot to autonomously navigate predefined paths.",
        practiceExercise: "Try modifying the line following program to move more smoothly by adjusting the wait time. Experiment with longer waits for smoother, wider turns, and shorter waits for more responsive tracking."
      },
      {
        id: 2,
        title: "Advanced LED Control",
        duration: "15 min",
        description: "Create complex LED patterns for visual feedback.",
        introduction: "The LED indicator