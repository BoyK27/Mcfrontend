import React from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { shopContext } from "../context/shopContext";
import { toast } from "react-toastify";
import SEO from "../components/SEO";

const PlaceOrder = () => {
  const [method, setMethod] = React.useState("cod");

  // Verified Nursery Line (+1 (912) 845-3708)
  const COMPANY_WHATSAPP_NUMBER = "19128453708";

  const {
    navigate,
    cartItems,
    setCartItems,
    getCartAmount,
    currency,
    products,
  } = React.useContext(shopContext);

  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  };

  // Structured WhatsApp message for Maine Coon Reservations
  const sendWhatsAppNotification = (orderItems, grandTotal) => {
    let itemsSummary = orderItems
      .map(
        (item, idx) =>
          `*${idx + 1}. ${item.name}*\n   - Option/Tag: ${item.size || "Standard"}\n   - Qty: ${item.quantity}\n   - Fee: ${currency} ${item.price.toLocaleString()}`,
      )
      .join("\n\n");

    const message = `🐾 *NEW MAINE COON ADOPTION / RESERVATION INQUIRY*

👤 *Adopter Details:*
• *Name:* ${formData.firstName} ${formData.lastName}
• *Phone:* ${formData.phone}
• *Email:* ${formData.email}
• *Address:* ${formData.street}, ${formData.city}, ${formData.state}, ${formData.country} (Zip: ${formData.zipcode})

 *Selected Maine Coons / Essentials:*
${itemsSummary}

*Financial Summary:*
• *Total:* ${currency} ${grandTotal.toLocaleString()}
• *Payment Method:* Payment Upon Nursery Confirmation & Adoption Finalization

Please verify kitten availability, TICA/CFA genetic health certifications (HCM/SMA), and flight nanny travel schedule.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${COMPANY_WHATSAPP_NUMBER}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items),
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      if (orderItems.length === 0) {
        toast.error("Your adoption cart is empty!");
        return;
      }

      const grandTotal = getCartAmount();

      // Send structured WhatsApp reservation directly
      sendWhatsAppNotification(orderItems, grandTotal);

      // Reset cart state
      setCartItems({});
      toast.success("Adoption reservation generated! Opening WhatsApp...");

      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while placing your adoption inquiry.");
    }
  };

  return (
    <div className="relative max-w-6xl mx-auto px-4 py-8 text-[#191C1E] bg-[#ECEBE8]">
      <SEO
        title="Maine Coon Haven | Complete Adoption & Reservation"
        description="Finalize your purebred Maine Coon kitten adoption. Verified DNA clearances, in-cabin flight nanny options, and payment upon nursery confirmation."
        keywords="Maine Coon adoption, reserve Maine Coon kitten, TICA cattery checkout, purebred Maine Coon"
        url="https://www.mainecoonhaven.com/place-order"
      />
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col lg:flex-row justify-between gap-10 pt-5 sm:pt-10 min-h-[80vh] border-t border-[#191C1E]/10"
      >
        {/* Left side - Delivery Info */}
        <div className="flex flex-col gap-4 w-full lg:max-w-[480px]">
          <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#191C1E] mb-4">
            <Title text1={"DELIVERY"} text2={"INFORMATION"} />
          </div>

          <div className="flex gap-3">
            <input
              onChange={onChangeHandler}
              name="firstName"
              value={formData.firstName}
              type="text"
              placeholder="First Name"
              className="border border-[#191C1E]/20 bg-[#ECEBE8] focus:bg-white focus:ring-2 focus:ring-[#C87A3E]/20 focus:border-[#C87A3E] outline-none rounded-xl py-2.5 px-4 w-full text-sm font-semibold transition-all"
              required
            />

            <input
              onChange={onChangeHandler}
              name="lastName"
              value={formData.lastName}
              type="text"
              placeholder="Last Name"
              className="border border-[#191C1E]/20 bg-[#ECEBE8] focus:bg-white focus:ring-2 focus:ring-[#C87A3E]/20 focus:border-[#C87A3E] outline-none rounded-xl py-2.5 px-4 w-full text-sm font-semibold transition-all"
              required
            />
          </div>

          <input
            onChange={onChangeHandler}
            name="email"
            value={formData.email}
            type="email"
            placeholder="Email Address"
            className="border border-[#191C1E]/20 bg-[#ECEBE8] focus:bg-white focus:ring-2 focus:ring-[#C87A3E]/20 focus:border-[#C87A3E] outline-none rounded-xl py-2.5 px-4 w-full text-sm font-semibold transition-all"
            required
          />
          <input
            onChange={onChangeHandler}
            name="street"
            value={formData.street}
            type="text"
            placeholder="Street / Residence Location"
            className="border border-[#191C1E]/20 bg-[#ECEBE8] focus:bg-white focus:ring-2 focus:ring-[#C87A3E]/20 focus:border-[#C87A3E] outline-none rounded-xl py-2.5 px-4 w-full text-sm font-semibold transition-all"
            required
          />

          <div className="flex gap-3">
            <input
              onChange={onChangeHandler}
              name="city"
              value={formData.city}
              type="text"
              placeholder="City"
              className="border border-[#191C1E]/20 bg-[#ECEBE8] focus:bg-white focus:ring-2 focus:ring-[#C87A3E]/20 focus:border-[#C87A3E] outline-none rounded-xl py-2.5 px-4 w-full text-sm font-semibold transition-all"
              required
            />

            <input
              onChange={onChangeHandler}
              name="state"
              value={formData.state}
              type="text"
              placeholder="State / Region"
              className="border border-[#191C1E]/20 bg-[#ECEBE8] focus:bg-white focus:ring-2 focus:ring-[#C87A3E]/20 focus:border-[#C87A3E] outline-none rounded-xl py-2.5 px-4 w-full text-sm font-semibold transition-all"
              required
            />
          </div>

          <div className="flex gap-3">
            <input
              onChange={onChangeHandler}
              name="zipcode"
              value={formData.zipcode}
              type="number"
              placeholder="Zip Code"
              required
              className="border border-[#191C1E]/20 bg-[#ECEBE8] focus:bg-white focus:ring-2 focus:ring-[#C87A3E]/20 focus:border-[#C87A3E] outline-none rounded-xl py-2.5 px-4 w-full text-sm font-semibold transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />

            <input
              onChange={onChangeHandler}
              name="country"
              value={formData.country}
              type="text"
              placeholder="Country"
              className="border border-[#191C1E]/20 bg-[#ECEBE8] focus:bg-white focus:ring-2 focus:ring-[#C87A3E]/20 focus:border-[#C87A3E] outline-none rounded-xl py-2.5 px-4 w-full text-sm font-semibold transition-all"
              required
            />
          </div>

          <input
            onChange={onChangeHandler}
            name="phone"
            value={formData.phone}
            type="number"
            placeholder="Phone Number (e.g. 1xxxxxxxx)"
            className="border border-[#191C1E]/20 bg-[#ECEBE8] focus:bg-white focus:ring-2 focus:ring-[#C87A3E]/20 focus:border-[#C87A3E] outline-none rounded-xl py-2.5 px-4 w-full text-sm font-semibold transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            required
          />
        </div>

        {/* Right side - Order Summary & Payment Method */}
        <div className="flex-1 lg:max-w-[500px]">
          <div className="bg-[#ECEBE8] border border-[#191C1E]/10 rounded-2xl p-6 shadow-sm">
            <CartTotal />
          </div>

          <div className="mt-10">
            <div className="text-xl sm:text-2xl font-semibold tracking-tight text-[#191C1E] mb-6">
              <Title text1={"PAYMENT"} text2={"TERMS"} />
            </div>

            {/* Adoption Finalization Option */}
            <div className="flex flex-col gap-3">
              <div
                onClick={() => setMethod("cod")}
                className="flex items-center gap-4 border p-4 cursor-pointer rounded-xl transition-all border-[#C87A3E] bg-[#ECEBE8]"
              >
                <div className="min-w-4 h-4 border border-[#C87A3E] rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#C87A3E]"></div>
                </div>
                <div>
                  <p className="text-[#191C1E] text-sm font-semibold">
                    Payment Upon Cattery Finalization & Inspection
                  </p>
                  <p className="text-xs text-[#191C1E]/60 mt-0.5">
                    Settle upon in-cabin flight nanny arrival or after in-person
                    inspection at our nursery.
                  </p>
                </div>
              </div>
            </div>

            {/* Place Order button */}
            <div className="w-full text-end mt-8">
              <button
                type="submit"
                className="w-full sm:w-auto bg-[#191C1E] hover:bg-[#191C1E]/90 active:scale-98 text-[#ECEBE8] text-sm font-semibold px-16 py-3.5 rounded-xl shadow-md transition-all cursor-pointer"
              >
                Submit Adoption Reservation
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
