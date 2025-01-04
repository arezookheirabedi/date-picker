import React, {useEffect, useState} from 'react';
import RetryButton from 'src/components/RetryButton';
import useGetGuildMonitoring from 'src/hooks/apis/useGetGuildMonitoring';
import Table from '../../TableXHR';
import ExportButton from './ExportButton';
import {toPersianDigit} from '../../../helpers/utils';
import HiddenMobileNumber from '../../Form/HiddenMobileNumber';

interface OverviewPositiveProps {
  cityTitle?: string;
}
const pageSize = 10;
const OverviewPositive: React.FC<OverviewPositiveProps> = ({cityTitle}) => {
  const [query, setQuery] = useState({
    currentPage: 1,
    retry: false,
    pageSize,
    sort: 'ASC',
    reportType: 'POSITIVE_CHAIN',
    province: cityTitle,
  });
  const {dataSet, loading, error: errorMessage, totalItems} = useGetGuildMonitoring(query);

  useEffect(() => {
    setQuery({...query, currentPage: 1, province: cityTitle});
  }, [cityTitle]);

  function handlePageChange(page: number = 1) {
    setQuery({...query, currentPage: page});
  }

  return (
    <fieldset className="mb-16 rounded-xl border p-4 text-center" id="guild-overview">
      <legend className="mx-auto px-3 text-black">
        واحد‌های صنفی با زنجیره مثبت کوید {cityTitle ? `استان ${cityTitle}` : ''}
      </legend>

      <div className="mb-8 flex items-center justify-between">
        <div className="inline-flex">
          <ExportButton
            params={{
              reportType: 'POSITIVE_CHAIN',
              province: cityTitle,
              reportName: ` واحد‌های صنفی ${
                cityTitle ? `استان ${cityTitle}` : ''
              } با زنجیره مثبت کوید `,
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
           
            totalItems={totalItems}
            handlePageChange={handlePageChange}
            dataSet={[...dataSet]}
            pagination={{pageSize, currentPage: query.currentPage}}
            columns={[
              {
                name: 'ردیف',
                key: '',
                render: (v: any, record, index: number) => (
                  <div className="flex w-full justify-center">
                    {toPersianDigit(
                      ((query.currentPage - 1) * pageSize + (index + 1)).toString() || ''
                    )}
                    .
                  </div>
                ),
              },

              {
                name: 'شماره پروانه',
                key: 'guildCode',
                render: (v: any, record: any) => (
                  <span className="text-gray-500">{toPersianDigit(record.guildCode) || ''}</span>
                ),
              },
              {
                name: 'کد ISIC',
                key: 'categoryCode',
                render: (v: any, record: any) => (
                  <span className="text-gray-500">{toPersianDigit(record.categoryCode) || ''}</span>
                ),
              },
              {
                name: 'کد ملی مالک',
                key: 'ownerNationalId',
                render: (v: any, record: any) => (
                  <span className="text-gray-500">
                    {toPersianDigit(record.ownerNationalId) || ''}
                  </span>
                ),
              },
              {
                name: 'رسته',
                key: 'categoryName',
              },
              {
                name: 'آدرس',
                key: 'address',
              },
              {
                name: 'شماره موبایل',
                key: 'ownerMobileNumber',
                render: (v: any, record: any) => (
                  <span className="text-gray-500">
                    {record.ownerMobileNumber ? (
                      <HiddenMobileNumber value={toPersianDigit(record.ownerMobileNumber) || ''} />
                    ) : (
                      'نامشخص'
                    )}
                  </span>
                ),
              },
            ]}
          />
        )}
      </div>
    </fieldset>
  );
};

export default OverviewPositive;
