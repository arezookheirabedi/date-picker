import React, {useEffect, useState} from 'react';

import guildService from 'src/services/guild.service';
import Table from '../../TableXHR';
import ExportButton from './ExportButton';
import {cancelTokenSource, msgRequestCanceled, toPersianDigit} from '../../../helpers/utils';
import Spinner from '../../Spinner';
import HiddenMobileNumber from './HiddenMobileNumber';

interface OverviewUnVaccinatedProps {
  cityTitle?: string;
}

const OverviewUnVaccinated: React.FC<OverviewUnVaccinatedProps> = ({cityTitle}) => {
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [totalItems, setTotalItems] = useState(0);
  // eslint-disable-next-line
  const [errorMessage, setErrorMessage] = useState(null);
  const [dataSet, setDataSet] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 10;

  const cancelToken = cancelTokenSource();

  function cancelRequest() {
    cancelToken.cancel(msgRequestCanceled);
  }
  const getOverviewUnVaccinated = async (params: any) => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const {data} = await guildService.guildOverview(params, {
        cancelToken: cancelToken.token,
      });
      const normalizedData: any[] = [];
      data.content.forEach((item: any, index: number) => {
        normalizedData.push({
          id: `ovca_${index}`,
          categoryCode: item.categoryCode || 'نامشخص',
          guildCode: item.guildCode || 'نامشخص',
          ownerMobileNumber: item.ownerMobileNumber,
          ownerNationalId: item.ownerNationalId || 'نامشخص',
          categoryName: item.categoryName || 'نامشخص',
          address: item.address || 'نامشخص',
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
    setCurrentPage(1);
  }, [cityTitle]);

  useEffect(() => {
    const params: any = {
      pageNumber: Number(currentPage) - 1,
      pageSize,
      sort: 'ASC',
      reportType: 'NON_VACCINES',
      province: cityTitle,
      guildType: null,
    };
    getOverviewUnVaccinated(params);
    return () => {
      cancelRequest();
      setDataSet([]);
    };
  }, [cityTitle, currentPage]);

  function handlePageChange(page: number = 1) {
    setCurrentPage(page);
  }

  return (
    <fieldset className="mb-16 rounded-xl border p-4 text-center" id="guild-overview">
      <legend className="mx-auto px-3 text-black">
        واحد‌های صنفی بدون واکسیناسیون {cityTitle ? `استان ${cityTitle}` : ''}
      </legend>

      <div className="mb-8 flex items-center justify-between">
        <div className="inline-flex">
          <ExportButton
            params={{
              // from: selectedDayRange.from
              //   ? moment(
              //       `${selectedDayRange.from.year}/${selectedDayRange.from.month}/${selectedDayRange.from.day}`,
              //       'jYYYY/jM/jD'
              //     ).format('YYYY-MM-DD')
              //   : null,
              // to: selectedDayRange.to
              //   ? moment(
              //       `${selectedDayRange.to.year}/${selectedDayRange.to.month}/${selectedDayRange.to.day}`,
              //       'jYYYY/jM/jD'
              //     ).format('YYYY-MM-DD')
              //   : null,
              reportType: 'NON_VACCINES',
              province: cityTitle,
              reportName: `واحد‌های صنفی بدون واکسیناسیون ${cityTitle ? `استان ${cityTitle}` : ''}`,
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
                  name: 'ردیف',
                  key: '',
                  render: (v: any, record, index: number) => (
                    <div className="flex w-full justify-center">
                      {toPersianDigit(((currentPage - 1) * pageSize + (index + 1)).toString())}.
                    </div>
                  ),
                },

                {
                  name: 'شماره پروانه',
                  key: 'guildCode',
                  render: (v: any, record: any) => (
                    <span className="text-gray-500">{toPersianDigit(record.guildCode)}</span>
                  ),
                },
                {
                  name: 'کد ISIC',
                  key: 'categoryCode',
                  render: (v: any, record: any) => (
                    <span className="text-gray-500">{toPersianDigit(record.categoryCode)}</span>
                  ),
                },
                {
                  name: 'کد ملی مالک',
                  key: 'ownerNationalId',
                  render: (v: any, record: any) => (
                    <span className="text-gray-500">{toPersianDigit(record.ownerNationalId)}</span>
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
                        <HiddenMobileNumber value={toPersianDigit(record.ownerMobileNumber)} />
                      ) : (
                        'نامشخص'
                      )}
                    </span>
                  ),
                },
              ]}
            />
          </div>
        </>
      )}
      <div className="flec my-4 items-center justify-center border-t-4 py-4">
        <div className=" unVaccinated-count-wrapper  inline-flex rounded-lg border  p-4">
          <span className="text">جمع کل واحد های صنفی بدون واکسیناسیون:</span>
          <span className="count px-1">{toPersianDigit(totalItems.toString())}</span>
          <span className="count">واحد صنفی</span>
        </div>
      </div>
    </fieldset>
  );
};

export default OverviewUnVaccinated;
