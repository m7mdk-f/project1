"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";

const countries = [
  { code: "+966", name: "السعودية" },
  { code: "+20", name: "مصر" },
  { code: "+971", name: "الإمارات" },
  { code: "+965", name: "الكويت" },
  { code: "+1", name: "أمريكا" },
  // أضف المزيد حسب الحاجة
];

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [showCountries, setShowCountries] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCode, setSelectedCode] = useState("+966");

  const filteredCountries = countries.filter(
    (country) => country.name.includes(search) || country.code.includes(search)
  );

  return (
    <div className="min-h-screen lg:px-20 md:px-10 sm:p-5  bg-gray-100 flex flex-col lg:flex-row items-center justify-between gap-5">
      {/* نموذج التسجيل */}
      <div className="w-full xl:max-w-xl lg:max-w-lg p-8 rounded-lg">
        <div className="flex justify-between border border-solid border-gray-300 rounded-lg mb-8">
          <button className="w-1/2 text-center border-l text-gray-500">
            تسجيل الدخول
          </button>
          <Link
            href="#"
            className="w-1/2 text-center font-bold rounded-tl-lg rounded-bl-lg text-white bg-blue-500 hover:bg-blue-600 border-green-400"
            style={{ padding: "14px" }}
          >
            إنشاء حساب
          </Link>
        </div>

        <form className="text-right flex justify-center flex-col gap-5">
          <div>
            <label className="block text-sm text-gray-600  mb-5">
              الاسم الكريم
            </label>
            <input
              type="text"
              placeholder="ادخل الاسم الكريم"
              className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-green-300 text-right bg-white outline-0 border-0"
              style={{ padding: "10px 12px" }}
            />
          </div>
          <div>
            <label
              className="block text-sm text-gray-600"
              style={{ marginBottom: "2%" }}
            >
              البريد الإلكتروني
            </label>
            <input
              type="email"
              placeholder="ادخل البريد الإلكتروني"
              className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-green-300 text-right bg-white outline-0 border-0"
              style={{ padding: "10px 12px" }}
            />
          </div>
          <div>
            <label
              className="block text-sm text-gray-600"
              style={{ marginBottom: "2%" }}
            >
              رقم الجوال
            </label>

            <div className="flex flex-row-reverse bg-white text-gray-600 rounded-md">
              <div
                onClick={() => setShowCountries(!showCountries)}
                className="cursor-pointer border-r my-2 py-1 px-4"
              >
                {selectedCode}
              </div>
              <input
                type="tel"
                placeholder="ادخل رقم الجوال"
                className="flex-1 px-4 outline-0 border-0 bg-transparent text-right"
              />
            </div>

            {showCountries && (
              <div className="absolute z-50 bg-white border border-gray-300 mt-1 w-[28em] rounded-md max-h-60 overflow-y-auto shadow-md">
                <input
                  type="text"
                  placeholder="ابحث عن الدولة"
                  style={{ padding: "10px 12px" }}
                  className="w-full border-b outline-none text-sm focus:border"
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                />
                <ul>
                  {filteredCountries.map((country) => (
                    <li
                      key={country.code}
                      style={{ padding: "10px 12px" }}
                      className=" hover:bg-gray-100 cursor-pointer text-sm"
                      onClick={() => {
                        setSelectedCode(country.code);
                        setShowCountries(false);
                        setSearch("");
                      }}
                    >
                      {country.name} ({country.code})
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="flex gap-4">
            {/* كلمة المرور */}
            <div className="relative w-1/2">
              <label
                className="block text-sm text-gray-600"
                style={{ marginBottom: "2%" }}
              >
                كلمة المرور
              </label>
              <input
                style={{ padding: "10px 12px" }}
                type={showPassword ? "text" : "password"}
                placeholder="ادخل كلمة المرور"
                className="w-full focus:border rounded-md bg-white text-right outline-0 border-0"
              />
              <span
                className="absolute left-3 top-12 transform -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <MdOutlineRemoveRedEye size={18} />
                ) : (
                  <FaRegEyeSlash size={18} />
                )}
              </span>
            </div>

            {/* تأكيد كلمة المرور */}
            <div className="relative w-1/2">
              <label
                className="block text-sm text-gray-600"
                style={{ marginBottom: "2%" }}
              >
                تأكيد كلمة المرور
              </label>
              <input
                style={{ padding: "10px 12px" }}
                type={showConfirm ? "text" : "password"}
                placeholder="أعد إدخال كلمة المرور"
                className="w-full focus:border rounded-md bg-white text-right outline-0 border-0"
              />
              <span
                className="absolute left-3 top-12 transform -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? (
                  <MdOutlineRemoveRedEye size={18} />
                ) : (
                  <FaRegEyeSlash size={18} />
                )}
              </span>
            </div>
          </div>

          <button
            type="submit"
            style={{ padding: "10px 12px" }}
            className="w-full cursor-pointer text-white rounded-md hover:bg-blue-600 bg-blue-500 transition duration-200"
          >
            تسجيل
          </button>

          <p className="text-sm text-center text-blue-500">
            بالتسجيل فأنا أوافق على سياسات منصة سلة
          </p>
        </form>
      </div>

      {/* صورة توضيحية */}
      <div className="hidden lg:block w-1/2">
        <Image
          width={500}
          height={500}
          src="/images/register.png"
          alt="Salla Illustration"
          className="w-full "
        />
        <p className="mt-6 text-xl font-semibold text-center text-gray-700">
          كل ما تحتاجه لتنمو بتجارتك
        </p>
        <p className="text-center text-gray-500">
          سجل الآن وانضم لأكثر من 60 ألف متجر يستفيد من مئات الخدمات
        </p>
      </div>
    </div>
  );
};

export default Register;
