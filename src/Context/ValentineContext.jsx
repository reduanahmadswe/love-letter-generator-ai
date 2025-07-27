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
      return;
    }

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${
          import.meta.env.VITE_GEMINI_API_KEY
        }`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Dear Gemini, craft a deeply romantic and poetic love letter for ${name}, written from the perspective of someone who has loved them in silence for a long time but finally finds the courage to speak their heart.

🌹 Format Instructions:
- Structure the letter in **short, poetic paragraphs** with **double line breaks (\\n\\n)** to suit website display.
- Keep the total length around **150–200 words** to ensure it fits beautifully on a single PDF page.
- Use **elegant, poetic language** that feels timeless and sincere — like a handwritten letter kept in a drawer for years.

💘 Content Requirements:
- Begin with a soft introduction, like a quiet confession under the stars.
- Express how long the writer has admired ${name} from afar — in class, in passing hallways, in shared glances.
- Use rich metaphors like:  
  “You are the sunrise I wait for every day, even when it rains.”  
  “Your smile is the melody I’ve been trying to hum since forever.”
- Mention how the writer’s heart beats louder whenever ${name} speaks their name.
- Share a memory or moment where love nearly escaped their lips — but fear held it back.
- Gently confess: “This letter is my courage wrapped in words.”

🌙 End with a warm and heartfelt farewell — not desperate, but hopeful — like:
  “If nothing else, let this letter be a gentle truth: someone out there loves you with quiet fire.”

🌐 Language Instructions:
Write the **entire letter** in ${
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
If a language other than English is selected, do not use any English at all.  
Translate romantic expressions in a culturally appropriate and naturally poetic way.  
Let the letter sound like someone baring their heart on a quiet night, longing to be seen and loved in return.


                    `,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await response.json();

      const aiResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (aiResponse) {
        setMessages([{ role: "bot", content: aiResponse }]); // Replace previous message
      } else {
        console.error("Invalid API response:", data);
      }
    } catch (error) {
      console.error("Error fetching message:", error);
    }
  };

  return (
    <ValentineContext.Provider
      value={{ messages, fetchMessage, setPreferredLanguage, name, setName }}
    >
      {children}
    </ValentineContext.Provider>
  );
};
