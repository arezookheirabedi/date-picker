import React, {useEffect, useState} from 'react';
// @ts-ignore
import moment from 'moment-jalaali';
import Highcharts from 'highcharts/highstock';
import DatePickerModal from '../../../DatePickerModal';
import Calendar from '../../../Calendar';
import Spinner from '../../../Spinner';
import Charts from '../../../Charts';
import {converters, IInitialNumberOfDoses} from '../../public/constant';

const {HeadlessChart} = Charts;

const OverviewOfTheLatestPublicGuildVaccinationStatus: React.FC<{
  setQueryParams: (data: any) => void;
  queryParams: any;
  errorMessage: string | null;
  numberOf: IInitialNumberOfDoses;

  loading: boolean;
}> = ({setQueryParams, queryParams, numberOf, errorMessage, loading}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [initialData, setInitialData] = useState<any>();

  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null,
  }) as any;

  const focusFromDate = () => {
    setShowDatePicker(true);
  };

  // eslint-disable-next-line

  useEffect(() => {
    const dataChart: any = {
      null: 5,
      '0': numberOf.totalNonVaccinesCount || 0, // واکسن نزدع
      '1': numberOf.doses[1] || 0, // دوز اول
      '2': numberOf.doses[2] || 0, // دوز دوم
      '3': numberOf.doses[3] || 0, // دوز سوم
      '4': numberOf.gtDoses[3] || 0, //  بیش از سه دوز
    };

    // eslint-disable-next-line
    let firstDose: number = 0;
    // eslint-disable-next-line
    let secondDose: number = 0;
    // eslint-disable-next-line
    let thirdDose: number = 0;
    // eslint-disable-next-line
    let moreThanThreeDose: number = 0;
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
          moreThanThreeDose += value;
          break;

        default:
          break;
      }
    });

    const newInitialData = {
      categories: ['دوز اول', 'دوز دوم', 'دوز سوم', 'دوز چهارم', 'دوز پنجم', 'واکسن نزده ها'],
      series: [
        {
          name: 'واکسیناسیون',
          data: [
            {name: 'واکسن نزده', y: noDose, color: '#FF0060'},
            {name: 'دوز اول', y: firstDose, color: '#F3BC06'},
            {name: 'دوز دوم', y: secondDose, color: '#209F92'},
            {name: 'دوز سوم', y: thirdDose, color: '#004D65'},
            {name: 'بیش از ۳ دوز', y: moreThanThreeDose, color: '#BFDDE7'},
          ],
        },
      ],
    } as any;
    setInitialData({...newInitialData});
  }, [numberOf]);

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

  useEffect(() => {
    if (selectedDayRange.from && selectedDayRange.to) {
      const finalFromDate = `${selectedDayRange.from.year}/${selectedDayRange.from.month}/${selectedDayRange.from.day}`;
      const finalToDate = `${selectedDayRange.to.year}/${selectedDayRange.to.month}/${selectedDayRange.to.day}`;
      setQueryParams({
        ...queryParams,
        from: moment(finalFromDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
        to: moment(finalToDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
      });
    } else {
      setQueryParams({
        ...queryParams,
        from: null,
        to: null,
      });
    }
  }, [selectedDayRange]);

  return (
    <fieldset className="text-center  p-4 mb-16">
      <div className="flex flex-col align-center justify-center w-full rounded-lg bg-white p-4 shadow">
        <div className="flex items-center justify-between mb-10 mt-6 px-8">
          <div className="flex align-center justify-between w-3/4">
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

          <div className="w-2/4">
            <div className="flex flex-col justify-end lg:flex-row text-xs text-gray-600 space-y-4 lg:space-y-0 lg:space-x-2 rtl:space-x-reverse">
              <div className="flex flex-col justify-end md:flex-row space-y-4 md:space-y-0 md:space-x-2 rtl:space-x-reverse">
                <div className="inline-flex flex-col justify-center items-center space-y-2">
                  <div className="w-20 h-2 rounded" style={{backgroundColor: '#FF0060'}} />
                  <span>واکسن نزده</span>
                </div>
                <div className="inline-flex flex-col justify-center items-center space-y-2">
                  <div className="w-20 h-2 rounded" style={{backgroundColor: '#716DE3'}} />
                  <span>دوز پنجم</span>
                </div>
                <div className="inline-flex flex-col justify-center items-center space-y-2">
                  <div className="w-20 h-2 rounded" style={{backgroundColor: '#BFDDE7'}} />
                  <span>دوز چهارم</span>
                </div>
                <div className="inline-flex flex-col justify-center items-center space-y-2">
                  <div className="w-20 h-2 rounded" style={{backgroundColor: '#004D65'}} />
                  <span>دوز سوم</span>
                </div>
                <div className="inline-flex flex-col justify-center items-center space-y-2">
                  <div className="w-20 h-2 rounded" style={{backgroundColor: '#209F92'}} />
                  <span>دوز دوم</span>
                </div>
                <div className="inline-flex flex-col justify-center items-center space-y-2">
                  <div className="w-20 h-2 rounded" style={{backgroundColor: '#F3BC06'}} />
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
        {!loading && errorMessage ? (
          <div className="p-40 text-red-500">{errorMessage}</div>
        ) : (
          <HeadlessChart data={initialData} optionsProp={optionChart} />
        )}
      </div>
    </fieldset>
  );
};

export default OverviewOfTheLatestPublicGuildVaccinationStatus;
