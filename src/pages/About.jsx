import React from "react";
import Title from "../components/Title";
import { motion } from "motion/react";
import SEO from "../components/SEO";

const CATTERY_IMAGE =
  "https://imgs.search.brave.com/Lcw9eOQKqSCqkH3xfqdALVeX6sa8mQ8DOHzHTRmdAoI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMucGV4ZWxzLmNv/bS9waG90b3MvMjc0/MjEyMDcvcGV4ZWxz/LXBob3RvLTI3NDIx/MjA3L2ZyZWUtcGhv/dG8tb2YtYS1jYXQt/d2l0aC1ncmVlbi1l/eWVzLWlzLWxvb2tp/bmctYXQtdGhlLWNh/bWVyYS5qcGVnP2Nz/PXRpbnlzcmdiJmRw/cj0xJnc9NTAw";

// Staggered variants for value cards container
const cardsContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

// Individual value card entrance animation
const cardItemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const About = () => {
  return (
    <div className="pb-16 overflow-hidden px-4 sm:px-8 md:px-12 max-w-7xl mx-auto text-[#191C1E] bg-[#ECEBE8]">
      <SEO
        title="About Maine Coon Haven | Ethical Cattery & Sanctuary"
        description="Maine Coon Haven is a registered ethical cattery connecting healthy, DNA-screened, pedigree Maine Coon kittens with loving families nationwide."
        keywords="Maine Coon cattery, purebred Maine Coon kittens, buy Maine Coon kitten US, TICA Maine Coon breeder, gentle giants cattery"
        url="https://marinebox-store.com/about"
      />

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-2xl text-center pt-8 border-t border-[#191C1E]/10"
      >
        <Title text1={"ABOUT"} text2={"OUR CATTERY"} />
      </motion.div>

      {/* Main Brand Story Grid */}
      <div className="my-12 flex flex-col md:flex-row gap-12 lg:gap-16 items-center">
        {/* Story Web Image Showcase */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full md:w-1/2 overflow-hidden rounded-2xl border border-[#191C1E]/10 shadow-sm"
        >
          <motion.img
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full h-[360px] sm:h-[420px] object-cover"
            src={CATTERY_IMAGE}
            alt="Maine Coon cat with green eyes"
          />
        </motion.div>

        {/* Narrative Block */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col justify-center gap-6 md:w-1/2 text-[#191C1E]/80 text-sm md:text-base leading-relaxed"
        >
          <p>
            Welcome to <b>Maine Coon Haven</b>, an ethical cattery and sanctuary
            dedicated to raising authentic, sound, and affectionate Maine Coons.
            We focus on preserving the breed's hallmark traits: substantial bone
            structure, lion-like frontal ruffs, lynx ear tufts, and their
            famously gentle, dog-like temperaments.
          </p>
          <p>
            Our kittens are born and raised underfoot in our home, never in
            cages. They receive early socialization with household sounds,
            gentle handling, and full veterinary wellness checks. Every breeding
            parent is certified clear of HCM, SMA, and PKDef mutations to ensure
            robust lifelong health.
          </p>

          <div className="border-l-4 border-[#C87A3E] pl-4 my-2">
            <h4 className="text-lg font-bold text-[#191C1E] tracking-tight">
              Our Breeding Philosophy
            </h4>
          </div>
          <p className="italic text-[#191C1E]/85 bg-[#191C1E]/5 p-4 rounded-xl border border-[#191C1E]/10">
            To place healthy, genetically screened Maine Coon companions into
            loving homes while providing total transparency, official pedigrees,
            and multi-year support throughout their prolonged 3–5 year growth
            cycle.
          </p>
        </motion.div>
      </div>

      {/* Value Propositions Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-2xl sm:text-3xl py-6 mt-16 text-[#191C1E]"
      >
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </motion.div>

      {/* Dynamic Value Grid */}
      <motion.div
        variants={cardsContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24"
      >
        {/* Card 1 */}
        <motion.div
          variants={cardItemVariants}
          whileHover={{ y: -6 }}
          transition={{ type: "spring", stiffness: 350, damping: 22 }}
          className="border border-[#191C1E]/10 rounded-2xl px-6 py-8 flex flex-col gap-4 bg-[#ECEBE8] hover:border-[#C87A3E] transition-colors shadow-sm"
        >
          <div className="flex items-center gap-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#C87A3E]"></span>
            <b className="text-base text-[#191C1E] font-bold tracking-tight">
              DNA Genetic Screening
            </b>
          </div>
          <p className="text-xs md:text-sm text-[#191C1E]/70 leading-relaxed">
            All parent lines are DNA-tested N/N clear for HCM, SMA, and PKDef.
            Kittens leave with complete vaccination records, deworming,
            microchips, and a written health contract.
          </p>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          variants={cardItemVariants}
          whileHover={{ y: -6 }}
          transition={{ type: "spring", stiffness: 350, damping: 22 }}
          className="border border-[#191C1E]/10 rounded-2xl px-6 py-8 flex flex-col gap-4 bg-[#ECEBE8] hover:border-[#C87A3E] transition-colors shadow-sm"
        >
          <div className="flex items-center gap-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#C87A3E]"></span>
            <b className="text-base text-[#191C1E] font-bold tracking-tight">
              In-Cabin Courier Travel
            </b>
          </div>
          <p className="text-xs md:text-sm text-[#191C1E]/70 leading-relaxed">
            We prioritize zero cargo hold stress. Kittens travel hand-delivered
            in passenger cabins with bonded flight nannies or dedicated
            climate-controlled private transport directly to you.
          </p>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          variants={cardItemVariants}
          whileHover={{ y: -6 }}
          transition={{ type: "spring", stiffness: 350, damping: 22 }}
          className="border border-[#191C1E]/10 rounded-2xl px-6 py-8 flex flex-col gap-4 bg-[#ECEBE8] hover:border-[#C87A3E] transition-colors shadow-sm"
        >
          <div className="flex items-center gap-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#C87A3E]"></span>
            <b className="text-base text-[#191C1E] font-bold tracking-tight">
              Lifetime Growth Support
            </b>
          </div>
          <p className="text-xs md:text-sm text-[#191C1E]/70 leading-relaxed">
            Maine Coons grow over 3 to 5 years. We remain on call via WhatsApp
            to assist with high-protein nutritional balancing, undercoat rake
            techniques, and joint health care.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;
