import React, {useEffect, useState} from 'react';
// @ts-ignore
import moment from 'moment-jalaali';
import {isEmpty} from 'lodash';
//
import {chartNumberConverters as converters} from 'src/helpers/utils';
import Highcharts from 'highcharts';
import DatePickerModal from '../../../DatePickerModal';
import Spinner from '../../../Spinner';
import Calendar from '../../../Calendar';
import HeadlessChart from '../HeadlessChart';
import useGetRatioOfInspection from '../../../../hooks/apis/useGetRatioOfInspection';

const OverviewRatioOfInspection: React.FC<{}> = () => {
    const [showDatePicker, setShowDatePicker] = useState(false);

    const [selectedDayRange, setSelectedDayRange] = useState({
        from: null,
        to: null,
      }) as any;

    const [query, setQuery] = useState({
        from: null,
        to: null,
    });

    const {
        data: dataset,
        loading,
        error: errorMessage,
      } = useGetRatioOfInspection(query);
      
    const focusFromDate = () => {
        setShowDatePicker(true);
    };

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
            borderWidth: 0
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
        }
      };

    return (
        <fieldset className="mb-16 rounded-xl border p-4 text-center">
          <legend className="mx-auto px-3 text-black">
          نگاه کلی نسبت نیاز به بازرسی به بازرسی‌های انجام شده به تفکیک استان
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
                      <div className="h-2 w-20 rounded" style={{backgroundColor: '#07816C'}} />
                      <span>بازرسی‌های انجام شده</span>
                      </div>

                      <div className="inline-flex flex-col items-center justify-center space-y-2">
                      <div className="h-2 w-20 rounded" style={{backgroundColor: '#F3BC06'}} />
                      <span>نیاز به بازرسی</span>
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
            {!loading && !isEmpty(dataset) && !errorMessage && (
              <HeadlessChart data={dataset} optionsProp={optionChart} />
            )}
            {isEmpty(dataset) && !loading && !errorMessage && (
              <div className="p-40 text-red-500">موردی برای نمایش وجود ندارد.</div>
            )}
          </div>
        </fieldset>
      );
}

export default OverviewRatioOfInspection;