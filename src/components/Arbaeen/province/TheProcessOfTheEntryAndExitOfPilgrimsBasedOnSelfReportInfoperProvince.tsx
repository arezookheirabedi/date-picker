import React, {useState} from 'react';
import Highcharts from 'highcharts';
import {isEmpty} from 'lodash';
import RetryButton from 'src/components/RetryButton';
import Information from 'src/assets/images/icons/information.svg';
import Select from 'src/components/Select';
import useGetTheProcessOfTheEntryAndExitOfPilgrimsBasedOnSelfReportInfoperProvince from 'src/hooks/apis/useGetTheProcessOfTheEntryAndExitOfPilgrimsBasedOnSelfReportInfo';
import {EBORDERS} from 'src/constants/border.enum';
import Spinner from '../../Spinner';
import Charts from '../../Charts';

const {HeadlessChart} = Charts;

const options = [
  {value: null, label: 'همه مرزها'},
  {value: EBORDERS.SHALAMCHE, label: 'شلمچه'},
  {value: EBORDERS.CHAZABE, label: 'چذابه'},
  {value: EBORDERS.MEHRAN, label: 'مهران'},
  {value: EBORDERS.KHOSRAVI, label: 'خسروی'},
  {value: EBORDERS.BASHMAGH, label: 'باشماق'},
  {value: EBORDERS.TAMARCHIN, label: 'تمرچین'},
];

const converters = {
  fa(number: any) {
    return number.toString().replace(/\d/g, (d: any) => {
      return String.fromCharCode(d.charCodeAt(0) + 1728);
    });
  },
} as any;

const optionChart = {
  chart: {
    renderTo: 'container',
    type: 'spline',
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
  colors: ['#d30010', '#00836e'],
  plotOptions: {
    series: {
      borderRadius: 10,
    },
    column: {
      threshold: null,
      grouping: false,
      shadow: false,
      borderWidth: 0,
      dataLabels: {
        enabled: true,
        // eslint-disable-next-line no-useless-concat
        format: '<h1 style="font-family: IRANSans">%{y}</h1>',
        style: {
          fontSize: '10px',
          fontFamily: 'IRANSans',
        },
        useHTML: true,
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
    valueSuffix: 'تعداد',
    style: {
      direction: 'rtl',
      textAlign: 'right',
      fontFamily: 'inherit',
      fontSize: 10,
    },
    borderWidth: 0,
  },
};

const TheProcessOfTheEntryAndExitOfPilgrimsBasedOnSelfReportInfoperProvince: React.FC<{
  cityTitle: string;
}> = ({cityTitle}) => {
  const [query, setQuery] = useState({
    retry: false,
    border: null,
  });
  const {
    data: dataset,
    loading,
    error: errorMessage,
  } = useGetTheProcessOfTheEntryAndExitOfPilgrimsBasedOnSelfReportInfoperProvince(query, true);

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">
        نگاه کلی به روند ورود و خروج مسافران استان &nbsp;{cityTitle}&nbsp; از مرزهای زمینی بر اساس
        اطلاعات وارد شده زائر در زمان ثبت نام
      </legend>
      <div className="flex flex-col align-center justify-center w-full rounded-lg bg-white p-4 shadow">
        <div className="flex items-center justify-between mb-10 mt-6 px-8">
          <div className="align-center flex w-3/4 justify-between">
            <div className="align-center flex justify-between ">
              <Select
                options={options}
                objectKey="border"
                setQueryParams={setQuery}
                queryParams={query}
              />
            </div>
          </div>
          <div className="w-1/2">
            <div className="flex flex-col justify-end lg:flex-row text-xs text-gray-600 space-y-4 lg:space-y-0 lg:space-x-2 rtl:space-x-reverse">
              <div className="flex flex-col justify-end md:flex-row space-y-4 md:space-y-0 md:space-x-4 rtl:space-x-reverse">
                <div className="inline-flex flex-col justify-center items-center space-y-2">
                  <div className="w-20 h-2 rounded" style={{backgroundColor: '#d30010'}} />
                  <span>خروجی</span>
                </div>
                <div className="inline-flex flex-col justify-center items-center space-y-2">
                  <div className="w-20 h-2 rounded" style={{backgroundColor: '#00836e'}} />
                  <span>وروی</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-start mb-10 mt-5 px-8">
          <div className="w-full">
            <div className="flex flex-row  items-center justify-start  text-xs">
              <img src={Information} className="inline " width="18" height="18" alt="" />
              <span className="px-2">
                نمایش روند ورود و خروج مسافران از مرزهای مهران ـ چذابه ـ تمرچین ـ باشماق ـ خسروی ـ
                شلمچه بر اساس اطلاعات وارد شده زائر در زمان ثبت نام
              </span>
            </div>
          </div>
        </div>

        {loading && (
          <div className="p-40">
            <Spinner />
          </div>
        )}
        {errorMessage && (
          <div className="p-40">
            <div className="text-red-500">{errorMessage}</div>
            <RetryButton setQuery={setQuery} />
          </div>
        )}
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

export default TheProcessOfTheEntryAndExitOfPilgrimsBasedOnSelfReportInfoperProvince;
