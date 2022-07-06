import React, {useEffect, useState} from 'react';
import Charts from 'src/components/Charts';
import Highcharts from 'highcharts';
import guildService from 'src/services/guild.service';
import SearchableSingleSelect from 'src/components/SearchableSingleSelect';
import {isEmpty} from 'lodash';
import {chartNumberConverters as converters} from 'src/helpers/utils';
import DatepickerQuery from 'src/components/DatepickerQuery';
import RetryButton from 'src/components/RetryButton';
import {cancelTokenSource, msgRequestCanceled} from '../../../helpers/utils';
import Spinner from '../../Spinner';

const {HeadlessChart} = Charts;

interface IOverviewGuildRegisterPercentage {}
const OverviewGuildRegisterPercentage: React.FC<IOverviewGuildRegisterPercentage> = () => {
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

  const getColumnChartRegisterPercentage = async ({retry, ...params}: any) => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const {data} = await guildService.percentageOfRegisteredGuilds(params, {
        cancelToken: cancelToken.token,
      });
      const sortData = data.sort((a: any, b: any) => (a.percentage > b.percentage ? 1 : -1));
      const province: any[] = [];
      const registered: any[] = [];
      sortData.forEach((item: any) => {
        province.push(item.province ? item.province.trim() : '');
        registered.push(item.percentage);
      });
      const newData = [
        {
          showInLegend: false,
          name: 'ثبت نام شده',
          data: [...registered],
          color: {
            linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
            stops: [
              [0, '#7DA6B8'], // start
              [1, '#175A76'], // end
            ],
          },
        },
      ];

      setDataset({categories: [...province], series: [...newData]});
      setLoading(false);
    } catch (error: any) {
      if (error.message === 'cancel') {
        setLoading(true);
        return;
      }
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getColumnChartRegisterPercentage(queryParams);
    return () => {
      cancelRequest();
      setDataset({});
    };
  }, [queryParams]);

  const optionChart = {
    chart: {
      scrollablePlotArea: {
        scrollPositionX: 1,
      },
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
    plotOptions: {
      column: {
        marker: {
          enabled: false,
          states: {
            hover: {
              enabled: true,
              fillColor: {
                linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
                stops: [
                  [0, '#7DA6B8'], // start
                  [1, '#175A76'], // end
                ],
              },
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
      tickInterval: 25,
      tickAmount: 5,
      labels: {
        format: '٪{text}',
      },
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
        pointWidth: 16,
        lineWidth: 4,
        dataLabels: {
          // enabled: true,
        },
      },
    ],
  };

  return (
    <fieldset className="mb-16 rounded-xl border p-4 text-center">
      <legend className="mx-auto px-3 text-black">
        نگاه کلی به درصد اصناف ثبت نامی در هر استان
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

export default OverviewGuildRegisterPercentage;
