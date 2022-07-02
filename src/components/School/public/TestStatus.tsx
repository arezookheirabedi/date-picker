import React, {useState} from 'react';
import DatepickerQuery from 'src/components/DatepickerQuery';

import Table from 'src/components/TableScopeSort';
import useGetTestResultsTable from 'src/hooks/apis/useGetTestResultsTable';

import CategoryDonut from '../../../containers/Guild/components/CategoryDonut';

const PageSize = 10;
const TestStatus: React.FC<{}> = () => {
  const [query, setQuery] = useState({
    from: null,
    to: null,
    tag: 'edu',
    category: 'grade',
  });
  const {
    data: dataset,
    loading,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    error,
  } = useGetTestResultsTable(query);
  return (
    <fieldset className="mb-16 rounded-xl border p-4 text-center">
      <legend className="mx-auto px-3 text-black">آزمایش در آموزش و پرورش</legend>
      <div className="align-center mb-8 flex justify-start space-x-5 rtl:space-x-reverse">
        <div className="flex items-center">
          {' '}
          <DatepickerQuery query={query} setQuery={setQuery} />
        </div>
      </div>
      <div className="align-center flex w-full flex-col justify-center rounded-xl bg-white p-4 shadow">
        <Table
          loading={loading}
          dataSet={[...dataset]}
          pagination={{pageSize: PageSize, maxPages: 3}}
          columns={[
            {
              name: 'وضعیت',
              key: '',
              render: (v: any, record) => (
                <CategoryDonut
                  data={[
                    {
                      name: 'unknownCount',
                      title: 'درصد تست‌های نامشخص',
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
                      name: 'positiveCountPercentage',
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
                  {((page - 1) * PageSize + (index + 1)).toPersianDigits()}.{v}
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
              sortable: true,

              name: 'درصد تست‌های مثبت',
              key: 'positiveCountPercentage',
              render: (v: any) => <span>{Number(v || 0).toPersianDigits()}%</span>,
            },
            {
              sortable: true,
              name: 'درصد تست‌های منفی',
              key: 'negativeCountPercentage',
              render: (v: any) => <span>{Number(v || 0).toPersianDigits()}%</span>,
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
          totalItems={(dataset || []).length || 0}
        />
      </div>
    </fieldset>
  );
};

export default TestStatus;
