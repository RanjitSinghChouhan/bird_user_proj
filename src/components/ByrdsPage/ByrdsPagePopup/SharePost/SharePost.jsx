import React, { useEffect, useState } from "react";
import uploadImg from "../../../../assets/uploadImg.svg";
import cancel from "../../../../assets/squareCancel.svg";
import sprout from "../../../../assets/sprout.svg";
import share from "../../../../assets/share.svg";
import { useDispatch } from "react-redux";
import { getPostById } from "../../../../store/actions/byrdsPageAction";
import { useParams } from "react-router";
import Loader from "../../../Loader/Loader";
import PostLinkPopup from "./PostLinkPopup";

function SharePost({ closePopup }) {
  const [postInfo, setPostInfo] = useState([])
  const [isLoading, setIsloading] = useState(false);
  const [isPostLinkPopup, setIsPostLinkPopup] = useState(false);
  const {postId} = useParams();
  const dispatch = useDispatch();

  const onClosePostLinkPopup = () => {
    setIsPostLinkPopup(false);
  };

  useEffect(() => {
    setIsloading(true);
    dispatch(getPostById({postId: postId})).then(response => {
      console.log(response, "resp");
      setPostInfo(response.data.sharePost[0]);
      setIsloading(false);
    })
  }, [dispatch, postId])
  return (
    <>
    {isLoading ? <Loader/> : <></>}
      <div className="fixed inset-0 w-full min-h-screen overflow-hidden bg-black bg-opacity-40 grid place-items-center">
        <div
          onClick={closePopup}
          className="fixed inset-0 w-full full cursor-pointer"
        ></div>
        <div className="bg-white rounded-2xl shadow-2xl p-4 relative w-full max-w-2xl">
          <div
            onClick={() => window.location.pathname = "/"}
            className="absolute top-2 right-2 cursor-pointer"
          >
            <img className="w-7 h-7" src={cancel} alt="" />
          </div>
          <div className="flex gap-3 w-2/4">
            <div className="w-4/6 shadow-xl rounded-2xl mx-auto">
              <div className="px-3 py-4 text-center">
                {postInfo?.companyIcon ? (
                  <img className="mx-auto py-3" src={postInfo?.companyIcon} alt="" />
                ) : (
                  <>
                    <img className="mx-auto py-3" src={uploadImg} alt="" />
                    {/* <div className="font-semibold text-xs text-[#000000]">
                      Company logo to be updated
                    </div> */}
                  </>
                )}
              </div>
            </div>
            <div className="w-full">
              <div className="text-[25px] font-semibold text-[#000000] ">
                {postInfo?.companyName}
              </div>
              <div className="font-medium flex text-lg GreenGradient">
                <img src={sprout} alt="" />
                <div className="ml-[5px] flex">Sprouts {postInfo?.updatedByrdsPoints}</div>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center">
            {postInfo?.postImg ? (
              <div className="p-4 max-w-xs text-center">
                <img src={postInfo?.postImg} className="w-full mb-6 h-64 shadow-lg rounded-lg" alt="" />
                <p className="mt-2 font-medium text-xl text-[#000000]">
                  {postInfo?.postText}
                </p>
              </div>
            ) : (
              <div
                className={`p-4 my-8 flex items-center justify-center text-center font-bold relative ${
                  postInfo?.postText?.length <= 20
                    ? "text-[40px]"
                    : postInfo?.postText?.length > 20 &&
                      postInfo?.postText?.length <= 50
                    ? "text-[30px]"
                    : postInfo?.postText?.length > 50
                    ? "text-2xl"
                    : ""
                }`}
              >
                <p className="GreenGradient my-28">{postInfo?.postText}</p>
              </div>
            )}
          </div>
          <div className="flex gap-2 justify-end font-medium text-[15px] text-[#000000]">
            Share this post <div onClick={() => setIsPostLinkPopup(true)} className="cursor-pointer"><img src={share} alt="" /></div>
          </div>
        </div>
      </div>
      <PostLinkPopup
        visible={isPostLinkPopup}
        onClose={onClosePostLinkPopup}
        url={`https://byrds-frontend.azurewebsites.net/company/${postInfo?.companyName}/${postId}`}
      />
    </>
  );
}

export default SharePost;
