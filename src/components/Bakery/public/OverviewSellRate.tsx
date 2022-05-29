import React, {useEffect, useState} from 'react';
// @ts-ignore
import moment from 'moment-jalaali';
import {isEmpty} from 'lodash';
import bakeryService from 'src/services/bakery.service';
import {cancelTokenSource, msgRequestCanceled} from 'src/helpers/utils';
import DatePickerModal from '../../DatePickerModal';
import Spinner from '../../Spinner';
import Calendar from '../../Calendar';
import TagsSelect from '../TagsSelect';
import HeadlessChart from '../HeadlessChart';
// import hcsService from '../../../services/hcs.service';

const optionChart = {
  chart: {
    type: 'column',
    // numberFormatter() {
    // eslint-disable-next-line prefer-rest-params
    // const ret = Highcharts.numberFormat.apply(0, arguments as any);
    // return converters.fa(ret);
    // },
    className: 'transport-line-chart',
  },
  title: {
    text: null,
  },
  credits: {
    enabled: false,
  },
  colors: ['#716DE3'],
  plotOptions: {
    column: {
      marker: {
        enabled: false,
        states: {
          hover: {
            enabled: true,
            fillColor: {
              // linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 }
              // stops: [
              //   [0, "#FFCC00"], // start
              //   [1, "#FF9400"] // end
              // ]
            },
            lineColor: '#fff',
            lineWidth: 3,
          },
        },
      },
      lineWidth: 2,
      threshold: null,
      borderRadius: 2,
      // pointWidth: pointWidth || 0,
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
    lineDashStyle: 'dash',
    lineColor: '#000000',
    lineWidth: 1,
  },
  tooltip: {
    shared: true,
    useHTML: true,
    valueSuffix: 'K',
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
      dataLabels: {
        // enabled: true,
      },
    },
  ],
};

const OverviewActiveTime: React.FC<{}> = () => {
  const [data, setData] = useState({});
  // const [serviceType, setServiceType] = useState(null) as any;
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null,
  }) as any;

  const cancelToken = cancelTokenSource();

  function cancelRequest() {
    cancelToken.cancel(msgRequestCanceled);
  }
  const focusFromDate = () => {
    setShowDatePicker(true);
  };

  const [query, setQuery] = useState({
    from: null,
    to: null,
  });

  const getColumnChartTestResult = async (params: any) => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const response = await bakeryService.bakerySellRate(params, {
        cancelToken: cancelToken.token,
      });
      // eslint-disable-next-line
      console.log(response.data);

      const province: any[] = [];
      const registered: any[] = [];
      const unregistered: any[] = [];
      response.data.forEach((item: any) => {
        province.push(item.province);
        unregistered.push(item.membersCount / 100);
        registered.push(item.totalNonVaccinesCount);
      });
      // setCategories([...province]);
      const newData = [
        {
          name: 'ثبت نام شده',
          dataLabels: {
            // enabled: true,
          },
          showInLegend: false,
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
      // setDataset([...newData]);
      setData({categories: [...province], series: [...newData]});
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
      getColumnChartTestResult(query);
    }, 500);

    return () => {
      setData([]);
      cancelRequest();
      clearTimeout(idSetTimeOut);
    };
  }, [query]);

  useEffect(() => {
    if (selectedDayRange.from && selectedDayRange.to) {
      const finalFromDate = `${selectedDayRange.from.year}/${selectedDayRange.from.month}/${selectedDayRange.from.day}`;
      const finalToDate = `${selectedDayRange.to.year}/${selectedDayRange.to.month}/${selectedDayRange.to.day}`;
      setQuery({
        ...query,
        from: moment(finalFromDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
        to: moment(finalToDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
      });
    }
    if (selectedDayRange.clear) {
      setQuery({
        ...query,
        from: null,
        to: null,
      });
    }
  }, [selectedDayRange]);

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">نگاه کلی به متوسط نرخ فروش نان در کشور</legend>
      <div className="flex flex-col align-center justify-center w-full rounded-lg bg-white p-4 shadow">
        <div className="flex items-center justify-between mb-10 mt-6">
          <div className="flex align-center justify-start space-x-6 rtl:space-x-reverse flex-grow px-8">
            <TagsSelect
              placeholder="نوع نان"
              // tag="employee"
              // category="heName"
              setQueryParams={setQuery}
              queryParams={query}
            />

            <div className="flex align-center justify-between">
              {showDatePicker ? (
                <DatePickerModal
                  setSelectedDayRange={setSelectedDayRange}
                  selectedDayRange={selectedDayRange}
                  setShowDatePicker={setShowDatePicker}
                  showDatePicker
                />
              ) : null}
              <Calendar
                action={focusFromDate}
                from={selectedDayRange.from}
                to={selectedDayRange.to}
                setSelectedDayRange={setSelectedDayRange}
              />
            </div>
          </div>
          {/* 
          <RangeDateSliderFilter
            changeType={v =>
              setQueryParams({
                ...queryParams,
                type: v,
              })
            }
            selectedType={queryParams.type}
            dates={selectedDayRange}
            wrapperClassName="w-1/4"
          /> */}
        </div>

        {loading && (
          <div className="p-40">
            <Spinner />
          </div>
        )}
        {errorMessage && <div className="p-40 text-red-500">{errorMessage}</div>}
        {!loading && !isEmpty(data) && !errorMessage && (
          <HeadlessChart data={data} optionsProp={optionChart} />
        )}
        {isEmpty(data) && !loading && !errorMessage && (
          <div className="p-40 text-red-500">موردی برای نمایش وجود ندارد.</div>
        )}
      </div>
    </fieldset>
  );
};

export default OverviewActiveTime;
