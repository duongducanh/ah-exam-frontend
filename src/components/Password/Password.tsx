import React, { useState, useRef, useCallback } from 'react';
import Input from '../Input';
import PasswordCheckList from './PasswordCheckList';
import useOutsideClick from '../../hooks/useOusideClick';

const Password = () => {
  const [password, setPassword] = useState<string>('');
  const [opened, setOpened] = useState<boolean>(false);

  const checkListRef = useRef<HTMLDivElement>(null);

  const handleSetPassword = (event: { target: { value: string } }) => {
    setPassword(event.target.value);
  };

  const handleClose = useCallback(() => {
    setOpened(false);
  }, []);

  useOutsideClick(checkListRef, handleClose, opened);

  return (
    <div className="relative inline-block mb-10">
      <Input
        name="password"
        id="password"
        label="Password"
        type="password"
        placeholder="Password"
        onChange={handleSetPassword}
        onClick={() => setOpened(true)}
      />
      {opened && (
        <div
          ref={checkListRef}
          className="absolute z-10 bg-grey-800 rounded-lg py-2 px-3.5 w-full mt-5"
        >
          <PasswordCheckList
            value={password}
            rules={[
              'uppercase',
              'lowercase',
              'number',
              'specialChar',
              'minLength'
            ]}
            minLength={8}
          />
        </div>
      )}
    </div>
  );
};

export default Password;
