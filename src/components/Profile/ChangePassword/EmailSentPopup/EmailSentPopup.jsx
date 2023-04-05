import React from "react";

function EmailSentPopup({ visible, onClose }) {
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
      <div className="bg-white w-3/6 rounded-2xl shadow-2xl p-4 flex justify-center text-center">
        <div>
          <div className="p-10">
            <div className="font-semibold text-[#404040] text-[30px]">
              Password reset link sent to the registered Email address.
            </div>
            <div className="font-semibold text-[#404040] text-[22px] my-4">
              If you did not receive the email please click on the resend
              button.
            </div>
          </div>
          <div className="flex justify-around mb-8 text-[30px]">
            <button className="w-1/4 border border-green-500 GreenGradient py-2 rounded-lg">
              Resend
            </button>
            <button
              onClick={() => onClose()}
              className="w-1/4 bg-gradient-to-b from-[#6DB935] to-[#4DAA09] text-white py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailSentPopup;
