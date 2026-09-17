import React, { createContext, useState, useEffect } from "react";
// import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const shopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 0;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});

  // Initialize token synchronously directly from localStorage
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  // Add Item to Cart
  const addToCart = async (itemId, size) => {
    if (!size) {
      // toast.error("Select Product Size");
      return;
    }

    let cartData = structuredClone(cartItems);

    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    if (cartData[itemId][size]) {
      cartData[itemId][size] += 1;
    } else {
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);

    const activeToken = token || localStorage.getItem("token");

    if (activeToken) {
      try {
        await axios.post(
          backendUrl + "/api/cart/add",
          { itemId, size },
          { headers: { token: activeToken } },
        );
      } catch (error) {
        console.log(error);
        // toast.error(error.message);
      }
    }
  };

  // Get Total Items Count
  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalCount;
  };

  // Update Cart Quantity
  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;

    setCartItems(cartData);

    const activeToken = token || localStorage.getItem("token");

    if (activeToken) {
      try {
        await axios.post(
          backendUrl + "/api/cart/update",
          { itemId, size, quantity },
          { headers: { token: activeToken } },
        );
      } catch (error) {
        console.log(error);
        // toast.error(error.message);
      }
    }
  };

  // Calculate Total Amount
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);

      if (itemInfo) {
        for (const item in cartItems[items]) {
          try {
            if (cartItems[items][item] > 0) {
              totalAmount += itemInfo.price * cartItems[items][item];
            }
          } catch (error) {}
        }
      }
    }
    return totalAmount;
  };

  // Fetch Products Data
  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        // toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      // toast.error(error.message);
    }
  };

  // Fetch Cart Data for Logged-In User
  const getUserCart = async (userToken) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        { headers: { token: userToken } },
      );

      if (response.data.success) {
        setCartItems(response.data.cartData || {});
      }
    } catch (error) {
      console.log(error);
      // toast.error(error.message);
    }
  };

  // Fetch products on initial mount
  useEffect(() => {
    getProductsData();
  }, []);

  // Handle token changes and initial load together safely
  useEffect(() => {
    const savedToken = token || localStorage.getItem("token");
    if (savedToken) {
      getUserCart(savedToken);
    } else {
      setCartItems({}); // Only clear if no token exists in state or localStorage
    }
  }, [token]);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken,
  };

  return (
    <shopContext.Provider value={value}>{props.children}</shopContext.Provider>
  );
};

export default ShopContextProvider;
