import { useRef, useEffect } from "react";
import type { Message, BotMessage } from "../../types/types";
import ReactMarkdown from "react-markdown";
import TokenInfo from "../TokenInfo/TokenInfo";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Bot } from "lucide-react";

interface ConversationProps {
  messages: Message[];
}

const Conversation = ({ messages }: ConversationProps) => {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center text-white/60">
          <Bot className="w-16 h-16 mx-auto mb-4 text-purple-400" />
          <h3 className="text-xl font-semibold mb-2">Start a conversation</h3>
          <p>Ask a question or upload a file to begin chatting with AI</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scroll">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex gap-3 ${
            msg.sender === "user" ? "flex-row-reverse" : "flex-row"
          }`}
        >
          <Avatar
            className={`w-8 h-8 ${
              msg.sender === "user" ? "bg-purple-600" : "bg-blue-600"
            }`}
          >
            <AvatarFallback className="text-white bg-transparent">
              {msg.sender === "user" ? (
                <User className="w-4 h-4" />
              ) : (
                <Bot className="w-4 h-4" />
              )}
            </AvatarFallback>
          </Avatar>

          <div
            className={`flex-1 max-w-[80%] ${
              msg.sender === "user" ? "text-right" : "text-left"
            }`}
          >
            <Card
              className={`p-4 ${
                msg.sender === "user"
                  ? "bg-purple-600/20 border-purple-500/30 ml-auto"
                  : "bg-blue-600/20 border-blue-500/30"
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-white/60">
                  <span className="font-medium">
                    {msg.sender === "user" ? "You" : "AI Assistant"}
                  </span>
                  <span>•</span>
                  <span>
                    {new Date(msg.timestamp).toLocaleTimeString("pl-PL", {
                      hour12: false,
                    })}
                  </span>
                </div>

                <div className="text-white/90">
                  {msg.sender === "bot" ? (
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  ) : (
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  )}
                </div>

                {msg.sender === "bot" &&
                  (msg as BotMessage).totalTokenCount !== undefined && (
                    <TokenInfo {...(msg as BotMessage)} />
                  )}
              </div>
            </Card>
          </div>
        </div>
      ))}
      <div ref={endRef} />
    </div>
  );
};

export default Conversation;
