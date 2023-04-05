import React from "react";

function AboutUsPopup({ visible, onClose, aboutCompany }) {
  const handleClose = (e) => {
    if (e.target.id === "about-us-container") onClose();
  };
  if (!visible) return null;
  return (
    <div
      id="about-us-container"
      onClick={handleClose}
      className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-10"
    >
      <div className="bg-white w-3/6 rounded-2xl shadow-2xl p-4">
        <div className="font-semibold text-[#000000] text-[30px] ml-2 mb-6">
          About Us
        </div>
        <div className="text-center w-full h-72">
          <div className="px-3 py-2 h-full">
            {aboutCompany ? (
              <div className={`w-full h-full font-medium text-[#000000] ${aboutCompany.length <=350 ? "text-[25px]" : "text-[18px]"}`}>
                {aboutCompany}
              </div>
            ) : (
              <div className="w-full h-full bg-gray-200 rounded-lg px-2 py-1 font-medium text-[#aeaeae] text-[25px]">
                Needs to be updated by Admin...
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-end mr-4">
        <div onClick={onClose} className="bg-gradient-to-b from-[#6DB935] to-[#4DAA09] rounded-lg cursor-pointer shadow-lg font-semibold text-[30px] px-12 py-1 text-white flex justify-center w-fit items-center">
          Close
        </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUsPopup;
