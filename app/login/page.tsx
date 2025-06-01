"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { login } from "@/components/api/api";
import Image from "next/image";
import LoadingCircle from "@/components/LoadingCircle";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem("token", "");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(emailRegex.test(email));
  }, [email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoading(true);

    login(email, password)
      .then(() => {
        router.push("/steps");
      })
      .catch((error) => {
        if (error.response) {
          const message = error.response.data;

          if (typeof message === "string") {
            if (message.includes("Error in Email or Password")) {
              setLoginError("البريد الإلكتروني أو كلمة المرور غير صحيحة.");
            } else {
              setLoginError("حدث خطأ: " + message);
            }
          } else {
            setLoginError("فشل تسجيل الدخول. الرجاء المحاولة لاحقاً.");
          }
        } else {
          setLoginError("حدث خطأ أثناء الاتصال بالخادم.");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center"
      dir="rtl"
    >
      <div className="py-6 px-2 w-full ">
        <div className="flex justify-between border hover:shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] border-slate-300 rounded-lg items-center gap-10  lglg:max-w-6xl mx-auto md:max-w-5xl  w-full  p-0 md:p-4">
          <div data-aos="fade-left" className="p-6  md:w-1/2  w-full">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="mb-12 text-center">
                <div className="w-full relative h-[8em] overflow-hidden">
                  <Image
                    fill
                    src="/logo3.png"
                    alt="cd"
                    className="relative  w-full h-full object-cover"
                  />
                </div>

                <h3 className="text-blue-500 text-3xl font-semibold">
                  تسجيل الدخول
                </h3>
                <p className="text-gray-400 mt-1 text-sm font-semibold">
                  مرحبا بك مجددا 👋
                </p>
              </div>

              <div>
                <label className="text-slate-800 text-sm font-medium mb-2 block">
                  البريد الإلكتروني
                </label>
                <div className="relative flex items-center">
                  <input
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-sm text-slate-800 border-b outline-0 border-slate-300 pl-4 pr-5 py-3"
                    placeholder="أدخل البريد الإلكتروني"
                  />
                </div>
              </div>

              {emailValid && (
                <div>
                  <label className="text-slate-800 text-sm font-medium mb-2 block">
                    كلمة المرور
                  </label>
                  <div className="relative flex items-center">
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full text-sm text-slate-800 border-b outline-0 border-slate-300 pl-4 pr-5 py-3"
                      placeholder="أدخل كلمة المرور"
                    />
                    <span
                      className="absolute left-4 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <MdOutlineRemoveRedEye size={18} />
                      ) : (
                        <FaRegEyeSlash size={18} />
                      )}
                    </span>
                  </div>

                  {loginError && (
                    <p className="text-red-500 text-sm mt-2 text-right">
                      {loginError}
                    </p>
                  )}
                </div>
              )}

              <div className="!mt-12">
                <button
                  type="submit"
                  disabled={!emailValid || password.length === 0 || loading}
                  className={`w-full shadow-xl py-2.5 px-4 text-[15px] font-medium tracking-wide rounded-lg text-white transition-all focus:outline-none ${!emailValid || password.length === 0 || loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                    }`}
                >
                  {loading ? (
                    <div className="flex justify-center">
                      {" "}
                      <LoadingCircle size={30} />
                    </div>
                  ) : (
                    "تسجيل الدخول"
                  )}
                </button>

                <p className="text-sm !mt-6 text-center text-slate-500">
                  ليس لديك حساب؟
                  <Link
                    href="/register"
                    className="text-blue-600 font-medium underline ml-1 whitespace-nowrap"
                  >
                    أنشئ حسابًا الآن
                  </Link>
                </p>
              </div>
            </form>
          </div>

          <div
            data-aos="fade-right"
            className="w-1/2 hidden md:block rounded-xl"
          >
            <Image
              src="/signin-image.webp"
              width={500}
              height={500}
              alt="صورة تسجيل الدخول"
              className="w-full h-full mx-auto block object-cover "
            />
          </div>
        </div>
      </div>
    </section>
  );
}