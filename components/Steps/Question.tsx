
type QuestionProps = {
    questionText: string;
    options: { label: string; value: boolean }[];
    selected: boolean | null;
    onSelect: (val: boolean) => void;
    children?: React.ReactNode;
};

export default function Question({
    questionText,
    options,
    selected,
    onSelect,
    children,
}: QuestionProps) {
    return (
        <div className="mb-10">
            <h2 className="md:text-lg sm:text-base text-sm font-semibold mb-4 text-right text-gray-700" dir="rtl">
                {questionText}(مطلوب)
            </h2>
            <div className="flex flex-wrap justify-start  md:gap-6 gap-1">
                {options.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => onSelect(item.value)}
                        className={`min-w-[100px] cursor-pointer  sm:text-sm text-xs md:text-base   py-3 px-4 rounded-full border font-medium transition-colors duration-300 ${selected === item.value
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white text-gray-600 border-gray-300 hover:bg-blue-50"
                            }`}
                    >
                        {item.label}
                    </button>
                ))}
            </div>
            {children && selected !== null && children}
        </div>
    );
}