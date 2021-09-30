import React, { Component } from "react";
import * as V from "victory";
import { getInvoices } from "../services/invoiceService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRupeeSign } from "@fortawesome/free-solid-svg-icons";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      invoices: [],
    };
  }

  async componentDidMount() {
    const { data: invoices } = await getInvoices();
    this.setState({ invoices });
  }

  handleOverallDue = () => {
    const sum = this.state.invoices.map((invoice) => invoice.total);
    const overallDue = sum.reduce((acc, item) => (acc += item), 0).toFixed(2);
    return overallDue;
  };
  render() {
    return (
      <React.Fragment>
        <div className="page-header overflow-visible position-absolute bg-white border-bottom px-4 my-0 d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2 display-6">Total Receivables</h1>
        </div>

        <div className="main-content px-3 pt-2">
          <div className="card border-dark mb-3" style={{ width: "18rem" }}>
            <div className="card-header h3">Overall Due</div>
            <div className="card-body text-dark">
              <h5 class="card-title text-danger">Current</h5>
              <p class="card-text">
                <FontAwesomeIcon icon={faRupeeSign} />
                {this.handleOverallDue()}
              </p>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;

{
  /* */
}
