import React from 'react';
import Highcharts from "highcharts/highstock";
import Charts from '../../../Charts';
import Spinner from "../../../Spinner";
import RetryButton from "../../../RetryButton";


const {HeadlessChart} = Charts;

interface OverviewReportOfInspectedUnitProvinceProps {
  cityTitle: any,
  data: any,
  loading: any,
  error: any,
  setQuery: any
}

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
    type: 'column',
    numberFormatter() {
      // eslint-disable-next-line prefer-rest-params
      const ret = Highcharts.numberFormat.apply(0, arguments as any);
      return converters.fa(ret);
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
      dataLabels: {
        enabled: true,
        format: '<h1 style="font-family: IRANSans">%{y}</h1>',
        style: {
          fontSize: '10px',
          fontFamily: 'IRANSans',
        },
        useHTML: true,
      }
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
    labels: {
      format: '٪{text}',
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
    valueSuffix: ' درصد',
    style: {
      direction: 'rtl',
      textAlign: 'right',
      fontFamily: 'inherit',
      fontSize: 10,
    },
    borderWidth: 0,
  }
}

const OverviewReportOfInspectedUnitProvince: React.FC<OverviewReportOfInspectedUnitProvinceProps> = ({
                                                                                                       cityTitle,
                                                                                                       data,
                                                                                                       loading,
                                                                                                       error,
                                                                                                       setQuery
                                                                                                     }) => {


  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">
        نگاه کلی به گزارش واحد‌های بازرسی شده در استان {cityTitle}
      </legend>
      <div className="flex flex-col align-center justify-center w-full rounded-lg bg-white p-4 shadow">
        <div className="flex items-center justify-between mb-10 mt-6">
          <div className='w-full'>
            <div
              className="flex flex-col justify-end md:flex-row space-y-4 md:space-y-0 md:space-x-4 rtl:space-x-reverse">
              <div
                className="flex flex-col justify-end md:flex-row space-y-4 md:space-y-0 md:space-x-2 rtl:space-x-reverse">
                <div className="inline-flex flex-col justify-center items-center space-y-2">
                  <div className="w-20 h-2 rounded" style={{backgroundColor: '#004D65'}}/>
                  <span>بازرسی های دستوری</span>
                </div>
                <div className="inline-flex flex-col justify-center items-center space-y-2">
                  <div className="w-20 h-2 rounded" style={{backgroundColor: '#209F92'}}/>
                  <span>بازرسی های مردمی</span>
                </div>
                <div className="inline-flex flex-col justify-center items-center space-y-2">
                  <div className="w-20 h-2 rounded" style={{backgroundColor: '#F3BC06'}}/>
                  <span>بازرسی های ادواری</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* {loading && (
                <div className="p-40">
                <Spinner />
                </div>
                )}
                {!loading && !isEmpty(dataset) && !errorMessage && ( */}
        {loading && (<div className="p-40"><Spinner/></div>)}
        {error && !loading && (
          <div className="p-40">
            <div className="text-red-500">{error}</div>
            <RetryButton setQuery={setQuery}/>
          </div>
        )}
        {!loading && data && !error && (
          <HeadlessChart data={data} optionsProp={optionChart}/>
        )
        }
        {/* )}
                {isEmpty(dataset) && !loading && !errorMessage && (
                <div className="p-40 text-red-500">موردی برای نمایش وجود ندارد.</div>
                )} */}

      </div>
    </fieldset>
  )
}

export default OverviewReportOfInspectedUnitProvince;