import React, {useEffect, useState} from 'react';
import axios from 'axios';
import guildService from 'src/services/guild.service';
import Table from '../../TableXHR';
import ExportButton from './ExportButton';
import {cancelTokenSource, msgRequestCanceled,toPersianDigit} from '../../../helpers/utils';
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
  const [currentPage, setCurrenntPage] = useState(1);

  const {CancelToken} = axios;
  // eslint-disable-next-line
  const source = CancelToken.source();

  const pageSize = 1;

 

  const cancelToken = cancelTokenSource();

  function cancelRequest() {
    cancelToken.cancel(msgRequestCanceled);
  }
  const getOverviewUnVaccinated = async (params: any) => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const {data} = await guildService.guildOverviewNotScan(params, {
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
    const params: any = {
      pageNumber: Number(currentPage) - 1,
      pageSize,
      sort: 'ASC',
      reportType: 'NON_VISITED',
      province: cityTitle,
    };
    getOverviewUnVaccinated(params);
    return () => {
      cancelRequest();
      setDataSet([]);
    };
  }, [cityTitle, currentPage]);

  function handlePageChange(page: number = 1) {
    setCurrenntPage(page);
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
              healthStatusSet: ['POSITIVE'],
              reportName: `واحد‌های صنفی که QR کد آن‌ها اسکن نشده ${
                cityTitle ? `استان ${cityTitle}` : ''
              }`,
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
              columns={[
                {
                  name: "ردیف",
                  key: "",
                  render: (v: any, record, index: number) => (
                    <div className="flex w-full justify-center">
                      {toPersianDigit(((currentPage - 1) * pageSize + (index + 1)).toString())}.
                    </div>
                  ),
                },
    

                {
                  name: 'شماره پروانه',
                  key: 'guildCode',
                  render: (v: any,record:any) => (
                    <span className="text-gray-500">{toPersianDigit(record.guildCode)}</span>
                  ),
                },
                {
                  name: 'کد ISIC',
                  key: 'categoryCode',
                  render: (v: any,record:any) => (
                    <span className="text-gray-500">{toPersianDigit(record.categoryCode)}</span>
                  ),
                },
                {
                  name: 'کد ملی مالک',
                  key: 'ownerNationalId',
                  render: (v: any,record:any) => (
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
                  render: (v: any,record:any) => (
                    <span className="text-gray-500">
                
                     {record.ownerMobileNumber? <HiddenMobileNumber value={toPersianDigit(record.ownerMobileNumber)}/>:"نامشخص"}
                      
                      </span>
                  ),
                },
              ]}
              totalItems={totalItems}
            />
          </div>
        </>
      )}
    </fieldset>
  );
};

export default OverviewUnVaccinated;
