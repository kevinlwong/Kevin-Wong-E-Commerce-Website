import { useContext } from "react";
import { ProductsContext } from "./ProductsContext";

/* eslint-disable @next/next/no-img-element */
export default function Product({ _id, name, price, description, picture }) {
  const { setSelectedProducts } = useContext(ProductsContext);

  function addProduct() {
    setSelectedProducts((prev) => [...prev, _id]);
  }

  function removeProduct() {
    setSelectedProducts((prev = []) => {
      const index = prev.indexOf(_id); // Find the first occurrence of _id
      if (index === -1) return prev; // If not found, return the same array

      const newProducts = [...prev]; // Create a shallow copy of the array
      newProducts.splice(index, 1); // Remove only the first occurrence
      return newProducts;
    });
  }

  return (
    <div className="w-64">
      <div className="bg-blue-100 p-5 rounded-xl">
        <img src={picture} alt="" />
      </div>
      <div className="mt-2">
        <h3 className="font-sans text-3xl">{name}</h3>
      </div>
      <p className=" text-balance text-sm mt-5 mb-5 leading-5 text-gray-600">
        {description}
      </p>
      <div className="flex mt-1">
        <div className="text-2xl font-sans font-bold grow">${price}</div>
        <button
          onClick={removeProduct}
          className="bg-red-400 text-white mx-2 py-1 px-3.5 rounded-xl "
        >
          -
        </button>
        <button
          onClick={addProduct}
          className="bg-blue-300 text-white py-1 px-3 rounded-xl"
        >
          +
        </button>
      </div>
    </div>
  );
}
