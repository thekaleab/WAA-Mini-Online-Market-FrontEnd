import { useNavigate, NavLink, resolvePath } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { signOut } from "../../redux/action";
import * as roleService from "../../services/roleService";

function Navbar() {
  const state = useSelector((state) => state.handleCart);
  const userState = useSelector((userState) => userState.handleUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const logout = () => {
    dispatch(signOut());
    navigate('/');
  }; 

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light bg-white py-3 shadow-sm">
        <div className="container">
          <NavLink className="navbar-brand fw-bold fs-4 dark-text" to="/">
            SHOPPING APP
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                <li className="nav-item mx-2">
                  <NavLink
                    className="nav-link active dark-text"
                    aria-current="page"
                    to="/"
                  >
                    Home
                  </NavLink>
                </li>
                {(roleService.publicOnly(userState) || !roleService.sellerOnly(userState)) && 
                    
                  <li className="nav-item dark-text mx-2">
                      <NavLink className="nav-link" to="/products">
                        Products
                      </NavLink>
                  </li>
                    
                }
                { roleService.adminOnly(userState) && 
                  <li className="nav-item dark-text mx-2">
                      <NavLink className="nav-link" to="/admin">
                         Dashboard
                      </NavLink>
                  </li>
                }
                {roleService.sellerOnly(userState) && 
                  <li className="nav-item dark-text mx-2">
                    <NavLink className="nav-link" to="/seller/products">
                        Products
                    </NavLink>
                  </li>
                }
                <li className="nav-item dark-text mx-2">
                  <NavLink className="nav-link" to="/about">
                    About
                  </NavLink>
                </li>
            </ul>
            <div className="buttons d-flex">
              <div className="btn d-flex align-items-center">
              {roleService.loggedInOnly(userState) ? (
                  <>
                    <div onClick={() => navigate('/profile')}>
                      {userState?.firstName !== null
                        ? userState?.firstName
                        : userState?.email}
                    </div>
                    <button
                      type="button"
                      className="btn btn-outline-dark ms-2"
                      onClick={logout}
                    >
                      <i className="fa fa-sign-in me-1 "></i> Logout
                    </button>
                  </>
                ): (
                  <>
                    <NavLink to="/login" className="btn btn-outline-dark ms-2">
                      <i className="fa fa-sign-in me-1 "></i> Login
                    </NavLink>
                    <NavLink to="/register" className="btn btn-outline-dark ms-2">
                      <i className="fa fa-user-plus me-1"></i> Register
                    </NavLink>
                  </>
                )}
                { roleService.loggedInOnly(userState) && !roleService.adminOnly(userState) &&
                  <NavLink to="/orders" className="btn btn-outline-dark ms-2">
                    Orders
                  </NavLink>
                }
                { 
                    roleService.buyerOnly(userState) && 
                    
                    <NavLink to="/cart" className="btn btn-outline-dark ms-2">
                      <i className="fa fa-shopping-cart me-1"></i> Cart (
                      {state && (state.length === 0 ? 0 : state.length)})
                    </NavLink>
                }
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
