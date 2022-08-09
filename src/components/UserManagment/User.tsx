/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useRef, useState} from 'react';
import {EERRORS} from 'src/constants/errors.enum';
import {cancelTokenSource, msgRequestCanceled, toPersianDigit} from 'src/helpers/utils';
import authenticationService from 'src/services/authentication.service';
import guildService from 'src/services/guild.service';
import HiddenMobileNumber from '../Form/HiddenMobileNumber';
import SwitchToggleButton from '../Form/SwitchToggleButton';
import RetryButton from '../RetryButton';
import SearchableMultiSelect from '../SearchableMultiSelect.tsx';
import Table from '../TableXHR';
import CreateButton from './CreateButton';
import Actions from './TableAction';
import ConfirmIcon from '../../assets/images/icons/confirm.svg';
import RejectIcon from '../../assets/images/icons/reject.svg';
import PendingIcon from '../../assets/images/icons/pending.svg';
import SimpleSelect from '../Select2/SimpleSelect';

const pageSize = 10;
const provinceOptions = [
  {
    value: 'آذربایجان شرقی',
    title: 'آذربایجان شرقی',
  },
  {
    value: 'آذربایجان غربی',
    title: 'آذربایجان غربی',
  },
  {
    value: 'اردبیل',
    title: 'اردبیل',
  },
  {
    value: 'اصفهان',
    title: 'اصفهان',
  },
  {
    value: 'البرز',
    title: 'البرز',
  },
  {
    value: 'ایلام',
    title: 'ایلام',
  },
  {
    value: 'بوشهر',
    title: 'بوشهر',
  },
  {
    value: 'تهران',
    title: 'تهران',
  },
  {
    value: 'خراسان جنوبی',
    title: 'خراسان جنوبی',
  },
  {
    value: 'خراسان رضوی',
    title: 'خراسان رضوی',
  },
  {
    value: 'خراسان شمالی',
    title: 'خراسان شمالی',
  },
  {
    value: 'خوزستان',
    title: 'خوزستان',
  },
  {
    value: 'زنجان',
    title: 'زنجان',
  },
  {
    value: 'سمنان',
    title: 'سمنان',
  },
  {
    value: 'سیستان و بلوچستان',
    title: 'سیستان و بلوچستان',
  },
  {
    value: 'فارس',
    title: 'فارس',
  },
  {
    value: 'قزوین',
    title: 'قزوین',
  },
  {
    value: 'قم',
    title: 'قم',
  },
  {
    value: 'کردستان',
    title: 'کردستان',
  },
  {
    value: 'کرمان',
    title: 'کرمان',
  },
  {
    value: 'کرمانشاه',
    title: 'کرمانشاه',
  },
  {
    value: 'کهگیلویه وبویراحمد',
    title: 'کهگیلویه وبویراحمد',
  },
  {
    value: 'گلستان',
    title: 'گلستان',
  },
  {
    value: 'گیلان',
    title: 'گیلان',
  },
  {
    value: 'لرستان',
    title: 'لرستان',
  },
  {
    value: 'مازندران',
    title: 'مازندران',
  },
  {
    value: 'مرکزی',
    title: 'مرکزی',
  },
  {
    value: 'هرمزگان',
    title: 'هرمزگان',
  },
  {
    value: 'همدان',
    title: 'همدان',
  },
  {
    value: 'یزد',
    title: 'یزد',
  },
  {
    value: 'چهارمحال و بختیاری',
    title: 'چهارمحال و بختیاری',
  },
];

export default function index() {
  const [loading, setLoading] = useState(false);
  const [dataSet, setDataSet] = useState<any[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
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
      value: 'تایید شده',
      title: 'تایید شده',
      icon: <img src={ConfirmIcon} alt="confirm" />,
    },
    {
      value: 'رد شده',
      title: 'رد شده',
      icon: <img src={RejectIcon} alt="confirm" />,
    },
    {
      value: 'در انتظار تایید',
      title: 'در انتظار تایید',
      icon: <img src={PendingIcon} alt="confirm" />,
    },
  ];
  return (
    <>
      {/* <SearchableMultiSelect endPoint={authenticationService.rolePermision} /> */}

      <fieldset className="text-center border rounded-xl p-4 mb-16">
        <legend className="text-black mx-auto px-3">لیست کاربران</legend>
        <div className="mb-10 mt-6 flex items-center justify-between">
          <div className="align-center flex flex-grow justify-start px-8">
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

              <SimpleSelect options={provinceOptions} defaultOption="تهران" />
              <SimpleSelect options={statusOption} />
            </div>
          </div>
          <div className="w-1/5">
            <CreateButton actionType="add" />
          </div>
        </div>
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
                    name: 'وضعیت فعالیت',
                    key: 'activateStatus',
                    render: (v: any, record: any) => (
                      // <div className="flex items-center justify-end">
                      <SwitchToggleButton status={(record && record.activateStatus) || false} />
                      // </div>
                    ),
                  },
                  {
                    name: 'تغییرات',
                    key: '',
                    render: (v: any, record: any) => (
                      <div className="flex items-center justify-end">
                        <Actions item={record} wrapperRef={wrapperRef} />
                      </div>
                    ),
                  },
                ]}
              />
            </div>
          )}
        </div>
      </fieldset>
    </>
  );
}
