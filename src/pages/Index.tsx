import { AIHelper } from "@/components/AIHelper";
import { CourseCard } from "@/components/CourseCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Bot, ChevronRight, Zap, BookOpen, Award } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

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
      },
      {
        id: 3,
        title: "Servo Position Control",
        duration: "20 min",
        description: "Master precise servo control for mechanical operations:",
        points: [
          "Setting exact servo angles (0°, 90°, 180°)",
          "Creating smooth servo sweeps with delays",
          "Building servo control sequences",
          "Calibrating servo positions for your robot",
          "Power considerations for multiple servos"
        ]
      },
      {
        id: 4,
        title: "Sensor-Driven Behaviors",
        duration: "30 min",
        description: "Create intelligent robot behaviors using sensor input:",
        points: [
          "Reading and interpreting ultrasonic sensor data",
          "Setting up threshold-based actions",
          "Programming servo responses to obstacles",
          "Creating adaptive behaviors based on distance",
          "Building a complete obstacle avoidance system"
        ]
      },
      {
        id: 5,
        title: "Building a Smart Arm",
        duration: "40 min",
        description: "Combine servos and sensors to create an intelligent robot arm:",
        points: [
          "Designing the mechanical arm structure",
          "Programming coordinated servo movements",
          "Implementing object detection with ultrasonic sensors",
          "Creating pick-and-place operations",
          "Testing and refining precision movements"
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

const features = [
  {
    title: "Interactive Learning",
    description: "Hands-on programming exercises with immediate feedback",
    icon: <Zap className="h-6 w-6 text-primary" />
  },
  {
    title: "Step-by-Step Guidance",
    description: "Progressive lessons from basic to advanced concepts",
    icon: <ChevronRight className="h-6 w-6 text-primary" />
  },
  {
    title: "Comprehensive Curriculum",
    description: "Cover all aspects of robotics from motors to sensors",
    icon: <BookOpen className="h-6 w-6 text-primary" />
  },
  {
    title: "Achievement System",
    description: "Earn badges and track your progress as you learn",
    icon: <Award className="h-6 w-6 text-primary" />
  }
];

const robotImages = [
  "https://pixeldrain.com/api/file/ftoZQ3Rj",
  "https://pixeldrain.com/api/file/7rE9RH6y",
  "https://pixeldrain.com/api/file/Bp7fcBWz",
  "https://pixeldrain.com/api/file/hCtDup1x",
  "https://pixeldrain.com/api/file/QPjLjsgP",
  "https://pixeldrain.com/api/file/A1LVe748",
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const navigate = useNavigate();
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = category ? course.category === category : true;
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    if (!carouselApi) return;

    const interval = setInterval(() => {
      carouselApi.scrollNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [carouselApi]);

  const handleGetStarted = () => {
    if (courses.length > 0) {
      navigate(`/course/1`);
    }
  };

  const handleBrowseCourses = () => {
    const coursesSection = document.getElementById('courses-section');
    if (coursesSection) {
      coursesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGetStartedToday = () => {
    const beginnerCourse = courses.find(course => course.category === "Beginner");
    if (beginnerCourse) {
      navigate(`/course/${beginnerCourse.id}`);
    } else if (courses.length > 0) {
      navigate(`/course/1`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20">
      <div className="bg-gradient-to-r from-purple-900/30 to-primary/30 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2 space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="https://learning.bishopsprep.org.za/prospective2022/wp-content/uploads/sites/53/2021/05/favicon.png" 
                  alt="Bishops Prep Logo" 
                  className="h-12 w-auto"
                />
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary animate-fade-in">
                  <Bot className="w-4 h-4 mr-2" /> 
                  Interactive Robotics Learning
                </div>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground">
                Master the <span className="text-primary">Inspire Bot</span> with Our Courses
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Comprehensive lessons covering pin control, sensors, and advanced robotics. Perfect for beginners and experienced programmers alike.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="font-medium" onClick={handleGetStarted}>
                  Get Started
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="font-medium" onClick={handleBrowseCourses}>
                  Browse Courses
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="w-full h-64 md:h-96 bg-accent rounded-lg overflow-hidden shadow-xl">
                <Carousel 
                  className="w-full h-full" 
                  setApi={setCarouselApi}
                  opts={{
                    align: "center",
                    loop: true,
                  }}
                >
                  <CarouselContent className="h-full">
                    {robotImages.map((image, index) => (
                      <CarouselItem key={index} className="basis-full h-full pl-0">
                        <div className="w-full h-full">
                          <img 
                            src={image} 
                            alt={`Inspire Bot ${index + 1}`} 
                            className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-2" />
                  <CarouselNext className="right-2" />
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Learn With Us</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Our interactive courses are designed to make robotics fun and accessible for everyone
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-card/60 backdrop-blur-sm p-6 rounded-lg shadow-sm hover:shadow-md transition-all border border-accent">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="font-bold text-xl mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div id="courses-section" className="container mx-auto px-4 py-8 space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">
            Explore Our Courses
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From basic concepts to advanced techniques, we have the perfect course for you.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button 
            variant={category === null ? "default" : "outline"} 
            onClick={() => setCategory(null)}
            className="rounded-full"
          >
            All Courses
          </Button>
          <Button 
            variant={category === "Beginner" ? "default" : "outline"} 
            onClick={() => setCategory("Beginner")}
            className="rounded-full"
          >
            Beginner
          </Button>
          <Button 
            variant={category === "Intermediate" ? "default" : "outline"} 
            onClick={() => setCategory("Intermediate")}
            className="rounded-full"
          >
            Intermediate
          </Button>
          <Button 
            variant={category === "Advanced" ? "default" : "outline"} 
            onClick={() => setCategory("Advanced")}
            className="rounded-full"
          >
            Advanced
          </Button>
        </div>

        <div className="relative max-w-md mx-auto mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search courses..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-lg text-muted-foreground">No courses found matching your criteria.</p>
              <Button 
                variant="link" 
                onClick={() => {
                  setSearchQuery("");
                  setCategory(null);
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-primary/10 py-16 mt-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Begin Your Robotics Journey?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Start with our beginner courses and work your way up to creating fully autonomous robots.
          </p>
          <Button size="lg" className="font-medium" onClick={handleGetStartedToday}>
            Get Started Today
          </Button>
        </div>
      </div>
      
      <AIHelper />
    </div>
  );
};

export default Index;
