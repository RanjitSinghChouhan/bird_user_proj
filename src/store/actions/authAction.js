import axiosClient from "../../utils/httpClient";
import { PATH } from "../../utils/httpContants";
import { USER } from "../types/types";

export const userInfoData = (data) => {
  return {
    type: USER,
    payload: data,
  };
};

export const userRegistration = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axiosClient({
      method: "POST",
      url: PATH.auth.signup,
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

export const getIndustrySector = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axiosClient({
      method: "GET",
      url: PATH.auth.getIndustrySector,
      data,
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const loginUser = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axiosClient({
      method: "POST",
      url: PATH.auth.login,
      data,
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const userInfo = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    axiosClient({
      method: "GET",
      url: PATH.auth.getAdminDetails,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const editingCompanyProfile = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axiosClient({
      method: "POST",
      url: PATH.auth.editCompanyProfile,
      data,
    })
      .then((response) => {
        console.log(response);
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const sendOtp = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axiosClient({
      method: "POST",
      url: PATH.auth.sendOtp,
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

export const verifyEmail = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axiosClient({
      method: "POST",
      url: PATH.auth.verifyEmail,
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

export const verifyRegistrationEmail = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axiosClient({
      method: "POST",
      url: PATH.auth.verifyRegistrationEmail,
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

export const resetPassword = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axiosClient({
      method: "POST",
      url: PATH.auth.resetPassword,
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

export const changePassword = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axiosClient({
      method: "POST",
      url: PATH.auth.changePassword,
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

// export const createSubscriptionOrder = (data) => (dispatch) => {
//   return new Promise((resolve, reject) => {
//     axiosClient({
//       method: "POST",
//       url: PATH.transaction.createOrder,
//       data,
//     })
//       .then((response) => {
//         resolve(response);
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });
// };

// export const subscriptionPaymentVerify = (data) => (dispatch) => {
//   return new Promise((resolve, reject) => {
//     axiosClient({
//       method: "POST",
//       url: PATH.transaction.paymentVerify,
//       data,
//     })
//       .then((response) => {
//         resolve(response);
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });
// };