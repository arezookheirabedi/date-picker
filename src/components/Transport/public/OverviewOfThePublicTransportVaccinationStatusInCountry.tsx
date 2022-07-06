import React, {useState} from 'react';
import Highcharts from "highcharts/highstock";
// import vaccineService from 'src/services/vaccine.service';
// import axios from 'axios';
import Spinner from '../../Spinner';
import Charts from '../../Charts';
import useGetOverviewOfVaccinationStackChart from "../../../hooks/apis/useGetOverviewOfVaccinationStackChart";
import SingleDatepickerQuery from "../../SingleDatepickerQuery";
import RetryButton from "../../RetryButton";

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

const OverviewOfThePublicTransportVaccinationStatusInCountry = () => {
  const [query, setQuery] = useState({
    from: null,
    to: null,
    tag: 'transport',
    retry : false
  }) as any;

  const {data: dataset, loading, error: errorMessage} = useGetOverviewOfVaccinationStackChart(query);

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">نگاه کلی به وضعیت واکسیناسیون حمل و نقل عمومی کشور</legend>
      <div className="flex flex-col align-center justify-center w-full rounded-lg bg-white p-4 shadow">
        <div className="flex items-center justify-between mb-10 mt-6 px-8">
          <div className="flex align-center justify-start w-3/4">
            <SingleDatepickerQuery query={query} setQuery={setQuery} />
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


        {loading && (
          <div className="p-40">
            <Spinner/>
          </div>
        )}
        {errorMessage && (
          <div className="p-40">
            <div className="text-red-500">{errorMessage}</div>
            <RetryButton setQuery={setQuery}/>
          </div>
        )}
        {!loading && !errorMessage && (
          <HeadlessChart data={dataset} optionsProp={optionChart}/>
        )}
        {/* {dataset.length === 0 && !loading && !errorMessage && ( */}
        {/*  <div className="p-40 text-red-500">موردی برای نمایش وجود ندارد.</div> */}
        {/* )} */}
        {/* <div className="flex justify-center items-center w-full">
          <Stacked data={dataset} categories={categories} />
        </div> */}
      </div>
    </fieldset>
  )
}

export default OverviewOfThePublicTransportVaccinationStatusInCountry;