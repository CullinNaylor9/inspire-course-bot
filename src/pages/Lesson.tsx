
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
  },
  {
    id: 3,
    title: "Servo and Sensor Integration",
    lessons: [
      {
        id: 1,
        title: "Servo Motor Programming",
        duration: "25 min",
        description: "Learn to control servo positioning with precision for robotic arm movements.",
        introduction: "In this lesson, we'll explore how to program servo motors on the Inspire Bot. Servo motors allow for precise angle control, making them perfect for robot arms, sensors, and other components that need exact positioning.",
        sections: [
          {
            title: "Servo Control Basics",
            content: "Understanding how servo motors work and how to control them:",
            details: [
              {
                subtitle: "Servo Angles",
                explanation: "Servos can be positioned at specific angles between 0° and 180°. This allows for precise control of mechanical components like arms, grippers, or sensor platforms.",
                listItems: [
                  "0° - Fully counterclockwise position",
                  "90° - Center position",
                  "180° - Fully clockwise position",
                  "Any angle in between can be specified for precise positioning"
                ]
              },
              {
                subtitle: "Main Servo Control (P0)",
                explanation: "The Inspire Bot has a built-in servo on pin P0 that can be used for a variety of applications. This servo is perfect for creating a robotic arm, a rotating sensor platform, or even a head that can look around.",
                codingChallenge: {
                  question: "Program the main servo to scan back and forth like a radar. Fill in the missing values:",
                  initialCode: `
Run Forever
    Digital Write Pin P??? to ???
    Wait 500 milliseconds
    Digital Write Pin P??? to ???
    Wait 500 milliseconds
    Digital Write Pin P??? to ???
    Wait 500 milliseconds`,
                  solution: `
Run Forever
    Digital Write Pin P0 to 0
    Wait 500 milliseconds
    Digital Write Pin P0 to 90
    Wait 500 milliseconds
    Digital Write Pin P0 to 180
    Wait 500 milliseconds`,
                  hints: [
                    "The main servo is connected to pin P0",
                    "Use angles 0, 90, and 180 for full range of motion",
                    "500 milliseconds gives smooth movement between positions",
                    "The servo will move from left to right and back again"
                  ]
                }
              },
              {
                subtitle: "Secondary Servo Control (P1)",
                explanation: "Pin P1 allows you to connect a second servo to your robot. This is useful for creating more complex mechanisms like grippers, multi-joint arms, or specialized tools. Together with the main servo, you can create sophisticated mechanisms with multiple degrees of freedom.",
                codingChallenge: {
                  question: "Create a gripper program using both servos. Fill in the missing values:",
                  initialCode: `
Run Forever
    Digital Write Pin P??? to ???
    Digital Write Pin P??? to ???
    Wait 2000 milliseconds
    Digital Write Pin P??? to ???
    Digital Write Pin P??? to ???
    Wait 2000 milliseconds`,
                  solution: `
Run Forever
    Digital Write Pin P0 to 90
    Digital Write Pin P1 to 0
    Wait 2000 milliseconds
    Digital Write Pin P0 to 45
    Digital Write Pin P1 to 90
    Wait 2000 milliseconds`,
                  hints: [
                    "Use P0 for the arm positioning servo",
                    "Use P1 for the gripper servo",
                    "Experiment with different angles to achieve the desired motion",
                    "Longer wait times give the servo time to complete its movement"
                  ]
                }
              }
            ]
          },
          {
            title: "Servo Movement Patterns",
            content: "Creating smooth and coordinated servo movements:",
            details: [
              {
                subtitle: "Sweep Movements",
                explanation: "A sweep movement smoothly transitions the servo from one position to another. This is useful for scanning operations or creating natural-looking movements.",
                codingChallenge: {
                  question: "Create a smooth sweep movement from 0° to 180°. Fill in the missing values:",
                  initialCode: `
Run Once
    Digital Write Pin P??? to ???
    Wait 200 milliseconds
    Digital Write Pin P??? to ???
    Wait 200 milliseconds
    Digital Write Pin P??? to ???
    Wait 200 milliseconds
    Digital Write Pin P??? to ???
    Wait 200 milliseconds`,
                  solution: `
Run Once
    Digital Write Pin P0 to 0
    Wait 200 milliseconds
    Digital Write Pin P0 to 60
    Wait 200 milliseconds
    Digital Write Pin P0 to 120
    Wait 200 milliseconds
    Digital Write Pin P0 to 180
    Wait 200 milliseconds`,
                  hints: [
                    "Start at 0° and gradually increase the angle",
                    "Use increments of about 60° for smooth motion",
                    "Shorter wait times create faster movement",
                    "Make sure to wait between position changes to allow servo movement"
                  ]
                }
              },
              {
                subtitle: "Coordinating Multiple Servos",
                explanation: "When using both servos together, timing is crucial for coordinated movements. By carefully sequencing servo positions, you can create complex and useful mechanisms for your robot."
              }
            ]
          }
        ],
        summary: "In this lesson, you've learned how to control servo motors for precise positioning. You now understand how to create specific servo angles, program sweep movements, and coordinate multiple servos for complex mechanisms. These skills are essential for building robotic arms, grippers, and other mechanical systems for your Inspire Bot.",
        practiceExercise: "Try creating a program that uses both servos to simulate a robotic arm picking up an object. The arm should lower, close the gripper, raise, turn, lower again, and release the object. Think about the sequence of servo positions and timing needed to create this behavior."
      },
      {
        id: 2,
        title: "Ultrasonic Distance Sensing",
        duration: "35 min",
        description: "Implement distance detection using the ultrasonic sensor for obstacle avoidance and object detection.",
        introduction: "In this lesson, we'll learn how to use the ultrasonic sensor to detect objects and measure distances. The ultrasonic sensor is a critical component for creating robots that can navigate autonomously and interact with their environment.",
        sections: [
          {
            title: "Ultrasonic Sensor Fundamentals",
            content: "Understanding how the ultrasonic sensor works and how to interpret its readings:",
            details: [
              {
                subtitle: "How Ultrasonic Sensors Work",
                explanation: "The ultrasonic sensor uses sound waves to measure distance. It sends out a sound pulse that humans can't hear and then listens for the echo. By measuring the time it takes for the echo to return, the sensor can calculate the distance to an object.",
                listItems: [
                  "P2: Trigger pin - Sends out the ultrasonic pulse",
                  "P8: Echo pin - Receives the returning echo",
                  "Sound travels at approximately 343 meters per second",
                  "Distance = (Time × Speed of Sound) ÷ 2"
                ]
              },
              {
                subtitle: "Reading Distance Values",
                explanation: "The Inspire Bot's programming environment provides a simplified way to read distance values from the ultrasonic sensor. The 'Distance' variable automatically calculates the distance in centimeters based on the echo time.",
                codingChallenge: {
                  question: "Create a program that displays different behaviors based on distance. Fill in the missing values:",
                  initialCode: `
Run Forever
    If Distance < ???
        Digital Write Pin P??? to ???
    Else If Distance < ???
        Digital Write Pin P??? to ???
    Else
        Digital Write Pin P??? to ???`,
                  solution: `
Run Forever
    If Distance < 10
        Digital Write Pin P16 to 1
    Else If Distance < 30
        Digital Write Pin P16 to 0
    Else
        Digital Write Pin P16 to 0`,
                  hints: [
                    "Use different distance thresholds (10cm for very close, 30cm for medium distance)",
                    "P16 controls the onboard LED (1=On, 0=Off)",
                    "The LED should be on when objects are very close",
                    "This creates a proximity warning system"
                  ]
                }
              }
            ]
          },
          {
            title: "Obstacle Avoidance",
            content: "Using the ultrasonic sensor to detect and avoid obstacles:",
            details: [
              {
                subtitle: "Basic Obstacle Detection",
                explanation: "By continuously monitoring the distance to objects in front of the robot, we can program it to stop or change direction when it detects an obstacle.",
                codingChallenge: {
                  question: "Create a simple obstacle avoidance program. Fill in the missing values:",
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
    If Distance < 15
        Digital Write Pin P12 to 0
        Digital Write Pin P14 to 1
        Wait 1000 milliseconds
    Else
        Digital Write Pin P12 to 1
        Digital Write Pin P14 to 1`,
                  hints: [
                    "15cm is a good threshold for obstacle detection",
                    "When an obstacle is detected, make the robot turn left by setting P12=0 and P14=1",
                    "1000 milliseconds gives enough time to turn away from the obstacle",
                    "If no obstacle is detected, the robot should move forward (P12=1, P14=1)"
                  ]
                }
              },
              {
                subtitle: "Advanced Navigation",
                explanation: "By combining the ultrasonic sensor with servo motors, we can create a more sophisticated navigation system. Mounting the ultrasonic sensor on a servo allows the robot to scan its environment and find the best path forward.",
                codingChallenge: {
                  question: "Create a scanning obstacle avoidance program using the servo and ultrasonic sensor. Fill in the missing values:",
                  initialCode: `
Run Forever
    Digital Write Pin P??? to ???
    Wait 500 milliseconds
    If Distance < ???
        Digital Write Pin P??? to ???
        Digital Write Pin P??? to ???
    Else
        Digital Write Pin P??? to ???
        Digital Write Pin P??? to ???`,
                  solution: `
Run Forever
    Digital Write Pin P0 to 90
    Wait 500 milliseconds
    If Distance < 20
        Digital Write Pin P12 to 0
        Digital Write Pin P14 to 1
    Else
        Digital Write Pin P12 to 1
        Digital Write Pin P14 to 1`,
                  hints: [
                    "Use the servo on P0 to position the ultrasonic sensor forward (90°)",
                    "20cm is a good threshold for obstacle detection while moving",
                    "When an obstacle is detected, turn left (P12=0, P14=1)",
                    "If the path is clear, move forward (P12=1, P14=1)"
                  ]
                }
              }
            ]
          }
        ],
        summary: "In this lesson, you've learned how to use the ultrasonic sensor to measure distances and detect obstacles. You've created programs that can respond to the presence of objects, enabling your robot to navigate around obstacles and interact with its environment. This is a fundamental capability for autonomous robots.",
        practiceExercise: "Try expanding the scanning obstacle avoidance program to check for obstacles in multiple directions. Use the servo to scan left, center, and right, and have the robot choose the direction with the greatest distance. This will allow your robot to find the best path forward when faced with multiple obstacles."
      },
      {
        id: 3,
        title: "Integrated Robotics Projects",
        duration: "45 min",
        description: "Combine servo motors and sensors to create advanced robotic systems with intelligent behaviors.",
        introduction: "In this final lesson of the course, we'll bring together everything we've learned about servo motors and sensors to create complete robotic systems. By integrating these components, we can create robots that can sense their environment and respond with precise, purposeful movements.",
        sections: [
          {
            title: "Sensor-Driven Servo Control",
            content: "Using sensor data to drive servo positioning:",
            details: [
              {
                subtitle: "Following Movement",
                explanation: "We can create a robot that tracks movement by mounting an ultrasonic sensor on a servo motor. When the sensor detects an object, the servo can turn to follow it, creating a tracking behavior.",
                codingChallenge: {
                  question: "Create a simple object tracking system. Fill in the missing values:",
                  initialCode: `
Run Forever
    Digital Write Pin P??? to ???
    Wait 200 milliseconds
    If Distance < ???
        Digital Write Pin P??? to ???
        Wait 1000 milliseconds
    Else
        Digital Write Pin P??? to ???
        Wait 1000 milliseconds`,
                  solution: `
Run Forever
    Digital Write Pin P0 to 90
    Wait 200 milliseconds
    If Distance < 30
        Digital Write Pin P0 to 45
        Wait 1000 milliseconds
    Else
        Digital Write Pin P0 to 135
        Wait 1000 milliseconds`,
                  hints: [
                    "Start with the servo pointing straight ahead (90°)",
                    "If an object is detected within 30cm, turn the servo left (45°)",
                    "If no object is detected, turn the servo right (135°)",
                    "This creates a simple scanning behavior that looks for objects"
                  ]
                }
              },
              {
                subtitle: "Smart Robotic Arm",
                explanation: "By combining the ultrasonic sensor with two servo motors, we can create a smart robotic arm that can detect objects and position itself to interact with them. This is the foundation of pick-and-place operations in robotics.",
                codingChallenge: {
                  question: "Program a smart robotic arm that positions itself based on object distance. Fill in the missing values:",
                  initialCode: `
Run Forever
    If Distance < ???
        Digital Write Pin P??? to ???
        Digital Write Pin P??? to ???
    Else If Distance < ???
        Digital Write Pin P??? to ???
        Digital Write Pin P??? to ???
    Else
        Digital Write Pin P??? to ???
        Digital Write Pin P??? to ???`,
                  solution: `
Run Forever
    If Distance < 10
        Digital Write Pin P0 to 30
        Digital Write Pin P1 to 0
    Else If Distance < 20
        Digital Write Pin P0 to 90
        Digital Write Pin P1 to 45
    Else
        Digital Write Pin P0 to 150
        Digital Write Pin P1 to 90`,
                  hints: [
                    "Use different arm positions for different object distances",
                    "For very close objects (< 10cm), position the arm low with gripper open",
                    "For medium distance objects (10-20cm), position the arm horizontal with gripper partially closed",
                    "For distant objects (> 20cm), position the arm high with gripper fully closed"
                  ]
                }
              }
            ]
          },
          {
            title: "Complete Robot Behaviors",
            content: "Creating fully integrated robot behaviors that combine sensing and movement:",
            details: [
              {
                subtitle: "Autonomous Navigation and Interaction",
                explanation: "By combining motor control, servo positioning, and ultrasonic sensing, we can create a robot that can navigate its environment and interact with objects autonom