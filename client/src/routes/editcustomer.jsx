import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./../component/form";
import { saveCustomer, getCustomer } from "../services/customerService";

class EditCustomer extends Form {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        _id: this.props.match.params.id,
        userId: this.props.match.params.userId,
        firstName: "",
        lastName: "",
        name: "",
        companyName: "",
        companyType: "",
        email: "",
        phone: "",
      },
      customerType: [
        { _id: "business", name: "Business" },
        { _id: "individual", name: "Individual" },
      ],
      errors: {},
    };
  }

  schema = {
    _id: Joi.string(),
    userId: Joi.string().required(),
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    name: Joi.string().required().label("Name"),
    companyName: Joi.string().required().label("Company Name"),
    companyType: Joi.string().required().label("Company Type"),
    email: Joi.string().required().label("Email"),
    phone: Joi.number().required().label("Phone"),
  };

  async populateCustomer() {
    try {
      const customerId = this.props.match.params.id;
      if (customerId === "new") return;

      const { data: customer } = await getCustomer(customerId);
      this.setState({ data: this.mapToViewModel(customer) });
    } catch (ex) {
      if (ex.respose && ex.respose.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateCustomer();
  }

  mapToViewModel(customer) {
    return {
      _id: customer._id,
      userId: customer.userId,
      firstName: customer.firstName,
      lastName: customer.lastName,
      name: customer.name,
      companyName: customer.companyName,
      companyType: customer.companyType,
      email: customer.email,
      phone: customer.phone,
    };
  }

  doSubmit = async () => {
    console.log(this.state.data);
    await saveCustomer(this.state.data);
    this.props.history.push("/dashboard/customers");
  };
  render() {
    return (
      <React.Fragment>
        <div className="page-header overflow-visible position-absolute bg-white border-bottom px-4 my-0 d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2 display-6">Customer Form</h1>
        </div>
        <div className="main-content px-3 pt-5">
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("firstName", "First Name")}
            {this.renderInput("lastName", "Last Name")}
            {this.renderInput("name", "Name")}
            {this.renderInput("companyName", "Company Name")}
            {this.renderSelect(
              "companyType",
              "Company Type",
              this.state.customerType
            )}
            {this.renderInput("email", "Email")}
            {this.renderInput("phone", "Phone")}

            {this.renderButton("Save")}
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default EditCustomer;
