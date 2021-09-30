import React from "react";
import Joi from "joi-browser";
import Form from "../component/form";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { resetPassword } from "../services/reset-password";
import undraw_posting_photo from "../img/undraw_posting_photo.svg";

class ResetPassword extends Form {
  constructor() {
    super();
    this.state = {
      data: {
        password: "",
        email: "",
      },
      errors: {},
    };
  }

  schema = {
    password: Joi.string().required().label("Password"),
    email: Joi.string().required(),
  };
  componentDidMount() {
    let jwt = this.props.match.params.id;
    const user = jwtDecode(jwt);
    const data = { ...this.state.data };
    data.email = user.sub;
    this.setState((this.state.data = data));
    console.log(this.state.data);
  }

  doSubmit = async () => {
    try {
      await resetPassword(this.state.data);
      this.props.history.push("/");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
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
                <h1 className="display-6 text-center my-5">Rest Password</h1>
                <form onSubmit={this.handleSubmit}>
                  {this.renderInput("password", "Password", "password")}
                  {this.renderButtonWide("Rest Password")}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ResetPassword;
