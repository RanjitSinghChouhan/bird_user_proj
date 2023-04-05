import { useFormik } from "formik";
import React, { useState } from "react";
import cancel from "../../../../assets/squareCancel.svg";
import copy from "../../../../assets/copyIcon.svg";

function EchoEcoEndpointPopup({ visible, onClose, apiKey, url, viewUrl }) {
  const [isApiCopied, setIsApiCopied] = useState(false);
  const [isKeyCopied, setIsKeyCopied] = useState(false);
  const [isPlant, setIsplant] = useState(true);
  const [currentUrl, setCurrentUrl] = useState(url);
  useFormik({
    initialValues: {
      apiEndpoint: url,
      apiKey: apiKey,
    },
    onSubmit: (values, { props, setSubmitting }) => {
      onClose();
      setSubmitting(false);
    },
  });
  const handleUrlCopy = () => {
    navigator.clipboard.writeText(currentUrl || url);
    setIsApiCopied(true);
    setTimeout(() => {
      setIsApiCopied(false);
    }, 500);
  };
  const handleKeyCopy = () => {
    navigator.clipboard.writeText(apiKey);
    setIsKeyCopied(true);
    setTimeout(() => {
      setIsKeyCopied(false);
    }, 500);
  };

  const handlePlant = () => {
    setCurrentUrl(url);
    setIsplant(true);
  };

  const handleView = () => {
    setCurrentUrl(viewUrl);
    setIsplant(false);
  };

  const handleClose = (e) => {
    if (e.target.id === "echoecoendpoint-container") onClose();
  };
  if (!visible) return null;
  return (
    <div
      id="echoecoendpoint-container"
      onClick={handleClose}
      className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center"
    >
      <div className="bg-white rounded-2xl shadow-2xl relative w-full max-w-2xl p-5 lg:p-10 lg:pt-14">
        <div className="absolute top-2 right-2 flex cursor-pointer p-2">
          <label
            htmlFor="Toggle"
            className="inline-flex mr-4 items-center rounded-full cursor-pointer bg-[#F4F4F4]"
          >
            <input id="Toggle" type="checkbox" className="hidden peer" />
            <span
              onClick={handlePlant}
              className={
                isPlant
                  ? `px-4 py-2 rounded-full bg-gradient-to-b from-[#6DB935] to-[#4DAA09] text-white`
                  : `px-4 py-2 rounded-full`
              }
            >
              Plant
            </span>
            <span
              onClick={handleView}
              className={
                !isPlant
                  ? `px-4 py-2 rounded-full bg-gradient-to-b from-[#6DB935] to-[#4DAA09] text-white`
                  : `px-4 py-2 rounded-full`
              }
            >
              View
            </span>
          </label>
          <div onClick={() => onClose()} className="mt-2">
            <img className="w-7 h-7" src={cancel} alt="" />
          </div>
        </div>
        <form className="flex flex-col gap-8">
          <div className="w-full relative">
            <label
              htmlFor="api-endpoint"
              className="font-semibold text-xl text-[#404040] mb-2"
            >
              API EndPoint
            </label>
            {isApiCopied ? (
              <div className="absolute right-1 top-1 GreenGradient">
                Copied!!!
              </div>
            ) : (
              ""
            )}
            <br />
            <input
              type="text"
              id="api-endpoint"
              className="shadow-lg rounded-lg py-2 pl-4 pr-11 w-full text-xl font-medium overflow-hidden"
              placeholder={currentUrl || url}
              name="apiEndpoint"
              value={currentUrl || url}
            />
            <img
              onClick={handleUrlCopy}
              src={copy}
              alt=""
              className="absolute cursor-pointer right-4 top-10 bg-white pl-2"
            />
          </div>
          <div className="w-full relative">
            <label
              htmlFor="api-key"
              className="font-semibold text-xl text-[#404040] mb-2"
            >
              API Key
            </label>
            {isKeyCopied ? (
              <div className="absolute right-1 top-1 GreenGradient">
                Copied!!!
              </div>
            ) : (
              ""
            )}
            <br />
            <input
              type="text"
              id="api-key"
              className="shadow-lg rounded-lg py-2 pl-4 pr-11 w-full text-xl font-medium whitespace-nowrap overflow-hidden"
              placeholder={apiKey}
              name="apiKey"
              value={apiKey}
            />
            <img
              onClick={handleKeyCopy}
              src={copy}
              alt=""
              className="absolute cursor-pointer right-4 top-10 bg-white pl-2"
            />
          </div>
          <div className="">
            <button
              type="submit"
              onClick={() => onClose()}
              className=" rounded-[19px] py-1 w-full shadow-xl bg-gradient-to-b from-[#6DB935] to-[#4DAA09] text-white font-semibold text-[30px]"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EchoEcoEndpointPopup;
