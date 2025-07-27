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
                    text: `Ahoy, Gemini! Write an outrageously funny and romantic love letter to ${name}, from their past life as a legendary pirate captain named "Toothless Tony the Cursed." 

🧭 Format the letter with line breaks between paragraphs and short sentences so it reads like an actual pirate letter — dramatic, funny, and easy to display on a website.

The letter must:
- Be written on the back of a soggy treasure map.
- Include dramatic pirate slang (e.g. "Ye be the jellyfish in me jello").
- Mention a jealous parrot named "Screech" who tried to steal ${name}'s heart.
- Complain about losing a wooden leg in a swordfight with a mermaid (named Debra).
- Refer to an ancient sea curse that makes the pirate fall in love every time they sneeze.
- And describe ${name}'s beauty using completely ridiculous comparisons (e.g. "Yer smile's brighter than a lantern strapped to a narwhal at midnight").

Make the pirate sound emotionally unstable but wildly romantic. The tone should be overly poetic, soaked in rum, and just slightly unhinged.

🎭 End the letter with a dramatic pirate breakup and a poetic toast:  
"To cursed love, missing limbs, and the one that got away — both the fish and ye, ${name}."

IMPORTANT LANGUAGE INSTRUCTIONS:
- Write the ENTIRE letter in ${
                      preferredLanguage === "bn"
                        ? "Bengali/Bangla"
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
                    } language.
- DO NOT use English if another language is requested.
- Adapt pirate slang to work naturally in the target language.
- Keep cultural context appropriate for the language while maintaining the humorous pirate theme.

Keep the letter exactly around 200 words in the specified language.  
Add line breaks (\\n\\n) for each new paragraph to make it easy to display beautifully on a website.`,
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
