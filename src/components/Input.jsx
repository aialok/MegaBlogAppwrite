import React, { forwardRef, useId } from "react";

const Input = forwardRef(function Input(
  { type = "text", label = "", placeholder = "", className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full">
      <label htmlFor={id} className="block mb-1 text-sm text-gray-700">
        {label}
      </label>

      <input
        ref={ref}
        type={type}
        id={id}
        placeholder={placeholder}
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${className}`}
        {...props}
      />
    </div>
  );
});

export default Input;
