import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


import * as storageService from "../../services/storage";
import * as api from "../../services/api";

import "./Login.css";
import { storage } from "../../services/constants";

function Login() {

  const [user, onChange] = useUser();
  const roles = useRoles();
  const [ loginError, setLoginError ] = useState(false);

  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    api.login().then(result => {
      storageService.storeUser(result.data);
      toast.success("Login successful");
      setLoginError(false);
      navigate("/");
    }).catch(err => {
        toast("Incorrect credentials");
        setLoginError(true);
    });
  };

  return (
          <div className="container py-4 my-4">
            <div className="row justify-content-center align-content-center">
              <div className="col-sm-5 col-md-3">
                <h5 className="login-header text-center mb-3">
                  Login to your account
                </h5>
                <form onSubmit={login}>
                  <div className="mb-3 text-start">
                    <label htmlFor="email" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      aria-describedby="emailHelp"
                      required
                      value={user.email}
                      onChange={(e) => onChange('email', e.target.value)}
                    />
                    <div id="emailHelp" className="form-text">
                      We'll never share your email with anyone else.
                    </div>
                  </div>
                  <div className="mb-3 text-start">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      required
                      type="password"
                      className="form-control"
                      id="password"
                      value={user.password}
                      onChange={(e) => onChange('password', e.target.value)}
                    />
                  </div>
                  <div className="mb-3 text-start">
                    <label htmlFor="role" className="form-label">
                      I want to 
                    </label>
                    <select required
                      className="form-control"
                      id="role"
                      onChange={(e) => onChange('role_id', e.target.value)}
                    > 
                      {
                        roles.map(role => <option key={role.id} value={role.id}>{role.name}</option>)
                      }
                    </select>
                  </div>
                  <div className="mb-3 form-check text-start">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="exampleCheck1"
                      required
                    />
                    <label className="form-check-label" htmlFor="exampleCheck1">
                      I agree the terms and conditions
                    </label>
                  </div>
                  { 
                    loginError === true && 
                    <div id="formError" className="form-text text-danger">
                      Invalid credentials, please check and try again.
                    </div>
                  }
                  <button type="submit" className="btn btn-dark w-100 mt-2 mb-3">
                    Submit
                  </button>

                  
                  <label className="form-label" htmlFor="register">
                    Don't have an account?
                  </label>
                  <button id="register" 
                          className="btn btn-dark w-100 mt-1 mb-3"
                          onClick={() => navigate('/register')}
                  >
                      Regiter
                  </button>
                </form>
              </div>
            </div>
          </div>
      )
}

const useRoles = () => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
        api.getRoles().then(result => {
          setRoles(result.data);
        }).catch(e => {
          toast.error("Network error, please reload page");
        });
  }, []);

  return roles;
}

const useUser = () => {
    const emptyUser = {
      username: '',
      password: '',
      role_id: ''
    };
   const [user, setUser] = useState(emptyUser);

   const onChange = (target, value) => {
     setUser(prev => {
       return { ...prev, [target]: value };
     });
   }

   return [user, onChange];
}

export default Login;
