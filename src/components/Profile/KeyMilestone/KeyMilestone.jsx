import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import milestonePot from "../../../assets/milestonePot.svg";
import tallTree from '../../../assets/tallTree.svg'
import { getKeyMilestoneByCompanyId } from "../../../store/actions/echoEcoAction";

function KeyMilestone({ companyId }) {
  const [milestones, setMilestones] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if(companyId){
      dispatch(getKeyMilestoneByCompanyId(companyId)).then((response) => {
        setMilestones(response.data.keyMilestone);
      });
    }
  }, [dispatch, companyId]);

  return (
    <div className="h-full">
      <div className="font-bold text-xl GreenGradient text-center">
        Key Milestones
      </div>
      <div className="relative flex justify-center">
        <div className="flex flex-col gap-[9.25rem] pt-40 text-right min-w-[100px]">
          <div className="">
            {milestones[0] && milestones[0].echoEcoCreatedAt ? (
              <div className="">
                <div className="font-medium text-[10px] GreenGradient">
                  {milestones[0].echoEcoCreatedAt}
                </div>
                <div className="font-medium text-[10px] GreenGradient">
                  First Echo eco created
                </div>
              </div>
            ) : (
              <div className="">
                <div className="font-medium text-[10px] GreenGradient">
                  date yet to unlock
                </div>
                <div className="font-medium text-[10px] GreenGradient">
                  Milestone yet to be reached
                </div>
              </div>
            )}
          </div>
          {milestones[0] && milestones[0].algaeCreatedAt ? (
            <div className="">
              <div className="font-medium text-[10px] GreenGradient">
                {milestones[0].algaeCreatedAt}
              </div>
              <div className="font-medium text-[10px] GreenGradient">
                First Algae Spawned
              </div>
            </div>
          ) : (
            <div className="">
              <div className="font-medium text-[10px] GreenGradient">
                date yet to unlock
              </div>
              <div className="font-medium text-[10px] GreenGradient">
                Milestone yet to be reached
              </div>
            </div>
          )}
        </div>
        <div className="h-[40rem] w-full flex justify-center">
          <img src={tallTree} alt="" className="h-full min-h-[40rem]" />
        </div>
        <div className=" flex flex-col gap-[9rem] pt-[4.5rem] text-left min-w-[100px]">
          {milestones[0] && milestones[0].companyCreatedAt ? (
            <div className="">
              <div className="font-medium text-[10px] GreenGradient">
                {milestones[0].companyCreatedAt}
              </div>
              <div className="font-medium text-[10px] GreenGradient">
                Registered with byrds
              </div>
            </div>
          ) : (
            <div className="">
              <div className="font-medium text-[10px] GreenGradient">
                date yet to unlock
              </div>
              <div className="font-medium text-[10px] GreenGradient">
                Milestone yet to be reached
              </div>
            </div>
          )}
          {milestones[0] && milestones[0].treeCreatedAt ? (
            <div className="">
              <div className="font-medium text-[10px] GreenGradient">
                {milestones[0].treeCreatedAt}
              </div>
              <div className="font-medium text-[10px] GreenGradient">
                First Tree Planted
              </div>
            </div>
          ) : (
            <div className="">
              <div className="font-medium text-[10px] GreenGradient">
                date yet to unlock
              </div>
              <div className="font-medium text-[10px] GreenGradient">
                Milestone yet to be reached
              </div>
            </div>
          )}
          {milestones[0] && milestones[0].fiftyTreeCreatedAt ? (
            <div className="">
              <div className="font-medium text-[10px] GreenGradient">
                {milestones[0].fiftyTreeCreatedAt}
              </div>
              <div className="font-medium text-[10px] GreenGradient">
                First 50 Trees Planted
              </div>
            </div>
          ) : (
            <div className="">
              <div className="font-medium text-[10px] GreenGradient">
                date yet to unlock
              </div>
              <div className="font-medium text-[10px] GreenGradient">
                Milestone yet to be reached
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
  // return (
  //   <div className="text-center h-full">
  //     <div className="font-semibold text-lg GreenGradient mb-8">
  //       Key Milestones
  //     </div>
  //     <div className="relative">
  //       <div className="absolute top-28 left-0 h-full flex flex-col gap-[10.5rem]">
  //         <div className="">
  //           {milestones[0] && milestones[0].echoEcoCreatedAt ? (
  //             <div className="">
  //               <div className="font-medium text-[10px] GreenGradient">
  //                 {milestones[0].echoEcoCreatedAt}
  //               </div>
  //               <div className="font-medium text-[10px] GreenGradient">
  //                 First Echo eco created
  //               </div>
  //             </div>
  //           ) : (
  //             <div className="">
  //               <div className="font-medium text-[10px] GreenGradient">
  //                 date yet to unlock
  //               </div>
  //               <div className="font-medium text-[10px] GreenGradient">
  //                 Milestone yet to be reached
  //               </div>
  //             </div>
  //           )}
  //         </div>
  //         {milestones[0] && milestones[0].algaeCreatedAt ? (
  //           <div className="">
  //             <div className="font-medium text-[10px] GreenGradient">
  //               {milestones[0].algaeCreatedAt}
  //             </div>
  //             <div className="font-medium text-[10px] GreenGradient">
  //               First Algae Spawned
  //             </div>
  //           </div>
  //         ) : (
  //           <div className="">
  //             <div className="font-medium text-[10px] GreenGradient">
  //               date yet to unlock
  //             </div>
  //             <div className="font-medium text-[10px] GreenGradient">
  //               Milestone yet to be reached
  //             </div>
  //           </div>
  //         )}
  //       </div>
  //       <div className="h-[38rem] w-full flex justify-center">
  //         <img src={tallTree} alt="" className="h-full" />
  //       </div>
  //       <div className="absolute top-6 right-0 h-full flex flex-col gap-[10.5rem]">
  //         {milestones[0] && milestones[0].companyCreatedAt ? (
  //           <div className="">
  //             <div className="font-medium text-[10px] GreenGradient">
  //               {milestones[0].companyCreatedAt}
  //             </div>
  //             <div className="font-medium text-[10px] GreenGradient">
  //               Registered with byrds
  //             </div>
  //           </div>
  //         ) : (
  //           <div className="">
  //             <div className="font-medium text-[10px] GreenGradient">
  //               date yet to unlock
  //             </div>
  //             <div className="font-medium text-[10px] GreenGradient">
  //               Milestone yet to be reached
  //             </div>
  //           </div>
  //         )}
  //         {milestones[0] && milestones[0].treeCreatedAt ? (
  //           <div className="">
  //             <div className="font-medium text-[10px] GreenGradient">
  //               {milestones[0].treeCreatedAt}
  //             </div>
  //             <div className="font-medium text-[10px] GreenGradient">
  //               First Tree Planted
  //             </div>
  //           </div>
  //         ) : (
  //           <div className="">
  //             <div className="font-medium text-[10px] GreenGradient">
  //               date yet to unlock
  //             </div>
  //             <div className="font-medium text-[10px] GreenGradient">
  //               Milestone yet to be reached
  //             </div>
  //           </div>
  //         )}
  //         {milestones[0] && milestones[0].fiftyTreeCreatedAt ? (
  //           <div className="">
  //             <div className="font-medium text-[10px] GreenGradient">
  //               {milestones[0].fiftyTreeCreatedAt}
  //             </div>
  //             <div className="font-medium text-[10px] GreenGradient">
  //               First 50 Trees Planted
  //             </div>
  //           </div>
  //         ) : (
  //           <div className="">
  //             <div className="font-medium text-[10px] GreenGradient">
  //               date yet to unlock
  //             </div>
  //             <div className="font-medium text-[10px] GreenGradient">
  //               Milestone yet to be reached
  //             </div>
  //           </div>
  //         )}
  //       </div>
  //     </div>
  //   </div>
  // );
}

export default KeyMilestone;
