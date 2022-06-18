import React, {useEffect, useState} from 'react';
// @ts-ignore
import moment from 'moment-jalaali';

import hcsService from 'src/services/hcs.service';
import DatePickerModal from 'src/components/SingleDatePickerModal';
import Calendar from 'src/components/Calendar/SingleCalendar';
// import SearchableSingleSelect from 'src/components/SearchableSingleSelect';
import {useHistory, useLocation} from 'react-router-dom';
import {isEmpty} from 'lodash';
import Highcharts from 'highcharts';
import Charts from '../../Charts';
import {cancelTokenSource, msgRequestCanceled, sideCities} from '../../../helpers/utils';
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
  // eslint-disable-next-line
  const [showDatePicker, setShowDatePicker] = useState(false);
  // eslint-disable-next-line
  const [errorMessage, setErrorMessage] = useState(null);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [selectedDay, setSelectedDay] = useState(null) as any;

  const focusFromDate = () => {
    setShowDatePicker(true);
  };

  const [queryParams, setQueryParams] = useState({
    to: null,
  });

  const cancelToken = cancelTokenSource();

  function cancelRequest() {
    cancelToken.cancel(msgRequestCanceled);
  }

  const getLinearOverview = async (params: any) => {
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

      data.forEach((item: any) => {
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
    } catch (error: any) {
      setErrorMessage(error.message);
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const converters = {
    fa(number: any) {
      return number.toString().replace(/\d/g, (d: any) => {
        return String.fromCharCode(d.charCodeAt(0) + 1728);
      });
    },
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

      events: {
        redraw: () => {
          // eslint-disable-next-line
          // console.log('redraw');
        },
      },
      // zoomType: 'x'
      // styledMode: true
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
    // colors: ['#FFC700', '#883BA4', '#175A76', '#00AAB1'],
    plotOptions: {
      series: {
        // stacking: 'percent',
        stacking: 'percent',
        // borderRadius: 5,
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
      // lineDashStyle: 'dash',
      // lineColor: '#000000',
      // lineWidth: 1
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
      // headerFormat: `<div style="min-width:220px">{point.x}</div>`
    },

    series: [],
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const provinceName = params.get('provinceName') || ('تهران' as any);
    const existsCity = sideCities.some((item: any) => {
      return item.name === provinceName;
    });
    const idSetTimeOut = setTimeout(() => {
      if (existsCity) {
        getLinearOverview({...queryParams, tag: 'edu', category: 'grade', province: provinceName});
      } else {
        history.push('/dashboard/school/province');
      }
    }, 500);

    return () => {
      clearTimeout(idSetTimeOut);
      cancelRequest();
      setDataset({});
    };
  }, [queryParams]);

  useEffect(() => {
    if (selectedDay) {
      const finalToDate = `${selectedDay.year}/${selectedDay.month}/${selectedDay.day}`;
      setQueryParams({
        ...queryParams,
        to: moment(finalToDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
      });
    } else {
      setQueryParams({
        ...queryParams,
        to: null,
      });
    }
  }, [selectedDay]);

  return (
    <fieldset className="mb-16 rounded-xl border p-4 text-center">
      <legend className="mx-auto px-3 text-black">
        نگاه کلی به درصد واکسیناسیون آموزش و پرورش استان {cityTitle} در هر مقطع تحصیلی
      </legend>
      <div className="align-center flex w-full flex-col justify-center rounded-lg bg-white p-4 shadow">
        <div className="align-center justify-spacebetween mb-8 flex space-x-5 rtl:space-x-reverse">
          <div className="align-center flex space-x-5 rtl:space-x-reverse">
            {/* <div className="flex items-center">
              <SearchableSingleSelect
                objectKey="categoryValue"
                placeholder="کل آموزش و پرورش"
                category="grade"
                tag="edu"
                setQueryParams={setQueryParams}
                queryParams={queryParams}
              />
            </div> */}
            <div className="flex items-center">
              {' '}
              {showDatePicker ? (
                <DatePickerModal
                  setSelectedDay={setSelectedDay}
                  selectedDay={selectedDay}
                  setShowDatePicker={setShowDatePicker}
                  showDatePicker
                />
              ) : null}
              <Calendar action={focusFromDate} to={selectedDay} setSelectedDay={setSelectedDay} />
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

export default OverviewSchoolsVaccinationPercentagePerGradeProvince;
