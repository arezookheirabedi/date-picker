/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useRef, useState} from 'react';
import RetryButton from 'src/components/RetryButton';
import Table from 'src/components/TableXHR';
import {cancelTokenSource, msgRequestCanceled, toPersianDigit} from 'src/helpers/utils';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import HiddenMobileNumber from 'src/components/Form/HiddenMobileNumber';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import SwitchToggleButton from 'src/components/Form/SwitchToggleButton';
import {EERRORS} from 'src/constants/errors.enum';
import EINSPECTORSTATUS from 'src/constants/incpectorStatus.enum';
import inspectorServices from 'src/services/inspector.service';
import SimpleSelect from 'src/components/Select2/SimpleSelect';
import LocalSearchNationalId from 'src/components/UserManagment/LocalSearchNationalId';
import fsServices from 'src/services/fs.service';
import plusIcon from '../../assets/images/icons/plus.svg';
import ConfirmIcon from '../../assets/images/icons/confirm.svg';
import RejectIcon from '../../assets/images/icons/reject.svg';
// import PendingIcon from '../../assets/images/icons/pending.svg';
import Actions from './TableAction';
import AddOrUpdateInseptor from '../../components/UserManagment/TableAction/EditOrAddComponent';

const statusOption = [
  {
    value: null,
    title: 'همه',
    icon: <></>,
  },
  {
    value: 'تایید شده',
    title: 'تایید شده',
    icon: <img src={ConfirmIcon} alt="confirm" />,
  },
  {
    value: 'تایید نشده',
    title: 'تایید نشده',
    icon: <img src={RejectIcon} alt="confirm" />,
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
const pageSize = 2;
export default function Inspectors() {
  const [provinceOptions, setProvinceOptions] = useState([
    {
      title: 'انتخاب استان',
      value: 'انتخاب استان',
    },
  ]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);
  const [dataSet, setDataSet] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [totalItems, setTotalItems] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [refresh, shouldRefresh] = useState<boolean>(false);
  const wrapperRef = useRef(null);
  const [query, setQuery] = useState({
    provinceTilte: null,
    nationalIdOrMobileNumber: null,
    activationStatusPersian: null,
    currentPage: 1,
    retry: false,
    deleted: false,
    // sort: 'DESC',
    // sortKey: ['reportStatus'].join(','),
    pageSize,
  });

  const getProvince = async () => {
    const normalizedData: any[] = [];
    const {data} = (await fsServices.getProvince()) as any;
    data.forEach((item: any) => {
      normalizedData.push({
        title: item.province,
        value: item.provinceCode,
      });
    });
    setProvinceOptions((prev: any) => {
      return [...prev, ...normalizedData];
    });
  };

  useEffect(() => {
    getProvince();
  }, []);

  const [showModal, setShowModal] = useState<boolean>(false);

  const openModal: () => void = () => {
    setShowModal(true);
  };

  const cancelToken = cancelTokenSource();

  function cancelRequest() {
    cancelToken.cancel(msgRequestCanceled);
  }

  const getActivityStatus = (data: string) => {
    switch (data) {
      case 'تایید شده':
        return 'CONFIRMED';
      case 'تایید نشده':
        return 'UNCONFIRMED';
      default:
        return null;
    }
  };

  async function fetchReports({
    retry,
    currentPage,
    activationStatusPersian,
    provinceTilte,
    ...params
  }: any) {
    const newData = {
      ...params,
      pageNumber: Number(query.currentPage) - 1,
      activityStatus: getActivityStatus(query.activationStatusPersian || ''),
      province:
        query.provinceTilte && query.provinceTilte === 'انتخاب استان' ? null : query.provinceTilte,
    };
    setLoading(true);
    setErrorMessage(null);
    try {
      const {data} = await inspectorServices.getInspector(newData, {
        cancelToken: cancelToken.token,
      });
      const normalizedData: any[] = [];
      data.content.forEach((item: any) => {
        normalizedData.push({
          id: item.id,
          inspectorId: item.inspectorId,
          name: (item.firstName || '-') + (item.lastName || '-'),
          province: item.province || '-',
          role: item.roles ? item.roles[0] : '-',
          nationalId: item.nationalId,
          mobileNumber: item.mobileNumber,
          activityStatus: item.activityStatus,
          city: item.city || '-',
          username: item.username,
          organization: item.organization,
          inspectorStatus: item.inspectorStatus,
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
  return (
    <>
      <div className="flex align-center justify-spacebetween space-x-5 rtl:space-x-reverse mb-8 mt-4">
        <div className="flex flex-grow align-center justify-start">
          <div className="w-3/4 flex">
            <LocalSearchNationalId
              setQueryParams={setQuery}
              queryParams={query}
              objectKey="nationalIdOrMobileNumber"
            />
            <SimpleSelect
              options={provinceOptions}
              setQueryParams={setQuery}
              queryParams={query}
              objectKey="provinceTilte"
            />
            <SimpleSelect
              options={statusOption}
              setQueryParams={setQuery}
              queryParams={query}
              objectKey="activationStatusPersian"
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
                    render: (v: any, record: any) =>
                      record.nationalId ? (
                        <span className="text-gray-500">{toPersianDigit(record.nationalId)}</span>
                      ) : (
                        '-'
                      ),
                  },
                  {
                    name: 'کد پرسنلی',
                    key: 'userName',
                    render: (v: any, record: any) =>
                      record.userName ? (
                        <span className="text-gray-500">{toPersianDigit(record.userName)}</span>
                      ) : (
                        '-'
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

      <AddOrUpdateInseptor
        isOpen={showModal}
        closeModal={() => setShowModal(false)}
        actionType="add"
        actionTitle="بازرس"
      />
    </>
  );
}
