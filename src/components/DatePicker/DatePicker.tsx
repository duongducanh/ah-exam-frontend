import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import './datepicker.css';
import { isValidDate } from '../../utils';
import useOutsideClick from '../../hooks/useOusideClick';
import Input from '../Input';
import ArrowLeft from '../Icons/ArrowLeft';
import ArrowRight from '../Icons/ArrowRight';

interface DatePickerProps {
  id?: string | undefined;
  onChange?: (e: { target: HTMLInputElement }) => void | undefined;
  value?: string;
  maxDateValue?: string;
  placeholder?: string;
  name: string;
  label?: string;
}

type Tab = 'day' | 'year';

const DatePicker: React.FC<DatePickerProps> = ({
  id,
  onChange,
  value = '',
  maxDateValue = '',
  placeholder,
  name,
  label
}) => {
  // gets the today date time object
  const now: Date = useMemo(() => new Date(), []);
  const maxDate = useMemo(
    () =>
      maxDateValue && isValidDate(maxDateValue) ? new Date(maxDateValue) : null,
    [maxDateValue]
  );

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedDateTemporary, setSelectedDateTemporary] =
    useState<Date | null>(null);
  //Jan - Dec: 0 - 11
  const [selectedMonth, setSelectedMonth] = useState<number>(now.getMonth());
  const [selectedYear, setSelectedYear] = useState<number>(now.getFullYear());

  // state needed to display the day view, an array of the month weeks containing an array of week dates
  const [displayedWeeks, setDisplayedWeeks] = useState<Date[][]>([]);
  // state to define if datepicker is opened or not
  const [opened, setOpened] = useState<boolean>(false);
  // state that tells wich tab is active : day, month, years
  const [selectionTab, setSelectionTab] = useState<Tab>('day');
  // years array needed for the years view
  const [yearsArray, setYearsArray] = useState<number[]>([]);
  // state that tells the component to call the onchange function
  const [triggerChange, setTriggerChange] = useState<boolean>(false);

  const WEEK_DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const MONTH_NAMES = [
    'January',
    'Febuary',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  const datepickerRef = useRef<HTMLDivElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);

  const isDisabledNextMonth = useMemo(
    () =>
      maxDate &&
      (maxDate.getFullYear() < selectedYear ||
        (maxDate.getFullYear() === selectedYear &&
          maxDate.getMonth() <= selectedMonth))
        ? true
        : false,
    [maxDate, selectedMonth, selectedYear]
  );

  const isDisabledDate = useCallback(
    (date: Date): boolean => {
      if (maxDate) {
        if (
          maxDate.getFullYear() < date.getFullYear() ||
          (maxDate.getFullYear() === date.getFullYear() &&
            maxDate.getMonth() < date.getMonth()) ||
          (maxDate.getFullYear() === date.getFullYear() &&
            maxDate.getMonth() === date.getMonth() &&
            maxDate.getDate() < date.getDate())
        ) {
          return true;
        }
      }

      return false;
    },
    [maxDate]
  );

  const closeAndReset = useCallback(() => {
    setOpened(false);
    setSelectionTab('day');
    const resetMonth = selectedDate ? selectedDate.getMonth() : now.getMonth();
    const resetYear = selectedDate
      ? selectedDate.getFullYear()
      : now.getFullYear();
    setSelectedMonth(resetMonth);
    setSelectedYear(resetYear);
    setSelectedDateTemporary(selectedDate);
  }, [now, selectedDate]);

  // function that returns a string reprensenting the Date object
  const formatDate = (date: Date) => {
    const formatNumber = (number: number) =>
      number < 10 ? '0' + number : number;
    const month = formatNumber(date.getMonth() + 1);
    const day = formatNumber(date.getDate());
    const year = date.getFullYear();
    return month + '/' + day + '/' + year;
  };

  //if a value prop is passed to the component, update the selecterdDate state
  useEffect(() => {
    if (!value || !isValidDate(value)) {
      setSelectedDate(null);
    } else {
      const initialDate = new Date(value);
      if (initialDate) {
        setSelectedDate(initialDate);
        setSelectedMonth(initialDate.getMonth());
        setSelectedYear(initialDate.getFullYear());
      }
    }
  }, [value]);

  // if triggerchange state is true then call the onChange callback funtion
  useEffect(() => {
    if (triggerChange && dateInputRef.current !== null && onChange) {
      onChange({ target: dateInputRef.current });
      setTriggerChange(false);
    }
  }, [triggerChange, onChange]);

  //use outside click to close the date picker if user clicks outside when opened
  useOutsideClick(datepickerRef, closeAndReset, opened);

  //if user change the selectedYear, then update the years array that is displayed on year tab view
  useEffect(() => {
    const years: number[] = [];
    for (let y = selectedYear - 10; y < selectedYear + 10; y++) {
      years.push(y);
    }
    setYearsArray(years);
  }, [selectedYear]);

  //get the array of weeks and dates needed for the day tab view, and update the displayedWeeks state
  useEffect(() => {
    function getMonthLength(year: number, month: number) {
      const monthLastDate = new Date(year, month + 1, 0);
      return monthLastDate.getDate();
    }
    //get the first date object of the month
    const currentMonthFirstDate: Date = new Date(
      selectedYear,
      selectedMonth,
      1
    );
    //get the day number of the week of the first date of the month: Sunday - Saturday: 0 - 6
    const currentMonthFirstDay: number = currentMonthFirstDate.getDay();
    // get the current month length
    const currentMonthLastDate: number = getMonthLength(
      selectedYear,
      selectedMonth
    );
    // initialize a new array
    const calendarArray: Date[][] = [];
    //determine if 6 or 5 weeks have to be displayed for this month
    const numberOfWeeksToDisplay: number =
      currentMonthFirstDay + currentMonthLastDate > 35 ? 6 : 5;
    //calculate to list the dates of each week row it starts from dayStartPosition -> end date of the week row is dayStartPosition + 7
    for (let week = 0; week < numberOfWeeksToDisplay; week++) {
      const weekArray: Date[] = [];
      const dayStartPosition: number = week * 7 - currentMonthFirstDay;

      for (let day = 1; day <= 7; day++) {
        const dayPosition = dayStartPosition + day;
        weekArray.push(new Date(selectedYear, selectedMonth, dayPosition));
      }
      calendarArray.push(weekArray);
    }

    setDisplayedWeeks(calendarArray);
  }, [selectedYear, selectedMonth]);

  const onYearChange = (value: number) => {
    setSelectionTab('day');
    setSelectedYear(value);
  };

  const onDayClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as Element;
    const dateElement = target.closest('button');

    if (dateElement && dateElement instanceof HTMLElement) {
      setSelectedDateTemporary(new Date(dateElement.id));
    }
  };

  const onInputClick = (
    e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
  ) => {
    e.preventDefault();
    //e.stopPropagation();
    if (opened) {
      closeAndReset();
    } else {
      setOpened(true);
    }
  };

  const onNavClick = (
    e: React.MouseEvent<HTMLElement>,
    direction: 'next' | 'prev',
    dateElement: Tab = 'day'
  ) => {
    e.preventDefault();
    switch (dateElement) {
      case 'day': {
        if (direction === 'prev') {
          if (selectedMonth === 0) {
            setSelectedMonth(11);
            setSelectedYear(selectedYear - 1);
          } else {
            setSelectedMonth(selectedMonth - 1);
          }
        }
        if (direction === 'next') {
          if (selectedMonth === 11) {
            setSelectedMonth(0);
            setSelectedYear(selectedYear + 1);
          } else {
            setSelectedMonth(selectedMonth + 1);
          }
        }
        break;
      }
      case 'year': {
        if (direction === 'prev') {
          const years: number[] = [];
          for (let y = yearsArray[0] - 20; y < yearsArray[0]; y++) {
            years.push(y);
          }
          setYearsArray(years);
        }
        if (direction === 'next') {
          const years: number[] = [];
          for (
            let y = yearsArray[yearsArray.length - 1] + 1;
            y <= yearsArray[yearsArray.length - 1] + 20;
            y++
          ) {
            years.push(y);
          }
          setYearsArray(years);
        }
        break;
      }
      default:
        break;
    }
  };

  const changeSelectionTab = (
    e: React.MouseEvent<HTMLElement> | null = null,
    tab: Tab
  ) => {
    if (e) {
      e.preventDefault();
    }
    setSelectionTab(tab);
  };

  const onOkayClick = () => {
    if (selectedDateTemporary) {
      setSelectedDate(selectedDateTemporary);
      setSelectedMonth(selectedDateTemporary.getMonth());
      setSelectedYear(selectedDateTemporary.getFullYear());
    }
    setOpened(false);
    setSelectionTab('day');
    setTriggerChange(true);
  };

  return (
    <div className="relative">
      <div
        className="inline-block"
        onKeyDown={onInputClick}
        onClick={onInputClick}
      >
        <Input
          type="text"
          id={id}
          value={selectedDate ? formatDate(selectedDate) : ''}
          readOnly={true}
          ref={dateInputRef}
          placeholder={placeholder}
          name={name}
          label={label}
          inputClassName="cursor-pointer"
        />
      </div>

      {opened && (
        <div
          ref={datepickerRef}
          className="font-inter absolute bg-grey-light w-[320px] rounded-[10px] shadow-dark mt-3.5 pt-[17px] pb-4"
        >
          <div className="px-6 mb-1">Text</div>
          <h4 className="px-6 text-[32px] leading-[44px] font-bold tracking-[1px] mb-[15px]">
            {now.toLocaleString('default', { month: 'short' })}
            {', '}
            {now.getFullYear()}
          </h4>
          {selectionTab === 'day' && (
            <div>
              <div className="nav">
                <button
                  className="nav-btn"
                  onClick={(e) => {
                    onNavClick(e, 'prev');
                  }}
                >
                  <ArrowLeft />
                </button>
                <button
                  className="nav-year-btn"
                  onClick={(e) => {
                    changeSelectionTab(e, 'year');
                  }}
                >
                  {MONTH_NAMES[selectedMonth]} {selectedYear}
                </button>
                <button
                  className="nav-btn"
                  onClick={(e) => {
                    onNavClick(e, 'next');
                  }}
                  disabled={isDisabledNextMonth}
                >
                  <ArrowRight />
                </button>
              </div>

              <div className="px-[13px]">
                <table className="w-full text-center">
                  <thead>
                    <tr>
                      {WEEK_DAYS.map((day, index) => {
                        return (
                          <th
                            key={index + day}
                            className="text-[11px] leading-[13px] text-grey-500 font-normal pb-[12px]"
                          >
                            {day}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {displayedWeeks.map((week, index) => {
                      return (
                        <tr key={week.toString() + index}>
                          {week.map((date, index) => {
                            let className =
                              'text-[14px] leading-[20.02px] tracking-[.15px] text-white w-[35px] h-[35px] border rounded-full hover:enabled:border-white hover:enabled:bg-white hover:enabled:text-grey-darker';
                            let classNameBorder = ' border-transparent';
                            //off-month
                            if (date.getMonth() !== selectedMonth) {
                              className += ' opacity-[.5]';
                            }
                            //current day
                            if (
                              selectedDate &&
                              date.toDateString() ===
                                selectedDate.toDateString()
                            ) {
                              classNameBorder = ' border-primary';
                            }
                            //selected day
                            if (
                              selectedDateTemporary &&
                              date.toDateString() ===
                                selectedDateTemporary.toDateString()
                            ) {
                              className += ' bg-primary';
                              classNameBorder = ' border-primary';
                            }
                            //today
                            if (date.toDateString() === now.toDateString()) {
                              className += ' today';
                            }
                            className += classNameBorder;
                            return (
                              <td
                                key={date.toString() + index}
                                className="pb-0"
                              >
                                <button
                                  className={className}
                                  id={`${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`}
                                  onClick={onDayClick}
                                  disabled={isDisabledDate(date)}
                                >
                                  {date.getDate()}
                                </button>
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {selectionTab === 'year' && (
            <div className="mb-[27px]">
              <div className="nav">
                <button
                  className="nav-btn"
                  onClick={(e) => {
                    onNavClick(e, 'prev', 'year');
                  }}
                >
                  <ArrowLeft />
                </button>
                <span className="-mt-[9px]">{selectedYear}</span>
                <button
                  className="nav-btn"
                  onClick={(e) => {
                    onNavClick(e, 'next', 'year');
                  }}
                  disabled={
                    maxDate &&
                    yearsArray[yearsArray.length - 1] > maxDate.getFullYear()
                      ? true
                      : false
                  }
                >
                  <ArrowRight />
                </button>
              </div>
              <div className="px-[24px] grid grid-cols-[repeat(4,minmax(0,61px))] gap-x-[9px] gap-y-6 mt-[17px]">
                {yearsArray.map((year, index) => {
                  const classNameSelected =
                    selectedYear === year ? 'bg-primary rounded-[2px]' : '';

                  return (
                    <button
                      className={`flex items-center justify-center h-[24px] hover:enabled:bg-white hover:enabled:text-grey-dark ${classNameSelected}`}
                      key={year + index}
                      onClick={() => {
                        onYearChange(year);
                      }}
                      disabled={
                        maxDate && maxDate.getFullYear() < year ? true : false
                      }
                    >
                      {year}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          <div className="flex justify-end gap-x-[38px] px-[28px] mt-[11px]">
            <button className="confirm-btn" onClick={closeAndReset}>
              <span>Cancel</span>
            </button>
            <button className="confirm-btn" onClick={onOkayClick}>
              <span>Ok</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
