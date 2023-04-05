import React, { useEffect, useState } from "react";
import bird from "../../assets/Subtract.svg";
import { useLocation, useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function SideBar() {
  const location = useLocation();
  const [firstWord, setFirstWord] = useState("");
  const navigate = useNavigate();
  const totalUsedArea = useSelector((state) => state.byrdsPage.totalUsedArea);
  const dispatch = useDispatch();


  const handleLogout = () => {
    localStorage.setItem('token', '')
    window.location.replace('/login')
    // navigate("/login");
  };

  window.addEventListener('storage', (event) => {
    if (event.key === 'token' && event.newValue) {
      localStorage.setItem('token', '');
      window.location.replace('/login')
    }
  });

  useEffect(() => {
    const path = location.pathname;
    const pathWords = path.split("/");
    setFirstWord(pathWords[1]);
  }, [location]);

  return (
    <div className="bg-slate-50 h-full">
      <div
        className="w-2/5 my-0.5 p-2 ml-6 cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
        <img className="bg-slate-50" src={bird} alt="" />
      </div>
      <div className="grid grid-cols-2 gap-4 justify-items-center place-items-center px-8 py-4">
        <div className="w-2/4 flex flex-col justify-center items-center">
          <NavLink to="/dashboard">
            <div
              className={`flex justify-center align-middle items-center bg-slate-100 h-7 w-7 xl:w-10 xl:h-10 rounded-lg hover:bg-gradient-to-b from-[#6DB935] to-[#4DAA09] hover:text-white my-1 cursor-pointer ${location.pathname === "/dashboard"
                ? "bg-gradient-to-b from-[#6DB935] to-[#4DAA09] text-white"
                : "text-gray-500"
                } `}
            >
              <svg
                width="23"
                height="23"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Stockholm-icons / Layout / Layout-4-blocks">
                  <rect
                    id="Rectangle 7"
                    x="4.53711"
                    y="4.09088"
                    width="6.42727"
                    height="6.36364"
                    rx="1.5"
                    fill="currentColor"
                  />
                  <path
                    id="Combined Shape"
                    opacity="0.3"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12.8007 5.59088C12.8007 4.76245 13.4723 4.09088 14.3007 4.09088H17.728C18.5564 4.09088 19.228 4.76245 19.228 5.59088V8.95452C19.228 9.78294 18.5564 10.4545 17.728 10.4545H14.3007C13.4723 10.4545 12.8007 9.78294 12.8007 8.95452V5.59088ZM4.53711 13.7727C4.53711 12.9443 5.20868 12.2727 6.03711 12.2727H9.46438C10.2928 12.2727 10.9644 12.9443 10.9644 13.7727V17.1363C10.9644 17.9648 10.2928 18.6363 9.46438 18.6363H6.03711C5.20868 18.6363 4.53711 17.9648 4.53711 17.1363V13.7727ZM14.3007 12.2727C13.4723 12.2727 12.8007 12.9443 12.8007 13.7727V17.1363C12.8007 17.9648 13.4723 18.6363 14.3007 18.6363H17.728C18.5564 18.6363 19.228 17.9648 19.228 17.1363V13.7727C19.228 12.9443 18.5564 12.2727 17.728 12.2727H14.3007Z"
                    fill="currentColor"
                  />
                </g>
              </svg>
            </div>
          </NavLink>
          <div className="text-center text-xs">Dashboard</div>
        </div>
        <div className="w-2/4 flex flex-col justify-center items-center">
          <NavLink to="/profile">
            <div
              className={`flex justify-center align-middle items-center bg-slate-100 h-7 w-7 xl:w-10 xl:h-10 rounded-lg hover:bg-gradient-to-b from-[#6DB935] to-[#4DAA09] hover:text-white my-1 cursor-pointer ${location.pathname === "/profile"
                ? "bg-gradient-to-b from-[#6DB935] to-[#4DAA09] text-white"
                : "text-gray-500"
                } `}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M17.294 7.29105C17.294 10.2281 14.9391 12.5831 12 12.5831C9.0619 12.5831 6.70601 10.2281 6.70601 7.29105C6.70601 4.35402 9.0619 2 12 2C14.9391 2 17.294 4.35402 17.294 7.29105ZM12 22C7.66237 22 4 21.295 4 18.575C4 15.8539 7.68538 15.1739 12 15.1739C16.3386 15.1739 20 15.8789 20 18.599C20 21.32 16.3146 22 12 22Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </NavLink>
          <div className="text-center text-xs">Profile</div>
        </div>
        <div className="w-2/4 flex flex-col justify-center items-center">
          <NavLink to="/byrdsPage">
            <div className={`flex justify-center align-middle items-center bg-slate-100 h-7 w-7 xl:w-10 xl:h-10 rounded-lg hover:bg-gradient-to-b from-[#6DB935] to-[#4DAA09] hover:text-white my-1 cursor-pointer ${location.pathname === "/byrdsPage"
              ? "bg-gradient-to-b from-[#6DB935] to-[#4DAA09] text-white"
              : "text-gray-500"
              } `}>
              <svg
                width="23"
                height="23"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7.81 2H16.191C19.28 2 21 3.78 21 6.83V17.16C21 20.26 19.28 22 16.191 22H7.81C4.77 22 3 20.26 3 17.16V6.83C3 3.78 4.77 2 7.81 2ZM8.08 6.66V6.65H11.069C11.5 6.65 11.85 7 11.85 7.429C11.85 7.87 11.5 8.22 11.069 8.22H8.08C7.649 8.22 7.3 7.87 7.3 7.44C7.3 7.01 7.649 6.66 8.08 6.66ZM8.08 12.74H15.92C16.35 12.74 16.7 12.39 16.7 11.96C16.7 11.53 16.35 11.179 15.92 11.179H8.08C7.649 11.179 7.3 11.53 7.3 11.96C7.3 12.39 7.649 12.74 8.08 12.74ZM8.08 17.31H15.92C16.319 17.27 16.62 16.929 16.62 16.53C16.62 16.12 16.319 15.78 15.92 15.74H8.08C7.78 15.71 7.49 15.85 7.33 16.11C7.17 16.36 7.17 16.69 7.33 16.95C7.49 17.2 7.78 17.35 8.08 17.31Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </NavLink>
          <div className="text-center text-xs">Byrds Page</div>
        </div>
        <div className="w-2/4 flex flex-col justify-center items-center">
          <NavLink to="/overallEchoEco">
            <div
              className={`flex justify-center items-center bg-slate-100 h-7 w-7 xl:w-10 xl:h-10 rounded-lg hover:bg-gradient-to-b from-[#6DB935] to-[#4DAA09] hover:text-white cursor-pointer ${firstWord === "overallEchoEco"
                ? "bg-gradient-to-b from-[#6DB935] to-[#4DAA09] text-white"
                : "text-gray-500"
                } `}
            >
              <svg
                width="23"
                height="23"
                viewBox="0 0 25 25"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.0002 15.8437L10.1564 13L13.0002 10.1562L15.8439 13L13.0002 15.8437ZM10.6981 7.88123L8.45016 5.63331L13.0002 1.08331L17.5502 5.63331L15.3022 7.88123L13.0002 5.57915L10.6981 7.88123ZM5.6335 17.55L1.0835 13L5.6335 8.44998L7.88141 10.6979L5.57933 13L7.88141 15.3021L5.6335 17.55ZM20.3668 17.55L18.1189 15.3021L20.421 13L18.1189 10.6979L20.3668 8.44998L24.9168 13L20.3668 17.55ZM13.0002 24.9166L8.45016 20.3666L10.6981 18.1187L13.0002 20.4208L15.3022 18.1187L17.5502 20.3666L13.0002 24.9166Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </NavLink>
          <div className="text-center text-xs">Echo eco</div>
        </div>
        <div className="w-2/4 flex flex-col justify-center items-center">
          <NavLink to="/echoPics">
            <div
              className={`flex justify-center items-center bg-slate-100 h-7 w-7 xl:w-10 xl:h-10 rounded-lg hover:bg-gradient-to-b from-[#6DB935] to-[#4DAA09] hover:text-white cursor-pointer ${location.pathname === "/echoPics"
                ? "bg-gradient-to-b from-[#6DB935] to-[#4DAA09] text-white"
                : "text-gray-500"
                } `}
            >
              <svg
                width="23"
                height="23"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="3.79785"
                  y="3"
                  width="19.2818"
                  height="10.9091"
                  rx="1"
                  transform="rotate(14.86 3.79785 3)"
                  fill="currentColor"
                />
                <rect
                  x="2"
                  y="5"
                  width="19.2818"
                  height="10.9091"
                  rx="1"
                  fill="currentColor"
                />
              </svg>
            </div>
          </NavLink>
          <div className="text-center text-xs">Echo Pics</div>
        </div>
        <div className="w-2/4 flex flex-col justify-center items-center">
          <NavLink to="/leaderboard">
            <div
              className={`flex justify-center align-middle items-center bg-slate-100 h-7 w-7 xl:w-10 xl:h-10 rounded-lg hover:bg-gradient-to-b from-[#6DB935] to-[#4DAA09] hover:text-white my-1 cursor-pointer ${location.pathname === "/leaderboard"
                ? "bg-gradient-to-b from-[#6DB935] to-[#4DAA09] text-white"
                : "text-gray-500"
                } `}
            >
              <svg
                width="23"
                height="23"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M17.1796 4.41C17.1796 3.08 18.2596 2 19.5896 2C20.9196 2 21.9996 3.08 21.9996 4.41C21.9996 5.74 20.9196 6.82 19.5896 6.82C18.2596 6.82 17.1796 5.74 17.1796 4.41ZM13.3295 14.7593L16.2195 11.0303L16.1795 11.0503C16.3395 10.8303 16.3695 10.5503 16.2595 10.3003C16.1505 10.0503 15.9095 9.8803 15.6505 9.8603C15.3795 9.8303 15.1105 9.9503 14.9495 10.1703L12.5305 13.3003L9.75951 11.1203C9.58951 10.9903 9.38951 10.9393 9.18951 10.9603C8.99051 10.9903 8.81051 11.0993 8.68951 11.2593L5.73051 15.1103L5.66951 15.2003C5.49951 15.5193 5.57951 15.9293 5.87951 16.1503C6.01951 16.2403 6.16951 16.3003 6.33951 16.3003C6.57051 16.3103 6.78951 16.1893 6.92951 16.0003L9.43951 12.7693L12.2895 14.9103L12.3795 14.9693C12.6995 15.1393 13.0995 15.0603 13.3295 14.7593ZM15.4495 3.7803C15.4095 4.0303 15.3895 4.2803 15.3895 4.5303C15.3895 6.7803 17.2095 8.5993 19.4495 8.5993C19.6995 8.5993 19.9395 8.5703 20.1895 8.5303V16.5993C20.1895 19.9903 18.1895 22.0003 14.7895 22.0003H7.40051C3.99951 22.0003 1.99951 19.9903 1.99951 16.5993V9.2003C1.99951 5.8003 3.99951 3.7803 7.40051 3.7803H15.4495Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </NavLink>
          <div className="text-center text-xs">Leader Board</div>
        </div>
        <div className="w-2/4 flex flex-col justify-center items-center">
          <NavLink to="/paymenthistory">
            <div
              className={`flex justify-center align-middle items-center bg-slate-100 h-7 w-7 xl:w-10 xl:h-10 rounded-lg hover:bg-gradient-to-b from-[#6DB935] to-[#4DAA09] hover:text-white my-1 cursor-pointer ${location.pathname === "/paymenthistory"
                ? "bg-gradient-to-b from-[#6DB935] to-[#4DAA09] text-white"
                : "text-gray-500"
                } `}
            >
              <svg
                width="23"
                height="23"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M17.7689 8.3818H22C22 4.98459 19.9644 3 16.5156 3H7.48444C4.03556 3 2 4.98459 2 8.33847V15.6615C2 19.0154 4.03556 21 7.48444 21H16.5156C19.9644 21 22 19.0154 22 15.6615V15.3495H17.7689C15.8052 15.3495 14.2133 13.7975 14.2133 11.883C14.2133 9.96849 15.8052 8.41647 17.7689 8.41647V8.3818ZM17.7689 9.87241H21.2533C21.6657 9.87241 22 10.1983 22 10.6004V13.131C21.9952 13.5311 21.6637 13.8543 21.2533 13.8589H17.8489C16.8548 13.872 15.9855 13.2084 15.76 12.2643C15.6471 11.6783 15.8056 11.0736 16.1931 10.6122C16.5805 10.1509 17.1573 9.88007 17.7689 9.87241ZM17.92 12.533H18.2489C18.6711 12.533 19.0133 12.1993 19.0133 11.7877C19.0133 11.3761 18.6711 11.0424 18.2489 11.0424H17.92C17.7181 11.0401 17.5236 11.1166 17.38 11.255C17.2364 11.3934 17.1555 11.5821 17.1556 11.779C17.1555 12.1921 17.4964 12.5282 17.92 12.533ZM6.73778 8.3818H12.3822C12.8044 8.3818 13.1467 8.04812 13.1467 7.63649C13.1467 7.22487 12.8044 6.89119 12.3822 6.89119H6.73778C6.31903 6.89116 5.9782 7.2196 5.97333 7.62783C5.97331 8.04087 6.31415 8.37705 6.73778 8.3818Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </NavLink>
          <div className="text-center text-xs">Completed Transactions</div>
        </div>
        <div className="w-2/4 flex flex-col justify-center items-center">
          <NavLink to="/billingscreen">
            <div
              className={`flex justify-center align-middle items-center bg-slate-100 h-7 w-7 xl:w-10 xl:h-10 rounded-lg hover:bg-gradient-to-b from-[#6DB935] to-[#4DAA09] hover:text-white my-1 cursor-pointer ${location.pathname === "/billingscreen"
                ? "bg-gradient-to-b from-[#6DB935] to-[#4DAA09] text-white"
                : "text-gray-500"
                } `}
            >
              <svg
                width="23"
                height="23"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M16.4109 2.76862L16.4119 3.51824C19.1665 3.73414 20.9862 5.6112 20.9891 8.48975L21 16.9155C21.0039 20.054 19.0322 21.985 15.8718 21.99L8.15189 22C5.0112 22.004 3.01482 20.027 3.01087 16.8796L3.00001 8.55272C2.99606 5.65517 4.75153 3.78311 7.50618 3.53024L7.50519 2.78061C7.5042 2.34083 7.83002 2.01 8.26445 2.01C8.69887 2.009 9.02469 2.33883 9.02568 2.77861L9.02666 3.47826L14.8914 3.47027L14.8904 2.77062C14.8894 2.33084 15.2152 2.001 15.6497 2C16.0742 1.99901 16.4099 2.32884 16.4109 2.76862ZM4.52149 8.86157L19.4696 8.84158V8.49175C19.4272 6.34283 18.349 5.21539 16.4139 5.04748L16.4148 5.81709C16.4148 6.24688 16.0801 6.58771 15.6556 6.58771C15.2212 6.58871 14.8944 6.24888 14.8944 5.81909L14.8934 5.0095L9.02864 5.01749L9.02962 5.82609C9.02962 6.25687 8.70479 6.5967 8.27037 6.5967C7.83595 6.5977 7.50914 6.25887 7.50914 5.82809L7.50815 5.05847C5.58286 5.25138 4.51754 6.38281 4.5205 8.55072L4.52149 8.86157ZM15.2399 13.4043V13.4153C15.2498 13.8751 15.625 14.2239 16.0801 14.2139C16.5244 14.2029 16.8789 13.8221 16.869 13.3623C16.8483 12.9225 16.4918 12.5637 16.0485 12.5647C15.5944 12.5747 15.2389 12.9445 15.2399 13.4043ZM16.0554 17.892C15.6013 17.882 15.235 17.5032 15.234 17.0435C15.2241 16.5837 15.5884 16.2029 16.0426 16.1919H16.0525C16.5165 16.1919 16.8927 16.5707 16.8927 17.0405C16.8937 17.5102 16.5185 17.891 16.0554 17.892ZM11.1721 13.4203C11.1919 13.8801 11.568 14.2389 12.0222 14.2189C12.4665 14.1979 12.821 13.8181 12.8012 13.3583C12.7904 12.9085 12.425 12.5587 11.9807 12.5597C11.5266 12.5797 11.1711 12.9605 11.1721 13.4203ZM12.0262 17.8471C11.572 17.8671 11.1968 17.5082 11.1761 17.0485C11.1761 16.5887 11.5305 16.2089 11.9847 16.1879C12.429 16.1869 12.7953 16.5367 12.8052 16.9855C12.8259 17.4463 12.4705 17.8261 12.0262 17.8471ZM7.10434 13.4553C7.12408 13.915 7.50025 14.2749 7.95442 14.2539C8.39872 14.2339 8.75317 13.8531 8.73244 13.3933C8.72257 12.9435 8.35725 12.5937 7.91197 12.5947C7.4578 12.6147 7.10335 12.9955 7.10434 13.4553ZM7.95837 17.8521C7.5042 17.8731 7.12902 17.5132 7.10828 17.0535C7.1073 16.5937 7.46274 16.2129 7.91691 16.1929C8.3612 16.1919 8.7275 16.5417 8.73738 16.9915C8.75811 17.4513 8.40366 17.8321 7.95837 17.8521Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </NavLink>
          <div className="text-center text-xs">Pending Transations</div>
        </div>
        <div className="w-2/4 flex flex-col justify-center items-center">
          <NavLink to="/latestUpdates">
            <div
              className={`flex group hover:shadow-xl justify-center align-middle items-center bg-slate-200 h-7 w-7 xl:w-10 xl:h-10 rounded-lg hover:bg-gradient-to-b from-[#6DB935] to-[#4DAA09] hover:text-white cursor-pointer ${location.pathname === "/latestUpdates"
                ? "bg-gradient-to-b from-[#6DB935] to-[#4DAA09] text-white shadow-lg"
                : "text-gray-600"
                } `}
            >
              <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M9.17476 13.2165H8.82505C6.42166 13.2165 4.47358 11.2928 4.47358 8.92037V4.29708C4.47358 1.92374 6.42166 0 8.82505 0H9.17476C11.1693 0 12.8501 1.32395 13.3645 3.13098C13.4352 3.37874 13.2482 3.62459 12.9886 3.62459H11.8562C11.5142 3.62459 11.2362 3.89818 11.2362 4.23586V4.23682C11.2362 4.57546 11.5142 4.84905 11.8562 4.84905H12.9004C13.2463 4.84905 13.5272 5.12551 13.5272 5.46702C13.5272 5.80853 13.2463 6.08499 12.9004 6.08499H11.8562C11.5142 6.08499 11.2362 6.35953 11.2362 6.69817C11.2362 7.03585 11.5142 7.3104 11.8562 7.3104H12.9004C13.2463 7.3104 13.5272 7.58686 13.5272 7.92933C13.5272 8.26988 13.2463 8.54634 12.9004 8.54634H11.8562C11.5142 8.54634 11.2362 8.82088 11.2362 9.15952C11.2362 9.49721 11.5142 9.7708 11.8562 9.7708H12.9334C13.1988 9.7708 13.3887 10.0272 13.3054 10.2759C12.7309 11.9844 11.0996 13.2165 9.17476 13.2165ZM15.5626 8.78281C15.5626 8.25381 15.9966 7.8262 16.5313 7.8262C17.066 7.8262 17.5 8.25381 17.5 8.78281C17.5 13.0866 14.2006 16.6404 9.9692 17.1177V19.0434C9.9692 19.5714 9.53522 20 9.00048 20C8.46478 20 8.03177 19.5714 8.03177 19.0434V17.1177C3.79945 16.6404 0.5 13.0866 0.5 8.78281C0.5 8.25381 0.933985 7.8262 1.46872 7.8262C2.00345 7.8262 2.43743 8.25381 2.43743 8.78281C2.43743 12.3557 5.38136 15.2629 9.00048 15.2629C12.6186 15.2629 15.5626 12.3557 15.5626 8.78281Z" />
              </svg>
            </div>
          </NavLink>
          <div className="text-center text-xs">Latest Updates</div>
        </div>
        <div className="w-2/4 flex flex-col justify-center items-center">
          <div
            className="flex justify-center items-center my-1 text-gray-500 bg-slate-100 h-7 w-7 xl:w-10 xl:h-10 rounded-lg hover:bg-[#D35A45] hover:text-white  cursor-pointer"
            onClick={handleLogout}
          >
            <svg
              width="23"
              height="23"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.89535 11.23C9.45785 11.23 9.11192 11.57 9.11192 12C9.11192 12.42 9.45785 12.77 9.89535 12.77H16V17.55C16 20 13.9753 22 11.4724 22H6.51744C4.02471 22 2 20.01 2 17.56V6.45C2 3.99 4.03488 2 6.52762 2H11.4927C13.9753 2 16 3.99 16 6.44V11.23H9.89535ZM19.6302 8.5402L22.5502 11.4502C22.7002 11.6002 22.7802 11.7902 22.7802 12.0002C22.7802 12.2002 22.7002 12.4002 22.5502 12.5402L19.6302 15.4502C19.4802 15.6002 19.2802 15.6802 19.0902 15.6802C18.8902 15.6802 18.6902 15.6002 18.5402 15.4502C18.2402 15.1502 18.2402 14.6602 18.5402 14.3602L20.1402 12.7702H16.0002V11.2302H20.1402L18.5402 9.6402C18.2402 9.3402 18.2402 8.8502 18.5402 8.5502C18.8402 8.2402 19.3302 8.2402 19.6302 8.5402Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div className="text-center text-xs">Logout</div>
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

export default SideBar;
