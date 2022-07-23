import React, {useState} from "react";
import Highcharts from "highcharts/highstock";
// import useGetOverviewOfTheLatestVaccinationStatusColumnChart
//   from "../../../hooks/apis/useGetOverviewOfTheLatestVaccinationStatusColumnChart";
// import Spinner from "../../Spinner";
// import RetryButton from "../../RetryButton";
import Charts from "../../Charts";
// import SingleDatepickerQuery from "../../SingleDatepickerQuery";
import DatepickerQuery from "../../DatepickerQuery";

const {HeadlessChart} = Charts;

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
      dataLabels: {
        enabled: true,
        // eslint-disable-next-line no-useless-concat
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

const OverviewOfThePercentageOfEntryAndExitOfPilgrims = () => {

  const [query, setQuery] = useState();
  const dataset = {
    categories: ['زمینی وارد شده', 'زمینی خارج شده', 'هوایی وارد شده', 'هوایی خارج شده', 'ریلی وارد شده', 'ریلی خارج شده'],
    series: [
      {
        name: 'درصد ورود یا خروج',
        data: [
          {name: 'زمینی وارد شده', y: 33, color: '#ff4042'},
          {name: 'زمینی خارج شده', y: 44, color: '#7dbf9e'},
          {name: 'هوایی وارد شده', y: 55, color: '#c20a0c'},
          {name: 'هوایی خارج شده', y: 66, color: '#07816c'},
          {name: 'ریلی وارد شده', y: 77, color: '#850506'},
          {
            name: 'ریلی خارج شده',
            y: 90 || 0,
            color: '#005852'
          },
        ],
      },
    ]
  } as any;

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">
        نگاه کلی به درصد ورود و خروج زائران
      </legend>
      <div className="flex flex-col align-center justify-center w-full rounded-lg bg-white p-4 shadow">
        <div className="flex items-center justify-between mb-10 mt-6 px-8">
          <div className="align-center flex w-3/4 justify-between">
            <div className="align-center flex justify-between">
              <DatepickerQuery query={query} setQuery={setQuery}/>
            </div>
          </div>
          <div className="w-full">
            <div
              className="flex flex-col justify-end lg:flex-row text-xs text-gray-600 space-y-4 lg:space-y-0 lg:space-x-2 rtl:space-x-reverse">
              <div
                className="flex flex-col justify-end md:flex-row space-y-4 md:space-y-0 md:space-x-4 rtl:space-x-reverse">
                <div className="inline-flex flex-col justify-center items-center space-y-2">
                  <div className="w-20 h-2 rounded" style={{backgroundColor: '#005852'}}/>
                  <span>ریلی خارج شده</span>
                </div>
                <div className="inline-flex flex-col justify-center items-center space-y-2">
                  <div className="w-20 h-2 rounded" style={{backgroundColor: '#850506'}}/>
                  <span>ریلی وارد شده</span>
                </div>
                <div className="inline-flex flex-col justify-center items-center space-y-2">
                  <div className="w-20 h-2 rounded" style={{backgroundColor: '#07816c'}}/>
                  <span>هوایی خارج شده</span>
                </div>
                <div className="inline-flex flex-col justify-center items-center space-y-2">
                  <div className="w-20 h-2 rounded" style={{backgroundColor: '#c20a0c'}}/>
                  <span>هوایی وارد شده</span>
                </div>
                <div className="inline-flex flex-col justify-center items-center space-y-2">
                  <div className="w-20 h-2 rounded" style={{backgroundColor: '#7dbf9e'}}/>
                  <span>زمینی خارج شده</span>
                </div>
                <div className="inline-flex flex-col justify-center items-center space-y-2">
                  <div className="w-20 h-2 rounded" style={{backgroundColor: '#ff4042'}}/>
                  <span>زمینی وارد شده</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* {loading && ( */}
        {/*  <div className="p-40"> */}
        {/*    <Spinner/> */}
        {/*  </div> */}
        {/* )} */}

        {/* {errorMessage && !loading && ( */}
        {/*  <div className="p-40"> */}
        {/*    <div className="text-red-500">{errorMessage}</div> */}
        {/*    <RetryButton setQuery={setQuery}/> */}
        {/*  </div> */}
        {/* )} */}
        {/* {!loading && !errorMessage && ( */}
        {/*  <HeadlessChart data={dataset} optionsProp={optionChart}/> */}
        {/* )} */}

        <HeadlessChart data={dataset} optionsProp={optionChart}/>
        {/* {!loading && !errorMessage && ( */}
        {/*  <div className="p-40 text-red-500">موردی برای نمایش وجود ندارد.</div> */}
        {/* )} */}
      </div>
    </fieldset>
  )
}

export default OverviewOfThePercentageOfEntryAndExitOfPilgrims