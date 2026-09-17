import React from "react";
import { useParams } from "react-router-dom";
import { shopContext } from "../context/shopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";
import { motion, AnimatePresence } from "motion/react";
import SEO from "../components/SEO";

const reviewsList = [
  {
    name: "Daniel B.",
    initials: "DB",
    comment:
      "Our Pomeranian puppy arrived healthy, playful, and pre-socialized! The kennel provided complete vaccination records and pedigree paperwork. Highly recommend!",
  },
  {
    name: "Paul F.",
    initials: "PF",
    comment:
      "The puppy was exactly as described in the photos and video clips. Smooth adoption process and the team checked in with us after arrival.",
  },
  {
    name: "Marc K.",
    initials: "MK",
    comment:
      "Exceptional purebred lineage! Coat quality is dense and fluffy, and temperament is wonderfully affectionate.",
  },
  {
    name: "Sarah M.",
    initials: "SM",
    comment:
      "Visited the kennel for an in-person inspection prior to finalizing adoption. The field representative was patient and transparent about health checks.",
  },
  {
    name: "Alain N.",
    initials: "AN",
    comment:
      "Great experience purchasing grooming supplies alongside our puppy. Outstanding quality-to-price ratio.",
  },
  {
    name: "Christian T.",
    initials: "CT",
    comment:
      "Pet delivery was handled with so much care. The crate was comfortable and safe throughout transport.",
  },
  {
    name: "Evelyn W.",
    initials: "EW",
    comment:
      "Super energetic and healthy pup! Vet confirmed pristine health checks during our initial checkup.",
  },
  {
    name: "Francis O.",
    initials: "FO",
    comment:
      "Great communication with the breeding team. Instant updates and photos on WhatsApp kept us informed prior to delivery.",
  },
  {
    name: "Grace L.",
    initials: "GL",
    comment:
      "The puppy starter kit came with everything needed—from nutrient-dense starter food to grooming brushes.",
  },
  {
    name: "Hassan B.",
    initials: "HB",
    comment:
      "Honest breeders with authentic health guarantees. The puppy's coat color matched the catalog pictures perfectly.",
  },
  {
    name: "Irene C.",
    initials: "IC",
    comment:
      "The breeder let us view three available puppies to find the personality that fit our family best. Unbeatable care standards!",
  },
  {
    name: "Joel M.",
    initials: "JM",
    comment:
      "Fast turnaround time on paperwork! Adoption documents and health certificates were prepared promptly.",
  },
  {
    name: "Kevin P.",
    initials: "KP",
    comment:
      "Coat and paws in pristine condition. Well-socialized with children and house-trained starter habits.",
  },
  {
    name: "Linda N.",
    initials: "LN",
    comment:
      "Adopting a pet online can be stressful, but the agent-guided inspection process made it totally secure and trustworthy.",
  },
  {
    name: "Michael E.",
    initials: "ME",
    comment:
      "Thick double coat and beautiful teddy-bear face structure. Extremely happy with our new family companion.",
  },
];

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = React.useContext(shopContext);
  const [productData, setProductData] = React.useState(false);
  const [image, setImage] = React.useState("");
  const [size, setSize] = React.useState("");
  const [activeTab, setActiveTab] = React.useState("description");

  // State to manage flying animations
  const [flyingItems, setFlyingItems] = React.useState([]);

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  React.useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  // Determine availability status
  const isAvailable = productData ? productData.available !== false : true;

  // Animated Add to Cart Handler
  const handleAddToCart = (e) => {
    if (!isAvailable) return;

    // Fire the contextual add-to-cart logic
    addToCart(productData._id, size);

    // Get click source coordinate position
    const rect = e.currentTarget.getBoundingClientRect();
    const newItem = {
      id: Date.now(),
      startX: rect.left + rect.width / 2 - 24, // center of button
      startY: rect.top + rect.height / 2 - 24,
    };

    setFlyingItems((prev) => [...prev, newItem]);
  };

  const removeFlyingItem = (id) => {
    setFlyingItems((prev) => prev.filter((item) => item.id !== id));
  };

  return productData ? (
    <div className="border-t border-slate-100 pt-10 transition-opacity ease-in duration-500 opacity-100 relative">
      <SEO
        title={`PomPalace | ${productData.name}`}
        description="Browse purebred Pomeranian puppies, adult dogs, and grooming care essentials with health guarantee and verified pedigree paperwork."
        keywords="Pomeranian puppies, purebred Pomeranian, toy pomeranians, buy pomeranian puppy"
        url="https://www.pompalace.com"
      />

      {/* Dynamic Flying Product Animation Overlay */}
      <AnimatePresence>
        {flyingItems.map((item) => (
          <motion.img
            key={item.id}
            src={image}
            alt="Flying product preview"
            initial={{
              position: "fixed",
              left: item.startX,
              top: item.startY,
              width: 48,
              height: 48,
              borderRadius: "12px",
              opacity: 1,
              scale: 1,
              zIndex: 9999,
              pointerEvents: "none",
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)",
            }}
            animate={{
              left: "calc(100vw - 80px)",
              top: 24,
              scale: 0.3,
              opacity: 0.2,
            }}
            transition={{
              duration: 0.85,
              ease: [0.16, 1, 0.3, 1],
            }}
            onAnimationComplete={() => removeFlyingItem(item.id)}
          />
        ))}
      </AnimatePresence>

      {/* Product Display Grid */}
      <div className="flex gap-10 md:gap-12 flex-col lg:flex-row">
        {/* Left Side: Product Image Gallery */}
        <div className="flex-1 flex flex-col-reverse gap-4 sm:flex-row">
          {/* Thumbnails list */}
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto justify-between sm:justify-start sm:w-[18.7%] w-full gap-3 scrollbar-none max-h-[500px]">
            {productData.image.map((item, index) => (
              <div
                key={index}
                onClick={() => setImage(item)}
                className={`w-[23%] sm:w-full aspect-square rounded-xl overflow-hidden border-2 cursor-pointer flex-shrink-0 transition-all duration-200 ${
                  image === item
                    ? "border-amber-500 bg-white shadow-sm"
                    : "border-slate-100 hover:border-slate-300"
                }`}
              >
                <img
                  className={`w-full h-full object-cover object-center ${
                    !isAvailable ? "grayscale filter" : ""
                  }`}
                  src={item}
                  alt={productData.name}
                />
              </div>
            ))}
          </div>

          {/* Main Hero Image */}
          <div className="w-full sm:w-[80%] aspect-square rounded-2xl overflow-hidden bg-slate-50 border border-slate-100/50 flex items-center justify-center relative">
            <motion.img
              key={image}
              initial={{ opacity: 0.8, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className={`w-full h-full object-cover object-center transition-transform duration-300 ${
                isAvailable ? "hover:scale-[1.02]" : "grayscale filter"
              }`}
              src={image}
              alt={productData.name}
            />

            {/* Reserved / Adopted Visual Overlay */}
            {!isAvailable && (
              <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1px] flex items-center justify-center">
                <span className="bg-rose-600 text-white text-xs sm:text-sm font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-xl">
                  Already Adopted
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Product Details & Options */}
        <div className="flex-1 flex flex-col">
          <h1 className="font-extrabold text-3xl text-slate-800 tracking-tight leading-tight">
            {productData.name}
          </h1>

          {/* Star Ratings */}
          <div className="flex items-center gap-1.5 mt-3">
            <img src={assets.star_icon} alt="star" className="w-4 h-4" />
            <img src={assets.star_icon} alt="star" className="w-4 h-4" />
            <img src={assets.star_icon} alt="star" className="w-4 h-4" />
            <img src={assets.star_icon} alt="star" className="w-4 h-4" />
            <img
              src={assets.star_dull_icon}
              alt="star dull"
              className="w-4 h-4"
            />
            <p className="pl-1.5 text-xs font-bold text-slate-500">
              ({reviewsList.length} Verified Adoption Reviews)
            </p>
          </div>

          {/* Pricing Tag & Availability Badge */}
          <div className="flex items-center gap-4 mt-4">
            <p className="text-3xl font-black text-slate-900 tracking-tight">
              {currency} {productData.price.toFixed(2)}
            </p>
            <span
              className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full ${
                isAvailable
                  ? "bg-amber-50 text-amber-700 border border-amber-200"
                  : "bg-rose-50 text-rose-600 border border-rose-200"
              }`}
            >
              {isAvailable ? "Available for Adoption" : "Reserved"}
            </span>
          </div>

          <p className="text-slate-600 text-sm mt-4 leading-relaxed font-medium">
            {productData.description}
          </p>

          {/* Options Selection */}
          <div className="flex flex-col gap-3 my-6">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Select Option / Package
            </p>
            <div className="flex flex-wrap gap-2.5">
              {productData.sizes.map((item, index) => (
                <button
                  key={index}
                  disabled={!isAvailable}
                  onClick={() => setSize(item)}
                  type="button"
                  className={`py-2 px-4 text-sm font-semibold rounded-xl border transition-all duration-150 ${
                    !isAvailable
                      ? "border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed line-through"
                      : item === size
                        ? "border-amber-500 bg-amber-50/40 text-amber-700 ring-2 ring-amber-500/10 cursor-pointer"
                        : "border-slate-200 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50 cursor-pointer"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Action Trigger with Flying Effect */}
          <motion.button
            whileHover={isAvailable ? { scale: 1.01 } : {}}
            whileTap={isAvailable ? { scale: 0.97 } : {}}
            disabled={!isAvailable}
            onClick={handleAddToCart}
            type="button"
            className={`w-full sm:w-auto self-start font-bold text-xs uppercase tracking-wider px-10 py-4 rounded-xl shadow-md transition-all duration-150 mb-6 ${
              isAvailable
                ? "bg-slate-900 hover:bg-slate-800 text-white cursor-pointer hover:shadow-lg"
                : "bg-slate-300 text-slate-500 cursor-not-allowed shadow-none"
            }`}
          >
            {isAvailable ? "Add to Cart" : "Adopted / Out of Stock"}
          </motion.button>

          <hr className="border-slate-100 my-4" />

          {/* Core Guarantees */}
          <div className="text-xs text-slate-500 space-y-2 font-semibold">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
              <p>100% Purebred & Health Guarantee</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
              <p>Pay after in-person inspection at kennel or upon delivery</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
              <p>Includes Vaccination Records & Starter Pack</p>
            </div>
          </div>
        </div>
      </div>

      {/* Product Information and Reviews Section */}
      <div className="mt-16">
        {/* Tab Headers */}
        <div className="flex border-b border-slate-100">
          <button
            onClick={() => setActiveTab("description")}
            className={`px-6 py-3 text-sm font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === "description"
                ? "border-amber-500 text-amber-600"
                : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            Description & Traits
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`px-6 py-3 text-sm font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === "reviews"
                ? "border-amber-500 text-amber-600"
                : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            Adopter Reviews ({reviewsList.length})
          </button>
        </div>

        {/* Tab Contents */}
        <div className="border border-t-0 border-slate-100 rounded-b-2xl p-6 sm:p-8 bg-slate-50/20 text-slate-600 text-sm leading-relaxed">
          {activeTab === "description" ? (
            <div className="space-y-4 font-medium">
              <p>{productData.description}</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin">
              {reviewsList.map((rev, idx) => (
                <div
                  key={idx}
                  className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs uppercase">
                      {rev.initials}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">
                        {rev.name}
                      </p>
                      <p className="text-[10px] text-slate-400 font-semibold">
                        Verified Adopter
                      </p>
                    </div>
                  </div>
                  <p className="font-medium text-slate-600 leading-relaxed">
                    {rev.comment}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Dynamic Related Products */}
      <div className="mt-20">
        <RelatedProducts
          category={productData.category}
          subCategory={productData.subCategory}
        />
      </div>
    </div>
  ) : (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
    </div>
  );
};

export default Product;
