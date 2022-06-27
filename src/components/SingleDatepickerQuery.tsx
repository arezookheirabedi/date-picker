import React, {useEffect, useState} from 'react';
// @ts-ignore
import moment from 'moment-jalaali';
import DatePickerModal from 'src/components/SingleDatePickerModal';
import Calendar from 'src/components/Calendar/SingleCalendar';

interface DatepickerProps {
  query: any;
  setQuery: any;
}

const DatepickerQuery: React.FC<DatepickerProps> = ({query, setQuery}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDay, setSelectedDay] = useState({
    to: null,
    clear: false,
  }) as any;

  const focusFromDate = () => {
    setShowDatePicker(true);
  };

  useEffect(() => {
    if (selectedDay.to) {
      const finalToDate = `${selectedDay.to.year}/${selectedDay.to.month}/${selectedDay.to.day}`;
      setQuery({
        ...query,
        to: moment(finalToDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
      });
    }
    if (selectedDay.clear) {
      setQuery({
        ...query,
        to: null,
      });
    }
  }, [selectedDay]);

  return (
    <>
      {showDatePicker ? (
        <DatePickerModal
          setSelectedDay={setSelectedDay}
          selectedDay={selectedDay}
          setShowDatePicker={setShowDatePicker}
          showDatePicker
        />
      ) : null}
      <Calendar action={focusFromDate} to={selectedDay.to} setSelectedDay={setSelectedDay} />
    </>
  );
};

export default DatepickerQuery;
