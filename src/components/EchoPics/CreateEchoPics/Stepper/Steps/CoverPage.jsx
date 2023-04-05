import React from "react";
import uploadPic from "../../../../../assets/uploadPic.svg";
import { useStepperContext } from "../StepperContext/StepperContext";
import { FileUploader } from "react-drag-drop-files";

function CoverPage() {
  const { echoPicsData, setEchoPicsData } = useStepperContext();
  const fileTypes = ["JPG", "PNG", "JPEG"];

  const handleChange = (e) => {
    setEchoPicsData({ ...echoPicsData, coverPageImg: e });
  };
  console.log(echoPicsData["coverPageImg"], "userDataCoverpage");
  return (
    <div className="flex justify-center items-center text-center">
      <div>
        <div className="font-semibold text-[#404040] text-[25px] mb-4">
          Cover Page{" "}
          {!echoPicsData["coverPageImg"] && echoPicsData.error === true ? (
            <div className="text-red-500">Required</div>
          ) : (
            ""
          )}
        </div>
        {echoPicsData["cardType"] !== "landscape card" ? (
          <div className="border-solid border-2 border-[#aeaeae] rounded-xl w-80 h-80 mx-auto p-2">
            {echoPicsData["coverPageImg"] ? (
              <FileUploader
                id="imgInput"
                classes="cursor-pointer"
                handleChange={handleChange}
                name="coverPageImg"
                types={fileTypes}
              >
                <div className="rounded-xl">
                  <img
                    className=" h-[300px] rounded-xl"
                    src={URL.createObjectURL(echoPicsData.coverPageImg)}
                    alt=""
                  />
                </div>
              </FileUploader>
            ) : (
              <div className="px-20 py-[60px] rounded-xl bg-[#f2f2f2]">
                <form>
                  <label htmlFor="imgInput" className="cursor-pointer">
                    <FileUploader
                      id="imgInput"
                      classes="cursor-pointer"
                      handleChange={handleChange}
                      name="coverPageImg"
                      types={fileTypes}
                    >
                      <div className="bg-[#E1E1E1] w-20 h-20 px-6 py-6 rounded-full mx-auto">
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
        ) : (
          <div className="border-solid border-2 border-[#aeaeae] rounded-xl w-full p-2 h-56 my-12">
            {echoPicsData["coverPageImg"] ? (
              <FileUploader
                id="imgInput"
                classes="cursor-pointer"
                handleChange={handleChange}
                name="coverPageImg"
                types={fileTypes}
              >
                <div className="rounded-xl">
                  <img
                    className="h-52 rounded-xl"
                    src={URL.createObjectURL(echoPicsData.coverPageImg)}
                    alt=""
                  />
                </div>
              </FileUploader>
            ) : (
              <div className="px-36 h-[205px] py-10 rounded-xl bg-[#f2f2f2]">
                <form>
                  <label htmlFor="imgInput" className="cursor-pointer">
                    <FileUploader
                      id="imgInput"
                      classes="cursor-pointer"
                      handleChange={handleChange}
                      name="coverPageImg"
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
        )}
      </div>
    </div>
  );
}

export default CoverPage;
