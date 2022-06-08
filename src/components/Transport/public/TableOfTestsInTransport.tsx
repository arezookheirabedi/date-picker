import React, {useEffect, useState} from 'react';
// @ts-ignore
import moment from 'moment-jalaali';
// import hcsService from 'src/services/hcs.service';
// import {Menu} from '@headlessui/react';
import guildService from 'src/services/guild.service';
import DatePickerModal from '../../DatePickerModal';
import Calendar from '../../Calendar';

import Table from '../../TableScopeSort';

import CategoryDonut from '../../../containers/Guild/components/CategoryDonut';
import {cancelTokenSource, msgRequestCanceled} from '../../../helpers/utils';
// import {ReactComponent as DownIcon} from '../../../assets/images/icons/down.svg';

// const order = {
//   total: undefined,
//   positiveCountPercentage: undefined,
//   negativeCountPercentage: undefined,
// };

const TableOfTestsInTransport = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  // const [searchQuery, setSearchQuery] = useState('');
  // const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [dataset, setDataset] = useState<any>([]);
  // const [orgDataset, setOrgDataset] = useState<any>([]);
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null,
  }) as any;
  const cancelToken = cancelTokenSource();

  function cancelRequest() {
    cancelToken.cancel(msgRequestCanceled);
  }

  async function getTestResultByCategory(params: any) {
    setLoading(true);
    try {
      const {data} = await guildService.guildTestResultByCategory(params, {
        cancelToken: cancelToken.token,
      });
      const normalizedData: any[] = [];
      data.forEach((item: any, index: number) => {
        normalizedData.push({
          id: `ovca_${index}`,
          name: item.categoryValue || 'نامشخص',
          total: item.testResultsCount || 0,
          positiveCountPercentage: item.positiveTestResultsCountToTestResultsCountPercentage || 0,
          negativeCountPercentage: item.negativeTestResultsCountToTestResultsCountPercentage || 0,
        });
      });
      setDataset([...normalizedData]);
      // setOrgDataset([...normalizedData]);
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
      // setOrgDataset([]);
    };
  }, []);

  const focusFromDate = () => {
    setShowDatePicker(true);
  };

  useEffect(() => {
    if (selectedDayRange.from && selectedDayRange.to) {
      // setSearchQuery('');
      const finalFromDate = `${selectedDayRange.from.year}/${selectedDayRange.from.month}/${selectedDayRange.from.day}`;
      const finalToDate = `${selectedDayRange.to.year}/${selectedDayRange.to.month}/${selectedDayRange.to.day}`;
      getTestResultByCategory({
        tag: 'transport',
        category: 'serviceType',
        from: moment(finalFromDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
        to: moment(finalToDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
      });
    } else {
      getTestResultByCategory({
        tag: 'transport',
        category: 'serviceType',
        from: null,
        to: null,
      });
    }
  }, [selectedDayRange]);

  // function handleSearch(e: any) {
  //   const {value} = e.target;
  //   let tmp = [...orgDataset];
  //   if (value) {
  //     tmp = [...tmp].filter(x => x.name.indexOf(value) !== -1);
  //   }
  //   setDataset([...tmp]);
  //   setSearchQuery(value);
  // }

  // function handlePageChange(page: number = 1) {
  //   setCurrentPage(page);
  // }
  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">آزمایش در حمل و نقل</legend>

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

        {/* <div className="flex flex-grow align-center justify-end"> */}
        {/*  <div className="relative inline-flex align-center leading-3"> */}
        {/*    <svg */}
        {/*      xmlns="http://www.w3.org/2000/svg" */}
        {/*      className="w-4 h-4 absolute top-1/2 transform -translate-y-1/2 right-4" */}
        {/*      fill="none" */}
        {/*      viewBox="0 0 24 24" */}
        {/*      stroke="currentColor" */}
        {/*    > */}
        {/*      <path */}
        {/*        strokeLinecap="round" */}
        {/*        strokeLinejoin="round" */}
        {/*        strokeWidth={2} */}
        {/*        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" */}
        {/*      /> */}
        {/*    </svg> */}
        {/*    <input */}
        {/*      type="text" */}
        {/*      placeholder="جستجوی سازمان" */}
        {/*      className="py-2 px-4 pr-10 text-sm border border-gray-300 rounded-lg focus:outline-none" */}
        {/*      onChange={handleSearch} */}
        {/*      value={searchQuery} */}
        {/*    /> */}
        {/*  </div> */}
        {/* </div> */}
      </div>

      <div className="flex flex-col align-center justify-center w-full rounded-xl bg-white p-4 shadow">
        <Table
          // handlePageChange={handlePageChange}
          // orderMain={order}
          loading={loading}
          dataSet={[...dataset]}
          pagination={{pageSize: 10, maxPages: 3}}
          columns={[
            {
              name: 'وضعیت',
              key: '',
              render: (v: any, record) => (
                <CategoryDonut
                  data={[
                    {
                      name: 'unknownCount',
                      title: 'نامشخص',
                      y: record.unknownCount || 0,
                      color: {
                        linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
                        stops: [
                          [0, '#6E6E6E'], // start
                          [1, '#393939'], // end
                        ],
                      },
                    },
                    {
                      name: 'negativeCountPercentage',
                      title: 'منفی',

                      y: record.negativeCountPercentage || 0,
                      color: {
                        linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
                        stops: [
                          [0, '#05D8A4'], // start
                          [1, '#039572'], // end
                        ],
                      },
                    },
                    {
                      name: 'positiveCountPercentage',
                      title: 'مثبت',

                      y: record.positiveCountPercentage || 0,
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
                  {((page - 1) * 10 + index + 1).toPersianDigits()}.{v}
                </div>
              ),
            },
            {
              name: 'تعداد آزمایش‌های انجام شده',
              key: 'total',
              sortable: true,
              render: (v: any) => (
                <span>
                  {Number(v || 0)
                    .commaSeprator()
                    .toPersianDigits()}
                </span>
              ),
            },
            {
              name: 'درصد تست‌های مثبت',
              key: 'positiveCountPercentage',
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
              name: 'درصد تست‌های منفی',
              key: 'negativeCountPercentage',
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
            // {
            //   name: 'درصد تست‌های نامشخص',
            //   key: 'unknownCount',
            //   render: (v: any, record: any) => (
            //     <span>
            //       {((Number(v || 0) * 100) / Number(record.total || 0) || 0)
            //         .toFixed(4)
            //         .toPersianDigits()}
            //       %
            //     </span>
            //   ),
            // },
          ]}
          totalItems={(dataset || []).length}
        />
      </div>
    </fieldset>
  );
}

export default TableOfTestsInTransport;