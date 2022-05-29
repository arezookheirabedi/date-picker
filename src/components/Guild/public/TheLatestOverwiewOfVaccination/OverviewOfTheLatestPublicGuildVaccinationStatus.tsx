import React, {useEffect, useState} from 'react';
// @ts-ignore
import moment from 'moment-jalaali';
import Highcharts from 'highcharts/highstock';
// import vaccineService from 'src/services/vaccine.service';
// import axios from 'axios';
import {useLocation} from 'react-router-dom';
import Charts from 'src/components/Charts';
import calendar from 'src/assets/images/icons/calendar.svg';
import {toPersianDigit} from 'src/helpers/utils';
import DatePickerModal from 'src/components/DatePickerModal';
import {converters} from '../constant';

// import Spinner from '../../Spinner';
const {HeadlessChart} = Charts;

const initialData = {
  categories: ['دوز اول', 'دوز دوم', 'دوز سوم', 'دوز چهارم', 'دوز پنجم', 'واکسن نزده ها'],
  series: [
    {
      name: 'واکسیناسیون',
      data: [
        {name: 'دوز اول', y: 30, color: '#F3BC06'},
        {name: 'دوز دوم', y: 40, color: '#209F92'},
        {name: 'دوز سوم', y: 35, color: '#004D65'},
        {name: 'دوز چهارم', y: 60, color: '#BFDDE7'},
        {name: 'دوز پنجم', y: 80, color: '#716DE3'},
        {name: 'واکسن نزده ها', y: 50, color: '#FF0060'},
      ],
    },
  ],
} as any;

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
};

const OverviewOfTheLatestPublicGuildVaccinationStatus = () => {
  // const {CancelToken} = axios;
  // const source = CancelToken.source();
  const location = useLocation();
  // const history = useHistory();
  // const [categories, setCategories] = useState<any[]>();
  const [dataset, setDataset] = useState<any[]>(initialData);
  const [showDatePicker, setShowDatePicker] = useState(false);
  // const [errorMessage, setErrorMessage] = useState(null);
  // const [loading, setLoading] = useState(false);

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
    province: 'تهران',
  });

  // // eslint-disable-next-line
  // const getLinearOverview = async (params: any) => {
  //   setLoading(true);
  //   setErrorMessage(null);
  //   try {
  //     const {data} = await vaccineService.membersGeneral(params,{CancelToken:source.token})
  //     // const {data} = await hcsService.dosesTagBased(params);
  //     const dataChart: any = {
  //       null: 5,
  //       '0': Number(data.totalNonVaccinesCount || 0), // واکسن نزدع
  //       '1': Number(data.doses[1] || 0), // دوز اول
  //       '2': Number(data.doses[2] || 0), // دوز دوم
  //       '3': Number(data.doses[3] || 0), // دوز سوم
  //       '4': Number(data.gtDoses[3] || 0) //  بیش از سه دوز
  //
  //     };
  //
  //     // eslint-disable-next-line
  //     let firstDose: number = 0;
  //     // eslint-disable-next-line
  //     let secondDose: number = 0;
  //     // eslint-disable-next-line
  //     let thirdDose: number = 0;
  //     // eslint-disable-next-line
  //     let moreThanThreeDose: number = 0;
  //     // eslint-disable-next-line
  //     let noDose: number = 0;
  //
  //     Object.entries(dataChart).forEach(([key, value]: any[]) => {
  //       switch (key) {
  //         case 'null':
  //           // noDose += value;
  //           break;
  //         case '0':
  //           noDose += value;
  //           break;
  //         case '1':
  //           firstDose += value;
  //           break;
  //         case '2':
  //           secondDose += value;
  //           break;
  //         case '3':
  //           thirdDose += value;
  //           break;
  //         case '4':
  //           moreThanThreeDose += value;
  //           break;
  //
  //         default:
  //           break;
  //       }
  //     });
  //
  //     setDataset([
  //       {
  //         name: 'واکسیناسیون',
  //         type: 'column',
  //         data: [
  //           {name: 'واکسن نزده', y: noDose, color: '#FF0060'},
  //           {name: 'دوز اول', y: firstDose, color: '#F3BC06'},
  //           {name: 'دوز دوم', y: secondDose, color: '#209F92'},
  //           {name: 'دوز سوم', y: thirdDose, color: '#004D65'},
  //           {name: 'بیش از ۳ دوز', y: moreThanThreeDose, color: '#BFDDE7'},
  //         ],
  //       },
  //     ]);
  //
  //     setCategories(['واکسن نزده', 'دوز اول', 'دوز دوم', 'دوز سوم', 'بیش از ۳ دوز']);
  //   } catch (error: any) {
  //     setErrorMessage(error.message);
  //     // eslint-disable-next-line
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    // setDataset([
    //   {
    //     name: 'واکسیناسیون',
    //     type: 'column',
    //     data: [
    //       {name: 'دوز اول', y: 30, color: '#F3BC06'},
    //       {name: 'دوز دوم', y: 40, color: '#209F92'},
    //       {name: 'دوز سوم', y: 35, color: '#004D65'},
    //       {name: 'دوز چهارم', y: 60, color: '#BFDDE7'},
    //       {name: 'دوز پنجم', y: 80, color: '#716DE3'},
    //       {name: 'واکسن نزده ها', y: 50, color: '#FF0060'},
    //     ],
    //   },
    // ]);
    // setCategories(['دوز اول', 'دوز دوم', 'دوز سوم', 'دوز چهارم', 'دوز پنجم' , 'واکسن نزده ها']);
    // const params = new URLSearchParams(location.search);
    // const provinceName = params.get('provinceName') || ('تهران' as any);
    //
    // const existsCity = sideCities.some((item: any) => {
    //   return item.name === provinceName;
    // });
    //
    // let idSetTimeOut: any;
    // if (existsCity) {
    //   idSetTimeOut = setTimeout(() => {
    //     getLinearOverview({...queryParams, province: provinceName});
    //   }, 500);
    // } else {
    //   history.push('/dashboard/vaccination/province');
    // }
    //
    // return () => {
    //   if (existsCity) {
    //     source.cancel('Operation canceled by the user.');
    //     clearTimeout(idSetTimeOut);
    //     setDataset([])
    //
    //
    //   }
    // };
  }, [queryParams, location.search]);

  useEffect(() => {
    if (selectedDayRange.from && selectedDayRange.to) {
      const finalFromDate = `${selectedDayRange.from.year}/${selectedDayRange.from.month}/${selectedDayRange.from.day}`;
      const finalToDate = `${selectedDayRange.to.year}/${selectedDayRange.to.month}/${selectedDayRange.to.day}`;
      // const m = moment(finalFromDate, 'jYYYY/jM/jD'); // Parse a Jalaali date
      // console.log(moment(finalFromDate, 'jYYYY/jM/jD').format('YYYY-M-DTHH:mm:ss'));
      setQueryParams({
        ...queryParams,
        from: moment(finalFromDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
        to: moment(finalToDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
      });
    } else {
      setQueryParams({
        ...queryParams,
        from: null,
        to: null,
      });
    }
  }, [selectedDayRange]);

  const clearSelectedDayRange = (e: any) => {
    e.stopPropagation();
    setSelectedDayRange({
      from: null,
      to: null,
    });
  };

  useEffect(() => {
    setTimeout(() => {
      setDataset((prev: any) => {
        return {
          ...prev,
          categories: ['دوز اول', 'دوز دوم', 'دوز سوم', 'دوز چهارم', 'دوز پنجم', 'واکسن نزده ها'],
          series: [
            {
              name: 'واکسیناسیون',
              data: [
                {name: 'دوز اول', y: Math.trunc(Math.random() * 100), color: '#F3BC06'},
                {name: 'دوز دوم', y: Math.trunc(Math.random() * 100), color: '#209F92'},
                {name: 'دوز سوم', y: Math.trunc(Math.random() * 100), color: '#004D65'},
                {name: 'دوز چهارم', y: Math.trunc(Math.random() * 100), color: '#BFDDE7'},
                {name: 'دوز پنجم', y: Math.trunc(Math.random() * 100), color: '#716DE3'},
                {name: 'واکسن نزده ها', y: Math.trunc(Math.random() * 100), color: '#FF0060'},
              ],
            },
          ],
        };
      });
    }, 5000);
  }, [dataset]);

  return (
    <fieldset className="text-center  p-4 mb-16">
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
              </div>
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

        <HeadlessChart data={dataset} optionsProp={optionChart} />
        {/* {loading && (
          <div className="p-40">
            <Spinner />
          </div>
        )}
        {errorMessage && <div className="p-40 text-red-500">{errorMessage}</div>}
        {!loading && dataset.length > 0 && !errorMessage && (
          <Stacked data={dataset} categories={categories}  notPercent/>
        )}
        {dataset.length === 0 && !loading && !errorMessage && (
          <div className="p-40 text-red-500">موردی برای نمایش وجود ندارد.</div>
        )} */}
      </div>
    </fieldset>
  );
};

export default OverviewOfTheLatestPublicGuildVaccinationStatus;
