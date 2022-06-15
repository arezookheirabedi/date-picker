import React, {useEffect, useRef, useState} from 'react';
import dayjs from 'dayjs';
import {Day} from '@hassanmojab/react-modern-calendar-datepicker';
import calendar from 'src/assets/images/icons/calendar.svg';
import SingleDatePickerModal from '../SingleDatePickerModal';

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

  const [selectedDay, setSelectedDay] = useState<Day | null | undefined>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    // @ts-ignore
    rest.onChange(
      // @ts-ignore
      selectedDay
        ? dayjs(
            `${selectedDay.year}-${selectedDay.month}-${selectedDay.day}`,
            // @ts-ignore
            {jalali: true}
          ).valueOf()
        : null
    );
  }, [selectedDay]);

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
      setSelectedDay(defaultValue);
    }, 100);
  }, [selected]);

  return (
    <>
      <input type="text" className="hidden" ref={ref} {...rest} />
      <div className="relative w-full">
        <img
          src={calendar}
          className="absolute w-4 h-4 left-3 top-1/2 z-10 -translate-y-1/2 transform"
          // className="absolute right-3"
          alt="calendar"
        />

        <input
          type="text"
          // eslint-disable-next-line no-unneeded-ternary
          aria-invalid={rest.error ? true : false}
          className={iClass}
          placeholder={placeholder || 'انتخاب تاریخ'}
          onClick={() => setShowDatePicker(true)}
          // @ts-ignore
          value={
            selectedDay
              ? `${selectedDay.year}-${selectedDay.month}-${selectedDay.day}`.toPersianDigits()
              : ''
          }
        />
      </div>

      {showDatePicker ? (
        <SingleDatePickerModal
          setSelectedDay={setSelectedDay}
          selectedDay={selectedDay}
          setShowDatePicker={setShowDatePicker}
          showDatePicker
          min={min}
          max={max}
        />
      ) : null}
    </>
  );
};
export default DatePicker;