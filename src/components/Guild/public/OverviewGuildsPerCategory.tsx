import React, {useEffect, useState} from 'react';
// import {Menu} from '@headlessui/react';
// @ts-ignore
import moment from 'moment-jalaali';
import {cancelTokenSource, msgRequestCanceled} from 'src/helpers/utils';
import guildService from 'src/services/guild.service';
import DatePickerModal from '../../DatePickerModal';
import Table from '../../TableScopeSort';
import Calendar from '../../Calendar';

import CategoryDonut from '../../../containers/Guild/components/CategoryDonut';
// import {ReactComponent as DownIcon} from '../../../assets/images/icons/down.svg';

interface OverviewGuildsPerCategoryProps {
  cityTitle?: any;
}

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
      setSearchQuery('');
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

  function handleSearch(e: any) {
    const {value} = e.target;

    let tmp = [...orgDataset];
    if (value) {
      tmp = [...tmp].filter(x => x.name.indexOf(value) !== -1);
    }

    setDataset([...tmp]);
    setSearchQuery(value);
  }

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">نگاه کلی به وضعیت رسته‌ها {cityTitle}</legend>

      <div className="flex align-center justify-spacebetween space-x-5 rtl:space-x-reverse mb-8">
        <div className="flex align-center space-x-5 rtl:space-x-reverse">
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
              sortable: true,
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
              sortable: true,
              key: 'infectedCount',
              render: (v: any) => <span>{(v as number).toLocaleString('fa')}</span>,
            },
            {
              name: 'تعداد بهبودیافتگان',
              sortable: true,
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
