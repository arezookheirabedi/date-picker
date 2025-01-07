import React, {useEffect, useState} from "react";
// @ts-ignore
import moment from 'moment-jalaali';

import DatePickerModal from "./DatePickerModal";

interface DatepickerProps {
  query: any,
  setQuery: any,
  minDate?: any,
 maxDate ?: any
}

const DatepickerQuery: React.FC<DatepickerProps> = ({query, setQuery,minDate,maxDate}) => {

  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null,
    clear: false,
  }) as any;

  

  useEffect(() => {
    if (selectedDayRange.from && selectedDayRange.to) {
      const finalFromDate = `${selectedDayRange.from.year}/${selectedDayRange.from.month}/${selectedDayRange.from.day}`;
      const finalToDate = `${selectedDayRange.to.year}/${selectedDayRange.to.month}/${selectedDayRange.to.day}`;
      setQuery({
        ...query,
        from: moment(finalFromDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
        to: moment(finalToDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
      });
    }
    if (selectedDayRange.clear) {
      setQuery({
        ...query,
        from: null,
        to: null,
      });
    }
  }, [selectedDayRange]);
const handelCancel=()=>{
  setQuery({
    ...query,
    from: null,
    to: null,
  });
}

  return (
    <>
        <DatePickerModal
          setSelectedDayRange={setSelectedDayRange}
          selectedDayRange={selectedDayRange}
          handelCancel={handelCancel}
          minDate={minDate}
          maxDate={maxDate}
        />
  
    </>
  )
}


export default DatepickerQuery;