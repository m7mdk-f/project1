"use client";
import React from "react";
import type { Plan } from "./types";

type Props = {
  plans: Plan[];
  billingCycle: "month" | "year";
  setBillingCycle: (val: "month" | "year") => void;
  selectedPlanId: string | null;
  setSelectedPlanId: (id: string) => void;
};

export default function Step5Plans({
  plans,
  billingCycle,
  setBillingCycle,
  selectedPlanId,
  setSelectedPlanId,
}: Props) {
  return (
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

      {/* Plans grid */}
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-1 w-full lg:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const price =
              billingCycle === "month" ? plan.monthlyPrice : plan.yearlyPrice;
            const priceLabel = billingCycle === "month" ? "/month" : "/year";
            const isSelected = selectedPlanId === plan.id;

            return (
              <div
                key={plan.id}
                onClick={() => setSelectedPlanId(plan.id)}
                className={`w-full  p-4 border rounded-lg text-center shadow-sm sm:p-8 cursor-pointer transition-transform hover:scale-105 ${isSelected
                  ? "border-indigo-600 bg-indigo-50"
                  : "border-gray-200 bg-white"
                  }`}
              >
                <h5 className="mb-4 text-xl font-medium text-gray-500">
                  {plan.name}
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
                    {plan.features.map((feature, idx) => {
                      const isUnavailable = feature.startsWith("~");
                      const cleanFeature = isUnavailable
                        ? feature.slice(1)
                        : feature;

                      return (
                        <li
                          key={idx}
                          className={`flex items-center ${isUnavailable ? "line-through decoration-gray-500" : ""
                            }`}
                        >
                          <svg
                            className={`shrink-0 w-4 h-4 ${isUnavailable ? "text-gray-400" : "text-blue-700"
                              }`}
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                          </svg>
                          <span className="text-base font-normal leading-tight text-gray-500 ms-3">
                            {cleanFeature}
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
  );
}
