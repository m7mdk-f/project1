"use client";

import React from "react";

const CheckEmailPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-white p-6">
            <div
                data-aos="zoom-in"
                className="bg-white rounded-3xl shadow-xl p-10 max-w-lg w-full text-center flex justify-center flex-col items-center border border-gray-200"
            >
                <div className="mb-6 bg-green-500 rounded-full w-20 h-20 flex justify-center items-center">
                    <svg
                        className="mx-auto w-12 text-white drop-shadow-sm"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                        />
                    </svg>
                </div>

                <h1 className="text-4xl font-extrabold text-gray-800 mb-4 tracking-tight">
                    شكراً لتسجيلك!
                </h1>

                <p className="text-lg text-gray-600 font-medium leading-relaxed">
                    تم إرسال رسالة تأكيد إلى بريدك الإلكتروني.
                    <br />
                    الرجاء التحقق من صندوق الوارد أو البريد المهمل لإكمال التسجيل.
                </p>
            </div>
        </div>
    );
};

export default CheckEmailPage;
