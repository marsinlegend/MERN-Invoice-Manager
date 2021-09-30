import React from "react";
import { Link } from "react-router-dom";
import Form from "../component/form";
import Joi from "joi-browser";
import undraw_posting_photo from "../img/undraw_posting_photo.svg";
import * as userService from "../services/userService";

class SignUp extends Form {
  constructor() {
    super();
    this.state = {
      data: {
        name: "",
        email: "",
        password: "",
      },
      errors: {},
    };
  }

  schema = {
    name: Joi.string().required().label("Name"),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      await userService.register(this.state.data);
      this.props.history.push("/signin");
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
            <img className="vh-100 p-5 mx-5 w-100" src={undraw_posting_photo} />
          </div>
          <div className="col-md-4">
            <div className="min-vh-100 d-flex align-items-center justify-content-center">
              <div className="container py-5 px-3" style={{ width: "40rem" }}>
                <h1 className="display-6 text-center my-3">Sign Up</h1>
                <form onSubmit={this.handleSubmit}>
                  {this.renderInput("name", "Name")}
                  {this.renderInput("email", "Email")}
                  {this.renderInput("password", "Password", "password")}

                  {this.renderButtonWide("Sign Up")}
                </form>
                <hr />
                <p className="text-center">
                  <Link className="text-secondary" to="/signin">
                    Back to SignIn Page
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

export default SignUp;
