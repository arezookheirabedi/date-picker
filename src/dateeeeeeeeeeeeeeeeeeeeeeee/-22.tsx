import React, {useEffect, useRef, useState} from 'react';
import dayjs from 'dayjs';
import {Day} from '@hassanmojab/react-modern-calendar-datepicker';
import Calendar from '../shared/datepicker/Calendar';
import DatePickerModal from './DatePickerModal';

interface IProps extends React.HTMLProps<HTMLInputElement> {
  selected?: any;
  error?: any;
  min?: any;
  max?: any;
  iClass?: any;
  placeholder?: any;
}

const DatePicker: React.FC<IProps> = ({selected, min, max, iClass, placeholder, ...rest}) => {
  const ref = useRef<HTMLInputElement>(null);
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null,
  }) as any;
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    // @ts-ignore
    rest.onChange(
      // @ts-ignore
      selectedDayRange
        ? dayjs(
            `${selectedDayRange.from.year}-${selectedDayRange.from.month}-${selectedDayRange.from.day}`,
            // @ts-ignore
            {jalali: true}
          ).valueOf()
        : null
    );
  }, [selectedDayRange]);

  useEffect(() => {
    // eslint-disable-next-line no-undef-init
    let defaultValue: Day | null | undefined = undefined;
    if (selected) {
      const date = dayjs(selected).calendar('jalali').format('YYYY-MM-DD').split('-');

      defaultValue = {
        day: Number(date[2]),
        month: Number(date[1]),
        year: Number(date[0]),
      };
    } else {
      defaultValue = undefined;
    }

    setTimeout(() => {
      selectedDayRange(defaultValue);
    }, 100);
  }, [selected]);
  const focusFromDate = () => {
    setShowDatePicker(true);
  };
  return (
    <>
      <input type="text" className="hidden" ref={ref} {...rest} />
      <div className="relative w-full">
        <Calendar
          action={focusFromDate}
          from={selectedDayRange.from}
          to={selectedDayRange.to}
          setSelectedDayRange={setSelectedDayRange}
        />

        <input
          type="text"
          // aria-invalid={rest.error ? true : false}
          className={iClass}
          placeholder={placeholder || 'انتخاب تاریخ'}
          onClick={() => setShowDatePicker(true)}
          // @ts-ignore
          value={
            selectedDayRange
              ? `${selectedDayRange.from.year}-${selectedDayRange.from.month}-${selectedDayRange.from.day}`.toPersianDigits()
              : ''
            // selectedDay
            //   ? dayjs(
            //   `${selectedDay.year}-${selectedDay.month}-${selectedDay.day}`
            //   )
            //     .format("YYYY-MM-DD")
            //     .toPersianDigits()
            //   : ""
          }
        />
      </div>

      {showDatePicker ? (
        <DatePickerModal
          setSelectedDayRange={setSelectedDayRange}
          selectedDayRange={selectedDayRange}
          setShowDatePicker={setShowDatePicker}
          showDatePicker
        />
      ) : null}
    </>
  );
};
export default DatePicker;