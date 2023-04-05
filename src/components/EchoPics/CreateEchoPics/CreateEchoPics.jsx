import React, { useState } from "react";
import Stepper from "./Stepper/Stepper";
import StepperControl from "./Stepper/StepperControl";
import cancel from "../../../assets/squareCancel.svg";
import Details from "./Stepper/Steps/Details";
import CoverPage from "./Stepper/Steps/CoverPage";
import FinalPage from "./Stepper/Steps/FinalPage";
import InsideBook from "./Stepper/Steps/InsideBook";
import { UseContextProvider } from "./Stepper/StepperContext/StepperContext";

function CreateEchoPics({ visible, onClose }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [type, setType] = useState("");

  const handleData = (value) => {
    setType(value);
  };

  let steps = [];
  if (type === "landscape card") {
    steps = ["details", "cover-page", "final-page"];
  } else {
    steps = ["details", "cover-page", "inside-book", "final-page"];
  }

  const displayStep = (step) => {
    switch (steps.length) {
      case 4:
        switch (step) {
          case 1:
            return <Details handleData={handleData} />;
          case 2:
            return <CoverPage />;
          case 3:
            return <InsideBook />;
          case 4:
            return <FinalPage />;
          default:
            return;
        }
      case 3:
        switch (step) {
          case 1:
            return <Details handleData={handleData} />;
          case 2:
            return <CoverPage />;
          case 3:
            return <FinalPage />;
          default:
            return;
        }
      default:
        return;
    }
  };

  const handleClose = (e) => {
    if (e.target.id === "createEcho-container") onClose();
  };
  if (!visible) return null;
  return (
    <UseContextProvider>
      <div
        id="createEcho-container"
        onClick={handleClose}
        className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center"
      >
        <div className="bg-white w-[550px] h-[580px] rounded-2xl shadow-2xl p-4 relative">
          <div
            onClick={onClose}
            className="absolute top-2 right-2 cursor-pointer"
          >
            <img className="w-5 h-5" src={cancel} alt="" />
          </div>
          <div className="horizontal container mt-1">
            <Stepper steps={steps} currentStep={currentStep} />
            <div className="">{displayStep(currentStep)}</div>
          </div>
          <div className="mt-10">
            {currentStep !== steps.length + 1 && (
              <StepperControl
                currentStep={currentStep}
                steps={steps}
                setCurrentStep={setCurrentStep}
              />
            )}
          </div>
        </div>
      </div>
    </UseContextProvider>
  );
}

export default CreateEchoPics;
