import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useValentineContext } from "./Context/ValentineContext";
import { generatePirateLetterPDF } from "./utils/pdfGenerator";

const DisplayMessage = () => {
  const { name, messages, fetchMessage, preferredLanguage } =
    useValentineContext();
  const [loading, setLoading] = useState(true); // State for loading
  const [response, setResponse] = useState(null); // State for Yes/No answer
  const [downloadingPDF, setDownloadingPDF] = useState(false); // State for PDF download
  const navigate = useNavigate();

  // PDF Download function
  const handleDownloadPDF = async () => {
    if (!messages.length || !name) return;

    setDownloadingPDF(true);
    try {
      await generatePirateLetterPDF(
        name,
        messages[0].content,
        preferredLanguage
      );
      // You could add a success toast here
    } catch (error) {
      console.error("Failed to generate PDF:", error);
      // You could add an error toast here
    } finally {
      setDownloadingPDF(false);
    }
  };

  useEffect(() => {
    const getMessage = async () => {
      setLoading(true); // Start loading
      await fetchMessage(); // Fetch AI-generated message
      setLoading(false); // Stop loading
    };

    if (name) {
      getMessage();
    }
  }, [name, fetchMessage]); // Fetch message when `name` changes

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-pink-50 via-red-50 to-orange-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl w-full text-center bg-white p-8 rounded-2xl shadow-2xl border border-amber-100"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 80%, rgba(255, 218, 185, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 182, 193, 0.1) 0%, transparent 50%)",
        }}
      >
        <h1 className="text-xl md:text-2xl font-semibold text-red-500">
          {name && `Dear ${name},`}
        </h1>

        {loading ? (
          <div className="flex flex-col items-center justify-center mt-8 mb-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mb-4"></div>
            <p className="text-pink-600 animate-pulse text-lg font-medium">
              🏴‍☠️ Crafting your pirate love letter...
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Captain Tony is writing with his best quill!
            </p>
          </div>
        ) : messages.length > 0 ? (
          <div className="mt-6 mb-6">
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-lg p-6 shadow-inner relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-5 bg-repeat"
                style={{
                  backgroundImage:
                    'url(\'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"%3E%3Cg fill="%23D2691E" fill-opacity="0.1"%3E%3Cpath d="M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z"/%3E%3C/g%3E%3C/svg%3E\')',
                }}
              ></div>

              <div className="text-center mb-4 relative z-10">
                <h3 className="text-amber-800 font-bold text-lg mb-2">
                  🗺️ Ancient Love Letter 🗺️
                </h3>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
              </div>

              <div className="relative z-10">
                <div
                  className="text-amber-900 leading-relaxed text-base md:text-lg font-medium whitespace-pre-line text-left bg-amber-25 p-4 rounded border border-amber-200"
                  style={{
                    fontFamily: "'Times New Roman', Times, serif",
                    textShadow: "0.5px 0.5px 1px rgba(139, 69, 19, 0.1)",
                    lineHeight: "1.8",
                    backgroundColor: "rgba(254, 243, 199, 0.3)",
                  }}
                >
                  {messages[0].content}
                </div>
              </div>

              <div className="absolute top-2 left-2 text-amber-600 opacity-50 text-lg">
                ⚓
              </div>
              <div className="absolute top-2 right-2 text-amber-600 opacity-50 text-lg">
                🦜
              </div>
              <div className="absolute bottom-2 left-2 text-amber-600 opacity-50 text-lg">
                💀
              </div>
              <div className="absolute bottom-2 right-2 text-amber-600 opacity-50 text-lg">
                ⚔️
              </div>
            </div>

            <div className="mt-4 text-center">
              <p className="text-amber-700 font-semibold italic text-lg">
                ~ Captain Toothless Tony the Cursed 🏴‍☠️
              </p>
              <div className="flex justify-center items-center mt-2 space-x-2">
                <span className="text-amber-600">⭐</span>
                <span className="text-xs text-amber-600 font-medium">
                  Written on a soggy treasure map
                </span>
                <span className="text-amber-600">⭐</span>
              </div>

              {/* PDF Download Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownloadPDF}
                disabled={downloadingPDF}
                className="mt-6 bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out flex items-center gap-2 mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {downloadingPDF ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Creating Treasure...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    <span>Download as Treasure Map</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>
        ) : (
          <div className="mt-8 mb-8 text-center">
            <div className="text-6xl mb-4">🏴‍☠️</div>
            <p className="text-gray-500 text-lg">
              No treasure map found yet...
            </p>
            <p className="text-gray-400 text-sm mt-2">
              The pirate hasn&apos;t started writing!
            </p>
          </div>
        )}

        {/* "Will you sail with me?" Section */}
        {!loading && messages.length > 0 && !response && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 bg-gradient-to-r from-pink-100 to-red-100 p-6 rounded-xl border-2 border-pink-200 shadow-lg"
          >
            <div className="text-center mb-6">
              <div className="text-4xl mb-2">🌊⚓</div>
              <p className="text-xl md:text-2xl font-bold text-red-600 mb-2">
                Will you sail with me across the seven seas?
              </p>
              <p className="text-pink-600 text-sm">
                Captain Tony awaits your answer from the deep...
              </p>
            </div>
            <div className="flex flex-col md:flex-row justify-center gap-6 mt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-8 py-3 rounded-full transition-all duration-300 ease-in-out hover:shadow-lg cursor-pointer font-semibold text-lg flex items-center justify-center gap-2"
                onClick={() => setResponse("yes")}
              >
                <span>Aye! Set sail! ⛵�</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-gray-400 to-gray-500 text-white px-8 py-3 rounded-full transition-all duration-300 ease-in-out hover:shadow-lg cursor-pointer font-semibold text-lg flex items-center justify-center gap-2"
                onClick={() => setResponse("no")}
              >
                <span>Nay, landlubber! 🏴‍☠️</span>
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Response Message */}
        {response === "yes" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6 bg-gradient-to-r from-green-100 to-emerald-100 p-6 rounded-xl border-2 border-green-200 text-center"
          >
            <div className="text-5xl mb-3">🎉⛵🎉</div>
            <p className="text-green-600 font-bold text-xl mb-2">
              Ahoy! Welcome aboard, matey!
            </p>
            <p className="text-green-500 text-lg">
              Captain Tony is dancing with joy! 🏴‍☠️�
            </p>
          </motion.div>
        )}
        {response === "no" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6 bg-gradient-to-r from-gray-100 to-slate-100 p-6 rounded-xl border-2 border-gray-200 text-center"
          >
            <div className="text-6xl mb-3">🌊�</div>
            <p className="text-gray-600 font-bold text-2xl mb-2">
              The tides have turned...
            </p>
            <p className="text-gray-500 text-lg">
              The captain will sail alone through stormy waters... ⛈️🚢
            </p>
          </motion.div>
        )}
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer flex items-center gap-2"
        onClick={() => navigate("/")}
      >
        <span>⬅️</span>
        <span>Back to Harbor</span>
      </motion.button>
    </div>
  );
};

export default DisplayMessage;
