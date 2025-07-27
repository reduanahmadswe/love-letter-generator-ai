import BunnyBackground from "./BunnyBackground";
import Menu from "./Menu";
import { Route, Routes } from "react-router-dom";
//mport { useState, useEffect } from "react";
//import { useNavigate } from "react-router-dom";
import DisplayMessage from "./DisplayMessage";
import { ToastContainer } from "react-toastify";
import { Analytics } from "@vercel/analytics/react"


const App = () => {
  //const [countdownFinished, setCountdownFinished] = useState(false);
  //const navigate = useNavigate();

 {/* useEffect(() => {
    if (countdownFinished) {
      navigate("/"); // Redirects after countdown
    }
  }, [countdownFinished, navigate]); */}

  return (
    <div className="relative min-h-screen overflow-hidden px-4 md:px-10 my-auto">
      {/* Bunny Background */}
      <BunnyBackground />
      <ToastContainer />

      {/* Main Content */}
      {/*{!countdownFinished ? (
        <CountdownTimer onComplete={() => setCountdownFinished(true)} />
      ) : (
        
      )} */}

      <main className="relative z-10 flex justify-center items-center min-h-screen">
          <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/displaymessage" element={<DisplayMessage />} />
           
          </Routes>
        </main> 

        <Analytics/>
    </div>
  );
};

export default App;
