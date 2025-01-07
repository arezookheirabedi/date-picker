/* eslint-disable consistent-return */
import React, { useState} from 'react';
 import {Calendar, Day} from "react-modern-calendar-datepicker";

 interface DatePickerModelProps {
  setSelectedDayRange: (range: { from: Day | null; to: Day | null }) => void;
  selectedDayRange: { from: Day | null; to: Day | null };
  handelCancel: () => void;
  minDate?: any;
  maxDate?: any;
}
const DatePickerModel: React.FC<DatePickerModelProps> = ({
  setSelectedDayRange,
  selectedDayRange,
  handelCancel,
  minDate,
 maxDate 
 
}) => {
  const [error, setError] = useState<string | null>(null);
  const [innerDayRange, setInnerDayRange] = useState({
    from: selectedDayRange.from,
    to: selectedDayRange.to,
  }) as any;



  const setDate = (e: any) => {
    if (e.from && e.to) {
      setError(null);
    }
    // eslint-disable-next-line
    setInnerDayRange({...setInnerDayRange, ['from']: e.from, ['to']: e.to});
  };

  const confirmDate = () => {
    if (!innerDayRange.from || !innerDayRange.to) {
      setError('لطفا بازه زمانی را درست انتخاب کنید.');
      return null;
    }
    setSelectedDayRange({
      from: innerDayRange.from,
      to: innerDayRange.to,
    });
  
  };
  const cancel = () => {
 
    setInnerDayRange({...setInnerDayRange, 'from': null, 'to': null});
   handelCancel()
  
  };


  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white border border-black rounded-2xl p-4">
        <Calendar
          value={innerDayRange}
          onChange={setDate}
          calendarClassName="calendar-modal"
          calendarRangeStartClassName="calendar-range-start"
          calendarRangeBetweenClassName="calendar-range-between"
          calendarRangeEndClassName="calendar-range-end"
          shouldHighlightWeekends
          locale="fa"
          minimumDate={minDate}
          maximumDate={maxDate}
        />
          <div className="mt-4 flex justify-between">
          <button
            type="button"
            className="bg-white hover:bg-gray-200 text-black font-bold py-4 px-4  rounded-2xl border border-black w-1/3 mx-2 text-lg"
            onClick={confirmDate}
          >
            تایید
          </button>

          <button
            type="button"
            className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-2xl  w-1/3 mx-2 text-lg"
            onClick={cancel}
          >
            انصراف
          </button>
        </div>
      </div>
    </div>
  );
};

export default DatePickerModel;
