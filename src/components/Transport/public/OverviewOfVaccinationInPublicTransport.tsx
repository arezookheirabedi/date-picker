import React, {useState} from 'react';
// import {Menu} from '@headlessui/react';
import Statistic from '../../../containers/Guild/components/Statistic';
import totalDriver from '../../../assets/images/icons/transport-color.svg';
import GreenVaccine from '../../../assets/images/icons/green-vaccine-lg.svg';
// import GrayVaccine from '../../../assets/images/icons/gray-vaccine-1.svg';
import GrayVaccine2 from '../../../assets/images/icons/gray-vaccine-2.svg';
import YellowVaccineMd from '../../../assets/images/icons/yellow-vaccine-lg.svg';
import PurppleVaccineMd from '../../../assets/images/icons/purpple-vaccine-lg.svg';
import NavyVaccineMd from '../../../assets/images/icons/navy-vaccine-lg.svg';
import Table from '../../Table';
import CategoryDonut from '../../../containers/Guild/components/CategoryDonut';
import Spinner from '../../Spinner';
import OrangeVaccine from '../../../assets/images/icons/orange-vaccine.svg';
import DarkgreenVaccine from '../../../assets/images/icons/darkgreen-vaccine.svg';
import DatepickerQuery from '../../DatepickerQuery';
import useGetNumberOf from '../../../hooks/apis/useGetNumberOf';
import useGetOverviewOfVaccinationTable from '../../../hooks/apis/useGetOverviewOfVaccinationTable';

const OverviewOfVaccinationInPublicTransport: React.FC<{}> = () => {
  const [query, setQuery] = useState({
    tag: 'transport',
    category: 'serviceType',
    from: null,
    to: null,
  });
  // eslint-disable-next-line
  const {data: numberOf, loading, error} = useGetNumberOf({tag: 'transport'});

  const {
    data: dataset,
    loading: datasetLoading,
    // eslint-disable-next-line
    error: errorMessage,
  } = useGetOverviewOfVaccinationTable(query);

  // const [counts, setCounts] = useState<any>({
  //   numberOfDrivers: null,
  //   numberOfFirstDose: null,
  //   numberOfSecondDose: null,
  //   numberOfUnvaccinated: null,
  // });

  // const [reportsDose, setReportsDose] = useState({}) as any;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  // async function getOverviewByVaccine(params: any) {
  //   setCountsLoading(true);
  //   try {
  //     const {data} = await transportService.overviewVaccine(params, {cancelToken: source.token});
  //     setCounts({
  //       numberOfDrivers: data.numberOfDrivers || 0,
  //       numberOfFirstDose: data.numberOfFirstDose || 0,
  //       numberOfSecondDose: data.numberOfSecondDose || 0,
  //       numberOfUnvaccinated: data.numberOfUnvaccinated || 0,
  //     });
  //   } catch (error) {
  //     // eslint-disable-next-line
  //     console.log(error);
  //   } finally {
  //     setCountsLoading(false);
  //   }
  // }
  //
  // async function getReportsDose() {
  //   setReportsDoseLoading(true);
  //   try {
  //     const {data} = await transportService.reportsDose({}, {cancelToken: source.token});
  //
  //     const normalizedData: any[] = [];
  //     let threeDose = 0;
  //     let allVaccination = 0;
  //     let moreThanThreeDose = 0;
  //     let unknownInformation = 0;
  //     data.dosesCount.forEach((item: any) => {
  //       // eslint-disable-next-line no-restricted-syntax
  //       for (const [key, value] of Object.entries(item)) {
  //         // temporary code
  //         if (Number(key) === 3 || Number(key) > 3) {
  //           threeDose += Number(value);
  //         }
  //
  //         // if (Number(key) === 3) {
  //         //   threeDose += Number(value);
  //         // }
  //
  //         if (Number(key) !== 0 && key !== 'null') {
  //           allVaccination += Number(value);
  //         }
  //
  //         // temporary code
  //         if (Number(key) !== 0 && key !== 'null' && Number(key) > 3) {
  //           moreThanThreeDose += 0;
  //         }
  //
  //         // if (Number(key) !== 0 && key !== 'null' && Number(key) > 3) {
  //         //   moreThanThreeDose += Number(value);
  //         // }
  //
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
  //
  //     setReportsDose({
  //       threeDose,
  //       allVaccination,
  //       moreThanThreeDose,
  //       unknownInformation,
  //     });
  //   } catch (error) {
  //     // eslint-disable-next-line
  //     console.log(error);
  //   } finally {
  //     setReportsDoseLoading(false);
  //   }
  // }
  //
  // async function getOverviewByVaccinePercent(params: any) {
  //   setLoading(true);
  //   try {
  //     const {data} = await transportService.overviewVaccinePercent(params, {
  //       cancelToken: source.token,
  //     });
  //     const normalizedData: any[] = [];
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
  //
  //         if (Number(key) === 1) {
  //           firstDose += Number(value);
  //         }
  //
  //         if (Number(key) === 2) {
  //           secondDose += Number(value);
  //         }
  //
  //         // temporary code
  //         if (Number(key) === 3 || Number(key) > 3) {
  //           thirdDose += Number(value);
  //         }
  //
  //         // if (Number(key) === 3) {
  //         //   thirdDose += Number(value);
  //         // }
  //
  //         // temporary code
  //         if (Number(key) !== 0 && key !== 'null' && Number(key) > 3) {
  //           moreThanThreeDose += 0;
  //         }
  //
  //         // if (Number(key) !== 0 && key !== 'null' && Number(key) > 3) {
  //         //   moreThanThreeDose += Number(value);
  //         // }
  //
  //         if (Number(key) !== 0 && key !== 'null') {
  //           allVaccination += Number(value);
  //         }
  //
  //         if (key === 'null') {
  //           unknownInformation += Number(value);
  //         }
  //
  //         total = allVaccination + noDose + unknownInformation;
  //       }
  //
  //       normalizedData.push({
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
  //
  //     setDataset([...normalizedData]);
  //     setOrgDataset([...normalizedData]);
  //     setFilterType({name: 'کمترین', enName: 'LOWEST'});
  //   } catch (error) {
  //     // eslint-disable-next-line
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  // useEffect(() => {
  //   // getReportsDose();
  //   // getOverviewByVaccine({
  //   //   numberOfDrivers: true,
  //   //   numberOfFirstDose: true,
  //   //   numberOfSecondDose: true,
  //   //   numberOfUnvaccinated: true,
  //   // });
  //   // getOverviewByVaccinePercent({});
  //
  //   return () => {
  //     // setReportsDose({});
  //     // setCounts({
  //     //   numberOfDrivers: 0,
  //     //   numberOfFirstDose: 0,
  //     //   numberOfSecondDose: 0,
  //     //   numberOfUnvaccinated: 0,
  //     // });
  //     // setDataset([]);
  //     source.cancel('Operation canceled by the user.');
  //   };
  // }, []);

  // useEffect(() => {
  //   const tmp = [...orgDataset].sort((a: any, b: any) => {
  //     // eslint-disable-next-line
  //     const reverse =
  //       // eslint-disable-next-line no-nested-ternary
  //       filterType.enName === 'HIGHEST' ? 1 : filterType.enName === 'LOWEST' ? -1 : 1;
  //
  //     if (a.allDoses < b.allDoses) {
  //       return reverse * 1;
  //     }
  //
  //     if (a.allDoses > b.allDoses) {
  //       return reverse * -1;
  //     }
  //     // a must be equal to b
  //     return 0;
  //   });
  //
  //   setDataset(tmp);
  // }, [filterType]);

  return (
    <fieldset className="mb-16 rounded-xl border p-4 text-center">
      <legend className="mx-auto px-3 text-black">نگاه کلی واکسیناسیون در حمل و نقل عمومی</legend>

      <div className="mb-8 mt-12 flex flex-col justify-between space-y-5 space-x-0 rtl:space-x-reverse md:flex-row md:space-y-0 md:space-x-5">
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
          count={numberOf.doses[2] || 0}
          loading={loading}
          hasInfo
          infoText="تعداد افرادی که دوز دوم واکسن را دریافت کرده‌اند."
        />
      </div>
      <div className="border-slate-400 mb-8 mt-12 flex flex-col justify-between space-y-5 space-x-0 border-b-2 pb-8 rtl:space-x-reverse md:flex-row md:space-y-0 md:space-x-5">
        <Statistic
          icon={PurppleVaccineMd}
          text="تعداد واکسیناسیون دوز سوم"
          count={numberOf.doses[3] || 0}
          loading={loading}
          hasInfo
          infoText="تعداد افرادی که دوز سوم واکسن را دریافت کرده‌اند."
        />
        <Statistic
          icon={DarkgreenVaccine}
          text="تعداد واکسیناسیون دوز چهارم"
          count={numberOf.doses[4] || 0}
          loading={loading}
          hasInfo
          infoText="تعداد افرادی که دوز چهارم  واکسن را دریافت کرده‌اند."
        />
        <Statistic
          icon={NavyVaccineMd}
          text="تعداد واکسیناسیون دوز پنجم"
          count={numberOf.doses[5] || 0}
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
      <div className="mb-8 mt-12 flex flex-col justify-between space-y-5 space-x-0 rtl:space-x-reverse md:flex-row md:space-y-0 md:space-x-5">
        <Statistic
          icon={GreenVaccine}
          text="درصد واکسیناسیون کل کشور"
          count={numberOf.totalVaccinesCountToTotalPopulationPercentage || 0}
          loading={loading}
          hasInfo
          infoText="درصد افرادی که حداقل یک دوز واکسن را دریافت کرده‌اند."
        />
        <Statistic
          icon={YellowVaccineMd}
          text="درصد واکسیناسیون دوز اول"
          count={numberOf.dosesToTotalPopulationPercentage[1] || 0}
          loading={loading}
          hasInfo
          infoText="درصد افرادی که دوز اول واکسن را دریافت کرده‌اند."
        />
        <Statistic
          icon={OrangeVaccine}
          text="درصد واکسیناسیون دوز دوم"
          count={numberOf.dosesToTotalPopulationPercentage[2]}
          loading={loading}
          hasInfo
          infoText="درصد افرادی که دوز دوم واکسن را دریافت کرده‌اند."
        />
        <Statistic
          icon={PurppleVaccineMd}
          text="درصد واکسیناسیون دوز سوم"
          count={numberOf.dosesToTotalPopulationPercentage[3] || 0}
          loading={loading}
          hasInfo
          infoText="درصد افرادی که دوز سوم واکسن را دریافت کرده‌اند."
        />
      </div>
      <div className="mb-8 mt-12 flex flex-col justify-start space-y-5 space-x-0 rtl:space-x-reverse md:flex-row md:space-y-0 md:space-x-5">
        <div className="w-1/4">
          <Statistic
            icon={DarkgreenVaccine}
            text="درصد واکسیناسیون دوز چهارم"
            count={numberOf.dosesToTotalPopulationPercentage[4] || 0}
            loading={loading}
            hasInfo
            infoText="درصد افرادی که دوز چهارم  واکسن را دریافت کرده‌اند."
          />
        </div>
        <div className="w-1/4">
          <Statistic
            icon={NavyVaccineMd}
            text="درصد واکسیناسیون دوز پنجم"
            count={numberOf.dosesToTotalPopulationPercentage[5] || 0}
            loading={loading}
            hasInfo
            infoText="درصد افرادی که دوز پنجم واکسن را دریافت کرده‌اند."
          />
        </div>

        <div className="w-1/4">
          <Statistic
            icon={GrayVaccine2}
            text="درصد واکسیناسیون انجام نشده"
            count={numberOf.totalNonVaccinesCountToTotalPopulationPercentage || 0}
            loading={loading}
            hasInfo
            infoText="درصد افرادی که در طرح واکسیناسیون شرکت نکرده‌اند."
          />
        </div>
      </div>

      <div className="align-center mb-8 flex justify-start space-x-5 rtl:space-x-reverse">
        <DatepickerQuery query={query} setQuery={setQuery} />
      </div>

      {datasetLoading ? (
        <div className="p-20">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="align-center flex w-full flex-col justify-center rounded-xl bg-white p-4 shadow">
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
                            name: 'allDosesPercentage',
                            title: 'دوز کل',
                            y: record.allDosesPercentage || 0,
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
                          // {
                          //   name: 'unknownInformation',
                          //   title: 'اطلاعات مخدوش',
                          //   y: record.unknownInformation || 0,
                          //   color: {
                          //     linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
                          //     stops: [
                          //       [0, '#eee'], // start
                          //       [1, '#a8a8a8'], // end
                          //     ],
                          //   },
                          // },
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
                  name: 'کل دوزها',
                  key: 'allDoses',
                  render: (v: any) => <span>{Number(v).commaSeprator().toPersianDigits()}</span>,
                },
                // {
                //   name: 'اطلاعات مخدوش',
                //   key: 'unknownInformation',
                //   render: (v: any) => (
                //     <span>{v ? `${Number(v).toLocaleString('fa')}%` : '۰%'}</span>
                //   ),
                // },
                // {
                //   name: 'واکسن نزده',
                //   key: 'noDose',
                //   render: (v: any) => (
                //     <span>{v ? `${Number(v).toLocaleString('fa')}%` : '۰%'}</span>
                //   ),
                // },
              ]}
              totalItems={0}
            />
          </div>
        </>
      )}
    </fieldset>
  );
};

export default OverviewOfVaccinationInPublicTransport;
