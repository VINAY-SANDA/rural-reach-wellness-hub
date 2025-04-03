
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Mic, MicOff, Info } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type MessageType = {
  id: number;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: 1,
      content: "Hello! I'm your health assistant. I can help you check symptoms, provide basic health information, or connect you with healthcare resources. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const commonSymptoms = [
    "Headache", "Fever", "Cough", "Stomach pain", "Dizziness"
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;
    
    const newMessage: MessageType = {
      id: messages.length + 1,
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages([...messages, newMessage]);
    setInputMessage('');
    setIsLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      let botResponse = '';
      const userMsg = inputMessage.toLowerCase();
      
      if (userMsg.includes('headache')) {
        botResponse = "Headaches can be caused by many factors including stress, dehydration, or lack of sleep. For a mild headache, you can try drinking water, resting in a dark quiet room, or taking over-the-counter pain relievers. If your headache is severe or persistent, I'd recommend consulting with a healthcare provider.";
      } else if (userMsg.includes('fever')) {
        botResponse = "Fever is often a sign that your body is fighting an infection. Rest, staying hydrated, and taking fever reducers like acetaminophen can help. If your fever is high (above 103°F/39.4°C) or lasts more than three days, please seek medical attention.";
      } else if (userMsg.includes('cough')) {
        botResponse = "A cough could be due to many things including allergies, cold, flu, or other respiratory conditions. Drinking warm liquids, using honey (for adults and children over 1 year), and using a humidifier might help. If your cough persists for more than a week or is accompanied by shortness of breath, please consult a healthcare provider.";
      } else {
        botResponse = "Thank you for sharing that information. While I can provide general guidance, remember that I'm not a replacement for professional medical advice. Would you like me to help you find a healthcare provider in your area?";
      }
      
      const botMessage: MessageType = {
        id: messages.length + 2,
        content: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prevMessages => [...prevMessages, botMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    
    if (!isListening) {
      // Simulate voice recognition
      setTimeout(() => {
        setInputMessage("I've been having a headache since yesterday");
        setIsListening(false);
      }, 2000);
    } else {
      setInputMessage('');
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)]">
      <div className="mb-4">
        <h1 className="text-3xl font-bold">AI Health Chat</h1>
        <p className="text-muted-foreground">
          Discuss your symptoms or health concerns with our AI assistant.
        </p>
      </div>
      
      <Card className="flex-1 flex flex-col">
        <CardHeader className="pb-2 border-b">
          <div className="flex items-center">
            <Avatar className="h-10 w-10 mr-2">
              <AvatarImage src="/placeholder.svg" alt="Bot" />
              <AvatarFallback className="bg-wellness-600 text-white">AI</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>Health Assistant</CardTitle>
              <CardDescription>Powered by AI</CardDescription>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="ml-auto">
                    <Info className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">
                    This AI assistant provides general health information. It is not a replacement for professional medical advice. In case of emergency, please contact healthcare services.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === 'user' 
                      ? 'bg-wellness-600 text-white' 
                      : 'bg-muted'
                  }`}
                >
                  <div className="mb-1">{message.content}</div>
                  <div 
                    className={`text-xs ${
                      message.sender === 'user' 
                        ? 'text-wellness-100' 
                        : 'text-muted-foreground'
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] bg-muted rounded-lg p-4">
                  <div className="flex space-x-2">
                    <Skeleton className="h-4 w-4 rounded-full animate-pulse" />
                    <Skeleton className="h-4 w-4 rounded-full animate-pulse" />
                    <Skeleton className="h-4 w-4 rounded-full animate-pulse" />
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
        
        <CardFooter className="border-t p-4">
          <div className="w-full space-y-4">
            <div className="flex flex-wrap gap-2">
              {commonSymptoms.map((symptom, index) => (
                <Button 
                  key={index}
                  variant="outline" 
                  size="sm"
                  onClick={() => handleSuggestionClick(`I'm experiencing ${symptom.toLowerCase()}`)}
                >
                  {symptom}
                </Button>
              ))}
            </div>
            
            <div className="flex space-x-2">
              <Button 
                variant={isListening ? "destructive" : "outline"}
                size="icon"
                onClick={toggleListening}
              >
                {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </Button>
              
              <Input
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                disabled={isListening}
                className="flex-1"
              />
              
              <Button onClick={handleSendMessage} disabled={inputMessage.trim() === ''}>
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ChatPage;
