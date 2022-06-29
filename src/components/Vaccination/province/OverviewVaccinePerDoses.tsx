import React, {useEffect, useState} from 'react';
// @ts-ignore
import moment from 'moment-jalaali';
import {useHistory, useLocation} from 'react-router-dom';
import Calendar from 'src/components/Calendar';
import DatePickerModal from 'src/components/DatePickerModal';
import Highcharts from 'highcharts';
import {converters} from 'src/components/Guild/public/constant';
import {isEmpty} from 'lodash';
import hcsService from 'src/services/hcs.service';
import Charts from '../../Charts';
import {cancelTokenSource, msgRequestCanceled, sideCities} from '../../../helpers/utils';
import Spinner from '../../Spinner';

const {HeadlessChart} = Charts;

interface OverviewVaccinePerDosesProps {
  cityTitle: string;
}
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
};
const OverviewVaccinePerDoses: React.FC<OverviewVaccinePerDosesProps> = ({cityTitle}) => {
  const location = useLocation();
  const history = useHistory();
  // const [categories, setCategories] = useState<any[]>([]);
  // const [dataset, setDataset] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any>();

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [queryParams, setQueryParams] = useState({
    from: null,
    to: null,
    province: cityTitle,
  });
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null,
    clear: false,
  }) as any;
  const cancelToken = cancelTokenSource();
  function cancelRequest() {
    cancelToken.cancel(msgRequestCanceled);
  }
  // eslint-disable-next-line
  const getLinearOverview = async (params: any) => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const {data} = await hcsService.numberOf(params, {CancelToken: cancelToken.token});
      // const {data} = await hcsService.dosesTagBased(params);
      const finalResponse: any = {...data};
      if (!isEmpty(finalResponse)) {
        const dataChart: any = {
          null: 5,
          '0': finalResponse.totalNonVaccinesCountToTotalPopulationPercentage || 0, // واکسن نزدع
          '1': finalResponse.dosesToTotalPopulationPercentage[1] || 0, // دوز اول
          '2': finalResponse.dosesToTotalPopulationPercentage[2] || 0, // دوز دوم
          '3': finalResponse.dosesToTotalPopulationPercentage[3] || 0, // دوز سوم
          '4': finalResponse.dosesToTotalPopulationPercentage[4] || 0, // دوز چهارم
          '5': finalResponse.dosesToTotalPopulationPercentage[5] || 0, // دوز پنجم
        };

        // eslint-disable-next-line
        let firstDose: number = 0;
        // eslint-disable-next-line
        let secondDose: number = 0;
        // eslint-disable-next-line
        let thirdDose: number = 0;
        // eslint-disable-next-line
        let forthDoses: number = 0;
        // eslint-disable-next-line
        let fifthDoses: number = 0;
        // eslint-disable-next-line
        let noDose: number = 0;

        Object.entries(dataChart).forEach(([key, value]: any[]) => {
          switch (key) {
            case 'null':
              // noDose += value;
              break;
            case '0':
              noDose += value;
              break;
            case '1':
              firstDose += value;
              break;
            case '2':
              secondDose += value;
              break;
            case '3':
              thirdDose += value;
              break;
            case '4':
              forthDoses += value;
              break;
            case '5':
              fifthDoses += value;
              break;
            default:
              break;
          }
        });

        const newInitialData = {
          categories: ['دوز اول', 'دوز دوم', 'دوز سوم', 'دوز چهارم', 'دوز پنجم', 'واکسن نزده'],
          series: [
            {
              name: 'واکسیناسیون',
              data: [
                {name: 'دوز اول', y: firstDose, color: '#F3BC06'},
                {name: 'دوز دوم', y: secondDose, color: '#209F92'},
                {name: 'دوز سوم', y: thirdDose, color: '#004D65'},
                {name: ' دوز چهارم', y: forthDoses, color: '#bfdde7'},
                {name: 'دوز پنجم', y: fifthDoses, color: '#716de3'},
                {name: 'واکسن نزده', y: noDose, color: '#FF0060'},
              ],
            },
          ],
        } as any;

        setChartData({...newInitialData});
      }
    } catch (error: any) {
      setErrorMessage(error.message || 'خطایی در عملیات');
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const provinceName = params.get('provinceName') || ('تهران' as any);

    const existsCity = sideCities.some((item: any) => {
      return item.name === provinceName;
    });

    let idSetTimeOut: any;
    if (existsCity) {
      idSetTimeOut = setTimeout(() => {
        getLinearOverview({...queryParams, province: provinceName});
      }, 500);
    } else {
      history.push('/dashboard/vaccination/province');
    }

    return () => {
      if (existsCity) {
        cancelRequest();
        clearTimeout(idSetTimeOut);
        setChartData({});
      }
    };
  }, [queryParams, location.search]);

  useEffect(() => {
    if (selectedDayRange.from && selectedDayRange.to) {
      const finalFromDate = `${selectedDayRange.from.year}/${selectedDayRange.from.month}/${selectedDayRange.from.day}`;
      const finalToDate = `${selectedDayRange.to.year}/${selectedDayRange.to.month}/${selectedDayRange.to.day}`;
      setQueryParams({
        ...queryParams,
        from: moment(finalFromDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
        to: moment(finalToDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
        province: cityTitle,
      });
    }
    if (selectedDayRange.clear) {
      setQueryParams({
        ...queryParams,
        province: cityTitle,
        from: null,
        to: null,
      });
    }
  }, [selectedDayRange]);

  const focusFromDate = () => {
    setShowDatePicker(true);
  };

  return (
    <fieldset className="mb-16 rounded-xl border p-4 text-center">
      <legend className="mx-auto px-3 text-black">
        نگاه کلی به وضعیت واکسیناسیون استان {cityTitle}
      </legend>
      <div className="align-center flex w-full flex-col justify-center rounded-lg bg-white p-4 shadow">
        <div className="mb-10 mt-6 flex items-center justify-between px-8">
          <div className="align-center flex w-3/4 justify-between">
            <div className="align-center flex justify-between">
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

          <div className="w-2/4">
            <div className="flex flex-col justify-end space-y-4 text-xs text-gray-600 rtl:space-x-reverse lg:flex-row lg:space-y-0 lg:space-x-2">
              <div className="flex flex-col justify-end space-y-4 rtl:space-x-reverse md:flex-row md:space-y-0 md:space-x-2">
                <div className="inline-flex flex-col items-center justify-center space-y-2">
                  <div className="h-2 w-20 rounded" style={{backgroundColor: '#FF0060'}} />
                  <span>واکسن نزده</span>
                </div>
                <div className="inline-flex flex-col items-center justify-center space-y-2">
                  <div className="h-2 w-20 rounded" style={{backgroundColor: '#716DE3'}} />
                  <span>دوز پنجم</span>
                </div>
                <div className="inline-flex flex-col items-center justify-center space-y-2">
                  <div className="h-2 w-20 rounded" style={{backgroundColor: '#BFDDE7'}} />
                  <span>دوز چهارم</span>
                </div>
                <div className="inline-flex flex-col items-center justify-center space-y-2">
                  <div className="h-2 w-20 rounded" style={{backgroundColor: '#004D65'}} />
                  <span>دوز سوم</span>
                </div>
                <div className="inline-flex flex-col items-center justify-center space-y-2">
                  <div className="h-2 w-20 rounded" style={{backgroundColor: '#209F92'}} />
                  <span>دوز دوم</span>
                </div>
                <div className="inline-flex flex-col items-center justify-center space-y-2">
                  <div className="h-2 w-20 rounded" style={{backgroundColor: '#F3BC06'}} />
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
        {errorMessage && <div className="p-40 text-red-500">{errorMessage}</div>}
        {!loading && !isEmpty(chartData) && !errorMessage && (
          <HeadlessChart data={chartData} optionsProp={optionChart} />
        )}
        {isEmpty(chartData) && !loading && !errorMessage && (
          <div className="p-40 text-red-500">موردی برای نمایش وجود ندارد.</div>
        )}
      </div>
    </fieldset>
  );
};

export default OverviewVaccinePerDoses;
