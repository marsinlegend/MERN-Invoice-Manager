import React, { Component } from "react";
import { saveInvoice, getInvoice } from "../services/invoiceService";

class EditInvoice extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        _id: this.props.match.params.id,
        customerId: this.props.match.params.customerId,
        companyName: "",
        senderName: "",
        companyAddress: "",
        companyCity: "",
        companyPincode: "",
        companyPhone: "",
        clientCompany: "",
        clientAddress: "",
        clientCity: "",
        clientPincode: "",
        clientPhone: "",
        invoiceDate: "",
        dueDate: "",
        invoiceNotes: "",
        invoiceTerms: "",
        subtotal: "",
        salestax: "",
        total: "",
      },
      errors: {},
      products: [],
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      _id: this.state.data._id,
      customerId: this.state.data.customerId,
      from: {
        companyName: this.state.data.companyName,
        name: this.state.data.senderName,
        companyAddress: this.state.data.companyAddress,
        city: this.state.data.companyCity,
        pincode: this.state.data.companyPincode,
        phone: this.state.data.companyPhone,
      },
      to: {
        clientCompany: this.state.data.clientCompany,
        clientAddress: this.state.data.clientAddress,
        city: this.state.data.clientCity,
        pincode: this.state.data.clientPincode,
        phone: this.state.data.clientPhone,
      },
      products: this.state.products,
      invoiceNotes: this.state.data.invoiceNotes,
      invoiceTerms: this.state.data.invoiceTerms,
      invoiceDate: this.state.data.invoiceDate,
      dueDate: this.state.data.dueDate,
      subtotal: this.state.data.subtotal,
      salestax: this.state.data.salestax,
      total: this.state.data.total,
    };
    console.log(data);
    await saveInvoice(data);
    this.props.history.push(
      `/dashboard/${this.props.match.params.customerId}/invoices`
    );
  };

  async populateInvoice() {
    try {
      const invoiceId = this.props.match.params.id;
      if (invoiceId === "new") return;

      const { data: invoice } = await getInvoice(invoiceId);
      this.setState({ data: this.mapToDataViewModel(invoice) });

      let products = [];
      for (let i = 0; i < invoice.products.length; i++) {
        products.push({
          item: invoice.products[i].item,
          quantity: invoice.products[i].quantity,
          price: invoice.products[i].price,
          amount: invoice.products[i].amount,
        });
      }
      this.setState({ products });
    } catch (ex) {
      if (ex.respose && ex.respose.status === 404)
        this.props.history.replace("/not-found");
    }
  }
  async componentDidMount() {
    await this.populateInvoice();
  }

  mapToDataViewModel(invoice) {
    return {
      _id: invoice._id,
      customerId: invoice.customerId,
      companyName: invoice.from.companyName,
      senderName: invoice.from.name,
      companyAddress: invoice.from.companyAddress,
      companyCity: invoice.from.city,
      companyPincode: invoice.from.pincode,
      companyPhone: invoice.from.phone,
      clientCompany: invoice.to.clientCompany,
      clientAddress: invoice.to.clientAddress,
      clientCity: invoice.to.city,
      clientPincode: invoice.to.pincode,
      clientPhone: invoice.to.phone,
      invoiceDate: invoice.invoiceDate,
      dueDate: invoice.dueDate,
      invoiceNotes: invoice.invoiceNotes,
      invoiceTerms: invoice.invoiceTerms,
      subtotal: invoice.subtotal,
      salestax: invoice.salestax,
      total: invoice.total,
    };
  }
  handleChange = (e) => {
    const data = { ...this.state.data };

    data[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ data });
  };

  handleProductChange = (e, index) => {
    const products = [...this.state.products];
    products[index][e.target.name] = e.target.value;
    this.setState({ products });
  };

  handleAddProduct() {
    this.setState({
      products: [
        ...this.state.products,
        {
          item: "",
          quantity: "",
          price: "",
          amount: "",
        },
      ],
    });
  }

  handleProductDelete(index) {
    this.state.products.splice(index, 1);
    this.setState({ products: this.state.products });
  }

  handleProductAmount(index) {
    let amount =
      this.state.products[index].quantity * this.state.products[index].price;
    this.state.products[index].amount = amount;
    return amount;
  }

  handleSubTotal = () => {
    const sum = this.state.products.map((product) => product.amount);
    const subtotal = sum.reduce((acc, item) => (acc += item), 0).toFixed(2);
    this.state.data.subtotal = subtotal;
    return subtotal;
  };

  handleSalesTax = () => {
    const subtotal = +this.state.data.subtotal;
    const salestax = ((10 / 100) * subtotal).toFixed(2);
    this.state.data.salestax = salestax;
    return salestax;
  };

  handleTotal = () => {
    const subtotal = +this.state.data.subtotal;
    const salestax = +this.state.data.salestax;
    const total = (subtotal + salestax).toFixed(2);
    this.state.data.total = total;
    return total;
  };
  render() {
    return (
      <React.Fragment>
        <div className="page-header overflow-visible position-absolute bg-white border-bottom px-4 my-0 d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2 display-6">Invoice Form</h1>
        </div>
        <div className="main-content px-3 pt-2">
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-sm col-md-6 order-last order-md-first my-2">
                <h6>From:</h6>
                <input
                  type="text"
                  placeholder="Your Company Name"
                  value={this.state.data.companyName}
                  onChange={this.handleChange}
                  name="companyName"
                  className="form-control-plaintext form-control-sm"
                />
                <input
                  type="text"
                  placeholder="Your Name"
                  name="senderName"
                  value={this.state.data.senderName}
                  onChange={this.handleChange}
                  className="form-control-plaintext form-control-sm "
                />
                <input
                  type="text"
                  name="companyAddress"
                  value={this.state.data.companyAddress}
                  onChange={this.handleChange}
                  placeholder="Company's Address"
                  className="form-control-plaintext form-control-sm "
                />
                <input
                  type="text"
                  name="companyCity"
                  value={this.state.data.companyCity}
                  onChange={this.handleChange}
                  placeholder="City"
                  className="form-control-plaintext form-control-sm "
                />
                <input
                  type="number"
                  name="companyPincode"
                  value={this.state.data.companyPincode}
                  onChange={this.handleChange}
                  placeholder="PinCode"
                  className="form-control-plaintext form-control-sm "
                />
                <input
                  type="number"
                  name="companyPhone"
                  value={this.state.data.companyPhone}
                  onChange={this.handleChange}
                  placeholder="Phone"
                  className="form-control-plaintext form-control-sm "
                />
              </div>
            </div>

            {/* Bill  */}

            <div className="row mt-3">
              <div className="col-sm col-md-6 mt-2 mb-3">
                <h6>Bill To:</h6>
                <input
                  type="text"
                  name="clientCompany"
                  value={this.state.data.clientCompany}
                  onChange={this.handleChange}
                  placeholder="Client Company Name"
                  className="form-control-plaintext form-control-sm "
                />
                <input
                  type="text"
                  name="clientAddress"
                  value={this.state.data.clientAddress}
                  onChange={this.handleChange}
                  placeholder="Client's Address"
                  className="form-control-plaintext form-control-sm "
                />
                <input
                  type="text"
                  name="clientCity"
                  value={this.state.data.clientCity}
                  onChange={this.handleChange}
                  placeholder="City"
                  className="form-control-plaintext form-control-sm "
                />
                <input
                  type="number"
                  name="clientPincode"
                  value={this.state.data.clientPincode}
                  onChange={this.handleChange}
                  placeholder="PinCode"
                  className="form-control-plaintext form-control-sm "
                />
                <input
                  type="number"
                  name="clientPhone"
                  value={this.state.data.clientPhone}
                  onChange={this.handleChange}
                  placeholder="Phone"
                  className="form-control-plaintext form-control-sm "
                />
              </div>
              <div className="col-sm col-md-6">
                <div className="row mb-3">
                  <label
                    htmlFor="invoiceDate"
                    className="col-sm-4 col-form-label col-form-label-sm"
                  >
                    Invoice Date :
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="date"
                      name="invoiceDate"
                      value={this.state.data.invoiceDate}
                      onChange={this.handleChange}
                      min="1997-01-01"
                      max="2030-12-31"
                      className="form-control form-control-sm"
                      id="invoiceDate"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="dueDate"
                    className="col-sm-4 col-form-label col-form-label-sm"
                  >
                    Due Date :
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="date"
                      name="dueDate"
                      value={this.state.data.dueDate}
                      onChange={this.handleChange}
                      min="1997-01-01"
                      max="2030-12-31"
                      className="form-control form-control-sm"
                      id="dueDate"
                    />
                  </div>
                </div>
              </div>
              {/* Product Table */}
              <div className="table-responsive-sm">
                <table className="table table-sm border" id="product-table">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col">Item Description</th>
                      <th scope="col">Qty</th>
                      <th scope="col">Rate</th>
                      <th scope="col">Amount</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.products.map((product, index) => (
                      <tr key={index}>
                        <td>
                          <textarea
                            type="text"
                            placeholder="--"
                            name="item"
                            value={this.state.products[index].item}
                            onChange={(e) => this.handleProductChange(e, index)}
                            className="form-control-plaintext form-control-sm "
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            placeholder="0"
                            name="quantity"
                            value={this.state.products[index].quantity}
                            onChange={(e) => this.handleProductChange(e, index)}
                            className="form-control-plaintext form-control-sm "
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            placeholder="0"
                            name="price"
                            value={this.state.products[index].price}
                            onChange={(e) => this.handleProductChange(e, index)}
                            className="form-control-plaintext form-control-sm "
                          />
                        </td>
                        <td>
                          <p className="py-auto">
                            {this.handleProductAmount(index)}
                          </p>
                          {/* <input
                            type="number"
                            placeholder="0"
                            name="amount"
                            readOnly
                            value={
                              this.state.products[index].price *
                              this.state.products[index].quantity
                            }
                            onChange={(e) => this.handleProductChange(e, index)}
                            className="form-control-plaintext form-control-sm "
                          /> */}
                        </td>
                        <td>
                          <button
                            onClick={() => this.handleProductDelete(index)}
                            className="btn btn-danger btn-sm"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {/* onClick={addInvoiceLineItem} */}
            <div className="row g-0">
              <div className="col-md-6">
                <button
                  onClick={(e) => this.handleAddProduct(e)}
                  className="btn btn-primary btn-sm"
                >
                  Add Item
                </button>
              </div>
              <div className="col-md-6">
                <div className="container-fluid">
                  <div className="row row-cols-2 row-cols-sm-2 row-cols-md-2">
                    <div className="col">Sub Total :</div>
                    <div className="col">{this.handleSubTotal()}</div>
                    <div className="col">Sales Tax(10%) :</div>
                    <div className="col">{this.handleSalesTax()}</div>
                    <div className="col">Total :</div>
                    <div className="col">{this.handleTotal()}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mb-3 mt-2">
              <label
                htmlFor="invoiceNotes"
                className="col-sm-2 col-form-label col-form-label-sm"
              >
                Invoice Notes :
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  name="invoiceNotes"
                  value={this.state.data.invoiceNotes}
                  onChange={this.handleChange}
                  className="form-control-plaintext form-control-sm"
                  id="invoiceNotes"
                  placeholder="It was great doing business with you."
                />
              </div>
            </div>
            <div className="row mb-3 mt-2">
              <label
                htmlFor="invoiceterms"
                className="col-sm-2 col-form-label col-form-label-sm"
              >
                Terms & Conditions :
              </label>
              <div className="col-sm-10">
                <textarea
                  type="text"
                  name="invoiceTerms"
                  value={this.state.data.invoiceTerms}
                  onChange={this.handleChange}
                  className="form-control-plaintext form-control-sm"
                  id="invoiceterms"
                  placeholder="Please make the payment by the due date."
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-sm">
              Save Invoice
            </button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default EditInvoice;
