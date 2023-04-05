import React from "react";
import uploadPic from "../../../../../assets/uploadPic.svg";
import { useStepperContext } from "../StepperContext/StepperContext";
import { FileUploader } from "react-drag-drop-files";

function FinalPage() {
  const { echoPicsData, setEchoPicsData } = useStepperContext();
  const fileTypes = ["JPG", "PNG", "JPEG"];

  const handleChange = (e) => {
    console.log(e, "e");
    setEchoPicsData({ ...echoPicsData, finalPageImg: e });
  };
  console.log(echoPicsData, "final");
  return (
    <div className="flex justify-center items-center text-center">
      <div>
        <div className="font-semibold text-[#404040] text-[25px] mb-4">
          Final Page{" "}
          {!echoPicsData["finalPageImg"] && echoPicsData.error === true ? (
            <div className="text-red-500">Required</div>
          ) : (
            ""
          )}
        </div>
        <div className="border-solid border-2 border-[#aeaeae] rounded-xl w-full p-2">
          {echoPicsData["finalPageImg"] ? (
            <FileUploader
              id="imgInput"
              classes="cursor-pointer"
              handleChange={handleChange}
              name="finalPageImg"
              types={fileTypes}
            >
              <div className="rounded-xl">
                <img
                  src={URL.createObjectURL(echoPicsData.finalPageImg)}
                  alt=""
                />
              </div>
            </FileUploader>
          ) : (
            <div className="px-36 py-20 rounded-xl bg-[#f2f2f2]">
              <form>
                <label htmlFor="imgInput" className="cursor-pointer">
                  <FileUploader
                    id="imgInput"
                    classes="cursor-pointer"
                    handleChange={handleChange}
                    name="finalPageImg"
                    types={fileTypes}
                  >
                    <div className="bg-[#E1E1E1] w-20 h-20 p-7 rounded-full mx-auto">
                      <img src={uploadPic} alt="" />
                    </div>
                  </FileUploader>
                </label>
                <div className="font-semibold text-[#000000] text-[25px] w-full">
                  Upload image
                </div>
                <div className="font-semibold text-[#606060] text-[15px]">
                  Or Drag and Drop
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FinalPage;
