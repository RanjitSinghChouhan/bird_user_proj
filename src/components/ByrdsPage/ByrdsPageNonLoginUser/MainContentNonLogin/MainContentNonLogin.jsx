import React, { useCallback, useEffect, useRef, useState } from "react";
import share from "../../../../assets/share.svg";
import upArrow from "../../../../assets/upArrow.svg";
import downArrow from "../../../../assets/downArrow.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  getPostsByCompanyId,
  getTotalTreeAlgae,
  sharePost,
} from "../../../../store/actions/byrdsPageAction";
import Loader from "../../../Loader/Loader";
import { algaeNameCount, treeNameCount } from "../../ByrdsPage";
import PostLinkPopup from "../../ByrdsPagePopup/SharePost/PostLinkPopup";

function MainContentNonLogin({
  companyRank,
  companyRankStatus,
  companyId,
  companyName,
}) {
  const [isHover, setIsHover] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [treeCount, setTreeCount] = useState(0);
  const [algaeCount, setAlgaeCount] = useState(0);
  const [isPostLinkPopup, setIsPostLinkPopup] = useState(false);
  const [postId, setPostId] = useState(null);
  const isLoading = useRef(true);
  const dispatch = useDispatch();
  const createdPosts = useSelector((state) => state.byrdsPage.allPosts);
  const userInfo = useSelector((state) => state.auth.userInfo[0]);

  const handleMouseUp = (index) => {
    setCurrentIndex(index);
    setIsHover(true);
  };
  const handleMouseDown = (index) => {
    setCurrentIndex(index);
    setIsHover(false);
  };

  const onClosePostLinkPopup = () => {
    setIsPostLinkPopup(false);
  };

  const getPosts = useCallback(() => {
    isLoading.current = true;
    dispatch(getPostsByCompanyId({ companyId: companyId }));
    isLoading.current = false;
  }, [dispatch, companyId]);

  const getTreeAndAlgae = useCallback(() => {
    isLoading.current = true;
    dispatch(getTotalTreeAlgae({ companyId: companyId })).then((response) => {
      setAlgaeCount(response.data.totalAlgae);
      setTreeCount(response.data.totalTree);
      isLoading.current = false;
    });
  }, [dispatch, companyId]);

  const handleShare = (id) => {
    dispatch(
      sharePost({
        postId: id,
        companyIdPostBelongTo: companyId,
        companyIdPostShareBy: userInfo?.companyId,
      })
    ).then((response) => {
      setPostId(id);
      setIsPostLinkPopup(true);
    });
  };

  useEffect(() => {
    if (companyId) {
      getTreeAndAlgae();
      getPosts();
    }
  }, [companyId]);

  return (
    <div className="flex justify-between p-6">
      {isLoading.current ? <Loader /> : ""}
      <div className="max-w-[75%] mr-5 h-screen overflow-y-auto mt-4 pr-3 pb-4">
        {createdPosts?.length ? (
          <div className="grid grid-cols-2 2xl:grid-cols-3 gap-x-8 2xl:gap-x-6 gap-y-6 w-full mt-4">
            {createdPosts?.map((item, index) => {
              return !item.deletedAt ? (
                item.postImg ? (
                  <div
                    key={index}
                    onMouseEnter={() => handleMouseUp(index)}
                    onMouseLeave={() => handleMouseDown(index)}
                    className="p-4 shadow-lg rounded-lg h-96 text-[#979797] relative max-w-xs"
                  >
                    <img src={item.postImg} className="w-full" alt="" />
                    <p className="mt-2">{item.postText}</p>
                    {userInfo && isHover && currentIndex === index ? (
                      <div className="bg-white absolute top-0 right-0 border rounded-tr-xl rounded-bl-xl py-2 flex">
                        <div
                          onClick={() => handleShare(item.id)}
                          className="mx-2 cursor-pointer"
                        >
                          <img src={share} alt="" />
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                ) : (
                  <div
                    key={index}
                    onMouseEnter={() => handleMouseUp(index)}
                    onMouseLeave={() => handleMouseDown(index)}
                    className={`p-4 shadow-lg rounded-lg h-96 flex items-center justify-center text-center font-bold relative ${
                      item.postText.length <= 20
                        ? "text-[40px]"
                        : item.postText.length > 20 &&
                          item.postText.length <= 50
                        ? "text-[30px]"
                        : item.postText.length > 50
                        ? "text-2xl"
                        : ""
                    }`}
                  >
                    <p className="GreenGradient">{item.postText}</p>
                    {userInfo && isHover && currentIndex === index ? (
                      <div className="bg-white absolute top-0 right-0 border rounded-tr-xl rounded-bl-xl py-2 flex">
                        <div
                          onClick={() => handleShare(item.id)}
                          className="mx-2 cursor-pointer"
                        >
                          <img src={share} alt="" />
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                )
              ) : (
                ""
              );
            })}
          </div>
        ) : (
          <div className="lg:w-[600px] xl:w-[750px] 2xl:w-[950px] lg:h-[300px] xl:h-[400px] 2xl:h-[500px] h-1/3 mt-11 text-center flex items-center justify-center shadow-lg rounded-xl">
            <span className="">No Post Created Yet</span>{" "}
          </div>
        )}
      </div>
      <div className="max-w-[25%]">
        <div className="shadow-lg rounded-xl min-h-[120px] w-full my-3 px-4 py-2">
          <div className="font-medium text-sm text-gray-500">
            Leader Board Position
          </div>
          <div className="font-bold text-xl mt-3">
            {companyRankStatus === 1 ? (
              <div className="flex font-semibold text-2xl text-[#22A447]">
                {companyRank}
                <img src={upArrow} alt="" />
              </div>
            ) : companyRankStatus === 2 ? (
              <div className="flex font-semibold text-2xl text-[#BB4430]">
                {companyRank}
                <img src={downArrow} alt="" />
              </div>
            ) : (
              <div className="flex text-center font-semibold text-2xl text-[#FFC145]">
                {companyRank}
                <div className="ml-1 w-4">
                  <svg
                    width="18"
                    height="4"
                    viewBox="0 0 5 2"
                    fill="none"
                    className="mt-4"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      x1="0.999878"
                      y1="0.999878"
                      x2="16.9999"
                      y2="0.999878"
                      stroke="#FFC145"
                      stroke-linecap="round"
                    />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="shadow-lg rounded-xl min-h-[120px] w-full my-3 px-4 py-2">
          <div className="font-medium text-sm 2xl:text-base text-gray-500">
            Number of trees planted
          </div>
          <div className="GreenGradient font-bold text-xl mt-3">
            {treeCount}
          </div>
        </div>
        <div className="shadow-lg rounded-xl min-h-[120px] w-full my-3 px-4 py-2">
          <div className="font-medium text-sm 2xl:text-base text-gray-500">
            Algae Farms Spawned
          </div>
          <div className="GreenGradient font-bold text-xl mt-3">
            {algaeCount}
          </div>
        </div>
        <div className="shadow-lg rounded-xl min-h-[120px] w-full my-3 px-4 py-2">
          <div className="font-medium text-sm 2xl:text-base text-gray-500">
            {companyName} Spawned
          </div>
          <div className="GreenGradient font-bold text-xl mt-3">
            {algaeNameCount(algaeCount).number}{" "}
            {algaeNameCount(algaeCount).name}
          </div>
          <div className="GreenGradient font-semibold text-sm 2xl:text-base">
            Worth of Alage till date
          </div>
        </div>
        <div className="shadow-lg rounded-xl min-h-[120px] w-full my-3 px-4 py-2">
          <div className="font-medium text-sm 2xl:text-base text-gray-500">
            {companyName} Planted
          </div>
          <div className="GreenGradient font-bold text-xl mt-3">
            {treeNameCount(treeCount).number} {treeNameCount(treeCount).name}
          </div>
          <div className="GreenGradient font-semibold text-sm 2xl:text-base">
            Worth of trees till date
          </div>
        </div>
      </div>
      <PostLinkPopup
        visible={isPostLinkPopup}
        onClose={onClosePostLinkPopup}
        url={`https://byrds-frontend.azurewebsites.net/company/${companyName}/${postId}`}
      />
    </div>
  );
}

export default MainContentNonLogin;
