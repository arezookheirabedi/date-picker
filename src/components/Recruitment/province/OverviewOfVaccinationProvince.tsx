import React, {useEffect, useState} from 'react';
import {Menu} from '@headlessui/react';
import {useHistory, useLocation} from 'react-router-dom';
import vaccineServices from 'src/services/vaccine.service';
import recruitmentServices from 'src/services/recruitment.service';
import Statistic from '../../../containers/Guild/components/Statistic';
import totalEmploye from '../../../assets/images/icons/people-dark-green.svg';
import YellowVaccine from '../../../assets/images/icons/yellow-vaccine-lg.svg';
import GreenVaccine from '../../../assets/images/icons/green-vaccine-lg.svg';
import PurppleVaccine from '../../../assets/images/icons/purpple-vaccine-lg.svg';
import BlueVaccine from '../../../assets/images/icons/blue-vaccine.svg';
import NavyVaccine from '../../../assets/images/icons/navy-vaccine-lg.svg';
import Gray1Vaccine from '../../../assets/images/icons/gray-vaccine-1.svg';
import Gray2Vaccine from '../../../assets/images/icons/gray-vaccine-2.svg';
import Table from '../../TableScope';
import CategoryDonut from '../../../containers/Guild/components/CategoryDonut';
import {sideCities} from '../../../helpers/utils';
import Spinner from '../../Spinner';
import {ReactComponent as DownIcon} from '../../../assets/images/icons/down.svg';

const filterTypes: any[] = [
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
  const [loading, setLoading] = useState(false);
  const [countsLoading, setCountsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [orgDataset, setOrgDataset] = useState<any>([]);
  const [dataset, setDataset] = useState<any>([]);
  const [filterType, setFilterType] = useState({
    name: 'بیشترین',
    enName: 'HIGHEST',
  });
  const [counts, setCounts] = useState<any>({
    numberOfEmployees: 0,
    numberOfFirstDose: 0,
    numberOfSecondDose: 0,
    numberOfThirdDose: 0,
    numberOfMoreThreeDose: 0,
    numberOfAllDose: 0,
    numberOfUnknownDose: 0,
    numberOfUnvaccinated: 0,
  });

  const location = useLocation();
  const history = useHistory();

  async function getOverviewByVaccine(params: any) {
    setCountsLoading(true);
    try {
      const {data} = await vaccineServices.membersGeneral(params);
      let tmp = {
        total: 0,
        numberOfEmployees: 0,
        numberOfFirstDose: 0,
        numberOfSecondDose: 0,
        numberOfThirdDose: 0,
        numberOfMoreThreeDose: 0,
        numberOfAllDose: 0,
        numberOfUnknownDose: 0,
        numberOfUnvaccinated: 0,
      };

      // eslint-disable-next-line
      for (const [key, value] of Object.entries(data.doses)) {
        if (Number(key) === 1) {
          tmp = {...tmp, numberOfFirstDose: Number(value)};
        }

        if (Number(key) === 2) {
          tmp = {...tmp, numberOfSecondDose: Number(value)};
        }

        if (Number(key) === 3 || Number(key) > 3) {
          tmp = {...tmp, numberOfThirdDose: tmp.numberOfThirdDose + Number(value)};
        }

        if (Number(key) === 3) {
          tmp = {...tmp, numberOfThirdDose: Number(value)};
        }

        if (Number(key) !== 0 && key !== 'null' && Number(key) > 3) {
          tmp = {...tmp, numberOfMoreThreeDose: tmp.numberOfMoreThreeDose + Number(value)};
        }

        if (Number(key) !== 0 && key !== 'null') {
          tmp = {...tmp, };
        }

        if (key === 'null') {
          tmp = {...tmp, numberOfUnknownDose: Number(value)};
        }
      }

      tmp = {
        ...tmp,
        numberOfUnvaccinated: Number(data.totalNonVaccinesCount || 0),
        numberOfAllDose: Number(data.gtDoses["0"] || 0),
        total: Number(data.totalPopulation || 0),
      };

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
      const {data} = await recruitmentServices.dosesTagBased(params);
      const normalizedData: any[] = [];

      data.forEach((item: any, index: number) => {
        let firstDose = 0;
        let secondDose = 0;
        let thirdDose = 0;
        let unknownInformation = 0;

        // eslint-disable-next-line
        for (const [key, value] of Object.entries(item.dosesToMembersCountPercentage)) {
          if (Number(key) === 1) {
            firstDose = Number(value);
          }

          if (Number(key) === 2) {
            secondDose = Number(value);
          }

          if (Number(key) === 3) {
            thirdDose += Number(value);
          }

          if (key === 'null') {
            unknownInformation += Number(value);
          }
        }

        normalizedData.push({
          id: `ovvac_${index}`,
          name: item.categoryValue || 'نامشخص',
          firstDosePercentage: firstDose,
          secondDosePercentage: secondDose,
          thirdDosePercentage: thirdDose,
          otherDose: Number(item.gtDosesToTotalDosesPercentage['3'] || 0),
          unknownInformation,
          noDose: Number(item.totalNonVaccinesCountToMembersCountPercentage || 0),
          allDosesPercentage: 100 - Number(item.totalNonVaccinesCountToMembersCountPercentage || 0),
          // allDoses: Number(item.membersCount || 0) - Number(item.totalNonVaccinesCount || 0),
          allDoses: Number(item.gtDoses["0"] || 0),
        });
      });
      setDataset([...normalizedData]);
      setOrgDataset([...normalizedData]);
      setFilterType({
        name: 'بیشترین',
        enName: 'HIGHEST',
      });
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const provinceName = params.get('provinceName') || ('تهران' as any);

    const existsCity = sideCities.some((item: any) => {
      return item.name === provinceName;
    });
    if (existsCity) {
      getOverviewByVaccine({
        province: provinceName,
        tag: 'employee',
        category: 'heName',
      });

      getOverviewByVaccinePercent({
        province: provinceName,
        tag: 'employee',
        category: 'heName',
      });
    } else {
      history.push('/dashboard/recruitment/province');
    }
  }, [location.search]);

  useEffect(() => {
    const tmp = [...orgDataset].sort((a: any, b: any) => {
      // eslint-disable-next-line
      const reverse = filterType.enName === 'HIGHEST' ? 1 : filterType.enName === 'LOWEST' ? -1 : 1;

      if (a.noDose < b.noDose) {
        return reverse * 1;
      }

      if (a.noDose > b.noDose) {
        return reverse * -1;
      }
      // a must be equal to b
      return 0;
    });

    setDataset(tmp);
  }, [filterType]);

  function handleSearch(e: any) {
    const {value} = e.target;

    let tmp = [...orgDataset];
    if (value) {
      tmp = [...tmp].filter(x => x.name.indexOf(value) !== -1);
    }

    setDataset(
      [...tmp].sort((a: any, b: any) => {
        const reverse =
          // eslint-disable-next-line
          filterType.enName === 'HIGHEST' ? 1 : filterType.enName === 'LOWEST' ? -1 : 1;

        if (a.noDose < b.noDose) {
          return reverse * 1;
        }

        if (a.noDose > b.noDose) {
          return reverse * -1;
        }
        // a must be equal to b
        return 0;
      })
    );
    setSearchQuery(value);
  }

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">
        نگاه کلی به واکسیناسیون کارکنان دولت در &nbsp;
        {cityTitle}
      </legend>
      <div className="flex flex-col justify-between space-y-8 mb-8 mt-12">
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            icon={totalEmploye}
            text="مجموع کارکنان دولت"
            count={counts.total || 0}
            loading={countsLoading}
          />
          <Statistic
            icon={YellowVaccine}
            text="تعداد واکسیناسیون دوز اول"
            count={counts.numberOfFirstDose || 0}
            loading={countsLoading}
          />
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
        </div>
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            icon={BlueVaccine}
            text="بیش از ۳ دوز"
            count={counts.numberOfMoreThreeDose || 0}
            loading={countsLoading}
          />
          <Statistic
            icon={GreenVaccine}
            text="تعداد واکسیناسیون کل دوز"
            count={counts.numberOfAllDose || 0}
            loading={countsLoading}
          />
          <Statistic
            icon={Gray1Vaccine}
            text="تعداد اطلاعات مخدوش"
            count={counts.unknownInformation || 0}
            loading={countsLoading}
          />
          <Statistic
            icon={Gray2Vaccine}
            text="تعداد واکسیناسیون انجام نشده"
            count={counts.numberOfUnvaccinated || 0}
            loading={countsLoading}
          />
        </div>
      </div>

      <div className="flex align-center justify-spacebetween space-x-5 rtl:space-x-reverse mb-8">
        <div className="flex align-center">
          <div className="relative inline-flex align-center leading-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 absolute top-1/2 transform -translate-y-1/2 right-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="جستجو"
              className="py-2 px-4 pr-10 text-sm border border-gray-300 rounded-lg focus:outline-none"
              onChange={handleSearch}
              value={searchQuery}
            />
          </div>
        </div>

        <div className="flex flex-grow items-center justify-end space-x-5 rtl:space-x-reverse">
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
                    {filterType?.name || 'کمترین'}
                  </span>
                  <DownIcon className="h-2 w-2.5 mr-2" />
                </Menu.Button>
              </div>

              <Menu.Items
                style={{minWidth: '200px'}}
                className="z-40 absolute left-0 max-w-xs mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
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
              pagination={{pageSize: 10, maxPages: 3}}
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
                      {((page - 1) * 10 + (index + 1)).toPersianDigits()}.
                      {/* eslint-disable-next-line */}
                      {v.replace(/استان\s(.*)_/, '')}
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
