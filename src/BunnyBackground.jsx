import "./index.css";

const BunnyBackground = () => {
  // Responsive bunny count based on screen size
  const getBunnyCount = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) return 8; // Mobile
      if (window.innerWidth < 1024) return 12; // Tablet
      return 15; // Desktop
    }
    return 15;
  };

  const bunnyCount = getBunnyCount();

  // Generate random positions & delays for each bunny
  const bunnies = Array.from({ length: bunnyCount }, (_, index) => ({
    id: index,
    left: `${Math.random() * 100}%`,
    bottom: `${Math.random() * 100}%`,
    delay: `${Math.random() * 3}s`,
    duration: `${2 + Math.random() * 2}s`, // Variable animation duration
  }));

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
      aria-hidden="true"
    >
      {bunnies.map((bunny) => (
        <div
          key={bunny.id}
          className="bunny"
          style={{
            left: bunny.left,
            bottom: bunny.bottom,
            animationDelay: bunny.delay,
            animationDuration: bunny.duration,
          }}
        ></div>
      ))}
    </div>
  );
};

export default BunnyBackground;
