"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import InputField from "@/components/Helper/InputField";
import PasswordField from "@/components/Helper/PasswordField";
import PhoneField from "@/components/Helper/PhoneField";
import LoadingCircle from "@/components/LoadingCircle";
import { Registerapi } from "@/components/api/api";
import Image from "next/image";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedCode, setSelectedCode] = useState("+966");
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem('token', "")
  }, [])
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError(null);
    setLoading(true)

    Registerapi(name, email, selectedCode, phone, password).then(() => {
      router.push("/checkyouremail");
    }).catch((error) => {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 409) {
            setRegisterError(
              "هذا البريد الإلكتروني مستخدم مسبقًا. حاول تسجيل الدخول."
            );
          } else {
            setRegisterError(
              `فشل التسجيل: ${JSON.stringify(error.response.data)}`
            );
          }
        } else {
          setRegisterError("حدث خطأ أثناء الاتصال بالخادم.");
        }
      }
    }).finally(() => {
      setLoading(false);

    })

  };


  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center"
      dir="rtl"
    >
      <div className="py-6 px-2 w-full ">
        <div className="flex justify-between border hover:shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] border-slate-300 rounded-lg items-center gap-10 lg:max-w-6xl mx-auto md:max-w-5xl w-full p-0 md:p-4">
          <div
            data-aos="fade-left"
            className="p-6 md:w-1/2 w-full "
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="mb-10 text-center">
                <div className="w-full relative h-[8em] overflow-hidden">
                  <Image
                    fill
                    src="/logo3.png"
                    alt="cd"
                    className="relative  w-full h-full object-cover"
                  />
                </div>

                <h3 className="text-blue-500 text-3xl font-semibold">
                  إنشاء حساب
                </h3>
                <p className="text-gray-400 mt-1 text-sm font-semibold">
                  ابدأ تجارتك الآن 🚀
                </p>
              </div>

              <InputField
                label="الاسم الكريم"
                placeholder="ادخل الاسم الكريم"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <InputField
                label="البريد الإلكتروني"
                type="email"
                placeholder="ادخل البريد الإلكتروني"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <PhoneField
                phone={phone}
                onPhoneChange={(e) => setPhone(e.target.value)}
                selectedCode={selectedCode}
                onCodeChange={setSelectedCode}
              />

              <PasswordField
                password={password}
                onChange={setPassword}
                onValidChange={setIsPasswordValid}
              />

              {registerError && (
                <p className="text-red-500 text-sm text-right">
                  {registerError}
                </p>
              )}

              <div className="!mt-10">
                <button
                  type="submit"
                  disabled={!isPasswordValid || loading}
                  className={`w-full shadow-xl py-2.5 px-4 text-[15px] font-medium tracking-wide rounded-lg text-white transition-all focus:outline-none ${!isPasswordValid || loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                    }`}
                >
                  {loading ? <div className="flex justify-center"> <LoadingCircle size={30} /></div> : "تسجيل"}
                </button>

                <p className="text-sm mt-4 text-center text-slate-500">
                  لديك حساب؟
                  <Link
                    href="/login"
                    className="text-blue-600 font-medium underline ml-1 whitespace-nowrap"
                  >
                    سجل الدخول الآن
                  </Link>
                </p>
              </div>
            </form>
          </div>

          <div
            data-aos="fade-right"
            className=" w-1/2 hidden md:block rounded-xl"
          >
            <Image
              width={500}
              height={500}
              src="/login-image.webp"
              alt="صورة تسجيل"
              className="w-full h-full mx-auto block object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
