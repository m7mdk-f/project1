import React, { ReactNode } from 'react';

type StepStatus = 'done' | 'current' | 'pending';

function StepsComp({
    icon,
    last = false,
    Title,
    number,
    status = 'pending'
}: {
    icon?: ReactNode;
    last?: boolean;
    number?: number;
    Title: string;
    status?: StepStatus;
}) {
    const getCircleClasses = () => {
        switch (status) {
            case 'done':
                return 'bg-green-800 border-white text-white';
            case 'current':
                return 'border-green-300 text-gray-500 text-green-800';
            case 'pending':
            default:
                return 'border-gray-500 text-gray-500';
        }
    };

    const getLineClasses = () => {
        switch (status) {
            case 'done':
                return 'border-green-800';
            case 'current':
                return 'border-green-300';
            case 'pending':
            default:
                return 'border-gray-400';
        }
    };

    return (
        <div className={`flex items-center ${last ? 'lg:w-1/2 w-fit' : 'w-full'}`}>
            <li className="flex items-center gap-2">
                <span
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 
                    lg:h-12 lg:w-12 shrink-0 text-base font-medium ${getCircleClasses()}`}
                >
                    <span className="lg:block hidden">{number || icon || ""}</span>
                    <span className="lg:hidden block">{icon || ''}</span>
                </span>

                <span className={`text-base lg:block hidden font-medium ${status == 'done' ? 'text-green-800' : `${status == 'current' ? "text-green-300" : "text-black"}`}`}>{Title}</span>
            </li>

            {!last && (
                <div className={`flex-grow h-0.5 mx-2 mt-1 border-2 ${getLineClasses()}`} />
            )}
        </div>
    );
}

export default StepsComp;
