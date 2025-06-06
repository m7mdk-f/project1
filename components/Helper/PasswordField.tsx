"use client";
import React, { useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";

type Props = {
  password: string;
  onChange: (value: string) => void;
  onValidChange?: (isValid: boolean) => void;
};

const PasswordField = ({ password, onChange, onValidChange }: Props) => {
  const [show, setShow] = useState(false);
  const [strength, setStrength] = useState(0);
  const checkStrength = (value: string) => {
    onChange(value);

    const hasUppercase = /[A-Z]/.test(value);

    const rules = [/[a-z]/, /[0-9]/, /[!@#\$%\^&\*]/, /.{8,}/];
    const score = rules.reduce(
      (acc, rule) => (rule.test(value) ? acc + 1 : acc),
      hasUppercase ? 1 : 0
    );

    setStrength(score);

    if (typeof onValidChange === "function") {
      onValidChange(score >= 4 && hasUppercase);
    }
  };
  const getBarColor = () => {
    if (strength <= 2) return "bg-red-500";
    if (strength === 3) return "bg-yellow-500";
    if (strength === 4) return "bg-blue-500";
    return "bg-green-500";
  };

  return (
    <div className="relative w-full">
      <label className="block text-sm text-blue-500 mb-2">كلمة المرور</label>
      <input
        type={show ? "text" : "password"}
        value={password}
        onChange={(e) => checkStrength(e.target.value)}
        placeholder="ادخل كلمة المرور"
        className="w-full  text-sm bg-white text-right outline-0 border-b border-blue-400 px-4 py-2"
      />
      <span
        className="absolute left-3 top-[3em] transform -translate-y-1/2 cursor-pointer text-gray-500"
        onClick={() => setShow(!show)}
      >
        {show ? (
          <MdOutlineRemoveRedEye size={18} />
        ) : (
          <FaRegEyeSlash size={18} />
        )}
      </span>
      {password.length > 0 && (
        <div className="mt-3">
          <div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${getBarColor()}`}
              style={{ width: `${(strength / 5) * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordField;
