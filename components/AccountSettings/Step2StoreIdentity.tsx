"use client";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import ImageDropzone from "./ImageDropzone";
import LoadingCircle from "../LoadingCircle";
import { parentCategoriesAll } from "../api/Market";
import { ICategory } from "../models/Models";



type Props = {
  categories?: string[];
  storeImage?: File | null;
  formErrors: Record<string, string>;
  storeDescription?: string;
  formErrors: Record<string, string>;
  onCategoriesChange: (values: string[]) => void;
  onImageChange: (file: File | null) => void;
  onDescriptionChange: (value: string) => void;
};

export default function Step2StoreIdentity({
  categories,
  storeImage,
  storeDescription,
  formErrors,
  onCategoriesChange,
  onImageChange,
  onDescriptionChange,
}: Props) {
  const [options, setOptions] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const formattedOptions = options.map(opt => ({
    value: opt.id.toString(),
    label: opt.title
  }));
  useEffect(() => {
    setLoading(true);
    parentCategoriesAll().then((d) => {
      console.log(d)
      setOptions(d)
    }).catch((e) => {
      alert(e)
    })
      .finally(() => {
        setLoading(false);
      })
  }, [])
  return (
    <>
      {loading ? (
        <div className="flex w-full h-full justify-center items-center">
          {" "}
          <LoadingCircle />
        </div>
      ) : (
        <div>
          <h3 className="heading-secondary text-3xl">صف نشاط متجرك لعملائك</h3>
          <p className="text-sm text-gray-700 mt-2 mb-7">
            سيظهر الشعار والتعريف المكتوب أدناه في متجرك الإلكتروني لعملائك
            ويمكنك التعديل عليهما لاحقاً
          </p>

          <div className="space-y-6">
            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                ما فئة تجارتكم (اختياري)
              </label>
              <Select
                isMulti
                options={formattedOptions}
                value={formattedOptions.filter((option) =>
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
              {formErrors.categories && (
                <p className="text-red-600 mt-1">{formErrors.categories}</p>
              )}
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                صورة الشعار (اختياري)
              </label>
              <ImageDropzone image={storeImage} setImage={onImageChange} />
              {formErrors.storeImage && (
                <p className="text-red-600 mt-1">{formErrors.storeImage}</p>
              )}
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
              {formErrors.storeDescription && (
                <p className="text-red-600 mt-1">
                  {formErrors.storeDescription}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
