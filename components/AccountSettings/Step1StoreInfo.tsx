"use client";
import React from "react";
import { FormDataType } from "./types";

type Props = {
  formData: {
    storeName: string;
    storeDomain: string;
  };
  onclickButton: (value: string) => void;
  questionFormData: { entityType?: string };
  formErrors: Record<string, string>;
  onChange: (field: keyof FormDataType, value: string) => void;
  onEntityTypeChange: (value: string) => void;
};

export default function Step1StoreInfo({
  formData,
  questionFormData,

  formErrors,
  onChange,
  onclickButton,
  onEntityTypeChange,

}: Props) {
  return (
    <div>
      <h3 className="heading-secondary text-3xl">معلومات المتجر</h3>
      <p className="text-sm text-gray-700 mt-2 mb-7">
        أدخل اسم المتجر ومعلومات خاصة بمتجرك
      </p>

      <label className="block mb-2 font-semibold text-gray-700">
        اسم المتجر
      </label>
      <input
        type="text"
        value={formData.storeName}
        onChange={(e) => onChange("storeName", e.target.value)}
        onPaste={(e) => {
          e.preventDefault();
          const pasteData = e.clipboardData.getData("text");
          onChange("storeName", pasteData);
        }}
        className={`w-full p-2 border rounded ${formErrors.storeName ? "border-red-500" : "border-gray-300"
          }`}
        placeholder="أدخل اسم المتجر"
      />
      {formErrors.storeName ? (
        <p className="text-red-600 mt-1 text-sm">{formErrors.storeName}</p>
      ) : (
        <p className="text-gray-600 mt-1 text-xs">اختر اسماً مميزاً وجذاباً</p>
      )}

      {!formErrors.storeName && formData.storeName.trim().length >= 3 && (
        <>
          <label className="block mt-6 mb-2 font-semibold text-gray-700">
            رابط المتجر
          </label>
          <p className="text-gray-600 mb-2 text-xs">سيكون هو رابط المتجر الذي يمكن للعملاء الدخول عليه للطلب</p>

          <div className="flex items-center flex-wrap gap-1 rtl:space-x-reverse">
            <input
              type="text"
              value={formData.storeDomain}
              onChange={(e) => onChange("storeDomain", e.target.value)}
              className={`flex-grow text-left p-2 border rounded ${formErrors.storeDomain ? "border-red-500" : "border-gray-300"
                }`}
              placeholder="أدخل اسم النطاق (مثال: my-store)"
            />
            <span className="text-gray-600">/testing.com</span>
          </div>
          <div className="flex gap-2 flex-wrap  p-2 ">

            {formErrors.storeDomain && (
              <>
                <p className="text-red-600 mt-1">{formErrors.storeDomain}</p>
                <p className="text-gray-600 mt-1">يمكنك تعديل او اختيار:</p>
              </>
            )}
            <div className="flex gap-2 mt-0.5 ">
              <button id="butn" className="text-blue-900 hover:underline cursor-pointer"
                onClick={(e) => {
                  const target = e.target as HTMLButtonElement;
                  onclickButton(target.innerHTML);
                }}></button>
              <button id="butn" className="text-blue-900 hover:underline cursor-pointer"
                onClick={(e) => {
                  const target = e.target as HTMLButtonElement;
                  onclickButton(target.innerHTML);
                }}></button>
              <button id="butn" className="text-blue-900 hover:underline cursor-pointer"
                onClick={(e) => {
                  const target = e.target as HTMLButtonElement;
                  onclickButton(target.innerHTML);
                }}></button>
            </div>
          </div>
        </>
      )}

      <div className="mt-6">
        <label className="block mb-2 font-semibold text-gray-700">
          نوع الكيان
        </label>
        <div className="flex gap-2 flex-wrap">
          {["فرد", "مؤسسة", "شركة"].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => {

                onEntityTypeChange(type)
              }}
              className={`px-5 py-2 ml-5 rounded-lg font-medium transition ${questionFormData.entityType === type
                ? "bg-indigo-600 text-white shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-indigo-100"
                }`}
            >
              {type}
            </button>
          ))}

        </div>
        {
          formErrors.entityType &&
          <p className="text-red-600 mt-1">{formErrors.entityType}</p>
        }
      </div>
    </div>
  );
}
