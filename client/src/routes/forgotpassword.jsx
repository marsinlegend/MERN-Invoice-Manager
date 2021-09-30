import React from "react";
import Joi from "joi-browser";
import Form from "../component/form";
import { Link } from "react-router-dom";
import { forgotPassword } from "../services/forgot-password";
import undraw_posting_photo from "../img/undraw_posting_photo.svg";

class ForgotPassword extends Form {
  constructor() {
    super();
    this.state = {
      data: {
        email: "",
      },
      errors: {},
    };
  }

  schema = {
    email: Joi.string().email().required().label("Email"),
  };

  doSubmit = async () => {
    try {
      await forgotPassword(this.state.data);
      this.props.history.push("/forgotpassword/verify-reset-link");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };
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
                <h1 className="display-6 text-center my-5">
                  Verify Your Account
                </h1>
                <form onSubmit={this.handleSubmit}>
                  {this.renderInput("email", "Email")}
                  {this.renderButtonWide("Verify Email")}
                  <hr />
                  <p className="text-center">
                    <Link to="/signin" className="text-secondary">
                      Back To Sign in Page
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ForgotPassword;
