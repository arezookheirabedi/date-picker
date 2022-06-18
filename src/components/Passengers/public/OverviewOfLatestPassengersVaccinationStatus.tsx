import React, {useEffect, useState} from 'react';

import Highcharts from "highcharts/highstock";
// import vaccineService from 'src/services/vaccine.service';
// import axios from 'axios';

import Charts from '../../Charts';
import {cancelTokenSource, msgRequestCanceled} from '../../../helpers/utils';
import hcsService from "../../../services/hcs.service";

import Spinner from '../../Spinner';

const {HeadlessChart} = Charts;

const initialData = {
  categories: ['دوز اول', 'دوز دوم', 'دوز سوم', 'دوز چهارم', 'دوز پنجم', 'واکسن نزده ها'],
  series: [
    {
      name: 'واکسیناسیون',
      data: [
        {name: 'دوز اول', y: 0, color: '#F3BC06'},
        {name: 'دوز دوم', y: 0, color: '#209F92'},
        {name: 'دوز سوم', y: 0, color: '#004D65'},
        {name: 'دوز چهارم', y: 0, color: '#BFDDE7'},
        {name: 'دوز پنجم', y: 0, color: '#716DE3'},
        {name: 'واکسن نزده ها', y: 0, color: '#FF0060'},
      ],
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
    valueSuffix: ' درصد',
    style: {
      direction: 'rtl',
      textAlign: 'right',
      fontFamily: 'inherit',
      fontSize: 10,
    },
    borderWidth: 0,
  },
}

const OverviewOfLatestPassengersVaccinationStatus = () => {

  // const history = useHistory();
  // const [categories, setCategories] = useState<any[]>();
  // eslint-disable-next-line
  const [dataset, setDataset] = useState<any[]>(initialData);
  const [errorMessage, setErrorMessage] = useState(null);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);

  const cancelToken = cancelTokenSource();

  function cancelRequest() {
    cancelToken.cancel(msgRequestCanceled);
  }

  const getTransportVaccinateInfo = async () => {
    setLoading(true);
    try {
      const {data} = await hcsService.getPeopleVaccinesTripGeneralReport(
        {},
        {cancelToken: cancelToken.token}
      );

      const initialDoses = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0};
      const dosesToTotalPopulationPercentage = {...initialDoses, ...data.dosesToTotalPopulationPercentage}
      const dataTemp = {
        categories: ['دوز اول', 'دوز دوم', 'دوز سوم', 'دوز چهارم', 'دوز پنجم', 'واکسن نزده ها'],
        series: [
          {
            name: 'واکسیناسیون',
            data: [
              {name: 'دوز اول', y: dosesToTotalPopulationPercentage['1'], color: '#F3BC06'},
              {name: 'دوز دوم', y: dosesToTotalPopulationPercentage['2'], color: '#209F92'},
              {name: 'دوز سوم', y: dosesToTotalPopulationPercentage['3'], color: '#004D65'},
              {name: 'دوز چهارم', y: dosesToTotalPopulationPercentage['4'], color: '#BFDDE7'},
              {name: 'دوز پنجم', y: dosesToTotalPopulationPercentage['5'], color: '#716DE3'},
              {
                name: 'واکسن نزده ها',
                y: data.totalNonVaccinesCountToTotalPopulationPercentage || 0,
                color: '#FF0060'
              },
            ],
          },
        ]
      } as any;

      setDataset(dataTemp)
    } catch (error) {
      // eslint-disable-next-line
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTransportVaccinateInfo();
    // getPcrResult();
    return () => {
      cancelRequest();
      setDataset(initialData)
      // setGuildPcrInfo(initialPcrInfo);
    };
  }, []);

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">
        نگاه کلی به آخرین وضعیت واکسیناسیون مسافران
      </legend>
      <div className="flex flex-col align-center justify-center w-full rounded-lg bg-white p-4 shadow">
        <div className="flex items-center justify-between mb-10 mt-6 px-8">
          <div className="w-full">
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


        {loading && (
          <div className="p-40">
            <Spinner/>
          </div>
        )}

        {errorMessage && <div className="p-40 text-red-500">{errorMessage}</div>}
        {!loading && !errorMessage && (
          <HeadlessChart data={dataset} optionsProp={optionChart}/>
        )}
        {/* {!loading && !errorMessage && ( */}
        {/*  <div className="p-40 text-red-500">موردی برای نمایش وجود ندارد.</div> */}
        {/* )} */}
      </div>
    </fieldset>
  )
}

export default OverviewOfLatestPassengersVaccinationStatus;


