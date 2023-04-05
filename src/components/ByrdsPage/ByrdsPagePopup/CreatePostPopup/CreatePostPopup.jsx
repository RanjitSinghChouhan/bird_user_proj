import { useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { useDispatch } from "react-redux";
import cancel from "../../../../assets/squareCancel.svg";
import uploadPic from "../../../../assets/uploadPic.svg";
import {
  createPost,
  editPostById,
  getPostsByCompanyId,
} from "../../../../store/actions/byrdsPageAction";
import Loader from "../../../Loader/Loader";
import SuccessfulPopUp from "../../../SuccessfulPopup/SuccessfulPopUp";

const fileTypes = ["JPG", "PNG", "JPEG"];

const uploadImage = async (image) => {
  let data = new FormData();
  data.append("file", image);
  data.append("upload_preset", "feddUp");
  data.append("cloud_name", "feddup");
  const resp = await fetch(
    `https://api.cloudinary.com/v1_1/feddup/image/upload`,
    { method: "post", body: data }
  );
  let res = await resp.json();
  return res.secure_url;
};

function CreatePostPopup({
  visible,
  onClose,
  heading,
  companyId,
  postImg,
  postText,
  postId,
}) {
  const [image, setImage] = useState("");
  const [isSuccessfulPopup, setIsSuccessfulPopup] = useState(false);
  const isLoading = useRef(false);
  const dispatch = useDispatch();

  const onCloseSucessfulPopup = () => {
    setIsSuccessfulPopup(false);
  };

  const formik = useFormik({
    initialValues: {
      postId: postId,
      companyId: companyId,
      postText: postId !== null ? postText : "",
      postImg: postId !== null ? postImg : "",
    },
    onSubmit: (values, { props, setSubmitting, setValues }) => {
      setSubmitting(true);
      if (postId) {
        values = { ...values, companyId: companyId, id: postId };
        isLoading.current = true;
        dispatch(editPostById(values)).then((response) => {
          setIsSuccessfulPopup(true);
          dispatch(getPostsByCompanyId({ companyId: companyId }));
          setValues(formik.initialValues);
          isLoading.current = false;
          setTimeout(() => {
            setSubmitting(false);
            setIsSuccessfulPopup(false);
            onClose();
          }, 500);
        });
      } else {
        values = { ...values, companyId };
        isLoading.current = true;
        dispatch(createPost(values)).then((response) => {
          setIsSuccessfulPopup(true);
          dispatch(getPostsByCompanyId({ companyId: companyId }));
          isLoading.current = false;
          setValues(formik.initialValues);
          setTimeout(() => {
            setSubmitting(false);
            setIsSuccessfulPopup(false);
            onClose();
          }, 500);
        });
      }
    },
  });

  const handleChange = async (file) => {
    if (file) {
      const res = await uploadImage(file);
      if (res) {
        formik.values.postImg = res;
        setImage(res);
      }
    }
  };

  useEffect(() => {
    if (postId !== null) {
      formik.initialValues.companyId = companyId;
      formik.initialValues.postText = postText;
      formik.initialValues.postImg = postImg;
    }
  }, [postId, formik.initialValues, companyId, postImg, postText]);

  const handleClose = (e) => {
    if (e.target.id === "createPost-container") onClose();
  };
  if (!visible) return null;
  return (
    <div
      id="createPost-container"
      onClick={handleClose}
      className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center"
    >
      {isLoading.current ? <Loader /> : ""}
      <div className="bg-white rounded-2xl shadow-2xl p-4 relative w-full max-w-xl">
        <div
          onClick={onClose}
          className="absolute top-2 right-2 cursor-pointer"
        >
          <img className="w-7 h-7" src={cancel} alt="" />
        </div>
        <div className="flex flex-col justify-center items-center text-center px-5 2xl:px-7">
          <div className="font-semibold text-[#404040] text-[25px] mb-4">
            {heading} Post{" "}
          </div>
          <hr />
          <form onSubmit={formik.handleSubmit} className="w-full">
            <div className="border-solid border-2 border-gray-400 rounded-xl w-full relative">
              <div className="px-3 py-2">
                <div className="bg-gray-100 rounded-lg">
                  {formik.values.postText ? (
                    <textarea
                      className="w-full pb-5 bg-gray-100 outline-none p-1 mb-6 rounded-lg px-2 font-normal text-[#000000] text-2xl resize-none"
                      name="postText"
                      {...formik.getFieldProps("postText")}
                      rows="7"
                      col="65"
                      maxlength="250"
                    ></textarea>
                  ) : (
                    <textarea
                      className="w-full bg-gray-100 outline-none p-1 rounded-lg px-2 font-normal text-[#000000] text-2xl resize-none"
                      placeholder="What's on your mind?"
                      name="postText"
                      {...formik.getFieldProps("postText")}
                      rows="7"
                      col="65"
                      maxlength="250"
                    ></textarea>
                  )}
                </div>
              </div>
              <div className="absolute right-4 bottom-4">
                <span>
                  {(formik.values &&
                    formik.values.postText &&
                    formik.values.postText.length) ||
                    0}
                </span>
                <span>/ 250</span>
              </div>
            </div>
            <div className="border-solid border-2 border-[#aeaeae] rounded-xl w-full p-2 my-8">
              {formik.values.postImg ? (
                <div className=" rounded-xl bg-[#f2f2f2] flex items-center justify-center flex-col">
                  <label htmlFor="imgInput" className="cursor-pointer">
                    <FileUploader
                      id="imgInput"
                      classes="cursor-pointer"
                      handleChange={handleChange}
                      name="postImg"
                      {...formik.getFieldProps("postImg")}
                      types={fileTypes}
                    >
                      <div className="rounded-xl">
                        <img
                          className="h-52 m-2 rounded-xl"
                          src={image || formik.values.postImg}
                          alt=""
                        />
                      </div>
                    </FileUploader>
                  </label>
                </div>
              ) : (
                <div className="h-[205px] rounded-xl bg-[#f2f2f2] flex items-center justify-center flex-col gap-1">
                  <label htmlFor="imgInput" className="cursor-pointer">
                    <FileUploader
                      id="imgInput"
                      classes="cursor-pointer"
                      handleChange={handleChange}
                      name="postImg"
                      {...formik.getFieldProps("postImg")}
                      types={fileTypes}
                    >
                      <div className="bg-[#E1E1E1] w-20 h-20 rounded-full grid place-items-center">
                        <img src={uploadPic} alt="" />
                      </div>
                    </FileUploader>
                  </label>
                  <div className="font-semibold text-[#000000] text-[25px] w-full">
                    Add Photos / Videos
                  </div>
                  <div className="font-semibold text-[#606060] text-[15px]">
                    Or Drag and Drop
                  </div>
                </div>
              )}
            </div>
            <div className="inset-x-12 bottom-5 mt-5">
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className=" rounded-lg py-1 w-full shadow-xl bg-gradient-to-b from-[#6DB935] to-[#4DAA09] text-white font-semibold text-[30px]"
              >
                POST
              </button>
            </div>
          </form>
        </div>
      </div>
      <SuccessfulPopUp
        visible={isSuccessfulPopup}
        onClose={onCloseSucessfulPopup}
        message="created"
      />
    </div>
  );
}

export default CreatePostPopup;
