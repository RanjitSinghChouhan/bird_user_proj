import React, { useState } from "react";
import cancel from "../../../../assets/squareCancel.svg";
import copy from "../../../../assets/copyIcon.svg";

function PostLinkPopup({ url, onClose, visible }) {
  const [isApiCopied, setIsApiCopied] = useState(false);

  const handleUrlCopy = () => {
    navigator.clipboard.writeText(url);
    setIsApiCopied(true);
    setTimeout(() => {
      setIsApiCopied(false);
    }, 500);
  };
  const handleClose = (e) => {
    if (e.target.id === "post-link-container") onClose();
  };
  if (!visible) return null;
  return (
    <div
      id="post-link-container"
      onClick={handleClose}
      className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center"
    >
      <div className="bg-white rounded-2xl shadow-2xl p-4 relative w-2/4">
        <div className="font-semibold text-[#404040] text-[32px]">
          Post Link
        </div>
        <div
          onClick={onClose}
          className="absolute top-2 right-2 cursor-pointer"
        >
          <img className="w-5 h-5" src={cancel} alt="" />
        </div>
        <div className="text-xl text-[#AEAEAE]">
          You can copy the link and share!
        </div>
        <form>
          <div className="w-full my-6 relative">
            <label
              htmlFor="post-link"
              className="font-semibold text-xl text-[#404040]"
            >
              Post Link
            </label>
            {isApiCopied ? (
              <div className="absolute right-1 top-1 GreenGradient">
                Copied!!!
              </div>
            ) : (
              ""
            )}
            <br />
            <div onClick={handleUrlCopy}>
              <input
                type="text"
                id="post-link"
                className="shadow-lg rounded-lg py-2 pl-4 pr-11 mt-2 w-full text-xl font-medium overflow-hidden select-none"
                placeholder={url}
                name="postLink"
                value={url}
                disabled
              />
            </div>
            <img
              onClick={handleUrlCopy}
              src={copy}
              alt=""
              className="absolute right-4 top-12 bg-white pl-2 cursor-pointer"
            />
          </div>
          <div className="inset-x-12 bottom-5">
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

export default PostLinkPopup;
