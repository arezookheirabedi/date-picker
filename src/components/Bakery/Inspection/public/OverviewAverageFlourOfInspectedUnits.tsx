import React, {useEffect, useState} from 'react';
// @ts-ignore
import moment from 'moment-jalaali';
import {isEmpty} from 'lodash';
//
import DatePickerModal from '../../../DatePickerModal';
import Spinner from '../../../Spinner';
import Calendar from '../../../Calendar';
import HeadlessChart from '../../HeadlessChart';
import useGetOverviewAverageFlourOfInspectedUnits from '../../../../hooks/apis/inspection/useGetOverviewAverageFlourOfInspectedUnits';

const optionChart = {
  chart: {
    type: 'column',
    className: 'transport-line-chart',
  },
  title: {
    text: null,
  },
  credits: {
    enabled: false,
  },
  colors: ['#07816C'],
  plotOptions: {
    column: {
      marker: {
        enabled: false,
        states: {
          hover: {
            enabled: true,
            lineColor: '#fff',
            lineWidth: 3
          },
        },
      },
      lineWidth: 2,
      threshold: null,
      borderRadius: 4,
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
    style: {
      direction: 'rtl',
      textAlign: 'right',
      fontFamily: 'inherit',
      fontSize: 10,
    },
    borderWidth: 0
  }
};

const OverviewAverageFlourOfInspectedUnits: React.FC<{}> = () => {
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
  } = useGetOverviewAverageFlourOfInspectedUnits(query);

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

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">
      میانگین آرد مشاهده شده به تفکیک استان در واحدهای بازرسی شده کل کشور
      </legend>
      <div className="flex flex-col align-center justify-center w-full rounded-lg bg-white p-4 shadow">
        <div className="flex items-center justify-between mb-10 mt-6">
          <div className="flex align-center justify-start space-x-6 rtl:space-x-reverse flex-grow px-8">

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
        </div>

        {loading && (
          <div className="p-40">
            <Spinner />
          </div>
        )}
        {errorMessage && <div className="p-40 text-red-500">{errorMessage}</div>}
        {!loading && !isEmpty(dataset) && !errorMessage && (
          <HeadlessChart data={dataset} optionsProp={optionChart} />
        )}
        {isEmpty(dataset) && !loading && !errorMessage && (
          <div className="p-40 text-red-500">موردی برای نمایش وجود ندارد.</div>
        )}
      </div>
    </fieldset>
  );
};

export default OverviewAverageFlourOfInspectedUnits;
