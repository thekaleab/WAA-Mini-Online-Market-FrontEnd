import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";


import { register } from "../../redux/action";
import * as api from "../../services/api";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const roles = useRoles();
  const [user, onChange] = useUser();
  
  const createUser = (e) => {
    e.preventDefault(); 
    const userDto = {...user, role_id: null, role: roles.find(role => role.id == user.role_id)}
    api.register(userDto)
      .then(result => {
        dispatch(register(userDto));
        toast.success('Account successfully created');
        navigate('/login');
      })
      .catch(error => {
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
              <form onSubmit={createUser}>
                <div className="mb-3 text-start">
                  <label htmlFor="username" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    aria-describedby="firstNameHelp"
                    required
                    value={user.firstName}
                    onChange={(e) => onChange('firstName', e.target.value)}
                  />
                  <div id="firstNameHelp" className="form-text">
                  </div>
                </div>
                <div className="mb-3 text-start">
                  <label htmlFor="username" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    aria-describedby="lastNameHelp"
                    required
                    value={user.lastName}
                    onChange={(e) => onChange('lastName', e.target.value)}
                  />
                   <div id="lastNameHelp" className="form-text">
                  
                  </div>
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
                    selected={user.role_id}
                    onChange={(e) => onChange('role_id', e.target.value)}
                  > 
                    {
                      roles.filter(role => role.id !== 1).map(role => <option key={role.id} value={role.id}>{role.name}</option>)
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
                <button className="btn btn-dark w-100 mt-3 mb-4">
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
          toast.error("Network error, please reload page and try again");
        });
  }, []);

  return roles;
}

const useUser = () => {
  const emptyUser = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role_id: 2
  };

  const [user, setUser] = useState(emptyUser);

  const onChange = (target, value) => {
    setUser(prev => {
      return {
        ...prev, [target]: value
      }
    
    })
  }

  return [user, onChange]
}

export default Signup;
