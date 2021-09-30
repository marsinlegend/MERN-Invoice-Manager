import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/invoices";

export function getInvoices() {
  return http.get(apiEndpoint);
}

export function deleteInvoice(invoiceId) {
  return http.delete(apiEndpoint + "/" + invoiceId);
}

export function getInvoice(invoiceId) {
  return http.get(apiEndpoint + "/" + invoiceId);
}

export function saveInvoice(invoice) {
  if (invoice._id !== "new") {
    const body = { ...invoice };
    delete body._id;
    return http.put(apiEndpoint + "/" + invoice._id, body);
  }
  const body = { ...invoice };
  delete body._id;
  return http.post(apiEndpoint, body);
}
