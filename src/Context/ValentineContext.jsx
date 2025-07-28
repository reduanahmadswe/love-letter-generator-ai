
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const ValentineContext = createContext();
export const useValentineContext = () => useContext(ValentineContext);

export const ValentineContextProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [preferredLanguage, setPreferredLanguage] = useState("en");
  const [name, setName] = useState("");

  const fetchMessage = async () => {
    if (!name) {
      console.error("Error: Name is required before generating a message.");
      return null;
    }

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
          "HTTP-Referer": window.location.origin,
          "X-Title": "Valentine Love Letter Generator",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-chat",
          messages: [
            {
              role: "system",
              content: "You are a poetic AI that writes heartfelt love letters.",
            },
            {
              role: "user",
              content: `Dear AI, craft a deeply romantic and poetic love letter for ${name}, written from the perspective of someone who has loved them in silence for a long time but finally finds the courage to speak their heart.

🌹 Format Instructions:
- Structure the letter in **short, poetic paragraphs** with **double line breaks (\\n\\n)**.
- Keep length around **150–200 words**.
- Use elegant, timeless, poetic language.

🌐 Language: Write entirely in ${
                preferredLanguage === "bn"
                  ? "Bengali"
                  : preferredLanguage === "en"
                  ? "English"
                  : preferredLanguage === "es"
                  ? "Spanish"
                  : preferredLanguage === "fr"
                  ? "French"
                  : preferredLanguage === "it"
                  ? "Italian"
                  : preferredLanguage === "ja"
                  ? "Japanese"
                  : preferredLanguage === "ko"
                  ? "Korean"
                  : preferredLanguage === "yo"
                  ? "Yoruba"
                  : preferredLanguage
              } only.

End warmly: “If nothing else, let this letter be a gentle truth: someone out there loves you with quiet fire.”`,
            },
          ],
        }),
      });

      const data = await response.json();
      const aiResponse = data?.choices?.[0]?.message?.content || null;

      if (aiResponse) {
        setMessages([{ role: "bot", content: aiResponse }]);
        return aiResponse;
      } else {
        console.error("Invalid API response:", data);
        return null;
      }
    } catch (error) {
      console.error("Error fetching message:", error);
      return null;
    }
  };

  return (
    <ValentineContext.Provider
      value={{ messages, fetchMessage, setPreferredLanguage, name, setName, preferredLanguage }}
    >
      {children}
    </ValentineContext.Provider>
  );
};
