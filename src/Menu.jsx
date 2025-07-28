import { motion } from "framer-motion";
import { LucideArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useValentineContext } from "./Context/ValentineContext";
import "./index.css";
import ValentineMenuButton from "./ValentineMenuButton";
import Welcome from "./Welcome";

export default function Menu() {
  const [menu, setMenu] = useState(1);
  const { setPreferredLanguage, name, setName } = useValentineContext();
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  const handleNextMenu = () => {
    setMenu((prev) => prev + 1);
  };

  const handleBackToMenu = () => {
    setMenu((prev) => prev - 1);
  };

  const handleLanguageSelection = (language) => {
    setPreferredLanguage(language);
    navigate("/displaymessage");
  };

  const handleNextPage = () => {
    if (!name) {
      toast.error("Please Enter your Name");
    } else {
      handleNextMenu();
    }
  };

  useEffect(() => {
    if (!name || menu === 2) {
      setIsClicked(false);
    } else {
      setIsClicked(true);
    }
  }, [name, menu]);

  useEffect(() => {
    return () => {
      setMenu(1); // Reset when component unmounts
    };
  }, []);

  console.log("Name:", name);

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      {menu === 1 && (
        <div className="w-full">
          <Welcome />

          <motion.h1
            className="text-4xl font-bold text-pink-600 mb-10 font-['Times New Roman'] w-full mt-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Welcome to LoveFromTheDeep
          </motion.h1>
          <div>
            <ValentineMenuButton
              text={"Set Sail"}
              onClick={handleNextMenu}
              isClicked={isClicked}
              setIsClicked={setIsClicked}
            />
          </div>
        </div>
      )}

      {menu === 2 && (
        <div className="w-full">
          <p className="text-3xl">Who’s your secret love?</p>
          {}
          <input
            placeholder="Who’s your secret love?"
            value={name}
            className="w-full p-3 rounded-lg bg-transparent text-black hover:bg-slate-50 shadow-md focus:outline-none mb-5"
            autoComplete="off"
            required
            onChange={(e) => setName(e.target.value)}
            name="Username"
          />
          <ValentineMenuButton
            text={"Next"}
            onClick={handleNextPage}
            isClicked={isClicked}
            setIsClicked={setIsClicked}
          />
        </div>
      )}

      {menu === 3 && (
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.button
            className="flex items-center gap-2 text-responsive-lg text-pink-700 hover:text-pink-800 transition-colors duration-200 touch-target"
            onClick={handleBackToMenu}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            aria-label="Go back to previous step"
          >
            <LucideArrowLeft className="w-5 h-5" />
            Back
          </motion.button>

          <motion.div
            className="text-center space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-responsive-3xl font-semibold text-pink-700">
              Select Your Preferred Language
            </h4>

            <div className="grid grid-cols-1 grid-cols-sm-2 gap-4 max-w-md mx-auto">
              {[
                { code: "en", name: "English", flag: "🇺🇸" },
                { code: "bn", name: "বাংলা", flag: "🇧🇩" },
                { code: "es", name: "Español", flag: "🇪🇸" },
                { code: "ja", name: "日本語", flag: "🇯🇵" },
                { code: "ko", name: "한국어", flag: "🇰🇷" },
                { code: "fr", name: "Français", flag: "🇫🇷" },
                { code: "it", name: "Italiano", flag: "🇮🇹" },
                { code: "yo", name: "Yorùbá", flag: "🇳🇬" },
              ].map((lang, index) => (
                <motion.button
                  key={lang.code}
                  className="bg-gradient-to-r from-pink-500 to-pink-600 text-white touch-target rounded-xl hover:from-pink-600 hover:to-pink-700 transition-all duration-300 ease-in-out text-responsive-base font-medium shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  onClick={() => handleLanguageSelection(lang.code)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label={`Select ${lang.name} language`}
                >
                  <span className="text-lg">{lang.flag}</span>
                  <span>{lang.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
