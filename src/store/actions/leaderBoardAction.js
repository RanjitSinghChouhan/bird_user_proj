import axiosClient, { BASE_URL_PATH } from "../../utils/httpClient";
import { PATH } from "../../utils/httpContants";

export const getAllCompaniesByrdsPoints = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
      axiosClient({
        method: "POST",
        url: PATH.leaderBoard.getAllCompaniesByrdsPoints,
        data
      })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  export const getCompanyDetailsByCompanyId = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
      axiosClient({
        method: "POST",
        url: PATH.leaderBoard.getCompanyDetailsByCompanyId,
        data
      })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  export const getDetailsByCompanyName = (companyName) => (dispatch) => {
    return new Promise((resolve, reject) => {
      axiosClient({
        method: "POST",
        url: `${BASE_URL_PATH}/company/${companyName}/getDetailsByCompanyName`,
      })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  export const getTotalTreeAlgaeAllCompanies = () => (dispatch) => {
    return new Promise((resolve, reject) => {
      axiosClient({
        method: "GET",
        url: PATH.leaderBoard.getTotalTreeAlgaeAllCompanies,
      })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  export const getNotifications = () => (dispatch) => {
    return new Promise((resolve, reject) => {
      axiosClient({
        method: "GET",
        url: PATH.leaderBoard.getNotifications,
      })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  export const getNotificationFlag = () => (dispatch) => {
    return new Promise((resolve, reject) => {
      axiosClient({
        method: "GET",
        url: PATH.leaderBoard.getNotificationFlag,
      })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  export const createSupportComplaint = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
      axiosClient({
        method: "POST",
        url: PATH.leaderBoard.createSupportComplaint,
        data
      })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };