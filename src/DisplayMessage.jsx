import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useValentineContext } from "./Context/ValentineContext";
import { generatePirateLetterPDF } from "./utils/pdfGenerator";

const DisplayMessage = () => {
  const { name, messages, fetchMessage, preferredLanguage } = useValentineContext();
  const [loading, setLoading] = useState(true);
  const [downloadingPDF, setDownloadingPDF] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getMessage = async () => {
      if (!name) return;
      setLoading(true);
      await fetchMessage();
      setLoading(false);
    };

    if (name && messages.length === 0) {
      getMessage();
    }
  }, [name]);

  const handleDownloadPDF = async () => {
    if (!messages.length || !name) return;
    setDownloadingPDF(true);
    try {
      await generatePirateLetterPDF(name, messages[0].content, preferredLanguage);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    } finally {
      setDownloadingPDF(false);
    }
  };

  const renderLetterContent = (text) => {
    const normalizedText = text.replace(/\\n/g, "\n");
    const paragraphs = normalizedText.split(/\n{2,}/);

    return paragraphs.map((para, idx) => (
      <p
        key={idx}
        style={{
          whiteSpace: "pre-wrap",
          marginBottom: "1.4em",
          fontSize: "1.125rem",
          lineHeight: "1.7",
          color: "#7b3f61",
          fontStyle: "italic",
          fontFamily: "'Georgia', serif",
          textAlign: "left",
          textShadow: "0 1px 2px rgba(255, 182, 193, 0.7)",
        }}
      >
        {para.trim()}
      </p>
    ));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-pink-100 via-rose-100 to-yellow-50 relative overflow-hidden">
      
      {/* Animated Watermark emojis */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "15%",
          left: "8%",
          fontSize: "11rem",
          color: "rgba(255, 105, 180, 0.12)",
          userSelect: "none",
          pointerEvents: "none",
          transform: "rotate(-18deg)",
          zIndex: 0,
          fontFamily: "Arial, sans-serif",
          whiteSpace: "nowrap",
          textShadow: "0 0 12px rgba(255, 105, 180, 0.25)",
        }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        💖 ✨ 🌹 💌 ✨ 💖
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl w-full bg-white rounded-3xl p-12 shadow-2xl border border-pink-200 relative z-10 cursor-default"
        style={{
          boxShadow: "0 12px 40px rgba(255, 182, 193, 0.4)",
          transition: "transform 0.3s ease",
        }}
        whileHover={{ scale: 1.02 }}
      >
        <h1
          className="text-4xl font-bold mb-8 text-pink-600 flex items-center justify-center gap-3"
          style={{ fontFamily: "'Brush Script MT', cursive", textShadow: "0 2px 5px rgba(219,112,147,0.8)" }}
        >
          {name && (
            <>
              💌 Dear <span className="underline decoration-pink-400">{name}</span>,
            </>
          )}
        </h1>

        {loading ? (
          <div className="flex flex-col items-center justify-center mt-16 mb-16">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-pink-400 mb-6"></div>
            <p className="text-pink-600 animate-pulse text-2xl font-semibold tracking-wide select-none">
              🏴‍☠️ Crafting your pirate love letter...
            </p>
            <p className="text-pink-400 text-base mt-2 font-light select-none">
              Captain Tony is writing with his finest quill! ✒️
            </p>
          </div>
        ) : messages.length > 0 && messages[0]?.content ? (
          <div className="mt-8 mb-8">
            <div
              className="bg-gradient-to-r from-pink-50 to-rose-100 border-2 border-pink-300 rounded-2xl p-10 shadow-inner relative overflow-hidden"
              style={{ fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, serif" }}
            >
              <div className="text-pink-700 leading-relaxed text-lg font-semibold text-left select-text">
                {renderLetterContent(messages[0].content)}
              </div>
            </div>

            <motion.button
              onClick={handleDownloadPDF}
              disabled={downloadingPDF}
              className="mt-10 bg-gradient-to-r from-pink-600 to-rose-700 text-white px-10 py-4 rounded-full font-semibold shadow-lg hover:shadow-2xl flex items-center gap-4 mx-auto transition-transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-pink-300"
              whileTap={{ scale: 0.95 }}
            >
              {downloadingPDF ? (
                <>
                  🔥 Creating Treasure...
                </>
              ) : (
                <>
                  <Download className="w-7 h-7" /> Download as Treasure Map
                </>
              )}
            </motion.button>
          </div>
        ) : (
          <div className="mt-16 mb-16 text-center text-pink-400 select-none">
            <div className="text-8xl mb-8 animate-pulse">💖</div>
            <p className="text-2xl font-light">No treasure map found yet...</p>
            <p className="text-sm mt-3">The pirate hasn&apos;t started writing! 🏴‍☠️</p>
          </div>
        )}

        <motion.button
          className="mt-14 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-4 rounded-full font-bold shadow-lg hover:scale-110 transition-transform focus:outline-none focus:ring-4 focus:ring-purple-300"
          onClick={() => navigate("/")}
          whileTap={{ scale: 0.95 }}
        >
          ⬅️ Back to Harbor
        </motion.button>
      </motion.div>
    </div>
  );
};

export default DisplayMessage;
