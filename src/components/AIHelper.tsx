
import { useState, useRef, useEffect } from "react";
import { Bot, X, Send, RefreshCw, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// Add markdown parsing capability
import ReactMarkdown from 'react-markdown';

type Message = {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const OPENROUTER_API_KEY = "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";
const MODEL = "openai/gpt-4o-mini";

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

  const handleSubmit = async (e: React.FormEvent) => {
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

    try {
      // Prepare message history for API call
      const messageHistory = messages.map(msg => ({
        role: msg.isBot ? "assistant" : "user",
        content: msg.text
      }));

      // Add the new user message
      messageHistory.push({
        role: "user",
        content: input
      });

      // Enhanced system prompt with detailed pin information
      const systemPrompt = {
        role: "system",
        content: `You are an educational assistant specializing in helping students learn about the Inspire Bot and Microbit. Provide clear, concise, and accurate information about robotics concepts, programming, pins, sensors, and functionality.

Here's detailed information about Inspire Bot pins and their functions that you should use in your responses:

1. SERVO CONTROL:
   - P0: Built-in Servo (main servo)
   - P1: Additional Servo
   - Control servos with commands like "pins.servoWritePin(AnalogPin.P0, angle)" where angle is 0-180

2. ULTRASONIC SENSOR:
   - P2: Trigger pin
   - P8: Echo pin
   - Distance calculation: Duration of echo * speed of sound / 2
   - Example code: Send pulse on P2, measure echo time on P8

3. LINE FOLLOWING SENSOR:
   - P3: Digital input (0 for black line, 1 for white surface)
   - Usage: "pins.digitalReadPin(DigitalPin.P3)" returns 0 or 1

4. LED CONTROL:
   - P16: Digital output for LEDs
   - Turn on: "pins.digitalWritePin(DigitalPin.P16, 1)"
   - Turn off: "pins.digitalWritePin(DigitalPin.P16, 0)"

5. MOTOR CONTROL:
   - Left Motor: P12 (direction 1), P13 (direction 2)
   - Right Motor: P14 (direction 1), P15 (direction 2)
   - Forward: Left(P12=0, P13=1) + Right(P14=1, P15=0)
   - Reverse: Left(P12=1, P13=0) + Right(P14=0, P15=1)
   - Left Turn: Left(P12=1, P13=0) + Right(P14=1, P15=0)
   - Right Turn: Left(P12=0, P13=1) + Right(P14=0, P15=1)
   - Stop: All pins = 0

Format your responses using markdown for better readability. Use **bold text** for emphasis, headings (## or ###) for sections, and \`\`\` code blocks for code examples. This will make your explanations clearer and easier to follow.

When answering questions, refer to these specific pin configurations and provide example code snippets when appropriate. Keep responses friendly, educational, and tailored to the student's question.`
      };

      // Call OpenRouter API
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "HTTP-Referer": window.location.origin,
          "X-Title": "Inspire Bot Assistant"
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [systemPrompt, ...messageHistory],
          max_tokens: 500
        })
      });

      if (!response.ok) {
        throw new Error("Failed to get response from AI service");
      }

      const data = await response.json();
      const botResponse = data.choices[0]?.message?.content || "I'm having trouble connecting. Please try again later.";

      // Add bot response to messages
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error calling AI service:", error);
      // Fallback response in case of error
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm having trouble connecting right now. Please try again later.",
        isBot: true,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, errorMessage]);
      toast.error("Failed to get AI response");
    } finally {
      setIsLoading(false);
    }
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
                {messages.map((msg) => (
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
                        {msg.isBot ? (
                          <div className="markdown-content">
                            <ReactMarkdown
                              components={{
                                h1: ({node, ...props}) => <h1 className="text-lg font-bold my-2" {...props} />,
                                h2: ({node, ...props}) => <h2 className="text-md font-bold my-1.5" {...props} />,
                                h3: ({node, ...props}) => <h3 className="text-sm font-bold my-1" {...props} />,
                                strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
                                code: ({node, ...props}) => <code className="bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5 text-xs" {...props} />,
                                pre: ({node, ...props}) => <pre className="bg-gray-100 dark:bg-gray-800 rounded p-2 text-xs my-2 overflow-x-auto" {...props} />
                              }}
                            >
                              {msg.text}
                            </ReactMarkdown>
                          </div>
                        ) : (
                          msg.text
                        )}
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
