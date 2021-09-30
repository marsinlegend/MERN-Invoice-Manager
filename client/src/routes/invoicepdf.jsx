import React, { Component } from "react";
import { Link } from "react-router-dom";
import InvoiceReport from "./invoicereport";
import moment from "moment";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faRupeeSign } from "@fortawesome/free-solid-svg-icons";
import { getInvoice } from "../services/invoiceService";
class InvoicePdf extends Component {
  constructor(props) {
    super(props);
    this.pdfExportComponent = React.createRef();
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
      products: [],
    };
  }

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

  handleExportWithComponent = (e) => {
    this.pdfExportComponent.current.save();
  };

  render() {
    return (
      <React.Fragment>
        <div className="page-header overflow-visible position-absolute bg-white border-bottom px-4 my-0 d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2 display-6">Export Invoice</h1>
          <span>
            <Link
              to={`/dashboard/${this.state.data.customerId}/invoices/${this.state.data._id}`}
              className="btn btn-outline-dark mx-2"
            >
              <FontAwesomeIcon icon={faEdit} />
              Edit
            </Link>
            <button
              onClick={this.handleExportWithComponent}
              className="btn btn-primary"
            >
              Save PDF
            </button>
          </span>
        </div>

        <div className="main-content px-3 pt-2">
          <PDFExport ref={this.pdfExportComponent} paperSize="A4">
            <InvoiceReport
              companyName={this.state.data.companyName}
              senderName={this.state.data.senderName}
              companyAddress={this.state.data.companyAddress}
              companyCity={this.state.data.companyCity}
              companyPincode={this.state.data.companyPincode}
              companyPhone={this.state.data.companyPhone}
              clientCompany={this.state.data.clientCompany}
              clientAddress={this.state.data.clientAddress}
              clientCity={this.state.data.clientCity}
              clientPincode={this.state.data.clientPincode}
              clientPhone={this.state.data.companyPhone}
              invoiceDate={this.state.data.invoiceDate}
              dueDate={this.state.data.dueDate}
              invoiceNotes={this.state.data.invoiceNotes}
              invoiceTerms={this.state.data.invoiceTerms}
              subtotal={this.state.data.subtotal}
              salestax={this.state.data.salestax}
              total={this.state.data.total}
              products={this.state.products}
              ref={this.ref}
            />
          </PDFExport>
        </div>
      </React.Fragment>
    );
  }
}

export default InvoicePdf;
