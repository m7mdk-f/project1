import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

interface LoadingCircleProps {
    size?: number;
    color?: string;
}

const LoadingCircle: React.FC<LoadingCircleProps> = ({
    size = 40,
    color = 'text-blue-500',
}) => {
    return (
        <AiOutlineLoading3Quarters
            className={`animate-spin ${color}`}
            size={size}
        />
    );
};

export default LoadingCircle;
