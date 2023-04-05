import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import milestonePot from "../../../../../assets/milestonePot.svg";
import { getKeyMilestoneByCompanyId } from "../../../../../store/actions/echoEcoAction";
import Loader from "../../../../Loader/Loader";


function KeyMilestoneNonLogin({ companyId }) {
  const [milestones, setMilestones] = useState([]);
  const isLoading = useRef(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (companyId) {
      isLoading.current = true;
      dispatch(getKeyMilestoneByCompanyId(companyId)).then((response) => {
        setMilestones(response.data.keyMilestone);
        isLoading.current = false;
      });
    }
  }, [dispatch, companyId]);
  return (
    <div className="text-center">
      {isLoading.current ? <Loader/> : ""}
      <div className="font-semibold text-lg GreenGradient mb-8">
        Key Milestones
      </div>
      <div className="flex justify-center">
        <div className="">
          <div>
            {milestones[0] && milestones[0].echoEcoCreatedAt ? (
              <div className="my-12 font-medium text-[9px] GreenGradient lg:max-xl:text-[8px]">
                <div className="">{milestones[0].echoEcoCreatedAt}</div>
                <div className="">First Echo eco created</div>
              </div>
            ) : (
              <div className="my-10 font-medium text-[9px] GreenGradient lg:max-xl:text-[7px]">
                <div className="">date yet to unlock</div>
                <div className="">Milestone yet to be reached</div>
              </div>
            )}
          </div>
          {milestones[0] && milestones[0].algaeCreatedAt ? (
            <div className="my-10 2xl:my-20 font-medium text-[9px] GreenGradient lg:max-xl:text-[8px]">
              <div className="">{milestones[0].algaeCreatedAt}</div>
              <div className="">First Algae Spawned</div>
            </div>
          ) : (
            <div className="my-10 2xl:my-16 font-medium text-[9px] GreenGradient lg:max-xl:text-[7px]">
              <div className="">date yet to unlock</div>
              <div className="">Milestone yet to be reached</div>
            </div>
          )}
        </div>
        <div>
          <img src={milestonePot} alt="" />
        </div>
        <div className="">
          {milestones[0] && milestones[0].companyCreatedAt ? (
            <div className="my-2 font-medium text-[9px] GreenGradient lg:max-xl:text-[7px]">
              <div className="">{milestones[0].companyCreatedAt}</div>
              <div className="">Registered with byrds</div>
            </div>
          ) : (
            <div className="my-2 font-medium text-[9px] GreenGradient lg:max-xl:text-[7px]">
              <div className="">date yet to unlock</div>
              <div className="">Milestone yet to be reached</div>
            </div>
          )}
          {milestones[0] && milestones[0].treeCreatedAt ? (
            <div className="my-16 2xl:my-20 xl:my-16 font-medium text-[9px] GreenGradient lg:max-xl:text-[7.5px]">
              <div className="">{milestones[0].treeCreatedAt}</div>
              <div className="">First Tree Planted</div>
            </div>
          ) : (
            <div className="my-14 2xl:my-16 xl:my-10 font-medium text-[9px] GreenGradient lg:max-xl:text-[7px]">
              <div className="">date yet to unlock</div>
              <div className="">Milestone yet to be reached</div>
            </div>
          )}
          {milestones[0] && milestones[0].fiftyTreeCreatedAt ? (
            <div className="my-8 xl:my-4 font-medium text-[9px] GreenGradient lg:max-xl:text-[7px]">
              <div className="">{milestones[0].fiftyTreeCreatedAt}</div>
              <div className="">First 50 Trees Planted</div>
            </div>
          ) : (
            <div className="my-8 xl:my-4 font-medium text-[9px] GreenGradient lg:max-xl:text-[7px]">
              <div className="">date yet to unlock</div>
              <div className="">Milestone yet to be reached</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default KeyMilestoneNonLogin;
