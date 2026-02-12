import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Play, Image, Music, Lock, ArrowRight, Check, X, ArrowLeft } from "lucide-react";
import "./App.css";

// ⚠️ CONFIRM FILES IN /public FOLDER:
const MEDIA = {
  audio: "/song.mp3",
  video: "/video.mp4",
  images: ["/pic1.jpg", "/pic2.jpg", "/pic3.jpg", "/pic4.jpg", "/pic5.jpg"]
};

export default function App() {
  const [step, setStep] = useState(0); // 0: Lock Screen, 1: Message, 2: Gallery, 3: Video, 4: Proposal
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  
  // Auto-play audio on first unlock
  const handleUnlock = () => {
    setStep(1);
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="ios-container">
      {/* Back button shown on all screens except lock (step 0) */}
      {step > 0 && (
        <button className="back-btn" onClick={() => setStep((s) => Math.max(0, s - 1))} aria-label="Back">
          <ArrowLeft size={18} />
        </button>
      )}
      {/* --- STATUS BAR (Fake) --- */}
      <div className="status-bar">
        <span>15:00</span>
        <div className="status-icons">
          <Music size={14} className={isPlaying ? "spin" : ""} />
          <span>5G</span>
          <div className="battery"></div>
        </div>
      </div>

      <audio ref={audioRef} loop src={MEDIA.audio} />

      {/* --- CONTENT AREA --- */}
      <div className="app-content">
        <AnimatePresence mode="wait">
          
          {/* SCREEN 0: LOCK SCREEN (Notification) */}
          {step === 0 && (
            <motion.div 
              key="lock"
              className="screen lock-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
            >
              <div className="clock">
                <h1>15:00</h1>
                <p>Friday, February 13</p>
              </div>

              <motion.div 
                className="notification-card"
                onClick={handleUnlock}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="notif-icon">
                  <Heart size={20} fill="#ff3b30" color="#ff3b30" />
                </div>
                <div className="notif-content">
                  <div className="notif-header">
                    <span>Valentine</span>
                    <span className="time">Now</span>
                  </div>
                  <p>You have a new encrypted message.</p>
                </div>
              </motion.div>

              <div className="unlock-hint">Tap notification to open</div>
            </motion.div>
          )}

          {/* SCREEN 1: THE LETTER (Dark Mode Chat Style) */}
          {step === 1 && (
            <motion.div 
              key="letter"
              className="screen letter-screen"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-20%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="header">
                <h2>Baby</h2>
              </div>
              
              <div className="scroll-area">
                <div className="bubble received">
                  <p>Wasup babyyyy! Happy 2nd valentines day to you baby!</p>
                </div>
                <div className="bubble received delay-1">
                  <p>First of all, social no may pa ganon hehe. been sitting here at the desk trying to find them right words, but everytime i think i always see you, all about you baby. ganon na ba ako ka adik sayo?? as i look back at the wonderful times of us being together, all the happy moments, silly laughters, roadtrips, kulitan moments, smoke sessions and endless ngihts, hayyy how lucky i am for being with you. heeh sorry baby eto lang kinayanan ko, seems like no effort no huhuhuhu. but yeahhhh i am always grateful and blessed to have you in my life. I promise you that i always will give you everything and will spoil you later in life mwhehehe malapit namu girl. Thank you for always supporting me. I LOVE YOU SO MUCH BABY!
                    </p>
                </div>
                <div className="bubble received delay-2">
                  <p>Thank you for being my wife, baby, bestfriend, mommy, classmate and my everything!
                  </p>
                </div>
                <div className="bubble received delay-3">
                  <p>The world thinks clouds are there to hide the sun, but I look up and see you. A proof that no matter how dark or heavy the shape, you can take the grey and burn it into the most beautiful light the sky has ever seen.</p>
                </div>
              </div>

              <div className="bottom-action">
                <button className="ios-btn primary" onClick={() => setStep(2)}>
                  View Attachments <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          )}

          {/* SCREEN 2: GALLERY (Instagram Story Style) */}
          {step === 2 && (
            <motion.div 
              key="gallery"
              className="screen gallery-screen"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-20%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="header">
                <h2>Memories</h2>
                <span className="subtitle">{MEDIA.images.length} Photos</span>
              </div>

              <div className="grid-gallery">
                {MEDIA.images.map((img, i) => (
                  <motion.div 
                    key={i} 
                    className={`grid-item item-${i}`}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img src={img} alt="us" />
                  </motion.div>
                ))}
              </div>

              <div className="bottom-action">
                <button className="ios-btn primary" onClick={() => setStep(3)}>
                  Watch Video <Play size={18} />
                </button>
              </div>
            </motion.div>
          )}

          {/* SCREEN 3: VIDEO PLAYER */}
          {step === 3 && (
            <motion.div 
              key="video"
              className="screen video-screen"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="video-container">
                <video controls autoPlay playsInline className="app-video">
                  <source src={MEDIA.video} type="video/mp4" />
                </video>
              </div>
              
              <div className="video-overlay">
                <h3>sabog moments</h3>
                <button className="ios-btn blur" onClick={() => setStep(4)}>
                  Click here or click mo?
                </button>
              </div>
            </motion.div>
          )}

          {/* SCREEN 4: PROPOSAL (Action Sheet) */}
          {step === 4 && (
            <motion.div 
              key="proposal"
              className="screen proposal-screen"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ type: "spring", damping: 20 }}
            >
              <div className="avatar-circle">
                <img src={MEDIA.images[0]} alt="Me" />
                <div className="heart-badge">❤️</div>
              </div>

              <div className="proposal-content">
                <h1>Will you be My Valentine baby??</h1>
                <p>Lets go on a date tonight at 8:30pm at Smoki Moto</p>
                
                <div className="action-buttons">
                  <button className="ios-btn big-yes" onClick={() => alert("Sarap tapos kantutan mamayang kauwi rawrrr! 🥂")}>
                    Yes, absolutely <Check size={20} />
                  </button>
                  <button className="ios-btn ghost">
                    pag napindot po to it means no aray koh!
                  </button>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* --- HOME INDICATOR --- */}
      <div className="home-indicator"></div>
      
      {/* Music Toggle Floating Button */}
      <button className="music-fab" onClick={toggleMusic}>
        {isPlaying ? <Music size={20} /> : <X size={20} />}
      </button>
    </div>
  );
}