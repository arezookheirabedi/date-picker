import React, {useState} from "react";

import {Menu} from "@headlessui/react";
import {ReactComponent as DownIcon} from "../../assets/images/icons/down.svg";
import DatePickerModal from "../DatePickerModal";
import calendar from "../../assets/images/icons/calendar.svg";
import RangeDateSliderFilter from "../RangeDateSliderFliter";
import Charts from "../Charts";
import {toPersianDigit} from "../../helpers/utils";

const {Line} = Charts;
const transportationType = ['کل حمل و نقل', 'اسنپ', 'تپسی', 'تاکسی پلاک ع', 'تاکسی پلاک ت', 'سرویس مدارس', 'تاکسی فرودگاهی', 'اتوبوس رانی'];

const OverviewPublicPatients = ()=>{
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
      <legend className="text-black mx-auto px-3">نگاه کلی مبتلایان حمل و نقل عمومی</legend>
      <div className="flex flex-col align-center justify-center w-full rounded-lg bg-white p-4 shadow">
        <div className="flex items-center justify-between mb-10 mt-6">
          <div className="flex align-center justify-between w-3/4 px-8">
            <Menu as="div" className="relative z-20 inline-block text-left shadow-custom rounded-lg px-5 py-1 ">
              <div>
                <Menu.Button
                  className="inline-flex justify-between items-center w-full py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                  {/* <div className="flex items-center flex-row-reverse xl:flex-row"> */}
                  {/* <img src={avatar} alt="z" className="w-5 h-5" /> */}
                  <span className="ml-10 whitespace-nowrap truncate">اسنپ</span>
                  <DownIcon className="h-2 w-2.5 mr-2"/>
                </Menu.Button>
              </div>

              <Menu.Items
                className="z-40 absolute left-0 xl:right-0 max-w-xs mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1 ">
                  {
                    transportationType.map((value: any) => {
                      return (<Menu.Item>
                        {({active}) => (
                          <button
                            type="button"
                            className={`${
                              active ? 'bg-gray-100' : ''
                            } text-gray-900 group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                          >
                            {/* <IconWrapper className="w-4 h-4 ml-3" name="exit" /> */}
                            {value}
                          </button>
                        )}
                      </Menu.Item>)
                    })
                  }

                </div>
              </Menu.Items>
            </Menu>
            <div className="flex align-center justify-between">
              {showDatePicker ?
                <DatePickerModal setSelectedDayRange={setSelectedDayRange} selectedDayRange={selectedDayRange}
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
              <div className=" shadow-custom rounded-lg px-4 py-1">
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
          </div>

          <div className="w-1/4">
            <RangeDateSliderFilter/>
          </div>
        </div>

        <Line/>
      </div>
    </fieldset>
  )
}

export default OverviewPublicPatients