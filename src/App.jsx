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
  //  brand name
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

  // const handleFilter = (event) => {
  //   event.preventDefault();
  //   const form = event.target;
  //   const category = form.category.value;
  //   const minPrice = form.minPrice.value;
  //   const maxPrice = form.maxPrice.value;
  //   console.log(category);
  //   const data = {
  //     category,
  //     minPrice,
  //     maxPrice,
  //   };
  //   fetch(`${import.meta.env.VITE_API_URL}/filter-products`, {
  //     method: "POST",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setAllProducts(data);
  //     });
  // };

  return (
    <>
      <Navbar></Navbar>
      <div className='container mx-auto'>
        <div className='flex justify-between'>
          <div>
            <form
              onSubmit={handleSearch}
              className='flex my-10'
            >
              <div className='join'>
                <input
                  className='input input-bordered join-item rounded-l-xl border text-sm border-emerald-400'
                  name='input'
                  placeholder='Search by Product Name'
                />
                <button
                  type='submit'
                  className='btn join-item rounded-r-xl bg-emerald-400 text-white border text-sm hover:bg-yellow-400'
                >
                  Search
                </button>
              </div>
            </form>
            <div className='dropdown'>
              <div
                tabIndex={0}
                role='button'
                className='btn m-1 px-20 bg-emerald-400 hover:bg-yellow-400 text-white'
              >
                Sort
              </div>
              <ul
                tabIndex={0}
                className='dropdown-content menu bg-base-100 rounded-box z-[1] w-64 p-2 shadow '
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
          </div>
          <div className='w-1/4'>
            <div
              style={{
                padding: "10px",
              }}
            >
              <h2>Price Range</h2>

              <Slider
                className='slider'
                value={values}
                onChange={handlePriceChange}
                min={0}
                max={200}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <div>
                  <label htmlFor='minPrice'>Min Price:</label>
                  <input
                    type='number'
                    id='minPrice'
                    name='minPrice'
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
                    name='maxPrice'
                    value={values[1]}
                    onChange={(e) =>
                      handlePriceChange([values[0], +e.target.value])
                    }
                  />
                </div>
              </div>
            </div>

            <div className='flex'>
              <div className='dropdown'>
                <div
                  tabIndex={0}
                  role='button'
                  className='btn m-1 lg:px-14'
                >
                  Category
                </div>
                <ul
                  tabIndex={0}
                  className='dropdown-content menu bg-base-100 rounded-box z-[1] w-full p-2 shadow'
                >
                  <li>
                    <a onClick={() => handleCategoryChange("classic")}>
                      Classic
                    </a>
                  </li>
                  <li>
                    <a onClick={() => handleCategoryChange("lifestyle")}>
                      Lifestyle
                    </a>
                  </li>
                  <li>
                    <a onClick={() => handleCategoryChange("running")}>
                      Running
                    </a>
                  </li>
                </ul>
              </div>

              <div className='dropdown'>
                <div
                  tabIndex={0}
                  role='button'
                  className='btn m-1 lg:px-14'
                >
                  Brand Name
                </div>
                <ul
                  tabIndex={0}
                  className='dropdown-content menu bg-base-100 rounded-box z-[1] w-full p-2 shadow'
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
            </div>

            <button
              onClick={handleFilter}
              type='submit'
              className='btn join-item rounded-xl bg-emerald-400 text-white  border text-sm hover:bg-yellow-400 w-full'
            >
              Filter
            </button>
          </div>
        </div>

        {/* <form onSubmit={handleFilter}>
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
                    name='minPrice'
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
                    name='maxPrice'
                    value={values[1]}
                    onChange={(e) =>
                      handlePriceChange([values[0], +e.target.value])
                    }
                  />
                </div>
              </div>
            </div>

            <div className='flex flex-col gap-2 '>
              <label
                className='text-white '
                htmlFor='category'
              >
                Category
              </label>
              <select
                className='border p-2 rounded-md'
                name='category'
              >
                <option
                  disabled
                  selected
                >
                  Pick one category
                </option>
                <option>Classic</option>
                <option>Lifestyle</option>
                <option>Running</option>
              </select>
            </div>

            <input
              type='submit'
              className='btn-block px-8 py-3 font-semibold bg-opacity-80 border-white btn bg-[#ff9954] text-white lg:px-4 lg:py-2 border-2 text-sm rounded-xl hover:bg-[#727C82]'
              value='Filter'
            />
          </div>
        </form> */}

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
