import React, {useEffect, useState} from 'react';
import axios from 'axios';
// @ts-ignore
import moment from 'moment-jalaali';
import {useHistory, useLocation} from 'react-router-dom';
import Statistic from '../../../containers/Guild/components/Statistic';
import totalDriver from '../../../assets/images/icons/transport-color.svg';
import GreenVaccine from '../../../assets/images/icons/green-vaccine-lg.svg';
import Table from '../../Table';
import CategoryDonut from '../../../containers/Guild/components/CategoryDonut';
// import transportService from '../../../services/transport.service';
import YellowVaccineMd from '../../../assets/images/icons/yellow-vaccine-lg.svg';
import PurppleVaccineMd from '../../../assets/images/icons/purpple-vaccine-lg.svg';
import NavyVaccineMd from '../../../assets/images/icons/navy-vaccine-lg.svg';
import GrayVaccine2 from '../../../assets/images/icons/gray-vaccine-2.svg';
import Spinner from '../../Spinner';
import {sideCities, toPersianDigit} from '../../../helpers/utils';
import vaccineService from '../../../services/vaccine.service';
import hcsService from '../../../services/hcs.service';
import OrangeVaccine from "../../../assets/images/icons/orange-vaccine.svg";
import DarkgreenVaccine from "../../../assets/images/icons/darkgreen-vaccine.svg";
import DatePickerModal from "../../DatePickerModal";
import calendar from "../../../assets/images/icons/calendar.svg";


interface OverviewOfVaccinationInPublicTransportProvinceProps {
  cityTitle: any;
}

const initialDoses = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, null: 0};
const initialNumberOf = {
  doses: {...initialDoses},
  dosesToTotalPopulationPercentage: {...initialDoses},
  gtDoses: {...initialDoses},
  gtDosesToTotalDosesPercentage: {...initialDoses},
  totalNonVaccinesCount: 0,
  totalNonVaccinesCountToTotalPopulationPercentage: 0,
  totalPopulation: 0,
  totalVaccinesCount: 0,
  totalVaccinesCountToTotalPopulationPercentage: 0,
  // dosesPercentage: {...initialDoses},
  // gtDosesPercentage: {...initialDoses},
  // gtDosesToTotalPopulationPercentage: {...initialDoses},
  // totalUnknownVaccinesCount: 0,
  // totalVaccinesPercentage: 0,
};

const OverviewOfVaccinationInPublicTransportProvince: React.FC<OverviewOfVaccinationInPublicTransportProvinceProps> =
  ({cityTitle}) => {
    const [filterType, setFilterType] = useState({name: 'کمترین', enName: 'LOWEST'});
    const [numberOf, setNumberOf] = useState<any>(initialNumberOf);
    const [loading, setLoading] = useState(false);
    const [orgDataset, setOrgDataset] = useState<any>([]);
    const [dataset, setDataset] = useState<any>([]);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [datasetLoading, setDatasetLoading] = useState<any>([]);
    const [query, setQuery] = useState({
      from: null,
      to: null
    })

    const [selectedDayRange, setSelectedDayRange] = useState({
      from: null,
      to: null,
    }) as any;

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

    const clearSelectedDayRange = (e: any) => {
      e.stopPropagation();
      setSelectedDayRange({
        from: null,
        to: null,
        clear : true
      });
    };

    const {CancelToken} = axios;
    const source = CancelToken.source();

    // async function getReportsDose(param: any) {
    //   setReportsDoseLoading(true);
    //   try {
    //     const {data} = await transportService.reportsDose(param, {cancelToken: source.token});
    //     const normalizedData: any[] = [];
    //     let noDose = 0;
    //     let firstDose = 0;
    //     let secondDose = 0;
    //     let threeDose = 0;
    //     let allVaccination = 0;
    //     let moreThanThreeDose = 0;
    //     let unknownInformation = 0;
    //     data.dosesCount.forEach((item: any) => {
    //       // eslint-disable-next-line no-restricted-syntax
    //       for (const [key, value] of Object.entries(item)) {
    //         if (Number(key) === 0) {
    //           noDose += Number(value);
    //         }

    //         if (Number(key) === 1) {
    //           firstDose += Number(value);
    //         }

    //         if (Number(key) === 2) {
    //           secondDose += Number(value);
    //         }

    //         // temporary code
    //         if (Number(key) === 3 || Number(key) > 3) {
    //           threeDose += Number(value);
    //         }

    //         // if (Number(key) === 3) {
    //         //   threeDose += Number(value);
    //         // }

    //         if (Number(key) !== 0 && key !== 'null') {
    //           allVaccination += Number(value);
    //         }

    //         // temporary code
    //         if (Number(key) !== 0 && key !== 'null' && Number(key) > 3) {
    //           moreThanThreeDose += 0;
    //         }

    //         // if (Number(key) !== 0 && key !== 'null' && Number(key) > 3) {
    //         //   moreThanThreeDose += Number(value);
    //         // }

    //         if (key === 'null') {
    //           unknownInformation += Number(value);
    //         }
    //       }
    //     });
    //     normalizedData.push({
    //       threeDose,
    //       allVaccination,
    //       moreThanThreeDose,
    //       unknownInformation,
    //     });

    //     setReportsDose({
    //       noDose,
    //       firstDose,
    //       secondDose,
    //       threeDose,
    //       allVaccination,
    //       moreThanThreeDose,
    //       unknownInformation,
    //       allDrivers: unknownInformation + noDose + allVaccination,
    //     });
    //   } catch (error) {
    //     // eslint-disable-next-line
    //     console.log(error);
    //   } finally {
    //     setReportsDoseLoading(false);
    //   }
    // }

    // async function getOverviewByVaccinePercent(params: any) {
    //   setLoading(true);
    //   try {
    //     const {data} = await transportService.overviewVaccinePercent(params, {
    //       cancelToken: source.token,
    //     });
    //     const normalizedDate: any[] = [];

    //     data.forEach((item: any, index: number) => {
    //       let firstDose = 0;
    //       let secondDose = 0;
    //       let thirdDose = 0;
    //       let moreThanThreeDose = 0;
    //       let allVaccination = 0;
    //       let unknownInformation = 0;
    //       let noDose = 0;
    //       let total = 0;
    //       // eslint-disable-next-line
    //       for (const [key, value] of Object.entries(item.doseCountMap)) {
    //         if (Number(key) === 0) {
    //           noDose += Number(value);
    //         }

    //         if (Number(key) === 1) {
    //           firstDose += Number(value);
    //         }

    //         if (Number(key) === 2) {
    //           secondDose += Number(value);
    //         }

    //         // temporary code
    //         if (Number(key) === 3 || Number(key) > 3) {
    //           thirdDose += Number(value);
    //         }

    //         // if (Number(key) === 3) {
    //         //   thirdDose += Number(value);
    //         // }

    //         // temporary code
    //         if (Number(key) !== 0 && key !== 'null' && Number(key) > 3) {
    //           moreThanThreeDose += 0;
    //         }

    //         // if (Number(key) !== 0 && key !== 'null' && Number(key) > 3) {
    //         //   moreThanThreeDose += Number(value);
    //         // }

    //         if (Number(key) !== 0 && key !== 'null') {
    //           allVaccination += Number(value);
    //         }

    //         if (key === 'null') {
    //           unknownInformation += Number(value);
    //         }

    //         total = allVaccination + noDose + unknownInformation;
    //       }

    //       normalizedDate.push({
    //         id: `ovvac_${index}`,
    //         name: getServiceTypeName(item.serviceType),
    //         firstDosePercentage: (firstDose * 100) / total,
    //         secondDosePercentage: (secondDose * 100) / total,
    //         thirdDosePercentage: (thirdDose * 100) / total,
    //         otherDose: (moreThanThreeDose * 100) / total,
    //         unknownInformation: (unknownInformation * 100) / total,
    //         allDoses: ((firstDose + secondDose + thirdDose + moreThanThreeDose) * 100) / total,
    //         noDose: (noDose * 100) / total,
    //         // twoDoseVaccine: twoDoseVaccine ? (twoDoseVaccine * 100) / total : 0,
    //         // fullDoseVaccine: fullDoseVaccine ? (fullDoseVaccine * 100) / total : 0,
    //         // // eslint-disable-next-line
    //         // notVaccine: item.doseCountMap
    //         //   ? item.doseCountMap[0]
    //         //     ? (item.doseCountMap[0] * 100) / total
    //         //     : 0
    //         //   : 0,
    //       });
    //     });

    //     setDataset([...normalizedDate]);
    //     setOrgDataset([...normalizedDate]);
    //     setFilterType({name: 'کمترین', enName: 'LOWEST'});
    //   } catch (error) {
    //     // eslint-disable-next-line
    //     console.log(error);
    //   } finally {
    //     setLoading(false);
    //   }
    // }

    const getNumberOf = async (province: any) => {
      setLoading(true);
      try {
        const {data} = await vaccineService.membersGeneral(
          {tag: 'transport', province},
          {cancelToken: source.token}
        );
        setNumberOf({...data});
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    const getOverviewByVaccine = async (params: any, province: any) => {
      setDatasetLoading(true);
      try {
        const {data} = await hcsService.vaccinationOverview('transport', 'serviceType', {
          ...params,
          lang: 'fa',
          province,
        });
        const normalizedData: any[] = [];
        data.forEach((item: any, index: number) => {
          // eslint-disable-next-line

          normalizedData.push({
            id: `ovvac_${index}`,
            name: item.categoryValue,
            firstDosePercentage: item.dosesToMembersCountPercentage[1],
            secondDosePercentage: item.dosesToMembersCountPercentage[2],
            thirdDosePercentage: item.dosesToMembersCountPercentage[3],
            otherDose: item.gtDosesToTotalDosesPercentage[3],
            unknownInformation: 0,
            allDoses:
              item.gtDosesToTotalDosesPercentage[0] -
              item.totalNonVaccinesCountToMembersCountPercentage,
            noDose: item.totalNonVaccinesCountToMembersCountPercentage,
            // twoDoseVaccine: twoDoseVaccine ? (twoDoseVaccine * 100) / total : 0,
            // fullDoseVaccine: fullDoseVaccine ? (fullDoseVaccine * 100) / total : 0,
            // // eslint-disable-next-line
            // notVaccine: item.doseCountMap
            //   ? item.doseCountMap[0]
            //     ? (item.doseCountMap[0] * 100) / total
            //     : 0
            //   : 0,
          });
        });

        setDataset([...normalizedData]);
        setOrgDataset([...normalizedData]);
        setFilterType({name: 'کمترین', enName: 'LOWEST'});
      } catch (e: any) {
        console.log(e);
      } finally {
        setDatasetLoading(false);
      }
    };

    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
      const params = new URLSearchParams(location.search);
      const provinceName = params.get('provinceName') || ('تهران' as any);
      const existsCity = sideCities.some((item: any) => {
        return item.name === provinceName;
      });

      let idSetTimeOut: any;
      if (existsCity) {
        idSetTimeOut = setTimeout(() => {
          // getReportsDose({province: provinceName});
          // getOverviewByVaccinePercent({province: provinceName});
          getNumberOf(provinceName);
          // getLinearOverviewPublicTransport();
        }, 500);
      } else {
        history.push('/dashboard/transport/province');
      }

      return () => {
        if (existsCity) {
          source.cancel('Operation canceled by the user.');
          setNumberOf(initialNumberOf);
          setDataset([]);
          setOrgDataset([]);
          clearTimeout(idSetTimeOut);
        }
      };
    }, [location.search]);

    useEffect(() => {
      const params = new URLSearchParams(location.search);
      const provinceName = params.get('provinceName') || ('تهران' as any);
      const existsCity = sideCities.some((item: any) => {
        return item.name === provinceName;
      });

      let idSetTimeOut: any;
      if (existsCity) {
        idSetTimeOut = setTimeout(() => {
          // getReportsDose({province: provinceName});
          // getOverviewByVaccinePercent({province: provinceName});
          getOverviewByVaccine(query, provinceName);
          // getLinearOverviewPublicTransport();
        }, 500);
      } else {
        history.push('/dashboard/transport/province');
      }

      return () => {
        if (existsCity) {
          source.cancel('Operation canceled by the user.');
          setNumberOf(initialNumberOf);
          setDataset([]);
          setOrgDataset([]);
          clearTimeout(idSetTimeOut);
        }
      };
    }, [query, location.search]);

    useEffect(() => {
      const tmp = [...orgDataset].sort((a: any, b: any) => {
        // eslint-disable-next-line
        const reverse =
          // eslint-disable-next-line no-nested-ternary
          filterType.enName === 'HIGHEST' ? 1 : filterType.enName === 'LOWEST' ? -1 : 1;

        if (a.allDoses < b.allDoses) {
          return reverse * 1;
        }

        if (a.allDoses > b.allDoses) {
          return reverse * -1;
        }
        // a must be equal to b
        return 0;
      });

      setDataset(tmp);
    }, [filterType]);

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

    return (
      <fieldset className="text-center border rounded-xl p-4 mb-16" id="province-overview">
        <legend className="text-black mx-auto px-3">
          نگاه کلی واکسیناسیون در حمل و نقل عمومی در استان &nbsp;
          {cityTitle}
        </legend>

        <div
          className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse mb-8 mt-12">
          <Statistic
            icon={totalDriver}
            text="مجموع رانندگان فعال"
            count={numberOf.totalPopulation}
            loading={loading}
            hasInfo
            infoText="مجموع رانندگانی که در حمل ‌و نقل عمومی فعالیت دارند."
          />
          <Statistic
            icon={GreenVaccine}
            text="تعداد واکسیناسیون کل دوز"
            count={numberOf.totalVaccinesCount || 0}
            loading={loading}
            hasInfo
            infoText="تعداد کل دوز های تزریق شده در حمل‌ونقل عمومی"
          />
          <Statistic
            icon={YellowVaccineMd}
            text="تعداد واکسیناسیون دوز اول"
            count={numberOf.doses[1] || 0}
            loading={loading}
            hasInfo
            infoText="تعداد افرادی که دوز اول واکسن را دریافت کرده‌اند."
          />
          <Statistic
            icon={OrangeVaccine}
            text="تعداد واکسیناسیون دوز دوم"
            count={numberOf.doses[3] || 0}
            loading={loading}
            hasInfo
            infoText="تعداد افرادی که دوز دوم واکسن را دریافت کرده‌اند."
          />
        </div>
        <div
          className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse mb-8 mt-12 border-b-2 border-slate-400 pb-8">
          <Statistic
            icon={PurppleVaccineMd}
            text="تعداد واکسیناسیون دوز سوم"
            count={numberOf.doses[2] || 0}
            loading={loading}
            hasInfo
            infoText="تعداد افرادی که دوز سوم واکسن را دریافت کرده‌اند."
          />
          <Statistic
            icon={DarkgreenVaccine}
            text="تعداد واکسیناسیون دوز چهارم"
            count={numberOf.gtDoses[3] || 0}
            loading={loading}
            hasInfo
            infoText="تعداد افرادی که دوز چهارم  واکسن را دریافت کرده‌اند."
          />
          <Statistic
            icon={NavyVaccineMd}
            text="تعداد واکسیناسیون دوز پنجم"
            count={numberOf.totalUnknownVaccinesCount || 0}
            loading={loading}
            hasInfo
            infoText="تعداد افرادی که دوز پنجم واکسن را دریافت کرده‌اند."
          />
          <Statistic
            icon={GrayVaccine2}
            text="تعداد واکسیناسیون انجام نشده"
            count={numberOf.totalNonVaccinesCount || 0}
            loading={loading}
            hasInfo
            infoText="تعداد افرادی که در طرح واکسیناسیون شرکت نکرده‌اند."
          />
        </div>
        <div
          className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse mb-8 mt-12">
          <Statistic
            icon={GreenVaccine}
            text="درصد واکسیناسیون کل کشور"
            count={numberOf.totalVaccinesCount || 0}
            loading={loading}
            hasInfo
            infoText="درصد افرادی که حداقل یک دوز واکسن را دریافت کرده‌اند."
          />
          <Statistic
            icon={YellowVaccineMd}
            text="درصد واکسیناسیون دوز اول"
            count={numberOf.doses[1] || 0}
            loading={loading}
            hasInfo
            infoText="درصد افرادی که دوز اول واکسن را دریافت کرده‌اند."
          />
          <Statistic
            icon={OrangeVaccine}
            text="درصد واکسیناسیون دوز دوم"
            count={numberOf.totalPopulation}
            loading={loading}
            hasInfo
            infoText="درصد افرادی که دوز دوم واکسن را دریافت کرده‌اند."
          />
          <Statistic
            icon={PurppleVaccineMd}
            text="درصد واکسیناسیون دوز سوم"
            count={numberOf.doses[2] || 0}
            loading={loading}
            hasInfo
            infoText="درصد افرادی که دوز سوم واکسن را دریافت کرده‌اند."
          />
        </div>

        <div
          className="flex flex-col md:flex-row justify-start space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse mb-8 mt-12">
          <div className="w-1/4">
            <Statistic
              icon={DarkgreenVaccine}
              text="درصد واکسیناسیون دوز چهارم"
              count={numberOf.totalVaccinesCount || 0}
              loading={loading}
              hasInfo
              infoText="درصد افرادی که دوز چهارم  واکسن را دریافت کرده‌اند."
            />
          </div>
          <div className="w-1/4">
            <Statistic
              icon={NavyVaccineMd}
              text="درصد واکسیناسیون دوز پنجم"
              count={numberOf.doses[1] || 0}
              loading={loading}
              hasInfo
              infoText="درصد افرادی که دوز پنجم واکسن را دریافت کرده‌اند."
            />
          </div>

          <div className="w-1/4">
            <Statistic
              icon={GrayVaccine2}
              text="درصد واکسیناسیون انجام نشده"
              count={numberOf.totalNonVaccinesCount || 0}
              loading={loading}
              hasInfo
              infoText="درصد افرادی که در طرح واکسیناسیون شرکت نکرده‌اند."
            />
          </div>
        </div>

        <div className="flex align-center justify-start space-x-5 rtl:space-x-reverse mb-8">
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
                {selectedDayRange.to || selectedDayRange.from ? (
                  <button type="button" onClick={clearSelectedDayRange}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                ) : (
                  <img src={calendar} alt="x" className="w-5 h-5"/>
                )}
              </div>
            </div>
            <div className="flex items-center justify-start mx-4">
              <span className="dash-separator"/>
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
                {selectedDayRange.to || selectedDayRange.from ? (
                  <button type="button" onClick={clearSelectedDayRange}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                ) : (
                  <img src={calendar} alt="x" className="w-5 h-5"/>
                )}
              </div>
            </div>
          </div>
        </div>

        {datasetLoading ? (
          <div className="p-20">
            <Spinner/>
          </div>
        ) : (
          <>
            <div className="flex flex-col align-center justify-center w-full rounded-xl bg-white p-4 shadow">
              <Table
                dataSet={[...dataset]}
                pagination={{pageSize: 20, maxPages: 3}}
                columns={[
                  {
                    name: 'وضعیت کلی',
                    key: '',
                    render: (v: any, record) => {
                      return (
                        <CategoryDonut
                          data={[
                            {
                              name: 'allDoses',
                              title: 'دوز کل',
                              y: record.allDoses || 0,
                              color: {
                                linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
                                stops: [
                                  [0, '#05D8A4'], // start
                                  [1, '#039572'], // end
                                ],
                              },
                            },
                            {
                              name: 'noDose',
                              title: 'واکسن نزده',
                              y: record.noDose || 0,
                              color: {
                                linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
                                stops: [
                                  [0, '#FE2D2F'], // start
                                  [1, '#CC0002'], // end
                                ],
                              },
                            },
                            {
                              name: 'unknownInformation',
                              title: 'اطلاعات مخدوش',
                              y: record.unknownInformation || 0,
                              color: {
                                linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
                                stops: [
                                  [0, '#eee'], // start
                                  [1, '#a8a8a8'], // end
                                ],
                              },
                            },
                          ]}
                        />
                      );
                    },
                    className: 'flex justify-center w-full',
                  },
                  {
                    name: 'رسته های حمل و نقل',
                    key: 'name',
                    render: (v: any, record, index: number) => (
                      <span>
                        {(index + 1).toLocaleString('fa')}.{v}
                      </span>
                    ),
                  },
                  {
                    name: 'دوز اول',
                    key: 'firstDosePercentage',
                    render: (v: any) => (
                      <span>{v ? `${Number(v).toLocaleString('fa')}%` : '۰%'}</span>
                    ),
                  },
                  {
                    name: 'دوز دوم',
                    key: 'secondDosePercentage',
                    render: (v: any) => (
                      <span>{v ? `${Number(v).toLocaleString('fa')}%` : '۰%'}</span>
                    ),
                  },
                  {
                    name: 'دوز سوم',
                    key: 'thirdDosePercentage',
                    render: (v: any) => (
                      <span>{v ? `${Number(v).toLocaleString('fa')}%` : '۰%'}</span>
                    ),
                  },
                  {
                    name: 'سایر دوزها',
                    key: 'otherDose',
                    render: (v: any) => (
                      <span>{v ? `${Number(v).toLocaleString('fa')}%` : '۰%'}</span>
                    ),
                  },
                  {
                    name: 'کل دوز',
                    key: 'allDoses',
                    render: (v: any) => (
                      <span>{v ? `${Number(v).toLocaleString('fa')}%` : '۰%'}</span>
                    ),
                  },
                  {
                    name: 'اطلاعات مخدوش',
                    key: 'unknownInformation',
                    render: (v: any) => (
                      <span>{v ? `${Number(v).toLocaleString('fa')}%` : '۰%'}</span>
                    ),
                  },
                  {
                    name: 'واکسن نزده',
                    key: 'noDose',
                    render: (v: any) => (
                      <span>{v ? `${Number(v).toLocaleString('fa')}%` : '۰%'}</span>
                    ),
                  },
                ]}
                totalItems={0}
              />
            </div>
          </>
        )}
      </fieldset>
    );
  };

export default OverviewOfVaccinationInPublicTransportProvince;
