import React, {useEffect, useState} from 'react';
import transportService from 'src/services/transport.service';
import dayjs from 'dayjs';
import RetryButton from 'src/components/RetryButton';
import {EERRORS} from 'src/constants/errors.enum';
import Table from '../../TableXHR';
import {
  toPersianDigit,
  getServiceTypeName,
  cancelTokenSource,
  msgRequestCanceled,
} from '../../../helpers/utils';
import ExportButton from './ExportButton';
import {getHealthStatusTextAndColor, getStatusColor, getVaccinesStatusText} from './constant';

interface OverviewDriverStatusProps {
  cityTitle?: string;
}
const pageSize = 10;

const OverviewDriverStatus: React.FC<OverviewDriverStatusProps> = ({cityTitle}) => {
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
  const [dataSet, setDataSet] = useState<any[]>([]);
  const [query, setQuery] = useState({
    currentPage: 1,
    pageSize,
    sort: 'ASC',
    reportType: 'GENERAL',
    province: cityTitle,
    // healthStatusSet: [].join(','),
    retry: false,
  });
  const cancelToken = cancelTokenSource();

  function cancelRequest() {
    cancelToken.cancel(msgRequestCanceled);
  }

  const getOverviewTransportReport = async ({retry, currentPage, ...params}: any = {}) => {
    const newData = {...params, pageNumber: Number(query.currentPage) - 1};
    setErrorMessage(null);
    setLoading(true);
    try {
      const {data}: any = await transportService.overviewReport(newData, {
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
      setLoading(false);
    } catch (err: any) {
      if (err.message === 'cancel') {
        setLoading(true);
        return;
      }
      setErrorMessage(err.message || EERRORS.ERROR_500);
      setLoading(false);
    }
  };

  useEffect(() => {
    getOverviewTransportReport({...query, province: cityTitle});
    return () => {
      cancelRequest();
      setDataSet([]);
    };
  }, [query]);

  useEffect(() => {
    setQuery({...query, currentPage: 1, province: cityTitle});
  }, [cityTitle]);

  function handlePageChange(page: number = 1) {
    setQuery({...query, currentPage: page});
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

      <div className="flex w-full flex-col items-center justify-center rounded-xl bg-white p-4 shadow">
        {errorMessage && !loading ? (
          <div className="p-40">
            <div className="text-red-500">{errorMessage}</div>
            <RetryButton setQuery={setQuery} />
          </div>
        ) : (
          <Table
            loading={loading}
            handlePageChange={handlePageChange}
            dataSet={[...dataSet]}
            pagination={{pageSize, currentPage: query.currentPage}}
            totalItems={totalItems}
            columns={[
              {
                name: 'رسته',
                key: 'serviceType',
                render: (v: any, record, index: number) => (
                  <span className="flex w-full justify-start">
                    {`${toPersianDigit(
                      ((query.currentPage - 1) * pageSize + (index + 1)).toString()
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
        )}
      </div>
    </fieldset>
  );
};

export default OverviewDriverStatus;
