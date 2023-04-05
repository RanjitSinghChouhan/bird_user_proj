import { useStepperContext } from "./StepperContext/StepperContext";

export default function StepperControl({ currentStep, steps, setCurrentStep }) {
  const { echoPicsData, setEchoPicsData } = useStepperContext();

  const handleClick = (direction) => {
    console.log(echoPicsData, "echoPicsDataclick", currentStep, direction);
    let newStep = currentStep;
    if(direction === "next" && currentStep === 1){
      if(!echoPicsData.picName || !echoPicsData.quantity || !echoPicsData.cardType || !echoPicsData.freq){
        setCurrentStep(currentStep);
        setEchoPicsData({...echoPicsData, "error":true})
      }
      else{
        direction === "next" ? newStep++ : newStep--;
        // check if steps are within bounds
        newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
        setEchoPicsData({...echoPicsData, "error":false})
      }
    }
    else if(direction === "next" && currentStep === 2){
      if(!echoPicsData.coverPageImg){
        setCurrentStep(currentStep)
        setEchoPicsData({...echoPicsData, "error":true})
      }
      else{
        direction === "next" ? newStep++ : newStep--;
        // check if steps are within bounds
        newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
        setEchoPicsData({...echoPicsData, "error":false})
      }
    }
    else if(direction === "next" && currentStep === 3 && echoPicsData.cardType !== "landscape card"){
      if(!echoPicsData.leftPageImg || !echoPicsData.rightPageImg){
        setCurrentStep(currentStep)
        setEchoPicsData({...echoPicsData, "error":true})
      }
      else{
        direction === "next" ? newStep++ : newStep--;
        // check if steps are within bounds
        newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
        setEchoPicsData({...echoPicsData, "error":false})
      }
    }
    else if(direction === "confirm" && currentStep === 4 && echoPicsData.cardType !== "landscape card"){
      if(!echoPicsData.finalPageImg){
        setCurrentStep(currentStep)
        setEchoPicsData({...echoPicsData, "error":true})
      }
      else{
        direction === "confirm" ? newStep++ : newStep--;
        // check if steps are within bounds
        newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
        setEchoPicsData({...echoPicsData, "error":false})
      }
    }
    else if(direction === "confirm" && currentStep === 3 && echoPicsData.cardType === "landscape card"){
      if(!echoPicsData.finalPageImg){
        setCurrentStep(currentStep)
        setEchoPicsData({...echoPicsData, "error":true})
      }
      else{
        direction === "confirm" ? newStep++ : newStep--;
        // check if steps are within bounds
        newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
        setEchoPicsData({...echoPicsData, "error":false})
      }
    }
    else{
      direction === "next" ? newStep++ : newStep--;
      // check if steps are within bounds
      newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
    }
  };
    return (
      <div className="flex justify-around">
        <button
          onClick={() => handleClick()}
          className={`cursor-pointer font-semibold uppercase GreenGradient transition duration-200   ${
            currentStep === 1 ? " hidden " : ""
          }`}
        >
          Back
        </button>
  
        <button
          onClick={() => handleClick(currentStep === steps.length ? "confirm" : "next")}
          className={`cursor-pointer rounded-lg bg-gradient-to-b from-[#6DB935] to-[#4DAA09] py-2 px-4 font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-slate-700 hover:text-white ${currentStep === 1 ? "w-full" : "w-2/4"}`}
        >
          {currentStep === steps.length ? "Submit" : "Next"}
        </button>
      </div>
    );
  }