"use client";

import InputField from "@/components/Helper/InputField";
import PasswordField from "@/components/Helper/PasswordField";
import PhoneField from "@/components/Helper/PhoneField";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import React, { useState } from "react";
import LoadingCircle from "@/components/LoadingCircle";
import { useRouter } from "next/navigation";
import { Registerapi } from "@/components/api/api";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedCode, setSelectedCode] = useState("+966");
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError(null);
    setLoading(true)

    try {
      await Registerapi(name, email, selectedCode, phone, password)
      router.push("/checkyouremail");
    } catch (error: unknown) {
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen lg:px-20 md:px-10 sm:p-5 bg-gray-100 flex flex-col lg:flex-row items-center justify-between gap-5">
      {/* نموذج التسجيل */}
      <div className="w-full xl:max-w-xl lg:max-w-lg p-8 rounded-lg">
        <div className="flex justify-between border border-solid border-gray-300 rounded-lg mb-8">
          <Link
            href="/login"
            className="w-1/2 text-center border-l font-bold text-gray-500 p-3.5"
          >
            تسجيل الدخول
          </Link>

          <Link
            href="#"
            className="w-1/2 text-center font-bold rounded-tl-lg rounded-bl-lg text-white bg-blue-500 hover:bg-blue-600 border-green-400 p-3.5"
          >
            إنشاء حساب
          </Link>
        </div>

        <form
          onSubmit={handleSubmit}
          className="text-right flex justify-center flex-col gap-5"
        >
          <InputField
            label="الاسم الكريم"
            placeholder="ادخل الاسم الكريم"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          />

          <InputField
            label="البريد الإلكتروني"
            type="email"
            placeholder="ادخل البريد الإلكتروني"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          />

          <PhoneField
            phone={phone}
            onPhoneChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
            selectedCode={selectedCode}
            onCodeChange={setSelectedCode}
          />

          <PasswordField
            password={password}
            onChange={setPassword}
            onValidChange={setIsPasswordValid}
          />
          {registerError && (
            <p className="text-red-500 text-sm text-right mt-[-10px] mb-[-5px]">
              {registerError}
            </p>
          )}
          <button
            type="submit"
            disabled={!isPasswordValid || loading}
            style={{ padding: "10px 12px" }}
            className={`w-full text-white rounded-md transition duration-200 ${!isPasswordValid || loading
              ? "bg-gray-400 cursor-not-allowed"
              : "cursor-pointer bg-blue-500 hover:bg-blue-600"
              } flex justify-center items-center gap-2`}
          >
            {loading ? <LoadingCircle /> : "تسجيل"}
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
          className="w-full"
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
