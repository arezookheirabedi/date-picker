import React, {useState} from 'react';
import Highcharts from 'highcharts/highstock';
import {chartNumberconverters as converters} from 'src/helpers/utils';
import Spinner from 'src/components/Spinner';
import RetryButton from 'src/components/RetryButton';
import useOverviewOfTheVaccinationProcess from '../../../hooks/apis/useGetOverviewOfTheVaccinationProcess';
import Charts from '../../Charts';

const {HeadlessChart} = Charts;

const optionChart = {
  chart: {
    renderTo: 'container',
    type: 'areaspline',
    numberFormatter() {
      // eslint-disable-next-line prefer-rest-params
      const ret = Highcharts.numberFormat.apply(0, arguments as any);
      return converters.fa(ret);
    },
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
  colors: ['#F3BC06', '#209F92', '#004D65', '#BFDDE7', '#716DE3'],
  plotOptions: {
    series: {
      fillOpacity: 1,
      marker: {
        enabled: false,
      },
    },
    area: {
      stacking: 'normal',
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
  },
};

const OverviewOfGuildVaccinationProcess = () => {
  const [query, setQuery] = useState<any>({
    tag: 'guild',
    retry: false,
  });
  const {data: dataset, loading, error: errorMessage} = useOverviewOfTheVaccinationProcess(query);
  return (
    <fieldset className="mb-16 rounded-xl border p-4 text-center">
      <legend className="mx-auto px-3 text-black">نگاه کلی به روند واکسیناسیون اصناف </legend>
      <div className="align-center flex w-full flex-col justify-center rounded-lg bg-white p-4 shadow">
        <div className="mb-10 mt-6 flex items-center justify-between px-8">
          <div className="w-full">
            <div className="flex flex-col justify-end space-y-4 text-xs text-gray-600 rtl:space-x-reverse lg:flex-row lg:space-y-0 lg:space-x-2">
              <div className="flex flex-col justify-end space-y-4 rtl:space-x-reverse md:flex-row md:space-y-0 md:space-x-2">
                <div className="inline-flex flex-col items-center justify-center space-y-2">
                  <div className="h-2 w-24 rounded" style={{backgroundColor: '#716DE3'}} />
                  <span>دوز پنجم</span>
                </div>
                <div className="inline-flex flex-col items-center justify-center space-y-2">
                  <div className="h-2 w-24 rounded" style={{backgroundColor: '#BFDDE7'}} />
                  <span>دوز چهارم</span>
                </div>
                <div className="inline-flex flex-col items-center justify-center space-y-2">
                  <div className="h-2 w-24 rounded" style={{backgroundColor: '#004D65'}} />
                  <span>دوز سوم</span>
                </div>
                <div className="inline-flex flex-col items-center justify-center space-y-2">
                  <div className="h-2 w-24 rounded" style={{backgroundColor: '#209F92'}} />
                  <span>دوز دوم</span>
                </div>
                <div className="inline-flex flex-col items-center justify-center space-y-2">
                  <div className="h-2 w-24 rounded" style={{backgroundColor: '#F3BC06'}} />
                  <span>دوز اول</span>
                </div>
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
        {!loading && dataset.categories.length > 0 && !errorMessage && (
          <HeadlessChart data={dataset} optionsProp={optionChart} />
        )}
        {dataset.categories.length === 0 && !loading && !errorMessage && (
          <div className="p-40 text-red-500">موردی برای نمایش وجود ندارد.</div>
        )}
      </div>
    </fieldset>
  );
};

export default OverviewOfGuildVaccinationProcess;
