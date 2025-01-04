import React, {useEffect, useRef, useState} from 'react';
import RetryButton from 'src/components/RetryButton';
import Table from 'src/components/TableXHR';
import {cancelTokenSource, msgRequestCanceled, toPersianDigit} from 'src/helpers/utils';
import HiddenMobileNumber from 'src/components/Form/HiddenMobileNumber';
import {EERRORS} from 'src/constants/errors.enum';
import EINSPECTORSTATUS from 'src/constants/incpectorStatus.enum';

import Filter from 'src/components/UserManagment/Filter';
import plusIcon from '../../assets/images/icons/plus.svg';
import ConfirmIcon from '../../assets/images/icons/confirm.svg';
import RejectIcon from '../../assets/images/icons/reject.svg';
import Actions from './TableAction';
import AddOrUpdateInseptor from '../../components/UserManagment/TableAction/EditOrAddComponent';

const statusOption = [
  {
    value: 'CONFIRMED',
    label: 'تایید شده',
  },
  {
    value: 'UNCONFIRMED',
    label: 'تایید نشده',
  },
];

const getInspectorStatus = (data: EINSPECTORSTATUS) => {
  switch (data) {
    case EINSPECTORSTATUS.CONFIRMED:
      return (
        <div className="flex justify-center">
          <img src={ConfirmIcon} alt="confirm" className="pl-2" />
          تایید شده
        </div>
      );
    case EINSPECTORSTATUS.UNCONFIRMED:
      return (
        <div className="flex">
          <img src={RejectIcon} alt="confirm" className="pl-2" />
          تایید نشده
        </div>
      );

    default:
      return '-';
  }
};
const pageSize = 10;
export default function Inspectors() {
  const [provinceOptions, setProvinceOptions] = useState<
    Array<{label: string; value: string; id: any}>
  >([]);
  const [loading, setLoading] = useState(false);
  const [dataSet, setDataSet] = useState<any[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
  const [refresh, shouldRefresh] = useState<boolean>(false);
  const wrapperRef = useRef(null);
  const [query, setQuery] = useState({
    province: null,
    nationalIdOrMobileNumber: null,
    locked: null,
    currentPage: 1,
    retry: false,
    deleted: false,

    pageSize,
  });


  const [showModal, setShowModal] = useState<boolean>(false);

  const openModal: () => void = () => {
    setShowModal(true);
  };

  const cancelToken = cancelTokenSource();

  function cancelRequest() {
    cancelToken.cancel(msgRequestCanceled);
  }





  function handlePageChange(page: number = 1) {
    setQuery({...query, currentPage: page});
  }

  return (
    <>
      <div className="flex align-center justify-spacebetween space-x-5 rtl:space-x-reverse mb-8 mt-4">
        <div className="flex flex-grow align-center justify-start">
          <div className="w-3/4 flex">
            <Filter
              provinceOption={provinceOptions}
              sattusOption={statusOption}
              query={query}
              setQuery={setQuery}
            />
          </div>
          <div className="w-1/4">
            <div
              className="button button--primary px-5 justify-start sm:w-full sm:text-xs sm:px-0 sm:justify-center md:text-sm 2xl:w-4/6 xl:w-full mx-auto"
              onClick={() => openModal()}
            >
              <img src={plusIcon} alt="+" className="ml-2 xl:block sm:hidden" />
              اضافه کردن بازرس جدید
            </div>
          </div>
        </div>
      </div>

      <fieldset className="text-center border rounded-xl p-4 mb-16">
        <legend className="text-black mx-auto px-3">لیست بازرسان کل کشور</legend>

        <div className="flex flex-col align-center justify-center w-full rounded-xl bg-white p-4 shadow">
          {errorMessage && !loading ? (
            <div className="p-40">
              <div className="text-red-500">{errorMessage}</div>
              <RetryButton setQuery={setQuery} />
            </div>
          ) : (
            <div ref={wrapperRef}>
              <Table
                handlePageChange={handlePageChange}
               
                dataSet={[...dataSet]}
                pagination={{pageSize, currentPage: query.currentPage}}
                totalItems={totalItems}
                columns={[
                  {
                    name: 'نام و نام خانوادگی',
                    key: 'name',
                    render: (v: any, record, index: number) => (
                      <div className="flex w-full justify-start">
                        {toPersianDigit(
                          ((query.currentPage - 1) * pageSize + (index + 1)).toString()
                        )}
                        .{record.name}
                      </div>
                    ),
                  },
                  {
                    name: 'استان',
                    key: 'province',
                    render: (v: any, record: any) => <span> {record.province}</span>,
                  },
                  {
                    name: 'شهر',
                    key: 'city',
                    render: (v: any, record: any) => <span> {record.city}</span>,
                  },
                  {
                    name: 'کد ملی ',
                    key: 'nationalId',
                    render: (v: any, record: any) =>
                      record.nationalId ? (
                        <span className="text-gray-500">{toPersianDigit(record.nationalId)}</span>
                      ) : (
                        '-'
                      ),
                  },
                  {
                    name: 'کد پرسنلی',
                    key: 'inspectorId',
                    render: (v: any, record: any) => (
                      <span className="text-gray-500">{record.inspectorId}</span>
                    ),
                  },
                  {
                    name: 'پست سازمانی',
                    key: 'role',
                  },
                  {
                    name: 'سازمان محل خدمت',
                    key: 'organization',
                  },

                  {
                    name: 'شماره موبایل',
                    key: 'mobileNumber',
                    render: (v: any, record: any) => (
                      <span className="text-gray-500">
                        {record.mobileNumber ? (
                          <HiddenMobileNumber value={toPersianDigit(record.mobileNumber) || ''} />
                        ) : (
                          'نامشخص'
                        )}
                      </span>
                    ),
                  },
                  {
                    name: 'وضعیت بازرس',
                    key: 'activityStatus',
                    render: (v: any, record: any) => {
                      return (
                        <span className="flex justify-center">
                          {getInspectorStatus(record.activityStatus)}
                        </span>
                      );
                    },
                  },
                  {
                    name: 'عملیات',
                    key: '',
                    render: (v: any, record: any) => (
                      <div className="flex items-center justify-center">
                        <Actions
                          item={record.totalData}
                          wrapperRef={wrapperRef}
                          shouldRefresh={shouldRefresh}
                          refresh={refresh}
                        />
                      </div>
                    ),
                  },
                ]}
              />
            </div>
          )}
        </div>
      </fieldset>

      <AddOrUpdateInseptor
        shouldRefresh={shouldRefresh}
        isOpen={showModal}
        closeModal={() => setShowModal(false)}
        actionType="add"
        actionTitle="بازرس"
      />
    </>
  );
}
