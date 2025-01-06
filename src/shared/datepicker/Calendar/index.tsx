import React from "react";
import {toPersianDigit} from "../../../helpers/utils";
import calendar from "../../assets/images/icons/calendar.svg";


const Calendar: React.FC<any> = ({action, from, to, setSelectedDayRange}) => {

  const makeAction = () => {
    action()
  }

  const generateToDate: any = () => {
    // eslint-disable-next-line
    return to
      ? // eslint-disable-next-line
      to.year + '/' + to.month + '/' + to.day
      : '';
  };

  const generateFromDate: any = () => {
    // eslint-disable-next-line
    return from
      ? // eslint-disable-next-line
      from.year +
      '/' +
      from.month +
      '/' +
      from.day
      : '';
  };

  const clearSelectedDayRange = (e: any) => {
    e.stopPropagation();
    setSelectedDayRange({
      from: null,
      to: null,
      clear: true
    })
  };

  return (
    <>
      <div className="relative z-20 inline-block text-left shadow-custom rounded-lg px-4 py-1">
        <div
          className="inline-flex justify-center items-center w-full py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 cursor-pointer"
          onClick={makeAction}
        >
          {from && (
            <span className="ml-4 whitespace-nowrap truncate text-xs">
                  {toPersianDigit(generateFromDate())}
                </span>
          )}
          {to || from ? (
            <button type="button" onClick={clearSelectedDayRange}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          ) : (
            <img src={calendar} alt="x" className="w-5 h-5"/>
          )}
        </div>
      </div>
      <div className="flex items-center justify-start mx-4">
        <span className="dash-separator"/>
      </div>
      <div className=" shadow-custom rounded-lg px-4 py-1">
        <div
          className="flex justify-center items-center w-full py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 cursor-pointer"
          onClick={makeAction}
        >
          {to && (
            <span className="ml-4 whitespace-nowrap truncate text-xs">
                  {toPersianDigit(generateToDate())}
                </span>
          )}
          {to || from ? (
            <button type="button" onClick={clearSelectedDayRange}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          ) : (
            <img src={calendar} alt="x" className="w-5 h-5"/>
          )}
        </div>
      </div>
    </>
  )
}

export default Calendar;
