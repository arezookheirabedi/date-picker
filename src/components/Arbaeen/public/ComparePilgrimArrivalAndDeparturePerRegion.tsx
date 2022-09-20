import React, {useState} from 'react';
import Highcharts from 'highcharts';
import {isEmpty} from 'lodash';
import RetryButton from 'src/components/RetryButton';
import {ECOLOR} from 'src/constants/color.enum';
import useGetOverviewPilgrimExistAndEntrancePerRegion from 'src/hooks/apis/useGetOverviewPilgrimExistAndEntrancePerRegion';
import SearchableMultiSelect from 'src/components/SearchableMultiSelect';
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
  {key: 1500001, value: 'مهران'},
  {key: 1750001, value: 'خرمشهر'},
  {key: 500001, value: 'پایانه مرزی شلمچه'},
  {key: 250001, value: 'پایانه مرزی مهران'},
  {key: 1250001, value: 'قصر شیرین'},
  {key: 750001, value: 'پایانه مرزی چذابه'},
  {key: 300001, value: 'پایانه مرزی باشماق'},
  {key: 1, value: 'پایانه مرزی خسروی'},
  {key: 500002, value: 'پایانه مرزی تمرچین'},
];

const RegionsLegend = [
  {key: 1500001, value: 'گذرگاه مهران', color: ECOLOR.COLOR0},
  {key: 1750001, value: 'گذرگاه خرمشهر', color: ECOLOR.COLOR3},
  {key: 500001, value: 'پایانه مرزی شلمچه', color: ECOLOR.COLOR2},
  {key: 250001, value: 'پایانه مرزی مهران', color: ECOLOR.COLOR1},
  {key: 1250001, value: 'قصر شیرین', color: ECOLOR.COLOR5},
  {key: 750001, value: 'پایانه مرزی چذابه', color: ECOLOR.COLOR4},
  {key: 300001, value: 'پایانه مرزی باشماق', color: ECOLOR.COLOR7},
  {key: 1, value: 'پایانه مرزی خسروی', color: ECOLOR.COLOR6},
  {key: 500002, value: 'پایانه مرزی تمرچین', color: ECOLOR.COLOR8},
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
        <div className="flex justify-between mb-10 mt-6 px-8">
          <div className="align-center flex w-2/12 justify-between">
            <SearchableMultiSelect
              options={options}
              objectKey="borderIdList"
              setQueryParams={setQuery}
              queryParams={query}
            />
          </div>
          <div className="w-9/12">
            <div className="flex flex-wrap justify-start  text-xs text-gray-600 justify-start   flex-row-reverse">
              {query.borderIdList ? (
                query.borderIdList.map(i => {
                  const region = RegionsLegend?.find((item: any) => Number(item.key) === Number(i));
                  return (
                    <>
                      <div className="mb-2 w-20 mr-2">
                        <div
                          className="w-full  h-2 mb-2 rounded"
                          style={{backgroundColor: `${region?.color}`}}
                        />
                        <span>{region?.value}</span>
                      </div>
                    </>
                  );
                })
              ) : (
                <></>
              )}
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
