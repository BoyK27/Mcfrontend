/* Responsive two-column collection redesign */
import React, { useContext, useState, useEffect, useCallback } from "react";
import { shopContext } from "../context/shopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import { motion, AnimatePresence } from "motion/react";
import SEO from "../components/SEO";

// Unified subcategory mapping synchronized with the Admin Add page
const subCategoryMap = {
  "Maine Coon Kittens": [
    { label: "8 - 12 Weeks Old", value: "8-12 Weeks" },
    { label: "3 - 6 Months Old", value: "3-6 Months" },
    { label: "6 - 12 Months Old", value: "6-12 Months" },
  ],
  "Adult Maine Coons": [
    { label: "1 - 3 Years Old", value: "1-3 Years" },
    { label: "3 - 5 Years (Mature)", value: "3-5 Years (Mature)" },
    { label: "Senior (5+ Years)", value: "Senior (5+ Years)" },
  ],
  "Maine Coon Essentials": [
    { label: "XL Cat Trees & Scratchers", value: "XL Cat Trees & Scratchers" },
    { label: "High-Protein Nutrition", value: "High-Protein Nutrition" },
    {
      label: "Undercoat Rakes & Grooming",
      value: "Undercoat Rakes & Grooming",
    },
    { label: "XL Litter Boxes", value: "XL Litter Boxes" },
    {
      label: "Walking Harnesses & Wheels",
      value: "Walking Harnesses & Wheels",
    },
  ],
};

const COAT_COLORS = [
  "Brown Classic Tabby",
  "Black Smoke",
  "Silver Tabby",
  "Red / Orange Tabby",
  "Solid White",
  "Solid Black",
  "Blue / Smoke",
  "Tortoiseshell / Calico",
  "Torbie / Bicolor",
];

const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const cardItemVariants = {
  hidden: { opacity: 0, scale: 0.94, y: 25 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.2 },
  },
};

const Collection = () => {
  const { products, search, showSearch } = useContext(shopContext);
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [genderFilter, setGenderFilter] = useState([]);
  const [colorFilter, setColorFilter] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

  const toggleGender = (value) => {
    setGenderFilter((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

  const toggleColor = (value) => {
    setColorFilter((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

  const getAvailableSubCategories = useCallback(() => {
    if (category.length === 0) {
      const allSubCats = [];
      const seenValues = new Set();
      Object.values(subCategoryMap).forEach((group) => {
        group.forEach((item) => {
          if (!seenValues.has(item.value)) {
            seenValues.add(item.value);
            allSubCats.push(item);
          }
        });
      });
      return allSubCats;
    }

    const available = [];
    const seenValues = new Set();
    category.forEach((cat) => {
      if (subCategoryMap[cat]) {
        subCategoryMap[cat].forEach((item) => {
          if (!seenValues.has(item.value)) {
            seenValues.add(item.value);
            available.push(item);
          }
        });
      }
    });
    return available;
  }, [category]);

  const applyFiltersAndSort = useCallback(() => {
    let productsCopy = [...products];

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category),
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory),
      );
    }

    if (genderFilter.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        genderFilter.includes(item.gender),
      );
    }

    if (colorFilter.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        colorFilter.includes(item.coatColor),
      );
    }

    switch (sortType) {
      case "low-high":
        productsCopy.sort((a, b) => a.price - b.price);
        break;
      case "high-low":
        productsCopy.sort((a, b) => b.price - a.price);
        break;
      case "relevant":
      default:
        productsCopy.reverse();
        break;
    }

    setFilteredProducts(productsCopy);
  }, [
    products,
    search,
    showSearch,
    category,
    subCategory,
    genderFilter,
    colorFilter,
    sortType,
  ]);

  useEffect(() => {
    applyFiltersAndSort();
  }, [applyFiltersAndSort]);

  const availableSubCategories = getAvailableSubCategories();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[16rem_minmax(0,1fr)] gap-8 lg:gap-12 pt-10 border-t border-[#191C1E]/10 overflow-hidden px-4 sm:px-8 md:px-12 max-w-7xl mx-auto text-[#191C1E] bg-[#ECEBE8]">
      <SEO
        title="Maine Coon Kittens & Cats | Ethical Cattery Catalog"
        description="Explore purebred Maine Coon kittens, adult gentle giants, and XL cat essentials. Filter by developmental age, coat pattern, and gender."
        keywords="Maine Coon kittens, purebred Maine Coon cattery, TICA Maine Coon, Brown Tabby Maine Coon, buy Maine Coon kitten"
        url="https://www.yourdomain.com/collection"
      />

      {/* Column 1: Filter Sidebar */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="min-w-0 lg:sticky lg:top-6 lg:self-start"
      >
        <button
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          className="my-3 text-lg font-bold tracking-wider text-[#191C1E] flex items-center gap-2 cursor-pointer lg:cursor-default"
        >
          FILTERS
          <motion.img
            animate={{ rotate: showFilters ? 90 : 0 }}
            transition={{ duration: 0.2 }}
            className="h-3 w-3 lg:hidden"
            src={assets.dropdown_icon}
            alt="Toggle filter dropdown arrow"
          />
        </button>

        <div
          className={`${showFilters ? "block" : "hidden"} lg:block lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:pr-1`}
        >
          {/* Main Classification */}
          <div className="border border-[#191C1E]/10 rounded-2xl p-5 bg-[#ECEBE8] shadow-sm mt-5">
            <p className="mb-4 text-xs font-bold text-[#191C1E] tracking-wider uppercase">
              Classification
            </p>
            <div className="flex flex-col gap-3.5 text-sm font-medium text-[#191C1E]/75">
              {[
                "Maine Coon Kittens",
                "Adult Maine Coons",
                "Maine Coon Essentials",
              ].map((cat) => (
                <label
                  key={cat}
                  className="flex items-center gap-3 cursor-pointer group hover:text-[#191C1E] transition-colors duration-150"
                >
                  <input
                    type="checkbox"
                    className="w-4.5 h-4.5 accent-[#C87A3E] rounded border-[#191C1E]/20 cursor-pointer"
                    value={cat}
                    onChange={toggleCategory}
                    checked={category.includes(cat)}
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Gender Filter */}
          <div className="border border-[#191C1E]/10 rounded-2xl p-5 bg-[#ECEBE8] shadow-sm mt-5">
            <p className="mb-4 text-xs font-bold text-[#191C1E] tracking-wider uppercase">
              Gender
            </p>
            <div className="flex gap-4 text-sm font-medium text-[#191C1E]/75">
              {["Male", "Female"].map((g) => (
                <label
                  key={g}
                  className="flex items-center gap-2 cursor-pointer hover:text-[#191C1E]"
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-[#C87A3E] rounded border-[#191C1E]/20 cursor-pointer"
                    value={g}
                    onChange={() => toggleGender(g)}
                    checked={genderFilter.includes(g)}
                  />
                  <span>{g}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Coat Pattern & Color Filter */}
          <div className="border border-[#191C1E]/10 rounded-2xl p-5 bg-[#ECEBE8] shadow-sm mt-5">
            <p className="mb-4 text-xs font-bold text-[#191C1E] tracking-wider uppercase">
              Coat Pattern & Color
            </p>
            <div className="flex flex-col gap-2.5 text-sm font-medium text-[#191C1E]/75 max-h-56 overflow-y-auto pr-1">
              {COAT_COLORS.map((color) => (
                <label
                  key={color}
                  className="flex items-center gap-2 cursor-pointer hover:text-[#191C1E]"
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-[#C87A3E] rounded border-[#191C1E]/20 cursor-pointer"
                    value={color}
                    onChange={() => toggleColor(color)}
                    checked={colorFilter.includes(color)}
                  />
                  <span>{color}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Developmental Stage / Item Type Filter */}
          <div className="border border-[#191C1E]/10 rounded-2xl p-5 bg-[#ECEBE8] shadow-sm my-5">
            <p className="mb-4 text-xs font-bold text-[#191C1E] tracking-wider uppercase">
              Stage / Item Category
            </p>
            <div className="flex flex-col gap-3.5 text-sm font-medium text-[#191C1E]/75 max-h-64 overflow-y-auto pr-1">
              {availableSubCategories.map((sub) => (
                <label
                  key={sub.value}
                  className="flex items-center gap-3 cursor-pointer group hover:text-[#191C1E] transition-colors duration-150"
                >
                  <input
                    type="checkbox"
                    className="w-4.5 h-4.5 accent-[#C87A3E] rounded border-[#191C1E]/20 cursor-pointer"
                    value={sub.value}
                    onChange={toggleSubCategory}
                    checked={subCategory.includes(sub.value)}
                  />
                  <span>{sub.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Column 2: Product Grid */}
      <div className="min-w-0">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-5 border-b border-[#191C1E]/10"
        >
          <div className="text-2xl sm:text-3xl font-semibold tracking-tight">
            <Title text1={"MAINE COON"} text2={"CATALOG"} />
          </div>

          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="border border-[#191C1E]/15 text-sm font-semibold text-[#191C1E] bg-[#ECEBE8] rounded-xl px-4 py-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C87A3E]/30 focus:border-[#C87A3E] cursor-pointer transition-all max-w-[200px]"
          >
            <option value="relevant">Sort: Newest First</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </motion.div>

        {filteredProducts.length > 0 ? (
          <motion.div
            variants={gridContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-x-5 sm:gap-x-6 gap-y-8 lg:gap-y-10"
          >
            <AnimatePresence>
              {filteredProducts.map((item) => (
                <motion.div
                  key={item._id}
                  layout
                  variants={cardItemVariants}
                  exit="exit"
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 350, damping: 22 }}
                >
                  <ProductItem
                    id={item._id}
                    image={item.image}
                    name={item.name}
                    price={item.price}
                    sellerName={item.sellerName}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center py-20 border border-dashed border-[#191C1E]/20 rounded-2xl bg-[#ECEBE8]"
          >
            <p className="text-[#191C1E]/70 font-semibold mb-1">
              No Maine Coons or supplies match your criteria
            </p>
            <p className="text-xs text-[#191C1E]/50">
              Try adjusting your coat pattern, gender, or developmental stage
              filters.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Collection;
