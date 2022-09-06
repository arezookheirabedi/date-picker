import React from 'react';
import Highcharts from 'highcharts/highstock';
import {ECOLOR} from 'src/constants/color.enum';
import Spinner from '../../../Spinner';
import RetryButton from '../../../RetryButton';
import Charts from '../../../Charts';

const {HeadlessChart} = Charts;

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
    valueSuffix: 'نفر',
    style: {
      direction: 'rtl',
      textAlign: 'right',
      fontFamily: 'inherit',
      fontSize: 10,
    },
    borderWidth: 0,
  },
};

interface IProps {
  dataset: any;
  loading: boolean;
  errorMessage: any;
  setQuery: any;
}
const OverviewOfExistBordersCount: React.FC<IProps> = ({
  dataset,
  loading,
  errorMessage,
  setQuery,
}) => {
  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">نگاه کلی به تعداد زائران در مرزهای خروجی</legend>
      <div className="flex flex-col align-center justify-center w-full rounded-lg bg-white p-4 shadow">
        <div className="flex items-center justify-between mb-10 mt-6 px-8">
          <div className="w-full">
            <div className="flex flex-col justify-end lg:flex-row text-xs text-gray-600 space-y-4 lg:space-y-0 lg:space-x-2 rtl:space-x-reverse">
              <div className="flex flex-col justify-end md:flex-row space-y-4 md:space-y-0 md:space-x-2 rtl:space-x-reverse">
                <div className="inline-flex flex-col justify-center items-center space-y-2">
                  <div className="w-20 h-2 rounded" style={{backgroundColor: ECOLOR.COLOR1}} />
                  <span>مرز چذابه</span>
                </div>
                <div className="inline-flex flex-col justify-center items-center space-y-2">
                  <div className="w-20 h-2 rounded" style={{backgroundColor: ECOLOR.COLOR2}} />
                  <span> مرز خسروی</span>
                </div>
                <div className="inline-flex flex-col justify-center items-center space-y-2">
                  <div className="w-20 h-2 rounded" style={{backgroundColor: ECOLOR.COLOR3}} />
                  <span> مرز شلمچه</span>
                </div>
                <div className="inline-flex flex-col justify-center items-center space-y-2">
                  <div className="w-20 h-2 rounded" style={{backgroundColor: ECOLOR.COLOR4}} />
                  <span> هوایی</span>
                </div>
                <div className="inline-flex flex-col justify-center items-center space-y-2">
                  <div className="w-20 h-2 rounded" style={{backgroundColor: ECOLOR.COLOR5}} />
                  <span> مرز باشماق</span>
                </div>
                <div className="inline-flex flex-col justify-center items-center space-y-2">
                  <div className="w-20 h-2 rounded" style={{backgroundColor: ECOLOR.COLOR6}} />
                  <span>مرز تمرچین</span>
                </div>
              </div>
              <div className="inline-flex flex-col justify-center items-center space-y-2">
                <div className="w-20 h-2 rounded" style={{backgroundColor: ECOLOR.COLOR7}} />
                <span>مرز مهران</span>
              </div>
            </div>
          </div>
        </div>

        {loading && (
          <div className="p-40">
            <Spinner />
          </div>
        )}

        {errorMessage && !loading && (
          <div className="p-40">
            <div className="text-red-500">{errorMessage}</div>
            <RetryButton setQuery={setQuery} />
          </div>
        )}
        {!loading && !errorMessage && <HeadlessChart data={dataset} optionsProp={optionChart} />}
        {/* {!loading && !errorMessage && ( */}
        {/*  <div className="p-40 text-red-500">موردی برای نمایش وجود ندارد.</div> */}
        {/* )} */}
      </div>
    </fieldset>
  );
};

export default OverviewOfExistBordersCount;
