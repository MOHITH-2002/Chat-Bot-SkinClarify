import ChatbotUi from "@/components/chatbot/chatbot-ui";

import Model from "@/components/chatbot/modelloading";
import { TextModel } from "@/components/chatbot/text/TextModel";


export default function Home() {
  return (
     <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">

      <ChatbotUi/>
    </main>
  );
}
