"use client"
import { useRouter } from "next/navigation";
import CheckBox from "./CheckBox";
import Question from "./Question";
import React, { SetStateAction, useState } from 'react';
import { IStoreRediness } from "../models/StoreRediness";
import { PostAboutme } from "../api/apiAboutYou";
import LoadingCircle from "../LoadingCircle";


export default function BusinessExperienceForm({ setAcive, active }: { active: boolean, setAcive: React.Dispatch<SetStateAction<boolean>> }) {
    const [answer1, setAnswer1] = useState<boolean | null>(null);
    const [answer2, setAnswer2] = useState<boolean | null>(null);
    const [answer3, setAnswer3] = useState<boolean | null>(null);
    const [options, setOption] = useState<IStoreRediness[]>([])
    const [checkedItems, setCheckedItems] = useState<number[]>([]);
    const [loading, setloading] = useState<boolean>(false);
    const [finish, setFinish] = useState<boolean>(true);
    const Route = useRouter();

    const handleAnswer1 = (val: boolean) => {
        setAnswer1(val);
        setAnswer2(null);
        setAnswer3(null);
    };

    const handleAnswer2 = (val: boolean) => {
        setAnswer2(val);
        setAnswer3(null);
    };

    const question2Options =
        answer1
            ? [
                { label: "نعم", value: true },
                { label: "لا", value: false },
            ]
            : [
                { label: "نعم لدي منتج او خذمة", value: true },
                { label: "لا ليس لدي منتج او خدمة بعد", value: false },
            ];

    const question3Options =
        answer2
            ? [
                { label: "عن طريق محل تجاري", value: true },
                { label: "عن طريق منصات الاجتماعي مثل الانستقرام", value: false },
            ]
            : [
                { label: "استكشاف المنصة", value: true },
                { label: "تجربة الدرويشوبيق", value: false },
            ];
    function handValue(submit: boolean) {

        setloading(true)
        setFinish(false)
        if (active) {
            console.log(checkedItems)
            if (submit) {
                setCheckedItems([]);
            }
            PostAboutme(answer1 || false, answer1 || false, answer1 || false, submit ? [] : checkedItems).then(() => {
                Route.push("marwanpage");
            }).catch((e) => alert(e)).finally(() => setloading(false))
        }
        else
            setAcive(true)
        setloading(false)
        setFinish(true)


    }
    return (
        <div className="p-5  lg:max-w-6xl md:max-w-2xl w-full bg-white shadow mt-5" dir="rtl">
            {
                loading ? <div className="w-full flex justify-center items-center"> <LoadingCircle /> </div> :
                    <div>
                        {active || <h1 className="lg:text-2xl md:text-xl sm:text-lg text-sm font-bold mb-8 text-gray-900 text-right">
                            ساعدنا نتعرف عليك أكثر لنقدم لك تجربة تلائم نشاطك التجاري
                        </h1>
                        }
                        {active ? <CheckBox options={options} setOption={setOption} checkedItems={checkedItems} setCheckedItems={setCheckedItems} /> : <div>
                            <Question
                                questionText=" هل لديك خبرة في التجارة؟"
                                selected={answer1}
                                onSelect={handleAnswer1}
                                options={[
                                    { label: "نعم", value: true },
                                    { label: "ليس بعد", value: false },
                                ]}
                            />
                            {answer1 !== null && (
                                <Question
                                    questionText={
                                        answer1
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
                                        answer2
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

                        <div className="flex justify-between mt-4">
                            {active && <div className="text-right">
                                <button
                                    disabled={!(answer1 !== null && answer2 !== null && answer3 !== null)}
                                    type="submit"
                                    className={`px-8 py-3 rounded-lg text-lg font-medium text-gray-600 cursor-pointer transition-colors`}
                                    onClick={() => setAcive(false)}
                                >
                                    السابق
                                </button>
                            </div>
                            }
                            <div className="text-left mr-auto">
                                {active && <button
                                    disabled={!(answer1 !== null && answer2 !== null && answer3 !== null) && finish}
                                    type="submit"
                                    onClick={() => handValue(true)}
                                    className={`px-8 py-3 rounded-lg text-lg font-medium cursor-pointer text-gray-700 transition-colors `}

                                >
                                    تخطى
                                </button>
                                }
                                <button
                                    disabled={!(answer1 !== null && answer2 !== null && answer3 !== null) && finish}
                                    type="submit"
                                    className={`px-8 py-3 rounded-lg text-lg font-medium text-white transition-colors ${answer1 !== null && answer2 !== null && answer3 !== null
                                        ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                                        : "bg-blue-500 opacity-60 cursor-not-allowed"
                                        }`}
                                    onClick={() => handValue(false)}
                                >
                                    {finish ? "التالي" : <LoadingCircle />}
                                </button>
                            </div>
                        </div>
                    </div>
            }
        </div >

    );
}
