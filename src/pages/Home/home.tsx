import React from 'react';
import DatePicker from '../../components/DatePicker';
import Password from '../../components/Password';

const Home = () => {
  const now = new Date();

  return (
    <>
      <Password />
      <br />
      <DatePicker
        name="date-picker"
        id="date-picker"
        label="Birthday"
        placeholder="mm/dd/yyy"
        maxDateValue={now.toISOString()}
        //value="12/18/2024"
      />
    </>
  );
};

export default Home;
