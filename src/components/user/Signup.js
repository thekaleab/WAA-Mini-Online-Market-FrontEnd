import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import * as storageService from "../../services/storage";
import * as api from "../../services/api";

function Signup() {
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  const roles = useRoles();

  const [user, onChange] = useUser();
  
  const register = (e) => {
    e.preventDefault(); 
    api.register(user)
      .then(result => {
        // redirect to login page.
        toast.success('Account successfully created');
        navigate('/login');
      })
      .catch(e => {
        toast.error("Can't create account now. please try again")
      });
  };

  return (
        <div className="container py-4 my-4">
          <div className="row justify-content-center align-items-center">
            <div className="col-sm-5 col-md-3">
              <h5 className="login-header text-center mb-3">
                Register
              </h5>
              <form onSubmit={register}>
                <div className="mb-3 text-start">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    aria-describedby="usernameHelp"
                    required
                    value={user.username}
                    onChange={(e) => onChange('username', e.target.value)}
                  />
                </div>
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
                    What would you like to do?
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
                <button type="submit" className="btn btn-dark w-100 mt-3 mb-4">
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      );
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
    if(value === null || value === undefined) {
      value = '';
    }

    setUser(prev => {
      return {...prev, [target]: value}
    });
  }

  return [user, onChange]
}

export default Signup;
