import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

// Container variant to handle staggered animations for children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

// Item variant for smooth fade-in and slide-up entrance
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const HERO_IMAGE =
  "https://imgs.search.brave.com/2AOdtTcTjJvrVcYmCUUzaG3IQ9pft-gmfAYZk0KKcFk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9tYWlu/ZS1jb29uLWNhdC1i/bGFjay1iYWNrZ3Jv/dW5kLW1haW5lLWNv/b24tY2F0LWJsYWNr/LWJhY2tncm91bmQt/Y2xvc2UtdXAtdmll/dy0xMjQyOTEyNjku/anBn";

const Hero = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="my-6 rounded-3xl p-8 sm:p-12 md:p-16 shadow-2xl relative overflow-hidden transition-all duration-300 min-h-130 flex items-center border border-[#F4EFEB]/10 bg-[#191C1E]"
    >
      {/* Background Image: Maine Coon on dark background aligned right */}
      <img
        src={HERO_IMAGE}
        alt="Majestic Maine Coon Cat"
        className="absolute inset-0 w-full h-full object-cover object-right sm:object-[center_right] select-none pointer-events-none"
        loading="eager"
      />

      {/* 3-Color Adaptive Gradient: Blends dark background seamlessly with text area */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#191C1E] via-[#191C1E]/90 sm:via-[#191C1E]/75 to-[#191C1E]/30" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-2xl flex flex-col items-start space-y-6"
      >
        {/* Breed Tagline */}
        <motion.div variants={itemVariants} className="flex items-center gap-3">
          <span className="w-8 md:w-10 h-[2px] bg-[#C87A3E]"></span>
          <p className="font-bold text-xs md:text-sm tracking-widest text-[#C87A3E] uppercase">
            ETHICAL CATTERY · GENTLE GIANTS · DNA TESTED
          </p>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="prata-regular text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight tracking-tight text-[#F4EFEB]"
        >
          Welcome Home A <br />
          <span className="text-[#C87A3E] font-medium">Gentle Giant</span>{" "}
          Today.
        </motion.h1>

        {/* Descriptive Copy */}
        <motion.p
          variants={itemVariants}
          className="text-[#F4EFEB]/80 text-sm sm:text-base leading-relaxed font-normal max-w-xl"
        >
          Known for their lion-like ruffs, lynx-tipped ears, and dog-like
          devotion. All kittens are raised in-home underfoot, vet-cleared, and
          tested clear of HCM, SMA, and PKDef.
        </motion.p>

        {/* Contact Badges */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center gap-3"
        >
          {/* Availability Status */}
          <div className="flex items-center gap-2.5 bg-[#191C1E]/85 border border-[#F4EFEB]/15 px-3.5 py-2 rounded-2xl text-xs sm:text-sm text-[#F4EFEB] backdrop-blur-sm shadow-sm">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C87A3E] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#C87A3E]"></span>
            </span>
            <span className="font-medium text-[#F4EFEB]/90">
              Kittens Available
            </span>
          </div>

          {/* WhatsApp Direct Link */}
          <a
            href="https://wa.me/19128453708"
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 bg-[#191C1E]/90 hover:bg-[#191C1E] text-[#F4EFEB] font-medium text-xs sm:text-sm px-3.5 py-2 rounded-2xl shadow-sm border border-[#F4EFEB]/15 hover:border-[#C87A3E]/60 transition-all cursor-pointer"
            >
              <svg className="w-4 h-4 fill-[#C87A3E]" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
              </svg>
              <span>+1 (912) 845-3708</span>
            </motion.div>
          </a>

          {/* TikTok Profile Link */}
          <a
            href="https://www.tiktok.com/@bryces.pet.stop"
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 bg-[#191C1E]/90 hover:bg-[#191C1E] text-[#F4EFEB] font-medium text-xs sm:text-sm px-3.5 py-2 rounded-2xl shadow-sm border border-[#F4EFEB]/15 hover:border-[#C87A3E]/60 transition-all cursor-pointer"
            >
              <svg className="w-4 h-4 fill-[#C87A3E]" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 003.05 15.7 6.34 6.34 0 009.38 22a6.34 6.34 0 006.33-6.33V9.3a8.16 8.16 0 004.88 1.6V7.45a4.85 4.85 0 01-1-.76z" />
              </svg>
              <span>@bryces.pet.stop</span>
            </motion.div>
          </a>
        </motion.div>

        {/* Primary CTA */}
        <motion.div variants={itemVariants} className="pt-2">
          <Link to="/collection">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center gap-3 bg-[#C87A3E] hover:bg-[#b86d34] text-[#191C1E] font-bold text-xs md:text-sm tracking-widest uppercase px-8 py-4 rounded-xl shadow-md transition-all duration-200 cursor-pointer"
            >
              <span>Explore Maine Coons</span>
              <motion.svg
                className="w-5 h-5 text-[#191C1E]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </motion.svg>
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Hero;
