/* eslint-disable react/prop-types */
import { Heart } from "lucide-react";

const ValentineMenuButton = ({ onClick, text, setIsClicked, isClicked }) => {
  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      onClick();
    }, 500); // Delay the onClick callback to allow the animation to complete
  };

  // Dependency on name

  return (
    <button
      className={`relative bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-pink-300 focus:ring-opacity-50 overflow-hidden cursor-pointer shadow-lg hover:shadow-xl touch-target ${
        isClicked ? "w-12 h-12" : "w-full max-w-xs mx-auto h-14"
      }`}
      onClick={handleClick}
      disabled={isClicked}
      aria-label={isClicked ? "Processing..." : text}
    >
      <div
        className={`flex items-center justify-center transition-all duration-300 ease-in-out ${
          isClicked ? "scale-0" : "scale-100"
        }`}
      >
        <Heart
          className={`w-6 h-6 ${
            isClicked ? "animate-none" : "animate-heartbeat"
          }`}
        />
        <span
          className={`transition-opacity duration-300 ease-in-out font-medium ml-2 text-responsive-lg ${
            isClicked ? "opacity-0" : "opacity-100"
          }`}
        >
          {text}
        </span>
      </div>
      {isClicked && (
        <Heart
          className="w-6 h-6 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse"
          fill="white"
        />
      )}
    </button>
  );
};

export default ValentineMenuButton;
