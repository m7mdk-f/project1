import React from "react";

interface StepLinkProps {
  stepNumber: number;
  label: string;
  completed: boolean;
  active: boolean;
  onClick: () => void;
}

const StepLink: React.FC<StepLinkProps> = ({
  stepNumber,
  label,
  completed,
  active,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`
          flex items-center space-x-3 focus:outline-none
          ${active ? "text-blue-700 font-semibold" : "text-gray-700"}
          hover:text-blue-600
          transition-colors duration-200
        `}
      aria-current={active ? "step" : undefined}
      type="button"
    >
      <div
        className={`
            flex items-center justify-center w-8 h-8 rounded-full border-2
            ${
              completed
                ? "bg-blue-600 border-blue-600 text-white"
                : "border-gray-400 text-gray-600"
            }
            ${active && !completed ? "border-blue-600 text-blue-600" : ""}
            transition-colors duration-300
          `}
      >
        {completed ? (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        ) : (
          <span className="font-semibold">{stepNumber}</span>
        )}
      </div>
      <span>{label}</span>
    </button>
  );
};

export default StepLink;
