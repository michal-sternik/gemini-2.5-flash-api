import { useEffect, useState } from "react";
import Conversation from "../Conversation/Conversation";
import Input from "../Input/Input";
import { useChat } from "../../hooks/useChat";
import HeaderBar from "../HeaderBar/HeaderBar";
import { Card } from "@/components/ui/card";

function RootLayout() {
  const [selectedModel, setSelectedModel] = useState("mistral-3.2-small");

  const [totalTokenSum, setTotalTokenSum] = useState(() =>
    Number(localStorage.getItem(`totalTokenCount-${selectedModel}`) || 0)
  );
  const {
    messages,
    isLoading,
    sendMessage,
    clearChat,
    file,
    handleFileSelection,
    numberOfPreviousMessagesAttached,
    setNumberOfPreviousMessagesAttached,
  } = useChat(selectedModel);

  const resetTokenCount = () => {
    localStorage.setItem(`totalTokenCount-${selectedModel}`, "0");
    setTotalTokenSum(0);
  };

  useEffect(() => {
    setTotalTokenSum(
      Number(localStorage.getItem(`totalTokenCount-${selectedModel}`) || 0)
    );
  }, [messages, selectedModel]);

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-2rem)]">
      <Card className="h-full bg-white/10 border-white/20 shadow-2xl">
        <div className="flex flex-col h-full p-6 gap-6">
          <HeaderBar
            numberOfPreviousMessagesAttached={numberOfPreviousMessagesAttached}
            setNumberOfPreviousMessagesAttached={
              setNumberOfPreviousMessagesAttached
            }
            totalTokenSum={totalTokenSum}
            resetTokenCount={resetTokenCount}
            selectedModel={selectedModel}
            setSelectedModel={setSelectedModel}
          />

          <div className="flex-1 flex flex-col gap-4 min-h-0">
            <Conversation messages={messages} />
            {isLoading && (
              <div className="text-center text-white/80 animate-pulse flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <span className="ml-2">Bot is generating response...</span>
              </div>
            )}
          </div>

          <Input
            sendMessage={sendMessage}
            selectedModel={selectedModel}
            clearChat={clearChat}
            isLoading={isLoading}
            handleFileSelection={handleFileSelection}
            file={file}
          />
        </div>
      </Card>
    </div>
  );
}

export default RootLayout;
