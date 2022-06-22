import React, {useEffect, useState} from 'react';
import axios from 'axios';

// import transportService from 'src/services/transport.service';

import Table from '../../Table';
import CategoryDonut from '../../../containers/Guild/components/CategoryDonut';
// import {getServiceTypeName} from '../../../helpers/utils';
import Spinner from '../../Spinner';
// import {ReactComponent as DownIcon} from '../../../assets/images/icons/down.svg';

import hcsService from '../../../services/hcs.service';
import DatepickerQuery from "../../DatepickerQuery";

const OverviewCategories: React.FC<{}> = () => {

  const [loading, setLoading] = useState(false);
  const [dataset, setDataset] = useState<any>([]);

  const [query, setQuery] = useState({
    from: null,
    to: null,
  }) as any;

  const {CancelToken} = axios;
  const source = CancelToken.source();

  const overviewTestResults = async (params: any) => {
    try {
      setLoading(true);
      const {data} = await hcsService.tableOverviewTestResults('transport', 'serviceType', {
        ...params,
        lang: 'fa',
      }, {cancelToken: source.token});

      const normalizedData: any[] = [];
      data.forEach((item: any, index: number) => {
        // if (item.total !== 0) {
        normalizedData.push({
          id: `ovca_${index}`,
          name: item.categoryValue,
          employeesCount: item.membersCount || 0,
          infectedCount: item.positiveMembersCount || 0,
          infectedPercent: item.positiveMembersCountToMembersCountPercentage || 0,
          saveCount: item.recoveredMembersCount || 0,
          // deadCount: 120,
        });

      });
      setDataset([...normalizedData]);
      // setOrgDataset([...normalizedData]);
      // setFilterType({name: 'بیشترین', enName: 'HIGHEST'});
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  // async function getOverviewByCategory(params: any) {
  //   setLoading(true);
  //   try {
  //     const {data} = await transportService.overviewCategory(params, {cancelToken: source.token});
  //     const normalizedData: any[] = [];
  //     data.forEach((item: any, index: number) => {
  //       // if (item.total !== 0) {
  //       normalizedData.push({
  //         id: `ovca_${index}`,
  //         name: getServiceTypeName(item.serviceType),
  //         employeesCount: item.total || 0,
  //         infectedCount: item.count || 0,
  //         infectedPercent: ((item.count || 0) * 100) / (item.total || 0),
  //         saveCount: item.recoveredCount || 0,
  //         // deadCount: 120,
  //       });
  //       // }
  //     });
  //     setDataset([...normalizedData]);
  //     setOrgDataset([...normalizedData]);
  //     setFilterType({name: 'بیشترین', enName: 'HIGHEST'});
  //   } catch (error) {
  //     // eslint-disable-next-line
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  useEffect(() => {
    // getOverviewByCategory(query);
    overviewTestResults(query);
    return () => {
      source.cancel('Operation canceled by the user.');
      setDataset([]);
    };
  }, [query]);


  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">نگاه کلی رسته های حمل و نقل</legend>
      <div className="flex flex-grow items-center justify-start space-x-5 rtl:space-x-reverse mb-8">
        <div className="flex align-center justify-start">
          <DatepickerQuery query={query} setQuery={setQuery}/>
        </div>
      </div>
      <div className="flex flex-col align-center justify-center w-full rounded-xl bg-white p-4 shadow">
        {loading ? (
          <div className="p-20">
            <Spinner/>
          </div>
        ) : (
          <Table
            dataSet={[...dataset]}
            pagination={{pageSize: 20, maxPages: 3}}
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
                name: 'رسته های حمل و نقل',
                key: 'name',
                render: (v: any, record, index: number) => (
                  <span>
                    {(index + 1).toLocaleString('fa')}.{v}
                  </span>
                ),
              },
              {
                name: 'تعداد رانندگان',
                key: 'employeesCount',
                render: (v: any) => <span>{(v as number).toLocaleString('fa')}</span>,
              },
              {
                name: 'درصد ابتلا کل رانندگان',
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
                name: 'تعداد مبتلایان',
                key: 'infectedCount',
                render: (v: any) => <span>{(v as number).toLocaleString('fa')}</span>,
              },
              {
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
        )}
      </div>
    </fieldset>
  );
};

export default OverviewCategories;
