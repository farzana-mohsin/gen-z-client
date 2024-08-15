import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet-async";
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
// import { MdRemoveRedEye } from "react-icons/md";
// import { PiEyeFill } from "react-icons/pi";

const Register = () => {
  const [setRegisterError] = useState("");
  const [setRegisterSuccess] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const from = "/";

  const { createUser, updateUserProfile } = useContext(AuthContext);
  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const image = e.target.image.value;
    const password = e.target.password.value;
    console.log(name, email, image, password);

    setRegisterError("");
    setRegisterSuccess("");

    if (password.length < 6) {
      toast.error("Password should have at least 6 characters.");
      return;
    } else if (!/[A-Z]/.test(password)) {
      toast.error("Password should have at least one uppercase character");
      return;
    } else if (!/[a-z]/.test(password)) {
      toast.error("Password should contain at least one lowercase character");
    }

    // create user
    createUser(email, password, name, image)
      .then(() => {
        // result not needed as per conceptual session
        updateUserProfile(name, image).then(() => {});
        // console.log(result.user);
        toast.success("you have registered successfully!");
        setTimeout(function () {
          navigate(from);
        }, 2000);
      })
      .catch((error) => {
        console.log(error.message);
        toast.error(error.message);
      });
  };

  return (
    <div className='mb-10 lg:mb-2'>
      <Helmet>
        <title>Remax Realty | Register</title>
      </Helmet>
      {/* <div className='hero min-h-screen bg-base-200'>
        <div className='hero-content flex-col lg:flex-row-reverse'>
          <div className='text-center lg:text-left'>
            <h1 className='text-5xl font-bold'>Register now!</h1>
          </div>
          <div className='card shrink-0 w-full max-w-sm shadow-2xl bg-base-100'>
            <form
              onSubmit={handleRegister}
              className='card-body'
            >
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Name</span>
                </label>
                <input
                  name='name'
                  type='text'
                  placeholder='name'
                  className='input input-bordered'
                  required
                />
              </div>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Email</span>
                </label>
                <input
                  name='email'
                  type='email'
                  placeholder='email'
                  className='input input-bordered'
                  required
                />
              </div>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Photo URL</span>
                </label>
                <input
                  name='photo'
                  type='text'
                  placeholder='photo URL'
                  className='input input-bordered'
                />
              </div>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Password</span>
                </label>
                <input
                  name='password'
                  type='password'
                  placeholder='password'
                  className='input input-bordered'
                  required
                />
                <label className='label'></label>
              </div>
              <div className='form-control mt-6'>
                <button className='btn btn-primary'>Register</button>
              </div>
              <p>
                Already a member ? Please{" "}
                <Link
                  className='text-blue-700 font-bold mb-0'
                  to='/login'
                >
                  Login
                </Link>{" "}
              </p>
            </form>
            {registerError && (
              <p className='text-red-600 pb-3 ml-7 mt-0 mb-6'>
                {registerError}
              </p>
            )}

            {registerSuccess && (
              <p className='text-green-600 text-xl pb-3 ml-7 mt-0 mb-6'>
                {registerSuccess}
              </p>
            )}
          </div>
        </div>
      </div> */}

      <div className='h-screen  lg:h-[calc(100vh-220px)] w-full max-w-md p-4 rounded-md shadow sm:p-8 bg-gray-900 text-gray-100 mx-auto my-5'>
        <h2 className='mb-3 text-3xl font-semibold text-center'>
          Register here!
        </h2>
        <p className='text-sm text-center text-gray-400 mb-5'>
          Already have an account? Please login{" "}
          <Link
            to='/login'
            className='focus:underline hover:underline font-bold text-emerald-400'
          >
            here
          </Link>
        </p>

        <div className='flex items-center w-full my-2'>
          <hr className='w-full text-gray-400' />
          <p className='px-3 text-gray-400'>OR</p>
          <hr className='w-full text-gray-400' />
        </div>
        <form
          onSubmit={handleRegister}
          className='card-body'
        >
          <div className='form-control'>
            <label className='label'>
              <span className='label-text text-white'>Name</span>
            </label>
            <input
              name='name'
              type='text'
              placeholder='name'
              className='w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-100 text-gray-900 focus:border-emerald-400'
              required
            />
          </div>
          <div className='form-control'>
            <label className='label'>
              <span className='label-text text-white'>Email</span>
            </label>
            <input
              name='email'
              type='email'
              placeholder='email'
              className='w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-100 text-gray-900 focus:border-emerald-400'
              required
            />
          </div>
          <div className='form-control'>
            <label className='label'>
              <span className='label-text text-white'>Photo</span>
            </label>
            <input
              name='image'
              type='text'
              placeholder='photo URL'
              className='w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-100 text-gray-900 focus:border-emerald-400'
              required
            />
          </div>
          <div className='form-control relative'>
            <label className='label'>
              <span className='label-text text-white'>Password</span>
            </label>
            <input
              name='password'
              type={showPassword ? "text" : "password"}
              placeholder='password'
              className='w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-100 text-gray-900 focus:border-emerald-400'
              required
            />
            <span
              className='absolute top-12 right-3 text-black text-lg'
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <div className='form-control py-7 mt-5 lg:mb-0'>
            <button className='w-full px-8 py-3 font-semibold rounded-xl bg-emerald-400 text-white'>
              Register
            </button>
          </div>
        </form>
        {/* {registerError && (
          <p className='text-red-600 pb-3 ml-7 mt-0 mb-6'>{registerError}</p>
        )}

        {registerSuccess && (
          <p className='text-green-600 text-xl pb-3 ml-7 mt-0 mb-6'>
            {registerSuccess}
          </p>
        )} */}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
