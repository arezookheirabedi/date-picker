import React, {useState} from 'react';
import CategoryDonut from 'src/containers/Guild/components/CategoryDonut';
import Table from 'src/components/TableScopeSort';
import useGetOverviewOfVaccinationTable from 'src/hooks/apis/useGetOverviewOfVaccinationTable';
import SingleDatepickerQuery from 'src/components/SingleDatepickerQuery';
import RetryButton from 'src/components/RetryButton';

const OverviewOfVaccination: React.FC<{}> = () => {
  const [query, setQuery] = useState({
    tag: 'edu',
    category: 'grade',
    to: null,
    retry: false,
  }) as any;

  const {
    data: dataset,
    loading,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    error,
  } = useGetOverviewOfVaccinationTable(query);

  return (
    <fieldset className="mb-16  p-4 text-center">
      <div className="align-center justify-spacebetween mb-8 flex space-x-5 rtl:space-x-reverse">
        <div className="align-center flex space-x-5 rtl:space-x-reverse">
          <div className="flex items-center">
            <SingleDatepickerQuery query={query} setQuery={setQuery} />
          </div>
        </div>
      </div>
      <div className="align-center flex w-full flex-col justify-center rounded-xl bg-white p-4 shadow">
        {error && !loading ? (
          <div className="p-40">
            <div className="text-red-500">{error}</div>
            <RetryButton setQuery={setQuery} />
          </div>
        ) : (
          <Table
            totalItems={dataset.length || 0}
            loading={loading}
            dataSet={[...dataset]}
            pagination={{pageSize: 10, maxPages: 3}}
            columns={[
              {
                name: 'وضعیت کلی',
                key: '',
                render: (v: any, record: any) => (
                  <CategoryDonut
                    data={[
                      {
                        name: 'unknownInformation',
                        title: 'مخدوش',
                        y: record.unknownInformation || 0,
                        color: {
                          linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
                          stops: [
                            [0, '#6E6E6E'], // start
                            [1, '#393939'], // end
                          ],
                        },
                      },
                      {
                        name: 'allDosesPercentage',

                        title: 'دوز کل',
                        y: record.allDosesPercentage || 0,
                        color: {
                          linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
                          stops: [
                            [0, '#05D8A4'], // start
                            [1, '#039572'], // end
                          ],
                        },
                      },
                      {
                        name: 'noDose',
                        title: 'واکسن نزده',
                        y: record.noDose || 0,
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
                name: 'دوز اول',
                key: 'firstDosePercentage',
                sortable: true,
                render: (v: any) => <span>{Number(v).toLocaleString('fa')}%</span>,
              },
              {
                name: 'دوز دوم',
                sortable: true,

                key: 'secondDosePercentage',
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
                key: 'otherDose',
                render: (v: any) => <span>{Number(v).toLocaleString('fa')}%</span>,
              },
              {
                name: 'کل دوزها',
                sortable: true,
                key: 'allDoses',
                render: (v: any) => <span>{Number(v).commaSeprator().toPersianDigits()}</span>,
              },
            ]}
          />
        )}
      </div>
    </fieldset>
  );
};

export default OverviewOfVaccination;
