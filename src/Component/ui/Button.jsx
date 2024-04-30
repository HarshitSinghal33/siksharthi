import { cva } from 'class-variance-authority'
import React from 'react'
import { cn } from '../../utils/cn'

export default function Button({ className, isLoading, loadingText, buttonText, children, variant, isDisabled, ...props }) {
    return (
        <button {...props} disabled={isLoading || isDisabled} className={cn(buttonVariant({ variant }), className)}>
            {isLoading ? (
                <ButtonLoader loadingText={loadingText} />
            ) : (
                children ? children : buttonText ? buttonText : 'Click'
            )}
        </button>
    )
}

function ButtonLoader({ loadingText }) {
    return (
        <span className='flex justify-center items-center'>
            <svg width="20" height="20" fill="currentColor" className="mr-2 animate-spin" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z">
                </path>
            </svg>
            <span>{loadingText ? loadingText : 'Loading...'}</span>
        </span>
    )
}

const buttonVariant = cva(
    'w-full py-2 px-4 text-white rounded font-semibold hover:opacity-75 focus:outline-none',
    {
        variants: {
            variant: {
                primary: 'bg-blue-500',
                secondary: 'bg-gray-700',
                danger: 'bg-red-600',
                light: 'bg-white text-black',
                dark: 'bg-black text-white'
            }
        },
        defaultVariants: {
            variant: 'primary'
        }
    },
)