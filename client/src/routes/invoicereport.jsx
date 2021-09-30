import React, { Component } from "react";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faRupeeSign } from "@fortawesome/free-solid-svg-icons";
class InvoiceReport extends Component {
  state = {};

  handleDate = (date) => {
    let d = moment(date).format("Do MMM YY");
    return d;
  };
  render() {
    return (
      <div className="container bg-light p-5">
        <div className="row">
          <div className="col-6">
            <h6>From :</h6>
            <div class="row row-cols-2">
              <div class="col">Company Name :</div>
              <div class="col">{this.props.companyName}</div>
              <div class="col">Name :</div>
              <div class="col">{this.props.senderName}</div>
              <div class="col">Company Address :</div>
              <div class="col">{this.props.companyAddress}</div>
              <div class="col">City :</div>
              <div class="col">{this.props.companyCity}</div>
              <div class="col">Pincode :</div>
              <div class="col">{this.props.companyPincode}</div>
              <div class="col">Phone :</div>
              <div class="col">{this.props.companyPhone}</div>
            </div>
          </div>
          <div className="col-6">
            <h1 className="display-1 text-center">{this.props.companyName}</h1>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-6">
            <h6>To :</h6>
            <div class="row row-cols-2">
              <div class="col">Company Name :</div>
              <div class="col">{this.props.clientCompany}</div>
              <div class="col">Address :</div>
              <div class="col">{this.props.clientAddress}</div>
              <div class="col">City :</div>
              <div class="col">{this.props.clientCity}</div>
              <div class="col">Pincode :</div>
              <div class="col">{this.props.clientPincode}</div>
              <div class="col">Phone :</div>
              <div class="col">{this.props.clientPhone}</div>
            </div>
          </div>
          <div className="col-6">
            <div class="row row-cols-2 mt-3">
              <div class="col">Invoice Date :</div>
              <div class="col">{this.handleDate(this.props.invoiceDate)}</div>
              <div class="col">Due Date :</div>
              <div class="col">{this.handleDate(this.props.dueDate)}</div>
            </div>
          </div>
        </div>

        <table className="table border table-sm mt-5">
          <thead className="table-dark text-center">
            <tr>
              <td scope="col">Items</td>
              <td scope="col">Quantity</td>
              <td scope="col">Price</td>
              <td scope="col">Amount</td>
            </tr>
          </thead>
          <tbody className="text-center">
            {this.props.products.map((product) => (
              <tr>
                <td>{product.item}</td>
                <td>{product.quantity}</td>
                <td>
                  <FontAwesomeIcon className="mx-2" icon={faRupeeSign} />
                  {product.price}
                </td>
                <td>
                  <FontAwesomeIcon className="mx-2" icon={faRupeeSign} />
                  {product.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="row mt-4">
          <div className="col-6"></div>
          <div className="col-6">
            <div class="row row-cols-2">
              <div class="col">Sub Total :</div>
              <div class="col">
                <FontAwesomeIcon className="mx-2" icon={faRupeeSign} />
                {this.props.subtotal}
              </div>
              <div class="col">Sales Tax(10%) :</div>
              <div class="col">
                <FontAwesomeIcon className="mx-2" icon={faRupeeSign} />
                {this.props.salestax}
              </div>
              <div class="col">Total :</div>
              <div class="col">
                <FontAwesomeIcon className="mx-2" icon={faRupeeSign} />
                {this.props.total}
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-6">
            <div class="row row-cols-2">
              <div class="col">Notes :</div>
              <div class="col">{this.props.invoiceNotes}</div>
              <div class="col">Terms & Conditions :</div>
              <div class="col">{this.props.invoiceTerms}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default InvoiceReport;
