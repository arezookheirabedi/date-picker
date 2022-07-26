import React, {useState} from 'react';
import useGetTestResultsTable from "../../../hooks/apis/useGetTestResultsTable";

import Table from '../../TableScopeSort';

import CategoryDonut from '../../../containers/Guild/components/CategoryDonut';
import DatepickerQuery from "../../DatepickerQuery";
import Spinner from "../../Spinner";
import RetryButton from "../../RetryButton";

// import {ReactComponent as DownIcon} from '../../../assets/images/icons/down.svg';

// const order = {
//   total: undefined,
//   positiveCountPercentage: undefined,
//   negativeCountPercentage: undefined,
// };

interface TableOfTestsInTransportProvinceProps {
  cityTitle: any
}

const TableOfTestsInTransportProvince: React.FC<TableOfTestsInTransportProvinceProps> = ({cityTitle}) => {
  const [query, setQuery] = useState({
    tag: 'transport',
    category: 'serviceType',
    from: null,
    to: null,
    retry: false
  })

// eslint-disable-next-line
  const {data: dataset, loading, error: errorMessage} = useGetTestResultsTable(query, true);
  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16" id="province-overview">
      <legend className="text-black mx-auto px-3">
        آزمایش در حمل و نقل در &nbsp;
        {cityTitle}
      </legend>

      <div className="flex align-center justify-spacebetween space-x-5 rtl:space-x-reverse mb-8">
        <div className="flex align-center space-x-5 rtl:space-x-reverse">
          <div className="flex items-center">
            <DatepickerQuery query={query} setQuery={setQuery}/>
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

        {loading && (<div className="p-40"><Spinner/></div>)}
        {errorMessage && !loading && (
          <div className="p-40">
            <div className="text-red-500">{errorMessage}</div>
            <RetryButton setQuery={setQuery}/>
          </div>
        )}


        {!loading && !errorMessage && (
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
        )
        }
      </div>
    </fieldset>
  );
}

export default TableOfTestsInTransportProvince;
