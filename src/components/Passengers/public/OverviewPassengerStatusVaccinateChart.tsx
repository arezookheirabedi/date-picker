import React, {useEffect, useState} from 'react';
// @ts-ignore
import moment from 'moment-jalaali';
import Highcharts from "highcharts/highstock";
// import vaccineService from 'src/services/vaccine.service';
// import axios from 'axios';
import DatePickerModal from '../../DatePickerModal';
import {toPersianDigit} from '../../../helpers/utils';
import calendar from '../../../assets/images/icons/calendar.svg';
// import Spinner from '../../Spinner';
import Charts from '../../Charts';


const {HeadlessChart} = Charts;

const initialData = {
  categories: ['تهران', 'خراسان رضوی', 'اصفهان', 'فارس', 'خوزستان', 'آذربایجان شرقی', 'مازندران', 'آذربایجان غربی', 'کرمان', 'گیلان', 'البرز', 'سیستان و بلوچستان', 'کرمانشاه', 'هرمزگان', 'گلستان', 'همدان', 'لرستان', 'مرکزی', 'کردستان', 'قزوین', 'اردبيل', 'یزد', 'قم', 'زنجان', 'بوشهر', 'چهارمحال و بختیاری', 'خراسان شمالی', 'خراسان جنوبی', 'سمنان', 'کهگیلویه و بویراحمد', 'ایلام'],
  series: [
    {
      name: 'واکسن نزده',
      color: '#FF0060',
      data: [100000, 150000, 53735, 55179, 68494, 39729, 6668, 22471, 24918, 35147, 53685, 38823, 12285, 33724, 1550, 19391, 32050, 15501, 17856, 10587, 15982, 17003, 18431, 10741, 9777, 4833, 5980, 6312, 6693, 7481, 9053],
    },
    {
      name: 'دوز اول',
      color: '#F3BC06',
      data: [1000000, 950000, 3952432, 3741394, 3158926, 3013485, 2659416, 2435827, 2153507, 2120640, 2082688, 1778449, 1415348, 1367807, 1314939, 1275993, 1223690, 1113057, 1070036, 988541, 932262, 888320, 809416, 806546, 797276, 666791, 642545, 550605, 542189, 516757, 407424],
    },
    {
      name: 'دوز دوم',
      color: '#209F92',
      data: [800000, 750000, 3632019, 3506380, 2758665, 2843383, 2519908, 2250866, 1969160, 2021944, 1939778, 1533717, 1302749, 1259730, 1194796, 1179806, 1109699, 1043458, 962752, 911895, 867004, 809516, 715786, 759066, 730534, 626414, 596822, 507991, 510790, 477946, 375940],
    },
    {
      name: 'دوز سوم',
      color: '#004D65',
      data: [600000, 650000, 1585440, 1710132, 1078327, 1551940, 1410920, 1010415, 830194, 1053376, 923226, 652347, 630781, 626908, 492673, 552121, 494537, 517741, 378825, 420373, 416050, 337008, 255532, 406438, 295530, 306338, 275739, 203110, 269510, 218543, 155967],
    },
    {
      name: 'دوز چهارم',
      color: '#BFDDE7',
      data: [400000, 300000, 1754, 2824, 2786, 1999, 57049, 689, 670, 2186, 2665, 921, 1132, 907, 6503, 680, 630, 723, 313, 303, 308, 470, 342, 511, 183, 520, 258, 76, 453, 387, 96],
    },
    {
      name: 'دوز پنجم',
      color: '#716DE3',
      data: [200000, 100000, 1754, 2824, 2786, 1999, 57049, 689, 670, 2186, 2665, 921, 1132, 907, 6503, 680, 630, 723, 313, 303, 308, 470, 342, 511, 183, 520, 258, 76, 453, 387, 96],
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
    // zoomType: 'x'
    // styledMode: true
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
  // colors: ['#FFC700', '#883BA4', '#175A76', '#00AAB1'],
  plotOptions: {
    series: {
      // stacking: 'percent',
      // stacking: `${notPercent?'normal':'percent'}`,
      stacking: 'percent',
      // borderRadius: 5,
      pointWidth: 15,
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
    // lineDashStyle: 'dash',
    // lineColor: '#000000',
    // lineWidth: 1
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
    // headerFormat: `<div style="min-width:220px">{point.x}</div>`
  },

  series: [],
}

const OverViewPassengerStatusVaccinateChart = () => {
  // const {CancelToken} = axios;
  // const source = CancelToken.source();
  const [dataset] = useState<any[]>(initialData);
  // const [categories, setCategories] = useState<any[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  // eslint-disable-next-line
  const [errorMessage, setErrorMessage] = useState(null);
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

  const [queryParams, setQueryParams] = useState({
    from: null,
    to: null,
    tags: [],
  });

  // // eslint-disable-next-line
  // const getLinearOverview = async () => {
  //   setLoading(true);
  //   setErrorMessage(null);
  //   try {
  //     const {data} = await vaccineService.dosesTagBased({}, {cancelToken: source.token});
  //
  //     const provinces: any[] = [];
  //
  //     // eslint-disable-next-line
  //     let firstDose: any[] = [];
  //     // eslint-disable-next-line
  //     let secondDose: any[] = [];
  //     // eslint-disable-next-line
  //     let thirdDose: any[] = [];
  //     // eslint-disable-next-line
  //     let moreThanThreeDose: any[] = [];
  //     // eslint-disable-next-line
  //     let noDose: any[] = [];
  //
  //     data.forEach((item: any, index: number) => {
  //       let more = 0;
  //
  //       // eslint-disable-next-line
  //       for (const [key, value] of Object.entries(item.doses)) {
  //
  //         if (Number(key) === 1) {
  //           firstDose.push(Number(value));
  //         }
  //
  //         if (Number(key) === 2) {
  //           secondDose.push(Number(value));
  //         }
  //
  //         if (Number(key) === 3) {
  //           thirdDose.push(Number(value));
  //         }
  //
  //         if (Number(key) !== 0 && key !== 'null' && Number(key) > 3) {
  //           more += Number(value);
  //         }
  //       }
  //
  //       noDose.push(Number(item.totalNonVaccinesCount || 0));
  //
  //       if (noDose.length < index + 1) noDose.push(0);
  //       if (firstDose.length < index + 1) firstDose.push(0);
  //       if (secondDose.length < index + 1) secondDose.push(0);
  //       if (thirdDose.length < index + 1) thirdDose.push(0);
  //       if (moreThanThreeDose.length < index + 1) moreThanThreeDose.push(more);
  //
  //       provinces.push(item.province);
  //     });
  //
  //     console.log('no dose => ',noDose)
  //     console.log('first dose => ',firstDose)
  //     console.log('second dose => ',secondDose)
  //     console.log('third dose => ',thirdDose)
  //     console.log('more than => ',moreThanThreeDose)
  //     console.log('provinces => ',provinces)
  //
  //     setDataset([
  //       {
  //         name: 'واکسن نزده',
  //         color: '#FF0060',
  //         data: [...noDose],
  //       },
  //       {
  //         name: 'دوز اول',
  //         color: '#F3BC06',
  //         data: [...firstDose],
  //       },
  //       {
  //         name: 'دوز دوم',
  //         color: '#209F92',
  //         data: [...secondDose],
  //       },
  //       {
  //         name: 'دوز سوم',
  //         color: '#004D65',
  //         data: [...thirdDose],
  //       },
  //       {
  //         name: 'بیش از ۳ دوز',
  //         color: '#BFDDE7',
  //         data: [...moreThanThreeDose],
  //       },
  //     ]);
  //     setCategories([...provinces]);
  //   } catch (error: any) {
  //     setErrorMessage(error.message);
  //     // eslint-disable-next-line
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   const idSetTimeOut = setTimeout(() => {
  //     getLinearOverview();
  //   }, 500);
  //
  //   return () => {
  //     clearTimeout(idSetTimeOut);
  //     source.cancel('Operation canceled by the user.');
  //     setDataset([]);
  //   };
  // }, []);


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
        tags: [],
      });
    } else {
      setQueryParams({
        ...queryParams,
        from: null,
        to: null,
        tags: [],
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
  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">نگاه کلی به وضعیت واکسیناسیون مسافران</legend>
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

          <div className="w-2/4">
            <div
              className="flex flex-col justify-end lg:flex-row text-xs text-gray-600 space-y-4 lg:space-y-0 lg:space-x-2 rtl:space-x-reverse">
              <div
                className="flex flex-col justify-end md:flex-row space-y-4 md:space-y-0 md:space-x-2 rtl:space-x-reverse">
                <div className="inline-flex flex-col justify-center items-center space-y-2">
                  <div className="w-20 h-2 rounded" style={{backgroundColor: '#FF0060'}}/>
                  <span>واکسن نزده</span>
                </div>
                <div className="inline-flex flex-col justify-center items-center space-y-2">
                  <div className="w-20 h-2 rounded" style={{backgroundColor: '#716DE3'}}/>
                  <span>دوز پنجم</span>
                </div>
                <div className="inline-flex flex-col justify-center items-center space-y-2">
                  <div className="w-20 h-2 rounded" style={{backgroundColor: '#BFDDE7'}}/>
                  <span>دوز چهارم</span>
                </div>
                <div className="inline-flex flex-col justify-center items-center space-y-2">
                  <div className="w-20 h-2 rounded" style={{backgroundColor: '#004D65'}}/>
                  <span>دوز سوم</span>
                </div>
                <div className="inline-flex flex-col justify-center items-center space-y-2">
                  <div className="w-20 h-2 rounded" style={{backgroundColor: '#209F92'}}/>
                  <span>دوز دوم</span>
                </div>
                <div className="inline-flex flex-col justify-center items-center space-y-2">
                  <div className="w-20 h-2 rounded" style={{backgroundColor: '#F3BC06'}}/>
                  <span>دوز اول</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <Stacked data={dataset} categories={categories} /> */}
        <HeadlessChart data={dataset} optionsProp={optionChart}/>

        {/* {loading && (
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
        )} */}
        {/* <div className="flex justify-center items-center w-full">
          <Stacked data={dataset} categories={categories} />
        </div> */}
      </div>
    </fieldset>
  )
}

export default OverViewPassengerStatusVaccinateChart;