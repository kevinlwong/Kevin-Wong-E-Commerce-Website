import Layout from "../components/Layout";
import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../components/ProductsContext";

export default function CheckoutPage() {
  const { selectedProducts, setSelectedProducts } = useContext(ProductsContext);
  const [productsInfos, setProductsInfos] = useState([]);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const uniqIds = [...new Set(selectedProducts)];
    fetch("/api/products?ids=" + uniqIds.join(","))
      .then((response) => response.json())
      .then((json) => setProductsInfos(json));
  }, [selectedProducts]);

  function moreOfThisProduct(id) {
    setSelectedProducts((prev) => [...prev, id]);
  }

  function lessOfThisProduct(id) {
    const pos = selectedProducts.indexOf(id);
    if (pos !== -1) {
      setSelectedProducts((prev) => {
        return prev.filter((value, index) => index !== pos);
      });
    }
  }

  return (
    <div>
      <Layout>
        {!productsInfos.length && <div>no products in your shopping cart</div>}
        {productsInfos.length &&
          productsInfos.map((productInfo) => (
            <div className="flex mb-5">
              <div className="bg-gray-100 p-3 rounded-xl shrink-0">
                <img className="w-24" src={productInfo.picture} alt="" />
              </div>
              <div className="pl-4">
                <h3 className="font-bold text-lg">{productInfo.name}</h3>
                <p className="text-sm leading-4 text-gray-500">
                  {productInfo.description}
                </p>
                <div className="flex">
                  <div className="grow">${productInfo.price}</div>
                  <div>
                    <button
                      onClick={() => lessOfThisProduct(productInfo._id)}
                      className="border border-emerald-500 px-2 rounded-lg text-emerald-500"
                    >
                      -
                    </button>
                    <span className="px-2">
                      {
                        selectedProducts.filter((id) => id === productInfo._id)
                          .length
                      }
                    </span>
                    <button
                      onClick={() => moreOfThisProduct(productInfo._id)}
                      className="bg-emerald-500 px-2 rounded-lg text-white"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        <div className="mt-4">
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2"
            type="text"
            placeholder="Street address, number"
          />
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2"
            type="text"
            placeholder="City and postal code"
          />
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2"
            type="text"
            placeholder="Your name"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2"
            type="email"
            placeholder="Email address"
          />
        </div>

        <div className="mt-4">
          <div className="flex">
            <h3 className="grow">Subtotal:</h3>
            <h3>$123</h3>
          </div>
          <div className="flex">
            <h3 className="grow">Delivery:</h3>
            <h3>$123</h3>
          </div>
          <div className="flex">
            <h3 className="grow">Total:</h3>
            <h3>$123</h3>
          </div>
        </div>
      </Layout>
    </div>
  );
}
