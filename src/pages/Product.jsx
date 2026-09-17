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
      "Our Maine Coon kitten arrived calm, confident, and well-socialized! The cattery provided complete HCM echocardiogram results, genetic panels, and TICA pedigree paperwork. Highly recommend!",
  },
  {
    name: "Paul F.",
    initials: "PF",
    comment:
      "He was even more majestic in person than in the photos. Heavy bone structure, huge paws, and already chirping and trilling around our living room.",
  },
  {
    name: "Marc K.",
    initials: "MK",
    comment:
      "Exceptional European lineage! The lynx ear tips and throat ruff are already so prominent at four months. Affectionate and constantly follows us room to room.",
  },
  {
    name: "Sarah M.",
    initials: "SM",
    comment:
      "Visited the nursery for an in-person meeting before finalizing our reservation. The breeder was completely transparent about HCM/SMA testing and family lines.",
  },
  {
    name: "Alain N.",
    initials: "AN",
    comment:
      "Great experience purchasing the XL scratch post and grooming undercoat rake together with our kitten. Quality supplies suited for large cats.",
  },
  {
    name: "Christian T.",
    initials: "CT",
    comment:
      "The in-cabin flight nanny transport was seamless. The escort kept us updated with photos during the layover and handed him over happy and relaxed.",
  },
  {
    name: "Evelyn W.",
    initials: "EW",
    comment:
      "Magnificent gentle giant! Our primary vet was thoroughly impressed with the health documentation, microchip registration, and clear cardiac screening.",
  },
  {
    name: "Francis O.",
    initials: "FO",
    comment:
      "Superb breeder communication. Instant updates and weekly nursery videos over WhatsApp let us watch him grow until he was ready to travel at 12 weeks.",
  },
  {
    name: "Grace L.",
    initials: "GL",
    comment:
      "The cattery transition pack was thoughtful—it included high-protein food samples, his favorite feather teaser, and a scent blanket from his mother.",
  },
  {
    name: "Hassan B.",
    initials: "HB",
    comment:
      "Honest cattery with authentic genetic guarantees. His brown classic tabby patterning and dense water-resistant coat matched the catalog photos perfectly.",
  },
  {
    name: "Irene C.",
    initials: "IC",
    comment:
      "The breeder helped match us with a boy whose laid-back, water-loving temperament suited our home with children and dogs. He fit right in within 48 hours.",
  },
  {
    name: "Joel M.",
    initials: "JM",
    comment:
      "Prompt delivery of official registration papers. Both the CFA pedigree transfer and veterinary passport arrived in perfect order.",
  },
  {
    name: "Kevin P.",
    initials: "KP",
    comment:
      "Strong bone structure and tufted snowshoe paws. Extremely well-handled kitten who loves chin scratches and sleeping at our feet.",
  },
  {
    name: "Linda N.",
    initials: "LN",
    comment:
      "Reserving a pedigree cat online can feel daunting, but the verified breeder video calls and structured WhatsApp reservation made it totally secure.",
  },
  {
    name: "Michael E.",
    initials: "ME",
    comment:
      "Massive muzzle, lush tail, and the sweetest dog-like disposition. At nine months he is already 14 lbs and continuing to grow steadily.",
  },
];

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = React.useContext(shopContext);
  const [productData, setProductData] = React.useState(false);
  const [image, setImage] = React.useState("");
  const [size, setSize] = React.useState("");
  const [activeTab, setActiveTab] = React.useState("description");

  // State to manage flying animation
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

    addToCart(productData._id, size);

    const rect = e.currentTarget.getBoundingClientRect();
    const newItem = {
      id: Date.now(),
      startX: rect.left + rect.width / 2 - 24,
      startY: rect.top + rect.height / 2 - 24,
    };

    setFlyingItems((prev) => [...prev, newItem]);
  };

  const removeFlyingItem = (id) => {
    setFlyingItems((prev) => prev.filter((item) => item.id !== id));
  };

  return productData ? (
    <div className="border-t border-[#191C1E]/10 pt-10 transition-opacity ease-in duration-500 opacity-100 relative bg-[#ECEBE8] text-[#191C1E]">
      <SEO
        title={`Maine Coon Haven | ${productData.name}`}
        description="Browse purebred Maine Coon kittens, mature gentle giants, and feline care essentials with DNA health guarantees and verified pedigree records."
        keywords="Maine Coon kittens, purebred Maine Coon, gentle giants, buy Maine Coon kitten, TICA cattery"
        url={`https://brycepetshaven.vercel.app/product/${productId}`}
      />

      {/* Dynamic Flying Product Animation Overlay */}
      <AnimatePresence>
        {flyingItems.map((item) => (
          <motion.img
            key={item.id}
            src={image}
            alt="Flying reservation preview"
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
      <div className="flex gap-10 md:gap-12 flex-col lg:flex-row max-w-7xl mx-auto px-4 sm:px-8">
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
                    ? "border-[#C87A3E] bg-white shadow-sm"
                    : "border-[#191C1E]/10 hover:border-[#191C1E]/30"
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
          <div className="w-full sm:w-[80%] aspect-square rounded-2xl overflow-hidden bg-[#ECEBE8] border border-[#191C1E]/10 flex items-center justify-center relative">
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

            {/* Reserved / Placed Overlay */}
            {!isAvailable && (
              <div className="absolute inset-0 bg-[#191C1E]/60 backdrop-blur-[1px] flex items-center justify-center">
                <span className="bg-[#191C1E] text-[#ECEBE8] border border-[#C87A3E] text-xs sm:text-sm font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-xl">
                  Already Reserved
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Product Details & Options */}
        <div className="flex-1 flex flex-col">
          <h1 className="font-extrabold text-2xl sm:text-3xl text-[#191C1E] tracking-tight leading-tight">
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
            <p className="pl-1.5 text-xs font-bold text-[#191C1E]/60">
              ({reviewsList.length} Verified Adoption Placements)
            </p>
          </div>

          {/* Pricing Tag & Availability Badge */}
          <div className="flex items-center gap-4 mt-4">
            <p className="text-3xl font-black text-[#191C1E] tracking-tight">
              {currency} {productData.price.toFixed(2)}
            </p>
            <span
              className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full ${
                isAvailable
                  ? "bg-[#C87A3E]/15 text-[#C87A3E] border border-[#C87A3E]/30"
                  : "bg-[#191C1E]/10 text-[#191C1E]/60 border border-[#191C1E]/20"
              }`}
            >
              {isAvailable ? "Available for Adoption" : "Reserved"}
            </span>
          </div>

          <p className="text-[#191C1E]/75 text-sm mt-4 leading-relaxed font-normal">
            {productData.description}
          </p>

          {/* Options Selection */}
          <div className="flex flex-col gap-3 my-6">
            <p className="text-xs font-bold text-[#191C1E]/50 uppercase tracking-wider">
              Pedigree Package / Health Certification
            </p>
            <div className="flex flex-wrap gap-2.5">
              {productData.sizes.map((item, index) => (
                <button
                  key={index}
                  disabled={!isAvailable}
                  onClick={() => setSize(item)}
                  type="button"
                  className={`py-2 px-4 text-xs sm:text-sm font-semibold rounded-xl border transition-all duration-150 ${
                    !isAvailable
                      ? "border-[#191C1E]/10 bg-[#191C1E]/5 text-[#191C1E]/40 cursor-not-allowed line-through"
                      : item === size
                        ? "border-[#C87A3E] bg-[#C87A3E]/15 text-[#191C1E] ring-2 ring-[#C87A3E]/20 cursor-pointer"
                        : "border-[#191C1E]/15 bg-[#ECEBE8] text-[#191C1E] hover:border-[#C87A3E] cursor-pointer"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Action Trigger */}
          <motion.button
            whileHover={isAvailable ? { scale: 1.01 } : {}}
            whileTap={isAvailable ? { scale: 0.97 } : {}}
            disabled={!isAvailable}
            onClick={handleAddToCart}
            type="button"
            className={`w-full sm:w-auto self-start font-bold text-xs uppercase tracking-wider px-10 py-4 rounded-xl shadow-md transition-all duration-150 mb-6 ${
              isAvailable
                ? "bg-[#C87A3E] hover:bg-[#b86d34] text-[#191C1E] cursor-pointer"
                : "bg-[#191C1E]/20 text-[#191C1E]/40 cursor-not-allowed shadow-none"
            }`}
          >
            {isAvailable ? "Reserve Kitten" : "Already Reserved"}
          </motion.button>

          <hr className="border-[#191C1E]/10 my-4" />

          {/* Core Guarantees */}
          <div className="text-xs text-[#191C1E]/70 space-y-2 font-medium">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#C87A3E] rounded-full"></span>
              <p>DNA Certified N/N Clear: HCM, SMA & PKDef Genetic Panel</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#C87A3E] rounded-full"></span>
              <p>
                In-cabin flight nanny courier hand-delivery or direct nursery
                pickup
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#C87A3E] rounded-full"></span>
              <p>
                Includes TICA/CFA Registration, ISO Microchip & Vet Health
                Passport
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Product Information and Reviews Section */}
      <div className="mt-16 max-w-7xl mx-auto px-4 sm:px-8">
        {/* Tab Headers */}
        <div className="flex border-b border-[#191C1E]/10">
          <button
            onClick={() => setActiveTab("description")}
            className={`px-6 py-3 text-sm font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === "description"
                ? "border-[#C87A3E] text-[#191C1E]"
                : "border-transparent text-[#191C1E]/50 hover:text-[#191C1E]"
            }`}
          >
            Lineage & Breed Traits
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`px-6 py-3 text-sm font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === "reviews"
                ? "border-[#C87A3E] text-[#191C1E]"
                : "border-transparent text-[#191C1E]/50 hover:text-[#191C1E]"
            }`}
          >
            Adopter Placements ({reviewsList.length})
          </button>
        </div>

        {/* Tab Contents */}
        <div className="border border-t-0 border-[#191C1E]/10 rounded-b-2xl p-6 sm:p-8 bg-[#ECEBE8] text-[#191C1E]/80 text-sm leading-relaxed">
          {activeTab === "description" ? (
            <div className="space-y-4 font-normal">
              <p>{productData.description}</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin">
              {reviewsList.map((rev, idx) => (
                <div
                  key={idx}
                  className="bg-[#ECEBE8] p-4 rounded-xl border border-[#191C1E]/10 shadow-sm"
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-7 h-7 rounded-full bg-[#C87A3E]/20 text-[#C87A3E] flex items-center justify-center font-bold text-xs uppercase">
                      {rev.initials}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#191C1E]">
                        {rev.name}
                      </p>
                      <p className="text-[10px] text-[#191C1E]/50 font-medium">
                        Verified Adopter
                      </p>
                    </div>
                  </div>
                  <p className="font-normal text-[#191C1E]/75 leading-relaxed text-xs sm:text-sm">
                    {rev.comment}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Dynamic Related Products */}
      <div className="mt-20 max-w-7xl mx-auto px-4 sm:px-8">
        <RelatedProducts
          category={productData.category}
          subCategory={productData.subCategory}
        />
      </div>
    </div>
  ) : (
    <div className="min-h-[50vh] flex items-center justify-center bg-[#ECEBE8]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#C87A3E]"></div>
    </div>
  );
};

export default Product;
