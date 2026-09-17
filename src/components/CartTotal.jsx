import React from "react";
import { shopContext } from "../context/shopContext";
import Title from "./Title";

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } =
    React.useContext(shopContext);
  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={"CART"} text2={"TOTALS"} />
      </div>

      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>SubTotal</p>
          <p>
            {getCartAmount()}.00
            {currency}
          </p>
        </div>

        <hr />

        <div className="flex justify-between">
          <p>Transport Fee</p>
          <p>
            {delivery_fee}.00
            {currency}
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <b>Total</b>
          <b>
            {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}.00
            {currency}
          </b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
