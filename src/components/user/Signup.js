import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import * as AppConst from "../../services/constants";
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
        localStorage.setItem(AppConst.storage.user, JSON.stringify(result.data));
        setModal(false);
        toast.success('Account successfully created');
        navigate('/');
      })
      .catch(e => {
        toast.error("Can't create account now. please try again")
      });
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-outline-dark ms-2 "
        onClick={(e) => setModal(true)}
      >
        <i className="fa fa-user-plus me-1"></i> Register
      </button>
      {/* <!-- Modal --> */}
      {modal === true && (
        <>
          <div className="formWrapper" onClick={() => setModal(false)} />
          <div className="modal-content position-absolute ">
            <div className="d-flex justify-content-end align-items-center mb-1 mt-2 me-2">
              <button
                type="button"
                className="btn-close"
                onClick={(e) => setModal(false)}
              ></button>
            </div>
            <div className="modal-body ps-5 pe-5 pt-0 pb-3">
              <h5
                className="modal-title login-header text-center mb-3"
                id="exampleModalLabel"
              >
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
                    aria-describedby="emailHelp"
                    required
                    value={user.username}
                    onChange={(e) => onChange('username', e.target.value)}
                  />
                </div>
                <div className="mb-3 text-start">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
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
        </>
      )}
    </>
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
    setUser(prev => {
      return {...prev, [target]: value}
    });
  }

  return [user, onChange]
}

export default Signup;
