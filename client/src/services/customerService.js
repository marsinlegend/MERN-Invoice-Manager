import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/customers";

export function getCustomers() {
  return http.get(apiEndpoint);
}

export function deleteCustomer(customerId) {
  return http.delete(apiEndpoint + "/" + customerId);
}

export function getCustomer(customerId) {
  return http.get(apiEndpoint + "/" + customerId);
}

export function saveCustomer(customer) {
  if (customer._id) {
    const body = { ...customer };
    delete body._id;
    return http.put(apiEndpoint + "/" + customer._id, body);
  }
  const body = { ...customer };
  delete body._id;
  return http.post(apiEndpoint, body);
}
