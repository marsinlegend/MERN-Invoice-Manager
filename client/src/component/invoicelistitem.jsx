import React from "react";

const InvoiceItemList = () => {
  return (
    <div className="list-group-item list-group-item-action">
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">Client Name</h5>
        <small className="text-muted">Invoice Date</small>
      </div>
      <p className="mb-1">Invoice Total</p>
      <button className="btn btn-sm btn-primary">Edit</button>
      <button className="btn btn-sm btn-primary">Edit</button>
    </div>
  );
};

export default InvoiceItemList;
