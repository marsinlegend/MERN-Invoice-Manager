import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faUser,
  faFile,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  return (
    <ul className="nav bg-light flex-column sidebar border-end pt-4 ">
      <Link
        className="nav-item nav-link mx-3 text-dark h6"
        to="/dashboard/home"
      >
        <FontAwesomeIcon icon={faTachometerAlt} />
        <span className="mx-1">Dashboard</span>
      </Link>
      <Link
        className="nav-item nav-link mx-3 text-dark h6"
        to="/dashboard/customers"
      >
        <FontAwesomeIcon icon={faUser} />
        <span className="mx-1">Customers</span>
      </Link>
      <Link
        className="nav-item nav-link mx-3 text-dark h6"
        to="/dashboard/allinvoices"
      >
        <FontAwesomeIcon icon={faFile} />
        <span className="mx-1">Invoices</span>
      </Link>
    </ul>
  );
};

export default Sidebar;
