import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import bird from "../../../../assets/Subtract.svg";
import { useDispatch, useSelector } from "react-redux";
import { getTotalTreeAlgaeAllCompanies } from "../../../../store/actions/leaderBoardAction";

function SideBarLBNL() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [totalTrees, setTotalTrees] = useState(0);
  const [totalAlgaes, setTotalAlgaes] = useState(0);
  const [totalCompanies, setTotalCompanies] = useState(0);
  const totalUsedArea = useSelector((state) => state.byrdsPage.totalUsedArea)

  useEffect(() => {
    dispatch(getTotalTreeAlgaeAllCompanies()).then(response => {
      setTotalTrees(response.data.totalTree);
      setTotalAlgaes(response.data.totalAlgae);
      setTotalCompanies(response.data.totalCompanies);
    })
  })
  return (
    <div className="bg-[#FFFFFF] h-full border border-r-[1px] border-[#ECEDEF]">
      <div
        className="w-2/5 my-0.5 p-2 ml-6 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img className="bg-[#FFFFFF]" src={bird} alt="" />
      </div>
      <div className="px-8 py-4">
        <div className="border border-[#EFF0F6] rounded-2xl min-h-[120px] w-full my-3 px-4 py-2">
          <div className="font-medium text-sm 2xl:text-base text-gray-500">
            Number of Trees Planted
          </div>
          <div className="GreenGradient font-bold text-xl mt-3">
            {totalTrees}
          </div>
        </div>
        <div className="border border-[#EFF0F6] rounded-2xl min-h-[120px] w-full my-3 px-4 py-2">
          <div className="font-medium text-sm 2xl:text-base text-gray-500">
            Number Algae Spawned
          </div>
          <div className="GreenGradient font-bold text-xl mt-3">
            {totalAlgaes}
          </div>
        </div>
        <div className="border border-[#EFF0F6] rounded-2xl min-h-[120px] w-full my-3 px-4 py-2">
          <div className="font-medium text-sm 2xl:text-base text-gray-500">
            Number of Companies Onboarded
          </div>
          <div className="GreenGradient font-bold text-xl mt-3">
            {totalCompanies}
          </div>
        </div>
      </div>
      <div className=" mx-auto mt-6 flex flex-col p-2 xlp-3 relative z-0 h-[15rem] 2xl:h-[16rem] w-[180px] 2xl:w-[200px] rounded-xl text-white" style={{ background: `linear-gradient(180deg, #6DB935 0%, #6AB831 0.01%, #4DAA09 100%)` }}>
        <h1 className="text-center text-lg 2xl:text-xl mt-2 font-medium">Greener by the day</h1>
        <div className="text-[3vw] flex-grow flex flex-col items-center justify-center -mt-2">
          <h1 className="font-semibold">{totalUsedArea}<span className="text-xs font-medium ml-1">Sq ft.</span></h1>
          <p className="text-sm text-center font-medium">Made greener by Byrds</p>
        </div>
        <p className="text-base font-medium">Thanks for your<br />contribution!</p>

        <svg className="absolute -bottom-1 right-0" width="49" height="70" viewBox="0 0 49 70" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_d_1887_5329)">
            <rect x="26" y="14" width="9" height="51" fill="#693F00" />
          </g>
          <g filter="url(#filter1_d_1887_5329)">
            <rect x="10" y="44" width="9" height="22" fill="#693F00" />
          </g>
          <g filter="url(#filter2_d_1887_5329)">
            <ellipse cx="30" cy="25" rx="13" ry="21" fill="#00FF49" />
          </g>
          <g filter="url(#filter3_d_1887_5329)">
            <ellipse cx="14" cy="35" rx="13" ry="21" fill="#00FF49" />
          </g>
          <defs>
            <filter id="filter0_d_1887_5329" x="24" y="10" width="17" height="59" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dx="2" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1887_5329" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1887_5329" result="shape" />
            </filter>
            <filter id="filter1_d_1887_5329" x="9" y="40" width="17" height="30" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dx="3" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1887_5329" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1887_5329" result="shape" />
            </filter>
            <filter id="filter2_d_1887_5329" x="15" y="0" width="34" height="50" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dx="2" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1887_5329" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1887_5329" result="shape" />
            </filter>
            <filter id="filter3_d_1887_5329" x="0" y="10" width="34" height="50" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dx="3" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1887_5329" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1887_5329" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

export default SideBarLBNL;
