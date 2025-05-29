import Image from "next/image";
import Link from "next/link";
import React from "react";

const Login = () => {
  const styl = { padding: "8px 12px" };
  return (
    <section className="relative w-full h-screen flex flex-row-reverse">
      <div className="imgBox6 md:relative md:w-1/2 md:h-full w-full absolute inset-0">
        <Image
          alt="صورة خلفية"
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="/images/login6.jpg"
          width={500}
          height={500}
        />
      </div>

      <div className="flex container justify-center items-center md:w-1/2 h-full md:z-0 w-full z-10">
        <div
          className="w-full max-w-md p-8 md:p-12 rounded-xl shadow-lg"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            padding: "20px",
          }}
          dir="rtl"
        >
          <h2 className="text-blue-600 font-semibold text-3xl mb-8 tracking-wide text-center">
            تسجيل الدخول
          </h2>

          <form className="flex flex-col gap-5" style={{ padding: "20px" }}>
            <div className="w-full flex flex-col gap-3">
              <label className="block text-base text-blue-600 font-medium">
                البريد الإلكتروني
              </label>
              <input
                style={styl}
                className="w-full border border-blue-500 text-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="email"
                placeholder="example@email.com"
                autoComplete="email"
              />
            </div>

            <div className="w-full flex flex-col gap-3">
              <label className="block text-base  text-blue-600 font-medium">
                كلمة المرور
              </label>
              <input
                style={styl}
                className="w-full border border-blue-500 text-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="password"
                placeholder=""
                autoComplete="current-password"
              />
            </div>

            <div className="flex justify-between items-center text-sm text-blue-600">
              <label className="flex items-center space-x-2 space-x-reverse">
                <input type="checkbox" className="accent-blue-500" />
                <span>تذكرني</span>
              </label>

              <Link href="#" className=" hover:text-blue-800">
                نسيت كلمة المرور؟
              </Link>
            </div>

            <div className="w-full">
              <input
                style={{ padding: "12px 16px" }}
                className="w-full text-white font-semibold bg-blue-500 hover:bg-blue-600 rounded-lg cursor-pointer transition duration-200"
                type="submit"
                value="تسجيل الدخول"
              />
            </div>

            <div className="text-center w-full text-sm md:text-base">
              <p className="text-blue-600">
                ليس لديك حساب؟
                <Link
                  href="/Register"
                  className="ml-1 text-blue-600 hover:text-red-600 underline transition duration-200"
                >
                  أنشئ حساب
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
