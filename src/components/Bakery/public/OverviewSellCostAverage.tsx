import React from 'react';
// @ts-ignore
// import moment from 'moment-jalaali';
import {isEmpty} from 'lodash';
// import DatePickerModal from '../../DatePickerModal';
import Spinner from '../../Spinner';
// import Calendar from '../../Calendar';
// import TagsSelect from '../TagsSelect';
import HeadlessChart from '../HeadlessChart';
// import hcsService from '../../../services/hcs.service';

// hooks
import useOverviewOfSellCostAverage from "../../../hooks/apis/bakery/useOverviewOfSellCostAverage";

const optionChart = {
  chart: {
    type: 'column',
    // numberFormatter() {
    // eslint-disable-next-line prefer-rest-params
    // const ret = Highcharts.numberFormat.apply(0, arguments as any);
    // return converters.fa(ret);
    // },
    className: 'transport-line-chart',
  },
  title: {
    text: null,
  },
  credits: {
    enabled: false,
  },
  legend: {
    align: 'center',
    rtl : true
  },
  colors: ['#B82DEB', '#F69D29'],
  plotOptions: {
    column: {
      marker: {
        enabled: false,
        states: {
          hover: {
            enabled: false,
            fillColor: {
              linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
              stops: [
                [0, '#7DA6B8'], // start
                [1, '#175A76'], // end
              ],
            },
            lineColor: '#fff',
            lineWidth: 3,
          },
        },
      },
      lineWidth: 2,
      threshold: null,
      borderRadius: 2,
      // pointWidth: pointWidth || 0,
      states: {
        hover: {
          lineWidth: 1,
        },
      },
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
  xAxis: {
    lineDashStyle: 'dash',
    lineColor: '#000000',
    lineWidth: 1,
  },
  tooltip: {
    shared: true,
    useHTML: true,
    // eslint-disable-next-line
    
    style: {
      direction: 'rtl',
      textAlign: 'right',
      fontFamily: 'inherit',
      fontSize: 10,
    },
    borderWidth: 0,
  },
  series: [
    {
      lineWidth: 4
    },
  ],
};

const OverviewSellCostAverage: React.FC<{}> = () => {

  // call bakery hook
  const { loading, list: dataset, error: errorMessage } = useOverviewOfSellCostAverage();

  // const [serviceType, setServiceType] = useState(null) as any;
  // const [showDatePicker, setShowDatePicker] = useState(false);
  // eslint-disable-next-line
  // const [selectedDayRange, setSelectedDayRange] = useState({
  //   from: {
  //     day: 6,
  //     month: 3,
  //     year: 1401,
  //   },
  //   to: {
  //     day: 6,
  //     month: 3,
  //     year: 1401,
  //   },
  // }) as any;

  // const focusFromDate = () => {
  //   setShowDatePicker(true);
  // };

  // const [query, setQuery] = useState({
  //   from: null,
  //   to: null,
  // });

  // useEffect(() => {
  //   if (selectedDayRange.from && selectedDayRange.to) {
  //     const finalFromDate = `${selectedDayRange.from.year}/${selectedDayRange.from.month}/${selectedDayRange.from.day}`;
  //     const finalToDate = `${selectedDayRange.to.year}/${selectedDayRange.to.month}/${selectedDayRange.to.day}`;
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
      نگاه کلی به متوسط ارزش فروش تراکنش‌ها در کشور
      </legend>
      <div className="flex flex-col align-center justify-center w-full rounded-lg bg-white p-4 shadow">
        <div className="flex items-center justify-between mb-10 mt-6">
          {/* <div className="flex align-center justify-start space-x-6 rtl:space-x-reverse flex-grow px-8"> */}
          <div className="flex align-center justify-end space-x-6 rtl:space-x-reverse flex-grow px-8">
            {/* <TagsSelect
              placeholder="نوع نان"
              // tag="employee"
              // category="heName"
              setQueryParams={setQuery}
              queryParams={query}
            /> */}

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
            <div className='relative z-20 inline-block text-left shadow rounded px-5 py-1'>
              <div className="inline-flex justify-center items-center w-full text-sm font-medium">
                <span className="mx-3 whitespace-nowrap truncate">
                  <span className="text-gray-500">
                    منبع :
                  </span> بانک مرکزی
                </span>
              </div>
            </div>
          </div>
          {/* 
          <RangeDateSliderFilter
            changeType={v =>
              setQueryParams({
                ...queryParams,
                type: v,
              })
            }
            selectedType={queryParams.type}
            dates={selectedDayRange}
            wrapperClassName="w-1/4"
          /> */}
        </div>

        {loading && (
          <div className="p-40">
            <Spinner />
          </div>
        )}
        {errorMessage && <div className="p-40 text-red-500">{errorMessage}</div>}
        {!loading && !isEmpty(dataset) && !errorMessage && (
          <HeadlessChart data={dataset} optionsProp={optionChart} />
        )}
        {isEmpty(dataset) && !loading && !errorMessage && (
          <div className="p-40 text-red-500">موردی برای نمایش وجود ندارد.</div>
        )}
      </div>
    </fieldset>
  );
};

export default OverviewSellCostAverage;
