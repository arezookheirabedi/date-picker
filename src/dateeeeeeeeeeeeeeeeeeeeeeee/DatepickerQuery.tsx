import React, {useEffect, useState} from "react";
// @ts-ignore
import moment from 'moment-jalaali';

import DatePickerModal from "./DatePickerModal";
import Calendar from '../shared/datepicker/Calendar';

interface DatepickerProps {
  query: any,
  setQuery: any
}

const DatepickerQuery: React.FC<DatepickerProps> = ({query, setQuery}) => {

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null,
    clear: false,
  }) as any;

  const focusFromDate = () => {
    setShowDatePicker(true);
  }

  useEffect(() => {
    if (selectedDayRange.from && selectedDayRange.to) {
      const finalFromDate = `${selectedDayRange.from.year}/${selectedDayRange.from.month}/${selectedDayRange.from.day}`;
      const finalToDate = `${selectedDayRange.to.year}/${selectedDayRange.to.month}/${selectedDayRange.to.day}`;
      // const m = moment(finalFromDate, 'jYYYY/jM/jD'); // Parse a Jalaali date
      // console.log(moment(finalFromDate, 'jYYYY/jM/jD').format('YYYY-M-DTHH:mm:ss'));
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


  return (
    <>
      {showDatePicker ? (
        <DatePickerModal
          setSelectedDayRange={setSelectedDayRange}
          selectedDayRange={selectedDayRange}
          setShowDatePicker={setShowDatePicker}
          showDatePicker
        />
      ) : null}
      <Calendar
        action={focusFromDate}
        from={selectedDayRange.from}
        to={selectedDayRange.to}
        setSelectedDayRange={setSelectedDayRange}
      />
    </>
  )
}


export default DatepickerQuery;