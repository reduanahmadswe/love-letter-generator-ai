import { Route, Routes } from "react-router-dom";
import BunnyBackground from "./BunnyBackground";
import Menu from "./Menu";
//mport { useState, useEffect } from "react";
//import { useNavigate } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { ToastContainer } from "react-toastify";
import DisplayMessage from "./DisplayMessage";

const App = () => {
  //const [countdownFinished, setCountdownFinished] = useState(false);
  //const navigate = useNavigate();

  {
    /* useEffect(() => {
    if (countdownFinished) {
      navigate("/"); // Redirects after countdown
    }
  }, [countdownFinished, navigate]); */
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Bunny Background */}
      <BunnyBackground />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastClassName="text-sm"
      />

      {/* Main Content with responsive container */}
      <main className="relative z-10 container min-h-screen flex items-center justify-center py-8">
        <div className="w-full max-w-4xl">
          <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/displaymessage" element={<DisplayMessage />} />
          </Routes>
        </div>
      </main>

      <Analytics />
    </div>
  );
};

export default App;
