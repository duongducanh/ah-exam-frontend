import React, { useState, useRef } from 'react';
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

  const handleClose = () => {
    setOpened(false);
  };

  useOutsideClick(checkListRef, handleClose, opened);

  return (
    <>
      <Input
        name="password"
        id="password"
        label="Password"
        type="password"
        onChange={handleSetPassword}
        onClick={() => setOpened(true)}
      />
      {opened && (
        <div ref={checkListRef}>
          <PasswordCheckList
            value={password}
            rules={[
              'lowercase',
              'uppercase',
              'number',
              'specialChar',
              'minLength'
            ]}
            minLength={8}
          />
        </div>
      )}
    </>
  );
};

export default Password;
