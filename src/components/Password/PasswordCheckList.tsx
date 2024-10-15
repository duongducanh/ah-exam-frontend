import React, { useMemo } from 'react';
import CheckValid from '../Icons/CheckValid';
import CheckInvalid from '../Icons/CheckInvalid';

interface PasswordCheckListProps {
  value: string;
  rules: Array<RuleNames>;
  minLength?: number;
  maxLength?: number;
  specialCharsRegex?: RegExp;
}

type RuleNames =
  | 'minLength'
  | 'maxLength'
  | 'specialChar'
  | 'uppercase'
  | 'lowercase'
  | 'number';

const PasswordCheckList: React.FC<PasswordCheckListProps> = ({
  value,
  rules,
  minLength = 8,
  maxLength = 20,
  // eslint-disable-next-line no-useless-escape
  specialCharsRegex = /[~`¿¡!#$%\^&*€£@+÷=\-\[\]\\';,/{}\(\)|\\":<>\?\.\_]/g
}) => {
  const ruleDefinitions: {
    [key in RuleNames]: { valid: boolean; message: string };
  } = useMemo(() => {
    return {
      minLength: {
        valid: value.length >= minLength,
        message: `Longer than ${minLength} characters`
      },
      maxLength: {
        valid: value.length <= maxLength,
        message: `Shorter than ${maxLength} characters`
      },
      specialChar: {
        valid: specialCharsRegex.test(value),
        message: `Have at least one special character (!@#$...etc)`
      },
      uppercase: {
        valid: /[A-Z]/.test(value),
        message: 'Have at least one uppercase letter'
      },
      lowercase: {
        valid: /[a-z]/.test(value),
        message: 'Have at least one lowercase letter'
      },
      number: {
        valid: /\d/g.test(value),
        message: 'Have at least one number'
      }
    };
  }, [maxLength, minLength, specialCharsRegex, value]);

  const enabledRules: RuleNames[] = useMemo(
    () => rules.filter((rule) => Boolean(ruleDefinitions[rule])),
    [ruleDefinitions, rules]
  );

  return (
    <ul>
      {enabledRules.map((rule) => {
        const { message, valid } = ruleDefinitions[rule];
        return (
          <li key={rule}>
            <span>{valid ? <CheckValid /> : <CheckInvalid />}</span>
            <span>{message}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default PasswordCheckList;
