import React from "react";
import { useState } from "react";
import { useRef } from "react";
import CreateEchoPics from "./CreateEchoPics/CreateEchoPics";

const createdEchoPicList = [];

function EchoPics() {
  const [isCreateEchoPicPopup, setIsCreateEchoPicPopup] = useState(false);
  const onCloseCreateEchoPicPopup = () => {
    setIsCreateEchoPicPopup(false);
  }
  const hasUpcommingDeliveries = useRef(false);
  return (
    <div className="p-6 flex flex-col gap-8">
      <div className="flex gap-6 w-full">
        <div className="p-4 2xl:p-6 shadow-xl rounded-2xl w-7/12 overflow-x-hidden">
          <div className="flex justify-between =">
            <div className="font-semibold text-xl text-[#404040]">
              Create Echo Pics
            </div>
            <div onClick={() => setIsCreateEchoPicPopup(true)} className="font-semibold text-[15px] GreenGradient cursor-pointer">
              Create New +
            </div>
          </div>
          <div className="mt-4 overflow-y-auto h-36 pl-6 pr-2" id="style-1">
            <table className="w-full relative">
              <thead className="border-b border-gray-100">
                <tr>
                  <th
                    scope="col"
                    className="text-sm font-normal text-[#AEAEAE] pl-0 pr-5 py-2 text-left"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-normal text-[#AEAEAE] px-5 py-2 text-left"
                  >
                    Type
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-normal text-[#AEAEAE] px-5 py-2 text-left"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-normal text-[#AEAEAE] px-5 py-2 text-left"
                  >
                    Next Delivery
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-normal text-[#AEAEAE] px-5 py-2 text-left"
                  ></th>
                </tr>
              </thead>
              {createdEchoPicList.length !== 0 ? (
                <tbody className="border-gray-100 relative">
                  {createdEchoPicList.map((item) => {
                    return (
                      <tr
                        key={item.id}
                        className="border-b last:border-none cursor-pointer border-gray-100"
                      >
                        <td className="pl-0 pr-5 py-2 whitespace-nowrap text-sm font-normal text-[#404040]">
                          {item.picName}
                        </td>
                        <td className="text-sm text-[#404040] font-normal px-5 py-2 whitespace-nowrap">
                          {item.picType}
                        </td>
                        {item.isActive === 1 ? (
                          <td className="text-sm GreenGradient font-normal pl-5 pr-0 py-2 whitespace-nowrap">
                            Active
                          </td>
                        ) : (
                          <td className="text-sm text-[#F9896B] font-normal pl-5 pr-0 py-2 whitespace-nowrap">
                            Deactive
                          </td>
                        )}
                        <td className="text-sm text-[#404040] font-bold px-5 py-2 whitespace-nowrap">
                          {item.nextDelivery}
                        </td>
                        <td className="text-xs GreenGradient font-bold text-center">
                          Learn More
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              ) : (
                <tbody className="absolute flex w-full justify-center mt-5 text-center">
                  <div>
                    <span className="">No Echo Pics created</span>
                    <div onClick={() => setIsCreateEchoPicPopup(true)} className="font-semibold text-[15px] GreenGradient cursor-pointer">
                      Create New +
                    </div>
                  </div>
                </tbody>
              )}
            </table>
          </div>
        </div>
        <div className="p-4 2xl:p-6 w-5/12 shadow-xl rounded-2xl">
          <div className="font-semibold text-[#404040] text-xl">
            Upcoming Deliveries
          </div>
          {hasUpcommingDeliveries.current ? <><div className="font-semibold text-[#000000] text-[22px] my-4">
            Date: <span className="GreenGradient">12/02/1223</span>
          </div>
          <div className="font-semibold text-[#000000] text-[22px]">
            Quantity: <span className="GreenGradient">5 Plants</span>
          </div>
          <div className="font-semibold text-[#000000] text-[22px] my-4">
            Address:{" "}
            <span className="GreenGradient">
              Varthur road, Whitefield, Bangalore
            </span>
          </div></> : <div className="flex justify-center text-center items-center mt-10">No Upcoming Delivery</div>} 
          
        </div>
      </div>

      <div className="p-4 2xl:p-6 w-full min-h-[440px] overflow-x-hidden rounded-2xl shadow-lg bg-white">
        <div className="flex justify-between mb-3 px-6">
          <div className="font-semibold text-xl text-[#404040]">
            Order History
          </div>
        </div>
        <div className="mt-4 overflow-y-auto pl-6 pr-2" id="style-1">
          <table className="w-full">
            <thead className="border-b border-gray-100">
              <tr>
                <th
                  scope="col"
                  className="text-sm font-normal text-[#AEAEAE] pl-0 pr-5 py-2 text-left"
                >
                  Sl No.
                </th>
                <th
                  scope="col"
                  className="text-sm font-normal text-[#AEAEAE] px-4 py-2 text-left"
                >
                  Echo Pics
                </th>
                <th
                  scope="col"
                  className="text-sm font-normal text-[#AEAEAE] px-5 py-2 text-left"
                >
                  Type
                </th>
                <th
                  scope="col"
                  className="text-sm font-normal text-[#AEAEAE] px-5 py-2 text-left"
                >
                  Quantity
                </th>
                <th
                  scope="col"
                  className="text-sm font-normal text-[#AEAEAE] px-4 py-2 text-left"
                >
                  Address
                </th>
              </tr>
            </thead>
            {createdEchoPicList.length !== 0  ? (
              <tbody className="border-gray-100 relative">
                {createdEchoPicList.map((item, index) => {
                  return (
                    <tr
                      key={item.id}
                      className="border-b last:border-none cursor-pointer border-gray-100"
                    >
                      <td className="pl-0 pr-5 py-2 whitespace-nowrap text-sm font-normal text-[#404040]">
                        {index + 1}
                      </td>
                      <td className="text-sm text-[#000000] font-normal px-4 py-2 whitespace-nowrap">
                        {item.picName || "to be updated"}
                      </td>
                      <td className="text-sm text-[#000000] font-normal px-5 py-2 whitespace-nowrap">
                        {item.picType}
                      </td>
                      <td className="text-sm GreenGradient font-normal px-5 py-2 whitespace-nowrap">
                        {item.quantity}
                      </td>
                      <td className="text-sm text-[#404040] font-bold  pl-4 pr-0 py-2 whitespace-nowrap">
                        {item.address}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            ) : (
              <tbody className="absolute flex justify-center mt-12 ml-96 text-center">
                <div>
                  <span className="">No Order Placed</span>
                </div>
              </tbody>
            )}
          </table>
        </div>
      </div>
      <CreateEchoPics
        visible={isCreateEchoPicPopup}
        onClose={onCloseCreateEchoPicPopup}
      />
    </div>
  );
}

export default EchoPics;
