import React, {useEffect, useState} from 'react';
import {useHistory, useLocation} from "react-router-dom";
// @ts-ignore
import moment from 'moment-jalaali';
import Highcharts from "highcharts/highstock";
// import vaccineService from 'src/services/vaccine.service';
// import axios from 'axios';
import DatePickerModal from '../../DatePickerModal';
import calendar from '../../../assets/images/icons/calendar.svg';

import Charts from '../../Charts';
import {cancelTokenSource, sideCities, toPersianDigit} from '../../../helpers/utils';
import hcsService from "../../../services/hcs.service";
import Spinner from "../../Spinner";

// import Spinner from '../../Spinner';
const {HeadlessChart} = Charts;

const initialData = {
  categories: [],
  series: [
    {
      name: 'واکسیناسیون',
      color: {
        linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
        stops: [
          [0, '#175A76'], // start
          [1, '#7DA6B8'], // end
        ],
      },
      data: [
        {name: 'دوز اول', y: 0},
        {name: 'دوز دوم', y: 0},
        {name: 'دوز سوم', y: 0},
        {name: 'دوز چهارم', y: 0},
        {name: 'دوز پنجم', y: 0},
        {name: 'واکسن نزده ها', y: 0},
      ],
    },
  ]
} as any;

const converters = {
  fa(number: any) {
    return number.toString().replace(/\d/g, (d: any) => {
      return String.fromCharCode(d.charCodeAt(0) + 1728);
    });
  },
};

const optionChart = {
  chart: {
    renderTo: 'container',
    type: 'column',
    numberFormatter() {
      // eslint-disable-next-line prefer-rest-params
      const ret = Highcharts.numberFormat.apply(0, arguments as any);
      return converters.fa(ret);
    },
    events: {
      redraw: () => {
        // eslint-disable-next-line
        // console.log('redraw');
      },
    },
  },
  title: {
    text: '',
  },
  scrollbar: {
    enabled: true,
    barBackgroundColor: '#656565',
    barBorderColor: '#eee',
    barBorderRadius: 4,
    barBorderWidth: 0,
    height: 6,
    buttonArrowColor: '#eee',
    rifleColor: '#656565',
    buttonBackgroundColor: 'transparent',
    buttonBorderWidth: 0,
    buttonBorderRadius: 0,
    trackBackgroundColor: '#eee',
    trackBorderWidth: 0,
    trackBorderRadius: 4,
  },
  credits: {
    enabled: false,
  },
  plotOptions: {
    series: {
      borderRadius: 10,
    },
    column: {
      threshold: null,
      grouping: false,
      shadow: false,
      borderWidth: 0,
    },
  },
  yAxis: {
    gridLineDashStyle: 'dash',
    lineDashStyle: 'dash',
    lineColor: '#000000',
    lineWidth: 1,
    opposite: true,
    title: {
      enabled: false,
    },
  },
  legend: {
    enabled: false,
  },
  xAxis: {
    categories: [],
    type: 'category',
    labels: {
      rotation: 45,
    },
  },
  tooltip: {
    shared: true,
    useHTML: true,
    valueSuffix: ' نفر',
    style: {
      direction: 'rtl',
      textAlign: 'right',
      fontFamily: 'inherit',
      fontSize: 10,
    },
    borderWidth: 0,
  },
}

interface OverviewOfTripsMadeByPassengersByVehicleProvinceProps {
  cityTitle: any
}

const OverviewOfTripsMadeByPassengersByVehicleProvince: React.FC<OverviewOfTripsMadeByPassengersByVehicleProvinceProps> = ({cityTitle}) => {
  // const {CancelToken} = axios;
  // const source = CancelToken.source();
  // const history = useHistory();
  // const [categories, setCategories] = useState<any[]>();

  // eslint-disable-next-line
  const [dataset, setDataset] = useState<any[]>(initialData) as any;
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null) as any;
  const [loading, setLoading] = useState(false);
  const cancelToken = cancelTokenSource();

  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null,
  }) as any;

  const focusFromDate = () => {
    setShowDatePicker(true);
  };

  const generateFromDate: any = () => {
    // eslint-disable-next-line
    return selectedDayRange.from
      ? // eslint-disable-next-line
      selectedDayRange.from.year +
      '/' +
      selectedDayRange.from.month +
      '/' +
      selectedDayRange.from.day
      : '';
  };

  const generateToDate: any = () => {
    // eslint-disable-next-line
    return selectedDayRange.to
      ? // eslint-disable-next-line
      selectedDayRange.to.year + '/' + selectedDayRange.to.month + '/' + selectedDayRange.to.day
      : '';
  };

// eslint-disable-next-line
  const [queryParams, setQueryParams] = useState({
    from: null,
    to: null,
  });


  const clearSelectedDayRange = (e: any) => {
    e.stopPropagation();
    setSelectedDayRange({
      from: null,
      to: null,
      clear: true
    })
  };


  const getTripsCountCategoryBased = async (params: any, province: any) => {
    setLoading(true);
    try {
      const {data} = await hcsService.getTripsCountCategoryBased(
        {
          ...params,
          province
        },
        {cancelToken: cancelToken.token}
      );

      const categories: any = [];
      const newData: any = [];

      data.forEach((item: any) => {
        categories.push(item.categoryValue)
        newData.push({
          name: item.categories,
          y: item.count
        })
      })

      setDataset({
        categories,
        series: [
          {
            name: 'واکسیناسیون',
            color: {
              linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
              stops: [
                [0, '#175A76'], // start
                [1, '#7DA6B8'], // end
              ],
            },
            data: [...newData],
          },
        ]
      })
    } catch (error) {
      // eslint-disable-next-line
      setErrorMessage('خطا در اتصال به سرور');
    } finally {
      setLoading(false);
    }
  }

  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const provinceName = params.get('provinceName') || ('تهران' as any);
    const existsCity = sideCities.some((item: any) => {
      return item.name === provinceName;
    });

    if (existsCity) {
      getTripsCountCategoryBased(queryParams, provinceName);
    } else {
      history.push('/dashboard/passenger/province');
    }

    // getPcrResult();
    return () => {
      setDataset(initialData)
      // setGuildPcrInfo(initialPcrInfo);
    };
  }, [queryParams, location.search]);


  useEffect(() => {
    if (selectedDayRange.from && selectedDayRange.to) {
      const finalFromDate = `${selectedDayRange.from.year}/${selectedDayRange.from.month}/${selectedDayRange.from.day}`;
      const finalToDate = `${selectedDayRange.to.year}/${selectedDayRange.to.month}/${selectedDayRange.to.day}`;
      setQueryParams({
        ...queryParams,
        from: moment(finalFromDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
        to: moment(finalToDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
      });
    }
    if (selectedDayRange.clear) {
      setQueryParams({
        ...queryParams,
        from: null,
        to: null,
      });
    }
  }, [selectedDayRange]);


  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">
        نگاه کلی به سفرهای انجام شده مسافران به تفکیک وسیله در استان &nbsp;
        {cityTitle}
      </legend>
      <div className="flex flex-col align-center justify-center w-full rounded-lg bg-white p-4 shadow">
        <div className="flex items-center justify-between mb-10 mt-6 px-8">
          <div className="flex align-center justify-between w-3/4">
            <div className="flex align-center justify-between">
              {showDatePicker ? (
                <DatePickerModal
                  setSelectedDayRange={setSelectedDayRange}
                  selectedDayRange={selectedDayRange}
                  setShowDatePicker={setShowDatePicker}
                  showDatePicker
                />
              ) : null}
              <div className="relative z-20 inline-block text-left shadow-custom rounded-lg px-4 py-1">
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
                    <img src={calendar} alt="x" className="w-5 h-5"/>
                  )}
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
        {errorMessage && <div className="p-40 text-red-500">{errorMessage}</div>}
        {!loading && dataset.categories.length > 0 && !errorMessage && (
          <HeadlessChart data={dataset} optionsProp={optionChart}/>
        )}
        {dataset.categories.length === 0 && !loading && !errorMessage && (
          <div className="p-40 text-red-500">موردی برای نمایش وجود ندارد.</div>
        )}
      </div>
    </fieldset>
  )
}

export default OverviewOfTripsMadeByPassengersByVehicleProvince;

