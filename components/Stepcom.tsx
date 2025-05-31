import React from 'react'

export default function stepcom({ Title, number }: { number?: number, Title: string }) {
    return (
        <li className="  mr-3 flex w-full gap-2 items-center text-blue-600 dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800">
            <span className="flex  items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0">
                {number || ""}
            </span>
            <span className='w-3/4'>{Title}</span>
        </li>
    )
}
