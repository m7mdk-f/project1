// components/AccountSettings/AccountSettings.tsx
"use client";
import React, { useState } from "react";
import Step1StoreInfo from "@/components/AccountSettings/Step1StoreInfo";
import Step2StoreIdentity from "@/components/AccountSettings/Step2StoreIdentity";
import Step3Location from "@/components/AccountSettings/Step3Location";
import Step5Plans from "@/components/AccountSettings/Step5Plans";
import LocationSelector from "@/components/AccountSettings/LocationSelector";
import ImageDropzone from "@/components/AccountSettings/ImageDropzone";
import {
  Plan,
  QustionFormData,
  Step,
  FormData,
} from "@/components/AccountSettings/types";
import { LatLngExpression } from "leaflet";

const steps: Step[] = [
  { number: 1, label: "معلومات المتجر" },
  { number: 2, label: "هوية المتجر" },
  { number: 3, label: "موقع استلام الشحنات" },
  { number: 4, label: "شركات الشحن" },
  { number: 5, label: "الدفع الالكتروني" },
  { number: 6, label: "توثيق المتجر" },
];

const plans: Plan[] = [
  {
    id: "basic",
    name: "الباقة الأساسية",
    monthlyPrice: 20,
    yearlyPrice: 200,
    features: ["ميزة 1", "ميزة 2", "ميزة 3"],
  },
  {
    id: "pro",
    name: "الباقة المتقدمة",
    monthlyPrice: 40,
    yearlyPrice: 400,
    features: ["ميزة 1", "ميزة 2", "ميزة 3", "ميزة 4"],
  },
  {
    id: "enterprise",
    name: "الباقة الشاملة",
    monthlyPrice: 80,
    yearlyPrice: 800,
    features: ["كل الميزات", "دعم مخصص", "تحديثات مستمرة"],
  },
];

const AccountSettings: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [formData, setFormData] = useState<FormData>({
    storeName: "",
    storeDomain: "",
    brandIdentity: "",
    shipmentLocation: "",
    shippingCompanies: "",
    paymentMethods: "",
    basketPackage: "",
    launchDate: "",
  });
  const [questionFormData, setQuestionFormData] = useState<QustionFormData>({
    storeName: "",
    storeDomain: "",
    entityType: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const [location, setLocation] = useState<LatLngExpression | null>(null);
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [street, setStreet] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const [billingCycle, setBillingCycle] = useState<"month" | "year">("month");
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  // ... include your validation functions here or import them if you split further

  const handleNext = () => {
    if (currentStep === 3) {
      setFormData({
        ...formData,
        shipmentLocation: JSON.stringify({
          lat:
            location && !Array.isArray(location) ? location.lat : location?.[0],
          lng:
            location && !Array.isArray(location) ? location.lng : location?.[1],
          address,
          district,
          street,
          postalCode,
        }),
      });
    }
    // validation logic here, update formErrors

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

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setFormErrors((prev) => {
      const copy = { ...prev };
      delete copy[field];
      return copy;
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1StoreInfo
            formData={formData}
            questionFormData={questionFormData}
            formErrors={formErrors}
            onChange={handleInputChange}
            onEntityTypeChange={(val) =>
              setQuestionFormData({ ...questionFormData, entityType: val })
            }
          />
        );
      case 2:
        return (
          <Step2StoreIdentity
            categories={formData.categories}
            storeImage={formData.storeImage}
            storeDescription={formData.storeDescription}
            onCategoriesChange={(vals) =>
              setFormData({ ...formData, categories: vals })
            }
            onImageChange={(file) =>
              setFormData({ ...formData, storeImage: file })
            }
            onDescriptionChange={(val) =>
              setFormData({ ...formData, storeDescription: val })
            }
          />
        );
      case 3:
        return (
          <Step3Location
            location={location}
            setLocation={setLocation}
            address={address}
            setAddress={setAddress}
            district={district}
            setDistrict={setDistrict}
            street={street}
            setStreet={setStreet}
            postalCode={postalCode}
            setPostalCode={setPostalCode}
          />
        );
      case 5:
        return (
          <Step5Plans
            plans={plans}
            billingCycle={billingCycle}
            setBillingCycle={setBillingCycle}
            selectedPlanId={selectedPlanId}
            setSelectedPlanId={setSelectedPlanId}
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
          <div className="md:w-1/4 border-r border-gray-200 pr-6">
            {steps.map((step) => (
              <div
                key={step.number}
                className={`flex items-center mb-6 space-x-3 cursor-pointer select-none ${
                  currentStep === step.number
                    ? "text-indigo-600 font-semibold"
                    : "text-gray-700"
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
                  className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full border-2 mr-4
                    ${
                      completedSteps.includes(step.number)
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
                <span>{step.label}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 md:mt-0 md:w-3/4 p-6 bg-gray-50 rounded-lg shadow-inner min-h-[320px]">
            {renderStepContent()}
          </div>
        </div>
        <div className="flex justify-between mt-8 max-w-3xl mx-auto">
          <button
            type="button"
            className="px-6 py-3 rounded-md font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handlePrev}
            disabled={currentStep === 1}
          >
            السابق
          </button>
          <button
            type="button"
            className="px-6 py-3 rounded-md font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleNext}
            disabled={currentStep === steps.length}
          >
            التالي
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
