import React from "react";

function select(
  {
    options = [],
    label,
    className = "",
    ...props
  },
  ref
) {
  const id = React.useId();

  return (
    <div className="w-full">
      {label && <label htmlFor={id}>{label}</label>}
      <select
        id={id}
        ref={ref}
        className={`w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 ${className}`}
        {...props}
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(select);
