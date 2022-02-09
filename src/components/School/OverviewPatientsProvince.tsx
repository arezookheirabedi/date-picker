import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useHistory, useLocation} from 'react-router-dom';
// @ts-ignore
// import moment from 'moment-jalaali';
import DatePickerModal from '../DatePickerModal';
import calendar from '../../assets/images/icons/calendar.svg';
import RangeDateSliderFilter from '../RangeDateSliderFilter';
import Charts from '../Charts';
import {sideCities, toPersianDigit} from '../../helpers/utils';
import hcsService from '../../services/hcs.service';
import Spinner from '../Spinner';
import TagsSelect from '../TagsSelect';

const {Line} = Charts;

interface IParams {
  status: string;
  type: string;
  from: any;
  to: any;
  tags: any;
}

interface OverviewPatientsProvinceProps {
  cityTitle: any;
}

const OverviewPatientsProvince: React.FC<OverviewPatientsProvinceProps> = ({cityTitle}) => {
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

  const location = useLocation();
  const history = useHistory();

  const {CancelToken} = axios;
  const source = CancelToken.source();

  const [queryParams, setQueryParams] = useState<IParams>({
    status: 'POSITIVE',
    type: 'MONTHLY',
    from: '',
    to: '',
    tags: '',
  });

  const focusFromDate = () => {
    setShowDatePicker(true);
  };

  const generateFromDate: any = () => {
    // eslint-disable-next-line
    return selectedDayRange.from
      ? // eslint-disable-next-line
        selectedDayRange.from.year +
          '/' +
          selectedDayRange.from.month +
          '/' +
          selectedDayRange.from.day
      : '';
  };

  const generateToDate: any = () => {
    // eslint-disable-next-line
    return selectedDayRange.to
      ? // eslint-disable-next-line
        selectedDayRange.to.year + '/' + selectedDayRange.to.month + '/' + selectedDayRange.to.day
      : '';
  };

  const getLinearOverview = async (params: any) => {
    setLoading(true);
    setErrorMessage(null);
    setIsCancel(false);
    try {
      const response = await hcsService.testResultTimeBased(params, {cancelToken: source.token});
      setData(response.data);
    } catch (error: any) {
      if (error.message !== 'cancel') {
        setErrorMessage(error.message);
      }
      if (error && error.message === 'cancel') {
        setIsCancel(true);
      }
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
        getLinearOverview({
          organization: 'education',
          ...queryParams,
          tags: [...(queryParams.tags || []), `#province# استان ${provinceName}`].join(','),
          // tags: ['#grade# دانش آموز پایه هشتم', `#province# استان ${provinceName}`].join(','),
        });
      }, 500);
    } else {
      history.push('/dashboard/school/province');
    }

    return () => {
      if (existsCity) {
        source.cancel('Operation canceled by the user.');
        clearTimeout(idSetTimeOut);
      }
    };
  }, [queryParams, location.search]);

  useEffect(() => {
    return () => {
      setData([]);
      setIsCancel(false);
    };
  }, [history]);

  // useEffect(() => {
  //   if (selectedDayRange.from && selectedDayRange.to) {
  //     const finalFromDate = `${selectedDayRange.from.year}/${selectedDayRange.from.month}/${selectedDayRange.from.day}`;
  //     const finalToDate = `${selectedDayRange.to.year}/${selectedDayRange.to.month}/${selectedDayRange.to.day}`;
  //     // const m = moment(finalFromDate, 'jYYYY/jM/jD'); // Parse a Jalaali date
  //     // console.log(moment(finalFromDate, 'jYYYY/jM/jD').format('YYYY-M-DTHH:mm:ss'));
  //     setQueryParams({
  //       ...queryParams,
  //       from: moment(finalFromDate, 'jYYYY/jM/jD').format('YYYY-MM-DDTHH:mm:ss'),
  //       to: moment(finalToDate, 'jYYYY/jM/jD').format('YYYY-MM-DDTHH:mm:ss'),
  //     });
  //   }
  // }, [selectedDayRange]);

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">
        نگاه کلی مبتلایان آموزش و پرورش در استان &nbsp;
        {cityTitle}
      </legend>
      <div className="flex flex-col align-center justify-center w-full rounded-lg bg-white p-4 shadow">
        <div className="flex items-center justify-between mb-10 mt-6">
          <div className="flex align-center justify-between flex-grow px-8">
            <TagsSelect
              placeholder="کل آموزش و پرورش"
              tagPattern="^(?!.*(province|city)).*$"
              organization="education"
              setQueryParams={setQueryParams}
              queryParams={queryParams}
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
              <div className="relative z-20 inline-block text-left shadow-custom rounded-lg px-4 py-1">
                <div
                  className="inline-flex justify-center items-center w-full py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 cursor-pointer"
                  onClick={focusFromDate}
                >
                  {selectedDayRange.from && (
                    <span className="ml-4 whitespace-nowrap truncate text-xs">
                      {toPersianDigit(generateFromDate())}
                    </span>
                  )}
                  <img src={calendar} alt="x" className="w-5 h-5" />
                </div>
              </div>
              <div className="flex items-center justify-start mx-4">
                <span className="dash-separator" />
              </div>
              <div className=" shadow-custom rounded-lg px-4 py-1">
                <div
                  className="flex justify-center items-center w-full py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 cursor-pointer"
                  onClick={focusFromDate}
                >
                  {selectedDayRange.to && (
                    <span className="ml-4 whitespace-nowrap truncate text-xs">
                      {toPersianDigit(generateToDate())}
                    </span>
                  )}
                  <img src={calendar} alt="x" className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>

          <RangeDateSliderFilter
            changeType={v => console.log('D', v)}
            selectedType={queryParams.type}
            dates={selectedDayRange}
            wrapperClassName="w-1/4"
          />
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

export default OverviewPatientsProvince;
