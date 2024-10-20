import React from 'react';
import DatePicker from '../../components/DatePicker';
import Password from '../../components/Password';

const Home = () => {
  const now = new Date();

  return (
    <>
      <h1 className="mb-12 text-2xl font-semibold text-center">
        UI/UX Components: Exam 1
      </h1>
      <Password />
      <DatePicker
        name="date-picker"
        id="date-picker"
        label="Birthday"
        placeholder="mm/dd/yyyy"
        maxDateValue={now.toISOString()}
        //value="12/18/2024"
      />
    </>
  );
};

export default Home;
