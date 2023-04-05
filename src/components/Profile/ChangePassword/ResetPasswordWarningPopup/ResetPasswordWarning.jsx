import React from "react";
import { useState } from "react";
import EmailSentPopup from "../EmailSentPopup/EmailSentPopup";

function ResetPasswordWarning({ visible, onClose }) {
  // const [isEmailSent, setIsEmailSent] = useState(false);
  // const onCloseEmailSentPopUp = () => {
  //   setIsEmailSent(false);
  // };
  const handleResetYes = () => {
    window.location.pathname = '/changePassword'
    // setIsEmailSent(true);
  };
  const handleClose = (e) => {
    if (e.target.id === "password-warning-container") onClose();
  };
  if (!visible) return null;
  return (
    <div
      id="password-warning-container"
      onClick={handleClose}
      className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center"
    >
      <div className="bg-white w-3/6 rounded-2xl shadow-2xl p-4 flex justify-center">
        <div>
          <div>
            <svg
              width="199"
              height="199"
              viewBox="0 0 199 199"
              fill="none"
              className="w-full mx-auto"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M191.998 99.4982C195.071 95.9193 197.225 91.6446 198.272 87.0449C199.32 82.4452 199.229 77.6595 198.008 73.1029C196.787 68.5462 194.472 64.3563 191.265 60.8967C188.058 57.437 184.056 54.812 179.605 53.2494C180.477 48.6131 180.204 43.8341 178.811 39.3269C177.418 34.8196 174.946 30.7204 171.61 27.3848C168.274 24.0492 164.175 21.5779 159.667 20.1854C155.16 18.7929 150.38 18.5212 145.744 19.394C144.183 14.9419 141.558 10.9381 138.099 7.73044C134.639 4.52274 130.448 2.20801 125.891 0.987212C121.334 -0.233586 116.547 -0.323547 111.947 0.725139C107.347 1.77382 103.073 3.92946 99.4947 7.00489C95.9157 3.93158 91.641 1.77788 87.0412 0.730646C82.4415 -0.316591 77.6556 -0.225743 73.0989 0.995306C68.5422 2.21635 64.3523 4.53073 60.8925 7.73765C57.4328 10.9446 54.8078 14.9472 53.2452 19.3983C48.6091 18.527 43.8305 18.7998 39.3238 20.1933C34.8171 21.5867 30.7184 24.0586 27.3833 27.3945C24.0482 30.7305 21.5773 34.8297 20.185 39.3367C18.7927 43.8437 18.521 48.6223 19.3935 53.258C14.9424 54.8206 10.9397 57.4456 7.7327 60.9053C4.52573 64.365 2.21131 68.5549 0.990241 73.1115C-0.230826 77.6681 -0.321689 82.4539 0.725565 87.0535C1.77282 91.6532 3.92659 95.9279 6.99995 99.5068C3.92565 103.086 1.77122 107.361 0.72367 111.961C-0.323881 116.561 -0.23294 121.347 0.988662 125.904C2.21026 130.461 4.52558 134.651 7.73365 138.111C10.9417 141.57 14.9457 144.194 19.3978 145.756C18.5246 150.392 18.7959 155.17 20.1884 159.678C21.5809 164.185 24.0524 168.284 27.3884 171.62C30.7243 174.955 34.824 177.426 39.3314 178.818C43.8389 180.21 48.618 180.481 53.2538 179.607C54.8164 184.058 57.4414 188.061 60.9011 191.267C64.3609 194.474 68.5508 196.789 73.1075 198.01C77.6642 199.231 82.45 199.322 87.0498 198.274C91.6496 197.227 95.9244 195.073 99.5033 192C103.082 195.074 107.357 197.229 111.958 198.276C116.558 199.324 121.344 199.233 125.901 198.011C130.458 196.79 134.648 194.474 138.108 191.266C141.567 188.058 144.192 184.055 145.753 179.602C150.389 180.475 155.168 180.204 159.675 178.811C164.183 177.419 168.282 174.948 171.618 171.612C174.954 168.276 177.425 164.177 178.818 159.669C180.21 155.162 180.482 150.383 179.609 145.747C184.06 144.185 188.063 141.56 191.27 138.1C194.478 134.64 196.792 130.45 198.013 125.893C199.233 121.336 199.324 116.55 198.275 111.951C197.227 107.351 195.073 103.076 191.998 99.4982Z"
                fill="#FFB115"
              />
              <svg
                width="50"
                height="50"
                viewBox="0 0 50 50"
                x="75"
                y="75"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="25" cy="25" r="25" fill="black" />
              </svg>
            </svg>
          </div>
          <div className="font-semibold text-[#404040] text-[30px] my-3">
            Would you like to reset your password?
          </div>
          <div className="flex justify-between text-[30px]">
            <button
              onClick={handleResetYes}
              className="w-1/3 bg-gradient-to-b from-[#6DB935] to-[#4DAA09] text-white py-2 rounded-lg"
            >
              Yes
            </button>
            <button
              onClick={() => onClose()}
              className="w-1/3 bg-gradient-to-b from-[#6DB935] to-[#4DAA09] text-white py-2 rounded-lg"
            >
              No
            </button>
          </div>
        </div>
      </div>
      {/* <EmailSentPopup visible={isEmailSent} onClose={onCloseEmailSentPopUp} /> */}
    </div>
  );
}

export default ResetPasswordWarning;
