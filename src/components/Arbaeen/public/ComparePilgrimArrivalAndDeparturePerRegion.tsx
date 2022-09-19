import React, {useState} from 'react';
import Highcharts from 'highcharts';
import {isEmpty} from 'lodash';
import RetryButton from 'src/components/RetryButton';
import Select from 'src/components/Select';
import {ECOLOR} from 'src/constants/color.enum';
import useGetOverviewPilgrimExistAndEntrancePerRegion from 'src/hooks/apis/useGetOverviewPilgrimExistAndEntrancePerRegion';
import {EREGION} from 'src/constants/region.enum';
import Spinner from '../../Spinner';
import Charts from '../../Charts';

const {HeadlessChart} = Charts;
/* 
regionId: 1750001, regionName: "خرمشهر"
regionId: 500001, regionName: "پایانه مرزی شلمچه",
regionId: 250001, regionName: "پایانه مرزی مهران",
regionId: 1500001, regionName: "مهران",
regionId: 1250001, regionName: "قصر شیرین",
regionId: 750001, regionName: "پایانه مرزی چذابه",
regionId: 300001, regionName: "پایانه مرزی باشماق",
regionId: 1, regionName: "پایانه مرزی خسروی",
regionId: 500002, regionName: "پایانه مرزی تمرچین", 

*/
const options = [
  {value: 0, label: 'همه مرزها'},
  {value: 1750001, label: 'خرمشهر'},
  {value: 500001, label: 'پایانه مرزی شلمچه'},
  {value: 250001, label: 'پایانه مرزی مهران'},
  {value: 1500001, label: 'مهران'},
  {value: 1250001, label: 'قصر شیرین'},
  {value: 750001, label: 'پایانه مرزی چذابه'},
  {value: 300001, label: 'پایانه مرزی باشماق'},
  {value: 1, label: 'پایانه مرزی خسروی'},
  {value: 500002, label: 'پایانه مرزی تمرچین'},
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
  credits: {
    enabled: false,
  },
  colors: [
    ECOLOR.COLOR0,
    ECOLOR.COLOR1,
    ECOLOR.COLOR2,
    ECOLOR.COLOR3,
    ECOLOR.COLOR4,
    ECOLOR.COLOR5,
    ECOLOR.COLOR6,
    ECOLOR.COLOR7,
    ECOLOR.COLOR8,
  ],
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
    //   showFull: false,
    // },
    // min: 0,
    // max: 40,
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

const ComparePilgrimArrivalAndDeparturePerRegion = () => {
  const [query, setQuery] = useState({
    from: '2022-09-07T00:00:00',
    retry: false,
    borderIdList: [250001, 500001, 1, 500002, 300001, 1500001, 1250001, 1750001, 750001],
  });
  const {
    data: dataset,
    loading,
    error: errorMessage,
  } = useGetOverviewPilgrimExistAndEntrancePerRegion(query);

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">مقایسه روند حرکت زائران در مرزهای زمینی</legend>
      <div className="flex flex-col align-center justify-center w-full rounded-lg bg-white p-4 shadow">
        <div className="flex items-center justify-between mb-10 mt-6 px-8">
          <div className="align-center flex w-1/2 justify-between">
            <div className="align-center flex justify-between w-1/2">
              <Select
                addNullValue={[
                  250001, 500001, 1, 500002, 300001, 1500001, 1250001, 1750001, 750001,
                ]}
                options={options}
                objectKey="borderIdList"
                setQueryParams={setQuery}
                queryParams={query}
              />
            </div>
          </div>
          <div className="w-1/2">
            <div className="flex flex-col justify-end lg:flex-row text-xs text-gray-600 space-y-4 lg:space-y-0 lg:space-x-2 rtl:space-x-reverse">
              <div className="flex flex-col justify-end md:flex-row space-y-4 md:space-y-0 md:space-x-2 rtl:space-x-reverse">
                <div className="inline-flex flex-col justify-center items-center space-y-2">
                  <div className="w-16 h-2 rounded" style={{backgroundColor: ECOLOR.COLOR0}} />
                  <span> گذرگاه &nbsp;{EREGION.GHASRSHIRIN}</span>
                </div>
                <div className="inline-flex flex-col justify-center items-center space-y-2">
                  <div className="w-16 h-2 rounded" style={{backgroundColor: ECOLOR.COLOR1}} />
                  <span> گذرگاه &nbsp;{EREGION.KHORAMSHAR}</span>
                </div>
                <div className="inline-flex flex-col justify-center items-center space-y-2">
                  <div className="w-16 h-2 rounded" style={{backgroundColor: ECOLOR.COLOR2}} />
                  <span>{EREGION.PAYANE_MEHRAN}</span>
                </div>
                <div className="inline-flex flex-col justify-center items-center space-y-2">
                  <div className="w-16 h-2 rounded" style={{backgroundColor: ECOLOR.COLOR3}} />
                  <span>گذرگاه &nbsp;&nbsp;&nbsp;{EREGION.MEHRAN}</span>
                </div>
                <div className="inline-flex flex-col justify-center items-center space-y-2">
                  <div className="w-16 h-2 rounded" style={{backgroundColor: ECOLOR.COLOR4}} />
                  <span> {EREGION.PAYANE_CHAZABE}</span>
                </div>
                <div className="inline-flex flex-col justify-center items-center space-y-2">
                  <div className="w-16 h-2 rounded" style={{backgroundColor: ECOLOR.COLOR5}} />
                  <span> {EREGION.PAYANE_BASHMAGH}</span>
                </div>
              </div>
              <div className="inline-flex flex-col justify-center items-center space-y-2">
                <div className="w-16 h-2 rounded" style={{backgroundColor: ECOLOR.COLOR6}} />
                <span> {EREGION.PAYANE_KHOSRAVI}</span>
              </div>
              <div className="inline-flex flex-col justify-center items-center space-y-2">
                <div className="w-16 h-2 rounded" style={{backgroundColor: ECOLOR.COLOR7}} />
                <span> {EREGION.PAYANE_TAMARCHIN}</span>
              </div>
              <div className="inline-flex flex-col justify-center items-center space-y-2">
                <div className="w-16 h-2 rounded" style={{backgroundColor: ECOLOR.COLOR8}} />
                <span> {EREGION.PAYANE_SHALAMCHE}</span>
              </div>
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

export default ComparePilgrimArrivalAndDeparturePerRegion;
