import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Menu} from '@headlessui/react';
// import {schoolTypes} from 'src/helpers/sortingModels';
import {useHistory, useLocation} from 'react-router-dom';
import {sideCities} from 'src/helpers/utils';
import Statistic from '../../../containers/Guild/components/Statistic';
// import totalEmploye1 from '../../../assets/images/icons/people-dark-green.svg';
// import totalEmploye2 from '../../../assets/images/icons/people-navy.svg';
import totalStudent from '../../../assets/images/icons/graduation.svg';
import YellowVaccine from '../../../assets/images/icons/yellow-vaccine-lg.svg';
import GreenVaccine from '../../../assets/images/icons/green-vaccine-lg.svg';
import BlueVaccine from '../../../assets/images/icons/blue-vaccine.svg';
import PurppleVaccine from '../../../assets/images/icons/purpple-vaccine-lg.svg';
import NavyVaccine from '../../../assets/images/icons/navy-vaccine-lg.svg';
import GrayVaccine1 from '../../../assets/images/icons/gray-vaccine-lg.svg';
import GrayVaccine2 from '../../../assets/images/icons/gray-vaccine-2.svg';
import Table from '../../TableScope';
import CategoryDonut from '../../../containers/Guild/components/CategoryDonut';
import Spinner from '../../Spinner';
import {ReactComponent as DownIcon} from '../../../assets/images/icons/down.svg';
import vaccineService from '../../../services/vaccine.service';
import hcsService from '../../../services/hcs.service';

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

const filterTypes = [
  {
    name: 'پیشفرض',
    enName: '',
  },
  {
    name: 'بیشترین',
    enName: 'HIGHEST',
  },
  {
    name: 'کمترین',
    enName: 'LOWEST',
  },
];

interface OverviewOfVaccinationProvinceProps {
  cityTitle: any;
}

const OverviewOfVaccinationProvince: React.FC<OverviewOfVaccinationProvinceProps> = ({
  cityTitle,
}) => {
  // const [loading, setLoading] = useState(false);
  // const [filterType, setFilterType] = useState({
  //   name: 'پیشفرض',
  //   enName: '',
  // });
  // const [countsLoading, setCountsLoading] = useState(false);
  // const [orgDataset, setOrgDataset] = useState<any>([]);
  // const [dataset, setDataset] = useState<any>([]);
  // const [counts, setCounts] = useState<any>({
  //   numberOfEmployees: 0,
  //   numberOfStudents: 0,
  //   numberOfTeachers: 0,
  //   numberOfFirstDose: 0,
  //   numberOfSecondDose: 0,
  //   numberOfThirdDose: 0,
  //   numberOfMoreThreeDose: 0,
  //   numberOfAllDose: 0,
  //   numberOfUnknownDose: 0,
  //   numberOfUnvaccinated: 0,
  // });

  const [loading, setLoading] = useState(false);
  const [numberOf, setNumberOf] = useState<any>(initialNumberOf);
  const [filterType, setFilterType] = useState({
    name: 'پیشفرض',
    enName: '',
  });
  const [orgDataset, setOrgDataset] = useState<any>([]);
  const [dataset, setDataset] = useState<any>([]);
  const [datasetLoading, setDatasetLoading] = useState<any>([]);

  const {CancelToken} = axios;
  const source = CancelToken.source();

  const location = useLocation();
  const history = useHistory();

  const getNumberOf = async (province: any) => {
    setLoading(true);
    try {
      const {data} = await vaccineService.membersGeneral(
        {tag: 'edu', province},
        {cancelToken: source.token}
      );
      setNumberOf({...data});
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getOverviewByVaccine = async (province: any) => {
    setDatasetLoading(true);
    try {
      const {data} = await hcsService.vaccinationOverview('edu', 'grade', {lang: 'fa', province});
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
          allDoses: item.membersCount - item.totalNonVaccinesCount,
          allDosesPercentage:
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
      setFilterType({name: 'پیشفرض', enName: ''});
    } catch (e: any) {
      console.log(e);
    } finally {
      setDatasetLoading(false);
    }
  };

  // async function getOverviewByVaccine(params: any) {
  //   setCountsLoading(true);
  //   try {
  //     const {data} = await hcsService.doses(params, {cancelToken: source.token});
  //     let tmp = {
  //       numberOfEmployees: 0,
  //       numberOfStudents: 0,
  //       numberOfTeachers: 0,
  //       numberOfFirstDose: 0,
  //       numberOfSecondDose: 0,
  //       numberOfThirdDose: 0,
  //       numberOfMoreThreeDose: 0,
  //       numberOfAllDose: 0,
  //       numberOfUnknownDose: 0,
  //       numberOfUnvaccinated: 0,
  //     };

  //     // eslint-disable-next-line no-plusplus
  //     for (let j: number = 0; j < data.length; j++) {
  //       // eslint-disable-next-line
  //       for (const [key, value] of Object.entries(data[j])) {
  //         if (Number(key) === 0) {
  //           tmp = {...tmp, numberOfUnvaccinated: Number(value)};
  //         }

  //         if (Number(key) === 1) {
  //           tmp = {...tmp, numberOfFirstDose: Number(value)};
  //         }

  //         if (Number(key) === 2) {
  //           tmp = {...tmp, numberOfSecondDose: Number(value)};
  //         }

  //         if (Number(key) === 3 || Number(key) > 3) {
  //           tmp = {...tmp, numberOfThirdDose: tmp.numberOfThirdDose + Number(value)};
  //         }

  //         // if (Number(key) === 3) {
  //         //   tmp = {...tmp, numberOfThirdDose: Number(value)};
  //         // }

  //         // temporary code
  //         if (Number(key) !== 0 && key !== 'null' && Number(key) > 3) {
  //           tmp = {...tmp, numberOfMoreThreeDose: 0};
  //         }

  //         // if (Number(key) !== 0 && key !== 'null' && Number(key) > 3) {
  //         //   tmp = {...tmp, numberOfMoreThreeDose: tmp.numberOfMoreThreeDose + Number(value)};
  //         // }

  //         if (Number(key) !== 0 && key !== 'null') {
  //           tmp = {...tmp, numberOfAllDose: tmp.numberOfAllDose + Number(value)};
  //         }

  //         if (key === 'null') {
  //           tmp = {...tmp, numberOfUnknownDose: Number(value)};
  //         }
  //       }
  //     }

  //     setCounts({...tmp});
  //   } catch (error) {
  //     // eslint-disable-next-line
  //     console.log(error);
  //   } finally {
  //     setCountsLoading(false);
  //   }
  // }

  // async function getOverviewByVaccinePercent(params: any) {
  //   setLoading(true);
  //   try {
  //     const {data} = await hcsService.dosesTagBased(params, {cancelToken: source.token});
  //     const sortData: any = [];

  //     schoolTypes.forEach((item: any) => {
  //       const tm = data.find((i: any) => {
  //         // console.log('item => ', item);
  //         // console.log('tag => ', i.tag.replace(/استان\s(.*)_/g, '').replace(/_\sاستان\s(.*)/g, ''));
  //         // // eslint-disable-next-line
  //         // console.log(
  //         //   i.tag
  //         //     .replace(/استان\s(.*)_/g, '')
  //         //     .replace(/_\sاستان\s(.*)/g, '')
  //         //     .trim() === item
  //         // );
  //         return (
  //           i.tag
  //             .replace(/استان\s(.*)_/g, '')
  //             .replace(/_\sاستان\s(.*)/g, '')
  //             .trim() === item
  //         );
  //       });
  //       if (tm) sortData.push(tm);
  //     });

  //     const normalizedData: any[] = [];

  //     sortData.forEach((item: any, index: number) => {
  //       let firstDose = 0;
  //       let secondDose = 0;
  //       let thirdDose = 0;
  //       let moreThanThreeDose = 0;
  //       let allVaccination = 0;
  //       let unknownInformation = 0;
  //       let noDose = 0;
  //       let total = 0;
  //       // eslint-disable-next-line
  //       for (const [key, value] of Object.entries(item.dosesCountMap)) {
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

  //       // if (total > 0)
  //       normalizedData.push({
  //         id: `ovvac_${index}`,
  //         name: item.tag || 'نامشخص',
  //         firstDosePercentage: (firstDose * 100) / total,
  //         secondDosePercentage: (secondDose * 100) / total,
  //         thirdDosePercentage: (thirdDose * 100) / total,
  //         otherDose: (moreThanThreeDose * 100) / total,
  //         allDoses: firstDose + secondDose + thirdDose + moreThanThreeDose,
  //         unknownInformation,
  //         noDose: (noDose * 100) / total,
  //         allDosesPercentage:
  //           ((firstDose + secondDose + thirdDose + moreThanThreeDose) * 100) / total,
  //         // eslint-disable-next-line
  //         // notVaccine: item.dosesCountMap
  //         //   ? item.dosesCountMap[0]
  //         //     ? (item.dosesCountMap[0] * 100) / total
  //         //     : 0
  //         //   : 0,
  //       });
  //     });
  //     setDataset([...normalizedData]);
  //     setOrgDataset([...normalizedData]);
  //     setFilterType({name: 'پیشفرض', enName: ''});
  //   } catch (error) {
  //     // eslint-disable-next-line
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const provinceName = params.get('provinceName') || ('تهران' as any);

    const existsCity = sideCities.some((item: any) => {
      return item.name === provinceName;
    });
    if (existsCity) {
      getNumberOf(provinceName);
      getOverviewByVaccine(provinceName);
      // getOverviewByVaccine({
      //   organization: 'education',
      //   tags: `#province# استان ${provinceName}`,
      // });
      // getOverviewByVaccinePercent({
      //   organization: 'education',
      //   tags: `^(((?=.*#grade#)(?=.*استان ${provinceName})((^[^_]*_[^_]*$)))|((?=.*#type#)(?=.*استان ${provinceName})((^[^_]*_[^_]*$)))).*$`,
      // });
    } else {
      history.push('/dashboard/school/province');
    }

    return () => {
      if (existsCity) {
        source.cancel('Operation canceled by the user.');
        setNumberOf(initialNumberOf);
      }
    };
  }, [location.search]);

  useEffect(() => {
    return () => {
      // setCounts({});
      // setDataset([]);
      setDataset([]);
      setOrgDataset([]);
      setFilterType({name: 'کمترین', enName: 'LOWEST'});
      source.cancel('Operation canceled by the user.');
    };
  }, [history]);

  useEffect(() => {
    const tmp = [...orgDataset].sort((a: any, b: any) => {
      // eslint-disable-next-line
      const reverse = filterType.enName === 'HIGHEST' ? 1 : filterType.enName === 'LOWEST' ? -1 : 0;

      if (a.allDosesPercentage < b.allDosesPercentage) {
        return reverse * 1;
      }

      if (a.allDosesPercentage > b.allDosesPercentage) {
        return reverse * -1;
      }
      // a must be equal to b
      return 0;
    });

    setDataset(tmp);
  }, [filterType]);

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">
        نگاه کلی واکسیناسیون در آموزش و پرورش در استان &nbsp;
        {cityTitle}
      </legend>
      <div className="flex flex-col justify-between space-y-8 mb-8 mt-12">
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          {/* <Statistic
            icon={totalEmploye1}
            text="مجموع کارمندان آموزشی"
            count={counts.numberOfTeachers || 0}
            loading={countsLoading}
          /> */}
          {/* <Statistic
            icon={totalEmploye2}
            text="مجموع کارمندان اداری"
            count={counts.numberOfEmployees || 0}
            loading={countsLoading}
          /> */}
          <Statistic
            icon={totalStudent}
            text="مجموع دانش آموزان"
            count={numberOf.totalPopulation || 0}
            // count={totalMembers || 0}
            loading={false}
          />
          <Statistic
            icon={YellowVaccine}
            text="تعداد واکسیناسیون دوز اول"
            count={numberOf.doses[1] || 0}
            loading={loading}
          />
          <Statistic
            icon={PurppleVaccine}
            text="تعداد واکسیناسیون دوز دوم"
            count={numberOf.doses[2] || 0}
            loading={loading}
          />
        </div>
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            icon={NavyVaccine}
            text="تعداد واکسیناسیون دوز سوم"
            count={numberOf.doses[3] || 0}
            loading={loading}
          />
          <Statistic
            icon={BlueVaccine}
            text="بیش از ۳ دوز"
            count={numberOf.gtDoses[3] || 0}
            loading={loading}
          />
          <Statistic
            icon={GrayVaccine1}
            text="تعداد اطلاعات مخدوش"
            count={numberOf.totalUnknownVaccinesCount || 0}
            loading={loading}
          />
        </div>
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            icon={GrayVaccine2}
            text="تعداد واکسیناسیون انجام نشده"
            count={numberOf.totalNonVaccinesCount || 0}
            loading={loading}
          />
          <Statistic
            icon={GreenVaccine}
            text="تعداد واکسیناسیون کل دوز"
            count={numberOf.totalVaccinesCount || 0}
            loading={loading}
          />
          <fieldset className="flex flex-col align-center justify-center w-full rounded-xl p-4 relative" />
          {/* <fieldset className="flex flex-col align-center justify-center w-full rounded-xl p-4 relative" /> */}
        </div>
      </div>

      <div className="flex align-center justify-spacebetween space-x-5 rtl:space-x-reverse mb-8">
        <div className="flex flex-grow items-center space-x-5 rtl:space-x-reverse">
          <div className="flex items-center">
            <Menu
              as="div"
              className="relative z-20 inline-block text-left shadow-custom rounded-lg px-5 py-1 "
            >
              <div>
                <Menu.Button className="inline-flex justify-between items-center w-full py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                  {/* <div className="flex items-center flex-row-reverse xl:flex-row"> */}
                  {/* <img src={avatar} alt="z" className="w-5 h-5" /> */}
                  <span className="ml-10 whitespace-nowrap truncate">
                    {filterType?.name || 'پیشفرض'}
                  </span>
                  <DownIcon className="h-2 w-2.5 mr-2" />
                </Menu.Button>
              </div>

              <Menu.Items
                style={{minWidth: '200px'}}
                className="z-40 absolute right-0 max-w-xs mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div className="px-1 py-1 ">
                  {filterTypes.map((value: any, index: any) => {
                    return (
                      // eslint-disable-next-line
                      <Menu.Item key={index}>
                        {({active}) => (
                          <button
                            type="button"
                            className={`${
                              active ? 'bg-gray-100' : ''
                            } text-gray-900 group flex rounded-md items-center whitespace-nowrap truncate w-full px-2 py-2 text-sm`}
                            onClick={() => {
                              setFilterType(value);
                            }}
                          >
                            {value.name}
                          </button>
                        )}
                      </Menu.Item>
                    );
                  })}
                </div>
              </Menu.Items>
            </Menu>
          </div>
        </div>
      </div>

      {datasetLoading ? (
        <div className="p-20">
          <Spinner />
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
                  render: (v: any, record) => (
                    <CategoryDonut
                      data={[
                        {
                          name: 'unknownInformation',
                          title: 'مخدوش',
                          y: record.unknownInformation || 0,
                          color: {
                            linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
                            stops: [
                              [0, '#6E6E6E'], // start
                              [1, '#393939'], // end
                            ],
                          },
                        },
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
                      ]}
                    />
                  ),
                  className: 'flex justify-center w-full',
                },
                {
                  name: 'دسته',
                  key: 'name',
                  render: (v: any, record, index: number, page: number) => (
                    <div className="flex">
                      {((page - 1) * 20 + (index + 1)).toPersianDigits()}.
                      {/* eslint-disable-next-line */}
                      {v.replace(/استان\s(.*)_/g, '').replace(/_\sاستان\s(.*)/g, '')}
                    </div>
                  ),
                },
                {
                  name: 'دوز اول',
                  key: 'firstDosePercentage',
                  render: (v: any) => <span>{Number(v).toLocaleString('fa')}%</span>,
                },
                {
                  name: 'دوز دوم',
                  key: 'secondDosePercentage',
                  render: (v: any) => <span>{Number(v).toLocaleString('fa')}%</span>,
                },
                {
                  name: 'دوز سوم',
                  key: 'thirdDosePercentage',
                  render: (v: any) => <span>{v >= 0 ? `${Number(v).toLocaleString('fa')}%` : 'نامشخص'}</span>,
                },
                {
                  name: 'سایر دوزها',
                  key: 'otherDose',
                  render: (v: any) => <span>{v >= 0 ? `${Number(v).toLocaleString('fa')}%` : 'نامشخص'}</span>,
                },
                {
                  name: 'درصد کل دوزها',
                  key: 'allDosesPercentage',
                  render: (v: any) => <span>{Number(v).toLocaleString('fa')}%</span>,
                },
                {
                  name: 'واکسن نزده',
                  key: 'noDose',
                  render: (v: any) => <span>{Number(v).toLocaleString('fa')}%</span>,
                },
                {
                  name: 'اطلاعات مخدوش',
                  key: 'unknownInformation',
                  render: (v: any) => <span>{Number(v).commaSeprator().toPersianDigits()}</span>,
                },
                {
                  name: 'کل دوزها',
                  key: 'allDoses',
                  render: (v: any) => <span>{Number(v).commaSeprator().toPersianDigits()}</span>,
                },
              ]}
              totalItems={(dataset || []).length || 0}
            />
          </div>
        </>
      )}
    </fieldset>
  );
};

export default OverviewOfVaccinationProvince;
