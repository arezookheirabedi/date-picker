import React, {useEffect, useState} from 'react';
import {useHistory, useLocation} from "react-router-dom";

// @ts-ignore
// eslint-disable-next-line
import moment from 'moment-jalaali';
import recruitmentServices from 'src/services/recruitment.service';
import Calendar from 'src/components/Calendar';
import DatePickerModal from '../../DatePickerModal';
import RangeDateSliderFilter from '../../RangeDateSliderFilter';
import Charts from '../../Charts';
import Spinner from '../../Spinner';
// import TagsSelect from '../../TagsSelect';
import SearchableSingleSelect from '../../SearchableSingleSelect';
import {sideCities} from "../../../helpers/utils";


const {Line} = Charts;

interface IParams {
  tag: string;
  category: string;
  timeBoxType?: string;
  from?: any;
  to?: any;
}

interface OverviewPatientsProvinceProps {
  cityTitle: any
}

const OverviewPatientsProvince: React.FC<OverviewPatientsProvinceProps> = ({cityTitle}) => {
  const [data, setData] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null) as any;
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null,
  }) as any;

  const focusFromDate = () => {
    setShowDatePicker(true);
  };

  const [queryParams, setQueryParams] = useState<IParams>({
    tag: 'employee',
    category: 'heName',
    timeBoxType: 'DAILY',
    from: '',
    to: '',
  }) as any;

  const getLinearOverview = async (params: any) => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const response = await recruitmentServices.testResultTimeBased(params);
      setData(response.data);
    } catch (error: any) {
      setErrorMessage('خطا در اتصال به سرور')
      // setErrorMessage(error.message);
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const idSetTimeOut = setTimeout(() => {
      const params = new URLSearchParams(location.search);
      const provinceName = params.get('provinceName') || ('تهران' as any);

      const existsCity = sideCities.some((item: any) => {
        return item.name === provinceName;
      });
      if (existsCity) {
        getLinearOverview({
          ...queryParams, province: provinceName
        });
      } else {
        history.push('/dashboard/recruitment/province');
      }


    }, 500);

    return () => clearTimeout(idSetTimeOut);
  }, [queryParams, location.search]);

  useEffect(() => {
    if (selectedDayRange.from && selectedDayRange.to) {
      const finalFromDate = `${selectedDayRange.from.year}/${selectedDayRange.from.month}/${selectedDayRange.from.day}`;
      const finalToDate = `${selectedDayRange.to.year}/${selectedDayRange.to.month}/${selectedDayRange.to.day}`;
      // const m = moment(finalFromDate, 'jYYYY/jM/jD'); // Parse a Jalaali date
      // console.log(moment(finalFromDate, 'jYYYY/jM/jD').format('YYYY-M-DTHH:mm:ss'));
      setQueryParams({
        ...queryParams,
        from: moment(finalFromDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
        to: moment(finalToDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
      });
    }
    if (selectedDayRange.clear) {
      setQueryParams({
        ...queryParams,
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

  //     console.log(lastState)

  //     setQueryParams({
  //       ...queryParams,
  //       // type: lastState,
  //       type: "DAILY",
  //       from: moment(finalFromDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
  //       to: moment(finalToDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
  //     });
  //   } else {
  //     setQueryParams({
  //       ...queryParams,
  //       type: 'DAILY',
  //       from: null,
  //       to: null,
  //     });
  //   }
  // }, [selectedDayRange]);

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">
        نگاه کلی مبتلایان کارکنان دولت در استان &nbsp;
        {cityTitle}
      </legend>
      <div className="flex flex-col align-center justify-center w-full rounded-lg bg-white p-4 shadow">
        <div className="flex items-center justify-between mb-10 mt-6">
          <div className="flex align-center justify-start flex-grow px-8">
            <SearchableSingleSelect
              objectKey="categoryValue"
              placeholder="کل کارکنان"
              tag="employee"
              category="heName"
              setQueryParams={setQueryParams}
              queryParams={queryParams}
            />

            <div className="flex align-center justify-between mr-8">
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

          <RangeDateSliderFilter
            changeType={v =>
              setQueryParams({
                ...queryParams,
                timeBoxType: v,
              })
            }
            selectedType={queryParams.timeBoxType}
            dates={selectedDayRange}
            wrapperClassName="w-1/4"
          />
        </div>

        {loading && (
          <div className="p-40">
            <Spinner/>
          </div>
        )}
        {errorMessage && <div className="p-40 text-red-500">{errorMessage}</div>}
        {!loading && data.length > 0 && !errorMessage && <Line data={data}/>}
        {data.length === 0 && !loading && !errorMessage && (
          <div className="p-40 text-red-500">موردی برای نمایش وجود ندارد.</div>
        )}
      </div>
    </fieldset>
  );
};

export default OverviewPatientsProvince;

