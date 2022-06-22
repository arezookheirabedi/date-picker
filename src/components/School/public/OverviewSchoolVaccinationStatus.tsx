import React, {useEffect, useState} from 'react';
// @ts-ignore
import moment from 'moment-jalaali';
import vaccineService from 'src/services/vaccine.service';
// import axios from 'axios';
// import DatePickerModal from '../../DatePickerModal';
// import calendar from '../../../assets/images/icons/calendar.svg';
import Charts from '../../Charts';
import {
  cancelTokenSource,
  msgRequestCanceled,
  //  toPersianDigit
} from '../../../helpers/utils';
import Spinner from '../../Spinner';

const {Stacked} = Charts;

interface OverviewPerProvinceProps {}

const OverViewToVaccinationStatus: React.FC<OverviewPerProvinceProps> = () => {
  const [dataset, setDataset] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  // eslint-disable-next-line
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null,
  }) as any;

  // const focusFromDate = () => {
  //   setShowDatePicker(true);
  // };

  // const generateFromDate: any = () => {
  //   return selectedDayRange.from
  //     ? // eslint-disable-next-line
  //       selectedDayRange.from.year +
  //         '/' +
  //         selectedDayRange.from.month +
  //         '/' +
  //         selectedDayRange.from.day
  //     : '';
  // };

  // const generateToDate: any = () => {
  //   return selectedDayRange.to
  //     ? // eslint-disable-next-line
  //       selectedDayRange.to.year + '/' + selectedDayRange.to.month + '/' + selectedDayRange.to.day
  //     : '';
  // };

  const [queryParams, setQueryParams] = useState({
    from: null,
    to: null,
    tags: [],
  });

  const cancelToken = cancelTokenSource();

  function cancelRequest() {
    cancelToken.cancel(msgRequestCanceled);
  }

  const getLinearOverview = async (params: any) => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const {data} = await vaccineService.dosesTagBased(params, {
        cancelToken: cancelToken.token,
      });

      const provinces: any[] = [];

      // eslint-disable-next-line
      let firstDose: any[] = [];
      // eslint-disable-next-line
      let secondDose: any[] = [];
      // eslint-disable-next-line
      let thirdDose: any[] = [];
      // eslint-disable-next-line
      let moreThanThreeDose: any[] = [];
      // eslint-disable-next-line
      let noDose: any[] = [];

      data.forEach((item: any, index: number) => {
        let more = 0;
        noDose.push(Number(item.totalNonVaccinesCount));
        // eslint-disable-next-line
        for (const [key, value] of Object.entries(item.doses)) {
          // if (Number(key) === 0) {
          //   noDose.push(Number(value));
          // }

          if (Number(key) === 1) {
            firstDose.push(Number(value));
          }

          if (Number(key) === 2) {
            secondDose.push(Number(value));
          }

          if (Number(key) === 3) {
            thirdDose.push(Number(value));
          }

          if (Number(key) !== 1 && key !== 'null' && Number(key) > 3) {
            more += Number(value);
          }
        }

        if (noDose.length < index + 1) noDose.push(0);
        if (firstDose.length < index + 1) firstDose.push(0);
        if (secondDose.length < index + 1) secondDose.push(0);
        if (thirdDose.length < index + 1) thirdDose.push(0);
        if (moreThanThreeDose.length < index + 1) moreThanThreeDose.push(more);

        provinces.push(item.province);
      });

      setDataset([
        {
          name: 'واکسن نزده',
          color: '#FF0060',
          data: [...noDose],
        },
        {
          name: 'دوز اول',
          color: '#F3BC06',
          data: [...firstDose],
        },
        {
          name: 'دوز دوم',
          color: '#209F92',
          data: [...secondDose],
        },
        {
          name: 'دوز سوم',
          color: '#004D65',
          data: [...thirdDose],
        },
        {
          name: 'بیش از ۳ دوز',
          color: '#BFDDE7',
          data: [...moreThanThreeDose],
        },
      ]);
      setCategories([...provinces]);
    } catch (error: any) {
      setErrorMessage(error.message);
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const idSetTimeOut = setTimeout(() => {
      getLinearOverview({...queryParams, tag: 'edu'});
    }, 500);

    return () => {
      clearTimeout(idSetTimeOut);
      cancelRequest();
      setDataset([]);
    };
  }, [queryParams]);

  useEffect(() => {
    if (selectedDayRange.from && selectedDayRange.to) {
      const finalFromDate = `${selectedDayRange.from.year}/${selectedDayRange.from.month}/${selectedDayRange.from.day}`;
      const finalToDate = `${selectedDayRange.to.year}/${selectedDayRange.to.month}/${selectedDayRange.to.day}`;
      setQueryParams({
        ...queryParams,
        from: moment(finalFromDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
        to: moment(finalToDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
        tags: [],
      });
    }
    if (selectedDayRange.clear) {
      setQueryParams({
        ...queryParams,
        from: null,
        to: null,
        tags: [],
      });
    }
  }, [selectedDayRange]);

  // const clearSelectedDayRange = (e: any) => {
  //   e.stopPropagation();
  //   setSelectedDayRange({
  //     from: null,
  //     to: null,
  //   });
  // };

  return (
    <fieldset className="mb-16 rounded-xl border p-4 text-center">
      <legend className="mx-auto px-3 text-black">
        نگاه کلی به وضعیت واکسیناسیون آموزش و پرورش کشور
      </legend>
      <div className="align-center flex w-full flex-col justify-center rounded-lg bg-white p-4 shadow">
        <div className="mb-10 mt-6 flex items-center justify-between px-8">
          <div className="align-center flex w-3/4 justify-between">
            <div className="align-center flex justify-between">
              {/* {showDatePicker ? (
                <DatePickerModal
                  setSelectedDayRange={setSelectedDayRange}
                  selectedDayRange={selectedDayRange}
                  setShowDatePicker={setShowDatePicker}
                  showDatePicker
                />
              ) : null} */}
              {/* <div className="relative z-20 inline-block text-left shadow-custom rounded-lg px-4 py-1">
                <div
                  className="inline-flex justify-center items-center w-full py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 cursor-pointer"
                  onClick={focusFromDate}
                >
                  {selectedDayRange.from && (
                    <span className="ml-4 whitespace-nowrap truncate text-xs">
                      {toPersianDigit(generateFromDate())}
                    </span>
                  )}
                  {selectedDayRange.to || selectedDayRange.from ? (
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
                    <img src={calendar} alt="x" className="w-5 h-5" />
                  )}
                </div>
              </div>
              <div className="flex items-center justify-start mx-4">
                <span className="dash-separator" />
              </div>
              <div className=" shadow-custom rounded-lg px-4 py-1">
                <div
                  className="flex justify-center items-center w-full py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 cursor-pointer"
                  onClick={focusFromDate}
                >
                  {selectedDayRange.to && (
                    <span className="ml-4 whitespace-nowrap truncate text-xs">
                      {toPersianDigit(generateToDate())}
                    </span>
                  )}
                  {selectedDayRange.to || selectedDayRange.from ? (
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
                    <img src={calendar} alt="x" className="w-5 h-5" />
                  )}
                </div>
              </div> */}
            </div>
          </div>

          <div className="w-2/4">
            <div className="flex flex-col justify-end space-y-4 text-xs text-gray-600 rtl:space-x-reverse lg:flex-row lg:space-y-0 lg:space-x-2">
              <div className="flex flex-col justify-end space-y-4 rtl:space-x-reverse md:flex-row md:space-y-0 md:space-x-2">
                <div className="inline-flex flex-col items-center justify-center space-y-2">
                  <div className="h-2 w-20 rounded" style={{backgroundColor: '#FF0060'}} />
                  <span>واکسن نزده</span>
                </div>
                <div className="inline-flex flex-col items-center justify-center space-y-2">
                  <div className="h-2 w-20 rounded" style={{backgroundColor: '#F3BC06'}} />
                  <span>دوز اول</span>
                </div>
                <div className="inline-flex flex-col items-center justify-center space-y-2">
                  <div className="h-2 w-20 rounded" style={{backgroundColor: '#209F92'}} />
                  <span>دوز دوم</span>
                </div>
              </div>
              <div className="flex flex-col justify-end space-y-4 rtl:space-x-reverse md:flex-row md:space-y-0 md:space-x-2">
                <div className="inline-flex flex-col items-center justify-center space-y-2">
                  <div className="h-2 w-20 rounded" style={{backgroundColor: '#004D65'}} />
                  <span>دوز سوم</span>
                </div>
                <div className="inline-flex flex-col items-center justify-center space-y-2">
                  <div className="h-2 w-20 rounded" style={{backgroundColor: '#BFDDE7'}} />
                  <span>بیش از ۳ دوز</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {loading && (
          <div className="p-40">
            <Spinner />
          </div>
        )}
        {errorMessage && <div className="p-40 text-red-500">{errorMessage}</div>}
        {!loading && dataset.length > 0 && !errorMessage && (
          <Stacked data={dataset} categories={categories} />
        )}
        {dataset.length === 0 && !loading && !errorMessage && (
          <div className="p-40 text-red-500">موردی برای نمایش وجود ندارد.</div>
        )}
        {/* <div className="flex justify-center items-center w-full">
          <Stacked data={dataset} categories={categories} />
        </div> */}
      </div>
    </fieldset>
  );
};

export default OverViewToVaccinationStatus;
