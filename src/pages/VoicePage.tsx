
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Headphones, ArrowRight } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const VoicePage: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [processingState, setProcessingState] = useState<'idle' | 'processing' | 'done'>('idle');
  const [response, setResponse] = useState('');
  
  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
      setProcessingState('processing');
      
      // Simulate processing
      setTimeout(() => {
        setProcessingState('done');
        
        // Generate response based on transcript
        const lowerTranscript = transcript.toLowerCase();
        let aiResponse = '';
        
        if (lowerTranscript.includes('headache') || lowerTranscript.includes('head hurts')) {
          aiResponse = "I understand you're experiencing a headache. This could be due to various reasons like stress, dehydration, or lack of sleep. For a mild headache, you might consider drinking water, resting, or taking over-the-counter pain relievers. If the headache is severe or persistent, I recommend consulting with a healthcare provider.";
        } else if (lowerTranscript.includes('stomach') || lowerTranscript.includes('abdomen')) {
          aiResponse = "I hear you're having stomach issues. This could be related to indigestion, food intolerance, or other digestive conditions. Try drinking clear fluids, eating bland foods, and avoid spicy or fatty items. If the pain is severe, persistent, or accompanied by fever, please seek medical attention.";
        } else if (lowerTranscript.includes('breathing') || lowerTranscript.includes('breath')) {
          aiResponse = "Difficulty breathing requires immediate medical attention. Please contact emergency services or go to the nearest emergency room if you're experiencing severe breathing problems. In less severe cases, it could be related to allergies, asthma, or anxiety. A healthcare provider can help determine the cause and appropriate treatment.";
        } else if (lowerTranscript.includes('nearest') || lowerTranscript.includes('hospital') || lowerTranscript.includes('clinic')) {
          aiResponse = "I can help you find the nearest healthcare facilities. Please check the Community section of our app for a list of hospitals, clinics, and healthcare centers in your area. You can filter by distance, services offered, and availability.";
        } else {
          aiResponse = "Thank you for sharing that information. While I can provide general guidance, I recommend consulting with a healthcare professional for personalized advice. Would you like me to help you find a healthcare provider in your area?";
        }
        
        setResponse(aiResponse);
      }, 2000);
    } else {
      setIsListening(true);
      setProcessingState('idle');
      setResponse('');
      
      // Simulate voice recognition
      const simulatedText = [
        "I've been having a headache for the past two days and over-the-counter pain relievers aren't helping. What should I do?",
        "My stomach has been hurting after meals. Could this be a food intolerance?",
        "I'm having trouble breathing when I exercise. Is this normal or should I be concerned?",
        "Can you tell me about the nearest healthcare facilities in my area?"
      ];
      
      const randomText = simulatedText[Math.floor(Math.random() * simulatedText.length)];
      
      let currentText = '';
      const interval = setInterval(() => {
        if (currentText.length < randomText.length) {
          currentText = randomText.slice(0, currentText.length + 1);
          setTranscript(currentText);
        } else {
          clearInterval(interval);
          setIsListening(false);
          setProcessingState('processing');
        }
      }, 100);
    }
  };

  const handleNewConversation = () => {
    setTranscript('');
    setResponse('');
    setProcessingState('idle');
  };
  
  const speakResponse = () => {
    // In a real implementation, this would use the Web Speech API to speak the response
    alert("In a real implementation, this would use text-to-speech to read aloud: " + response);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">Voice Assistant</h1>
        <p className="text-muted-foreground">
          Speak to our assistant to check symptoms or navigate the app.
        </p>
      </div>
      
      <Alert>
        <AlertTitle className="flex items-center">
          <Mic className="h-4 w-4 mr-2" />
          Voice Recognition
        </AlertTitle>
        <AlertDescription>
          Click the microphone button and speak clearly. Your voice will be converted to text, and our AI will respond with health information.
        </AlertDescription>
      </Alert>
      
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Your Voice Input</CardTitle>
            <CardDescription>
              Speak clearly and at a normal pace for best results.
            </CardDescription>
          </CardHeader>
          <CardContent className="min-h-[200px]">
            {transcript ? (
              <div className="p-4 bg-muted rounded-lg">
                {transcript}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                Your transcribed speech will appear here
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button 
              onClick={toggleListening} 
              variant={isListening ? "destructive" : "default"}
              className="rounded-full h-16 w-16"
              disabled={processingState === 'processing'}
            >
              {isListening ? (
                <MicOff className="h-8 w-8" />
              ) : (
                <Mic className="h-8 w-8" />
              )}
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>AI Response</CardTitle>
            <CardDescription>
              Health information based on your voice input.
            </CardDescription>
          </CardHeader>
          <CardContent className="min-h-[200px]">
            {processingState === 'processing' ? (
              <div className="h-full flex flex-col items-center justify-center">
                <div className="animate-pulse text-center">
                  <div className="mb-4">Processing your query...</div>
                  <div className="flex justify-center space-x-2">
                    <div className="w-3 h-3 bg-wellness-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                    <div className="w-3 h-3 bg-wellness-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-3 h-3 bg-wellness-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            ) : response ? (
              <div className="p-4 bg-muted rounded-lg">
                {response}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                AI response will appear here
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={handleNewConversation}
              disabled={!response && processingState !== 'done'}
            >
              New Conversation
            </Button>
            
            <Button 
              onClick={speakResponse}
              disabled={!response}
              className="flex items-center"
            >
              <Headphones className="h-5 w-5 mr-2" />
              Listen
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Navigate by Voice</CardTitle>
          <CardDescription>
            You can also use voice commands to navigate through the app.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { command: "Go to Dashboard", action: "Opens the main dashboard" },
              { command: "Check my medications", action: "Goes to medication tracker" },
              { command: "Find nearby clinics", action: "Opens community center locator" },
              { command: "Show health news", action: "Opens health bulletin" }
            ].map((item, index) => (
              <div key={index} className="flex items-center p-3 border rounded-lg">
                <div className="mr-3">
                  <Mic className="h-5 w-5 text-wellness-600" />
                </div>
                <div>
                  <div className="font-medium">{item.command}</div>
                  <div className="text-sm text-muted-foreground">{item.action}</div>
                </div>
                <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VoicePage;
