import React, {useEffect, useState} from 'react';
import guildService from 'src/services/guild.service';
import {cancelTokenSource, msgRequestCanceled} from 'src/helpers/utils';
// @ts-ignore
import moment from 'moment-jalaali';
import Calendar from 'src/components/Calendar';

import DatePickerModal from 'src/components/DatePickerModal';
import Table from 'src/components/TableScopeSort';
import CategoryDonut from '../../../../containers/Guild/components/CategoryDonut';

const OverviewOfVaccination: React.FC<{}> = () => {
  const [loading, setLoading] = useState(false);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null,
  }) as any;
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
          thirdDosePercentage: Number(item.dosesToMembersCountPercentage[3] || 0),
          otherDosesPercentage: Number(item.dosesToMembersCountPercentage[4] || 0),
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
      getOverviewByVaccinePercent({
        tag: 'guild',
        category: 'categoryDesc',
        from: moment(finalFromDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
        to: moment(finalToDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
      });
    } else {
      getOverviewByVaccinePercent({
        tag: 'guild',
        category: 'categoryDesc',
        from: null,
        to: null,
      });
    }
  }, [selectedDayRange]);
  useEffect(() => {
    return () => {
      cancelRequest();
      setDataset([]);
      setOrgDataset([]);
    };
  }, []);

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
    <fieldset className="text-center border rounded-xl p-4 mb-16">
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
