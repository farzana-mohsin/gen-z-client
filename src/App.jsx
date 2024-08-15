import { useLoaderData } from "react-router-dom";
import Navbar from "./Components/Navbar";
import { useState } from "react";
import SingleProduct from "./Components/SingleProduct";

function App() {
  const loader = useLoaderData();
  const [allProducts, setAllProducts] = useState(loader);

  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    const input = form.input.value;
    const searchString = input;

    fetch(`${import.meta.env.VITE_API_URL}/product-name`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ key: searchString }),
    })
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
      });
  };

  return (
    <>
      <Navbar></Navbar>
      <div className='container mx-auto'>
        <div className='flex items-center justify-center'>
          <div className='dropdown'>
            <div
              tabIndex={0}
              role='button'
              className='btn m-1 px-20'
            >
              Sort
            </div>
            <ul
              tabIndex={0}
              className='dropdown-content menu bg-base-100 rounded-box z-[1] w-64 p-2 shadow'
            >
              <li>
                <a>Price (Low to High)</a>
              </li>
              <li>
                <a>Price (High to Low)</a>
              </li>
              <li>
                <a>Date Added (Newest first)</a>
              </li>
            </ul>
          </div>
          <form
            onSubmit={handleSearch}
            className='flex my-10'
          >
            <div className='join'>
              <input
                className='input input-bordered join-item rounded-l-xl border text-sm border-[#6faf9f]'
                name='input'
                placeholder='Search here'
              />
              <button
                type='submit'
                className='btn join-item rounded-r-xl bg-[#6faf9f] text-white  border text-sm hover:bg-[#727C82] border-[#f77d5c]'
              >
                Search
              </button>
            </div>
          </form>
        </div>
        <div className=' my-20 grid grid-cols-1 lg:grid-cols-3 gap-12'>
          {allProducts.map((item, index) => (
            <SingleProduct
              key={index}
              item={item}
            ></SingleProduct>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
