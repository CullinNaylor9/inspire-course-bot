
import { useState, useRef, useEffect } from "react";
import { Bot, X, Send, RefreshCw, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type Message = {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export function AIHelper() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hello! I'm here to help you learn about Inspire Bot and Microbit. What would you like to know?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom of messages when new message arrives
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat is opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isBot: false,
      timestamp: new Date()
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response after a delay
    setTimeout(() => {
      // Generate a relevant response based on the input
      let responseText = "I'm here to help with your Inspire Bot and Microbit questions!";
      
      const userInput = input.toLowerCase();
      
      if (userInput.includes("pin") || userInput.includes("gpio")) {
        responseText = "Inspire Bot has various pins for different functions: P0 (Built-in Servo), P1 (Additional Servo), P2 & P8 (Ultrasonic), P3 (Line Following), P16 (LED), and P12-P15 (Motor Control).";
      } else if (userInput.includes("motor") || userInput.includes("move")) {
        responseText = "Motor control uses pins 12-15. For forward movement: Left(P12=0, P13=1) + Right(P14=1, P15=0). For turning, you'll want to adjust power to individual motors.";
      } else if (userInput.includes("servo")) {
        responseText = "Servos connect to P0 (built-in) and P1 (additional). You can control the angle from 0-180 degrees using the appropriate servo.write() commands.";
      } else if (userInput.includes("sensor") || userInput.includes("ultrasonic")) {
        responseText = "Ultrasonic sensors use pins P2 and P8. They send out ultrasonic pulses and measure the time until the echo returns to calculate distance.";
      } else if (userInput.includes("led") || userInput.includes("light")) {
        responseText = "LEDs connect to P16 and can be controlled with digital writes. They're great for status indicators or visual feedback from your robot.";
      } else if (userInput.includes("hello") || userInput.includes("hi")) {
        responseText = "Hello there! How can I help with your Inspire Bot project today?";
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const clearChat = () => {
    setMessages([{
      id: "welcome",
      text: "Hello! I'm here to help you learn about Inspire Bot and Microbit. How can I assist you?",
      isBot: true,
      timestamp: new Date()
    }]);
    toast.success("Chat history cleared");
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 rounded-full h-14 w-14 shadow-lg bg-primary hover:bg-primary-hover transition-all duration-300 flex items-center justify-center"
        aria-label="Open AI Helper"
      >
        <Bot className="h-6 w-6" />
      </Button>

      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-[350px] sm:w-[420px] h-[500px] shadow-xl border-primary/20 animate-fade-in animate-slide-up z-50 overflow-hidden">
          <CardHeader className="border-b bg-primary/5 py-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2 font-medium">
                <Bot className="h-5 w-5 text-primary" />
                Inspire Bot Assistant
              </CardTitle>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={clearChat}
                  className="h-8 w-8 rounded-full hover:bg-primary/10"
                  title="Clear chat"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 rounded-full hover:bg-primary/10"
                  title="Close"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0 flex flex-col h-[calc(100%-8rem)]">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((msg, i) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex flex-col",
                      msg.isBot ? "items-start" : "items-end"
                    )}
                  >
                    <div className="flex flex-col space-y-1">
                      <div
                        className={cn(
                          "rounded-2xl px-4 py-2.5 max-w-[90%] text-sm",
                          msg.isBot
                            ? "bg-accent text-accent-foreground rounded-tl-sm"
                            : "bg-primary text-primary-foreground rounded-tr-sm"
                        )}
                      >
                        {msg.text}
                      </div>
                      <span className="text-xs text-muted-foreground px-2">
                        {formatTime(msg.timestamp)}
                      </span>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-start">
                    <div className="bg-accent rounded-2xl px-4 py-2.5 text-sm rounded-tl-sm flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
            <CardFooter className="border-t p-3 bg-background">
              <form onSubmit={handleSubmit} className="flex w-full gap-2 items-center">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about Inspire Bot..."
                  className="flex-1 bg-accent/30 border-accent focus-visible:ring-primary"
                  disabled={isLoading}
                />
                <Button 
                  type="submit" 
                  size="icon" 
                  disabled={isLoading || !input.trim()}
                  className={cn(
                    "rounded-full transition-all", 
                    !input.trim() && "opacity-70"
                  )}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </CardFooter>
          </CardContent>
        </Card>
      )}
    </>
  );
}
