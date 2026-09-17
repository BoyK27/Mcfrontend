import React, { useState, useEffect, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { assets } from "../assets/assets.js";
import { shopContext } from "../context/shopContext";

const NAV_LINKS = [
  { path: "/", label: "Home" },
  { path: "/collection", label: "Maine Coons" },
  { path: "/about", label: "About Us" },
  { path: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { setShowSearch, getCartCount } = useContext(shopContext);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setVisible(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setVisible(false);
    };

    if (visible) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [visible]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#191C1E]/95 backdrop-blur-md shadow-md shadow-black/20 py-3 border-b border-[#F4EFEB]/10"
          : "bg-[#191C1E] py-4 border-b border-[#F4EFEB]/10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 flex items-center justify-between gap-3 sm:gap-4 font-medium">
        {/* Brand Identity */}
        <Link to="/" className="min-w-0 flex-1 group">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex min-w-0 items-center gap-3 cursor-pointer"
          >
            {/* Lynx-eared Maine Coon Silhouette Icon */}
            <div className="w-10 h-10 min-w-10 shrink-0 rounded-xl bg-[#C87A3E] flex items-center justify-center shadow-md shadow-[#C87A3E]/20 transition-transform duration-200">
              <svg
                className="w-5 h-5 text-[#191C1E] fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4.5 3.75a.75.75 0 0 0-1.2.68l1.35 6.74C3.6 12.8 3 14.82 3 17c0 3.31 4.03 6 9 6s9-2.69 9-6c0-2.18-.6-4.2-1.65-5.83l1.35-6.74a.75.75 0 0 0-1.2-.68L16.2 6.94C14.87 6.34 13.47 6 12 6s-2.87.34-4.2.94L4.5 3.75z" />
              </svg>
            </div>

            <div className="min-w-0 flex flex-col">
              <span className="block truncate whitespace-nowrap text-[clamp(0.75rem,3.2vw,1.15rem)] font-black tracking-tight text-[#F4EFEB] leading-none">
                BRYCE PET <span className="text-[#C87A3E]">STOP</span>
              </span>
              <span className="hidden sm:block text-[10px] font-medium text-[#F4EFEB]/60 uppercase tracking-widest leading-tight mt-1">
                Ethical Cattery & Sanctuary
              </span>
            </div>
          </motion.div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide text-[#F4EFEB]/80">
          {NAV_LINKS.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `relative py-1.5 transition-colors duration-150 hover:text-[#C87A3E] ${
                  isActive ? "text-[#C87A3E] font-bold" : ""
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span>{label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C87A3E] rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 35,
                      }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User Controls */}
        <div className="shrink-0 flex items-center gap-1 sm:gap-4">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setShowSearch(true)}
            className="shrink-0 p-2 rounded-lg hover:bg-[#F4EFEB]/10 text-[#F4EFEB]/90 hover:text-[#F4EFEB] transition-colors cursor-pointer"
            aria-label="Search kittens and supplies"
          >
            <img
              src={assets.search_icon}
              alt="Search Icon"
              className="w-5 h-5 brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
            />
          </motion.button>

          <Link to="/card" className="shrink-0">
            <motion.div
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="relative p-2 rounded-lg hover:bg-[#F4EFEB]/10 text-[#F4EFEB]/90 hover:text-[#F4EFEB] transition-colors block cursor-pointer"
              aria-label="View Adoption Inquiries"
            >
              <img
                src={assets.cart_icon}
                className="w-5 h-5 min-w-5 brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
                alt="Cart Icon"
              />
              <AnimatePresence>
                {getCartCount() > 0 && (
                  <motion.span
                    key={getCartCount()}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                    className="absolute top-0.5 right-0.5 transform translate-x-1 -translate-y-1 bg-[#C87A3E] text-[#191C1E] font-black text-[10px] w-4.5 h-4.5 flex items-center justify-center rounded-full ring-2 ring-[#191C1E] shadow-sm"
                  >
                    {getCartCount()}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </Link>

          {/* Mobile Menu Trigger */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setVisible(true)}
            className="shrink-0 p-2 rounded-lg text-[#F4EFEB] hover:bg-[#F4EFEB]/10 active:bg-[#F4EFEB]/15 transition-colors md:hidden flex items-center justify-center cursor-pointer"
            aria-label="Open mobile menu"
          >
            {assets.menu_icon ? (
              <img
                src={assets.menu_icon}
                className="w-6 h-6 brightness-0 invert"
                alt="Menu Icon"
              />
            ) : (
              <svg
                className="w-6 h-6 stroke-[#F4EFEB]"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {visible && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setVisible(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 240 }}
              className="fixed inset-y-0 right-0 h-screen z-50 bg-[#191C1E] shadow-2xl w-4/5 max-w-sm flex flex-col md:hidden border-l border-[#F4EFEB]/10"
            >
              <div className="flex flex-col text-[#F4EFEB] h-full">
                <button
                  type="button"
                  onClick={() => setVisible(false)}
                  className="flex items-center gap-3 p-5 border-b border-[#F4EFEB]/10 w-full text-left hover:bg-[#F4EFEB]/5 transition-colors cursor-pointer"
                >
                  <img
                    src={assets.dropdown_icon}
                    className="h-4 w-4 rotate-180 brightness-0 invert opacity-80"
                    alt="Back arrow icon"
                  />
                  <span className="text-xs font-bold tracking-wider uppercase text-[#C87A3E]">
                    Close Menu
                  </span>
                </button>

                <nav className="flex flex-col py-3">
                  {NAV_LINKS.map(({ path, label }) => (
                    <NavLink
                      key={path}
                      onClick={() => setVisible(false)}
                      to={path}
                      className={({ isActive }) =>
                        `py-4 px-7 font-semibold tracking-wide border-l-4 transition-colors ${
                          isActive
                            ? "border-[#C87A3E] text-[#C87A3E] bg-[#C87A3E]/10"
                            : "border-transparent text-[#F4EFEB]/80 hover:text-[#F4EFEB] hover:bg-[#F4EFEB]/5"
                        }`
                      }
                    >
                      {label}
                    </NavLink>
                  ))}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
