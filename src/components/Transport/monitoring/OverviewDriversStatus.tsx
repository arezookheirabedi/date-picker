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
  const [currentPage, setCurrentPage] = useState(1);

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
    };
    getOverviewTransportReport(params);
    return () => {
      cancelRequest();
      setDataSet([]);
    };
  }, [cityTitle, currentPage]);
  useEffect(() => {
    setCurrentPage(1);
  }, [cityTitle]);
  function handlePageChange(page: number = 1) {
    setCurrentPage(page);
  }
  return (
    <fieldset className="mb-16 rounded-xl border p-4 text-center" id="drivers-overview">
      <legend className="mx-auto px-3 text-black">
        نگاه کلی به وضعیت رانندگان حمل و نقل عمومی {cityTitle ? `استان ${cityTitle}` : ''}
      </legend>

      <div className="mb-8 flex items-center justify-between">
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

      {loading && dataSet.length === 0 ? (
        <div className="p-20">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="flex w-full flex-col items-center justify-center rounded-xl bg-white p-4 shadow">
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
                    <span className="flex w-full justify-start">
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
                          className={`bg-gradient-to-l ${colors} h-4 w-4 rounded-full shadow-2xl`}
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
