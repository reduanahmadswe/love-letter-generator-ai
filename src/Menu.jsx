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
  }, [name, menu === 2]);

  useEffect(() => {
    return () => {
      setMenu(1); // Reset when component unmounts
    };
  }, []);

  console.log("Name:", name);

  return (
    <header className="bg-inherit flex justify-center p-6 text-center w-xl sm:w-2xl">
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
          <p className="text-3xl">Enter your Name</p>
          {}
          <input
            placeholder="Enter name"
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
        <div>
          <div
            className="text-lg flex flex-row mb-4 cursor-pointer items-center"
            onClick={handleBackToMenu}
          >
            <LucideArrowLeft />
            back
          </div>

          <div className="flex-col flex gap-3">
            <h4 className="text-4xl font-semibold">
              Select the preferred Language
            </h4>
            <div className="flex-wrap justify-between ">
              <button
                className="bg-pink-500 text-white w-full h-12 cursor-pointer rounded-md hover:bg-pink-600 transition duration-300 ease-in-out  text-lg mb-4"
                onClick={() => handleLanguageSelection("en")}
              >
                English
              </button>
              <button
                className="bg-pink-500 text-white w-full h-12 cursor-pointer rounded-md hover:bg-pink-600 transition duration-300 ease-in-out  text-lg mb-4"
                onClick={() => handleLanguageSelection("yo")}
              >
                Yoruba
              </button>
              <button
                className="bg-pink-500 text-white w-full h-12 cursor-pointer rounded-md hover:bg-pink-600 transition duration-300 ease-in-out  text-lg mb-4"
                onClick={() => handleLanguageSelection("es")}
              >
                Spanish
              </button>
              <button
                className="bg-pink-500 text-white w-full h-12 cursor-pointer rounded-md hover:bg-pink-600 transition duration-300 ease-in-out  text-lg mb-4"
                onClick={() => handleLanguageSelection("ja")}
              >
                Japanese
              </button>
              <button
                className="bg-pink-500 text-white w-full h-12 cursor-pointer rounded-md hover:bg-pink-600 transition duration-300 ease-in-out text-lg mb-4"
                onClick={() => handleLanguageSelection("ko")}
              >
                Korean
              </button>
              <button
                className="bg-pink-500 text-white w-full h-12 cursor-pointer rounded-md hover:bg-pink-600 transition duration-300 ease-in-out  text-lg mb-4"
                onClick={() => handleLanguageSelection("fr")}
              >
                French
              </button>
              <button
                className="bg-pink-500 text-white w-full h-12 cursor-pointer rounded-md hover:bg-pink-600 transition duration-300 ease-in-out  text-lg"
                onClick={() => handleLanguageSelection("it")}
              >
                Italian
              </button>
              <button
                className="bg-pink-500 text-white w-full h-12 cursor-pointer rounded-md hover:bg-pink-600 transition duration-300 ease-in-out  text-lg mb-4"
                onClick={() => handleLanguageSelection("bn")}
              >
                Bangla
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
