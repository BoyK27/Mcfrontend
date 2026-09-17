import React from "react";
import { assets } from "../assets/assets.js";
import { useLocation } from "react-router-dom";
import { shopContext } from "../context/shopContext";
import { motion, AnimatePresence } from "motion/react";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    React.useContext(shopContext);
  const [visible, setVisible] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    if (location.pathname.includes("collection")) {
      setShowSearch(true);
      setVisible(true);
    } else {
      setShowSearch(false);
    }
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {showSearch && visible && (
        <motion.div
          initial={{ opacity: 0, y: -15, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: -15, height: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="border-b border-slate-200/60 bg-slate-50/80 backdrop-blur-sm text-center py-4 px-4 shadow-inner flex items-center justify-center gap-3 overflow-hidden"
        >
          {/* Sleek Search Input Pill */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="flex items-center justify-center border border-slate-300 bg-white px-5 py-2.5 rounded-full w-full max-w-lg shadow-sm focus-within:ring-2 focus-within:ring-teal-500/20 focus-within:border-teal-500 focus-within:shadow-md transition-all duration-200"
          >
            <img
              src={assets.search_icon}
              className="w-4 h-4 opacity-50 mr-3"
              alt="Search"
            />
            <input
              type="text"
              className="flex-1 outline-none text-sm text-slate-800 placeholder-slate-400 bg-transparent"
              placeholder="Search for the best companions that best suits your homes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </motion.div>

          {/* Close Action Button */}
          <motion.button
            whileHover={{ scale: 1.15, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 350, damping: 20 }}
            onClick={() => setShowSearch(false)}
            className="p-2 rounded-full hover:bg-slate-200/60 transition-colors duration-150 cursor-pointer"
            aria-label="Close search"
          >
            <img
              src={assets.cross_icon}
              className="w-3.5 h-3.5 opacity-60 hover:opacity-100 transition-opacity"
              alt="Close"
            />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchBar;
