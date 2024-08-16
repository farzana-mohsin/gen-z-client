import { useLoaderData } from "react-router-dom";
import Navbar from "./Components/Navbar";
import { useState } from "react";
import SingleProduct from "./Components/SingleProduct";
import Slider from "react-slider";
import "./Components/style.css";

function App() {
  const loader = useLoaderData();
  const [allProducts, setAllProducts] = useState(loader);

  // handle search and sort
  // search
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

  const handleAscendPrice = () => {
    fetch(`${import.meta.env.VITE_API_URL}/products-by-price-ascend`, {
      // credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setAllProducts(data));
  };
  const handleDescendPrice = () => {
    fetch(`${import.meta.env.VITE_API_URL}/products-by-price-descend`, {
      // credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setAllProducts(data));
  };
  const handleDateAdded = () => {
    fetch(`${import.meta.env.VITE_API_URL}/products-by-date-added`, {
      // credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setAllProducts(data));
  };

  // handle filter
  // price range
  const [values, setValues] = useState([0, 200]);
  console.log(values);
  const handlePriceChange = (newValues) => setValues(newValues);

  // category
  const [category, setCategory] = useState("");
  const handleCategoryChange = (category) => {
    console.log(category);
    setCategory(category);
  };
  // brand name
  const [brand, setBrand] = useState("");
  const handleBrandChange = (brand) => {
    console.log(brand);
    setBrand(brand);
  };

  const handleFilter = () => {
    fetch(`${import.meta.env.VITE_API_URL}/filter-products`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        category,
        minPrice: values[0],
        maxPrice: values[1],
        brandName: brand,
      }),
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
        <h1>category: {category}</h1>
        <h1>Price: {values}</h1>
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
                <a onClick={handleAscendPrice}>Price: Low to High</a>
              </li>
              <li>
                <a onClick={handleDescendPrice}>Price: High to Low</a>
              </li>
              <li>
                <a onClick={handleDateAdded}>Date Added: Newest first</a>
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

        <div className='w-1/4 ml-auto'>
          <div
            style={{
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h2>Price Range</h2>
            {/* <p>Use the slider to select a price range:</p> */}
            <Slider
              className='slider'
              value={values}
              onChange={handlePriceChange}
              min={0}
              max={200}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <label htmlFor='minPrice'>Min Price:</label>
                <input
                  type='number'
                  id='minPrice'
                  value={values[0]}
                  onChange={(e) =>
                    handlePriceChange([+e.target.value, values[1]])
                  }
                />
              </div>
              <div>
                <label htmlFor='maxPrice'>Max Price:</label>
                <input
                  type='number'
                  id='maxPrice'
                  value={values[1]}
                  onChange={(e) =>
                    handlePriceChange([values[0], +e.target.value])
                  }
                />
              </div>
            </div>
          </div>

          <div className='dropdown'>
            <div
              tabIndex={0}
              role='button'
              className='btn m-1 px-20'
            >
              Category
            </div>
            <ul
              tabIndex={0}
              className='dropdown-content menu bg-base-100 rounded-box z-[1] w-64 p-2 shadow'
            >
              <li>
                <a onClick={() => handleCategoryChange("classic")}>Classic</a>
              </li>
              <li>
                <a onClick={() => handleCategoryChange("lifestyle")}>
                  Lifestyle
                </a>
              </li>
              <li>
                <a onClick={() => handleCategoryChange("walking")}>Walking</a>
              </li>
            </ul>
          </div>
          <div className='dropdown'>
            <div
              tabIndex={0}
              role='button'
              className='btn m-1 px-20'
            >
              Brand Name
            </div>
            <ul
              tabIndex={0}
              className='dropdown-content menu bg-base-100 rounded-box z-[1] w-64 p-2 shadow'
            >
              <li>
                <a onClick={() => handleBrandChange("Adidas")}>Adidas</a>
              </li>
              <li>
                <a onClick={() => handleBrandChange("Nike")}>Nike</a>
              </li>
              <li>
                <a onClick={() => handleBrandChange("Puma")}>Puma</a>
              </li>
            </ul>
          </div>

          <button
            onClick={handleFilter}
            type='submit'
            className='btn join-item rounded-r-xl bg-[#6faf9f] text-white  border text-sm hover:bg-[#727C82] border-[#f77d5c]'
          >
            Filter
          </button>
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
