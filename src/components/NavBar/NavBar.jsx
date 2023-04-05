import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import profileIcon from "../../assets/profileIcon.svg";
import { useNavigate } from "react-router";
import { createSearchParams } from "react-router-dom";
import { getEchoEcosByCompanyId, getTotalEchoPlantedUrl } from "../../store/actions/echoEcoAction";
import {
  getNotificationFlag,
  getNotifications,
} from "../../store/actions/leaderBoardAction";
import { useClickOutside } from "../../hooks/useClockOutside";
import SupportPopup from "./Support/SupportPopup";
import { userInfo, userInfoData } from "../../store/actions/authAction";

function NavBar() {
  const [isHover, setIsHover] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isNotification, setIsNotification] = useState(false);
  const [isRequest, setIsRequest] = useState(false);
  const [notifications, setNotification] = useState([]);
  const [notificationFlag, setNotificationFlag] = useState();
  const navigate = useNavigate();
  const getUserInfo = useSelector((state) => state.auth.userInfo[0]);
  const dispatch = useDispatch();
  const notificationRef = useRef();
  const searchRef = useRef();

  useClickOutside(() => setIsNotification(false), notificationRef);
  useClickOutside(() => setIsSearching(false), searchRef);

  const handleSearch = (e) => {
    e.target.value ? setIsSearching(true) : setIsSearching(false);
    setSearchVal(e.target.value);
  };

  const handleNotificationClick = async () => {
    if (notifications.length === 0) {
      await dispatch(getNotifications()).then((response) => {
        setNotification(response.data.notifications);
      });
    }
    setIsNotification(true);
    if (notificationFlag) {
      handleNotificationFlag();
    }
  };

  const handleNotificationFlag = () => {
    dispatch(getNotificationFlag()).then((response) => {
      setNotificationFlag(response.data.flag);
    });
  };

  const onCloseSupportPopup = () => {
    setIsRequest(false);
  };

  useEffect(() => {
    if (getUserInfo) {
      dispatch(getTotalEchoPlantedUrl(getUserInfo?.companyId));
    }
  }, [dispatch, getUserInfo]);

  useEffect(() => {
    dispatch(userInfo()).then((res) => {
      dispatch(userInfoData(res.data.data));
      handleNotificationFlag();
    });
  }, [dispatch]);

  useEffect(() => {
    if (getUserInfo) {
    dispatch(
      getEchoEcosByCompanyId({ companyId: getUserInfo?.companyId, offset: 0 })
    );
    }
  }, [dispatch, getUserInfo]);

  return (
    <div className="flex items-center justify-between w-full gap-6 px-8 py-4">
      <form className="flex items-center gap-6 w-full max-w-xl">
        <div className="relative w-full rounded-full border border-transparent focus-within:border-green-200 focus:shadow-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            id="simple-search"
            value={searchVal}
            onChange={(e) => handleSearch(e)}
            className="bg-gray-50 text-gray-900 text-sm outline-none border-none rounded-full block w-full pl-10 p-2.5"
            placeholder="Search"
            required
          />
          <div
            ref={searchRef}
            className="absolute outline-none border-none rounded-lg shadow-xl block w-full max-w-lg mx-7 z-20"
          >
            <SearchResults
              search={searchVal}
              setSearch={setSearchVal}
              isSearching={isSearching}
              setIsSearching={setIsSearching}
            />
          </div>
        </div>
      </form>
      <div className="flex items-center gap-10">
        <div className="">
          <h1 className="text-3xl min-w-max relative">
            Hi, {getUserInfo && getUserInfo.companyName}
          </h1>
        </div>
        <div className="flex items-center gap-4 relative">
          <div
            className="cursor-pointer"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            onClick={handleNotificationClick}
          >
            {isHover ? (
              <svg
                width="18"
                height="23"
                viewBox="0 0 18 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 8C15 6.4087 14.3679 4.88258 13.2426 3.75736C12.1174 2.63214 10.5913 2 9 2C7.4087 2 5.88258 2.63214 4.75736 3.75736C3.63214 4.88258 3 6.4087 3 8C3 15 0 17 0 17H18C18 17 15 15 15 8Z"
                  fill="#454545"
                />
                <path
                  d="M10.73 21C10.5542 21.3031 10.3019 21.5547 9.99825 21.7295C9.69463 21.9044 9.3504 21.9965 9.00002 21.9965C8.64964 21.9965 8.30541 21.9044 8.00179 21.7295C7.69818 21.5547 7.44583 21.3031 7.27002 21"
                  fill="#454545"
                />
                <path
                  d="M10.73 21C10.5542 21.3031 10.3019 21.5547 9.99825 21.7295C9.69463 21.9044 9.3504 21.9965 9.00002 21.9965C8.64964 21.9965 8.30541 21.9044 8.00179 21.7295C7.69818 21.5547 7.44583 21.3031 7.27002 21"
                  stroke="#454545"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                {notificationFlag ? (
                  <circle cx="13.972" cy="3.97196" r="3.97196" fill="#BB4430" />
                ) : (
                  <></>
                )}
              </svg>
            ) : (
              <svg
                width="18"
                height="23"
                viewBox="0 0 18 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 8C15 6.4087 14.3679 4.88258 13.2426 3.75736C12.1174 2.63214 10.5913 2 9 2C7.4087 2 5.88258 2.63214 4.75736 3.75736C3.63214 4.88258 3 6.4087 3 8C3 15 0 17 0 17H18C18 17 15 15 15 8Z"
                  fill="#E3E3E3"
                />
                <path
                  d="M10.73 21C10.5542 21.3031 10.3019 21.5547 9.99825 21.7295C9.69463 21.9044 9.3504 21.9965 9.00002 21.9965C8.64964 21.9965 8.30541 21.9044 8.00179 21.7295C7.69818 21.5547 7.44583 21.3031 7.27002 21"
                  fill="#E3E3E3"
                />
                <path
                  d="M10.73 21C10.5542 21.3031 10.3019 21.5547 9.99825 21.7295C9.69463 21.9044 9.3504 21.9965 9.00002 21.9965C8.64964 21.9965 8.30541 21.9044 8.00179 21.7295C7.69818 21.5547 7.44583 21.3031 7.27002 21"
                  stroke="#E3E3E3"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                {notificationFlag ? (
                  <circle cx="13.972" cy="3.97196" r="3.97196" fill="#BB4430" />
                ) : (
                  <></>
                )}
              </svg>
            )}
            {isNotification ? (
              <div
                ref={notificationRef}
                className="absolute right-10 outline-none border-none rounded-lg shadow-xl block w-full max-w-lg mx-7 z-30"
              >
                <div
                  className="bg-[#f9fafa] px-2 rounded-lg h-60 overflow-y-auto"
                  id="style-1"
                >
                  <ul>
                    {notifications?.length ? (
                      notifications.map((item) =>
                        item?.title ? (
                          <li
                            key={item.id}
                            className="py-2 flex justify-between cursor-pointer"
                          >
                            {item.title}
                          </li>
                        ) : item?.amount ? (
                          <li
                            key={item.id}
                            className="py-2 flex justify-between cursor-pointer"
                          >
                            {`Transaction of $${item.amount} is successfully done`}
                          </li>
                        ) : item?.type ? (
                          <li
                            key={item.id}
                            className="py-2 flex justify-between cursor-pointer"
                          >
                            {`Your request for ${item.type} is successfully sent`}
                          </li>
                        ) : (
                          <></>
                        )
                      )
                    ) : (
                      <li>No Latest Notification available</li>
                    )}
                  </ul>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
          <div
            onClick={() => navigate("/profile")}
            className="cursor-pointer flex items-center gap-2"
          >
            <div className="">
              <img className="w-12 h-12" src={profileIcon} alt="" />
            </div>
            <div>
              <div className="text-sm font-semibold min-w-max">
                {getUserInfo && getUserInfo.companyAdminName}
              </div>
              <div className="text-sm min-w-max">Admin Account</div>
            </div>
          </div>
          <button
            type="submit"
            onClick={() => setIsRequest(true)}
            className="bg-gradient-to-b from-[#6DB935] to-[#4DAA09] text-white py-1 px-3 w-fit rounded-lg font-semibold text-base"
          >
            Raise Request
          </button>
        </div>
      </div>
      <SupportPopup
        visible={isRequest}
        onClose={onCloseSupportPopup}
        companyId={getUserInfo?.companyId}
      />
    </div>
  );
}

export default NavBar;

const SearchResults = ({ search, setSearch, isSearching, setIsSearching }) => {
  const echoEcoList = useSelector((state) => state.echoEco.allEchoEcos);
  const userInfo = useSelector((state) => state.auth.userInfo[0]);
  const navigate = useNavigate();

  const handleClick = (echo) => {
    setSearch(echo?.apiName?.toLowerCase());
    navigate({
      pathname: "/overallEchoEco/specificApi",
      search: createSearchParams({
        id: echo.id,
        companyId: userInfo?.companyId,
        apiName: echo.apiName,
        isActive: echo.isActive,
        goalAmount: echo.goalAmount,
        goalDays: echo.goalDays,
        apiCall: echo.apiCall,
        ecoType: echo.ecoType,
      }).toString(),
    });
    setIsSearching(false);
  };

  return (
    <>
      <div className="bg-[#f9fafa] px-2 rounded-lg">
        <ul>
          {isSearching &&
            echoEcoList.map(
              (echo, i) =>
                echo?.apiName?.toLowerCase().includes(search.toLowerCase()) && (
                  <li
                    key={i}
                    className="py-2 flex justify-between cursor-pointer"
                    onClick={() => handleClick(echo)}
                  >
                    {echo.apiName}
                    {/* <img src={bird} alt="" className="w-8 h-8" /> */}
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
                  </li>
                )
            )}
        </ul>
      </div>
    </>
  );
};
