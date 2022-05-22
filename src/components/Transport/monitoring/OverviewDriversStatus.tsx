import React, {useEffect, useState} from 'react';
import transportService from 'src/services/transport.service';
import dayjs from 'dayjs';
import Table from '../../TableXHR';
import {
  toPersianDigit,
  getServiceTypeName,
  cancelTokenSource,
  msgRequestCanceled,
} from '../../../helpers/utils';
import Spinner from '../../Spinner';
import ExportButton from './ExportButton';
import {getHealthStatusTextAndColor, getStatusColor, getVaccinesStatusText} from './constant';

interface OverviewDriverStatusProps {
  cityTitle?: string;
}
const pageSize = 10;

const OverviewDriverStatus: React.FC<OverviewDriverStatusProps> = ({cityTitle}) => {
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  // eslint-disable-next-line
  const [errorMessage, setErrorMessage] = useState(null);
  const [dataSet, setDataSet] = useState<any[]>([]);
  const [currentPage, setCurrenntPage] = useState(1);
  // eslint-disable-next-line
  // const [selectedDayRange, setSelectedDayRange] = useState({
  //   from: null,
  //   to: null,
  // }) as any;

  // useEffect(() => {
  //   const qst = new URLSearchParams(search);
  //   setLoading(true);
  //   getOverviewTransportReport({
  //     healthStatusSet: 'POSITIVE',
  //     pageNumber: qst.get('page') || 1,
  //     pageSize: 20,
  //     sort: 'ASC',
  //     from: qst.get('from'),
  //     to: qst.get('to'),
  //   });
  //   // return () => {
  //   //   source.cancel('Operation canceled by the user.');
  //   // }
  // }, []);

  // useEffect(() => {
  //   let latestQuery: any = {};

  //   if (search && search.length > 1) {
  //     latestQuery = JSON.parse(
  //       // eslint-disable-next-line
  //       '{"' +
  //         decodeURI((search || ' ').substring(1))
  //           .replace(/"/g, '\\"')
  //           .replace(/&/g, '","')
  //           .replace(/=/g, '":"') +
  //         '"}'
  //     );
  //   }

  //   if (!loading && selectedDayRange.from && selectedDayRange.to) {
  //     const finalFromDate = `${selectedDayRange.from.year}/${selectedDayRange.from.month}/${selectedDayRange.from.day}`;
  //     const finalToDate = `${selectedDayRange.to.year}/${selectedDayRange.to.month}/${selectedDayRange.to.day}`;
  //     history.push(
  //       `/dashboard/transport/monitoring?${qs.stringify({
  //         ...latestQuery,
  //         page: 1,
  //         from: moment(finalFromDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
  //         to: moment(finalToDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
  //       })}`
  //     );
  //   } else {
  //     history.push(
  //       `/dashboard/transport/monitoring?${qs.stringify({
  //         ...latestQuery,
  //         page: 1,
  //         from: null,
  //         to: null,
  //       })}`
  //     );
  //   }
  // }, [selectedDayRange]);

  // useEffect(() => {
  //   setSelectedDayRange({
  //     from: null,
  //     to: null,
  //   });
  // }, [cityTitle]);

  // const clearSelectedDayRange = (e: any) => {
  //   e.stopPropagation();
  //   setSelectedDayRange({
  //     from: null,
  //     to: null,
  //   });
  // };

  const cancelToken = cancelTokenSource();

  function cancelRequest() {
    cancelToken.cancel(msgRequestCanceled);
  }
  const getOverviewTransportReport = async (params: any) => {
    setErrorMessage(null);
    setLoading(true);
    try {
      const {data}: any = await transportService.overviewReport(params, {
        cancelToken: cancelToken.token,
      });

      const normalizedData: any[] = [];
      data.content.forEach((item: any, index: number) => {
        normalizedData.push({
          id: `ovca_${index}`,
          serviceType: item.serviceType || 'نامشخص',
          plaque: item.plaque || 'نامشخص',
          nationalId: item.nationalId || 'نامشخص',
          province: item.province || 'نامشخص',
          date: item.receiptDate,
          personHealthStatus: item.personHealthStatus,
          numberOfReceivedDoses: item.numberOfReceivedDoses || 'نامشخص',
        });
      });
      setDataSet([...normalizedData]);

      setTotalItems(data.totalElements);
    } catch (error: any) {
      setErrorMessage(error.message);
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const province = cityTitle || null;
    const params: any = {
      pageNumber: Number(currentPage) - 1,
      pageSize,
      sort: 'ASC',
      reportType: 'GENERAL',
      province,
      healthStatusSet: [].join(','),
      // healthStatusSet: 'POSITIVE',
      // healthStatusSet: ['POSITIVE', 'NEGATIVE', 'UNKNOWN'].join(','),
    };
    getOverviewTransportReport(params);
    return () => {
      cancelRequest();
      setDataSet([]);
    };
  }, [cityTitle, currentPage]);
  useEffect(() => {
    setCurrenntPage(0);
  }, [cityTitle]);
  function handlePageChange(page: number = 1) {
    setCurrenntPage(page);
  }
  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16" id="drivers-overview">
      <legend className="text-black mx-auto px-3">
        نگاه کلی به وضعیت رانندگان حمل و نقل عمومی {cityTitle ? `استان ${cityTitle}` : ''}
      </legend>

      <div className="flex justify-between items-center mb-8">
        <div className="inline-flex">
          <ExportButton
            params={{
              // healthStatusSet: [],
              reportName: `نگاه کلی به وضعیت رانندگان حمل و نقل عمومی ${
                cityTitle ? `استان ${cityTitle}` : ''
              }`,
              province: cityTitle,
              reportType: 'GENERAL',
            }}
          />
        </div>
      </div>

      {loading ? (
        <div className="p-20">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center justify-center w-full rounded-xl bg-white p-4 shadow">
            <Table
              handlePageChange={handlePageChange}
              dataSet={[...dataSet]}
              pagination={{pageSize, currentPage}}
              totalItems={totalItems}
              columns={[
                {
                  name: 'رسته',
                  key: 'serviceType',
                  render: (v: any, record, index: number) => (
                    <span className="flex justify-start w-full">
                      {`${toPersianDigit(
                        ((currentPage - 1) * pageSize + (index + 1)).toString()
                      )}. ${getServiceTypeName(v)}`}
                    </span>
                  ),
                },
                {
                  name: 'پلاک',
                  key: 'plaque',
                  render: (v: any, record: any) => (
                    <span className="">{toPersianDigit(record.plaque)}</span>
                  ),
                },
                {
                  name: 'کدملی راننده',
                  key: 'nationalId',
                  render: (v: any, record: any) => (
                    <span className="text-gray-500">{toPersianDigit(record.nationalId)}</span>
                  ),
                },
                {
                  name: 'استان',
                  key: 'province',
                  render: (v: any) => <span>{v || '-'}</span>,
                },
                {
                  name: 'وضعیت',
                  key: 'personHealthStatus',
                  render: (v: string, record: any) => {
                    const {colors} = getStatusColor(record.personHealthStatus);

                    return (
                      <div className="flex justify-center">
                        <div
                          className={`bg-gradient-to-l ${colors} w-4 h-4 rounded-full shadow-2xl`}
                          style={{boxShadow: '-3px 4px 8px -3px rgba(0,0,0,.5)'}}
                        />
                      </div>
                    );
                  },
                },

                {
                  name: 'تاریخ ابتلا',
                  key: 'date',
                  render: (v: any) => (
                    <span className="text-gray-500">
                      {v ? toPersianDigit(dayjs(v).calendar('jalali').format('YYYY/MM/DD')) : '-'}
                    </span>
                  ),
                },

                {
                  name: 'آزمایش',
                  key: 'personHealthStatus',
                  render: (v: any, record: any) => {
                    const {colors, text} = getHealthStatusTextAndColor(record.personHealthStatus);
                    return <span className={`${colors}`}>{text} </span>;
                  },
                },
                {
                  name: 'واکسیناسیون',
                  key: 'numberOfReceivedDoses',

                  render: (v: any, record: any) => {
                    const {text} = getVaccinesStatusText(record.numberOfReceivedDoses);

                    return <span>{text} </span>;
                  },
                },
              ]}
            />
          </div>
        </>
      )}
    </fieldset>
  );
};

export default OverviewDriverStatus;
