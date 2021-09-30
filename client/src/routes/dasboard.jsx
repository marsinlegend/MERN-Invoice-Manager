import React, { Component } from "react";
import { getMe } from "../services/currentUserService";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./home";
import CustomerList from "./customerlist";
import AllInvoice from "./allinvoices";
import InvoiceList from "./invoicelist";
import EditInvoice from "./editinvoice";
import EditCustomer from "./editcustomer";
import InvoicePdf from "./invoicepdf";
import NotFound from "./notfound";
import Topbar from "./../component/navbar";
import Sidebar from "./../component/sidebar";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
    };
  }

  async componentDidMount() {
    const { data: user } = await getMe();
    this.setState({ user });
  }
  render() {
    return (
      <div className="position-absolute" id="wrapper">
        <Topbar user={this.state.user} />
        <Sidebar />
        <div className="content position-absolute overflow-hidden">
          <Switch>
            <Route path="/dashboard/not-found" component={NotFound} />
            <Route path="/dashboard/allinvoices" component={AllInvoice} />
            <Route
              path="/dashboard/:customerId/invoice-pdf/:id"
              component={InvoicePdf}
            />
            <Route
              path="/dashboard/:customerId/invoices/:id"
              component={EditInvoice}
            />
            <Route
              path="/dashboard/:customerId/invoices"
              component={InvoiceList}
            />
            <Route
              path="/dashboard/customers/:userId/:id"
              component={EditCustomer}
            />
            <Route
              path="/dashboard/customers"
              render={() => <CustomerList user={this.state.user} />}
            />
            <Route path="/dashboard/home" component={Home} />
            <Redirect from="/dashboard" exact to="/dashboard/home" />
            <Redirect to="/dashboard/not-found" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Dashboard;
