/* eslint-disable consistent-return */
import React, { Fragment, useState } from "react";
// import {Calendar} from "react-modern-calendar-datepicker";
import { Calendar } from "@hassanmojab/react-modern-calendar-datepicker";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";

export const DatePickerModal: React.FC<any> = ({
  setSelectedDay,
  selectedDay,
  min = undefined,
  max = undefined,
}) => {
  const [error, setError] = useState<string | null>(null);
  const [innerDay, setInnerDay] = useState(selectedDay || null);



  const setDate = (e: any) => {
    if (e) {
      setError(null);
    }
    // eslint-disable-next-line
    setInnerDay(e);
  };

  const confirmDate = () => {
    if (!innerDay) {
         setError('لطفا بازه زمانی را درست انتخاب کنید.');
      return null;
    }
    setSelectedDay(innerDay);
  };

  const cancel = () => {
    if (!innerDay) {
       setError('لطفا بازه زمانی را درست انتخاب کنید.');
      return null;
    }
    setSelectedDay(null);
  };

  const renderFooterDatePicker = () => {
    return (
  <>
        <button
          type="button"
          className="rounded-lg bg-sky-500 !py-2 !px-16 text-sm text-white shadow"
          onClick={confirmDate}
        >
          تائید
        </button>
        <button
          type="button"
          className="rounded-lg bg-sky-500 !py-2 !px-16 text-sm text-white shadow"
          onClick={cancel}
        >
          cancel
        </button>
    </>
      
    );
  };

  return (
    <>
     
                  <Calendar
                    value={innerDay}
                    calendarClassName="calendar-modal !shadow-none m-auto"
                    onChange={setDate}
                    renderFooter={renderFooterDatePicker}
                    calendarRangeStartClassName="calendar-range-start"
                    calendarRangeBetweenClassName="calendar-range-between"
                    calendarRangeEndClassName="calendar-range-end"
                    shouldHighlightWeekends
                    colorPrimary="rgb(14 165 233)"
                    colorPrimaryLight="rgb(14 165 233)"
                    locale="fa"
                    minimumDate={min}
                    maximumDate={max}
                  />
                  <div>{error}</div>
                 
    </>
  );
};

