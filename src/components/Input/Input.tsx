import React, { forwardRef } from 'react';
import { mergeClasses } from '../../utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  maxLength?: number;
  inputClassName?: string;
}

type Ref = HTMLInputElement;

const Input = forwardRef<Ref, InputProps>((props, ref) => {
  const { id, name, label, inputClassName = '', ...rest } = props;

  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        ref={ref}
        name={name}
        className={mergeClasses('border border-black', inputClassName)}
        {...rest}
      />
    </div>
  );
});

export default Input;
