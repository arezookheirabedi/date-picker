import React, {useState} from 'react';
import Table from 'src/components/TableScopeSort';
import SingleDatepickerQuery from 'src/components/SingleDatepickerQuery';
import LocalTableSearch from 'src/components/LocalTableSearch';
import useGetOverviewOfVaccinationTable from 'src/hooks/apis/useGetOverviewOfVaccinationTable';
import CategoryDonut from '../../../../containers/Guild/components/CategoryDonut';

const OverviewOfVaccination: React.FC<{}> = () => {
  const [query, setQuery] = useState({
    tag: 'guild',
    category: 'categoryDesc',
    to: null,
  }) as any;

  const {
    data: dataset,
    loading,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    error,
    orgDataset,
    setData,
  } = useGetOverviewOfVaccinationTable(query, true);
  return (
    <fieldset className="mb-16  rounded-xl p-4 text-center">
      <div className="align-center justify-spacebetween mb-8 flex space-x-5 rtl:space-x-reverse">
        <div className="align-center flex space-x-5 rtl:space-x-reverse">
          <div className="flex items-center">
            <SingleDatepickerQuery query={query} setQuery={setQuery} />
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
