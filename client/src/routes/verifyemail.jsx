import React, { Component } from "react";
import { Link } from "react-router-dom";
import undraw_posting_photo from "../img/undraw_posting_photo.svg";

class VerifyEmail extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row g-0">
          <div className="col-8 bg-light border-end min-vh-100 d-none d-md-block">
            <img
              className="vh-100 p-5 mx-5 w-100"
              src={undraw_posting_photo}
              alt=""
            />
          </div>
          <div className="col-md-4">
            <div className=" min-vh-100 d-flex align-items-center justify-content-center">
              <div className="container py-5 px-3" style={{ width: "40rem" }}>
                <div className="card bg-light p-3">
                  <p>
                    A password reset link has been sent to your email. click on
                    the link and reset your accounts password
                  </p>
                  <Link className="fw-bold text-end text-dark" to="/signin">Back to Login Page</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default VerifyEmail;
