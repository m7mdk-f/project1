// components/InputField.tsx
"use client";

import React from "react";

type Props = {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  dir?: "rtl" | "ltr";
  icon?: React.ReactNode;
};

const InputField = ({
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  dir = "rtl",
  icon,
}: Props) => {
  return (
    <div className="relative w-full">
      <label className="block text-sm text-gray-600 mb-2">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        dir={dir}
        className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-green-300 text-right bg-white outline-0 border border-gray-300"
      />
      {icon && (
        <span className="absolute left-3 top-[70%] transform -translate-y-1/2 cursor-pointer text-gray-500">
          {icon}
        </span>
      )}
    </div>
  );
};

export default InputField;
