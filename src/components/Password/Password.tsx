import React, { useState } from 'react';
import Input from '../Input';
import PasswordCheckList from './PasswordCheckList';

const Password = () => {
  const [password, setPassword] = useState<string>('');

  const handleSetPassword = (event: { target: { value: string } }) => {
    setPassword(event.target.value);
  };

  return (
    <>
      <Input
        name="password"
        label="Password"
        type="password"
        onChange={handleSetPassword}
      />
      <PasswordCheckList
        value={password}
        rules={['lowercase', 'uppercase', 'number', 'specialChar', 'minLength']}
        minLength={8}
      />
    </>
  );
};

export default Password;
