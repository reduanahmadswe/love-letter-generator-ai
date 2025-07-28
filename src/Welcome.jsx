import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const messages = [
  "Ahoy Matey! 🏴‍☠️",
  "Hello Beautiful! 💕",
  "Greetings! 🌹",
  "Welcome Aboard! ⚓",
];

const Welcome = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center w-full p-4 bg-inherit overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.h1
          key={messages[index]}
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.8 }}
          transition={{
            duration: 0.8,
            type: "spring",
            stiffness: 100,
            damping: 10,
          }}
          className="text-white text-responsive-3xl md:text-responsive-4xl font-bold text-center leading-tight"
          style={{
            textShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
            background: "linear-gradient(135deg, #ff6b6b, #ff8e8e, #ffb3ba)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {messages[index]}
        </motion.h1>
      </AnimatePresence>
    </div>
  );
};

export default Welcome;
