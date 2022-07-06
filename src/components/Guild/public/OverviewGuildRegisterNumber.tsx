import React, {useEffect, useState} from 'react';
import Charts from 'src/components/Charts';
import Highcharts from 'highcharts';
import guildService from 'src/services/guild.service';
import SearchableSingleSelect from 'src/components/SearchableSingleSelect';
import {isEmpty} from 'lodash';
import {chartNumberConverters as converters} from 'src/helpers/utils';
import {EERRORS} from 'src/constants/errors.enum';
import DatepickerQuery from 'src/components/DatepickerQuery';
import RetryButton from 'src/components/RetryButton';
import {cancelTokenSource, msgRequestCanceled} from '../../../helpers/utils';
import Spinner from '../../Spinner';

const {HeadlessChart} = Charts;

const OverviewGuildRegisterNumber: React.FC<{}> = () => {
  const [dataset, setDataset] = useState<any>({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [queryParams, setQueryParams] = useState({
    from: null,
    to: null,
    categoryId: null,
    retry: false,
  });

  const cancelToken = cancelTokenSource();

  function cancelRequest() {
    cancelToken.cancel(msgRequestCanceled);
  }

  const getColumnChartRegisterNumber = async ({retry, ...params}: any) => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const {data} = await guildService.numberOfRegisteredGuilds(params, {
        cancelToken: cancelToken.token,
      });
      const sortData = data.sort((a: any, b: any) => (a.allCount > b.allCount ? 1 : -1));
      const province: any[] = [];
      const registered: any[] = [];
      const allCount: any[] = [];
      sortData.forEach((item: any) => {
        province.push(item.province);
        allCount.push(item.allCount);
        registered.push(item.registeredCount);
      });
      const newData = [
        {
          name: 'کل',
          dataLabels: {
            // enabled: true,
          },
          pointWidth: 8,
          data: [...allCount],
        },
        {
          name: 'ثبت نام شده',
          dataLabels: {
            // enabled: true,
          },
          pointWidth: 8,

          data: [...registered],
          linearGradient: {
            x1: 0,
            x2: 0,
            y1: 0,
            y2: 1,
          },
          stops: [
            [0, '#5F5B97'],
            [1, '#DDDCE9'],
          ],
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
    getColumnChartRegisterNumber(queryParams);
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
    colors: ['#209F92', '#F3BC06'],
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
    },

    xAxis: {
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
      // min: 0,
      // max: 30,

      lineDashStyle: 'dash',
      lineColor: '#000000',
      lineWidth: 1,
    },
    tooltip: {
      shared: true,
      useHTML: true,
      borderRadius: 16,
      borderWidth: 0,
      valueDecimals: 0,
      valueSuffix: 'نفر',
      style: {
        direction: 'rtl',
        textAlign: 'right',
        fontFamily: 'inherit',
      },
    },
    series: [
      {
        lineWidth: 4,
        // pointWidth: 16,
      },
    ],
  };

  return (
    <fieldset className="mb-16 rounded-xl border p-4 text-center">
      <legend className="mx-auto px-3 text-black">
        نگاه کلی به تعداد اصناف ثبت نامی در هر استان
      </legend>
      <div className="align-center flex w-full flex-col justify-center rounded-lg bg-white p-4 shadow">
        <div className="align-center justify-spacebetween mb-8 flex space-x-5 rtl:space-x-reverse">
          <div className="align-center flex space-x-5 rtl:space-x-reverse">
            <div className="flex items-center">
              <SearchableSingleSelect
                endPoint={guildService.getRegisterList}
                placeholder="کل اصناف"
                objectKey="categoryId"
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

        {!loading &&
          !errorMessage &&
          (isEmpty(dataset) ? (
            <div className="p-40 text-red-500">موردی برای نمایش وجود ندارد.</div>
          ) : (
            <HeadlessChart data={dataset} optionsProp={optionChart} />
          ))}
      </div>
    </fieldset>
  );
};

export default OverviewGuildRegisterNumber;
