import React from "react";
import { Link } from "react-router-dom";
import Form from "../component/form";
import Joi from "joi-browser";
import { login } from "../services/authService";
import undraw_posting_photo from "../img/undraw_posting_photo.svg";

class SignIn extends Form {
  constructor() {
    super();
    this.state = {
      data: {
        email: "",
        password: "",
      },
      errors: {},
    };
  }

  schema = {
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await login(data.email, data.password);
      window.location = "/dashboard";
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
        <div className="row">
          <div className="col-8 bg-light border-end min-vh-100 d-none d-md-block">
            <img
              className="vh-100 p-5 mx-5 w-100"
              src={undraw_posting_photo}
              alt=""
            />
          </div>
          <div className="col-md-4">
            <div className="min-vh-100 d-flex align-items-center justify-content-center">
              <div className="container py-5 px-3" style={{ width: "40rem" }}>
                <h1 className="display-6 text-center my-3">Sign In</h1>
                <form onSubmit={this.handleSubmit}>
                  {this.renderInput("email", "Email")}
                  {this.renderInput("password", "Password", "password")}
                  <p className="text-end">
                    <Link className="text-secondary" to="/forgot-password">
                      Forgot Password ?
                    </Link>
                  </p>
                  <div className="w-100">
                    {this.renderButtonWide("Sign In")}
                  </div>
                </form>
                <hr />
                <p className="text-center">
                  <Link className="text-secondary" to="/signup">
                    Click here to create a New Account
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
