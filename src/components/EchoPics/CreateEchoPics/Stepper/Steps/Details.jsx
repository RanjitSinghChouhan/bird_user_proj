import React, { useState } from "react";
import { useStepperContext } from "../StepperContext/StepperContext";

function Details({handleData, handleNext}) {
  const { echoPicsData, setEchoPicsData } = useStepperContext();
  const [isByrds, setIsByrds] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEchoPicsData({ ...echoPicsData, [name]: value });
  };

  if(echoPicsData && echoPicsData.cardType) handleData(echoPicsData.cardType)
  console.log(echoPicsData, "userData");
  
  return (
    <div>
      <form onSubmit={handleNext}>
        <div>
          <div className="w-full">
            <label
              htmlFor="name"
              className="font-semibold text-xl text-[#404040] flex"
            >
              Name {!echoPicsData["picName"] && echoPicsData.error === true ? <div className="text-red-500">Required</div> : ""}
            </label>
            <input
              type="text"
              id="name"
              className="shadow-lg rounded-lg py-2 px-4 w-full font-medium text-xl mt-4 mb-5"
              placeholder="Enter Name"
              name="picName"
              value={echoPicsData["picName"] || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="w-full my-3">
            <label
              htmlFor="qty"
              className="font-semibold text-xl text-[#404040] flex"
            >
              Quantity {!echoPicsData["quantity"] && echoPicsData.error === true ? <div className="text-red-500">Required</div> : ""}
            </label>
            <br />
            <input
              type="number"
              id="qty"
              className="shadow-lg rounded-lg py-2 px-4 w-full font-medium text-xl mb-5"
              placeholder="Quantity"
              name="quantity"
              value={echoPicsData["quantity"] || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex w-full my-3">
            <div className="w-1/2">
              <label
                htmlFor="card-type"
                className="font-semibold text-xl text-[#404040] flex"
              >
                Choose Type {!echoPicsData["cardType"] && echoPicsData.error === true ? <div className="text-red-500">Required</div> : ""}
              </label>
              <br />
              <select
                className="shadow-lg rounded-lg py-1 px-4 w-full font-medium text-xl"
                name="cardType"
                value={echoPicsData["cardType"] || ""}
                onChange={handleChange}
              >
                <option value="" disabled selected hidden>
                  Select
                </option>
                {[
                  "non adh foldable",
                  "adh foldable",
                  "sleave foldable",
                  "landscape card",
                ].map((item, index) => {
                  return (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="w-1/2">
              <label
                htmlFor="frequency"
                className="font-semibold text-xl text-[#404040] flex "
              >
                Frequency {!echoPicsData["freq"] && echoPicsData.error === true ? <div className="text-red-500">Required</div> : ""}
              </label>
              <br />
              <select
                className="shadow-lg rounded-lg py-1 px-4 w-full font-medium text-xl mx-2"
                name="freq"
                value={echoPicsData["freq"] || ""}
                onChange={handleChange}
              >
                <option value="" disabled selected hidden>
                  Select
                </option>
                {["Weekly", "Bi Weekly", "Monthly"].map((item, index) => {
                  return (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="w-full">
            <div className="font-semibold text-xl text-[#404040] mb-2">
              Choose Art Style
            </div>
            <label
              htmlFor="art-style"
              className="inline-flex items-center rounded-full cursor-pointer bg-[#F4F4F4]"
            >
              <span
                id="art-style"
                onClick={() => setIsByrds(true)}
                className={
                  isByrds
                    ? `px-4 py-2 rounded-full bg-gradient-to-b from-[#6DB935] to-[#4DAA09] text-white`
                    : `px-4 py-2 rounded-full`
                }
              >
                Byrds
              </span>
              <span
              id="art-style"
                onClick={() => setIsByrds(false)}
                className={
                  !isByrds
                    ? `px-4 py-2 rounded-full bg-gradient-to-b from-[#6DB935] to-[#4DAA09] text-white`
                    : `px-4 py-2 rounded-full`
                }
              >
                Custom
              </span>
            </label>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Details;
