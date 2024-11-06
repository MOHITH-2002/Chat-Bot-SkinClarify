
// "use client";
// import React, { useState, useRef, useEffect } from 'react';
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Camera, Send } from "lucide-react";
// import { diseaseData, DiseaseKey } from "./data";
// import CameraUploader from './camera';

// type Message = {
//   type: "bot" | "user";
//   content: string;
//   isImage?: boolean;
// };

// const ChatbotUi: React.FC = () => {
//   const [messages, setMessages] = useState<Message[]>([
//     { type: "bot", content: "Hello, I'm SkinClarify. Welcome!" }
//   ]);
//   const [input, setInput] = useState<string>("");
//   const [selectedDisease, setSelectedDisease] = useState<DiseaseKey | null>(null);
//   const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
//   const [currentStep, setCurrentStep] = useState<number>(1);
//   const [showDiseaseOptions, setShowDiseaseOptions] = useState<boolean>(false);
//   const [showGenderOptions, setShowGenderOptions] = useState<boolean>(false);
//   const [showImageUploadOptions, setShowImageUploadOptions] = useState<boolean>(false);
//   const [awaitingDescription, setAwaitingDescription] = useState<boolean>(false);

//   const chatContainerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//     }
//   }, [messages]);

//   const handleSend = () => {
//     if (input.trim()) {
//       handleUserInput(input.trim());
//       setInput("");
//     }
//   };

//   const handleUserInput = (input: string) => {
//     setMessages(prev => [...prev, { type: "user", content: input }]);

//     if (awaitingDescription) {
//       // If awaiting a description, send it to the text-predict API
//       handleTextPrediction(input);
//       setAwaitingDescription(false);
//     } else {
//       handleConversation(input);
//     }
//   };

//   const handleConversation = (input: string) => {
//     setIsAnalyzing(true);
//     setTimeout(() => {
//       setIsAnalyzing(false);
//       switch (currentStep) {
//         case 1:
//           handleAge(input);
//           break;
//         case 2:
//           handleGender(input);
//           break;
//         case 3:
//           handleCountry(input);
//           break;
//         case 4:
//           handleDistrict(input);
//           break;
//         case 5:
//           handleImageDecision(input);
//           break;
//         case 7:
//           handleDiseaseSelection(input);
//           break;
//         case 8:
//           setCurrentStep(9);
//           botPrompt("Was this interaction helpful?", ["Yes", "No"]);
//           break;
//         default:
//           setCurrentStep(10);
//           botPrompt("Thank you for using Skin Clarify!");
//           break;
//       }
//     }, 1000);
//   };

//   const handleAge = (ageInput: string) => {
//     const age = parseInt(ageInput);
//     if (!isNaN(age)) {
//       setCurrentStep(2);
//       botPrompt("What is your gender?");
//       setShowGenderOptions(true);
//     } else {
//       botPrompt("Please enter your Age.");
//     }
//   };

//   const handleGenderSelection = (gender: string) => {
//     setShowGenderOptions(false);
//     setMessages(prev => [...prev, { type: "user", content: gender }]);
//     setCurrentStep(3);
//     botPrompt("Which country are you from?");
//   };

//   const handleGender = (gender: string) => {
//     if (["male", "female", "other"].includes(gender.toLowerCase())) {
//       setCurrentStep(3);
//       botPrompt("Which country are you from?");
//     } else {
//       botPrompt("Please enter 'Male', 'Female', or 'Other' for your gender.");
//     }
//   };

//   const handleCountry = (country: string) => {
//     setCurrentStep(4);
//     botPrompt("Provide your current location?");
//   };

//   const handleDistrict = (district: string) => {
//     setCurrentStep(5);
//     botPrompt("Would you like to upload an image of the skin condition?");
//     setShowImageUploadOptions(true);
//   };

//   const handleImageDecision = (decision: string) => {
//     setShowImageUploadOptions(false);
//     setMessages(prev => [...prev, { type: "user", content: decision }]);

//     if (decision.toLowerCase() === "yes") {
//       setCurrentStep(6);
//       botPrompt("That's great! Please upload an image by clicking the camera icon below.");
//     } else {
//       botPrompt("Oh, okay. Please provide a detailed description of the skin condition.");
//       setAwaitingDescription(true); // Wait for the user to provide a description
//     }
//   };

//   const handleTextPrediction = async (inputText: string) => {
//     botPrompt("Analyzing your description...");
//     try {
//       const response = await fetch('http://localhost:5000/text-predict', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ text: inputText }),
//       });
//       const data = await response.json();
//       setMessages(prev => [
//         ...prev,
//         { type: "bot", content: `Predicted skin disease based on description: ${data.predicted_condition}` }
//       ]);
//     } catch (error) {
//       console.error('Error:', error);
//       setMessages(prev => [
//         ...prev,
//         { type: "bot", content: 'Error occurred while analyzing the description.' }
//       ]);
//     }
//   };

//   const botPrompt = (message: string, options?: string[]) => {
//     setMessages(prev => [...prev, { type: "bot", content: message }]);
//     if (options) {
//       setMessages(prev => [...prev, { type: "bot", content: "Options: " + options.join(", ") }]);
//     }
//   };

//   const handleImageUpload = (url: string) => {
//     setMessages(prev => [...prev, { type: "user", content: url, isImage: true }]);
//     fetch('http://127.0.0.1:8080/predict', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ url })
//     })
//       .then(response => response.json())
//       .then((data: { name: string, message?: string }) => {
//         if (data.message === 'No skin detected, please provide a clearer image.') {
//           setMessages(prev => [...prev, { type: "bot", content: "No skin detected. Please provide a clearer image." }]);
//         } else if (data.name) {
//           setMessages(prev => [...prev, { type: "bot", content: `Predicted skin disease: ${data.name}` }]);
//         } else {
//           setMessages(prev => [...prev, { type: "bot", content: 'Unable to detect the disease. Please try again.' }]);
//         }
//       })
//       .catch(error => {
//         console.error('Error:', error);
//         setMessages(prev => [...prev, { type: "bot", content: 'Error occurred while analyzing the image.' }]);
//       });
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value);

//   const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSend();
//     }
//   };

//   const handleDiseaseClick = (disease: string) => {
//     handleDiseaseSelection(disease);
//   };
//   console.log(messages);
  
//   return (
//     <div className="w-full h-screen flex items-center justify-center bg-background md:p-0">
//       <Card className="w-full mx-auto h-full flex flex-col">
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <div className="flex items-center space-x-2">
//             <Avatar className="h-8 w-8">
//               <AvatarImage src="/path-to-your-logo.svg" alt="Skin Clarify" />
//               <AvatarFallback>SC</AvatarFallback>
//             </Avatar>
//             <span className="font-bold">Skin Clarify</span>
//           </div>
//           <Avatar className="h-8 w-8">
//             <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
//             <AvatarFallback>U</AvatarFallback>
//           </Avatar>
//         </CardHeader>
//         <CardContent className="flex-grow overflow-hidden">
//           <div className="h-full w-full pr-4 overflow-y-auto" ref={chatContainerRef} style={{ maxHeight: '100%' }}>
//             {messages.map((message, index) => (
//               <div
//                 key={index}
//                 className={`flex ${message.type === "user" ? "justify-end" : "justify-start"} mb-4`}
//               >
//                 {message.isImage ? (
//                   <img
//                     src={message.content}
//                     alt="Uploaded"
//                     className="rounded-lg"
//                     style={{ width: '200px', height: '200px', objectFit: 'cover' }}
//                   />
//                 ) : (
//                   <div className={`rounded-lg p-2 max-w-[70%] ${message.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
//                     {message.content}
//                   </div>
//                 )}
//               </div>
//             ))}
//             {isAnalyzing && (
//               <div className="flex justify-start mb-4">
//                 <div className="rounded-lg p-2 max-w-[70%] bg-muted">
//                   Analyzing...
//                 </div>
//               </div>
//             )}

//             {/* Gender Selection Buttons */}
//             {showGenderOptions && (
//               <div className="flex flex-wrap">
//                 {["Male", "Female", "Other"].map((gender, index) => (
//                   <Button
//                     key={index}
//                     variant="outline"
//                     className="m-1"
//                     onClick={() => handleGenderSelection(gender)}
//                   >
//                     {gender}
//                   </Button>
//                 ))}
//               </div>
//             )}

//             {/* Image Upload Options */}
//             {showImageUploadOptions && (
//               <div className="flex flex-wrap">
//                 {["Yes", "No"].map((decision, index) => (
//                   <Button
//                     key={index}
//                     variant="outline"
//                     className="m-1"
//                     onClick={() => handleImageDecision(decision)}
//                   >
//                     {decision}
//                   </Button>
//                 ))}
//               </div>
//             )}
//           </div>
//         </CardContent>
//         <CardFooter className="flex items-center space-x-2 pt-4 pb-6 md:pb-4">
//           <CameraUploader onImageUpload={handleImageUpload} />
//           <Input
//             placeholder="Type your message..."
//             value={input}
//             onChange={handleInputChange}
//             onKeyPress={handleKeyPress}
//           />
//           <Button size="icon" className="shrink-0" onClick={handleSend}>
//             <Send className="h-4 w-4" />
//             <span className="sr-only">Send</span>
//           </Button>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// };

// export default ChatbotUi;
// function handleDiseaseSelection(input: string) {
//   throw new Error('Function not implemented.');
// }
"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Camera, Send, Star } from "lucide-react";
import { diseaseData, DiseaseKey } from "./data";
import CameraUploader from './camera';
import { conversationStore } from '@/lib/actions/conversationController';

type Message = {
  type: "bot" | "user";
  content: string;
  isImage?: boolean;
};

const ChatbotUi: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { type: "bot", content: "Hello, I'm SkinClarify. Welcome!" }
  ]);
  const [input, setInput] = useState<string>("");
  const [selectedDisease, setSelectedDisease] = useState<DiseaseKey | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [showDiseaseOptions, setShowDiseaseOptions] = useState<boolean>(false);
  const [showGenderOptions, setShowGenderOptions] = useState<boolean>(false);
  const [showImageUploadOptions, setShowImageUploadOptions] = useState<boolean>(false);
  const [awaitingDescription, setAwaitingDescription] = useState<boolean>(false);
  const [showRatingOptions, setShowRatingOptions] = useState<boolean>(false);
  const [camerayes,serCameraYes] = useState<boolean>(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      handleUserInput(input.trim());
      setInput("");
    }
  };

  const handleUserInput = (input: string) => {
    setMessages(prev => [...prev, { type: "user", content: input }]);

    if (awaitingDescription) {
      handleTextPrediction(input);
      setAwaitingDescription(false);
    } else {
      handleConversation(input);
    }
  };

  const handleConversation = (input: string) => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      switch (currentStep) {
        case 1:
          handleAge(input);
          break;
        case 2:
          handleGender(input);
          break;
        case 3:
          handleCountry(input);
          break;
        case 4:
          handleDistrict(input);
          break;
        case 5:
          handleImageDecision(input);
          break;
        case 7:
          handleDiseaseSelection(input);
          break;
        default:
          botPrompt("Thank you for using Skin Clarify!");
          break;
      }
    }, 1000);
  };

  const handleAge = (ageInput: string) => {
    const age = parseInt(ageInput);
    if (!isNaN(age)) {
      setCurrentStep(2);
      botPrompt("What is your gender?");
      setShowGenderOptions(true);
    } else {
      botPrompt("Please enter your Age.");
    }
  };

  const handleGenderSelection = (gender: string) => {
    setShowGenderOptions(false);
    setMessages(prev => [...prev, { type: "user", content: gender }]);
    setCurrentStep(3);
    botPrompt("Which country are you from?");
  };

  const handleGender = (gender: string) => {
    if (["male", "female", "other"].includes(gender.toLowerCase())) {
      setCurrentStep(3);
      botPrompt("Which country are you from?");
    } else {
      botPrompt("Please enter 'Male', 'Female', or 'Other' for your gender.");
    }
  };

  const handleCountry = (country: string) => {
    setCurrentStep(4);
    botPrompt("Provide your current location?");
  };

  const handleDistrict = (district: string) => {
    setCurrentStep(5);
    botPrompt("Would you like to upload an image of the skin condition?");
    setShowImageUploadOptions(true);
  };

  const handleImageDecision = (decision: string) => {
    setShowImageUploadOptions(false);
    setMessages(prev => [...prev, { type: "user", content: decision }]);

    if (decision.toLowerCase() === "yes") {
      setCurrentStep(6);
      botPrompt("That's great! Please upload an image by clicking the camera icon below.");
      serCameraYes(true);
    } else {
      botPrompt("Oh, okay. Please provide a detailed description of the skin condition.");
      setAwaitingDescription(true);
    }
  };

  const handleTextPrediction = async (inputText: string) => {
    botPrompt("Analyzing your description...");
    try {
      const response = await fetch('http://localhost:5000/text-predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });
      const data = await response.json();
      setMessages(prev => [
        ...prev,
        { type: "bot", content: `Predicted skin disease based on description: ${data.predicted_condition}` }
      ]);
      askForFeedback(); // Wait 5 seconds, then ask for feedback
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [
        ...prev,
        { type: "bot", content: 'Error occurred while analyzing the description.' }
      ]);
    }
  };

  const askForFeedback = () => {
    setTimeout(() => {
      botPrompt("Was this information helpful? Please rate it from 1 to 5 stars.");
      setShowRatingOptions(true);
    }, 5000);
  };

  const handleRating = async (rating: number) => {
    await setMessages(prev => [...prev, { type: "user", content: `Rated ${rating} stars` }]);
    await botPrompt("Thank you for your feedback!");
    await conversationStore(messages);
    setShowRatingOptions(false);
  };

  const botPrompt = (message: string, options?: string[]) => {
    setMessages(prev => [...prev, { type: "bot", content: message }]);
    if (options) {
      setMessages(prev => [...prev, { type: "bot", content: "Options: " + options.join(", ") }]);
    }
  };

  const handleImageUpload = (url: string) => {
    setMessages(prev => [...prev, { type: "user", content: url, isImage: true }]);
    fetch('http://127.0.0.1:8080/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url })
    })
      .then(response => response.json())
      .then((data: { name: string, message?: string }) => {
        if (data.message === 'No skin detected, please provide a clearer image.') {
          setMessages(prev => [...prev, { type: "bot", content: "No skin detected. Please provide a clearer image." }]);
        } else if (data.name) {
          setMessages(prev => [...prev, { type: "bot", content: `Predicted skin disease: ${data.name}` }]);
          askForFeedback(); // Ask for feedback after showing prediction
        } else {
          setMessages(prev => [...prev, { type: "bot", content: 'Unable to detect the disease. Please try again.' }]);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setMessages(prev => [...prev, { type: "bot", content: 'Error occurred while analyzing the image.' }]);
      });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  console.log(messages);
  
  return (
    <div className="w-full h-screen flex items-center justify-center bg-background md:p-0">
      <Card className="w-full mx-auto h-full flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/path-to-your-logo.svg" alt="Skin Clarify" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <span className="font-bold">Skin Clarify</span>
          </div>
        </CardHeader>
        <CardContent className="flex-grow overflow-hidden">
          <div className="h-full w-full pr-4 overflow-y-auto" ref={chatContainerRef} style={{ maxHeight: '100%' }}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === "user" ? "justify-end" : "justify-start"} mb-4`}
              >
                {message.isImage ? (
                  <img
                    src={message.content}
                    alt="Uploaded"
                    className="rounded-lg"
                    style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                  />
                ) : (
                  <div className={`rounded-lg p-2 max-w-[70%] ${message.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                    {message.content}
                  </div>
                )}
              </div>
            ))}
            {isAnalyzing && (
              <div className="flex justify-start mb-4">
                <div className="rounded-lg p-2 max-w-[70%] bg-muted">
                  Analyzing...
                </div>
              </div>
            )}

            {/* Gender Selection Buttons */}
            {showGenderOptions && (
              <div className="flex flex-wrap">
                {["Male", "Female", "Other"].map((gender, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="m-1"
                    onClick={() => handleGenderSelection(gender)}
                  >
                    {gender}
                  </Button>
                ))}
              </div>
            )}

            {/* Image Upload Options */}
            {showImageUploadOptions && (
              <div className="flex flex-wrap">
                {["Yes", "No"].map((decision, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="m-1"
                    onClick={() => handleImageDecision(decision)}
                  >
                    {decision}
                  </Button>
                ))}
              </div>
            )}

            {/* Star Rating Options */}
            {showRatingOptions && (
              <div className="flex space-x-2 mt-4">
                {[1, 2, 3, 4, 5].map(rating => (
                  <Button
                    key={rating}
                    variant="outline"
                    className="flex items-center justify-center"
                    onClick={() => handleRating(rating)}
                  >
                    <Star className="mr-1 h-4 w-4 text-yellow-400" /> {rating}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex items-center space-x-2 pt-4 pb-6 md:pb-4">
          {
            camerayes == false ? 
            (
              <Button size="icon" variant="outline" className="shrink-0" disabled >
          <Camera className="h-6 w-6" />
        </Button>
            ):(
          <CameraUploader onImageUpload={handleImageUpload} />
          )}
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <Button size="icon" className="shrink-0" onClick={handleSend}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ChatbotUi;
function handleDiseaseSelection(input: string) {
  throw new Error('Function not implemented.');
}

