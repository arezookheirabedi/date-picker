import React, {useEffect, useState} from 'react';
// @ts-ignore
import moment from 'moment-jalaali';
// import axios from 'axios';
// import DatePickerModal from '../../DatePickerModal';
// import calendar from '../../../assets/images/icons/calendar.svg';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import {data111} from 'src/components/Transport/monitoring/constant';
import {
  cancelTokenSource,
  msgRequestCanceled,
  //  toPersianDigit
} from '../../../helpers/utils';
import Spinner from '../../Spinner';
import DatePickerModal from '../../DatePickerModal';
import Calendar from '../../Calendar';

interface IOverviewGuildRegister {}

const OverviewGuildRegister: React.FC<IOverviewGuildRegister> = () => {
  const [dataset, setDataset] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [categories, setCategories] = useState<any[]>([]);
  // eslint-disable-next-line
  const [showDatePicker, setShowDatePicker] = useState(false);
  // eslint-disable-next-line
  const [errorMessage, setErrorMessage] = useState(null);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null,
  }) as any;

  const [queryParams, setQueryParams] = useState({
    from: null,
    to: null,
    tags: [],
  });

  const cancelToken = cancelTokenSource();

  function cancelRequest() {
    cancelToken.cancel(msgRequestCanceled);
  }

  const normalizeData = (data: Array<any>) => {
    const province: any[] = [];
    const registered: any[] = [];
    const unregistered: any[] = [];
    data.forEach((item: any) => {
      province.push(item.province);
      unregistered.push(item.unregister);
      registered.push(item.register);
    });

    setCategories([...province]);
    const newData = [
      {name: 'unregistered', data: [...unregistered]},
      {name: 'registered', data: [...registered]},
    ];
    setDataset([...newData]);
  };
  useEffect(() => {
    normalizeData(data111);
    return () => {
      cancelRequest();
      setDataset([]);
    };
  }, [queryParams]);

  useEffect(() => {
    if (selectedDayRange.from && selectedDayRange.to) {
      const finalFromDate = `${selectedDayRange.from.year}/${selectedDayRange.from.month}/${selectedDayRange.from.day}`;
      const finalToDate = `${selectedDayRange.to.year}/${selectedDayRange.to.month}/${selectedDayRange.to.day}`;
      setQueryParams({
        ...queryParams,
        from: moment(finalFromDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
        to: moment(finalToDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
        tags: [],
      });
    } else {
      setQueryParams({
        ...queryParams,
        from: null,
        to: null,
        tags: [],
      });
    }
  }, [selectedDayRange]);

  const focusFromDate = () => {
    setShowDatePicker(true);
  };

  const options = {
    chart: {
      type: 'column',
    },
    // title: {
    //   text: 'Monthly Average Rainfall',
    // },
    // subtitle: {
    //   text: 'Source: WorldClimate.com',
    // },
    xAxis: {
      categories: [...categories],
      crosshair: false,
    },
    yAxis: {
      min: 0,
      // title: {
      //   text: 'Rainfall (mm)',
      // },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [...dataset],
  };

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">
        نگاه کلی به درصد اصناف ثبت نامی در هر استان
      </legend>
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
        </div>

        {loading && (
          <div className="p-40">
            <Spinner />
          </div>
        )}
        {errorMessage && <div className="p-40 text-red-500">{errorMessage}</div>}
        {!loading && dataset.length > 0 && !errorMessage && (
          <HighchartsReact highcharts={Highcharts} options={options} />
          // <Stacked data={dataset} categories={categories} />
        )}
        {dataset.length === 0 && !loading && !errorMessage && (
          <div className="p-40 text-red-500">موردی برای نمایش وجود ندارد.</div>
        )}
        {/* <div className="flex justify-center items-center w-full">
          <Stacked data={dataset} categories={categories} />
        </div> */}
      </div>
    </fieldset>
  );
};

export default OverviewGuildRegister;
