import React, {useEffect, useState} from 'react';
import axios from 'axios';
import guildService from 'src/services/guild.service';
import Table from '../../TableXHR';
import ExportButton from './ExportButton';
import {cancelTokenSource, msgRequestCanceled, toPersianDigit} from '../../../helpers/utils';
import Spinner from '../../Spinner';
import HiddenMobileNumber from './HiddenMobileNumber';

interface OverviewNotScanedProps {
  cityTitle?: string;
}

const OverviewNotScaned: React.FC<OverviewNotScanedProps> = ({cityTitle}) => {
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [totalItems, setTotalItems] = useState(0);
  // eslint-disable-next-line
  const [errorMessage, setErrorMessage] = useState(null);
  const [dataSet, setDataSet] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  // const [selectedDayRange, setSelectedDayRange] = useState({
  //   from: null,
  //   to: null,
  // }) as any;

  const {CancelToken} = axios;
  // eslint-disable-next-line
  const source = CancelToken.source();

  const pageSize = 10;

  // useEffect(() => {
  //   setLoading(true);
  //   getOverviewReport({
  //     healthStatusSet: 'POSITIVE',
  //     pageNumber: Number(currentPage) - 1,
  //     pageSize: 20,
  //     sort: 'ASC',
  //   });
  // }, []);

  // useEffect(() => {
  //   if (!loading) {
  //     let query: any = {
  //       healthStatusSet: 'POSITIVE',
  //       pageNumber: Number(currentPage) - 1,
  //       pageSize,
  //       sort: 'ASC',
  //       reportType:"NON_VISITED"
  //     };
  //     query = {
  //           ...query,
  //           // from: null,
  //           // to: null,
  //         };

  //     // if (selectedDayRange.from && selectedDayRange.to) {
  //     //   const finalFromDate = `${selectedDayRange.from.year}/${selectedDayRange.from.month}/${selectedDayRange.from.day}`;
  //     //   const finalToDate = `${selectedDayRange.to.year}/${selectedDayRange.to.month}/${selectedDayRange.to.day}`;

  //     //   query = {
  //     //     ...query,
  //     //     from: moment(finalFromDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
  //     //     to: moment(finalToDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
  //     //   };
  //     // } else {
  //     //   query = {
  //     //     ...query,
  //     //     from: null,
  //     //     to: null,
  //     //   };
  //     // }

  //     setLoading(true);
  //     getOverviewReport(query);
  //   }

  //   //   return () => {
  //   //     source.cancel('Operation canceled by the user.');
  //   //     setDataSet([]);
  //   //     setTotalItems(0);
  //   //     setLoading(false);
  //   //   };
  // }, [ currentPage]);
  

  const cancelToken = cancelTokenSource();

  function cancelRequest() {
    cancelToken.cancel(msgRequestCanceled);
  }
  const getOverviewReport = async (params: any) => {
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
      reportType: 'NON_VISITED',
      province: cityTitle,
      guildType: null,
    };
    getOverviewReport(params);
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
        واحد‌های صنفی که QR کد آن‌ها اسکن نشده {cityTitle ? `استان ${cityTitle}` : ''}
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

              reportType: 'NON_VISITED',
              cityTitle,
              reportName: `واحد‌های صنفی  ${
                cityTitle ? `استان ${cityTitle}` : ''
              } که QR کد آن‌ها اسکن نشده `,
            }}
          />
        </div>

        {/* <div className="flex items-center space-x-6 rtl:space-x-reverse">
          <Menu
            as="div"
            className="relative z-20 inline-block text-left shadow-custom rounded-lg px-5 py-1 "
          >
            <div>
              <Menu.Button className="inline-flex justify-between items-center w-full py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                <div className="flex items-center">
                  <FolderIcon className="h-5 w-5 ml-2 text-gray-500" />
                  <span className="ml-10 whitespace-nowrap truncate">{exportType || 'PDF'}</span>
                </div>
                <DownIcon className="h-2 w-2.5 mr-2 text-gray-500" />
              </Menu.Button>
            </div>

            <Menu.Items className="z-40 absolute left-0 xl:right-0 max-w-xs mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1 ">
                {['PDF', 'CSV'].map((value: any, index: any) => {
                  return (
                    <React.Fragment key={index}>
                      <Menu.Item>
                        {({active}) => (
                          <button
                            type="button"
                            className={`${
                              active ? 'bg-gray-100' : ''
                            } text-gray-900 group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                            onClick={() => setExportType(value)}
                          >
                            {value}
                          </button>
                        )}
                      </Menu.Item>
                    </React.Fragment>
                  );
                })}
              </div>
            </Menu.Items>
          </Menu>
          <div className="flex items-center justify-start">
            {showDatePicker ? (
              <DatePickerModal
                setSelectedDayRange={setSelectedDayRange}
                selectedDayRange={selectedDayRange}
                setShowDatePicker={setShowDatePicker}
                showDatePicker
              />
            ) : null}
            <div className="relative z-20 inline-block text-left shadow-custom rounded-lg px-4 py-1">
              <div
                className="inline-flex justify-center items-center w-full py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 cursor-pointer"
                onClick={focusFromDate}
              >
                <span className="ml-4 whitespace-nowrap truncate text-xs">
                  {toPersianDigit(generateFromDate())}
                </span>
                {selectedDayRange.to || selectedDayRange.from ? (
                  <button type="button" onClick={clearSelectedDayRange}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                ) : (
                  <img src={calendar} alt="x" className="w-5 h-5" />
                )}
              </div>
            </div>
            <div className="flex items-center justify-start mx-4">
              <span className="dash-separator" />
            </div>
            <div className=" shadow-custom rounded-lg px-4 py-1">
              <div
                className="flex justify-center items-center w-full py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 cursor-pointer"
                onClick={focusFromDate}
              >
                <span className="ml-4 whitespace-nowrap truncate text-xs">
                  {toPersianDigit(generateToDate())}
                </span>
                {selectedDayRange.to || selectedDayRange.from ? (
                  <button type="button" onClick={clearSelectedDayRange}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                ) : (
                  <img src={calendar} alt="x" className="w-5 h-5" />
                )}
              </div>
            </div>
          </div>
        </div> */}
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
              totalItems={totalItems}
            />
          </div>
        </>
      )}
    </fieldset>
  );
};

export default OverviewNotScaned;
