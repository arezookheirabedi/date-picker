import React, {useState} from 'react';
import Table from '../../TableScopeSort';
import CategoryDonut from '../../../containers/Guild/components/CategoryDonut';
import DatepickerQuery from "../../DatepickerQuery";
import useGetTestResultsTable from "../../../hooks/apis/useGetTestResultsTable";
import LocalTableSearch from "../../LocalTableSearch";
import Spinner from "../../Spinner";
import RetryButton from "../../RetryButton";

const TestStatus: React.FC<{}> = () => {
  const [query, setQuery] = useState({
    tag: 'employee',
    category: 'heName',
    from: null,
    to: null,
    retry: false
  })

// eslint-disable-next-line
  const {data: dataset, loading, error: errorMessage, orgDataset, setData} = useGetTestResultsTable(query);

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">وضعیت آزمایش کارکنان دولت</legend>

      <div className="flex align-center justify-between space-x-5 rtl:space-x-reverse mb-8">
        <div className="flex flex-grow align-center justify-between space-x-5 rtl:space-x-reverse">

          <div className="flex items-center">
            <DatepickerQuery query={query} setQuery={setQuery}/>
          </div>
        </div>
        <div className="flex align-center">
          <div className="relative inline-flex align-center leading-3">
            <LocalTableSearch orgDataset={orgDataset} setData={setData} query={query}/>
          </div>
        </div>
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
                      // {
                      //   name: 'unknownCount',
                      //   title: 'درصد تست‌های نامشخص',
                      //   y: record.unknownCount || 0,
                      //   color: {
                      //     linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
                      //     stops: [
                      //       [0, '#6E6E6E'], // start
                      //       [1, '#393939'], // end
                      //     ],
                      //   },
                      // },
                      {
                        name: 'negativeCount',
                        title: 'درصد تست‌های منفی',
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
                        name: 'positiveCount',
                        title: 'درصد تست‌های مثبت',
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
                name: 'سازمان',
                key: 'name',
                render: (v: any, record, index: number, page: number) => (
                  <div className="flex">
                    {((page - 1) * 10 + index + 1).toPersianDigits()}.{v}
                  </div>
                ),
              },
              {
                name: 'تعداد کارکنان',
                key: 'employeesCount',
                render: () => <span>-</span>,
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
                key: 'positiveCount',
                sortable: true,
                render: (v: any, record: any) => (
                  <span>
                  {(record.positiveCountPercentage || 0).toLocaleString('fa')}
                    %
                </span>
                ),
              },
              {
                name: 'درصد تست‌های منفی',
                key: 'negativeCount',
                sortable: true,
                render: (v: any, record: any) => (
                  <span>
                  {(record.negativeCountPercentage || 0).toLocaleString('fa')}
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
};

export default TestStatus;
