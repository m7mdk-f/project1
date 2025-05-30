"use client";
import React from "react";
import Select from "react-select";
import ImageDropzone from "./ImageDropzone";

const categoryOptions = [
  { value: "electronics", label: "إلكترونيات" },
  { value: "fashion", label: "موضة" },
  { value: "food", label: "أغذية" },
  { value: "home", label: "منزل" },
  { value: "beauty", label: "تجميل" },
];

type Props = {
  categories?: string[];
  storeImage?: File | null;
  storeDescription?: string;
  onCategoriesChange: (values: string[]) => void;
  onImageChange: (file: File | null) => void;
  onDescriptionChange: (value: string) => void;
};

export default function Step2StoreIdentity({
  categories,
  storeImage,
  storeDescription,
  onCategoriesChange,
  onImageChange,
  onDescriptionChange,
}: Props) {
  return (
    <div>
      <h3 className="heading-secondary text-3xl">صف نشاط متجرك لعملائك</h3>
      <p className="text-sm text-gray-700 mt-2 mb-7">
        سيظهر الشعار والتعريف المكتوب أدناه في متجرك الإلكتروني لعملائك ويمكنك
        التعديل عليهما لاحقاً
      </p>

      <div className="space-y-6">
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            ما فئة تجارتكم
          </label>
          <Select
            isMulti
            options={categoryOptions}
            value={categoryOptions.filter((option) =>
              categories?.includes(option.value)
            )}
            onChange={(selected) =>
              onCategoriesChange(
                selected ? selected.map((opt) => opt.value) : []
              )
            }
            placeholder="اختر أو اكتب فئات التجارة"
            className="text-right"
            classNamePrefix="select"
            noOptionsMessage={() => "لا توجد خيارات"}
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            صورة الشعار (اختياري)
          </label>
          <ImageDropzone image={storeImage} setImage={onImageChange} />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            وصف المتجر (اختياري)
          </label>
          <textarea
            value={storeDescription || ""}
            onChange={(e) => onDescriptionChange(e.target.value)}
            placeholder="اكتب وصفاً مختصراً لمتجرك"
            className="w-full p-2 border rounded resize-y min-h-[100px]"
          />
        </div>
      </div>
    </div>
  );
}
