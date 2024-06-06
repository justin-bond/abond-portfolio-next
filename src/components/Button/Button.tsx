import clsx from 'clsx'
import React from 'react'

type ButtonType = {
  children: JSX.Element | string
  variant?: 'primary'
  size?: 'small' | 'medium' | 'large'
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
}

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  type = 'button',
  onClick,
}: ButtonType) => {
  return (
    <button
      className={clsx(
        'relative inline-flex items-center justify-center rounded-full border border-transparent font-medium tracking-xl transition-colors disabled:opacity-40',
        variant === 'primary' && [
          'bg-orange-600 text-white',
          // disabled styles
          'disabled:bg-orange-600 disabled:text-white disabled:cursor-not-allowed',
          // hover & not disabled styles
          '[&:not([disabled]):hover]:bg-orange-500',
          // active & not disabled styles
          '[&:not([disabled]):active]:bg-orange-500',
          // focus & not disabled styles
          '[&:not([disabled]):focus]:bg-orange-600  [&:not([disabled]):focus]:outline-offset-1',
        ],
        {
          'gap-2 px-4 py-2 text-sm leading-[18px] tracking-lg':
            size === 'small',
        },
        {
          'gap-2 px-5 py-3 text-base leading-[18px] tracking-sm':
            size === 'medium',
        },
        {
          'gap-2 px-5 py-4 text-[18px] leading-5 tracking-sm': size === 'large',
        },
      )}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
