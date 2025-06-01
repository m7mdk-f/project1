"use client";
import React, { useEffect, useRef, useState } from "react";
import Step1StoreInfo from "@/components/AccountSettings/Step1StoreInfo";
import Step2StoreIdentity from "@/components/AccountSettings/Step2StoreIdentity";
import dynamic from "next/dynamic";

const Step3Location = dynamic(
  () => import("@/components/AccountSettings/Step3Location"),
  { ssr: false }
);
import Step5Plans from "@/components/AccountSettings/Step5Plans";
import "leaflet/dist/leaflet.css";
import {
  QustionFormData,
  Step,
  FormDataType,
} from "@/components/AccountSettings/types";
import { LatLngExpression } from "leaflet";
import { transliterateArabicToEnglish } from "@/components/api/functionReplacyAtoE";
import { CheckDomain, CreateMarket } from "@/components/api/Market";
import { useRouter } from "next/navigation";
import LoadingCircle from "@/components/LoadingCircle";
import axios from "axios";

const steps: Step[] = [
  { number: 1, label: "معلومات المتجر" },
  { number: 2, label: "هوية المتجر" },
  { number: 3, label: "موقع استلام الشحنات" },
  { number: 4, label: "شركات الشحن" },
  { number: 5, label: "الدفع الالكتروني" },
  { number: 6, label: "توثيق المتجر" },
];

const AccountSettings: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlanId, setSelectedPlanId] = useState<number>(0);

  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [formData, setFormData] = useState<FormDataType>({
    storeName: "",
    storeDomain: "",
    entityType: "",
    brandIdentity: "",
    shipmentLocation: "",
    shippingCompanies: "",
    paymentMethods: "",
    basketPackage: "",
    launchDate: "",
    categories: [],
    storeImage: null,
    storeDescription: "",
  });

  const [questionFormData, setQuestionFormData] = useState<QustionFormData>({
    storeName: "",
    storeDomain: "",
    entityType: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const [location, setLocation] = useState<LatLngExpression | null>(null);

  const [loading, setloading] = useState<boolean>(false);

  const [billingCycle, setBillingCycle] = useState<"month" | "year">("month");
  const valid = useRef<boolean>(false);
  const numbervalid = useRef<number>(0);
  const Router = useRouter();

  function checkfist() {
    numbervalid.current = 0;
    if (formData.storeName == "") {
      setFormErrors((prev) => ({
        ...prev,
        storeName: "اسم المتجر مطلوب",
      }));
      valid.current = false;
      numbervalid.current++;
    } else {
      if (formData.storeName.length < 3) {
        setFormErrors((prev) => ({
          ...prev,
          storeName: "يجب ان يحتوي على ثلاثة حروف او اكثر",
        }));
        valid.current = false;
        numbervalid.current++;
      }
    }
    if (formErrors.storeDomain !== "") {
      valid.current = false;
      numbervalid.current++;
    }
    if (formData.storeDomain == "") {
      setFormErrors((prev) => ({
        ...prev,
        storeDomain: "يجب اختيار نطاق خاص بالمتجر",
      }));
      valid.current = false;
      numbervalid.current++;
    }
    if (formData.entityType == "") {
      setFormErrors((prev) => ({
        ...prev,
        entityType: "يجب اختيار نوع كيان المؤسسة ",
      }));
      valid.current = false;
      numbervalid.current++;
    }
    if (numbervalid.current == 0) {
      valid.current = true;
    }
  }

  function validateStep2() {
    const errors: Record<string, string> = {};

    if (!formData.categories || formData.categories.length === 0) {
      errors.categories = "الرجاء اختيار فئة واحدة على الأقل";
    }

    if (
      formData.storeDescription &&
      formData.storeDescription.trim().length > 0 &&
      formData.storeDescription.trim().length < 10
    ) {
      errors.storeDescription = "الوصف يجب أن يكون 10 أحرف على الأقل";
    }

    if (formData.storeImage) {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedTypes.includes(formData.storeImage.type)) {
        errors.storeImage = "نوع الملف غير مدعوم (jpg, jpeg, png فقط)";
      }
      const maxSizeMB = 5;
      if (formData.storeImage.size / 1024 / 1024 > maxSizeMB) {
        errors.storeImage = `حجم الملف يجب ألا يتجاوز ${maxSizeMB} ميغابايت`;
      }
    }

    setFormErrors((prev) => ({ ...prev, ...errors }));

    return Object.keys(errors).length === 0;
  }

  const onclickButton = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      storeDomain: value.trim(),
    }));
  };

  const handleNext = () => {
    if (currentStep === 2) {
      const step2Valid = validateStep2();
      if (!step2Valid) return;
    }

    if (currentStep === 3) {
      if (!location) {
        setFormErrors((prev) => ({
          ...prev,
          shipmentLocation: "يرجى تحديد موقع المتجر على الخريطة",
        }));
        return;
      } else {
        setFormErrors((prev) => {
          const copy = { ...prev };
          delete copy.shipmentLocation;
          return copy;
        });
      }
    }

    if (currentStep === 5) {
      if (!selectedPlanId || selectedPlanId === 0) {
        setFormErrors((prev) => ({
          ...prev,
          selectedPlanId: "الرجاء اختيار باقة للاشتراك بها",
        }));
        return;
      } else {
        setFormErrors((prev) => {
          const copy = { ...prev };
          delete copy.selectedPlanId;
          return copy;
        });
      }
    }

    if (currentStep === steps.length) {
      setloading(true);
      const Data = new FormData();
      Data.append("name", formData.storeName);
      Data.append("domain", formData.storeDomain);
      Data.append("description", formData.storeDescription ?? "");
      Data.append("packageid", selectedPlanId.toString());
      Data.append("entityType", formData.entityType ?? "");
      if (location) {
        if (Array.isArray(location)) {
          Data.append("Latitude", location[0].toString());
          Data.append("Longitude", location[1].toString());
        } else {
          Data.append("Latitude", location.lat.toString());
          Data.append("Longitude", location.lng.toString());
        }
      }

      formData.categories?.forEach((cat) => Data.append("CategoryIds", cat));

      if (formData.storeImage) {
        Data.append("file", formData.storeImage);
      } else {
      }

      CreateMarket(Data)
        .then(() => {
          Router.push("/dashboard");
        })
        .catch((e) => {
          if (axios.isAxiosError(e)) {
            alert(e);
          }
        })
        .finally(() => setloading(false));
    }

    checkfist();
    if (currentStep === 3) {
      setFormData({
        ...formData,
        shipmentLocation: location?.toString() ?? "",
      });
    }
    if (valid.current == false) {
      return;
    }

    if (currentStep < steps.length) {
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep]);
      }
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleInputChange = (field: keyof FormDataType, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setFormErrors((prev) => {
      const copy = { ...prev };
      delete copy[field];
      return copy;
    });

    setFormData((prev) => ({
      ...prev,
      storeDomain: transliterateArabicToEnglish(value),
    }));
  };

  const handleCategoriesChange = (vals: string[]) => {
    setFormData((prev) => ({
      ...prev,
      categories: vals,
    }));

    setFormErrors((prev) => {
      const copy = { ...prev };
      delete copy.categories;
      return copy;
    });
  };

  const handleImageChange = (file: File | null) => {
    setFormData((prev) => ({
      ...prev,
      storeImage: file,
    }));

    setFormErrors((prev) => {
      const copy = { ...prev };
      delete copy.storeImage;
      return copy;
    });
  };

  const handleDescriptionChange = (val: string) => {
    setFormData((prev) => ({
      ...prev,
      storeDescription: val,
    }));

    setFormErrors((prev) => {
      const copy = { ...prev };
      delete copy.storeDescription;
      return copy;
    });
  };

  useEffect(() => {
    const r = setTimeout(() => {
      if (formData.storeDomain.length < 3) {
        return;
      }
      CheckDomain(formData.storeDomain).then((d) => {
        if (d.isAvailable == false) {
          setFormErrors((prev) => ({
            ...prev,
            storeDomain: "هذا الرابط غير متاح ",
          }));
          const butn1 = document.getElementById("butn");
          if (butn1) {
            butn1.innerHTML = d.domain[0];
            const butn2 = butn1.nextElementSibling;
            const butn3 = butn2?.nextElementSibling;
            if (butn2) {
              butn2.innerHTML = d.domain[1];
            }
            if (butn3) {
              butn3.innerHTML = d.domain[2];
            }
          }
        } else {
          const butn1 = document.getElementById("butn");
          if (butn1) {
            butn1.innerHTML = "";
            const butn2 = butn1.nextElementSibling;
            const butn3 = butn2?.nextElementSibling;
            if (butn2) butn2.innerHTML = "";
            if (butn3) butn3.innerHTML = "";
          }
          setFormErrors((prev) => ({
            ...prev,
            storeDomain: "",
          }));
        }
      });
    }, 400);
    return () => clearTimeout(r);
  }, [formData.storeDomain]);
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1StoreInfo
            onclickButton={onclickButton}
            formData={formData}
            questionFormData={questionFormData}
            formErrors={formErrors}
            onChange={handleInputChange}
            onEntityTypeChange={(val) => {
              setFormData((prev) => ({
                ...prev,
                entityType: val,
              }));
              setFormErrors((prev) => ({
                ...prev,
                entityType: "",
              }));
              setQuestionFormData({ ...questionFormData, entityType: val });
            }}
          />
        );
      case 2:
        return (
          <Step2StoreIdentity
            categories={formData.categories}
            storeImage={formData.storeImage}
            storeDescription={formData.storeDescription}
            formErrors={formErrors}
            onCategoriesChange={handleCategoriesChange}
            onImageChange={handleImageChange}
            onDescriptionChange={handleDescriptionChange}
          />
        );
      case 3:
        return (
          <Step3Location
            location={location}
            setLocation={setLocation}
            errorProp={formErrors.shipmentLocation}
          />
        );
      case 5:
        return (
          <Step5Plans
            billingCycle={billingCycle}
            setBillingCycle={setBillingCycle}
            selectedPlanId={selectedPlanId}
            setSelectedPlanId={setSelectedPlanId}
            formErrors={formErrors}
          />
        );
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <p>محتوى الخطوة غير متوفر حالياً.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-screen-xl bg-white rounded-xl shadow-lg p-8 mx-auto">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-900">
          إعدادات المتجر
        </h2>
        <div className="md:flex md:space-x-6">
          <div className="md:w-1/4 border-r h-full  md:sticky top-5 flex md:flex-col flex-row flex-wrap border-gray-200 pr-6">
            {steps.map((step) => (
              <div
                key={step.number}
                className={`flex md:after:h-0 ${step.number == steps.length ? "after:h-0" : "after:h-0.5"
                  } after:content-[''] after:w-5   items-center mb-6 space-x-3 cursor-pointer select-none ${currentStep === step.number
                    ? "text-indigo-600 font-semibold after:bg-indigo-600"
                    : "text-gray-700 after:bg-gray-700"
                  }`}
                onClick={() => {
                  if (step.number <= currentStep + 1)
                    setCurrentStep(step.number);
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    setCurrentStep(step.number);
                }}
              >
                <div
                  className={`flex-shrink-0     w-10 h-10 flex items-center justify-center rounded-full border-2 mr-4
                    ${completedSteps.includes(step.number)
                      ? "bg-indigo-600 border-indigo-600 text-white"
                      : currentStep === step.number
                        ? "border-indigo-600 text-indigo-600 font-bold bg-indigo-100"
                        : "border-gray-300 text-gray-600 bg-white"
                    }
                    transition-colors duration-300`}
                  aria-current={
                    currentStep === step.number ? "step" : undefined
                  }
                >
                  {completedSteps.includes(step.number) ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <span>{step.number}</span>
                  )}
                </div>
                <span className="md:block hidden">{step.label}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 md:mt-0 md:w-3/4 p-6 bg-gray-50 rounded-lg  shadow-inner min-h-[320px]">
            {renderStepContent()}
          </div>
        </div>
        <div className="flex justify-between mt-8 md:w-3/4 mr-auto">
          <button
            type="button"
            className="px-6 py-3 md:mr-6 rounded-md font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handlePrev}
            disabled={currentStep === 1}
          >
            السابق
          </button>
          <button
            type="button"
            className="px-6 py-3 rounded-md font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleNext}
            disabled={loading}
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <LoadingCircle size={10} />
              </div>
            ) : (
              <>{currentStep === steps.length ? "دخول" : "التالي"}</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;