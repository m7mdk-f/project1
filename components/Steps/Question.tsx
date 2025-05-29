
type QuestionProps = {
    questionText: string;
    options: { label: string; value: string }[];
    selected: string | null;
    onSelect: (val: string) => void;
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
            <h2 className="text-lg font-semibold mb-4 text-right text-gray-700" dir="rtl">
                {questionText}(مطلوب)
            </h2>
            <div className="flex flex-wrap gap-6">
                {options.map(({ label, value }) => (
                    <button
                        key={value}
                        onClick={() => onSelect(value)}
                        className={`min-w-[100px] cursor-pointer  sm:text-xs md:text-base   py-3 px-4 rounded-full border font-medium transition-colors duration-300 ${selected === value
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white text-gray-600 border-gray-300 hover:bg-blue-50"
                            }`}
                    >
                        {label}
                    </button>
                ))}
            </div>
            {children && selected !== null && children}
        </div>
    );
}