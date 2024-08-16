import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { GiRunningShoe } from "react-icons/gi";
// import "animate.css";

// import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const navLinks = (
    <>
      {user && (
        <>
          <li className='mr-2'>
            <NavLink
              to='/'
              className={({ isActive }) =>
                isActive
                  ? "text-white bg-emerald-400 p-3 hover:bg-yellow-400"
                  : " "
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/about'
              className={({ isActive }) =>
                isActive
                  ? "text-white bg-emerald-400 p-3 hover:bg-yellow-400 "
                  : "text-white bg-black p-3 hover:bg-yellow-400"
              }
            >
              About Us
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  const handleSignOut = () => {
    logOut()
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div>
      <div className='navbar bg-base-100 my-4  container mx-auto'>
        <div className='navbar-start'>
          <div className='dropdown'>
            <div
              tabIndex={0}
              role='button'
              className='btn btn-ghost lg:hidden'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h8m-8 6h16'
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className='menu menu-sm dropdown-content mt-3 z-[2] p-2 shadow bg-base-100 rounded-box w-52'
            >
              {navLinks}
            </ul>
          </div>
          <div className='flex items-center justify-center w-12 h-12 rounded-full bg-emerald-400 text-4xl text-white font-bold'>
            <GiRunningShoe />
          </div>
          <h1 className='animate__animated animate__fadeInLeft text-2xl md:text-3xl font-bold text-emerald-500 pl-1'>
            Gen-Z
          </h1>
        </div>
        <div className='navbar-center hidden lg:flex'>
          <ul className='menu menu-horizontal px-1'>{navLinks}</ul>
        </div>
        <div className='navbar-end flex flex-col md:flex-row items-center'>
          {/* <div
            tabIndex={0}
            role='button'
            className='btn btn-ghost btn-circle avatar'
          ></div> */}

          {user ? (
            <div className='flex md:flex-row items-center gap-2'>
              {/* {user?.displayName || user?.uid.slice(0, 8) || "user not found"}
              <img
                className='w-10 rounded-full hidden md:block'
                alt='image not found'
                src={
                  user?.photoURL ||
                  "https://i.ibb.co/YDgsXWt/360-F-229758328-7x8jw-Cwjt-BMm-C6rg-Fz-LFh-Zo-Ep-Lob-B6-L8.jpg"
                }
              /> */}
              <div
                className='tooltip tooltip-bottom tooltip-accent rounded-full bg-transparent border-none text-white'
                data-tip={user?.displayName || "user not found"}
              >
                <button className='btn rounded-full bg-transparent border-none'>
                  <img
                    className='w-10 md:block rounded-full bg-transparent border-none'
                    alt='image not found'
                    src={
                      user?.photoURL ||
                      "https://i.ibb.co/YDgsXWt/360-F-229758328-7x8jw-Cwjt-BMm-C6rg-Fz-LFh-Zo-Ep-Lob-B6-L8.jpg"
                    }
                  />
                </button>
              </div>

              <button
                onClick={() => handleSignOut()}
                className=' bg-emerald-400 text-white px-4 py-2 border text-sm rounded-xl ml-2'
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className='flex flex-row'>
              <Link to='/login'>
                <button className='btn  bg-emerald-400 text-white md:px-4 md:py-2 border text-sm rounded-xl md:ml-2 hover:bg-yellow-400'>
                  Login
                </button>
              </Link>
              <Link to='/register'>
                <button className='btn  bg-emerald-400 text-white md:px-4 md:py-2 border text-sm rounded-xl ml-2  hover:bg-yellow-400'>
                  Register
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
