"use client";

import React from "react";

const CheckEmailPage = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-6">شكراً لتسجيلك!</h1>

            <p className="mt-6 text-green-700 font-semibold text-center max-w-md">
                تم إرسال رسالة تأكيد إلى بريدك الإلكتروني. الرجاء التحقق من صندوق الوارد (أو البريد المهمل) لإكمال التسجيل.
            </p>
        </div>
    );
};

export default CheckEmailPage;
