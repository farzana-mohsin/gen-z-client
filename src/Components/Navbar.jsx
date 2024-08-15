import { NavLink } from "react-router-dom";

const Navbar = () => {
  const pageLinks = (
    <>
      <li className='text-lg'>
        <NavLink to='/'>Home</NavLink>
      </li>
      <li className='text-lg'>
        <NavLink to='/about'>About</NavLink>
      </li>
      {/* <li className='text-lg'>
        <NavLink to='/listed-books'>Listed Books</NavLink>
      </li>
      <li className='text-lg'>
        <NavLink to='/pages-to-read'>Pages To Read</NavLink>
      </li>
      <li className='text-lg'>
        <NavLink to='/upcoming-books'>What&apos;s Next</NavLink>
      </li> */}
    </>
  );
  return (
    <div className='container mx-auto navbar bg-base-100 my-10'>
      <div className='navbar-start'>
        <div className='dropdown'>
          <div
            tabIndex={0}
            role='button'
            className='btn btn-ghost lg:hidden'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
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
            className='menu menu-sm dropdown-content mt-3 z-[1] p-2 rounded-box w-36 lg:w-52'
          >
            {pageLinks}
          </ul>
        </div>
        <a className='btn btn-ghost text-[#23BE0A] text-2xl lg:text-4xl font-extrabold'>
          Book Vibe
        </a>
      </div>
      <div className='navbar-center hidden lg:flex'>
        <ul className='menu menu-horizontal px-1'>{pageLinks}</ul>
      </div>
      <div className='navbar-end gap-2 mr-5 lg:mr-auto'>
        <a className='btn text-white bg-[#23BE0A] text-xs lg:text-base rounded-3xl'>
          Sign In
        </a>
        <a className='btn text-white bg-teal-500 text-xs lg:text-base rounded-3xl '>
          Sign Up
        </a>
      </div>
    </div>
  );
};

export default Navbar;
