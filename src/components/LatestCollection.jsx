import React, { useContext, useMemo } from "react";
import { shopContext } from "../context/shopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { motion } from "motion/react";

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
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.215, 0.61, 0.355, 1],
    },
  },
};

const LatestCollection = () => {
  const { products = [] } = useContext(shopContext);

  const latestProducts = useMemo(
    () => [...products].reverse().slice(0, 8),
    [products],
  );

  return (
    <section className="my-14 overflow-hidden rounded-3xl border border-[#191C1E]/10 bg-[#ECEBE8] px-4 py-12 sm:px-8 md:px-12 lg:my-20 lg:py-16">
      <div className="mx-auto w-full max-w-6xl">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="text-3xl sm:text-4xl lg:text-5xl text-[#191C1E]">
            <Title text1="RECENT" text2="LITTERS" />
          </div>

          <p className="mx-auto mt-4 max-w-2xl text-xs font-medium leading-relaxed text-[#191C1E]/70 sm:text-sm md:text-base">
            Meet our newest purebred Maine Coon kittens and young adults. Every
            kitten is pedigree-certified, DNA-screened clear of HCM and SMA,
            microchipped, and raised underfoot in a calm home nursery.
          </p>
        </motion.header>

        {latestProducts.length > 0 ? (
          <motion.div
            variants={gridContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="mt-12 grid w-full grid-cols-1 items-stretch gap-6 sm:grid-cols-2 sm:gap-7 lg:mt-16 lg:gap-8"
          >
            {latestProducts.map((item) => (
              <motion.article
                key={item._id}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="min-w-0 h-full"
              >
                <div className="h-full rounded-2xl bg-[#ECEBE8] p-3 border border-[#191C1E]/15 transition-colors duration-200 hover:border-[#C87A3E] sm:p-4 shadow-sm">
                  <ProductItem
                    id={item._id}
                    image={item.image}
                    name={item.name}
                    price={item.price}
                    sellerName={item.sellerName}
                  />
                </div>
              </motion.article>
            ))}
          </motion.div>
        ) : (
          <div className="mt-12 rounded-2xl border border-dashed border-[#191C1E]/20 bg-[#ECEBE8] px-6 py-16 text-center text-sm text-[#191C1E]/60 lg:mt-16">
            Upcoming litters and available kittens will be posted here soon.
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestCollection;
