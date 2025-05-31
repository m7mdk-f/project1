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
  const [options, setOptions] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
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
      {loading ? <div className="flex justify-center items-center"> <LoadingCircle /></div> :
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
                options={options}
                value={options.filter((option) =>
                  categories?.includes(option.id.toString())
                )}
                onChange={(selected) =>
                  onCategoriesChange(
                    selected ? selected.map((opt) => opt.id.toString()) : []
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
      }
    </>
  );
}
