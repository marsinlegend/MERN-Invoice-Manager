import React, { Component } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit,
  faRupeeSign,
} from "@fortawesome/free-solid-svg-icons";
import { deleteInvoice, getInvoices } from "../services/invoiceService";

class InvoiceList extends Component {
  constructor() {
    super();
    this.state = {
      invoices: [],
    };
  }

  async componentDidMount() {
    const { data: allinvoices } = await getInvoices();
    const invoices = allinvoices.filter(
      (invoice) => invoice.customerId === this.props.match.params.customerId
    );
    this.setState({ invoices });
  }
  handleDelete = async (invoice) => {
    const originalinvoices = this.state.invoices;
    const invoices = originalinvoices.filter((s) => s._id !== invoice._id);
    this.setState({ invoices });
    try {
      await deleteInvoice(invoice._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        alert("this invoice has already been deleted");
      this.setState({ invoices: originalinvoices });
    }
  };

  handleDate = (date) => {
    let d = moment(date).format("Do MMM YY");
    return d;
  };
  render() {
    return (
      <React.Fragment>
        <div className="page-header overflow-visible position-absolute bg-white border-bottom px-4 my-0 d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2 display-6">Invoices</h1>
          <Link
            className="btn btn-primary"
            to={`/dashboard/${this.props.match.params.customerId}/invoices/new`}
          >
            New
          </Link>
        </div>

        <div className="main-content pt-2 px-3">
          <table className="table border">
            <thead className="table-light">
              <tr>
                <th scope="col">NAME</th>
                <th scope="col">COMPANY NAME</th>
                <th scope="col">PHONE</th>
                <th scope="col">DATE</th>
                <th scope="col">BALANCE DUE</th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {this.state.invoices.map((invoice) => (
                <tr key={invoice._id}>
                  <td>{invoice.from.name}</td>
                  <td>{invoice.from.companyName}</td>
                  <td>{invoice.from.phone}</td>
                  <td>
                    <FontAwesomeIcon icon={faRupeeSign} />
                    {invoice.total}
                  </td>
                  <td>{this.handleDate(invoice.invoiceDate)}</td>
                  <td>
                    <Link
                      to={`/dashboard/${this.props.match.params.customerId}/invoice-pdf/${invoice._id}`}
                      className="btn btn-sm btn-primary"
                      invoice={invoice}
                    >
                      Export PDF
                    </Link>
                  </td>
                  <td>
                    <Link
                      className="btn btn-sm"
                      to={`/dashboard/${this.props.match.params.customerId}/invoices/${invoice._id}`}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => this.handleDelete(invoice)}
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

export default InvoiceList;
