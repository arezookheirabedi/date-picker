import React, {useState} from 'react';
import Table from 'src/components/TableScopeSort';
import useGetOverviewOfCategories from 'src/hooks/apis/useGetOverviewOfCategories';
import DatepickerQuery from 'src/components/DatepickerQuery';
import CategoryDonut from '../../../containers/Guild/components/CategoryDonut';

interface OverviewCategoriesProvinceProps {
  cityTitle?: any;
}

const OverviewCategoriesProvince: React.FC<OverviewCategoriesProvinceProps> = ({cityTitle}) => {
  const [query, setQuery] = useState({
    from: null,
    to: null,
    tag: 'edu',
    category: 'grade',
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {
    data: dataset,
    loading,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    error,
  } = useGetOverviewOfCategories(query, true);

  return (
    <fieldset className="mb-16 rounded-xl border p-4 text-center">
      <legend className="mx-auto px-3 text-black">
        نگاه کلی به آموزش و پرورش در استان &nbsp;
        {cityTitle}
      </legend>

      <div className="mb-8 flex flex-grow items-center justify-start space-x-5 rtl:space-x-reverse">
        <div className="align-center flex justify-start">
          <DatepickerQuery query={query} setQuery={setQuery} />
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
              name: 'دسته',
              key: 'name',
              render: (v: any, record, index: number) => (
                <span>
                  {(index + 1).toLocaleString('fa')}.{v}
                </span>
              ),
            },
            {
              sortable: true,
              name: 'تعداد ',
              key: 'employeesCount',
              render: (v: any) => <span>{(v as number).toLocaleString('fa')}</span>,
            },
            {
              sortable: true,
              name: 'درصد ابتلا',
              key: 'infectedPercent',
              render: (v: any) => (
                <span>
                  {Number(v).toLocaleString('fa', {
                    minimumFractionDigits: 4,
                  })}
                  %
                </span>
              ),
            },
            {
              sortable: true,
              name: 'تعداد مبتلایان',
              key: 'infectedCount',
              render: (v: any) => <span>{(v as number).toLocaleString('fa')}</span>,
            },
            {
              sortable: true,
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

export default OverviewCategoriesProvince;
