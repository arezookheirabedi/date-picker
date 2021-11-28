import React, {useState} from "react";
import {IDetail} from "../Charts/Pyramid";
import Charts from "../Charts";
import DatePickerModal from "../DatePickerModal";
import {toPersianDigit} from "../../helpers/utils";
import calendar from "../../assets/images/icons/calendar.svg";

const {Pyramid} = Charts;
const pyramidData: Array<IDetail> = [
  {
    title: 'اسنپ',
    percentage: 90,
    color: '#049975'
  },
  {
    title: 'تپسی',
    percentage: 80,
    color: '#00F1E3'
  },
  {
    title: 'تاکسی پلاک ع',
    percentage: 70,
    color: '#4EC4F2'
  },
  {
    title: 'تاکسی پلاک ت',
    percentage: 60,
    color: '#9D19FA'
  },
  {
    title: 'سرویس مدارس',
    percentage: 50,
    color: '#F534DB'
  },
  {
    title: 'تاکسی فرودگاهی',
    percentage: 40,
    color: '#F5DF34'
  },
  {
    title: 'اتوبوس رانی',
    percentage: 30,
    color: '#FE8007'
  }
];
const TestsInTransport = ()=>{
  const [showDatePicker, setShowDatePicker] = useState(false);
  // eslint-disable-next-line
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: {day: 1, month: 9, year: 1400},
    to: {day: 20, month: 9, year: 1400}
  }) as any;

  const focusFromDate = () => {
    setShowDatePicker(true);
  }

  const generateFromDate: any = () => {
    // eslint-disable-next-line
    return selectedDayRange.from ? selectedDayRange.from.year + '/' + selectedDayRange.from.month + '/' + selectedDayRange.from.day : '';
  }

  const generateToDate: any = () => {
    // eslint-disable-next-line
    return selectedDayRange.to ? selectedDayRange.to.year + '/' + selectedDayRange.to.month + '/' + selectedDayRange.to.day : '';
  }

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">آزمایش در حمل و نقل</legend>
      <div className="flex flex-col align-center justify-center w-full rounded-xl bg-white p-4 shadow">
        <div className="flex align-center justify-start">
          {showDatePicker ? <DatePickerModal setSelectedDayRange={setSelectedDayRange} selectedDayRange={selectedDayRange}
                                             setShowDatePicker={setShowDatePicker} showDatePicker/> : null}
          <div className="relative z-20 inline-block text-left shadow-custom rounded-lg px-4 py-1">
            <div
              className="inline-flex justify-center items-center w-full py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 cursor-pointer"
              onClick={focusFromDate}
            >
                    <span className="ml-4 whitespace-nowrap truncate text-xs">
                      {toPersianDigit(generateFromDate())}
                     </span>
              <img src={calendar} alt="x" className="w-5 h-5"/>
            </div>
          </div>
          <div className="flex items-center justify-start mx-4">
            <span className="dash-separator"/>
          </div>
          <div className="shadow-custom rounded-lg px-4 py-1">
            <div
              className="flex justify-center items-center w-full py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 cursor-pointer"
              onClick={focusFromDate}
            >
                    <span className="ml-4 whitespace-nowrap truncate text-xs">
                      {toPersianDigit(generateToDate())}
                     </span>
              <img src={calendar} alt="x" className="w-5 h-5"/>
            </div>
          </div>
        </div>
        <Pyramid data={pyramidData}/>
      </div>

    </fieldset>
  )
}

export default TestsInTransport;