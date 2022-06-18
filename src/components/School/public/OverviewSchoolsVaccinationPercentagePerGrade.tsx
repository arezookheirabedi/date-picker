import React, {useEffect, useState} from 'react';
// @ts-ignore
import moment from 'moment-jalaali';
import hcsService from 'src/services/hcs.service';
import DatePickerModal from 'src/components/SingleDatePickerModal';
import Calendar from 'src/components/Calendar/SingleCalendar';
// import SearchableSingleSelect from 'src/components/SearchableSingleSelect';
import Charts from '../../Charts';
import {cancelTokenSource, msgRequestCanceled} from '../../../helpers/utils';
import Spinner from '../../Spinner';

const {Stacked} = Charts;

interface OverviewPerProvinceProps {}

const OverviewSchoolsVaccinationPercentagePerGrade: React.FC<OverviewPerProvinceProps> = () => {
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
          data: [...nonVaccinesPercentage],
          color: '#e21416',
          dataLabels: {
            // enabled: true,
            // rotation: 270,
          },
        },
        {
          dataLabels: {
            // enabled: true,
            // rotation: 270,
            // format: "{y}%"
          },
          name: 'واکسن زده',
          data: [...vaccinesPercentage],
          color: '#04b086',
          // color: {
          //   linearGradient: {
          //     x1: 0,
          //     x2: 0,
          //     y1: 0,
          //     y2: 1,
          //   },
          //   stops: [
          //     [0, '#048365'],
          //     [1, '#04d2a0'],
          //   ],
          // },
        },
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
    const idSetTimeOut = setTimeout(() => {
      getLinearOverview({...queryParams, tag: 'edu', category: 'grade'});
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
    <fieldset className="mb-16 rounded-xl border p-4 text-center">
      <legend className="mx-auto px-3 text-black">
        نگاه کلی به درصد واکسیناسیون آموزش و پرورش در هر مقطع تحصیلی
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
        {!loading && dataset.length > 0 && !errorMessage && (
          <Stacked
            data={dataset}
            categories={categories}
            tooltipSuffix="٪"
            yAxisLabelFormat="٪{text}"
          />
        )}
        {dataset.length === 0 && !loading && !errorMessage && (
          <div className="p-40 text-red-500">موردی برای نمایش وجود ندارد.</div>
        )}
      </div>
    </fieldset>
  );
};

export default OverviewSchoolsVaccinationPercentagePerGrade;
