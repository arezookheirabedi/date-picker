import React, {useEffect, useState} from 'react';
import {Menu} from '@headlessui/react';
// @ts-ignore
import moment from 'moment-jalaali';
import guildService from 'src/services/guild.service';
import {useHistory, useLocation} from 'react-router-dom';
import {cancelTokenSource, msgRequestCanceled, sideCities, toPersianDigit} from 'src/helpers/utils';
import Table from '../../TableScope';
import CategoryDonut from '../../../containers/Guild/components/CategoryDonut';
import {ReactComponent as DownIcon} from '../../../assets/images/icons/down.svg';
import DatePickerModal from '../../DatePickerModal';
import calendar from '../../../assets/images/icons/calendar.svg';

interface OverviewOfVaccinationProps {
  cityTitle?: string;
}

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

const OverviewOfVaccination: React.FC<OverviewOfVaccinationProps> = ({cityTitle}) => {
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  // eslint-disable-next-line
  const [orgDataset, setOrgDataset] = useState<any>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dataset, setDataset] = useState<any>([]);
  const [filterType, setFilterType] = useState({
    name: 'بیشترین',
    enName: 'HIGHEST',
  });
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null,
    clear: false,
  }) as any;
  const [queryParams, setQueryParams] = useState({
    from: null,
    to: null,
    tags: [],
  });
  const location = useLocation();
  const history = useHistory();

  const cancelToken = cancelTokenSource();

  function cancelRequest() {
    cancelToken.cancel(msgRequestCanceled);
  }
  // eslint-disable-next-line
  async function getOverviewByVaccinePercent(params: any) {
    setLoading(true);
    try {
      const {data} = await guildService.dosesTagBased(params, {
        cancelToken: cancelToken.token,
      });

      const normalizedData: any[] = [];
      data.forEach((item: any, index: number) => {
        let firstDose = 0;
        // eslint-disable-next-line
        for (const [key, value] of Object.entries(item.dosesToMembersCountPercentage)) {
          if (Number(key) === 1) {
            firstDose = Number(value);
          }
        }

        normalizedData.push({
          id: `ovvac_${index}`,
          name: item.categoryValue || 'نامشخص',
          firstDosePercentage: firstDose,
          secondDosePercentage: Number(item.dosesToMembersCountPercentage[2] || 0),
          allDosesPercentage: 100 - Number(item.totalNonVaccinesCountToMembersCountPercentage || 0),
          allDoses: Number(item.gtDoses['0'] || 0),
          noDose: Number(item.totalNonVaccinesCountToMembersCountPercentage || 0),
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
    if (selectedDayRange.from && selectedDayRange.to) {
      const finalFromDate = `${selectedDayRange.from.year}/${selectedDayRange.from.month}/${selectedDayRange.from.day}`;
      const finalToDate = `${selectedDayRange.to.year}/${selectedDayRange.to.month}/${selectedDayRange.to.day}`;
      setQueryParams({
        ...queryParams,
        from: moment(finalFromDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
        to: moment(finalToDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
        tags: [],
      });
    }
    if (selectedDayRange.clear) {
      setQueryParams({
        ...queryParams,
        from: null,
        to: null,
        tags: [],
      });
    }
  }, [selectedDayRange]);
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const provinceName = params.get('provinceName') || ('تهران' as any);

    const existsCity = sideCities.some((item: any) => {
      return item.name === provinceName;
    });
    if (existsCity) {
      getOverviewByVaccinePercent({
        ...queryParams,
        tag: 'guild',
        category: 'categoryDesc',
        province: provinceName,
      });
    } else {
      history.push('/dashboard/guild/province');
    }
    return () => {
      cancelRequest();
      setDataset([]);
      setOrgDataset([]);
    };
  }, [queryParams, location.search]);

  useEffect(() => {
    const tmp = [...orgDataset].sort((a: any, b: any) => {
      // eslint-disable-next-line
      const reverse = filterType.enName === 'HIGHEST' ? 1 : filterType.enName === 'LOWEST' ? -1 : 1;

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
    });
  };
  return (
    <fieldset className="mb-16 rounded-xl border p-4 text-center">
      <legend className="mx-auto px-3 text-black">
        بیشترین واکسیناسیون در اصناف در &nbsp;
        {cityTitle}
      </legend>

      <div className="align-center justify-spacebetween mb-8 flex space-x-5 rtl:space-x-reverse">
        <div className="align-center flex space-x-5 rtl:space-x-reverse">
          <div className="flex items-center">
            <Menu
              as="div"
              className="shadow-custom relative z-20 inline-block rounded-lg px-5 py-1 text-left "
            >
              <div>
                <Menu.Button className="focus:outline-none inline-flex w-full items-center justify-between py-2 text-sm font-medium focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                  {/* <div className="flex items-center flex-row-reverse xl:flex-row"> */}
                  {/* <img src={avatar} alt="z" className="w-5 h-5" /> */}
                  <span className="ml-10 truncate whitespace-nowrap">
                    {filterType?.name || 'بیشترین'}
                  </span>
                  <DownIcon className="mr-2 h-2 w-2.5" />
                </Menu.Button>
              </div>

              <Menu.Items
                style={{width: '250px'}}
                className="focus:outline-none absolute left-0 z-40 mt-2 max-w-xs origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 xl:right-0"
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
                            } group flex w-full items-center truncate whitespace-nowrap rounded-md px-2 py-2 text-sm text-gray-900`}
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

          <div className="flex items-center">
            {showDatePicker ? (
              <DatePickerModal
                setSelectedDayRange={setSelectedDayRange}
                selectedDayRange={selectedDayRange}
                setShowDatePicker={setShowDatePicker}
                showDatePicker
              />
            ) : null}

            <div className="shadow-custom relative z-20 inline-block rounded-lg px-4 py-1 text-left">
              <div
                className="focus:outline-none inline-flex w-full cursor-pointer items-center justify-center py-2 text-sm font-medium focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                onClick={focusFromDate}
              >
                {selectedDayRange.from && (
                  <span className="ml-4 truncate whitespace-nowrap text-xs">
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
                  <img src={calendar} alt="x" className="h-5 w-5" />
                )}
              </div>
            </div>
            <div className="mx-4 flex items-center justify-start">
              <span className="dash-separator" />
            </div>
            <div className=" shadow-custom rounded-lg px-4 py-1">
              <div
                className="focus:outline-none flex w-full cursor-pointer items-center justify-center py-2 text-sm font-medium focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                onClick={focusFromDate}
              >
                {selectedDayRange.to && (
                  <span className="ml-4 truncate whitespace-nowrap text-xs">
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
                  <img src={calendar} alt="x" className="h-5 w-5" />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="align-center flex flex-grow justify-end">
          <div className="align-center relative inline-flex leading-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 transform"
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
              placeholder="جستجوی سازمان"
              className="focus:outline-none rounded-lg border border-gray-300 py-2 px-4 pr-10 text-sm"
              onChange={handleSearch}
              value={searchQuery}
            />
          </div>
        </div>
      </div>

      <div className="align-center flex w-full flex-col justify-center rounded-xl bg-white p-4 shadow">
        <Table
          loading={loading}
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
                      name: 'noDose',
                      title: 'نزده‌ها',
                      y: record.noDose || 0,
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
                      name: 'firstDosePercentage',
                      title: 'واکسن اول',
                      y: record.firstDosePercentage || 0,
                      color: {
                        linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
                        stops: [
                          [0, '#F5DF34'], // start
                          [1, '#d4c12d'], // end
                        ],
                      },
                    },
                  ]}
                />
              ),
              className: 'flex justify-center w-full',
            },
            {
              name: 'نام رسته',
              key: 'name',
              render: (v: any, record, index: number, page: number) => (
                <div className="flex">
                  {((page - 1) * 10 + (index + 1)).toLocaleString('fa')}.{v}
                </div>
              ),
            },
            {
              name: 'دو دوز',
              key: 'secondDosePercentage',
              render: (v: any) => <span>{Number(v).toLocaleString('fa')}%</span>,
            },
            {
              name: 'کل دوزها',
              key: 'allDoses',
              render: (v: any) => <span>{Number(v).toLocaleString('fa')}</span>,
            },
            {
              name: 'واکسن نزده',
              key: 'noDose',
              render: (v: any) => <span>{Number(v).toLocaleString('fa')}%</span>,
            },
          ]}
          totalItems={dataset.length || 0}
        />
      </div>
    </fieldset>
  );
};

export default OverviewOfVaccination;
