import { useContext } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import PropTypes from "prop-types";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <span className='loading loading-dots loading-lg'></span>;
  }
  if (user) {
    return children;
  }
  return (
    <div>
      <Navigate
        state={location.pathname}
        to='/login'
      ></Navigate>
    </div>
  );
};
PrivateRoutes.propTypes = {
  children: PropTypes.node,
};
export default PrivateRoutes;
