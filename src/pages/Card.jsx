import React from "react";
import { assets } from "../assets/assets";
import { shopContext } from "../context/shopContext";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import SEO from "../components/SEO";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } =
    React.useContext(shopContext);
  const [cartData, setCartData] = React.useState([]);

  React.useEffect(() => {
    if (products.length > 0) {
      const tempData = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  // Handle and sanitize quantity input changes
  const handleQtyChange = (e, itemId, itemSize) => {
    const val = e.target.value;

    // Allow user to clear input temporarily while typing
    if (val === "") return;

    const parsedQty = Math.floor(Number(val));
    const finalQty = parsedQty < 1 ? 1 : parsedQty;

    updateQuantity(itemId, itemSize, finalQty);
  };

  return (
    <div className="border-t border-[#191C1E]/10 pt-10 pb-16 px-4 max-w-6xl mx-auto text-[#191C1E] bg-[#ECEBE8]">
      <SEO
        title="Maine Coon Haven | Adoption Cart & Reservation Summary"
        description="Review your selected Maine Coon kittens, mature cats, and essentials before submitting your reservation inquiry."
        keywords="Maine Coon cart, reserve Maine Coon kitten, buy Maine Coon kitten, pedigree cat reservation"
        url="https://www.mainecoonhaven.com/cart"
      />

      {/* Title Section */}
      <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#191C1E] mb-8">
        <Title text1={"YOUR"} text2={"ADOPTION CART"} />
      </div>

      {/* Cart Items Table Wrapper */}
      <div className="flex flex-col gap-3">
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item._id,
          );

          // Fallback if productData isn't loaded yet
          if (!productData) return null;

          return (
            <div
              key={index}
              className="py-4 border border-[#191C1E]/10 bg-[#ECEBE8] text-[#191C1E] grid grid-cols-[1fr_auto_auto] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-3 sm:gap-6 px-3 sm:px-5 rounded-2xl transition-colors hover:border-[#C87A3E]/60 shadow-sm"
            >
              {/* Product Info Block */}
              <div className="flex items-center gap-3 sm:gap-6 min-w-0">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border border-[#191C1E]/10 flex-shrink-0 bg-[#191C1E]/5">
                  <img
                    className="w-full h-full object-cover"
                    src={
                      Array.isArray(productData.image)
                        ? productData.image[0]
                        : productData.image
                    }
                    alt={productData.name}
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-sm sm:text-base font-extrabold text-[#191C1E] truncate">
                    {productData.name}
                  </p>
                  <div className="flex items-center gap-2 sm:gap-3 mt-1.5 flex-wrap">
                    <p className="text-xs sm:text-sm font-black text-[#191C1E]">
                      {typeof productData.price === "number"
                        ? productData.price.toLocaleString()
                        : productData.price}
                      <span className="text-[10px] text-[#191C1E]/50 font-bold ml-1 uppercase">
                        {currency}
                      </span>
                    </p>
                    {item.size && (
                      <p className="px-2 py-0.5 text-[10px] sm:text-xs font-extrabold uppercase tracking-wider border border-[#191C1E]/20 bg-[#191C1E]/5 text-[#191C1E] rounded-md">
                        Option: {item.size}
                      </p>
                    )}
                  </div>
                  {productData.sellerName && (
                    <p className="text-[11px] text-[#191C1E]/60 font-semibold mt-1 truncate">
                      🏡 Cattery: {productData.sellerName}
                    </p>
                  )}
                </div>
              </div>

              {/* Quantity Input Block
              <div className="flex justify-center sm:justify-start px-1">
                <input
                  type="number"
                  min="1"
                  step="1"
                  defaultValue={item.quantity}
                  className="border border-[#191C1E]/20 rounded-xl bg-[#ECEBE8] focus:bg-white focus:ring-2 focus:ring-[#C87A3E]/20 focus:border-[#C87A3E] outline-none w-12 sm:w-20 px-2 py-2 text-center text-xs sm:text-sm font-bold text-[#191C1E] transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  onChange={(e) => handleQtyChange(e, item._id, item.size)}
                  onBlur={(e) => {
                    if (e.target.value === "" || Number(e.target.value) < 1) {
                      e.target.value = "1";
                      updateQuantity(item._id, item.size, 1);
                    }
                  }}
                />
              </div>
               */}

              {/* Delete Icon Block */}
              <div className="flex justify-end pl-1">
                <button
                  type="button"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Remove this item from your Maine Coon adoption cart?",
                      )
                    ) {
                      updateQuantity(item._id, item.size, 0);
                    }
                  }}
                  className="w-9 h-9 sm:w-10 sm:h-10 p-2 rounded-xl border border-transparent hover:border-[#191C1E]/20 cursor-pointer flex items-center justify-center bg-[#191C1E]/5 text-[#191C1E]/60 hover:text-[#191C1E] transition-all"
                  aria-label="Remove item"
                >
                  <img
                    src={assets.bin_icon}
                    className="w-4 h-4 sm:w-5 sm:h-5 object-contain opacity-70 hover:opacity-100"
                    alt="Remove item"
                  />
                </button>
              </div>
            </div>
          );
        })}

        {/* Empty Cart Placeholder */}
        {cartData.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 bg-[#ECEBE8] border border-dashed border-[#191C1E]/20 rounded-2xl mt-4">
            <p className="text-[#191C1E] font-extrabold mb-1">
              You haven't reserved a gentle giant so far
            </p>
            <p className="text-xs text-[#191C1E]/60 mb-6">
              Browse our cattery catalog to select Maine Coon kittens, mature
              cats, or essential supplies.
            </p>
            <button
              onClick={() => navigate("/collection")}
              className="bg-[#C87A3E] hover:bg-[#b86d34] text-[#191C1E] text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl transition-all shadow-sm cursor-pointer"
            >
              Explore Available Litters
            </button>
          </div>
        )}
      </div>

      {/* Cart Summary & Checkout Action */}
      {cartData.length > 0 && (
        <div className="flex justify-end mt-12">
          <div className="w-full sm:w-[480px]">
            <div className="bg-[#ECEBE8] border border-[#191C1E]/10 rounded-2xl p-6 shadow-sm">
              <CartTotal />
            </div>

            <div className="w-full text-end">
              <button
                onClick={() => navigate("/place-order")}
                className="w-full bg-[#191C1E] hover:bg-[#191C1E]/90 active:scale-[0.99] text-[#ECEBE8] text-xs font-extrabold uppercase tracking-widest my-6 px-10 py-4 rounded-xl shadow-md transition-all cursor-pointer"
              >
                PROCEED TO RESERVATION
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
