import React, { useContext } from "react";
import { shopContext } from "../context/shopContext";
import { Link } from "react-router-dom";
import { HiOutlineLocationMarker, HiOutlineUser } from "react-icons/hi";

const ProductItem = ({
  id,
  image,
  name,
  price,
  sellerName,
  location,
  available = true,
  loading = "lazy",
}) => {
  const { currency } = useContext(shopContext);

  // Extract primary image source safely
  const imgSrc =
    Array.isArray(image) && image.length > 0 ? image[0] : image || "";

  // Block click navigation if item is sold out / unavailable
  const handleClick = (e) => {
    if (!available) {
      e.preventDefault();
    }
  };

  return (
    <Link
      to={`/product/${id}`}
      onClick={handleClick}
      className={`text-slate-800 block w-full select-none bg-white p-3 sm:p-4 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 ${
        available
          ? "cursor-pointer group hover:-translate-y-1"
          : "cursor-not-allowed opacity-80"
      }`}
    >
      {/* Product Image Container - Enlarged Aspect Ratio & Height */}
      <div className="overflow-hidden rounded-xl shadow-inner bg-slate-100 aspect-[4/3] w-full relative">
        <img
          src={imgSrc}
          alt={name}
          loading={loading}
          decoding="async"
          className={`w-full h-full object-cover object-center transition-transform duration-500 ease-out block ${
            available
              ? "group-hover:scale-108"
              : "grayscale filter brightness-95"
          }`}
        />

        {/* Sold Out Visual Overlay */}
        {!available && (
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-[1px] flex items-center justify-center">
            <span className="bg-rose-600 text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md">
              Adopted
            </span>
          </div>
        )}
      </div>

      {/* Product Details - Scaled Up Font Sizes & Spacing */}
      <div className="pt-4 pb-1 flex flex-col gap-1.5">
        <p
          className={`text-base sm:text-lg font-bold line-clamp-1 transition-colors ${
            available
              ? "text-[#0B1E2D] group-hover:text-sky-600"
              : "text-slate-400 line-through"
          }`}
        >
          {name}
        </p>

        <p
          className={`text-base sm:text-lg font-extrabold ${
            available ? "text-[#0B1E2D]" : "text-slate-400"
          }`}
        >
          {currency}{" "}
          {typeof price === "number" ? price.toLocaleString() : price}
        </p>

        {/* Depot Location & Yard Info Tags */}
        {(sellerName || location) && (
          <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500 pt-2.5 border-t border-slate-100 mt-2">
            {sellerName && (
              <div className="flex items-center gap-1.5 min-w-0">
                <HiOutlineUser className="text-sky-600 text-base flex-shrink-0" />
                <span className="truncate font-medium">{sellerName}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProductItem;
