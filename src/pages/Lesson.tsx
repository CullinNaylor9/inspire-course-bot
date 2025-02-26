
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, CheckCircle2, BookOpen, FlaskConical, Trophy } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define types for our data structure
type Exercise = {
  title: string;
  description: string;
  steps: string[];
  hint?: string;
  solution?: string;
};

type Activity = {
  title: string;
  description: string;
  materials: string[];
  procedure: string[];
  extension?: string;
};

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
  exercises?: Exercise[];
  activities?: Activity[];
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
        content: "In this lesson, we'll explore the pin layout of the Inspire Bot and understand how each pin contributes to the robot's functionality. The Inspire Bot's pins are the gateway to interacting with the physical world, allowing your code to control motors, receive sensor data, and much more.",
        sections: [
          {
            title: "Servo Control Pins",
            content: "These pins allow you to control servo motors for precise positioning:",
            points: [
              "P0: Built-in servo connection for primary movement control",
              "P1: Additional servo connection for secondary mechanisms",
              "Servo pins send pulse width modulation (PWM) signals",
              "Angle control ranges from 0 to 180 degrees"
            ]
          },
          {
            title: "Sensor Input Pins",
            content: "These pins allow your robot to perceive its environment:",
            points: [
              "P2/P8: Ultrasonic sensor pins for distance measurement",
              "P3: Line following sensor for detecting surface contrasts",
              "Analog pins can detect varying signal strengths",
              "Digital pins detect binary on/off states"
            ]
          },
          {
            title: "Output Control Pins",
            content: "These pins allow your robot to act on the environment:",
            points: [
              "P16: LED control for visual indicators and lighting",
              "P12-P15: Motor control pins for movement",
              "Output pins can be set to HIGH (1) or LOW (0)",
              "PWM capable pins allow for variable output signals"
            ]
          }
        ],
        exercises: [
          {
            title: "Pin Identification Challenge",
            description: "Test your knowledge of the Inspire Bot pin layout with this interactive exercise.",
            steps: [
              "Identify which pins (P0-P16) would be used for a line-following robot",
              "List the pins needed for a robot that can detect obstacles and change direction",
              "Sketch a simple diagram labeling each pin with its function"
            ],
            hint: "Remember that movement requires motor pins, detection requires sensor pins, and feedback might need LED pins."
          }
        ],
        activities: [
          {
            title: "Build a Pin Connection Diagram",
            description: "Create a visual reference guide for your Inspire Bot pins that you can use throughout the course.",
            materials: [
              "Paper or digital drawing tool",
              "Inspire Bot reference materials",
              "Colored pens or markers"
            ],
            procedure: [
              "Draw a representation of your Inspire Bot",
              "Label each pin with its number (P0-P16)",
              "Color-code pins by function (sensors, motors, servos, etc.)",
              "Add notes about what each pin does",
              "Include voltage requirements and signal types"
            ],
            extension: "Make your diagram interactive by adding small paper flaps with additional details under each pin."
          }
        ]
      },
      {
        id: 2,
        title: "Getting Started with Pins",
        duration: "15 min",
        description: "Learn how to interact with pins through basic programming.",
        content: "This lesson covers the fundamentals of interacting with pins, including setting modes, reading data, and controlling outputs. You'll learn how to write code that communicates with the physical components of your Inspire Bot through its pin connections.",
        sections: [
          {
            title: "Understanding Pin Modes",
            content: "Before using a pin, you need to set its mode based on its function:",
            points: [
              "Input mode: Used when receiving data from sensors",
              "Output mode: Used when sending signals to motors or LEDs",
              "Pins must be set to the correct mode before use",
              "Some pins can change modes during program execution"
            ]
          },
          {
            title: "Reading Sensor Data",
            content: "Learn how to capture and interpret information from the world:",
            points: [
              "Digital reading: Detecting on/off states (0 or 1)",
              "Analog reading: Measuring variable signals (range of values)",
              "Timing functions for pulse-based sensors",
              "Data filtering techniques for reliable readings"
            ]
          },
          {
            title: "Controlling Outputs",
            content: "Send commands to make things happen in the physical world:",
            points: [
              "Digital output: Setting pins HIGH or LOW",
              "PWM output: Creating variable power signals",
              "Timing considerations for reliable control",
              "Safety practices to prevent component damage"
            ]
          }
        ],
        exercises: [
          {
            title: "First Pin Programming",
            description: "Practice the basics of pin control with these simple coding examples.",
            steps: [
              "Write a short program that turns an LED on P16 on and off every second",
              "Create code that reads the state of the line sensor on P3 and prints the value",
              "Modify the program to make the LED respond to the line sensor"
            ],
            hint: "Remember to set your pin modes before trying to read or write values."
          }
        ],
        activities: [
          {
            title: "Signal Detective Game",
            description: "Learn to recognize different pin signals and troubleshoot connections.",
            materials: [
              "Inspire Bot",
              "Small objects for testing sensors",
              "LED indicator or display screen"
            ],
            procedure: [
              "Create a program that displays the values from various pins",
              "Place different objects near sensors and observe the readings",
              "Cover and uncover the line sensor to see how values change",
              "Move objects closer and farther from the ultrasonic sensor",
              "Record the range of values for each sensor under different conditions"
            ],
            extension: "Create a 'mystery signal' game where a partner creates a signal and you have to determine which sensor and what condition is creating it."
          }
        ]
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
        content: "Learn how to control the basic movement of your robot by manipulating the motor control pins. This lesson covers the fundamental principles of motor control that will form the foundation of all your robot's movement capabilities.",
        sections: [
          {
            title: "Motor Pin Configuration",
            content: "Understanding how the motor pins work together:",
            points: [
              "Left motor: Controlled by pins P12 and P13",
              "Right motor: Controlled by pins P14 and P15",
              "Each motor requires two pins for directional control",
              "Binary combinations determine movement direction"
            ]
          },
          {
            title: "Creating Basic Movements",
            content: "Implementing fundamental movement patterns:",
            points: [
              "Forward motion requires both motors moving forward",
              "Backward motion requires both motors in reverse",
              "Turning requires differential motor operation",
              "Stopping by cutting power to both motors"
            ]
          },
          {
            title: "Movement Timing",
            content: "Controlling the duration of movements:",
            points: [
              "Using delay functions to control movement duration",
              "Creating sequences of timed movements",
              "Balancing speed and precision in timing",
              "Testing and calibrating movement timings"
            ]
          }
        ],
        exercises: [
          {
            title: "Movement Programming Challenge",
            description: "Practice creating basic movement controls with progressively complex patterns.",
            steps: [
              "Write code to make your robot move forward for 2 seconds, then stop",
              "Create a program that makes your robot move in a square pattern",
              "Program a zigzag pattern with alternating left and right turns"
            ],
            hint: "Each corner of the square will require stopping, turning 90 degrees, then continuing forward."
          }
        ],
        activities: [
          {
            title: "Movement Sequencing Game",
            description: "Program a sequence of movements, then challenge friends to reproduce it from observation.",
            materials: [
              "Inspire Bot",
              "Tape to mark starting position",
              "Objects to create a simple course"
            ],
            procedure: [
              "Mark a starting position on the floor with tape",
              "Program a sequence of at least 5 movements (forward, backward, turns)",
              "Run your program and have friends watch carefully",
              "Challenge them to recreate your exact sequence with their own code",
              "Compare results by running both programs from the same starting point"
            ],
            extension: "Add time constraints or create movement sequences that spell out letters or shapes."
          }
        ]
      },
      {
        id: 2,
        title: "Pin Control Combinations",
        duration: "25 min",
        description: "Learn the exact pin states for each movement.",
        content: "This lesson covers the specific pin combinations needed for different movement patterns. By mastering these combinations, you'll gain precise control over your robot's movement in any direction.",
        sections: [
          {
            title: "Forward Movement Configuration",
            content: "Setting pin states for moving forward:",
            points: [
              "Left motor: P12=0, P13=1",
              "Right motor: P14=1, P15=0",
              "Both motors rotating in forward direction",
              "Balanced power ensures straight movement"
            ]
          },
          {
            title: "Reverse Movement Configuration",
            content: "Setting pin states for moving backward:",
            points: [
              "Left motor: P12=1, P13=0",
              "Right motor: P14=0, P15=1",
              "Both motors rotating in reverse direction",
              "Maintains alignment with forward calibration"
            ]
          },
          {
            title: "Turning Configurations",
            content: "Setting pin states for various turns:",
            points: [
              "Left turn: Left(P12=1, P13=0) + Right(P14=1, P15=0)",
              "Right turn: Left(P12=0, P13=1) + Right(P14=0, P15=1)",
              "Spin in place: Motors running in opposite directions",
              "Gradual turn: One motor faster than the other"
            ]
          }
        ],
        exercises: [
          {
            title: "Pin State Programming",
            description: "Practice writing code that directly sets pin states for precise movement control.",
            steps: [
              "Create a function for each basic movement (forward, backward, left, right, stop)",
              "Compose a sequence that uses all movement functions",
              "Create a more complex function that performs a three-point turn"
            ],
            hint: "Organize your code with clear function names like moveForward(), moveBackward(), etc."
          }
        ],
        activities: [
          {
            title: "Robot Dance Routine Challenge",
            description: "Program your robot to perform a choreographed 'dance' using precise pin control.",
            materials: [
              "Inspire Bot",
              "Open floor space",
              "Optional: Music with a consistent beat"
            ],
            procedure: [
              "Design a sequence of at least 8 movements that create a 'dance routine'",
              "Include rotations, forward/backward movements, and stops",
              "If using music, time the movements to match the beat",
              "Program your routine using your movement functions",
              "Perform your robot dance for an audience"
            ],
            extension: "Create synchronized dances with multiple robots, or program your robot to respond to different musical tempos."
          }
        ]
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
        content: "Master the art of servo control to create precise movements for your robot's appendages. Servos are special motors that can be positioned at exact angles, making them perfect for robot arms, sensors on swivels, and other mechanisms requiring precise control.",
        sections: [
          {
            title: "Servo Fundamentals",
            content: "Understanding how servo motors work:",
            points: [
              "Servos use pulse width modulation (PWM) signals",
              "Position is controlled by pulse duration",
              "Standard servos move from 0 to 180 degrees",
              "Servos maintain position without continuous commands"
            ]
          },
          {
            title: "Programming Servo Movement",
            content: "Writing code to control servo positions:",
            points: [
              "Setting up servo objects in your code",
              "Using angle values to position servos",
              "Creating smooth motion with incremental changes",
              "Establishing limits to prevent mechanical damage"
            ]
          },
          {
            title: "Multi-Servo Coordination",
            content: "Controlling multiple servos for complex movements:",
            points: [
              "Using both P0 and P1 for dual servo control",
              "Synchronizing servos for coordinated movement",
              "Creating movement sequences for functional actions",
              "Timing considerations for realistic motion"
            ]
          }
        ],
        exercises: [
          {
            title: "Precision Positioning Practice",
            description: "Master exact servo control with these programming exercises.",
            steps: [
              "Write a program to move a servo from 0° to 180° and back in 10° increments",
              "Create a function that positions a servo at any requested angle",
              "Program a sequence that moves between five predefined positions with smooth transitions"
            ],
            hint: "Use small delays between incremental movements to create smooth motion."
          }
        ],
        activities: [
          {
            title: "Robotic Arm Wave Challenge",
            description: "Program a servo-controlled arm that can wave hello in a natural motion.",
            materials: [
              "Inspire Bot",
              "Additional craft materials for creating an arm (optional)",
              "Small objects for the arm to interact with"
            ],
            procedure: [
              "Configure your servo on pin P0 to control motion",
              "Create a 'waving' motion using servo positions between 30° and 150°",
              "Program natural acceleration and deceleration at the ends of movement",
              "Add a trigger (button press or sensor) to start the waving motion",
              "Test and refine the movement until it looks natural"
            ],
            extension: "Create a more complex arm with multiple servos for more degrees of freedom, or program your robot to wave in response to specific stimuli like sound or motion."
          }
        ]
      },
      {
        id: 2,
        title: "Ultrasonic Distance Sensing",
        duration: "35 min",
        description: "Implement distance detection for obstacle avoidance.",
        content: "Learn how to use ultrasonic sensors to detect obstacles and implement avoidance strategies. Ultrasonic sensors work like sonar, sending out sound waves and measuring how long they take to bounce back - allowing your robot to 'see' obstacles before touching them.",
        sections: [
          {
            title: "Ultrasonic Sensor Principles",
            content: "Understanding how ultrasonic sensors work:",
            points: [
              "Sensors use sound waves beyond human hearing",
              "P2 (trigger) sends the pulse, P8 (echo) receives the reflection",
              "Distance calculated based on time between send and receive",
              "Effective range approximately 2cm to 400cm"
            ]
          },
          {
            title: "Distance Calculation",
            content: "Converting sensor readings to usable distance measurements:",
            points: [
              "Time measurement in microseconds",
              "Speed of sound constant (approximately 343m/s at room temperature)",
              "Converting time to distance using physics formulas",
              "Accounting for environmental factors affecting accuracy"
            ]
          },
          {
            title: "Implementing Obstacle Detection",
            content: "Using distance data to detect and respond to obstacles:",
            points: [
              "Setting threshold distances for different responses",
              "Creating tiered responses based on proximity",
              "Filtering readings to eliminate false positives",
              "Combining with movement controls for autonomous behavior"
            ]
          }
        ],
        exercises: [
          {
            title: "Distance Measurement Programming",
            description: "Practice using ultrasonic sensors to detect and respond to distance.",
            steps: [
              "Write a program that continuously reads and displays the distance to an object",
              "Create a function that returns distance in centimeters with 1 decimal place precision",
              "Program your robot to stop when it detects an object closer than 20cm"
            ],
            hint: "Remember that sound travels to the object and back, so divide the total time by 2 to get one-way distance."
          }
        ],
        activities: [
          {
            title: "Hot and Cold Proximity Game",
            description: "Create a game where your robot gives feedback based on how close an object is.",
            materials: [
              "Inspire Bot with ultrasonic sensor",
              "LED on pin P16 or other feedback mechanism",
              "Various objects of different sizes and shapes"
            ],
            procedure: [
              "Program your robot to continuously measure distance",
              "Create a feedback system where the LED blinks faster as objects get closer",
              "Set up different distance zones (far: slow blinking, medium: medium blinking, close: fast blinking)",
              "Have friends try to position objects at specific distances based on the feedback",
              "Award points for accuracy in placing objects at requested distances"
            ],
            extension: "Use different colored LEDs for different distance ranges, or add sound feedback that changes pitch with distance."
          }
        ]
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
        content: "Understand how to use infrared sensors to detect and follow lines with your robot. Line following is one of the most common and useful robot behaviors, allowing autonomous navigation along predefined paths.",
        sections: [
          {
            title: "Line Sensor Principles",
            content: "Understanding how infrared line sensors work:",
            points: [
              "Infrared emitter and detector pairs",
              "Light reflection differences between surfaces",
              "Digital vs. analog readings from line sensors",
              "Environmental factors affecting sensor reliability"
            ]
          },
          {
            title: "Calibrating Line Sensors",
            content: "Setting up your sensors for optimal performance:",
            points: [
              "Determining threshold values for line detection",
              "Testing on different surfaces and line colors",
              "Adjusting sensor height for best results",
              "Creating calibration routines in your code"
            ]
          },
          {
            title: "Basic Line Following Algorithms",
            content: "Programming your robot to follow lines:",
            points: [
              "Simple on/off line detection",
              "Proportional correction for smoother following",
              "Handling intersections and line breaks",
              "Recovery strategies for losing the line"
            ]
          }
        ],
        exercises: [
          {
            title: "Line Detection Programming",
            description: "Practice reading and interpreting line sensor data.",
            steps: [
              "Write a program that displays the current value from the line sensor on P3",
              "Create a calibration routine that determines black/white thresholds automatically",
              "Program a simple line-following routine that adjusts direction based on sensor readings"
            ],
            hint: "Test your sensor on different surfaces to understand the range of values it produces."
          }
        ],
        activities: [
          {
            title: "Line Maze Challenge",
            description: "Create and navigate a line maze using your line following capabilities.",
            materials: [
              "Inspire Bot with line sensor configured",
              "Black electrical tape or thick marker",
              "Large sheet of white paper or cardboard"
            ],
            procedure: [
              "Create a line maze using black tape or marker on white paper",
              "Include straight sections, curves, and at least one intersection",
              "Program your robot to follow the line using sensor data",
              "Add logic to handle intersections (always turn right, for example)",
              "Time how quickly your robot can navigate from start to finish"
            ],
            extension: "Create a more complex maze with multiple decision points, or add coded instructions (like dashed lines means turn right)."
          }
        ]
      },
      {
        id: 2,
        title: "LED Signaling Systems",
        duration: "25 min",
        description: "Implement visual feedback through LED control on P16.",
        content: "Create sophisticated visual feedback systems using programmable LEDs. LEDs can provide important status information, debug output, and even aesthetic elements to your robot projects.",
        sections: [
          {
            title: "LED Control Basics",
            content: "Fundamental techniques for controlling LEDs:",
            points: [
              "Digital output control for on/off states",
              "PWM for brightness control",
              "Timing functions for blinking patterns",
              "Current limitations and hardware considerations"
            ]
          },
          {
            title: "Creating Status Indicators",
            content: "Using LEDs to communicate robot status:",
            points: [
              "Color coding for different operational modes",
              "Blinking patterns to indicate different states",
              "Brightness variation to show intensity or proximity",
              "Combining multiple indicators for complex information"
            ]
          },
          {
            title: "Advanced LED Applications",
            content: "Beyond basic status indicators:",
            points: [
              "Using LEDs for debugging (visual program flow tracking)",
              "Creating light shows and aesthetic effects",
              "Simulating sensors (light-based communication)",
              "Low-light operation capabilities"
            ]
          }
        ],
        exercises: [
          {
            title: "LED Programming Practice",
            description: "Master LED control with these programming challenges.",
            steps: [
              "Create a function that makes an LED blink at variable rates",
              "Program a 'heartbeat' pattern (two quick blinks, pause, repeat)",
              "Write code that changes LED behavior based on sensor input"
            ],
            hint: "Use millis() or similar timing functions instead of delay() to allow your program to do other tasks while controlling LED timing."
          }
        ],
        activities: [
          {
            title: "Robot Mood Lighting Project",
            description: "Create a system where your robot displays different light patterns to represent 'moods' or states.",
            materials: [
              "Inspire Bot",
              "LED connected to P16",
              "Additional LEDs (optional)"
            ],
            procedure: [
              "Define at least 5 different robot 'moods' or states (e.g., searching, happy, alert, sleeping, working)",
              "Design a distinct light pattern for each mood (different blink rates, intensities, etc.)",
              "Program transitions between moods based on sensor inputs or time",
              "Create a demonstration that cycles through all the moods",
              "Add sound effects or movements to complement the lighting"
            ],
            extension: "Create a game where people have to guess the robot's 'mood' based only on the light patterns, or program your robot to learn and adapt its mood based on interactions."
          }
        ]
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
        ],
        exercises: [
          {
            title: "Precision Movement Programming",
            description: "Develop your skills in creating exact, repeatable movements.",
            steps: [
              "Write a function that turns your robot exactly 90 degrees clockwise or counterclockwise",
              "Create a calibration routine that adjusts timing values for consistent movement",
              "Program your robot to draw a square pattern, returning precisely to its starting point"
            ],
            hint: "Start with longer turn durations and gradually reduce them until you achieve the exact angle you want."
          }
        ],
        activities: [
          {
            title: "Robot Artist Challenge",
            description: "Transform your robot into an artist that can draw shapes with precision!",
            materials: [
              "Inspire Bot",
              "Large paper sheet",
              "Marker or pen attached to robot",
              "Tape to secure paper"
            ],
            procedure: [
              "Attach a marker or pen to your robot so it touches the paper while moving",
              "Create a secure drawing area with paper taped to the floor",
              "Program your robot to draw specific shapes (circle, square, triangle, star)",
              "Develop sequences that lift the pen (using servo) between shapes",
              "Create a complete drawing with multiple elements"
            ],
            extension: "Program your robot to write letters or simple words, or create an interactive drawing program where your robot responds to commands to create custom art."
          }
        ]
      },
      {
        id: 2,
        title: "Obstacle Course Navigation",
        duration: "50 min",
        description: "Combine sensors and motors for autonomous navigation.",
        content: "Learn to navigate complex environments by combining sensor data with advanced movement controls. This lesson brings together all your robot's capabilities to create intelligent navigation through challenging environments.",
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
        ],
        exercises: [
          {
            title: "Navigation Algorithm Programming",
            description: "Practice creating intelligent navigation systems with these coding challenges.",
            steps: [
              "Create a wall-following function that maintains a constant distance from a boundary",
              "Program an obstacle avoidance routine that navigates around objects",
              "Develop decision logic that chooses between different navigation strategies based on sensor data"
            ],
            hint: "Use proportional control to create smooth wall-following behavior instead of abrupt corrections."
          }
        ],
        activities: [
          {
            title: "Mystery Maze Challenge",
            description: "Test your robot's autonomous navigation abilities in an unknown environment.",
            materials: [
              "Inspire Bot with distance sensors",
              "Various obstacles (books, boxes, etc.)",
              "Tape for marking start and finish lines",
              "Timer or stopwatch"
            ],
            procedure: [
              "Have a friend create a maze-like obstacle course unknown to you",
              "Place your robot at the designated starting point",
              "Program your robot to navigate through the maze using only sensor data",
              "Incorporate different navigation strategies (wall following, open space navigation, etc.)",
              "Measure success by time to completion and number of collisions"
            ],
            extension: "Add complexity by including moving obstacles, or create a competitive event with multiple robots navigating the same course."
          }
        ]
      }
    ]
  },
  {
    id: 6,
    title: "Advanced Robotics Project",
    lessons: [
      {
        id: 1,
        title: "Multi-System Integration",
        duration: "75 min",
        description: "Combine all robot subsystems into a unified control architecture.",
        content: "In this comprehensive lesson, you'll learn how to integrate all the individual systems of your Inspire Bot into a cohesive control architecture that allows for sophisticated autonomous behavior. This represents the transition from individual component programming to creating a truly intelligent robot.",
        sections: [
          {
            title: "State Machine Architecture",
            content: "Implement a robust state machine to manage robot behaviors:",
            points: [
              "Creating clearly defined operational states (searching, following, avoiding, etc.)",
              "Building transition conditions between states based on sensor inputs",
              "Implementing state-specific behaviors and control logic",
              "Developing initialization and shutdown sequences",
              "Testing and debugging state transitions with logging"
            ]
          },
          {
            title: "Sensor Fusion Systems",
            content: "Combine multiple sensor inputs for improved environmental awareness:",
            points: [
              "Integrating ultrasonic and line sensor data for comprehensive sensing",
              "Implementing weighted sensor data interpretation",
              "Creating confidence metrics for different sensor readings",
              "Using historical data to improve current readings",
              "Handling conflicting sensor information gracefully"
            ]
          },
          {
            title: "Advanced Control Architecture",
            content: "Build sophisticated control systems for responsive behavior:",
            points: [
              "Implementing PID (Proportional-Integral-Derivative) control for motor precision",
              "Creating adaptive control parameters based on environmental conditions",
              "Developing event-driven responses to external stimuli",
              "Building behavior hierarchies with priority management",
              "Testing control system performance under various conditions"
            ]
          }
        ],
        exercises: [
          {
            title: "System Integration Programming",
            description: "Practice building complex, coordinated systems with these coding challenges.",
            steps: [
              "Create a state machine with at least 5 different operational states",
              "Implement transition logic between states based on multiple sensor inputs",
              "Develop a centralized control system that coordinates all robot subsystems",
              "Create a debugging system that reports current state and sensor readings"
            ],
            hint: "Start by clearly defining each state and the exact conditions that should trigger transitions."
          }
        ],
        activities: [
          {
            title: "Robot Assistant Challenge",
            description: "Create a robot that can respond to multiple types of inputs and perform helpful tasks.",
            materials: [
              "Fully equipped Inspire Bot with multiple sensors",
              "Small objects for robot to interact with",
              "Tape for marking zones or boundaries",
              "Timer for measuring response time"
            ],
            procedure: [
              "Define at least 3 different 'assistant' tasks your robot can perform",
              "Program detection systems for different trigger conditions (light levels, proximity, line detection, etc.)",
              "Create a main control loop that continuously checks for trigger conditions",
              "Implement appropriate responses for each detected condition",
              "Test your robot's ability to switch between different assistant tasks"
            ],
            extension: "Add remote control capabilities, voice control simulation, or program your robot to learn from and adapt to user preferences over time."
          }
        ]
      },
      {
        id: 2,
        title: "Advanced Mission Programming",
        duration: "105 min",
        description: "Design and implement complex autonomous missions.",
        content: "In this advanced lesson, you'll take your robot programming skills to the next level by creating sophisticated mission programming capabilities. You'll learn how to define objectives, create decision-making frameworks, and adapt to changing environments for true autonomous operation.",
        sections: [
          {
            title: "Mission Planning Systems",
            content: "Create sophisticated mission planning capabilities for your robot:",
            points: [
              "Defining clear mission objectives and success criteria",
              "Breaking complex missions into achievable sub-tasks",
              "Implementing mission progress tracking and reporting",
              "Creating contingency plans for handling obstacles or failures",
              "Testing mission execution in varied environmental conditions"
            ]
          },
          {
            title: "Adaptive Navigation",
            content: "Build advanced navigation systems that adapt to environments:",
            points: [
              "Implementing dynamic pathfinding algorithms",
              "Creating environmental mapping capabilities",
              "Developing obstacle classification and response strategies",
              "Building memory systems for previously navigated areas",
              "Testing navigation performance in complex environments"
            ]
          },
          {
            title: "Autonomous Decision Making",
            content: "Program sophisticated decision-making capabilities:",
            points: [
              "Creating multi-factor decision matrices",
              "Implementing cost-benefit analysis for different actions",
              "Developing learning mechanisms to improve future decisions",
              "Building in safeguards against dangerous conditions",
              "Testing decision logic with simulation and real-world scenarios"
            ]
          },
          {
            title: "Performance Optimization",
            content: "Fine-tune your robot's performance for maximum efficiency:",
            points: [
              "Implementing code optimization techniques",
              "Creating battery management strategies",
              "Developing diagnostic and self-testing capabilities",
              "Building telemetry systems for performance analysis",
              "Testing and benchmarking system performance"
            ]
          }
        ],
        exercises: [
          {
            title: "Mission Programming Challenge",
            description: "Develop advanced autonomous missions with these programming exercises.",
            steps: [
              "Create a mission planner that breaks a complex task into sequential sub-tasks",
              "Implement decision-making logic that adapts to environmental changes",
              "Develop a performance monitoring system that tracks mission progress",
              "Build in error recovery systems for handling unexpected situations"
            ],
            hint: "Think of your mission as a tree of possibilities rather than a linear sequence of steps."
          }
        ],
        activities: [
          {
            title: "Search and Rescue Simulation",
            description: "Program your robot to complete a simulated search and rescue mission autonomously.",
            materials: [
              "Fully equipped Inspire Bot",
              "Small object or doll to represent the 'rescue target'",
              "Various obstacles to create a complex environment",
              "Boundaries to define the search area"
            ],
            procedure: [
              "Define a search area with clear boundaries",
              "Place a 'rescue target' in an unknown location within the area",
              "Program your robot to systematically search the area",
              "Create detection logic to identify the rescue target",
              "Implement a 'rescue' sequence once the target is found",
              "Add time tracking to measure mission efficiency"
            ],
            extension: "Add complexity with multiple targets, simulated hazards, or limited battery life requiring charging stations. Create a scoring system based on rescue speed, accuracy, and efficiency."
          }
        ]
      }
    ]
  }
];

const Lesson = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("content");

  const course = courses.find(c => c.id === Number(courseId));
  const lesson = course?.lessons?.find(l => l.id === Number(lessonId));

  const goToNextLesson = () => {
    const currentLessonIndex = course?.lessons.findIndex(l => l.id === Number(lessonId)) ?? -1;
    if (course && currentLessonIndex < course.lessons.length - 1) {
      navigate(`/course/${courseId}/lesson/${course.lessons[currentLessonIndex + 1].id}`);
      toast({
        title: "Lesson Changed",
        description: `Now viewing: ${course.lessons[currentLessonIndex + 1].title}`,
      });
    } else if (Number(courseId) < courses.length) {
      // Move to the first lesson of the next course
      const nextCourse = courses.find(c => c.id === Number(courseId) + 1);
      if (nextCourse) {
        navigate(`/course/${Number(courseId) + 1}/lesson/1`);
        toast({
          title: "Course Advanced",
          description: `Now in: ${nextCourse.title}`,
        });
      }
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
      toast({
        title: "Lesson Changed",
        description: `Now viewing: ${course.lessons[currentLessonIndex - 1].title}`,
      });
    } else if (Number(courseId) > 1) {
      // Move to the last lesson of the previous course
      const prevCourse = courses.find(c => c.id === Number(courseId) - 1);
      if (prevCourse && prevCourse.lessons.length > 0) {
        navigate(`/course/${Number(courseId) - 1}/lesson/${prevCourse.lessons[prevCourse.lessons.length - 1].id}`);
        toast({
          title: "Previous Course",
          description: `Now in: ${prevCourse.title}`,
        });
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

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="content" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" /> Lesson Content
              </TabsTrigger>
              <TabsTrigger value="exercises" className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" /> Exercises
              </TabsTrigger>
              <TabsTrigger value="activities" className="flex items-center gap-2">
                <FlaskConical className="h-4 w-4" /> Activities
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="content" className="space-y-4">
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
            </TabsContent>
            
            <TabsContent value="exercises" className="space-y-4">
              {lesson.exercises && lesson.exercises.length > 0 ? (
                lesson.exercises.map((exercise, index) => (
                  <Card key={index} className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <h3 className="text-2xl font-bold">{exercise.title}</h3>
                    </div>
                    <p className="mb-4 text-muted-foreground">{exercise.description}</p>
                    
                    <h4 className="font-semibold text-lg mb-2">Steps:</h4>
                    <ol className="list-decimal pl-6 space-y-2 mb-4">
                      {exercise.steps.map((step, i) => (
                        <li key={i}>{step}</li>
                      ))}
                    </ol>
                    
                    {exercise.hint && (
                      <div className="bg-muted p-4 rounded-md mt-4">
                        <p className="font-semibold">Hint:</p>
                        <p>{exercise.hint}</p>
                      </div>
                    )}
                    
                    {exercise.solution && (
                      <div className="mt-4">
                        <Button variant="outline" className="w-full">
                          Show Solution
                        </Button>
                      </div>
                    )}
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No exercises available for this lesson.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="activities" className="space-y-4">
              {lesson.activities && lesson.activities.length > 0 ? (
                lesson.activities.map((activity, index) => (
                  <Card key={index} className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Trophy className="h-5 w-5 text-primary" />
                      <h3 className="text-2xl font-bold">{activity.title}</h3>
                    </div>
                    <p className="mb-4 text-muted-foreground">{activity.description}</p>
                    
                    <h4 className="font-semibold text-lg mb-2">Materials Needed:</h4>
                    <ul className="list-disc pl-6 space-y-1 mb-4">
                      {activity.materials.map((material, i) => (
                        <li key={i}>{material}</li>
                      ))}
                    </ul>
                    
                    <h4 className="font-semibold text-lg mb-2">Procedure:</h4>
                    <ol className="list-decimal pl-6 space-y-2 mb-4">
                      {activity.procedure.map((step, i) => (
                        <li key={i}>{step}</li>
                      ))}
                    </ol>
                    
                    {activity.extension && (
                      <div className="bg-accent/30 p-4 rounded-md mt-4">
                        <p className="font-semibold">Extension Challenge:</p>
                        <p>{activity.extension}</p>
                      </div>
                    )}
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No activities available for this lesson.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>

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
