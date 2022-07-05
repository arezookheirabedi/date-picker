import React, {useEffect, useState} from 'react';
import hcsService from 'src/services/hcs.service';
import {useHistory, useLocation} from 'react-router-dom';
import {isEmpty} from 'lodash';
import Highcharts from 'highcharts';
import SingleDatepickerQuery from 'src/components/SingleDatepickerQuery';
import RetryButton from 'src/components/RetryButton';
import {EERRORS} from 'src/constants/errors.enum';
import Charts from '../../Charts';
import {
  chartNumberconverters as converters,
  cancelTokenSource,
  msgRequestCanceled,
  sideCities,
} from '../../../helpers/utils';
import Spinner from '../../Spinner';

const {HeadlessChart} = Charts;

interface OverviewPerProvinceProps {
  cityTitle: string;
}

const OverviewSchoolsVaccinationPercentagePerGradeProvince: React.FC<OverviewPerProvinceProps> = ({
  cityTitle,
}) => {
  const location = useLocation();
  const history = useHistory();
  const [dataset, setDataset] = useState<any>({});
  const [errorMessage, setErrorMessage] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [queryParams, setQueryParams] = useState({
    to: null,
    retry: false,
  });

  const cancelToken = cancelTokenSource();

  function cancelRequest() {
    cancelToken.cancel(msgRequestCanceled);
  }

  const getLinearOverview = async ({retry, ...params}: any) => {
    setLoading(true);
    setErrorMessage(null);
    try {
      // eslint-disable-next-line
      const {data} = await hcsService.peopleVaccinationOverview(params, {
        cancelToken: cancelToken.token,
      });

      const grade: any[] = [];

      // eslint-disable-next-line
      let nonVaccinesPercentage: any[] = [];
      // eslint-disable-next-line
      let vaccinesPercentage: any[] = [];
      const sortData = data.sort((a: any, b: any) =>
        a.nonVaccinesCountToMembersCountPercentage > b.nonVaccinesCountToMembersCountPercentage
          ? 1
          : -1
      );
      sortData.forEach((item: any) => {
        vaccinesPercentage.push(Number(item.vaccinesCountToMembersCountPercentage));
        nonVaccinesPercentage.push(Number(item.nonVaccinesCountToMembersCountPercentage));

        grade.push(item.categoryValue);
      });

      const newData = [
        {
          name: 'واکسن نزده',
          color: '#e21416',
          data: [...nonVaccinesPercentage],
        },
        {
          name: 'واکسن زده',
          color: '#04b086',
          data: [...vaccinesPercentage],
        },
      ];
      setDataset({categories: [...grade], series: [...newData]});
      setLoading(false);
    } catch (error: any) {
      if (error.message === 'cancel') {
        setLoading(true);
        return;
      }
      setErrorMessage(error.message || EERRORS.ERROR_500);
      setLoading(false);
    }
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
        stacking: 'percent',
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
      tickInterval: 25,
      tickAmount: 5,
      softMin: 0,
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
      valueSuffix: '٪',
      style: {
        direction: 'rtl',
        textAlign: 'right',
        fontFamily: 'inherit',
        fontSize: 10,
      },
      borderWidth: 0,
    },

    series: [],
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const provinceName = params.get('provinceName') || ('تهران' as any);
    const existsCity = sideCities.some((item: any) => {
      return item.name === provinceName;
    });

    if (existsCity) {
      getLinearOverview({...queryParams, tag: 'edu', category: 'grade', province: provinceName});
    } else {
      history.push('/dashboard/school/province');
    }

    return () => {
      cancelRequest();
      setDataset({});
    };
  }, [queryParams, location.search]);

  return (
    <fieldset className="mb-16 rounded-xl border p-4 text-center">
      <legend className="mx-auto px-3 text-black">
        نگاه کلی به درصد واکسیناسیون آموزش و پرورش استان {cityTitle} در هر مقطع تحصیلی
      </legend>
      <div className="align-center flex w-full flex-col justify-center rounded-lg bg-white p-4 shadow">
        <div className="mb-10 mt-6 flex items-center justify-between px-8">
          <div className="align-center flex w-3/4 justify-between">
            <div className="align-center flex justify-between">
              <SingleDatepickerQuery query={queryParams} setQuery={setQueryParams} />
            </div>
          </div>
          <div className="w-2/4">
            <div className="flex flex-col justify-end space-y-4 text-xs text-gray-600 rtl:space-x-reverse lg:flex-row lg:space-y-0 lg:space-x-2">
              <div className="flex flex-col justify-end space-y-4 rtl:space-x-reverse md:flex-row md:space-y-0 md:space-x-2">
                <div className="inline-flex flex-col items-center justify-center space-y-2">
                  <div className="h-2 w-20 rounded" style={{backgroundColor: '#e21416'}} />
                  <span>واکسن نزده</span>
                </div>

                <div className="inline-flex flex-col items-center justify-center space-y-2">
                  <div className="h-2 w-20 rounded" style={{backgroundColor: '#04b086'}} />
                  <span>واکسن زده </span>
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
            <RetryButton setQuery={setQueryParams} />
          </div>
        )}

        {!loading && !isEmpty(dataset) && !errorMessage && (
          <HeadlessChart data={dataset} optionsProp={optionChart} />
        )}
        {dataset && dataset.series && dataset.series.length === 0 && !loading && !errorMessage && (
          <div className="p-40 text-red-500">موردی برای نمایش وجود ندارد.</div>
        )}
      </div>
    </fieldset>
  );
};

export default OverviewSchoolsVaccinationPercentagePerGradeProvince;
