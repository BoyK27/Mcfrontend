import React from "react";
import { shopContext } from "../context/shopContext";
import Title from "../components/Title";
import axios from "axios";
import { motion } from "motion/react";
import SEO from "../components/SEO";

const Orders = () => {
  const { currency, backendUrl, token, navigate } =
    React.useContext(shopContext);

  const [orderData, setOrderData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const loadOrderData = async () => {
    try {
      const authToken = token || localStorage.getItem("token");

      if (!authToken) {
        setLoading(false);
        return;
      }

      setLoading(true);
      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token: authToken } },
      );

      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;

            allOrdersItem.push(item);
          });
        });
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    loadOrderData();
  }, [token]);

  // Helper function to map backend payment methods to user-friendly UI labels
  const formatPaymentMethod = (method) => {
    if (!method) return "Pending";
    if (method.toLowerCase() === "cod") {
      return "Payment on agent confirmation";
    }
    return method;
  };

  // Helper functions for status states
  const isRejectedStatus = (status) => {
    return (
      status?.toLowerCase() === "rejected" ||
      status?.toLowerCase() === "cancelled"
    );
  };

  const isDeliveredStatus = (status) => {
    return status?.toLowerCase() === "delivered";
  };

  const authToken = token || localStorage.getItem("token");

  return (
    <div className="border-t border-slate-100 pt-10 pb-16">
      <SEO
        title="Marine Box | Container Inquiries & Order History"
        description="Track your container orders and logistics inquiries on Marine Box."
        keywords="Marine Box, container orders, shipment tracking"
        url="https://www.marine-box.com/orders"
      />

      {/* Title Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#0B1E2D] mb-8"
      >
        <Title text1={"MY"} text2={"CONTAINER INQUIRIES & ORDERS"} />
      </motion.div>

      {/* Guest Banner State */}
      {!authToken && !loading && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-16 px-4 border border-dashed border-slate-200 rounded-2xl bg-slate-50/60 text-center mb-8"
        >
          <p className="text-base font-extrabold text-[#0B1E2D] mb-2">
            Placed an order as a guest?
          </p>
          <p className="text-xs text-slate-500 max-w-md mb-6 leading-relaxed font-medium">
            Guest order confirmations and tracking details are sent directly to
            your phone and email. Create or log into an account to manage all
            your bookings in one place.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => navigate("/login")}
              className="bg-[#0B1E2D] hover:bg-[#0B1E2D]/90 text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl transition-all shadow-sm cursor-pointer"
            >
              Sign In to View Dashboard
            </button>
            <button
              onClick={() => navigate("/collection")}
              className="border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl transition-all cursor-pointer"
            >
              Browse Containers
            </button>
          </div>
        </motion.div>
      )}

      {/* Orders List Container */}
      <div className="flex flex-col gap-4">
        {orderData.map((item, index) => {
          const isRejected = isRejectedStatus(item.status);
          const isDelivered = isDeliveredStatus(item.status);

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.04 }}
              className="p-5 border border-slate-100/80 rounded-2xl bg-white shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-6 hover:shadow-md transition-all duration-200"
            >
              {/* Left Side: Container Image & Details */}
              <div className="flex items-start gap-5 text-sm flex-1">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border border-slate-100 flex-shrink-0 bg-slate-50 aspect-square">
                  <img
                    src={Array.isArray(item.image) ? item.image[0] : item.image}
                    className="w-full h-full object-cover"
                    alt={item.name}
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-base sm:text-lg font-black text-[#0B1E2D] tracking-tight truncate">
                    {item.name}
                  </p>

                  {/* Spec badges */}
                  <div className="flex flex-wrap items-center gap-2.5 mt-2 text-xs font-semibold">
                    <p className="text-sm font-black text-[#0B1E2D]">
                      {typeof item.price === "number"
                        ? item.price.toLocaleString()
                        : item.price}{" "}
                      <span className="text-xs text-slate-400 font-bold uppercase">
                        {currency}
                      </span>
                    </p>
                    <span className="h-4 w-px bg-slate-200"></span>
                    <p className="px-2 py-0.5 rounded-md border border-slate-200 bg-slate-50 text-slate-600 font-bold">
                      Qty: {item.quantity}
                    </p>
                    {item.size && (
                      <p className="px-2 py-0.5 rounded-md border border-[#0B1E2D]/20 bg-[#0B1E2D]/5 text-[#0B1E2D] font-extrabold uppercase">
                        Size: {item.size}
                      </p>
                    )}
                  </div>

                  {/* Supplier Depot & Location info */}
                  {(item.sellerName || item.location) && (
                    <div className="mt-2.5 flex flex-wrap items-center gap-3 text-xs text-slate-500 font-semibold">
                      {item.sellerName && (
                        <span>
                          🏗️ Depot:{" "}
                          <strong className="text-[#0B1E2D]">
                            {item.sellerName}
                          </strong>
                        </span>
                      )}
                      {item.location && (
                        <span>
                          📍 Location:{" "}
                          <strong className="text-slate-700">
                            {item.location}
                          </strong>
                        </span>
                      )}
                    </div>
                  )}

                  {/* Tracking & Date Details */}
                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 font-medium">
                    <p>
                      Date Booked:{" "}
                      <span className="text-slate-800 font-semibold">
                        {new Date(item.date).toLocaleString()}
                      </span>
                    </p>
                    <p>
                      Payment Method:{" "}
                      <span className="text-[#0B1E2D] tracking-wider font-extrabold text-[11px]">
                        {formatPaymentMethod(item.paymentMethod)}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Side: Status Indicator & Tracking Trigger */}
              <div className="md:w-5/12 flex items-center justify-between gap-4 border-t md:border-t-0 pt-4 md:pt-0 border-slate-100">
                {/* Dynamic Status Indicator */}
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span
                      className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                        isRejected
                          ? "bg-rose-400"
                          : isDelivered
                            ? "bg-emerald-400"
                            : "bg-sky-400"
                      }`}
                    ></span>
                    <span
                      className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                        isRejected
                          ? "bg-rose-500"
                          : isDelivered
                            ? "bg-emerald-500"
                            : "bg-[#0B1E2D]"
                      }`}
                    ></span>
                  </span>
                  <p
                    className={`text-xs sm:text-sm font-extrabold tracking-wide uppercase ${
                      isRejected
                        ? "text-rose-600"
                        : isDelivered
                          ? "text-emerald-600"
                          : "text-[#0B1E2D]"
                    }`}
                  >
                    {item.status}
                  </p>
                </div>

                {/* Status Refresh Action Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={loadOrderData}
                  className="border border-[#0B1E2D]/20 hover:bg-[#0B1E2D] hover:text-white text-[#0B1E2D] bg-white text-xs font-black uppercase tracking-wider px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer shadow-sm"
                >
                  Track Logistics
                </motion.button>
              </div>
            </motion.div>
          );
        })}

        {/* Empty State for Authenticated Users with no orders */}
        {authToken && !loading && orderData.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 border border-dashed border-slate-200 rounded-2xl bg-slate-50/50"
          >
            <p className="text-slate-400 font-bold mb-1">
              No container bookings or orders found
            </p>
            <p className="text-xs text-slate-400">
              When you submit a container inquiry or place an order, your
              logistics history will appear here.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Orders;
