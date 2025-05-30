"use client"
import Question from "./Question";
import React, { SetStateAction, useState } from 'react';


export default function BusinessExperienceForm({ setAcive, active }: { active: boolean, setAcive: React.Dispatch<SetStateAction<boolean>> }) {
    const [answer1, setAnswer1] = useState<string | null>(null);
    const [answer2, setAnswer2] = useState<string | null>(null);
    const [answer3, setAnswer3] = useState<string | null>(null);

    const handleAnswer1 = (val: string) => {
        setAnswer1(val);
        setAnswer2(null);
        setAnswer3(null);
    };

    const handleAnswer2 = (val: string) => {
        setAnswer2(val);
        setAnswer3(null);
    };

    const question2Options =
        answer1 === "yes"
            ? [
                { label: "نعم", value: "yes" },
                { label: "لا", value: "no" },
            ]
            : [
                { label: "نعم لدي منتج او خذمة", value: "yes" },
                { label: "لا ليس لدي منتج او خدمة بعد", value: "no" },
            ];

    const question3Options =
        answer2 === "yes"
            ? [
                { label: "عن طريق محل تجاري", value: "option1" },
                { label: "عن طريق منصات الاجتماعي مثل الانستقرام", value: "option2" },
            ]
            : [
                { label: "استكشاف المنصة", value: "option1" },
                { label: "تجربة الدرويشوبيق", value: "option2" },
                { label: "الاثنين معا", value: "option3" },
            ];

    function handValue() {
        console.log(answer1)
        console.log(answer2)
        console.log(answer3)

        setAcive(true)
    }
    return (
        <div className="p-8  lg:max-w-6xl md:max-w-2xl w-full bg-white shadow mt-5" dir="rtl">
            <h1 className="lg:text-2xl md:text-xl sm:text-lg text-sm font-bold mb-8 text-gray-900 text-right">
                {active ? "mohamed"
                    :
                    "ساعدنا نتعرف عليك أكثر لنقدم لك تجربة تلائم نشاطك التجاري"
                }
            </h1>
            {active ? <div></div> : <div>
                <Question
                    questionText=" هل لديك خبرة في التجارة؟"
                    selected={answer1}
                    onSelect={handleAnswer1}
                    options={[
                        { label: "نعم", value: "yes" },
                        { label: "ليس بعد", value: "no" },
                    ]}
                />
                {answer1 !== null && (
                    <Question
                        questionText={
                            answer1 === "yes"
                                ? " هل هذا أول متجر إلكتروني لك؟"
                                : "ما هي حاجتك الأساسية حالياً؟ "
                        }
                        selected={answer2}
                        onSelect={handleAnswer2}
                        options={question2Options}
                    />
                )}

                {answer2 !== null && (
                    <Question
                        questionText={
                            answer2 === "yes"
                                ? "كيف سبق لك ممارسة التجارة؟"
                                : "ما هو هدفك من فتح متجر على المنصة؟"
                        }
                        selected={answer3}
                        onSelect={setAnswer3}
                        options={question3Options}
                    >

                    </Question>
                )}
            </div>
            }
            <hr className=" border-gray-300" />
            <div className="text-left mt-4">
                <button
                    disabled={!(answer1 && answer2 && answer3)}
                    type="submit"
                    className={`px-8 py-3 rounded-lg text-lg font-medium text-white transition-colors ${answer1 && answer2 && answer3
                        ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                        : "bg-blue-500 opacity-60 cursor-not-allowed"
                        }`}
                    onClick={handValue}
                >
                    التالي
                </button>
            </div>
        </div>
    );
}
