import React, {useEffect, useState} from 'react';
// @ts-ignore
// import moment from 'moment-jalaali';
import axios from 'axios';
import {useHistory, useLocation} from 'react-router-dom';
// import DatePickerModal from '../../DatePickerModal';
// import calendar from '../../../assets/images/icons/calendar.svg';
import Charts from '../../Charts';
import {sideCities} from '../../../helpers/utils';
// import Calendar from '../../Calendar';
import Spinner from '../../Spinner';
import {EERRORS} from "../../../constants/errors.enum";
import RetryButton from "../../RetryButton";

const {Stacked} = Charts;

interface OverviewPaasengersVaccinePerDosesProvinceProps {
  cityTitle: string;
}

const OverviewPassengersVaccinePerDosesProvince: React.FC<OverviewPaasengersVaccinePerDosesProvinceProps> =
  ({cityTitle}) => {
    const {CancelToken} = axios;
    const source = CancelToken.source();
    const location = useLocation();
    const history = useHistory();
    const [categories, setCategories] = useState<any[]>([]);
    const [dataset, setDataset] = useState<any[]>([]);
    // const [showDatePicker, setShowDatePicker] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [loading, setLoading] = useState(false);
    // const [selectedDayRange, setSelectedDayRange] = useState({
    //   from: null,
    //   to: null,
    // }) as any;

    // const focusFromDate = () => {
    //   setShowDatePicker(true);
    // };

    // eslint-disable-next-line
    const [query, setQuery] = useState({
      from: null,
      to: null,
      retry : false
    });

    // eslint-disable-next-line


    // useEffect(() => {
    //   if (selectedDayRange.from && selectedDayRange.to) {
    //     const finalFromDate = `${selectedDayRange.from.year}/${selectedDayRange.from.month}/${selectedDayRange.from.day}`;
    //     const finalToDate = `${selectedDayRange.to.year}/${selectedDayRange.to.month}/${selectedDayRange.to.day}`;
    //     // const m = moment(finalFromDate, 'jYYYY/jM/jD'); // Parse a Jalaali date
    //     // console.log(moment(finalFromDate, 'jYYYY/jM/jD').format('YYYY-M-DTHH:mm:ss'));
    //     setQuery({
    //       ...query,
    //       from: moment(finalFromDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
    //       to: moment(finalToDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
    //     });
    //   }
    //   if (selectedDayRange.clear) {
    //     setQuery({
    //       ...query,
    //       from: null,
    //       to: null,
    //     });
    //   }
    // }, [selectedDayRange]);

    return (
      <fieldset className="text-center border rounded-xl p-4 mb-16">
        <legend className="text-black mx-auto px-3">
          نگاه کلی به وضعیت مسافران استان {cityTitle}
        </legend>
        <div className="flex flex-col align-center justify-center w-full rounded-lg bg-white p-4 shadow">
          <div className="flex items-center justify-between mb-10 mt-6 px-8">
            <div className="flex align-center justify-between w-3/4">
              <div className="flex align-center justify-between">
                {/* {showDatePicker ? (
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
                /> */}
              </div>
            </div>

            <div className="w-2/4">
              <div className="flex flex-col justify-end lg:flex-row text-xs text-gray-600 space-y-4 lg:space-y-0 lg:space-x-2 rtl:space-x-reverse">
                <div className="flex flex-col justify-end md:flex-row space-y-4 md:space-y-0 md:space-x-2 rtl:space-x-reverse">
                  <div className="inline-flex flex-col justify-center items-center space-y-2">
                    <div className="w-20 h-2 rounded" style={{backgroundColor: '#FF0060'}} />
                    <span>واکسن نزده</span>
                  </div>
                  <div className="inline-flex flex-col justify-center items-center space-y-2">
                    <div className="w-20 h-2 rounded" style={{backgroundColor: '#716DE3'}} />
                    <span>دوز پنجم</span>
                  </div>
                  <div className="inline-flex flex-col justify-center items-center space-y-2">
                    <div className="w-20 h-2 rounded" style={{backgroundColor: '#BFDDE7'}} />
                    <span>دوز چهارم</span>
                  </div>
                  <div className="inline-flex flex-col justify-center items-center space-y-2">
                    <div className="w-20 h-2 rounded" style={{backgroundColor: '#004D65'}} />
                    <span>دوز سوم</span>
                  </div>
                </div>
                <div className="flex flex-col justify-end md:flex-row space-y-4 md:space-y-0 md:space-x-2 rtl:space-x-reverse">
                  <div className="inline-flex flex-col justify-center items-center space-y-2">
                    <div className="w-20 h-2 rounded" style={{backgroundColor: '#209F92'}} />
                    <span>دوز دوم</span>
                  </div>
                  <div className="inline-flex flex-col justify-center items-center space-y-2">
                    <div className="w-20 h-2 rounded" style={{backgroundColor: '#F3BC06'}} />
                    <span>دوز اول</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {loading && (
            <div className="p-40">
              <Spinner/>
            </div>
          )}
          {errorMessage && !loading &&(
            <div className="p-40">
              <div className="text-red-500">{errorMessage}</div>
              <RetryButton setQuery={setQuery}/>
            </div>
          )}
          {!loading && dataset.length > 0 && !errorMessage && (
            <Stacked data={dataset} categories={categories} notPercent />
          )}
          {dataset.length === 0 && !loading && !errorMessage && (
            <div className="p-40 text-red-500">موردی برای نمایش وجود ندارد.</div>
          )}
        </div>
      </fieldset>
    );
  };

export default OverviewPassengersVaccinePerDosesProvince;
