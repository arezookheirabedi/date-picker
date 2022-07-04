import React, {useState} from 'react';
import useGetTestResultsTable from 'src/hooks/apis/useGetTestResultsTable';
import LocalTableSearch from 'src/components/LocalTableSearch';
import DatepickerQuery from 'src/components/DatepickerQuery';
import CategoryDonut from '../../../containers/Guild/components/CategoryDonut';
import Table from '../../TableScopeSort';

interface ITestStatusProps {
  cityTitle?: any;
}
const TestStatus: React.FC<ITestStatusProps> = ({cityTitle}) => {
  const [query, setQuery] = useState({
    from: null,
    to: null,
    tag: 'guild',
    category: 'categoryDesc',
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {
    data: dataset,
    loading,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    error,
    orgDataset,
    setData,
  } = useGetTestResultsTable(query, true);
  return (
    <fieldset className="mb-16 rounded-xl border p-4 text-center">
      <legend className="mx-auto px-3 text-black">آزمایش در اصناف استان {cityTitle}</legend>
      <div className="align-center justify-spacebetween mb-8 flex space-x-5 rtl:space-x-reverse">
        <div className="align-center flex space-x-5 rtl:space-x-reverse">
          <div className="flex items-center">
            <DatepickerQuery query={query} setQuery={setQuery} />
          </div>
        </div>

        <div className="align-center flex flex-grow justify-end">
          <div className="align-center relative inline-flex leading-3">
            <LocalTableSearch
              orgDataset={orgDataset}
              setData={setData}
              query={query}
              placeholder="جستجوی واحد صنفی"
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
              name: 'وضعیت',
              key: '',
              render: (v: any, record) => (
                <CategoryDonut
                  data={[
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
              name: 'نام رسته',
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
          ]}
          totalItems={(dataset || []).length}
        />
      </div>
    </fieldset>
  );
};

export default TestStatus;
