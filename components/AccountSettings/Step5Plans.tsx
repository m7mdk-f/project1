"use client";
import React, { useEffect, useState } from "react";
import { Plan } from "../models/Models";
import LoadingCircle from "../LoadingCircle";
import { pakegeAll } from "../api/Market";

type Props = {
  billingCycle: "month" | "year";
  setBillingCycle: (val: "month" | "year") => void;
  selectedPlanId: number | null;
  setSelectedPlanId: (id: number) => void;
};

export default function Step5Plans({
  billingCycle,
  setBillingCycle,
  selectedPlanId,
  setSelectedPlanId,
}: Props) {
  const [plan, setPlan] = useState<Plan[]>([]);
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    console.log(selectedPlanId)
    pakegeAll().then(d => {
      console.log(d)
      setPlan(d)
    }).catch(e => {
      alert(e)
    })
      .finally(() => {
        setLoading(false)

      })

  }, [])
  return (
    <>
      {
        loading ? <div className="flex w-full h-full justify-center items-center"><LoadingCircle size={50} /></div> :
          <div
            className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md"
            dir="rtl"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">اختر باقتك</h2>

            {/* Toggle monthly/year */}
            <div className="flex justify-center mb-8">
              <span
                className={`px-4 py-2 cursor-pointer rounded-r-lg ${billingCycle === "month"
                  ? "bg-indigo-600 text-white "
                  : "bg-gray-200 text-gray-700 "
                  }`}
                onClick={() => setBillingCycle("month")}
              >
                شهري
              </span>
              <span
                className={`px-4 py-2 cursor-pointer rounded-l-lg ${billingCycle === "year"
                  ? "bg-indigo-600 text-white "
                  : "bg-gray-200 text-gray-700 "
                  }`}
                onClick={() => setBillingCycle("year")}
              >
                سنوي
              </span>
            </div>

            <div className="flex justify-center items-center">
              <div className="grid grid-cols-1 w-full lg:grid-cols-3 gap-6">
                {plan.map((planitem) => {
                  const price =
                    billingCycle === "month" ? planitem.priceMonthly : planitem.priceYearys;
                  const priceLabel = billingCycle === "month" ? "/month" : "/year";
                  const isSelected = selectedPlanId === planitem.id;

                  return (
                    <div
                      key={planitem.id}
                      onClick={() => setSelectedPlanId(planitem.id)}
                      className={`w-full  p-4 border rounded-lg text-center shadow-sm sm:p-8 cursor-pointer transition-transform hover:scale-105 ${isSelected
                        ? "border-indigo-600 bg-indigo-50"
                        : "border-gray-200 bg-white"
                        }`}
                    >
                      <h5 className="mb-4 text-xl font-medium text-gray-500">
                        {planitem.title}
                      </h5>
                      <div className="flex justify-center items-baseline text-gray-900">
                        <span className="text-3xl font-semibold">$</span>
                        <span className="text-5xl font-extrabold tracking-tight">
                          {price}
                        </span>
                        <span className="ms-1 text-xl font-normal text-gray-500">
                          {priceLabel}
                        </span>
                      </div>
                      <div className="flex justify-center items-center">
                        <ul role="list" className="space-y-5 my-7">
                          {planitem.advantages.map((feature, idx) => {


                            return (
                              <li
                                key={idx}
                                className={`flex items-center`}
                              >
                                <svg
                                  className={`shrink-0 w-4 h-4 text-blue-700 `}
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                </svg>
                                <span className="text-base font-normal leading-tight text-gray-500 ms-3">
                                  {feature.name}
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                      <button
                        type="button"
                        className={`text-white font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center focus:outline-none focus:ring-4 focus:ring-blue-200 ${isSelected
                          ? "bg-indigo-700 hover:bg-indigo-800"
                          : "bg-blue-700 hover:bg-blue-800"
                          }`}
                      >
                        {isSelected ? "محدد" : "اختر هذه الباقة"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
      }
    </>
  );
}
