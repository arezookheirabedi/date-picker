import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useHistory, useLocation} from 'react-router-dom';
// @ts-ignore
import moment from 'moment-jalaali';
// import TagsSelect from 'src/components/TagsSelect';
import DatePickerModal from '../../DatePickerModal';
// import calendar from '../../../assets/images/icons/calendar.svg';
// import RangeDateSliderFilter from '../../RangeDateSliderFilter';
import Charts from '../../Charts';
import {sideCities} from '../../../helpers/utils';
import Spinner from '../../Spinner';

import Calendar from '../../Calendar';
import hcsService from '../../../services/hcs.service';

const {Line} = Charts;

interface OverviewPatientsPassengersProvinceProps {
  cityTitle: any;
}

const OverviewPatientsPassengersProvince: React.FC<OverviewPatientsPassengersProvinceProps> = ({
  cityTitle,
}) => {
  const [data, setData] = useState([]);
  // eslint-disable-next-line
  const [provinceTitle, setProvinceTitle] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  const [isCancel, setIsCancel] = useState(false);
  // eslint-disable-next-line
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null,
  }) as any;

  const [query, setQuery] = useState({
    // status: 'POSITIVE',
    // type: 'MONTHLY',
    from: null,
    to: null,
  });

  const location = useLocation();
  const history = useHistory();

  const {CancelToken} = axios;
  const source = CancelToken.source();

  const focusFromDate = () => {
    setShowDatePicker(true);
  };

  const getColumnChartTestResult = async (params: any, province: any) => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const response = await hcsService.patientsAfterTrip(
        {...params, province},
        {
          cancelToken: source.token,
        }
      );
      setData(response.data);
    } catch (error: any) {
      setErrorMessage(error.message);
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
      setProvinceTitle(provinceName);
      idSetTimeOut = setTimeout(() => {
        getColumnChartTestResult(query, provinceName);
      }, 500);
    } else {
      history.push('/dashboard/passenger/province');
    }

    return () => {
      if (existsCity) {
        source.cancel('Operation canceled by the user.');
        clearTimeout(idSetTimeOut);
      }
    };
  }, [query, location.search]);

  useEffect(() => {
    return () => {
      setData([]);
      setIsCancel(false);
    };
  }, [history]);

  useEffect(() => {
    if (selectedDayRange.from && selectedDayRange.to) {
      const finalFromDate = `${selectedDayRange.from.year}/${selectedDayRange.from.month}/${selectedDayRange.from.day}`;
      const finalToDate = `${selectedDayRange.to.year}/${selectedDayRange.to.month}/${selectedDayRange.to.day}`;
      // const m = moment(finalFromDate, 'jYYYY/jM/jD'); // Parse a Jalaali date
      // console.log(moment(finalFromDate, 'jYYYY/jM/jD').format('YYYY-M-DTHH:mm:ss'));
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

  // useEffect(() => {
  //   if (selectedDayRange.from && selectedDayRange.to) {
  //     const finalFromDate = `${selectedDayRange.from.year}/${selectedDayRange.from.month}/${selectedDayRange.from.day}`;
  //     const finalToDate = `${selectedDayRange.to.year}/${selectedDayRange.to.month}/${selectedDayRange.to.day}`;

  //     const tmp: any[] = [];
  //     let lastState = 'ANNUAL';

  //     const start = moment(finalFromDate, 'jYYYY/jM/jD');
  //     const end = moment(finalToDate, 'jYYYY/jM/jD');

  //     const duration = moment.duration(end.diff(start));

  //     if (!duration.years()) {
  //       tmp.push(3);
  //       lastState = 'MONTHLY';
  //     }

  //     if (!duration.months() && !duration.years()) {
  //       tmp.push(2);
  //       lastState = 'WEEKLY';
  //     }

  //     if (!duration.weeks() && !duration.months() && !duration.years()) {
  //       tmp.push(1);
  //       lastState = 'DAILY';
  //     }

  //     setQueryParams({
  //       ...queryParams,
  //       type: lastState,
  //       from: moment(finalFromDate, 'jYYYY/jM/jD').format('YYYY-MM-DDTHH:mm:ss'),
  //       to: moment(finalToDate, 'jYYYY/jM/jD').format('YYYY-MM-DDTHH:mm:ss'),
  //     });
  //   } else {
  //     setQueryParams({
  //       ...queryParams,
  //       type: 'MONTHLY',
  //       from: null,
  //       to: null,
  //     });
  //   }
  // }, [selectedDayRange]);

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">
        نگاه کلی به مبتلا شدگان بعد از سفر در استان &nbsp;
        {cityTitle}
      </legend>
      <div className="flex flex-col align-center justify-center w-full rounded-lg bg-white p-4 shadow">
        <div className="flex items-center justify-between mb-10 mt-6">
          <div className="flex align-center justify-between flex-grow px-8">
            {/* <TagsSelect
              placeholder="کل آموزش و پرورش"
              category="grade"
              tag="edu"
              setQueryParams={setQuery}
              queryParams={query}
            /> */}

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

          {/* <RangeDateSliderFilter
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

        {(loading || isCancel) && (
          <div className="p-40">
            <Spinner />
          </div>
        )}
        {errorMessage && !isCancel && <div className="p-40 text-red-500">{errorMessage}</div>}
        {!loading && !isCancel && data.length > 0 && !errorMessage && <Line data={data} />}
        {data.length === 0 && !loading && !errorMessage && !isCancel && (
          <div className="p-40 text-red-500">موردی برای نمایش وجود ندارد.</div>
        )}
      </div>
    </fieldset>
  );
};

export default OverviewPatientsPassengersProvince;
