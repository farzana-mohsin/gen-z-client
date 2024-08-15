import { useLoaderData } from "react-router-dom";
import Navbar from "./Components/Navbar";
import { useState } from "react";
import SingleProduct from "./Components/SingleProduct";

function App() {
  const loader = useLoaderData();
  const [allProducts] = useState(loader);
  return (
    <>
      <Navbar></Navbar>
      <div>
        {allProducts.map((item, index) => (
          <SingleProduct
            key={index}
            item={item}
          ></SingleProduct>
        ))}
      </div>
    </>
  );
}

export default App;
