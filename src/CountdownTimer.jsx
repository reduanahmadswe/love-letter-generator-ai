import { useState, useEffect } from "react";


const CountdownTimer = ({ onComplete }) => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const targetDate = new Date(now.getFullYear(), 1, 14, 0, 0, 0); // Feb 14, 12:00 AM
    const difference = targetDate - now;

    if (difference <= 0) {
      onComplete(); // Trigger next step when countdown ends
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="countdown-container h-screen flex flex-col items-center justify-center p-4">
      <h2 className="countdown-title text-3xl md:text-5xl lg:text-6xl font-bold mb-6">Love arrives in...</h2>
      <div className="countdown-grid grid grid-cols-2 md:grid-cols-4 gap-6">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="countdown-box flex flex-col items-center justify-center p-6 bg-pink-200 rounded-lg shadow-md">
            <span className="countdown-number text-5xl md:text-6xl lg:text-7xl font-semibold">{value}</span>
            <span className="countdown-label text-base md:text-lg lg:text-xl">{unit}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer; 