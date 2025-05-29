"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import ImageSlider from "../../components/ImageSlideLogin/ImageSlider";
import InputField from "@/components/Helper/InputField";
import axios from "axios";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(emailRegex.test(email));
  }, [email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://localhost:7063/Login", {
        Email: email,
        Password: password,
      });

      // افترض الـ API يرجع التوكن داخل response.data.token
      const token = response.data.token;
      if (token) {
        localStorage.setItem("authToken", token);
      }

      alert("تم تسجيل الدخول بنجاح");

      // توجه لصفحة رئيسية أو أخرى
      window.location.href = "/";
    } catch (error: any) {
      if (error.response) {
        alert(`فشل تسجيل الدخول: ${error.response.data}`);
      } else {
        alert("حدث خطأ أثناء الاتصال بالخادم.");
      }
    }
  };

  return (
    <div className="min-h-screen lg:px-20 md:px-10 sm:p-5 bg-gray-100 flex flex-col lg:flex-row items-center justify-between gap-5 overflow-hidden">
      {/* نموذج تسجيل الدخول */}
      <div className="w-full xl:max-w-xl lg:max-w-lg p-8 rounded-lg">
        <div className="flex justify-between border border-solid border-gray-300 rounded-lg mb-8">
          <button
            onClick={(e) => e.preventDefault()}
            className="w-1/2 text-center border-l text-white bg-blue-500 hover:bg-blue-600 cursor-pointer rounded-tr-lg rounded-br-lg"
          >
            تسجيل الدخول
          </button>
          <Link
            href="/register"
            className="w-1/2 text-center font-bold rounded-tl-lg rounded-bl-lg border-green-400 p-3.5 text-gray-500"
          >
            إنشاء حساب
          </Link>
        </div>

        <form
          onSubmit={handleSubmit}
          className="text-right flex justify-center flex-col gap-5"
        >
          <InputField
            label="البريد الإلكتروني"
            type="email"
            placeholder="ادخل البريد الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {emailValid && (
            <InputField
              label="كلمة المرور"
              type={showPassword ? "text" : "password"}
              placeholder="ادخل كلمة المرور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer"
                >
                  {showPassword ? (
                    <MdOutlineRemoveRedEye size={18} />
                  ) : (
                    <FaRegEyeSlash size={18} />
                  )}
                </span>
              }
            />
          )}

          <button
            type="submit"
            disabled={!emailValid || password.length === 0}
            style={{ padding: "10px 12px" }}
            className={`w-full ${
              !emailValid || password.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
            } text-white rounded-md transition duration-200`}
          >
            استمرار
          </button>
        </form>
      </div>

      <div>
        <ImageSlider />
      </div>
    </div>
  );
};

export default Login;
