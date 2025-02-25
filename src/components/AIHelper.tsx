
import { useState } from "react";
import { Bot, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

export function AIHelper() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isBot: boolean }[]>([]);
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { text: input, isBot: false }]);
    // TODO: Implement AI response logic
    setMessages((prev) => [
      ...prev,
      { text: "I'm here to help you with Inspire Bot and Microbit questions!", isBot: true },
    ]);
    setInput("");
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 rounded-full h-14 w-14 shadow-lg bg-primary hover:bg-primary-hover"
        aria-label="Open AI Helper"
      >
        <Bot className="h-6 w-6" />
      </Button>

      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-96 h-[500px] shadow-xl animate-slide-up">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Bot className="h-5 w-5" />
                AI Helper
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0 flex flex-col h-[calc(100%-4rem)]">
            <ScrollArea className="flex-1 p-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`mb-4 ${
                    msg.isBot ? "flex" : "flex justify-end"
                  }`}
                >
                  <div
                    className={`rounded-lg px-4 py-2 max-w-[80%] ${
                      msg.isBot
                        ? "bg-accent text-accent-foreground"
                        : "bg-primary text-primary-foreground ml-auto"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </ScrollArea>
            <form onSubmit={handleSubmit} className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about Inspire Bot..."
                  className="flex-1"
                />
                <Button type="submit">Send</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </>
  );
}
