/* eslint-disable @next/next/no-img-element */

import Product from "../components/Product";
import { initMongoose } from "@/lib/mongoose";
import { useEffect } from "react";
import { useState } from "react";
import { findAllProducts } from "./api/products.js";
import Footer from "@/components/Footer";
import Layout from "@/components/Layout";

export default function Home({ products }) {
  const [phrase, setPhrase] = useState("");

  const categoriesNames = [...new Set(products.map((p) => p.category))];

  if (phrase) {
    products = products.filter((p) => p.name.toLowerCase().includes(phrase));
  }

  return (
    <Layout>
      <input
        value={phrase}
        onChange={(e) => setPhrase(e.target.value)}
        type="text"
        placeholder="Search for products..."
        className="bg-gray-100 w-full py-2 px-4 rounded-xl"
      />
      <div className="title">
        <h1 className="font-sans font-bold text-7xl mt-5 mb-5 ">
            Kevin&apos;s E-Store
        </h1>
      </div>
      <div>
        {categoriesNames.map((categoryName) => (
          <div key={categoryName}>
            {products.find((p) => p.category === categoryName) && (
              <div>
                <h2 className="text-2xl py-5 capitalize">{categoryName}</h2>
                <div className="flex -mx-5 overflow-x-scroll snap-x scrollbar-hide">
                  {products
                    .filter((p) => p.category === categoryName)
                    .map((productInfo) => (
                      <div key={productInfo._id} className="px-5 snap-start">
                        <Product {...productInfo} />
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>


    </Layout>
  );
}

export async function getServerSideProps() {
  await initMongoose();
  const products = await findAllProducts();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
