import React, {useEffect, useState} from 'react';
// @ts-ignore
import moment from 'moment-jalaali';

import hcsService from 'src/services/hcs.service';
import DatePickerModal from 'src/components/SingleDatePickerModal';
import Calendar from 'src/components/Calendar/SingleCalendar';
// import SearchableSingleSelect from 'src/components/SearchableSingleSelect';
import {useHistory, useLocation} from 'react-router-dom';
import Charts from '../../Charts';
import {cancelTokenSource, msgRequestCanceled, sideCities} from '../../../helpers/utils';
import Spinner from '../../Spinner';

const {Stacked} = Charts;

interface OverviewPerProvinceProps {
  cityTitle: string;
}

const OverviewSchoolsVaccinationPercentagePerGradeProvince: React.FC<OverviewPerProvinceProps> = ({
  cityTitle,
}) => {
  const location = useLocation();
  const history = useHistory();
  const [dataset, setDataset] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
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

      setDataset([
        {
          name: 'واکسن نزده',
          color: '#e21416',
          data: [...nonVaccinesPercentage],
    
        },
        {
          name: 'واکسن زده',
          color:'#04b086',
          data: [...vaccinesPercentage],
        
        }
      ]);
      setCategories([...grade]);
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
    const idSetTimeOut = setTimeout(() => {
      if (existsCity) {
        getLinearOverview({...queryParams, tag: 'edu', category: 'grade',province:provinceName});
      } else {
        history.push('/dashboard/school/province');
      }
    }, 500);

    return () => {
      clearTimeout(idSetTimeOut);
      cancelRequest();
      setDataset([]);
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
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">
        نگاه کلی به درصد واکسیناسیون آموزش و پرورش استان {cityTitle} در هر مقطع تحصیلی
      </legend>
      <div className="flex flex-col align-center justify-center w-full rounded-lg bg-white p-4 shadow">
        <div className="flex align-center justify-spacebetween space-x-5 rtl:space-x-reverse mb-8">
          <div className="flex align-center space-x-5 rtl:space-x-reverse">
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
        {!loading && dataset.length > 0 && !errorMessage && (
          <Stacked data={dataset} categories={categories} tooltipSuffix="٪" />
        )}
        {dataset.length === 0 && !loading && !errorMessage && (
          <div className="p-40 text-red-500">موردی برای نمایش وجود ندارد.</div>
        )}
      </div>
    </fieldset>
  );
};

export default OverviewSchoolsVaccinationPercentagePerGradeProvince;
