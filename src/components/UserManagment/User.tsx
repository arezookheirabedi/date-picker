import React, {useEffect, useRef, useState} from 'react';
import {EERRORS} from 'src/constants/errors.enum';
import {cancelTokenSource, msgRequestCanceled, toPersianDigit} from 'src/helpers/utils';
// import authenticationService from 'src/services/authentication.service';
import guildService from 'src/services/guild.service';
import HiddenMobileNumber from '../Form/HiddenMobileNumber';
import SwitchToggleButton from '../Form/SwitchToggleButton';
import RetryButton from '../RetryButton';
// import SearchableMultiSelect from '../SearchableMultiSelect.tsx';
import Table from '../TableXHR';
import plusIcon from '../../assets/images/icons/plus.svg';

import Actions from './TableAction';
// import ConfirmIcon from '../../assets/images/icons/confirm.svg';
// import RejectIcon from '../../assets/images/icons/reject.svg';
// import PendingIcon from '../../assets/images/icons/pending.svg';
import SimpleSelect from '../Select2/SimpleSelect';
import fsServices from '../../services/fs.service';

import EditOrAddUser from './TableAction/EditOrAddComponent';

const pageSize = 10;

export default function User() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [provinceOptions, setProvinceOptions] = useState([{
    title: 'انتخاب استان',
    value: null
  }]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [dataSet, setDataSet] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [totalItems, setTotalItems] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [refresh, shouldRefresh] = useState<boolean>(false);
  const wrapperRef = useRef(null);
  const [query, setQuery] = useState({
    from: null,
    to: null,
    currentPage: 1,
    retry: false,
    sort: 'DESC',
    sortKey: ['reportStatus'].join(','),
    pageSize,
  });

  const getProvince = async () => {

    const normalizedData: any[] = [];
    const {data} = await fsServices.getProvince() as any;
    data.forEach((item: any) => {
      normalizedData.push({
        title: item.province,
        value: item.provinceCode
      })
    })
    setProvinceOptions((prev: any) => {
      return [
        ...prev,
        ...normalizedData
      ]
    })
  }

  useEffect(() => {
    getProvince();
  }, [])

  const cancelToken = cancelTokenSource();

  function cancelRequest() {
    cancelToken.cancel(msgRequestCanceled);
  }

  async function fetchReports({retry, from, to, ...params}: any) {
    const newData = {
      ...params,
      pageNumber: Number(query.currentPage) - 1,
      fromReportDate: query.from,
      toReportDate: query.to,
    };
    // setLoading(true);
    const Data = [
      {
        name: 'گین آساده',
        province: 'تهران',
        city: 'تهران',
        nationalId: '۰۰۱۶۶۱۹۶۰۹',
        userName: '۸۰۴۵۰',
        accestance: 'مدیریت بازرسی و نظارت',
        role: 'بسیج',
        mobileNumber: '095746535',
        activateStatus: true,
      },
    ];
    setDataSet([...Data]);
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const {data} = await guildService.guildReportoverviewStatus(newData, {
        cancelToken: cancelToken.token,
      });
      // const normalizedData: any[] = [];
      // Data.forEach((item: any) => {
      //   normalizedData.push({
      //     id: item.id,
      //     reportName: item.reportName,
      //     requestDateTime: item.requestDateTime,
      //     lastModifiedDate: item.lastModifiedDate,
      //     trackingCode: item.trackingCode,
      //     reportStatus: item.reportStatus,
      //   });
      // });

      // setDataSet([...normalizedData]);
      // setTotalItems(data.totalElements);
      // setLoading(false);
    } catch (err: any) {
      if (err.message === 'cancel') {
        // setLoading(true);
        return;
      }
      setErrorMessage(err.message || EERRORS.ERROR_500);
      // setLoading(false);
    }
  }

  useEffect(() => {
    fetchReports({...query});
    return () => {
      setDataSet([]);
      cancelRequest();
    };
  }, [query, refresh]);

  function handlePageChange(page: number = 1) {
    setQuery({...query, currentPage: page});
  }

  const statusOption = [
    {
      value: 'فعال',
      title: 'فعال',
    },
    {
      value: 'غیر فعال',
      title: 'غیر فعال',
    },
    // {
    //   value: 'در انتظار تایید',
    //   title: 'در انتظار تایید',
    // },
  ];
  const openModal: () => void = () => {
    setShowModal(true);
  };
  return (
    <>
      <div className="flex align-center justify-spacebetween space-x-5 rtl:space-x-reverse mb-8 mt-4">
        <div className="flex flex-grow align-center justify-start">
          <div className="w-3/4 flex">
            <div className="relative inline-flex align-center leading-3 h-10 ml-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 absolute top-1/2 transform -translate-y-1/2 right-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="جستجوی کدملی، موبایل"
                className="py-2 px-4 pr-10 text-sm border-none rounded-lg focus:outline-none shadow-custom"
              />
            </div>

            <SimpleSelect options={provinceOptions}/>
            <SimpleSelect options={statusOption}/>
          </div>
          <div className="w-1/4">
            <div
              className="button button--primary px-5 justify-start sm:w-full sm:text-xs sm:px-0 sm:justify-center md:text-sm 2xl:w-4/6 xl:w-full mx-auto"
              onClick={() => openModal()}
            >
              <img src={plusIcon} alt="+" className="ml-2 xl:block sm:hidden"/>
              اضافه کردن کاربر جدید
            </div>
          </div>
        </div>
      </div>
      <fieldset className="text-center border rounded-xl p-4 mb-16">
        <legend className="text-black mx-auto px-3">لیست کاربران</legend>

        <div className="flex flex-col align-center justify-center w-full rounded-xl bg-white p-4 shadow">
          {errorMessage && !loading ? (
            <div className="p-40">
              <div className="text-red-500">{errorMessage}</div>
              <RetryButton setQuery={setQuery}/>
            </div>
          ) : (
            <div ref={wrapperRef}>
              <Table
                handlePageChange={handlePageChange}
                loading={loading}
                dataSet={[...dataSet]}
                pagination={{pageSize, currentPage: query.currentPage}}
                totalItems={totalItems}
                columns={[
                  {
                    name: 'ردیف',
                    key: '',
                    render: (v: any, record, index: number) => (
                      <div className="flex w-full justify-center">
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
                    render: (v: any, record: any) => (
                      <span className="text-gray-500">{toPersianDigit(record.nationalId)}</span>
                    ),
                  },
                  {
                    name: 'نام کاربری',
                    key: 'userName',
                    render: (v: any, record: any) => (
                      <span className="text-gray-500">{toPersianDigit(record.userName)}</span>
                    ),
                  },
                  {
                    name: 'سطوح دسترسی کاربری',
                    key: 'accestance',
                  },
                  {
                    name: 'نقش کاربر',
                    key: 'role',
                  },

                  {
                    name: 'وضعیت فعالیت',
                    key: 'activateStatus',
                    render: (v: any, record: any) => (
                      // <div className="flex items-center justify-end">
                      <SwitchToggleButton status={(record && record.activateStatus) || false}/>
                      // </div>
                    ),
                  },
                  {
                    name: 'شماره موبایل',
                    key: 'mobileNumber',
                    render: (v: any, record: any) => (
                      <span className="text-gray-500">
                        {record.mobileNumber ? (
                          <HiddenMobileNumber value={toPersianDigit(record.mobileNumber) || ''}/>
                        ) : (
                          'نامشخص'
                        )}
                      </span>
                    ),
                  },
                  {
                    name: 'تغییرات',
                    key: '',
                    render: (v: any, record: any) => (
                      <div className="flex items-center justify-end">
                        <Actions item={record} wrapperRef={wrapperRef}/>
                      </div>
                    ),
                  },
                ]}
              />
            </div>
          )}
        </div>
      </fieldset>
      <EditOrAddUser
        isOpen={showModal}
        closeModal={() => setShowModal(false)}
        actionType="add"
        actionTitle="کاربر"
      />
    </>
  );
}
