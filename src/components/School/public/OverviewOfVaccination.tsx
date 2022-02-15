import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Menu} from '@headlessui/react';
import {schoolTypes} from 'src/helpers/sortingModels';
import hcsService from 'src/services/hcs.service';
import {useSelector} from 'src/hooks/useTypedSelector';
import Statistic from '../../../containers/Guild/components/Statistic';
// import totalEmploye1 from '../../../assets/images/icons/people-dark-green.svg';
import totalEmploye2 from '../../../assets/images/icons/people-navy.svg';
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

const OverviewOfVaccination: React.FC<{}> = () => {
  const [loading, setLoading] = useState(false);
  const [filterType, setFilterType] = useState({
    name: 'پیشفرض',
    enName: '',
  });
  const [countsLoading, setCountsLoading] = useState(false);
  const [orgDataset, setOrgDataset] = useState<any>([]);
  const [dataset, setDataset] = useState<any>([]);
  const [counts, setCounts] = useState<any>({
    numberOfEmployees: 0,
    numberOfStudents: 0,
    numberOfTeachers: 0,
    numberOfFirstDose: 0,
    numberOfSecondDose: 0,
    numberOfThirdDose: 0,
    numberOfMoreThreeDose: 0,
    numberOfAllDose: 0,
    numberOfUnknownDose: 0,
    numberOfUnvaccinated: 0,
  });
  const {CancelToken} = axios;
  const source = CancelToken.source();

  const {total: totalMembers, employe: totalEmploye} = useSelector(state => state.studentMembers);

  async function getOverviewByVaccine(params: any) {
    setCountsLoading(true);
    try {
      const {data} = await hcsService.doses(params, {cancelToken: source.token});
      let tmp = {...counts};

      // eslint-disable-next-line no-plusplus
      for (let j: number = 0; j < data.length; j++) {
        // eslint-disable-next-line
        for (const [key, value] of Object.entries(data[j])) {
          if (Number(key) === 0) {
            tmp = {...tmp, numberOfUnvaccinated: Number(value)};
          }

          if (Number(key) === 1) {
            tmp = {...tmp, numberOfFirstDose: Number(value)};
          }

          if (Number(key) === 2) {
            tmp = {...tmp, numberOfSecondDose: Number(value)};
          }

          if (Number(key) === 3 || Number(key) > 3) {
            tmp = {...tmp, numberOfThirdDose: tmp.numberOfThirdDose + Number(value)};
          }

          // if (Number(key) === 3) {
          //   tmp = {...tmp, numberOfThirdDose: Number(value)};
          // }

          // temporary code
          if (Number(key) !== 0 && key !== 'null' && Number(key) > 3) {
            tmp = {...tmp, numberOfMoreThreeDose: 0};
          }

          // if (Number(key) !== 0 && key !== 'null' && Number(key) > 3) {
          //   tmp = {...tmp, numberOfMoreThreeDose: tmp.numberOfMoreThreeDose + Number(value)};
          // }

          if (Number(key) !== 0 && key !== 'null') {
            tmp = {...tmp, numberOfAllDose: tmp.numberOfAllDose + Number(value)};
          }

          if (key === 'null') {
            tmp = {...tmp, numberOfUnknownDose: Number(value)};
          }
        }
      }

      setCounts({...tmp});
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setCountsLoading(false);
    }
  }

  async function getOverviewByVaccinePercent(params: any) {
    setLoading(true);
    try {
      const {data} = await hcsService.dosesTagBased(params, {cancelToken: source.token});
      const sortData: any = [];

      schoolTypes.forEach(item => {
        const tm = data.find((i: any) => i.tag === item);
        if (tm) sortData.push(tm);
      });

      const normalizedData: any[] = [];

      sortData.forEach((item: any, index: number) => {
        let firstDose = 0;
        let secondDose = 0;
        let thirdDose = 0;
        let moreThanThreeDose = 0;
        let allVaccination = 0;
        let unknownInformation = 0;
        let noDose = 0;
        let total = 0;
        // eslint-disable-next-line
        for (const [key, value] of Object.entries(item.dosesCountMap)) {
          if (Number(key) === 0) {
            noDose += Number(value);
          }

          if (Number(key) === 1) {
            firstDose += Number(value);
          }

          if (Number(key) === 2) {
            secondDose += Number(value);
          }

          // temporary code
          if (Number(key) === 3 || Number(key) > 3) {
            thirdDose += Number(value);
          }

          // if (Number(key) === 3) {
          //   thirdDose += Number(value);
          // }

          // temporary code
          if (Number(key) !== 0 && key !== 'null' && Number(key) > 3) {
            moreThanThreeDose += 0;
          }

          // if (Number(key) !== 0 && key !== 'null' && Number(key) > 3) {
          //   moreThanThreeDose += Number(value);
          // }

          if (Number(key) !== 0 && key !== 'null') {
            allVaccination += Number(value);
          }

          if (key === 'null') {
            unknownInformation += Number(value);
          }

          total = allVaccination + noDose + unknownInformation;
        }

        // if (total > 0)
        normalizedData.push({
          id: `ovvac_${index}`,
          name: item.tag || 'نامشخص',
          firstDosePercentage: (firstDose * 100) / total,
          secondDosePercentage: (secondDose * 100) / total,
          thirdDosePercentage: (thirdDose * 100) / total,
          otherDose: (moreThanThreeDose * 100) / total,
          allDoses: firstDose + secondDose + thirdDose + moreThanThreeDose,
          unknownInformation,
          noDose: (noDose * 100) / total,
          allDosesPercentage:
            ((firstDose + secondDose + thirdDose + moreThanThreeDose) * 100) / total,
          // eslint-disable-next-line
          // notVaccine: item.dosesCountMap
          //   ? item.dosesCountMap[0]
          //     ? (item.dosesCountMap[0] * 100) / total
          //     : 0
          //   : 0,
        });
      });
      setDataset([...normalizedData]);
      setOrgDataset([...normalizedData]);
      setFilterType({name: 'پیشفرض', enName: ''});
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getOverviewByVaccine({
      organization: 'education',
    });
    getOverviewByVaccinePercent({
      organization: 'education',
      tags: '^(((?=.*#grade#)(^(?!.*(_)).*$))|((?=.*#type#)(^(?!.*(_)).*$))).*$',
    });

    return () => {
      setCounts({});
      setDataset([]);
      source.cancel('Operation canceled by the user.');
    };
  }, []);

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
      <legend className="text-black mx-auto px-3">نگاه کلی واکسیناسیون در آموزش و پرورش</legend>

      <div className="flex flex-col justify-between space-y-8 mb-8 mt-12">
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          {/* <Statistic
            icon={totalEmploye1}
            text="مجموع کارمندان آموزشی"
            count={counts.numberOfTeachers || 0}
            loading={countsLoading}
          /> */}
          <Statistic
            icon={totalEmploye2}
            text="مجموع کارمندان اداری"
            count={totalEmploye || 0}
            // count={counts.numberOfEmployees || 0}
            loading={countsLoading}
          />
          <Statistic
            icon={totalStudent}
            text="مجموع دانش آموزان"
            count={totalMembers || 0}
            loading={countsLoading}
          />
          <Statistic
            icon={YellowVaccine}
            text="تعداد واکسیناسیون دوز اول"
            count={counts.numberOfFirstDose || 0}
            loading={countsLoading}
          />
        </div>
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            icon={PurppleVaccine}
            text="تعداد واکسیناسیون دوز دوم"
            count={counts.numberOfSecondDose || 0}
            loading={countsLoading}
          />
          <Statistic
            icon={NavyVaccine}
            text="تعداد واکسیناسیون دوز سوم"
            count={counts.numberOfThirdDose || 0}
            loading={countsLoading}
          />
          <Statistic
            icon={BlueVaccine}
            text="بیش از ۳ دوز"
            count={counts.numberOfMoreThreeDose || 0}
            loading={countsLoading}
          />
        </div>
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            icon={GreenVaccine}
            text="تعداد واکسیناسیون کل دوز"
            count={counts.numberOfAllDose || 0}
            loading={countsLoading}
          />
          <Statistic
            icon={GrayVaccine1}
            text="تعداد اطلاعات مخدوش"
            count={counts.numberOfUnknownDose || 0}
            loading={countsLoading}
          />
          <Statistic
            icon={GrayVaccine2}
            text="تعداد واکسیناسیون انجام نشده"
            count={counts.numberOfUnvaccinated || 0}
            loading={countsLoading}
          />
          {/* <fieldset className="flex flex-col align-center justify-center w-full rounded-xl p-4 relative" /> */}
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

      {loading ? (
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
                      {((page - 1) * 20 + (index + 1)).toPersianDigits()}.{v}
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
                  render: (v: any) => <span>{Number(v).toLocaleString('fa')}%</span>,
                },
                {
                  name: 'سایر دوزها',
                  key: 'otherDose',
                  render: (v: any) => <span>{Number(v).toLocaleString('fa')}%</span>,
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
              totalItems={dataset.length || 0}
            />
          </div>
        </>
      )}
    </fieldset>
  );
};

export default OverviewOfVaccination;
