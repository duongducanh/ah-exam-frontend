import React from 'react';
import { mergeClasses } from '../../utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  maxLength?: number;
  inputClassName?: string;
}

const Input: React.FC<InputProps> = ({
  name,
  label,
  inputClassName = '',
  ...rest
}) => {
  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        id={name}
        className={mergeClasses('border border-black', inputClassName)}
        {...rest}
      />
    </div>
  );
};

export default Input;
