import React from "react";

const Template = () => {
  return (
    <main className="container-fluid">
      <div className="container bg-light p-5">
        <form>
          <div className="row">
            <div className="col-sm col-md-6 order-last order-md-first">
              <h6>From:</h6>
              <input
                type="text"
                placeholder="Your Company Name"
                className="form-control-plaintext form-control-sm"
              />
              <input
                type="text"
                placeholder="Your Name"
                className="form-control-plaintext form-control-sm "
              />
              <input
                type="text"
                placeholder="Company's Address"
                className="form-control-plaintext form-control-sm "
              />
              <input
                type="text"
                placeholder="City"
                className="form-control-plaintext form-control-sm "
              />
              <input
                type="number"
                placeholder="PinCode"
                className="form-control-plaintext form-control-sm "
              />
            </div>
            <div className="col-sm col-md-6 order-first order-md-last">
              <h1 className="display-1 text-sm-end">INVOICE</h1>
            </div>
          </div>

          {/* Bill  */}

          <div className="row mt-3">
            <div className="col-sm col-md-6">
              <h6>Bill To:</h6>
              <input
                type="text"
                placeholder="Your Client's Company"
                className="form-control-plaintext form-control-sm "
              />
              <input
                type="text"
                placeholder="Client's Address"
                className="form-control-plaintext form-control-sm "
              />
              <input
                type="text"
                placeholder="City"
                className="form-control-plaintext form-control-sm "
              />
              <input
                type="number"
                placeholder="PinCode"
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
                  <tr>
                    <td>
                      <textarea
                        type="text"
                        placeholder="--"
                        className="form-control-plaintext form-control-sm "
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        placeholder="0"
                        className="form-control-plaintext form-control-sm "
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        placeholder="0"
                        className="form-control-plaintext form-control-sm "
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        placeholder="0"
                        className="form-control-plaintext form-control-sm "
                      />
                    </td>
                    <td>
                      <button className="btn btn-danger btn-sm">Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {/* onClick={addInvoiceLineItem} */}
          <div className="row">
            <div className="col-6">
              <button className="btn btn-primary btn-sm">Add Item</button>
            </div>
            <div className="col-6">
              <div className="row mb-3 mt-2">
                <label
                  htmlFor="subTotal"
                  className="col-sm-4 col-form-label col-form-label-sm"
                >
                  Sub Total :
                </label>
                <div className="col-sm-8">
                  <input
                    type="number"
                    readonly
                    className="form-control-plaintext form-control-sm"
                    id="subTotal"
                    value="0"
                  />
                </div>
              </div>
              <div className="row mb-3 mt-2">
                <label
                  htmlFor="salesTax"
                  className="col-sm-4 col-form-label col-form-label-sm"
                >
                  Sales Tax(10%) :
                </label>
                <div className="col-sm-8">
                  <input
                    type="number"
                    readonly
                    className="form-control-plaintext form-control-sm"
                    id="salesTax"
                    value="0"
                  />
                </div>
              </div>
              <div className="row mb-3 mt-2">
                <label
                  htmlFor="total"
                  className="col-sm-4 col-form-label col-form-label-sm"
                >
                  Total :
                </label>
                <div className="col-sm-8">
                  <input
                    type="number"
                    readonly
                    className="form-control-plaintext form-control-sm"
                    id="total"
                    value="0"
                  />
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
    </main>
  );
};

export default Template;
