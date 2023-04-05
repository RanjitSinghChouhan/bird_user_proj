import React, { useCallback, useEffect, useRef, useState } from "react";
import deleteIcon from "../../assets/delete.svg";
import share from "../../assets/share.svg";
import edit from "../../assets/Edit.svg";
import upArrow from "../../assets/upArrow.svg";
import downArrow from "../../assets/downArrow.svg";
import CreatePostPopup from "./ByrdsPagePopup/CreatePostPopup/CreatePostPopup";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePostByCompanyId,
  getPostsByCompanyId,
  getTotalTreeAlgae,
  sharePost,
} from "../../store/actions/byrdsPageAction";
import Loader from "../Loader/Loader";
import PostLinkPopup from "./ByrdsPagePopup/SharePost/PostLinkPopup";

export const treeNameCount = (count) => {
  let name = "";
  let number = 0;
  if (count === 0) {
    name = "";
    number = 0;
  } else if (count <= 200) {
    name = "Garden";
    if (count <= 50) {
      number = 1;
    } else if (count > 50 && count <= 100) {
      number = 2;
    } else if (count > 100 && count <= 150) {
      number = 3;
    } else number = 4;
  } else if (count > 200 && count <= 1000) {
    name = "Grove";
    if (count <= 400) {
      number = 1;
    } else if (count > 400 && count <= 600) {
      number = 2;
    } else if (count > 600 && count <= 800) {
      number = 3;
    } else number = 4;
  } else if (count > 1000 && count <= 5000) {
    name = "Medow";
    if (count <= 2000) {
      number = 1;
    } else if (count > 2000 && count <= 3000) {
      number = 2;
    } else if (count > 3000 && count <= 4000) {
      number = 3;
    } else number = 4;
  } else if (count > 5000 && count <= 25000) {
    name = "Boleward";
    if (count <= 10000) {
      number = 1;
    } else if (count > 10000 && count <= 15000) {
      number = 2;
    } else if (count > 15000 && count <= 20000) {
      number = 3;
    } else number = 4;
  } else if (count > 25000 && count <= 125000) {
    name = "Forest";
    if (count <= 50000) {
      number = 1;
    } else if (count > 50000 && count <= 75000) {
      number = 2;
    } else if (count > 75000 && count <= 100000) {
      number = 3;
    } else number = 4;
  } else if (count > 125000 && count <= 500000) {
    name = "Rain Forest";
    if (count <= 125000) {
      number = 1;
    } else if (count > 125000 && count <= 250000) {
      number = 2;
    } else if (count > 250000 && count <= 375000) {
      number = 3;
    } else number = 4;
  }
  return { name, number };
};

export const algaeNameCount = (count) => {
  let name = "";
  let number = 0;
  if (count === 0) {
    name = "";
    number = 0;
  } else if (count <= 200) {
    name = "Puddle";
    if (count <= 50) {
      number = 1;
    } else if (count > 50 && count <= 100) {
      number = 2;
    } else if (count > 100 && count <= 150) {
      number = 3;
    } else number = 4;
  } else if (count > 200 && count <= 1000) {
    name = "Pond";
    if (count <= 400) {
      number = 1;
    } else if (count > 400 && count <= 600) {
      number = 2;
    } else if (count > 600 && count <= 800) {
      number = 3;
    } else number = 4;
  } else if (count > 1000 && count <= 5000) {
    name = "Lake";
    if (count <= 2000) {
      number = 1;
    } else if (count > 2000 && count <= 3000) {
      number = 2;
    } else if (count > 3000 && count <= 4000) {
      number = 3;
    } else number = 4;
  } else if (count > 5000 && count <= 25000) {
    name = "River";
    if (count <= 10000) {
      number = 1;
    } else if (count > 10000 && count <= 15000) {
      number = 2;
    } else if (count > 15000 && count <= 20000) {
      number = 3;
    } else number = 4;
  } else if (count > 25000 && count <= 125000) {
    name = "Sea";
    if (count <= 50000) {
      number = 1;
    } else if (count > 50000 && count <= 75000) {
      number = 2;
    } else if (count > 75000 && count <= 100000) {
      number = 3;
    } else number = 4;
  } else if (count > 125000 && count <= 500000) {
    name = "Ocean";
    if (count <= 125000) {
      number = 1;
    } else if (count > 125000 && count <= 250000) {
      number = 2;
    } else if (count > 250000 && count <= 375000) {
      number = 3;
    } else number = 4;
  }
  return { name, number };
};

function ByrdsPage() {
  const [isHover, setIsHover] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isCreatePostPopup, setIsCreatePostPopup] = useState(false);
  const [isEditPostPopup, setIsEditPostPopup] = useState(false);
  const [postTextValue, setPostTextValue] = useState("");
  const [postImgValue, setPostImgValue] = useState("");
  const [postId, setPostId] = useState(null);
  const [isPostLinkPopup, setIsPostLinkPopup] = useState(false);
  const [treeCount, setTreeCount] = useState(0);
  const [algaeCount, setAlgaeCount] = useState(0);
  const isLoading = useRef(true);
  const createdPosts = useSelector((state) => state.byrdsPage.allPosts);
  const userInfo = useSelector((state) => state.auth.userInfo[0]);
  const dispatch = useDispatch();

  const handleMouseUp = (index) => {
    setCurrentIndex(index);
    setIsHover(true);
  };
  const handleMouseDown = (index) => {
    setCurrentIndex(index);
    setIsHover(false);
  };
  const onCloseCreatePostPopup = () => {
    setIsCreatePostPopup(false);
  };
  const onClosePostLinkPopup = () => {
    setIsPostLinkPopup(false);
  };
  const onCloseEditPopup = () => {
    setIsEditPostPopup(false);
  };

  const handleDeletePost = async (id) => {
    isLoading.current = true;
    await dispatch(
      deletePostByCompanyId({ id: id, companyId: userInfo?.companyId })
    ).then((response) => {
      getPosts();
      isLoading.current = false;
    });
  };

  const handleEditPost = (id, postImg, postText) => {
    setPostId(id);
    setPostTextValue(postText);
    setPostImgValue(postImg);
    setIsEditPostPopup(true);
  };

  const getPosts = useCallback(() => {
    isLoading.current = true;
    dispatch(getPostsByCompanyId({ companyId: userInfo?.companyId }));
    isLoading.current = false;
  }, [dispatch, userInfo?.companyId]);

  const getTreeAndAlgae = useCallback(() => {
    isLoading.current = true;
    dispatch(getTotalTreeAlgae({ companyId: userInfo?.companyId })).then(
      (response) => {
        setAlgaeCount(response.data.totalAlgae);
        setTreeCount(response.data.totalTree);
        isLoading.current = false;
      }
    );
  }, [dispatch, userInfo?.companyId]);

  const handleShare = (id) => {
    dispatch(
      sharePost({
        postId: id,
        companyIdPostBelongTo: userInfo?.companyId,
        companyIdPostShareBy: userInfo?.companyId,
      })
    ).then((response) => {
      setPostId(id);
      setIsPostLinkPopup(true);
    });
  };

  useEffect(() => {
    if (userInfo) {
      getTreeAndAlgae();
      getPosts();
    }
  }, [userInfo]);

  return (
    <div className="flex justify-between gap-10 px-6 py-4">
      {isLoading.current ? <Loader /> : ""}
      <div className="">
        <div className="w-full">
          <button
            className="w-fit bg-gradient-to-b from-[#6DB935] to-[#4DAA09] text-white py-2 px-6 font-medium rounded-lg"
            onClick={() => setIsCreatePostPopup(true)}
          >
            Create New Post +
          </button>
        </div>
        <div className="h-screen overflow-y-auto mt-4 pr-3 pb-4">
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
                      {isHover && currentIndex === index ? (
                        <>
                          <div className="bg-white absolute top-0 right-0 border rounded-tr-xl rounded-bl-xl py-2 flex">
                            <div
                              onClick={() => handleShare(item.id)}
                              className="mx-2 cursor-pointer"
                            >
                              <img src={share} alt="" />
                            </div>
                          </div>
                          <div className="bg-white absolute top-0 left-0 border rounded-tl-xl rounded-br-xl py-2 flex">
                            <div
                              onClick={() =>
                                handleEditPost(
                                  item.id,
                                  item.postImg,
                                  item.postText
                                )
                              }
                              className="mx-2 cursor-pointer"
                            >
                              <img src={edit} alt="" />
                            </div>
                            <div
                              onClick={() => handleDeletePost(item.id)}
                              className="mx-2 cursor-pointer"
                            >
                              <img src={deleteIcon} alt="" />
                            </div>
                          </div>
                        </>
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
                      {isHover && currentIndex === index ? (
                        <>
                          <div className="bg-white absolute top-0 right-0 border rounded-tr-xl rounded-bl-xl py-2 flex">
                            <div
                              onClick={() => handleShare(item.id)}
                              className="mx-2 cursor-pointer"
                            >
                              <img src={share} alt="" />
                            </div>
                          </div>
                          <div className="bg-white absolute top-0 left-0 border rounded-tl-xl rounded-br-xl py-2 flex">
                            <div
                              onClick={() =>
                                handleEditPost(
                                  item.id,
                                  item.postImg,
                                  item.postText
                                )
                              }
                              className="mx-2 cursor-pointer"
                            >
                              <img src={edit} alt="" />
                            </div>
                            <div
                              onClick={() => handleDeletePost(item.id)}
                              className="mx-2 cursor-pointer"
                            >
                              <img src={deleteIcon} alt="" />
                            </div>
                          </div>
                        </>
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
      </div>

      <div className="w-full max-w-[240px] flex-grow">
        <div className="shadow-lg rounded-xl min-h-[120px] w-full my-3 px-4 py-2">
          <div className="font-medium text-sm 2xl:text-base text-gray-500">
            Leader Board Position
          </div>
          <div className="font-bold text-xl mt-3">
            {userInfo && userInfo.companyRankStatus === 1 ? (
              <div className="flex font-semibold text-2xl text-[#22A447]">
                {userInfo && userInfo.updatedCompanyRank}
                <img src={upArrow} alt="" />
              </div>
            ) : userInfo && userInfo.companyRankStatus === 2 ? (
              <div className="flex font-semibold text-2xl text-[#BB4430]">
                {userInfo && userInfo.updatedCompanyRank}
                <img src={downArrow} alt="" />
              </div>
            ) : (
              <div className="flex text-center font-semibold text-2xl text-[#FFC145]">
                {userInfo && userInfo.updatedCompanyRank}
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
            {userInfo?.companyName} Spawned
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
            {userInfo?.companyName} Planted
          </div>
          <div className="GreenGradient font-bold text-xl mt-3">
            {treeNameCount(treeCount).number} {treeNameCount(treeCount).name}
          </div>
          <div className="GreenGradient font-semibold text-sm 2xl:text-base">
            Worth of trees till date
          </div>
        </div>
      </div>
      {isEditPostPopup ? (
        <CreatePostPopup
          visible={isEditPostPopup}
          onClose={onCloseEditPopup}
          heading="Edit"
          companyId={userInfo?.companyId}
          postImg={postImgValue}
          postText={postTextValue}
          postId={postId}
        />
      ) : (
        <CreatePostPopup
          visible={isCreatePostPopup}
          onClose={onCloseCreatePostPopup}
          heading="Create"
          companyId={userInfo?.companyId}
          postImg={""}
          postText={""}
          postId={""}
        />
      )}
      <PostLinkPopup
        visible={isPostLinkPopup}
        onClose={onClosePostLinkPopup}
        url={`https://byrds-frontend.azurewebsites.net/company/${userInfo?.companyName}/${postId}`}
      />
    </div>
  );
}

export default ByrdsPage;
