import React, {useState, useEffect} from 'react';
import {Menu} from '@headlessui/react';
import {useHistory, useLocation} from 'react-router-dom';
import {sideCities} from 'src/helpers/utils';
import axios from 'axios';
import CategoryDonut from 'src/containers/Guild/components/CategoryDonut';
import Spinner from '../../../Spinner';
import hcsService from '../../../../services/hcs.service';
// import { toPersianDigit } from 'src/helpers/utils';
import Table from '../../../TableScope';

// @ts-ignore
// import moment from 'moment-jalaali';

// import DatePickerModal from '../../../DatePickerModal';
// import Calendar from '../../../Calendar';
import {ReactComponent as DownIcon} from '../../../../assets/images/icons/down.svg';

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

const OverviewPassengersStatusVacsinateTable: React.FC<{}> = () => {
  const [datasetLoading, setDatasetLoading] = useState<any>([]);
  const [filterType, setFilterType] = useState({
    name: 'پیشفرض',
    enName: '',
  });
  const [orgDataset, setOrgDataset] = useState<any>([]);
  const [dataset, setDataset] = useState<any>([]);

  const {CancelToken} = axios;
  const source = CancelToken.source();

  const location = useLocation();
  const history = useHistory();

  const getOverviewByVaccine = async (province: any) => {
    setDatasetLoading(true);
    try {
      const {data} = await hcsService.tripVaccinationOverview({lang: 'fa', province});
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

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const provinceName = params.get('provinceName') || ('تهران' as any);

    const existsCity = sideCities.some((item: any) => {
      return item.name === provinceName;
    });
    if (existsCity) {
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
    <div className="mt-5">
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
                  render: (v: any) => (
                    <span>{v >= 0 ? `${Number(v).toLocaleString('fa')}%` : 'نامشخص'}</span>
                  ),
                },
                {
                  name: 'سایر دوزها',
                  key: 'otherDose',
                  render: (v: any) => (
                    <span>{v >= 0 ? `${Number(v).toLocaleString('fa')}%` : 'نامشخص'}</span>
                  ),
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
    </div>
  );
};

export default OverviewPassengersStatusVacsinateTable;
