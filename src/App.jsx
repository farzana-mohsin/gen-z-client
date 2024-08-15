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
          <label className='input input-bordered flex items-center gap-2'>
            <input
              type='text'
              className='grow'
              placeholder='Search'
            />
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 16 16'
              fill='currentColor'
              className='h-4 w-4 opacity-70'
            >
              <path
                fillRule='evenodd'
                d='M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z'
                clipRule='evenodd'
              />
            </svg>
          </label>
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
