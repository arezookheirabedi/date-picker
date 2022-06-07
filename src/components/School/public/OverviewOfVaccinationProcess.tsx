import React, {useEffect, useState} from 'react';
import Highcharts from 'highcharts/highstock';
// import Spinner from '../../Spinner';
import {cancelTokenSource, msgRequestCanceled} from 'src/helpers/utils';
import hcsService from 'src/services/hcs.service';
import { isEmpty } from 'lodash';
import Charts from '../../Charts';

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
    type: 'areaspline',
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
  xAxis: {
    tickmarkPlacement: 'off',
    title: {
      enabled: false,
    },
  },
  yAxis: {
    title: {
      text: '',
    },
    opposite: true,
  },
  credits: {
    enabled: false,
  },
  colors: ['#F3BC06', '#209F92', '#004D65', '#BFDDE7', '#716DE3', '#FF0060'],
  plotOptions: {
    series: {
      fillOpacity: 1,
      marker: {
        enabled: false,
      },
    },
    area: {
      stacking: 'normal',
      // lineColor: '#666666',
      // lineWidth: 1,
      // marker: {
      //   lineWidth: 1,
      //   lineColor: '#666666'
      // }
    },
  },
  legend: {
    enabled: false,
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
};

const OverviewOfVaccinationProcess = () => {
  const cancelToken = cancelTokenSource();

  function cancelRequest() {
    cancelToken.cancel(msgRequestCanceled);
  }
  const [dataset, setDataset] = useState<any>();
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line
  const getAreaChartVaccination = async (params: any) => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const {data} = await hcsService.accumulativeVaccinesTimeBasedReport(params, {
        cancelToken: cancelToken.token,
      });
      const date: any[] = [];
      // eslint-disable-next-line
      let firstDose: any[] = [];
      // eslint-disable-next-line
      let secondDose: any[] = [];
      // eslint-disable-next-line
      let fourthDose: any[] = [];
      // eslint-disable-next-line
      let thirdDose: any[] = [];
      // eslint-disable-next-line
      let fifthDose: any[] = [];
      data.forEach((item: any, index: number) => {
        // eslint-disable-next-line
        for (const [key, value] of Object.entries(item.doses)) {
          if (Number(key) === 1) {
            firstDose.push(Number(value));
          }

          if (Number(key) === 2) {
            secondDose.push(Number(value));
          }

          if (Number(key) === 3) {
            thirdDose.push(Number(value));
          }
          if (Number(key) === 4) {
            fourthDose.push(Number(value));
          }
          if (Number(key) === 5) {
            fifthDose.push(Number(value));
          }
        }

        if (firstDose.length < index + 1) firstDose.push(0);
        if (secondDose.length < index + 1) secondDose.push(0);
        if (thirdDose.length < index + 1) thirdDose.push(0);
        if (fourthDose.length < index + 1) fourthDose.push(0);
        if (fifthDose.length < index + 1) fifthDose.push(0);
        date.push(item.date);
      });

      const newData = {
        categories: [...date],
        series: [
          {
            name: 'دوز اول',
            data: [...firstDose],
          },
          {
            name: 'دوز دوم',
            data: [...secondDose],
          },
          {
            name: 'دوز سوم',
            data: [...thirdDose],
          },
          {
            name: 'دوز چهارم',
            data: [...fourthDose],
          },
          {
            name: 'دوز پنجم',
            data: [...fifthDose],
          },
         
        ],
      };
      setDataset({...newData});
    } catch (error: any) {
      setErrorMessage(error.message);
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const idSetTimeOut = setTimeout(() => {
      getAreaChartVaccination({tag: 'edu'});
    }, 500);

    return () => {
      clearTimeout(idSetTimeOut);
      cancelRequest();
      setDataset([]);
    };
  }, []);

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">
        نگاه کلی به روند واکسیناسیون آموزش و پرورش
      </legend>
      <div className="flex flex-col align-center justify-center w-full rounded-lg bg-white p-4 shadow">
        <div className="flex items-center justify-between mb-10 mt-6 px-8">
          <div className="w-full">
            <div className="flex flex-col justify-end lg:flex-row text-xs text-gray-600 space-y-4 lg:space-y-0 lg:space-x-2 rtl:space-x-reverse">
              <div className="flex flex-col justify-end md:flex-row space-y-4 md:space-y-0 md:space-x-2 rtl:space-x-reverse">
                <div className="inline-flex flex-col justify-center items-center space-y-2">
                  <div className="w-24 h-2 rounded" style={{backgroundColor: '#716DE3'}} />
                  <span>دوز پنجم</span>
                </div>
                <div className="inline-flex flex-col justify-center items-center space-y-2">
                  <div className="w-24 h-2 rounded" style={{backgroundColor: '#BFDDE7'}} />
                  <span>دوز چهارم</span>
                </div>
                <div className="inline-flex flex-col justify-center items-center space-y-2">
                  <div className="w-24 h-2 rounded" style={{backgroundColor: '#004D65'}} />
                  <span>دوز سوم</span>
                </div>
                <div className="inline-flex flex-col justify-center items-center space-y-2">
                  <div className="w-24 h-2 rounded" style={{backgroundColor: '#209F92'}} />
                  <span>دوز دوم</span>
                </div>
                <div className="inline-flex flex-col justify-center items-center space-y-2">
                  <div className="w-24 h-2 rounded" style={{backgroundColor: '#F3BC06'}} />
                  <span>دوز اول</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {errorMessage ? (
          <div className="p-40 text-red-500">{errorMessage}</div>
        ) : (
          <>
            <HeadlessChart data={dataset} optionsProp={optionChart} />

            {isEmpty(dataset)&& !loading && !errorMessage && (
              <div className="p-40 text-red-500">موردی برای نمایش وجود ندارد.</div>
            )}
          </>
        )}
      </div>
    </fieldset>
  );
};

export default OverviewOfVaccinationProcess;
