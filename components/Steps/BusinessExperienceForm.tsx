"use client"
import { useState, FormEvent } from 'react';

export default function BusinessExperienceForm() {
    const [hasExperience, setHasExperience] = useState<boolean | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (hasExperience === null) return;

        setIsSubmitting(true);
        console.log({ hasExperience });
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
        }, 1000);
    };

    return (
        <div className="mt-9 p-5  w-3/4 bg-white rounded-lg shadow">
            <div className="text-right mb-6">
                <h2 className="lg:text-2xl md:text-xl sm:text-lg  text-base font-bold text-gray-800">
                    ساعدنا نتعرف عليك أكثر لنقدم لك تجربة تلائم نشاطك التجاري
                </h2>
            </div>

            <form onSubmit={handleSubmit}>
                <div className=" my-12">
                    <label className="block text-right  text-gray-700 lg:text-lg md:text-base text-sm font-medium mb-3">
                        هل لديك خبرة في التجارة؟ (مطلوب)
                    </label>

                    <div className="flex  space-x-4 space-x-reverse">
                        <button
                            type="button"
                            onClick={() => setHasExperience(true)}
                            className={`px-3 py-1 rounded-full text-lg font-medium ${hasExperience === true
                                ? 'bg-green-200 text-black border-transparent'
                                : 'bg-white text-gray-400 border-transparent'
                                }`}
                        >
                            نعم
                        </button>

                        <button
                            type="button"
                            onClick={() => setHasExperience(false)}
                            className={`px-3 py-1 rounded-full text-lg font-medium ${hasExperience === false
                                ? 'bg-green-200 text-black border-transparent'
                                : 'bg-white text-gray-400 border-transparent'
                                }`}
                        >
                            ليس بعد
                        </button>

                    </div>
                </div>

                <div className="text-left">
                    <button
                        type="submit"
                        disabled={hasExperience === null || isSubmitting}
                        className={`px-8 py-3 rounded-lg text-lg font-medium text-white ${hasExperience === null
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700'
                            } transition-colors`}
                    >
                        {isSubmitting ? 'جاري التحميل...' : 'التالي'}
                    </button>
                </div>
            </form>
        </div>
    );
}