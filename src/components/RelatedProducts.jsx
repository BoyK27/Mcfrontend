import React, { useContext, useEffect, useState } from "react";
import { shopContext } from "../context/shopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(shopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      let productsCopy = products.slice();

      productsCopy = productsCopy.filter((item) => category === item.category);
      productsCopy = productsCopy.filter(
        (item) => subCategory === item.subCategory,
      );

      // Display up to 4 related pets cleanly
      setRelated(productsCopy.slice(0, 4));
    }
  }, [products, category, subCategory]);

  return (
    <div className="my-24 py-12 px-4 sm:px-8 md:px-12 bg-amber-50/40 rounded-3xl border border-amber-900/10 shadow-sm">
      <div className="text-center py-6 text-3xl">
        <Title text1={"SIMILAR"} text2={"PETS"} />
      </div>

      {/* Grid Container - 4 Columns on desktop for standard pet grid showcase */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 gap-y-12 mt-8 max-w-7xl mx-auto">
        {related.map((item) => (
          <div key={item._id} className="w-full">
            <ProductItem
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
              sellerName={item.sellerName}
              location={item.location}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
