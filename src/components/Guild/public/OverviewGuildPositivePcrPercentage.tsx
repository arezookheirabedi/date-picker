import React, {useEffect, useState} from 'react';
import Charts from 'src/components/Charts';
import Highcharts from 'highcharts';
import SearchableSingleSelect from 'src/components/SearchableSingleSelect';
import hcsService from 'src/services/hcs.service';
import {isEmpty} from 'lodash';
import {chartNumberconverters as converters} from 'src/helpers/utils';
import RetryButton from 'src/components/RetryButton';
import DatepickerQuery from 'src/components/DatepickerQuery';
import {EERRORS} from 'src/constants/errors.enum';
import {cancelTokenSource, msgRequestCanceled} from '../../../helpers/utils';

import Spinner from '../../Spinner';

const {HeadlessChart} = Charts;

const OverviewGuildPositivePcrPercentage: React.FC<{}> = () => {
  const [dataset, setDataset] = useState<any>({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [queryParams, setQueryParams] = useState({
    from: null,
    to: null,
    retry: false,
  });

  const cancelToken = cancelTokenSource();

  function cancelRequest() {
    cancelToken.cancel(msgRequestCanceled);
  }

  const getColumnChartPositivePcrPercentage = async ({retry, ...params}: any) => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const {data} = await hcsService.positivePcrPercentageProvinceBased(params, {
        cancelToken: cancelToken.token,
      });
      const province: any[] = [];
      const positiveMembersCountToTotalMembersPercentag: any[] = [];
      data.forEach((item: any) => {
        province.push(item.province);
        positiveMembersCountToTotalMembersPercentag.push(
          item.positiveMembersCountToTotalMembersPercentage
        );
      });
      const sortPositiveMembersCountToTotalMembersPercentag =
        positiveMembersCountToTotalMembersPercentag.sort((a, b) => (a > b ? 1 : -1));
      const newData = [
        {
          showInLegend: false,
          name: 'درصد ابتلا',
          data: [...sortPositiveMembersCountToTotalMembersPercentag],
        },
      ];
      if (data.length > 0) {
        setDataset({categories: [...province], series: [...newData]});
      }
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

  useEffect(() => {
    getColumnChartPositivePcrPercentage({...queryParams, tag: 'guild', category: 'categoryDesc'});
    return () => {
      cancelRequest();
      setDataset({});
    };
  }, [queryParams]);

  const optionChart = {
    chart: {
      type: 'column',
      numberFormatter() {
        // eslint-disable-next-line prefer-rest-params
        const ret = Highcharts.numberFormat.apply(0, arguments as any);
        return converters.fa(ret);
      },
      className: 'transport-line-chart',
    },
    title: {
      text: null,
    },
    credits: {
      enabled: false,
    },
    colors: ['#FE2D2F'],
    plotOptions: {
      column: {
        marker: {
          enabled: false,
          states: {
            hover: {
              enabled: true,
              lineColor: '#fff',
              lineWidth: 3,
            },
          },
        },
        lineWidth: 2,
        threshold: null,
        borderRadius: 2,
        states: {
          hover: {
            lineWidth: 1,
          },
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
      labels: {
        format: '٪{text}',
      },
    },
    xAxis: {
      lineDashStyle: 'dash',
      lineColor: '#000000',
      lineWidth: 1,
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
      showFull: false,
    },

    min: 0,
    max: 20,
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
    series: [
      {
        lineWidth: 4,
        showInLegend: false,
        dataLabels: {},
      },
    ],
  };

  return (
    <fieldset className="mb-16 rounded-xl border p-4 text-center">
      <legend className="mx-auto px-3 text-black">نگاه کلی به درصد ابتلای اصناف در هر استان</legend>
      <div className="align-center flex w-full flex-col justify-center rounded-lg bg-white p-4 shadow">
        <div className="align-center justify-spacebetween mb-8 flex space-x-5 rtl:space-x-reverse">
          <div className="align-center flex space-x-5 rtl:space-x-reverse">
            <div className="flex items-center">
              <SearchableSingleSelect
                objectKey="categoryValue"
                placeholder="کل اصناف"
                tag="guild"
                category="categoryDesc"
                setQueryParams={setQueryParams}
                queryParams={queryParams}
              />
            </div>
            <div className="flex items-center">
              <DatepickerQuery query={queryParams} setQuery={setQueryParams} />
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
        {dataset &&
          dataset.categories &&
          dataset.categories.lenght === 0 &&
          !loading &&
          !errorMessage && <div className="p-40 text-red-500">موردی برای نمایش وجود ندارد.</div>}
      </div>
    </fieldset>
  );
};

export default OverviewGuildPositivePcrPercentage;
