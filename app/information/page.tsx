"use client";

import InputField from "@/components/Helper/InputField";
import StepLink from "@/components/InfoSteps/StepLink";
import StoreNameInput from "@/components/InfoSteps/StoreNameInput";
import Image from "next/image";
import React, { useState } from "react";

type Step = {
  number: number;
  label: string;
  content: (onComplete: () => void) => React.ReactNode;
};

export function validateStoreName(name: string): { valid: boolean; error?: string } {
  const trimmed = name.trim();

  if (trimmed.length === 0) {
    return { valid: false, error: "اسم المتجر مطلوب." };
  }

  if (trimmed.length < 3) {
    return { valid: false, error: "اسم المتجر يجب أن يكون على الأقل 3 أحرف." };
  }

  if (trimmed.length > 30) {
    return { valid: false, error: "اسم المتجر يجب ألا يتجاوز 30 حرفًا." };
  }

  // يسمح بالحروف العربية والإنجليزية والأرقام والمسافات فقط
  const validNameRegex = /^[\u0621-\u064Aa-zA-Z0-9 ]+$/;

  if (!validNameRegex.test(trimmed)) {
    return { valid: false, error: "اسم المتجر يحتوي على رموز غير مسموحة." };
  }

  return { valid: true };
}

const steps: Step[] = [
  {
    number: 1,
    label: "معلومات المتجر",
    content: (onComplete) => (
      <div className="w-full">
        <h2 className="heading-primary">معلومات المتجر</h2>
        <p className="my-5 text-gray-700">
          أدخل اسم المتجر ومعلومات خاصة بمتجرك
        </p>
        <StoreNameInput />
        <button className="btn-primary mt-6" onClick={onComplete}>
          أكمل هذه الخطوة
        </button>
      </div>
    ),
  },
  {
    number: 2,
    label: "هوية المتجر",
    content: (onComplete) => (
      <div>
        <h2 className="text-2xl font-bold mb-4">حدد هوية متجرك البصرية</h2>
        <p>
          اختر شعار المتجر، الألوان الرئيسية، والخطوط التي تمثل علامتك التجارية.
        </p>
        <button className="btn-primary mt-6" onClick={onComplete}>
          أكمل هذه الخطوة
        </button>
      </div>
    ),
  },
  {
    number: 3,
    label: "موقع استلام الشحنات",
    content: (onComplete) => (
      <div>
        <h2 className="text-2xl font-bold mb-4">حدد موقع استلام الشحنات</h2>
        <p>
          قم بإدخال العنوان أو العناوين التي سيتم استلام الشحنات منها لضمان سرعة
          التوصيل.
        </p>
        <button className="btn-primary mt-6" onClick={onComplete}>
          أكمل هذه الخطوة
        </button>
      </div>
    ),
  },
  {
    number: 4,
    label: "شركات الشحن",
    content: (onComplete) => (
      <div>
        <h2 className="text-2xl font-bold mb-4">اختر شركات الشحن المناسبة</h2>
        <p>حدد شركات الشحن التي تريد التعامل معها لتوصيل الطلبات إلى عملائك.</p>
        <button className="btn-primary mt-6" onClick={onComplete}>
          أكمل هذه الخطوة
        </button>
      </div>
    ),
  },
  {
    number: 5,
    label: "الدفع الالكتروني",
    content: (onComplete) => (
      <div>
        <h2 className="text-2xl font-bold mb-4">إعداد طرق الدفع الإلكترونية</h2>
        <p>
          قم بربط حسابات الدفع الإلكتروني مثل بطاقة الائتمان أو خدمات الدفع عبر
          الإنترنت.
        </p>
        <button className="btn-primary mt-6" onClick={onComplete}>
          أكمل هذه الخطوة
        </button>
      </div>
    ),
  },
  {
    number: 6,
    label: "باقات سلة",
    content: (onComplete) => (
      <div>
        <h2 className="text-2xl font-bold mb-4">اختر باقة سلة المناسبة</h2>
        <p>حدد الباقة التي تناسب احتياجات متجرك من حيث الميزات والدعم.</p>
        <button className="btn-primary mt-6" onClick={onComplete}>
          أكمل هذه الخطوة
        </button>
      </div>
    ),
  },
  {
    number: 7,
    label: "تدشين المتجر",
    content: (onComplete) => (
      <div>
        <h2 className="text-2xl font-bold mb-4">ابدأ تشغيل متجرك</h2>
        <p>
          قم بمراجعة كل الإعدادات واضغط على زر التدشين ليصبح متجرك متاحًا
          للعملاء.
        </p>
        <button className="btn-primary mt-6" onClick={onComplete}>
          أكمل هذه الخطوة
        </button>
      </div>
    ),
  },
];

function Information() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  function completeStep() {
    setCompletedSteps((prev) => {
      if (!prev.includes(activeStep)) {
        return [...prev, activeStep].sort((a, b) => a - b);
      }
      return prev;
    });

    if (activeStep < steps.length) {
      setActiveStep(activeStep + 1);
    }
  }

  const isCompleted = (stepNum: number) => completedSteps.includes(stepNum);

  return (
    <div className="flex h-screen">
      <div className="w-xs bg-gray-100 px-10 pt-10">
        <div>
          <Image width={150} height={150} src={"/logo2.svg"} alt="" />
        </div>
        <div className="space-y-6 p-6 max-w-md mx-auto">
          {steps.map(({ number, label }) => (
            <StepLink
              key={number}
              stepNumber={number}
              label={label}
              completed={isCompleted(number)}
              active={number === activeStep}
              onClick={() => setActiveStep(number)}
            />
          ))}
        </div>
      </div>
      <div className="bg-white px-32 pt-24 flex w-3/4">
        {steps
          .find((step) => step.number === activeStep)
          ?.content(completeStep)}
      </div>
    </div>
  );
}

export default Information;
