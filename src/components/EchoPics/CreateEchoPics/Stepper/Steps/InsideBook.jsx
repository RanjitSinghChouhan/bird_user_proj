import React from "react";
import uploadPic from "../../../../../assets/uploadPic.svg";
import { useStepperContext } from "../StepperContext/StepperContext";
import { FileUploader } from "react-drag-drop-files";

function InsideBook() {
  const { echoPicsData, setEchoPicsData } = useStepperContext();
  const fileTypes = ["JPG", "PNG", "JPEG"];
  const handleLeftPageChange = (e) => {
    setEchoPicsData({ ...echoPicsData, leftPageImg: e });
  };
  const handleRightPageChange = (e) => {
    setEchoPicsData({ ...echoPicsData, rightPageImg: e });
  };
  console.log(echoPicsData, "Insidebook");
  return (
    <div className="flex justify-center items-center text-center">
      <div>
        <div className="font-semibold text-[#404040] text-[25px] mb-4">
          Inside Book{" "}
          {(!echoPicsData["leftPageImg"] || !echoPicsData["rightPageImg"]) &&
          echoPicsData.error === true ? (
            <div className="text-red-500 text-xs">Required</div>
          ) : (
            ""
          )}
        </div>
        <div className="flex">
          <div className="w-1/2">
            <div className="font-semibold text-[#404040] text-[25px] mb-4">
              Left Page
            </div>
            <div className="border-solid border-2 border-[#aeaeae] rounded-xl p-2 mr-1">
              {echoPicsData["leftPageImg"] ? (
                <FileUploader
                  id="imgInput"
                  classes="cursor-pointer"
                  handleChange={handleLeftPageChange}
                  name="leftPageImg"
                  types={fileTypes}
                >
                  <div className="rounded-xl">
                    <img
                      src={URL.createObjectURL(echoPicsData.leftPageImg)}
                      alt=""
                    />
                  </div>
                </FileUploader>
              ) : (
                <div className="px-12 py-24 rounded-xl bg-[#f2f2f2]">
                  <form>
                    <label htmlFor="imgInput" className="cursor-pointer">
                      <FileUploader
                        id="imgInput"
                        classes="cursor-pointer"
                        handleChange={handleLeftPageChange}
                        name="leftPageImg"
                        types={fileTypes}
                      >
                        <div className="bg-[#E1E1E1] w-14 h-14 px-4 py-3 rounded-full mx-auto">
                          <img src={uploadPic} alt="" className="w-8 h-8" />
                        </div>
                      </FileUploader>
                    </label>
                    <div className="font-semibold text-[#606060] text-[15px]">
                      Upload image
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
          <div className="w-1/2">
            <div className="font-semibold text-[#404040] text-[25px] mb-4">
              Right Page
            </div>
            <div className="border-solid border-2 border-[#aeaeae] rounded-xl p-2 ml-1">
              {echoPicsData["rightPageImg"] ? (
                <FileUploader
                  id="imgInput"
                  classes="cursor-pointer"
                  handleChange={handleRightPageChange}
                  name="rightPageImg"
                  types={fileTypes}
                >
                  <div className="rounded-xl">
                    <img
                      src={URL.createObjectURL(echoPicsData.rightPageImg)}
                      alt=""
                    />
                  </div>
                </FileUploader>
              ) : (
                <div className="px-12 py-24 rounded-xl bg-[#f2f2f2]">
                  <form>
                    <label htmlFor="imgInput" className="cursor-pointer">
                      <FileUploader
                        id="imgInput"
                        classes="cursor-pointer"
                        handleChange={handleRightPageChange}
                        name="rightPageImg"
                        types={fileTypes}
                      >
                        <div className="bg-[#E1E1E1] w-14 h-14 px-4 py-3 rounded-full mx-auto">
                          <img src={uploadPic} alt="" className="w-8 h-8" />
                        </div>
                      </FileUploader>
                    </label>
                    <div className="font-semibold text-[#606060] text-[15px] w-full">
                      Upload image
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InsideBook;
