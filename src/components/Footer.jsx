import React, { useContext } from "react";
import { shopContext } from "../context/shopContext";
import { FaWhatsapp, FaTiktok } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { motion } from "motion/react";

const Footer = () => {
  const { navigate } = useContext(shopContext);

  // Helper to scroll to top after navigation
  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mt-32 border-t border-[#191C1E]/10 bg-[#ECEBE8] pt-16 pb-8 overflow-hidden text-[#191C1E]"
    >
      {/* Main Footer Grid */}
      <div className="flex flex-col md:grid md:grid-cols-[2.5fr_1fr_1.2fr] gap-12 px-6 md:px-12 max-w-7xl mx-auto text-sm">
        {/* Left Column: Brand Identity, Bio & Socials */}
        <div className="flex flex-col gap-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex items-center gap-3 cursor-pointer w-fit"
            onClick={() => handleNavigation("/")}
          >
            {/* Lynx Silhouette Emblem */}
            <div className="bg-[#C87A3E] text-[#191C1E] p-2.5 rounded-xl shadow-sm flex items-center justify-center">
              <svg
                className="w-5 h-5 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4.5 3.75a.75.75 0 0 0-1.2.68l1.35 6.74C3.6 12.8 3 14.82 3 17c0 3.31 4.03 6 9 6s9-2.69 9-6c0-2.18-.6-4.2-1.65-5.83l1.35-6.74a.75.75 0 0 0-1.2-.68L16.2 6.94C14.87 6.34 13.47 6 12 6s-2.87.34-4.2.94L4.5 3.75z" />
              </svg>
            </div>

            {/* Brand Typography */}
            <div className="flex flex-col">
              <span className="font-black text-lg leading-tight tracking-tight text-[#191C1E]">
                BRYCE PET
              </span>
              <span className="text-[10px] font-bold tracking-widest text-[#C87A3E] uppercase">
                STOP & CATTERY
              </span>
            </div>
          </motion.div>

          <p className="w-full lg:max-w-md text-[#191C1E]/70 leading-relaxed text-xs sm:text-sm font-normal">
            Dedicated to raising healthy, well-socialized Maine Coon gentle
            giants. Every kitten is raised underfoot in our home nursery,
            certified with verified pedigrees, fully vet-checked, and
            DNA-screened clear of HCM, SMA, and PKDef.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-3 mt-2">
            <a
              href="https://wa.me/19128453708"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-[#191C1E] text-[#ECEBE8] hover:bg-[#C87A3E] hover:text-[#191C1E] transition-colors duration-200 shadow-sm"
              aria-label="WhatsApp"
            >
              <FaWhatsapp className="text-base" />
            </a>
            <a
              href="https://www.tiktok.com/@bryces.pet.stop"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-[#191C1E] text-[#ECEBE8] hover:bg-[#C87A3E] hover:text-[#191C1E] transition-colors duration-200 shadow-sm"
              aria-label="TikTok"
            >
              <FaTiktok className="text-base" />
            </a>
          </div>
        </div>

        {/* Center Column: Navigation Links */}
        <div>
          <p className="text-xs font-bold text-[#191C1E] uppercase tracking-widest mb-5">
            Quick Links
          </p>
          <ul className="flex flex-col gap-3 font-medium text-[#191C1E]/75">
            {[
              { label: "Home", path: "/" },
              { label: "About Our Cattery", path: "/about" },
              { label: "Available Maine Coons", path: "/collection" },
              { label: "Adoption Contact", path: "/contact" },
            ].map((link) => (
              <motion.li
                key={link.label}
                whileHover={{ x: 4, color: "#C87A3E" }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                onClick={() => handleNavigation(link.path)}
                className="cursor-pointer transition-colors duration-150 w-fit"
              >
                {link.label}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Right Column: Verified Contacts */}
        <div>
          <p className="text-xs font-bold text-[#191C1E] uppercase tracking-widest mb-5">
            Cattery Direct Inquiries
          </p>
          <ul className="flex flex-col gap-5 font-medium">
            <li className="flex flex-col gap-1.5">
              <span className="text-[10px] uppercase tracking-wider text-[#191C1E]/50 font-bold">
                WhatsApp Direct Line
              </span>
              <motion.a
                whileHover={{ x: 4 }}
                href="https://wa.me/19128453708?text=Hello%20Maine%20Coon%20Haven"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#191C1E] hover:text-[#C87A3E] transition-colors duration-150 cursor-pointer w-fit"
              >
                <FaWhatsapp className="text-[#C87A3E] text-lg flex-shrink-0" />
                <span className="font-semibold text-sm">+1 (912) 845-3708</span>
              </motion.a>
            </li>

            <li className="flex flex-col gap-1.5">
              <span className="text-[10px] uppercase tracking-wider text-[#191C1E]/50 font-bold">
                TikTok Nursery Updates
              </span>
              <motion.a
                whileHover={{ x: 4 }}
                href="https://www.tiktok.com/@bryces.pet.stop"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#191C1E] hover:text-[#C87A3E] transition-colors duration-150 cursor-pointer w-fit"
              >
                <FaTiktok className="text-[#C87A3E] text-base flex-shrink-0" />
                <span className="font-semibold text-sm">@bryces.pet.stop</span>
              </motion.a>
            </li>

            <li className="flex flex-col gap-1.5">
              <span className="text-[10px] uppercase tracking-wider text-[#191C1E]/50 font-bold">
                Adoption Inquiries
              </span>
              <motion.div
                whileHover={{ x: 4 }}
                onClick={() =>
                  (window.location.href =
                    "mailto:alebryce5@gmail.com?subject=Maine%20Coon%20Adoption%20Inquiry")
                }
                className="flex items-center gap-2 text-[#191C1E] hover:text-[#C87A3E] transition-colors duration-150 cursor-pointer break-all w-fit"
              >
                <MdOutlineEmail className="text-[#C87A3E] text-lg flex-shrink-0" />
                <span className="font-semibold text-sm">
                  alebryce5@gmail.com
                </span>
              </motion.div>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Legal Section */}
      <div className="mt-16 px-6 md:px-12 max-w-7xl mx-auto">
        <hr className="border-[#191C1E]/10" />
        <p className="py-6 text-xs text-center text-[#191C1E]/60 font-medium tracking-wide">
          &copy; 2026 bryce pet stop & Ethical Cattery. All rights reserved.
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
