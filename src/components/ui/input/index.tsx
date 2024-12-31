"use client";

import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({ placeholder, ...props }) => {
  return (
    <div className="input-container flex ">
      {placeholder && (
        <label className="flex-1 input-label">{placeholder}</label>
      )}
      <input
        className="input-field flex-auto text-black px-4 py-2 rounded-md"
        {...props}
      />
    </div>
  );
};

export default Input;
