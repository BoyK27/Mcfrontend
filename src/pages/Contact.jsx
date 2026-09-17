import React, { useContext } from "react";
import Title from "../components/Title";
import { shopContext } from "../context/shopContext";
import { motion } from "motion/react";
import { FaWhatsapp, FaTiktok } from "react-icons/fa";
import { MdOutlineEmail, MdOutlineLocationOn } from "react-icons/md";

const CATTERY_IMAGE =
  "https://imgs.search.brave.com/Lcw9eOQKqSCqkH3xfqdALVeX6sa8mQ8DOHzHTRmdAoI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMucGV4ZWxzLmNv/bS9waG90b3MvMjc0/MjEyMDcvcGV4ZWxz/LXBob3RvLTI3NDIx/MjA3L2ZyZWUtcGhv/dG8tb2YtYS1jYXQt/d2l0aC1ncmVlbi1l/eWVzLWlzLWxvb2tp/bmctYXQtdGhlLWNh/bWVyYS5qcGVnP2Nz/PXRpbnlzcmdiJmRw/cj0xJnc9NTAw";

const Contact = () => {
  const { navigate } = useContext(shopContext);

  const handleBrowsePets = () => {
    navigate("/collection");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="px-4 sm:px-8 md:px-12 max-w-7xl mx-auto text-[#191C1E] bg-[#ECEBE8]"
    >
      {/* Title Header */}
      <div className="text-center text-2xl sm:text-3xl pt-10 border-t border-[#191C1E]/10">
        <Title text1={"CONTACT"} text2={"OUR CATTERY"} />
      </div>

      {/* Main Content Section */}
      <div className="my-12 flex flex-col justify-center lg:flex-row gap-12 lg:gap-16 items-center mb-28">
        {/* Web Image Showcase */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.3 }}
          className="w-full lg:w-1/2 overflow-hidden rounded-2xl border border-[#191C1E]/10 shadow-sm"
        >
          <img
            src={CATTERY_IMAGE}
            className="w-full h-[380px] sm:h-[450px] object-cover hover:scale-105 transition-transform duration-500"
            alt="Maine Coon cat looking at camera"
          />
        </motion.div>

        {/* Contact Details Column */}
        <div className="flex flex-col justify-center items-start gap-6 lg:w-1/2">
          <div>
            <p className="font-bold text-xl text-[#191C1E] mb-2">
              Cattery Sanctuary & Nursery
            </p>
            <div className="flex items-start gap-2 text-[#191C1E]/75 leading-relaxed text-sm">
              <MdOutlineLocationOn className="text-xl text-[#C87A3E] flex-shrink-0 mt-0.5" />
              <p>
                1225 N Loop W #705, <br />
                United States
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 font-medium">
            <span className="text-xs uppercase tracking-wider text-[#191C1E]/50 font-bold">
              Direct Inquiries & Reservation Lines
            </span>

            {/* WhatsApp */}
            <div
              onClick={() =>
                window.open(
                  "https://wa.me/19128453708?text=Hello%20Maine%20Coon%20Haven",
                  "_blank",
                )
              }
              className="flex items-center gap-2.5 hover:text-[#C87A3E] transition-colors duration-150 cursor-pointer w-fit text-[#191C1E]"
            >
              <FaWhatsapp className="text-[#C87A3E] text-xl flex-shrink-0" />
              <span className="font-semibold text-sm sm:text-base">
                +1 (912) 845-3708
              </span>
            </div>

            {/* TikTok Channel */}
            <div
              onClick={() =>
                window.open("https://www.tiktok.com/@bryces.pet.stop", "_blank")
              }
              className="flex items-center gap-2.5 hover:text-[#C87A3E] transition-colors duration-150 cursor-pointer w-fit text-[#191C1E]"
            >
              <FaTiktok className="text-[#191C1E] text-lg flex-shrink-0" />
              <span className="font-semibold text-sm sm:text-base">
                @bryces.pet.stop
              </span>
            </div>

            {/* Email */}
            <div
              onClick={() =>
                (window.location.href =
                  "mailto:bailywood94@gmail.com?subject=Maine%20Coon%20Adoption%20Inquiry&body=Hello%20Cattery%20Team:")
              }
              className="flex items-center gap-2.5 hover:text-[#C87A3E] transition-colors duration-150 cursor-pointer break-all w-fit text-[#191C1E]"
            >
              <MdOutlineEmail className="text-[#C87A3E] text-xl flex-shrink-0" />
              <span className="font-semibold text-sm sm:text-base">
                alebryce5@gmail.com
              </span>
            </div>
          </div>

          <hr className="w-full border-[#191C1E]/10 my-1" />

          <div>
            <p className="font-bold text-xl text-[#191C1E]">
              Ready to Welcome a Gentle Giant?
            </p>
            <p className="text-[#191C1E]/70 text-sm mt-1">
              Browse available purebred kittens and young adults ready for
              in-cabin courier travel or nursery pickup.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleBrowsePets}
            className="bg-[#C87A3E] text-[#191C1E] px-8 py-3.5 text-xs sm:text-sm font-bold hover:bg-[#b86d34] transition-colors duration-200 rounded-xl shadow-sm tracking-wider uppercase cursor-pointer"
          >
            EXPLORE MAINE COONS
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
