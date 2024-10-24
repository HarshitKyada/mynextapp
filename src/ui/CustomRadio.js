import React from "react";

const CustomRadioIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <rect x="0.5" y="0.5" width="15" height="15" rx="7.5" fill="white" />
    <rect x="0.5" y="0.5" width="15" height="15" rx="7.5" stroke="#636363" />
  </svg>
);

const CustomRadioCheckedIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <rect x="0.5" y="0.5" width="15" height="15" rx="7.5" fill="#E4FAF1" />
    <rect x="0.5" y="0.5" width="15" height="15" rx="7.5" stroke="#2563eb" />
    <circle cx="8" cy="8" r="3" fill="#2563eb" />
  </svg>
);

const CustomRadio = ({ checked, onChange, value, label, name, disabled }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <label className="flex items-center cursor-pointer">
          <input
            type="radio"
            name={name}
            checked={checked}
            onChange={onChange}
            value={value}
            disabled={disabled}
            className="hidden"
          />
          <div className="flex items-center">
            <span className="flex items-center justify-center w-4 h-4">
              {checked ? <CustomRadioCheckedIcon /> : <CustomRadioIcon />}
            </span>
            <span className="ml-2 text-grey-text-1200 font-inter text-sm font-medium leading-5">
              {label}
            </span>
          </div>
        </label>
      </div>
    </div>
  );
};

export default CustomRadio;
