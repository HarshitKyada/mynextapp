import React from "react";

const Input = ({
  type,
  value,
  onChange,
  placeholder,
  error,
  validation,
  className,
  checked,
  onBlur,
  name,
  id,
  disabled,
  defaultChecked,
}) => {
  return (
    <>
      <input
        type={type}
        checked={checked}
        name={name}
        value={value}
        placeholder={placeholder}
        defaultChecked={defaultChecked}
        className={`${
          className ? className : ""
        } p-[12px] rounded-[6px] border border-gray-100 text-sm font-normal bg-gray-400 font-inter text-black placeholder:text-black ${
          error ? "border-red-500" : ""
        }`}
        {...validation}
        onChange={onChange}
        onBlur={onBlur}
        id={id}
        disabled={disabled}
      />
      {error && (
        <p className="text-red-500 font-inter text-[12px] mt-1">{error}</p>
      )}
    </>
  );
};

export default Input;
