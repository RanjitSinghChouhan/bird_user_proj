import axiosClient from "../../utils/httpClient";
import { PATH } from "../../utils/httpContants";
import { ALL_POSTS, AREA } from "../types/types";

export const allPosts = (data) => {
  return {
    type: ALL_POSTS,
    payload: data
  }
}

export const totalUsedArea = data => {
  return {
    type: AREA,
    payload: data
  }
}

export const createPost = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axiosClient({
      method: "POST",
      url: PATH.byrdsPage.createPost,
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

export const getPostsByCompanyId = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axiosClient({
      method: "POST",
      url: PATH.byrdsPage.getPostsByCompanyId,
      data,
    })
      .then((response) => {
        dispatch(allPosts(response.data.posts))
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const deletePostByCompanyId = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axiosClient({
      method: "POST",
      url: PATH.byrdsPage.deletePostByCompanyId,
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

export const editPostById = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axiosClient({
      method: "POST",
      url: PATH.byrdsPage.editPostById,
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

export const getTotalTreeAlgae = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axiosClient({
      method: "POST",
      url: PATH.byrdsPage.getTotalTreeAlgae,
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


export const getUsedArea = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    axiosClient({
      method: "GET",
      url: PATH.area.getUsedArea,
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const sharePost = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axiosClient({
      method: "POST",
      url: PATH.byrdsPage.sharePost,
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

export const getPostById = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axiosClient({
      method: "POST",
      url: PATH.byrdsPage.getPostById,
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