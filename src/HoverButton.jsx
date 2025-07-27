import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";



const HoverButton = () => {
    const navigate = useNavigate();

    return (
      <div className="flex min-h-[20px] w-1/2 bg-inherit items-center justify-center px-4"
      role="button"
    tabIndex={0}>
        <SpotlightButton onClick={() => navigate('/next-page')} />
      </div>
    );
  };
  
  const SpotlightButton = ({ onClick }) => {
    const btnRef = useRef(null);
    const spanRef = useRef(null);
  
    useEffect(() => {
      const handleMouseMove = (e) => {
        const { width } = e.target.getBoundingClientRect();
        const offset = e.offsetX;
        const left = `${(offset / width) * 100}%`;
  
        spanRef.current.animate({ left }, { duration: 250, fill: "forwards" });
      };
  
      const handleMouseLeave = () => {
        spanRef.current.animate(
          { left: "50%" },
          { duration: 100, fill: "forwards" }
        );
      };
  
      const buttonElement = btnRef.current;
      buttonElement.addEventListener("mousemove", handleMouseMove);
      buttonElement.addEventListener("mouseleave", handleMouseLeave);
  
      return () => {
        buttonElement.removeEventListener("mousemove", handleMouseMove);
        buttonElement.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, []);
  
    return (
      <motion.button
        whileTap={{ scale: 0.985 }}
        ref={btnRef}
        className="relative w-full max-w-xs overflow-hidden rounded-lg bg-pink-500 px-4 py-3 text-lg font-medium text-white cursor-pointer shadow-lg"
        aria-label="Click to navigate"
        onClick={onClick}
      >
        <span className="pointer-events-none relative z-10 mix-blend-difference">
          Click Here!
        </span>
        <span
          ref={spanRef}
          className="pointer-events-none absolute left-[50%] top-[50%] h-32 w-32 -translate-x-[50%] -translate-y-[50%] rounded-full bg-slate-100"
        />
      </motion.button>
    );
  };


export default HoverButton
