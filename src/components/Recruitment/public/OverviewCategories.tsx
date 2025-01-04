import React, {useState} from 'react';
import Table from '../../TableScopeSort';
import CategoryDonut from '../../../containers/Guild/components/CategoryDonut';
import useGetOverviewOfCategories from "../../../hooks/apis/useGetOverviewOfCategories";
import DatepickerQuery from "../../DatepickerQuery";
import LocalTableSearch from "../../LocalTableSearch";
import Spinner from "../../Spinner";
import RetryButton from "../../RetryButton";

const OverviewCategories: React.FC<{}> = () => {

  const [query, setQuery] = useState({
    tag: 'employee',
    category: 'heName',
    from: null,
    to: null,
    retry: false
  }) as any;

  // eslint-disable-next-line
  const {data: dataset, loading, error, orgDataset, setData} = useGetOverviewOfCategories(query);

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">نگاه کلی به کارکنان دولت کشور</legend>
      <div className="flex align-center justify-between space-x-5 rtl:space-x-reverse mb-8">
        <div className="flex items-center justify-end space-x-5 rtl:space-x-reverse">
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
        {error && !loading && (
          <div className="p-40">
            <div className="text-red-500">{error}</div>
            <RetryButton setQuery={setQuery}/>
          </div>
        )}

        {!error && !loading && (
          <Table
           
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
                name: 'سازمان',
                key: 'name',
                render: (v: any, record, index: number, page: number) => (
                  <div className="flex">
                    {((page - 1) * 10 + (index + 1)).toLocaleString('fa')}.{v}
                  </div>
                ),
              },
              {
                name: 'تعداد کارکنان',
                key: 'employeesCount',
                sortable: true,
                render: (v: any) => <span>{(v as number).toLocaleString('fa')}</span>,
              },
              {
                name: 'درصد ابتلا',
                key: 'infectedPercent',
                sortable: true,
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
                name: 'تعداد مبتلایان',
                key: 'infectedCount',
                sortable: true,
                render: (v: any) => <span>{(v as number).toLocaleString('fa')}</span>,
              },
              {
                name: 'تعداد بهبودیافتگان',
                key: 'saveCount',
                sortable: true,
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
        )}
      </div>
    </fieldset>
  );
};

export default OverviewCategories;
