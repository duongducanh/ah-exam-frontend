import React from 'react';
import DatePicker from '../../components/DatePicker';

const Home = () => {
  const now = new Date();

  return (
    <>
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
