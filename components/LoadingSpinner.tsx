
import React, { useState, useEffect } from 'react';

const loadingMessages = [
    "Brewing up some fresh ideas...",
    "Consulting the digital muses...",
    "Crafting the perfect narrative...",
    "Generating a compelling visual...",
    "Optimizing for maximum engagement...",
    "Assembling insights on emerging tech...",
    "This may take a moment. Great content is worth the wait!"
];

export const LoadingSpinner: React.FC = () => {
    const [message, setMessage] = useState(loadingMessages[0]);
    const [elapsedTime, setElapsedTime] = useState(0);

    useEffect(() => {
        // Reset timer on mount
        setElapsedTime(0);

        const messageInterval = setInterval(() => {
            setMessage(prev => {
                const currentIndex = loadingMessages.indexOf(prev);
                const nextIndex = (currentIndex + 1) % loadingMessages.length;
                return loadingMessages[nextIndex];
            });
        }, 2500);

        const timerInterval = setInterval(() => {
            setElapsedTime(prev => prev + 1);
        }, 1000);

        return () => {
            clearInterval(messageInterval);
            clearInterval(timerInterval);
        };
    }, []);

    const formatTime = (totalSeconds: number) => {
        const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
        const seconds = (totalSeconds % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    return (
        <div className="flex flex-col items-center justify-center space-y-6 my-12">
            <div className="relative w-24 h-24 flex items-center justify-center">
                <div className="absolute w-full h-full border-4 border-dashed rounded-full animate-spin border-teal-500"></div>
                <span className="text-2xl font-mono font-bold text-teal-400">
                    {formatTime(elapsedTime)}
                </span>
            </div>
            <p className="text-lg text-gray-300 font-medium text-center">{message}</p>
        </div>
    );
};