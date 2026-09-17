import React, { useRef } from "react";
import Title from "./Title";
import { motion, useScroll, useTransform } from "motion/react";

const SERVICES = [
  {
    step: "01",
    title: "In-Cabin Flight Nanny Delivery",
    description:
      "Stress-free hand delivery inside passenger cabins across the lower 48 states. Includes constant hydration, temperature checks, and direct handoff to your door.",
    tag: "Doorstep Travel",
  },
  {
    step: "02",
    title: "DNA & HCM Echocardiogram Panels",
    description:
      "All parent cats undergo yearly board-certified veterinary cardiac ultrasounds along with full DNA screening (HCM, SMA, PKDef) with verifiable paperwork.",
    tag: "Health Assurance",
  },
  {
    step: "03",
    title: "Extended 3–5 Year Growth Guidance",
    description:
      "Maine Coons take up to five years to reach full skeletal maturity. We provide tailored high-protein dietary schedules and joint support advice through every stage.",
    tag: "Nutritional Advisory",
  },
  {
    step: "04",
    title: "Double-Coat & Ruff Grooming Plans",
    description:
      "Learn proper undercoat raking, sanitary trimming, and seasonal shed handling tailored to prevent matting in heavy winter ruffs and lynx-tipped ears.",
    tag: "Coat Maintenance",
  },
  {
    step: "05",
    title: "Certified Pedigree & TICA Transfer",
    description:
      "Each companion is issued official TICA or CFA registration certificates, certified multi-generation lineage pedigrees, and complete vaccination portfolios.",
    tag: "Documentation",
  },
  {
    step: "06",
    title: "Lifetime Breeder Direct Line",
    description:
      "Direct WhatsApp contact with our nursery for post-adoption support, from kitten room acclimation and scratching-post habits to lifelong wellness advice.",
    tag: "24/7 Support",
  },
];

const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const BestSeller = () => {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headerY = useTransform(scrollYProgress, [0, 0.4], [40, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="my-14 py-14 px-4 sm:px-8 md:px-12 bg-[#ECEBE8] text-[#191C1E] rounded-3xl border border-[#191C1E]/10 shadow-sm"
    >
      {/* Scroll Parallax Header */}
      <motion.div
        style={{ y: headerY, opacity: headerOpacity }}
        className="text-center max-w-3xl mx-auto mb-12"
      >
        <div className="text-3xl sm:text-4xl">
          <Title text1={"CATTERY"} text2={"SERVICES & CARE"} />
        </div>
        <p className="mt-4 text-xs sm:text-sm md:text-base text-[#191C1E]/75 font-medium leading-relaxed">
          From verified genetic screening and stress-free passenger courier
          transit to multi-year skeletal growth tracking, we provide complete
          post-adoption care for every gentle giant.
        </p>
      </motion.div>

      {/* Services Grid */}
      <motion.div
        variants={gridContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto"
      >
        {SERVICES.map((service, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 350, damping: 24 }}
            className="group relative flex flex-col justify-between p-7 sm:p-8 rounded-2xl bg-[#ECEBE8] border border-[#191C1E]/15 hover:border-[#C87A3E] transition-colors duration-200"
          >
            {/* Top Indicator & Category Tag */}
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-black tracking-widest text-[#050505] uppercase">
                  {service.step}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md bg-[#191C1E]/5 text-[#191C1E]/70 border border-[#191C1E]/10">
                  {service.tag}
                </span>
              </div>

              <h3 className="font-extrabold text-base sm:text-lg text-[#191C1E] mb-2.5 tracking-tight group-hover:text-[#C87A3E] transition-colors duration-150">
                {service.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#191C1E]/70 leading-relaxed font-normal">
                {service.description}
              </p>
            </div>

            {/* Bottom Subtle Accent */}
            <div className="pt-6 mt-6 border-t border-[#191C1E]/10 flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#191C1E]/50">
                Included with Placement
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default BestSeller;
