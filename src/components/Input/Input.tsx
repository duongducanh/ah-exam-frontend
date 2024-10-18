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
    <div className="relative pt-[8px]">
      {label && (
        <label
          htmlFor={id}
          className="absolute top-[1px] left-[12px] text-[12px] leading-[18px] px-1 bg-grey-dark tracking-[.4px]"
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        name={name}
        className={mergeClasses('w-[335px]', inputClassName)}
        {...rest}
      />
    </div>
  );
});

export default Input;
