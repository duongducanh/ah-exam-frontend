# Frontend Exam

The datepicker and password components by react/typescript.

## Usage

```js
import DatePicker from '../../components/DatePicker';
import Password from '../../components/Password';

const Home = () => {
  const now = new Date();

  return (
    <>
      <Password />
      <DatePicker
        name="date-picker"
        id="date-picker"
        label="Birthday"
        placeholder="mm/dd/yyyy"
        maxDateValue={now.toISOString()}
        value="12/18/2024"
      />
    </>
  );
};
```

### Props:

**_name_** : required\
**_id_** : optional \
**_placeholder_** : optional\
**_label_** : optional\
**_maxDateValue_** : optional - set the max date value of the calendar\
**_value_** : optional - set the value of the datepicker input\

## Add rules validation to the PasswordCheckList component:

```js
<PasswordCheckList
  value={password}
  rules={[
    'uppercase',
    'lowercase',
    'number',
    'specialChar',
    'minLength',
    'maxLength'
  ]}
  minLength={8}
  maxLength={20}
/>
```
