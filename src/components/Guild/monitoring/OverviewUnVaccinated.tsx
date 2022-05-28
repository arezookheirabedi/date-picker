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
    setCurrentPage(0);
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
    <fieldset className="text-center border rounded-xl p-4 mb-16" id="guild-overview">
      <legend className="text-black mx-auto px-3">
        واحد‌های صنفی بدون واکسیناسیون {cityTitle ? `استان ${cityTitle}` : ''}
      </legend>

      <div className="flex justify-between items-center mb-8">
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
              cityTitle,
              reportName: `واحد‌های صنفی بدون واکسیناسیون ${cityTitle ? `استان ${cityTitle}` : ''}`,
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
      <div className="border-t-4 my-4 py-4 flec justify-center items-center">
        <div className=" inline-flex  p-4 border rounded-lg  unVaccinated-count-wrapper">
          <span className="text">جمع کل واحد های صنفی بدون واکسیناسیون:</span>
          <span className="px-1 count">{toPersianDigit(totalItems.toString())}</span>
          <span className="count">واحد صنفی</span>
        </div>
      </div>
    </fieldset>
  );
};

export default OverviewUnVaccinated;
