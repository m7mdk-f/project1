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
      <label className="block text-sm text-blue-500 mb-2">{label}</label>
      <input
        required
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        dir={dir}
        className="w-full px-4 py-2 text-right bg-white text-sm outline-0 border-b border-blue-300"
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
