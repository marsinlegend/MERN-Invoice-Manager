import React from "react";
import Joi from "joi-browser";
import Form from "../component/form";
import { Link } from "react-router-dom";
import undraw_posting_photo from "../img/undraw_posting_photo.svg";

class EnterOtp extends Form {
  constructor() {
    super();
    this.state = {
      data: {
        otp: "",
      },
      errors: {},
    };
  }

  schema = {
    otp: Joi.string().required().label("OTP"),
  };
  render() {
    return (
      <div className="container-fluid">
        <div className="row g-0">
          <div className="col-8 bg-light border-end min-vh-100 d-none d-md-block">
            <img className="vh-100 p-5 mx-5 w-100" src={undraw_posting_photo} />
          </div>
          <div className="col-md-4">
            <div className=" min-vh-100 d-flex align-items-center justify-content-center">
              <div className="container py-5 px-3" style={{ width: "40rem" }}>
                <h1 className="display-6 text-center my-5">Enter OTP</h1>
                <form>
                  {this.renderInput("otp", "OTP")}
                  {this.renderButtonWide("Verify OTP")}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EnterOtp;
