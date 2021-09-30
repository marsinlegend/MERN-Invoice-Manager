import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getCustomers, deleteCustomer } from "../services/customerService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

class CustomerList extends Component {
  constructor() {
    super();
    this.state = {
      customers: [],
    };
  }

  async componentDidMount() {
    const { data: customers } = await getCustomers();
    this.setState({ customers });
  }

  handleDelete = async (customer) => {
    const originalcustomers = this.state.customers;
    const customers = originalcustomers.filter((s) => s._id !== customer._id);
    this.setState({ customers });
    try {
      await deleteCustomer(customer._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        alert("this customer has already been deleted");
      this.setState({ customers: originalcustomers });
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="page-header overflow-visible position-absolute bg-white border-bottom px-4 my-0 d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2 display-6">Customers</h1>
          <Link
            className="btn btn-primary"
            to={`/dashboard/customers/${this.props.user._id}/new`}
          >
            New
          </Link>
        </div>

        <div className="main-content px-3 pt-2">
          <table className="table border">
            <thead className="table-light">
              <tr>
                <th scope="col">NAME</th>
                <th scope="col">COMPANY NAME</th>
                <th scope="col">EMAIL</th>
                <th scope="col">PHONE</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {this.state.customers.map((customer) => (
                <tr key={customer._id}>
                  <td>
                    <Link
                      to={`/dashboard/${customer._id}/invoices`}
                      className="text-primary fw-bold text-decoration-none"
                    >
                      {customer.name}
                    </Link>
                  </td>
                  <td>{customer.companyName}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                  <td>
                    <Link
                      to={`/dashboard/customers/${this.props.user._id}/${customer._id}`}
                      className="btn btn-sm"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => this.handleDelete(customer)}
                      className="btn btn-sm"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

export default CustomerList;
