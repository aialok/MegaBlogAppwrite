import React from 'react'

function Button({
    children,
    type = 'button',
    className = '',
    bgColor = 'bg-blue-500',
    textColor = 'text-white',
    onClick = () => {},
    ...props
}) {
  return (
    <button type={type} className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} {...props} >{children}</button>
  )
}

export default Button