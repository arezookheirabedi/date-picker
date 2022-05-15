import React, {useEffect, useState} from 'react';
// import {Menu} from '@headlessui/react';
// @ts-ignore
import moment from 'moment-jalaali';
import {cancelTokenSource, msgRequestCanceled} from 'src/helpers/utils';
import guildService from 'src/services/guild.service';
import DatePickerModal from '../../DatePickerModal';
import Table from '../../TableScope';
import Calendar from '../../Calendar';

import CategoryDonut from '../../../containers/Guild/components/CategoryDonut';
// import {ReactComponent as DownIcon} from '../../../assets/images/icons/down.svg';

interface OverviewGuildsPerCategoryProps {
  cityTitle?: any;
}

// const filterTypes = [
//   {
//     name: 'بیشترین',
//     enName: 'HIGHEST',
//   },
//   {
//     name: 'کمترین',
//     enName: 'LOWEST',
//   },
// ];

const OverviewGuildsPerCategory: React.FC<OverviewGuildsPerCategoryProps> = ({cityTitle}) => {
  // const [filterType, setFilterType] = useState({name: 'بیشترین', enName: 'HIGHEST'});
  const [showDatePicker, setShowDatePicker] = useState(false);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [dataset, setDataset] = useState<any>([]);
  // eslint-disable-next-line
  const [orgDataset, setOrgDataset] = useState<any>([]);
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null,
  }) as any;

  const cancelToken = cancelTokenSource();

  function cancelRequest() {
    cancelToken.cancel(msgRequestCanceled);
  }

  async function getOverviewByCategory(params: any) {
    setLoading(true);
    try {
      const {data} = await guildService.guildOverviewByCategory(params, {
        cancelToken: cancelToken.token,
      });

      const normalizedData: any[] = [];
      data.forEach((item: any, index: number) => {
        normalizedData.push({
          id: `ovca_${index}`,
          name: item.categoryValue || 'نامشخص',
          employeesCount: item.membersCount || 0,
          infectedCount: item.positiveMembersCount || 0,
          infectedPercent: item.positiveMembersCountToMembersCountPercentage || 0,
          saveCount: item.recoveredMembersCount || 0,
          deadCount: 0,
        });
      });

      setDataset([...normalizedData]);
      setOrgDataset([...normalizedData]);
      // setFilterType({
      //   name: 'بیشترین',
      //   enName: 'HIGHEST',
      // });
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    return () => {
      cancelRequest();
      setDataset([]);
      setOrgDataset([]);
    };
  }, []);

  const focusFromDate = () => {
    setShowDatePicker(true);
  };

  useEffect(() => {
    if (selectedDayRange.from && selectedDayRange.to) {
      const finalFromDate = `${selectedDayRange.from.year}/${selectedDayRange.from.month}/${selectedDayRange.from.day}`;
      const finalToDate = `${selectedDayRange.to.year}/${selectedDayRange.to.month}/${selectedDayRange.to.day}`;
      getOverviewByCategory({
        tag: 'guild',
        category: 'categoryDesc',
        from: moment(finalFromDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
        to: moment(finalToDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
      });
    } else {
      getOverviewByCategory({
        tag: 'guild',
        category: 'categoryDesc',
        from: null,
        to: null,
      });
    }
  }, [selectedDayRange]);

  // useEffect(() => {
  //   const tmp = [...orgDataset].sort((a: any, b: any) => {
  //     // eslint-disable-next-line
  //     const reverse = filterType.enName === 'HIGHEST' ? 1 : filterType.enName === 'LOWEST' ? -1 : 1;

  //     if (a.infectedPercent < b.infectedPercent) {
  //       return reverse * 1;
  //     }

  //     if (a.infectedPercent > b.infectedPercent) {
  //       return reverse * -1;
  //     }
  //     // a must be equal to b
  //     return 0;
  //   });

  //   setDataset(tmp);
  // }, [filterType]);

  function handleSearch(e: any) {
    const {value} = e.target;

    let tmp = [...orgDataset];
    if (value) {
      tmp = [...tmp].filter(x => x.name.indexOf(value) !== -1);
    }

    // setDataset(
    //   [...tmp].sort((a: any, b: any) => {
    //     const reverse =
    //       // eslint-disable-next-line
    //       filterType.enName === 'HIGHEST' ? 1 : filterType.enName === 'LOWEST' ? -1 : 1;

    //     if (a.infectedPercent < b.infectedPercent) {
    //       return reverse * 1;
    //     }

    //     if (a.infectedPercent > b.infectedPercent) {
    //       return reverse * -1;
    //     }
    //     // a must be equal to b
    //     return 0;
    //   })
    // );
    setDataset([...tmp]);
    setSearchQuery(value);
  }

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">نگاه کلی به وضعیت رسته‌ها {cityTitle}</legend>

      <div className="flex align-center justify-spacebetween space-x-5 rtl:space-x-reverse mb-8">
        <div className="flex align-center space-x-5 rtl:space-x-reverse">
          {/* <div className="flex items-center">
            <Menu
              as="div"
              className="relative z-20 inline-block text-left shadow-custom rounded-lg px-5 py-1 "
            >
              <div>
                <Menu.Button className="inline-flex justify-between items-center w-full py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                  <span className="ml-10 whitespace-nowrap truncate">
                    {filterType?.name || 'بیشترین'}
                  </span>
                  <DownIcon className="h-2 w-2.5 mr-2" />
                </Menu.Button>
              </div>

              <Menu.Items
                style={{width: '250px'}}
                className="z-40 absolute left-0 xl:right-0 max-w-xs mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
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
          </div> */}

          <div className="flex items-center">
            {showDatePicker ? (
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
            />
          </div>
        </div>

        <div className="flex flex-grow align-center justify-end">
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
              placeholder="جستجوی واحد صنفی"
              className="py-2 px-4 pr-10 text-sm border border-gray-300 rounded-lg focus:outline-none"
              onChange={handleSearch}
              value={searchQuery}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col align-center justify-center w-full rounded-xl bg-white p-4 shadow">
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
                      name: 'deadCount',
                      title: 'تعداد فوت‌شدگان',
                      y: record.deadCount || 0,
                      color: {
                        linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
                        stops: [
                          [0, '#6E6E6E'], // start
                          [1, '#393939'], // end
                        ],
                      },
                    },
                    {
                      name: 'saveCount',
                      title: 'تعداد بهبودیافتگان',
                      y: record.saveCount || 0,
                      color: {
                        linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
                        stops: [
                          [0, '#05D8A4'], // start
                          [1, '#039572'], // end
                        ],
                      },
                    },
                    {
                      name: 'infectedCount',
                      title: 'تعداد مبتلایان',
                      y: record.infectedCount || 0,
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
              name: 'نام رسته',
              key: 'name',
              render: (v: any, record, index: number, page: number) => (
                <div className="flex">
                  {((page - 1) * 10 + (index + 1)).toLocaleString('fa')}.{v}
                </div>
              ),
            },
            {
              name: 'تعداد کارمندان',
              key: 'employeesCount',
              render: (v: any) => <span>{(v as number).toLocaleString('fa')}</span>,
            },
            {
              name: 'درصد ابتلا',
              key: 'infectedPercent',
              render: (v: any) => (
                <span>
                  {Number(v || 0).toLocaleString('fa', {
                    minimumFractionDigits: 4,
                  })}
                  %
                </span>
              ),
            },
            {
              name: 'تعداد مبتلایان',
              key: 'infectedCount',
              render: (v: any) => <span>{(v as number).toLocaleString('fa')}</span>,
            },
            {
              name: 'تعداد بهبودیافتگان',
              key: 'saveCount',
              render: (v: any) => (
                <span>{v || v === 0 ? (v as number).toLocaleString('fa') : '-'}</span>
              ),
            },
            {
              name: 'تعداد فوت‌شدگان',
              key: 'deadCount',
              render: (v: any) => (
                <span>{v || v === 0 ? (v as number).toLocaleString('fa') : '-'}</span>
              ),
            },
          ]}
          totalItems={(dataset || []).length}
        />
      </div>
    </fieldset>
  );
};

export default OverviewGuildsPerCategory;
