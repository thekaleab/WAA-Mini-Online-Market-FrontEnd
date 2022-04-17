import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  const register = (e) => {
    e.preventDefault(); 
    // TODO
  };

  const setUser = (user) => {
    // TODO
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
            <div className="d-flex justify-content-end align-items-center mb-1 mt-4 me-4">
              <button
                type="button"
                className="btn-close"
                onClick={(e) => setModal(false)}
              ></button>
            </div>
            <div className="modal-body ps-5 pe-5 pt-0 pb-3">
              <h5
                className="modal-title login-header text-center mb-5"
                id="exampleModalLabel"
              >
                Register
              </h5>
              <form onSubmit={register}>
                <div className="mb-3 text-start">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div id="emailHelp" className="form-text">
                    We'll never share your email with anyone else.
                  </div>
                </div>
                <div className="mb-3 text-start">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <input
                    required
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
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
                <button type="submit" className="btn btn-dark w-100 mt-5 mb-3">
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

export default Signup;
