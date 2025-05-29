import BusinessExperienceForm from "@/components/Steps/BusinessExperienceForm";
import StepsComp from "@/components/Steps/StepsComp";
import React from "react";
import { FaCheck, FaUser, FaClipboardCheck } from "react-icons/fa";

function page() {
  return (
    <div className="flex justify-center bg-gray-100 items-center w-screen h-screen ">
      <div className="w-full">
        <div className="w-full flex justify-center ">
          <ol className="flex  items-center w-3/4 py-7 shadow bg-white px-5">
            <StepsComp
              icon={<FaCheck className="w-4 h-4 " />}
              status="done"
              Title="انشاء حساب"
            />
            <StepsComp
              icon={<FaUser className="w-4 h-4 " />}
              status="current"
              number={2}
              Title="انشاء حساب"
            />
            <StepsComp
              icon={<FaClipboardCheck className="w-4 h-4 " />}
              status="pending"
              last
              number={3}
              Title="انشاء حساب"
            />
          </ol>
        </div>
        <div className="w-full flex justify-center items-center">
          <BusinessExperienceForm />
        </div>
      </div>
    </div>
  );
}

export default page;
