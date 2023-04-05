import axiosClient from "../../utils/httpClient";
import { PATH } from "../../utils/httpContants";
import { ALL_ECHO_ECOS, COUNTER_URL } from "../types/types";

export const allEchoEcos = (data) => {
  return {
    type: ALL_ECHO_ECOS,
    payload: data,
  };
};

export const counterUrl = (data) => {
  return {
    type: COUNTER_URL,
    payload: data,
  };
};

export const createEchoEco = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axiosClient({
      method: "POST",
      url: PATH.echoEcho.createEchoEcos,
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

export const getEcoPurpose = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    axiosClient({
      method: "GET",
      url: PATH.echoEcho.getEcoPurpose,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getEcoType = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    axiosClient({
      method: "GET",
      url: PATH.echoEcho.getEcoType,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getEchoEcosByCompanyId = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axiosClient({
      method: "POST",
      url: PATH.echoEcho.getEchoEcosByCompanyId,
      data,
    })
      .then((response) => {
        console.log(response, "ecoresp");
        dispatch(allEchoEcos(response.data.echoEcos));
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const editEchoEcoGoalById = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axiosClient({
      method: "POST",
      url: PATH.echoEcho.editEchoEcoGoalById,
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

export const getDailyEchoEcoCallApiKeyAndUrl = (data) => (dispatch) => {
  console.log(data, "daatataaa");
  return new Promise((resolve, reject) => {
    axiosClient({
      method: "POST",
      url: PATH.echoEcho.getDailyEchoEcoCallApiKeyAndUrl,
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

export const getDailyEchoEcoDetails = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axiosClient({
      method: "POST",
      url: PATH.echoEcho.getDailyEchoEcoDetails,
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

export const getTotalEchoPlantedUrl = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axiosClient({
      method: "POST",
      url: PATH.echoEcho.getTotalEchoPlantedUrl,
      data: {companyId: data}
    })
      .then((response) => {
        dispatch(counterUrl(response.data.url))
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getMonthlyTotalEchoPlanted = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axiosClient({
      method: "POST",
      url: PATH.echoEcho.getMonthlyTotalEchoPlanted,
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

export const getKeyMilestoneByCompanyId = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axiosClient({
      method: "POST",
      url: PATH.echoEcho.getKeyMilestoneByCompanyId,
      data: {companyId: data}
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const latestOverallEchoEco = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axiosClient({
      method: "POST",
      url: PATH.echoEcho.latestOverallEchoEco,
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

export const getEchoEcoGoalStatus = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axiosClient({
      method: "POST",
      url: PATH.echoEcho.getEchoEcoGoalStatus,
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

export const createEchoEcoReport = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axiosClient({
      method: "POST",
      url: PATH.echoEcho.createEchoEcoReport,
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
