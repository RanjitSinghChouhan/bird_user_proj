import React from "react";
import { useNavigate } from "react-router";

function NavBarLBNL() {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between gap-6 px-6 py-4">
      <div className="flex items-center gap-4 pt-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-10 cursor-pointer text-[#6DB935] hover:text-[#4DAA09]"
          onClick={() => navigate('/')}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
          />
        </svg>
        <h1 className="text-[40px] font-medium capitalize pb-1">
          Leader Board
        </h1>
      </div>
      <div>
        <button
          onClick={() => navigate("/login")}
          className="bg-gradient-to-b from-[#6DB935] to-[#4DAA09] text-white rounded-md font-semibold px-3 py-1"
        >
          Login/Signup
        </button>
      </div>
    </div>
  );
}

export default NavBarLBNL;
