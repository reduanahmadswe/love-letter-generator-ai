import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useValentineContext } from "./Context/ValentineContext";
import { generatePirateLetterPDF } from "./utils/pdfGenerator";

const DisplayMessage = () => {
  const { name, messages, fetchMessage, preferredLanguage } =
    useValentineContext();
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
      await generatePirateLetterPDF(
        name,
        messages[0].content,
        preferredLanguage
      );
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
        className="text-responsive-lg leading-relaxed mb-6 text-pink-700 font-medium"
        style={{
          whiteSpace: "pre-wrap",
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
    <div className="min-h-screen flex flex-col items-center justify-center container py-8 bg-gradient-to-br from-pink-100 via-rose-100 to-yellow-50 relative overflow-hidden">
      {/* Responsive Animated Watermark emojis */}
      <motion.div
        aria-hidden="true"
        className="absolute top-[15%] left-[8%] text-pink-200 opacity-20 select-none pointer-events-none z-0"
        style={{
          fontSize: "clamp(4rem, 15vw, 11rem)",
          transform: "rotate(-18deg)",
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
        className="max-w-4xl w-full bg-white/95 backdrop-blur-sm rounded-3xl p-6 md:p-12 shadow-2xl border border-pink-200 relative z-10"
        style={{
          boxShadow: "0 12px 40px rgba(255, 182, 193, 0.4)",
        }}
        whileHover={{ scale: 1.01 }}
      >
        <h1
          className="text-responsive-3xl md:text-responsive-4xl font-bold mb-8 text-pink-600 flex flex-col sm:flex-row items-center justify-center gap-3 text-center"
          style={{
            fontFamily: "'Brush Script MT', cursive",
            textShadow: "0 2px 5px rgba(219,112,147,0.8)",
          }}
        >
          {name && (
            <>
              <span className="text-2xl">💌</span>
              <span>
                Dear{" "}
                <span className="underline decoration-pink-400">{name}</span>,
              </span>
            </>
          )}
        </h1>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-pink-400 mb-6"></div>
            <p className="text-pink-600 animate-pulse text-responsive-xl font-semibold tracking-wide text-center">
              🏴‍☠️ Crafting your love letter...
            </p>
            <p className="text-pink-400 text-responsive-base mt-2 font-light text-center">
              Writing with the finest quill! ✒️
            </p>
          </div>
        ) : messages.length > 0 && messages[0]?.content ? (
          <div className="space-y-8">
            <div
              className="bg-gradient-to-r from-pink-50 to-rose-100 border-2 border-pink-300 rounded-2xl p-6 md:p-10 shadow-inner relative overflow-hidden"
              style={{
                fontFamily:
                  "'Palatino Linotype', 'Book Antiqua', Palatino, serif",
              }}
            >
              <div className="text-pink-700 leading-relaxed text-left">
                {renderLetterContent(messages[0].content)}
              </div>
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
              className="mt-6 bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out flex items-center gap-2 mx-auto disabled:opacity-50 disabled:cursor-not-allowed touch-target"
            >
              {downloadingPDF ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span className="text-responsive-base">Creating PDF...</span>
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  <span className="text-responsive-base">Download PDF</span>
                </>
              )}
            </motion.button>
          </div>
        ) : (
          <div className="py-16 text-center text-pink-400">
            <div className="text-6xl md:text-8xl mb-8 animate-pulse">💖</div>
            <p className="text-responsive-xl font-light">
              No love letter found yet...
            </p>
            <p className="text-responsive-sm mt-3">
              The writer hasn&apos;t started! 🏴‍☠️
            </p>
          </div>
        )}

        <motion.button
          className="mt-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white touch-target rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out flex items-center gap-2 mx-auto"
          onClick={() => navigate("/")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Go back to main menu"
        >
          <span>⬅️</span>
          <span className="text-responsive-base">Back to Harbor</span>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default DisplayMessage;
