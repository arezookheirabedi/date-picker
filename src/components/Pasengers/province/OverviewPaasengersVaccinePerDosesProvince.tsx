import React, {useEffect, useState} from 'react';
// @ts-ignore
// import moment from 'moment-jalaali';
import axios from 'axios';
import {useHistory, useLocation} from 'react-router-dom';
// import DatePickerModal from '../../DatePickerModal';
// import calendar from '../../../assets/images/icons/calendar.svg';
import Charts from '../../Charts';
import {sideCities} from '../../../helpers/utils';
// import Calendar from '../../Calendar';
import Spinner from '../../Spinner';
import hcsService from '../../../services/hcs.service';

const {Stacked} = Charts;

interface OverviewPaasengersVaccinePerDosesProvinceProps {
  cityTitle: string;
}

const OverviewPaasengersVaccinePerDosesProvince: React.FC<OverviewPaasengersVaccinePerDosesProvinceProps> =
  ({cityTitle}) => {
    const {CancelToken} = axios;
    const source = CancelToken.source();
    const location = useLocation();
    const history = useHistory();
    const [categories, setCategories] = useState<any[]>([]);
    const [dataset, setDataset] = useState<any[]>([]);
    // const [showDatePicker, setShowDatePicker] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    // const [selectedDayRange, setSelectedDayRange] = useState({
    //   from: null,
    //   to: null,
    // }) as any;

    // const focusFromDate = () => {
    //   setShowDatePicker(true);
    // };

    // eslint-disable-next-line
    const [query, setQuery] = useState({
      from: null,
      to: null,
      province: cityTitle,
    });

    // eslint-disable-next-line
    const getLinearOverview = async (params: any) => {
      setLoading(true);
      setErrorMessage(null);
      try {
        const {data} = await hcsService.tripVaccinationGeneral(params, {CancelToken: source.token});
        console.log(data);
        // const {data} = await hcsService.dosesTagBased(params);
        const dataChart: any = {
          '0': Number(data.totalNonVaccinesCount || 0), // واکسن نزدع
          '1': Number(data.doses[1] || 0), // دوز اول
          '2': Number(data.doses[2] || 0), // دوز دوم
          '3': Number(data.doses[3] || 0), // دوز سوم
          '4': Number(data.doses[4] || 0), // دوز چهارم
          '5': Number(data.doses[5] || 0), // دوز پنجم
        };

        // eslint-disable-next-line
        let firstDose: number = 0;
        // eslint-disable-next-line
        let secondDose: number = 0;
        // eslint-disable-next-line
        let thirdDose: number = 0;
        // eslint-disable-next-line
        let forthDose: number = 0;
        // eslint-disable-next-line
        let fifthDose: number = 0;
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
              forthDose += value;
              break;
            case '5':
              fifthDose += value;
              break;

            default:
              break;
          }
        });

        setDataset([
          {
            name: 'واکسیناسیون',
            type: 'column',
            data: [
              {name: 'دوز اول', y: firstDose, color: '#F3BC06'},
              {name: 'دوز دوم', y: secondDose, color: '#209F92'},
              {name: 'دوز سوم', y: thirdDose, color: '#004D65'},
              {name: 'دوز چهارم', y: forthDose, color: '#BFDDE7'},
              {name: 'دوز پنجم', y: fifthDose, color: '#716DE3'},
              {name: 'واکسن نزده', y: noDose, color: '#FF0060'},
            ],
          },
        ]);

        setCategories(['دوز اول', 'دوز دوم', 'دوز سوم', 'دوز چهارم', 'دوز پنجم', 'واکسن نزده']);
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
        idSetTimeOut = setTimeout(() => {
          getLinearOverview({...query, province: provinceName});
        }, 500);
      } else {
        history.push('/dashboard/vaccination/province');
      }

      return () => {
        if (existsCity) {
          source.cancel('Operation canceled by the user.');
          clearTimeout(idSetTimeOut);
          setDataset([]);
        }
      };
    }, [query, location.search]);

    // useEffect(() => {
    //   if (selectedDayRange.from && selectedDayRange.to) {
    //     const finalFromDate = `${selectedDayRange.from.year}/${selectedDayRange.from.month}/${selectedDayRange.from.day}`;
    //     const finalToDate = `${selectedDayRange.to.year}/${selectedDayRange.to.month}/${selectedDayRange.to.day}`;
    //     // const m = moment(finalFromDate, 'jYYYY/jM/jD'); // Parse a Jalaali date
    //     // console.log(moment(finalFromDate, 'jYYYY/jM/jD').format('YYYY-M-DTHH:mm:ss'));
    //     setQuery({
    //       ...query,
    //       from: moment(finalFromDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
    //       to: moment(finalToDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
    //     });
    //   }
    //   if (selectedDayRange.clear) {
    //     setQuery({
    //       ...query,
    //       from: null,
    //       to: null,
    //     });
    //   }
    // }, [selectedDayRange]);

    return (
      <fieldset className="text-center border rounded-xl p-4 mb-16">
        <legend className="text-black mx-auto px-3">
          نگاه کلی به وضعیت مسافران استان {cityTitle}
        </legend>
        <div className="flex flex-col align-center justify-center w-full rounded-lg bg-white p-4 shadow">
          <div className="flex items-center justify-between mb-10 mt-6 px-8">
            <div className="flex align-center justify-between w-3/4">
              <div className="flex align-center justify-between">
                {/* {showDatePicker ? (
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
                /> */}
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
                </div>
                <div className="flex flex-col justify-end md:flex-row space-y-4 md:space-y-0 md:space-x-2 rtl:space-x-reverse">
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
          {errorMessage && <div className="p-40 text-red-500">{errorMessage}</div>}
          {!loading && dataset.length > 0 && !errorMessage && (
            <Stacked data={dataset} categories={categories} notPercent />
          )}
          {dataset.length === 0 && !loading && !errorMessage && (
            <div className="p-40 text-red-500">موردی برای نمایش وجود ندارد.</div>
          )}
        </div>
      </fieldset>
    );
  };

export default OverviewPaasengersVaccinePerDosesProvince;
