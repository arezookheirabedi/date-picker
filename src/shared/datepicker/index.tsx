/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-undef-init */
import React, {useEffect, useRef, useState} from "react";
import dayjs from "dayjs";
import {Day} from "@hassanmojab/react-modern-calendar-datepicker";
import {DatePickerModal} from "../../dateeeeeeeeeeeeeeeeeeeeeeee/misagh-date-modal";

interface IProps extends React.HTMLProps<HTMLInputElement> {
    onChange: (date: any) => void;
    onBlur: () => void;
  selected?: any;
  error?: any;
  min?: any;
  max?: any;
  iClass?: any;
  placeholder?: any
}

const DatePicker: React.FC<IProps> = ({selected, min, max, iClass, placeholder, ...rest}) => {
  const ref = useRef<HTMLInputElement>(null);

  const [selectedDay, setSelectedDay] = useState<Day | null | undefined>(null);

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
    let defaultValue: Day | null | undefined = undefined;
    if (selected) {
      const date = dayjs(selected)
        .calendar("jalali")
        .format("YYYY-MM-DD")
        .split("-");

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
        <input
          type="text"
          aria-invalid={rest.error ? true : false}
          className={iClass}
          placeholder={placeholder||"انتخاب تاریخ"}
          // @ts-ignore
          value={
            selectedDay?`${selectedDay.year}-${selectedDay.month}-${selectedDay.day}`.toPersianDigits():""
          }
        />
      </div>

        <DatePickerModal
          setSelectedDay={setSelectedDay}
          selectedDay={selectedDay}
          showDatePicker
          min={min}
          max={max}
        />
    </>
  );
};
export default DatePicker;
