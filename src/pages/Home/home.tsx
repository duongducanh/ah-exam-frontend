import React from 'react';
import DatePicker from '../../components/DatePicker';
import Input from '../../components/Input';

const Home = () => {
  const now = new Date();

  return (
    <>
      <Input name="password" label="Password" type="password" />
      <br />
      <DatePicker
        name="date-picker"
        id="date-picker"
        placeholder="mm/dd/yyy"
        maxDateValue={now.toISOString()}
        //value="12/18/2024"
      />
    </>
  );
};

export default Home;
