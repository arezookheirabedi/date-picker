import React from 'react';
// @ts-ignore
// import moment from 'moment-jalaali';
import {isEmpty} from 'lodash';
import Information from '../../../assets/images/icons/information.svg';
// import DatePickerModal from '../../DatePickerModal';
// import RangeDateSliderFilter from '../../RangeDateSliderFilter';
import Spinner from '../../Spinner';
// import TagsSelect from '../../TagsSelect';
// import Calendar from '../../Calendar';
// import TagsSelect from '../TagsSelect';
import HeadlessChart from '../HeadlessChart';

// hooks

const optionChart = {
  chart: {
    type: 'column',
    // numberFormatter() {
    //   // eslint-disable-next-line prefer-rest-params
    //   const ret = Highcharts.numberFormat.apply(0, arguments as any);
    //   return converters.fa(ret);
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
  colors: ['#209F92', '#F3BC06'],
  plotOptions: {
    column: {
      marker: {
        enabled: false,
        states: {
          hover: {
            enabled: true,
            fillColor: {
              // linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 }
              // stops: [
              //   [0, "#FFCC00"], // start
              //   [1, "#FF9400"] // end
              // ]
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
  // scrollbar: {
  //   enabled: true,
  //   barBackgroundColor: '#656565',
  //   barBorderColor: '#eee',
  //   barBorderRadius: 4,
  //   barBorderWidth: 0,
  //   height: 6,
  //   buttonArrowColor: '#eee',
  //   rifleColor: '#656565',
  //   buttonBackgroundColor: 'transparent',
  //   buttonBorderWidth: 0,
  //   buttonBorderRadius: 0,
  //   trackBackgroundColor: '#eee',
  //   trackBorderWidth: 0,
  //   trackBorderRadius: 4,
  // },
  xAxis: {
    // scrollbar: {
    //   enabled: true,
    //   showFull: false,
    // },
    lineDashStyle: 'dash',
    lineColor: '#000000',
    lineWidth: 1,
  },
  tooltip: {
    shared: true,
    useHTML: true,
    borderRadius: 16,
    borderWidth: 0,
    valueDecimals: 0,
    style: {
      direction: 'rtl',
      textAlign: 'right',
      fontFamily: 'inherit',
    },

    // headerFormat: `<div style="min-width:220px">{point.x}</div>`
  },
  series: [
    {
      lineWidth: 4,
    },
  ],
};

const OverviewLicence: React.FC<{}> = () => {
 
   // call bakery hook


  // const [serviceType, setServiceType] = useState(null) as any;
  // const [showDatePicker, setShowDatePicker] = useState(false);
  // const [selectedDayRange, setSelectedDayRange] = useState({
  //   from: null,
  //   to: null,
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
      <legend className="text-black mx-auto px-3">وضعیت استانی مجوز‌های واحدهای صنفی و سیما</legend>
      <div className="flex flex-col align-center justify-center w-full rounded-lg bg-white p-4 shadow">

        <div className="flex items-center justify-between mb-10 mt-6 px-5">
          <fieldset className="flex flex-col align-center justify-center w-full rounded-xl p-4 relative">
            <span className="tooltip absolute -top-4 right-4 cursor-pointer">
              <img src={Information} className="inline " width="18" height="18" alt=""/>
              {/* <span className="tooltip__tooltiptext text-left rtl:text-right text-gray-400 p-3 py-2">
              در این بخش تعداد نانوایی هایی که در نتیجه بررسی های صورت گرفته مشمول دریافت سهمیه ی آرد نبودند قرار گرفته است.
              </span> */}
            </span>
          </fieldset>
          {/* <div className="flex align-center justify-start space-x-6 rtl:space-x-reverse flex-grow px-8">
            <TagsSelect
              placeholder="نوع نان"
              // tag="employee"
              // category="heName"
              setQueryParams={setQuery}
              queryParams={query}
            />

            <div className="flex align-center justify-between">
              {showDatePicker ? (
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
              />
            </div>
          </div> */}
          {/* <RangeDateSliderFilter
            changeType={v =>
              setQueryParams({
                ...queryParams,
                type: v,
              })
            }
            selectedType={queryParams.type}
            dates={selectedDayRange}
            wrapperClassName="w-1/4"
          />  */}
        </div> 

        
          <HeadlessChart data={[]} optionsProp={optionChart} />
        
      </div>
    </fieldset>
  );
};

export default OverviewLicence;
