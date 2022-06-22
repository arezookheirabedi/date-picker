import React, {useEffect, useState} from 'react';
import guildService from 'src/services/guild.service';
import {cancelTokenSource, msgRequestCanceled, sideCities} from 'src/helpers/utils';
// @ts-ignore
import moment from 'moment-jalaali';
import Calendar from 'src/components/Calendar';

import DatePickerModal from 'src/components/DatePickerModal';
import Table from 'src/components/TableScopeSort';
import {useHistory, useLocation} from 'react-router-dom';
import CategoryDonut from '../../../../containers/Guild/components/CategoryDonut';

const OverviewOfVaccination: React.FC<{}> = () => {
  const location = useLocation();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null,
    clear: false,
  }) as any;
  const [queryParams, setQueryParams] = useState({
    from: null,
    to: null,
  });
  const [searchQuery, setSearchQuery] = useState('');

  const [orgDataset, setOrgDataset] = useState<any>([]);
  const [dataset, setDataset] = useState<any>([]);

  const cancelToken = cancelTokenSource();

  function cancelRequest() {
    cancelToken.cancel(msgRequestCanceled);
  }

  async function getOverviewByVaccinePercent(params: any) {
    setLoading(true);
    try {
      const {data} = await guildService.dosesTagBased(params, {
        cancelToken: cancelToken.token,
      });

      const normalizedData: any[] = [];
      data.forEach((item: any, index: number) => {
        normalizedData.push({
          id: `ovvac_${index}`,
          name: item.categoryValue || 'نامشخص',
          firstDosePercentage: Number(item.dosesToMembersCountPercentage[1] || 0),
          secondDosePercentage: Number(item.dosesToMembersCountPercentage[2] || 0),
          thirdDosePercentage: Number(item.dosesToMembersCountPercentage[3] || 0),
          otherDosesPercentage: Number(item.gtDosesToTotalDosesPercentage[3] || 0),
          allDosesPercentage: 100 - Number(item.totalNonVaccinesCountToMembersCountPercentage || 0),
          allDoses: Number(item.gtDoses['0'] || 0),
          noDose: Number(item.totalNonVaccinesCountToMembersCountPercentage || 0),
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
    if (selectedDayRange.from && selectedDayRange.to) {
      setSearchQuery('');
      const finalFromDate = `${selectedDayRange.from.year}/${selectedDayRange.from.month}/${selectedDayRange.from.day}`;
      const finalToDate = `${selectedDayRange.to.year}/${selectedDayRange.to.month}/${selectedDayRange.to.day}`;
      setQueryParams({
        from: moment(finalFromDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
        to: moment(finalToDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
      });
    }
    if (selectedDayRange.clear) {
      setQueryParams({
        from: null,
        to: null,
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

  function handleSearch(e: any) {
    const {value} = e.target;
    let tmp = [...orgDataset];
    if (value) {
      tmp = [...tmp].filter(x => x.name.indexOf(value) !== -1);
    }
    setDataset([...tmp]);
    setSearchQuery(value);
  }
  const focusFromDate = () => {
    setShowDatePicker(true);
  };

  return (
    <fieldset className="mb-16  rounded-xl p-4 text-center">
      <div className="align-center justify-spacebetween mb-8 flex space-x-5 rtl:space-x-reverse">
        <div className="align-center flex space-x-5 rtl:space-x-reverse">
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
              placeholder="جستجوی واحد صنفی"
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
                      title: 'واکسن نزده',
                      y: record.noDose || 0,
                      color: {
                        linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
                        stops: [
                          [0, '#05D8A4'], // start
                          [1, '#039572'], // end
                        ],
                      },
                    },
                    {
                      name: 'allDosesPercentage',
                      title: 'واکسن زده',
                      y: record.allDosesPercentage || 0,
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
              name: 'دوز اول',
              sortable: true,

              key: 'firstDosePercentage',
              render: (v: any) => <span>{Number(v).toLocaleString('fa')}%</span>,
            },
            {
              name: 'دوز دوم',
              key: 'secondDosePercentage',
              sortable: true,
              render: (v: any) => <span>{Number(v).toLocaleString('fa')}%</span>,
            },
            {
              name: 'دوز سوم',
              sortable: true,
              key: 'thirdDosePercentage',
              render: (v: any) => <span>{Number(v).toLocaleString('fa')}%</span>,
            },
            {
              name: 'سایر دوزها',
              key: 'otherDosesPercentage',
              render: (v: any) => <span>{Number(v).toLocaleString('fa')}%</span>,
            },
            {
              name: 'کل دوزها',
              key: 'allDoses',
              sortable: true,
              render: (v: any) => <span>{Number(v).toLocaleString('fa')}</span>,
            },
            // {
            //   name: 'واکسن نزده',
            //   key: 'noDose',
            //   render: (v: any) => <span>{Number(v).toLocaleString('fa')}%</span>,
            // },
          ]}
          totalItems={dataset.length || 0}
        />
      </div>
    </fieldset>
  );
};

export default OverviewOfVaccination;
