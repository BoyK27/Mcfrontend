import React from "react";
import { assets } from "../assets/assets";

const POLICIES = [
  {
    icon: assets.exchange_icon,
    alt: "In-Cabin Pet Travel",
    title: "In-Cabin Flight Nanny",
    description:
      "Hand-carried in-cabin pet escort with continuous hydration, temperature monitoring, and low-stress transit direct to your home.",
  },
  {
    icon: assets.quality_icon,
    alt: "Certified Genetic Testing",
    title: "DNA Health Guarantee",
    description:
      "Parent lines tested N/N clear for HCM, SMA, and PKDef. Accompanied by official 2-year genetic health contracts and TICA/CFA registration.",
  },
  {
    icon: assets.support_img,
    alt: "Lifetime Breed Advisory",
    title: "Growth & Grooming Advisory",
    description:
      "Maine Coons mature over 3 to 5 years. Receive lifetime direct breeder guidance on high-protein nutrition, joint support, and double-coat care.",
  },
];

const OurPolicy = () => {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {POLICIES.map((policy, idx) => (
          <div
            key={idx}
            className="group relative flex flex-col items-start p-7 sm:p-8 rounded-2xl border border-[#191C1E]/10 bg-[#ECEBE8] hover:border-[#C87A3E] transition-all duration-200 cursor-default"
          >
            {/* Top Amber Accent Line on Hover */}
            <div className="absolute top-0 left-8 right-8 h-[2px] bg-transparent group-hover:bg-[#C87A3E] transition-colors duration-200 rounded-full" />

            {/* Icon Well */}
            <div className="w-12 h-12 rounded-xl bg-[#191C1E] flex items-center justify-center mb-6 transition-colors duration-200 group-hover:bg-[#C87A3E]">
              <img
                src={policy.icon}
                alt={policy.alt}
                className="w-5 h-5 object-contain brightness-0 invert transition-transform duration-200 group-hover:scale-105"
              />
            </div>

            {/* Heading */}
            <h3 className="font-extrabold text-[#191C1E] text-lg tracking-tight mb-2">
              {policy.title}
            </h3>

            {/* Body */}
            <p className="text-[#191C1E]/75 text-sm leading-relaxed font-normal">
              {policy.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurPolicy;
