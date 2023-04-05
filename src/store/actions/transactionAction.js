import axiosClient from "../../utils/httpClient";
import { PATH } from "../../utils/httpContants";

export const pendingTransactions = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axiosClient({
      method: "POST",
      url: PATH.transaction.pendingTransactions,
      data,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const createOrder = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axiosClient({
      method: "POST",
      url: PATH.transaction.createOrder,
      data,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const paymentVerify = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axiosClient({
      method: "POST",
      url: PATH.transaction.paymentVerify,
      data,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const completedTransactions = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axiosClient({
      method: "POST",
      url: PATH.transaction.completedTransactions,
      data,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getUsersTransactions = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axiosClient({
      method: "GET",
      url: PATH.transaction.getUsersTransactions,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};