import React, {useEffect, useRef, useState} from 'react';
import {EERRORS} from 'src/constants/errors.enum';
import {cancelTokenSource, msgRequestCanceled, toPersianDigit} from 'src/helpers/utils';
import authenticationService from 'src/services/authentication.service';
import HiddenMobileNumber from '../Form/HiddenMobileNumber';
import SwitchToggleButton from '../Form/SwitchToggleButton';
import RetryButton from '../RetryButton';
import Table from '../TableXHR';
import plusIcon from '../../assets/images/icons/plus.svg';
import Actions from './TableAction';
import fsServices from '../../services/fs.service';
import EditOrAddUser from './TableAction/EditOrAddComponent';
import Filter from './Filter';

const pageSize = 10;

export default function User() {
  const [provinceOptions, setProvinceOptions] = useState<
    Array<{label: string; value: string; id: any}>
  >([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [dataSet, setDataSet] = useState<any[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [refresh, shouldRefresh] = useState<boolean>(false);
  const [rolesOption, setRuleOptions] = useState<Array<{name: string; title: string}>>([]);
  const wrapperRef = useRef(null);
  const [query, setQuery] = useState({
    province: null,
    nationalIdOrMobileNumber: null,
    locked: null,
    currentPage: 1,
    retry: false,
    pageSize,
  });
  const getProvince = async () => {
    try {
      const normalizedData: any[] = [];
      const {data} = (await fsServices.getProvince()) as any;
      data.forEach((item: any) => {
        normalizedData.push({
          label: item.province,
          value: item.province,
          id: item.provinceCode,
        });
      });
      setProvinceOptions([...normalizedData]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProvince();
  }, []);

  const cancelToken = cancelTokenSource();

  function cancelRequest() {
    cancelToken.cancel(msgRequestCanceled);
  }

  async function fetchReports({retry, currentPage, ...params}: any) {
    const newData = {
      ...params,
      pageNumber: Number(query.currentPage) - 1,
    };
    setErrorMessage(null);
    setLoading(true);
    try {
      const {data} = await authenticationService.users(newData, {
        cancelToken: cancelToken.token,
      });

      const normalizedData: any[] = [];
      data.content.forEach((item: any) => {
        normalizedData.push({
          id: item.id,
          name: `${item.firstName || '-'} ${item.lastName || '-'}`,
          province: item.province || '-',
          accestance: item.roles[0],
          nationalId: item.nationalId || '-',
          mobileNumber: item.mobileSet || '-',
          locked: !item.locked || false,
          city: item.city || '-',
          username: item.username || '-',
          totalData: item,
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

  const getRolesOption = async () => {
    const normalizedData: Array<{name: string; title: string}> = [];
    const {data} = (await authenticationService.rolePermision(
      {pageNumber: 0, pageSize: 1000},
      {cancelToken: cancelToken.token}
    )) as any;
    data.content.forEach((item: any) => {
      normalizedData.push({
        name: item.name,
        title: item.title,
      });
    });
    setRuleOptions([...normalizedData]);
  };

  useEffect(() => {
    getRolesOption();
  }, []);

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
      value: 'false',
      label: 'فعال',
    },
    {
      value: 'true',
      label: 'غیر فعال',
    },
  ];
  const openModal: () => void = () => {
    setShowModal(true);
  };

  const getAccestance = (data: string) => {
    const select = rolesOption.find((role: any) => role.name === data);
    return select ? select.title : '-';
  };
  return (
    <>
      <div className="flex align-center justify-spacebetween space-x-5 rtl:space-x-reverse mb-8 mt-4">
        <div className="flex flex-grow align-center justify-start">
          <div className="w-3/4 flex">
            <Filter
              userType
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
              اضافه کردن کاربر جدید
            </div>
          </div>
        </div>
      </div>
      <fieldset className="text-center border rounded-xl p-4 mb-16">
        <legend className="text-black mx-auto px-3">لیست کاربران پنل وزارت کشور</legend>

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
                    name: 'نام کاربری',
                    key: 'userName',
                    render: (v: any, record: any) => (
                      <span className="text-gray-500">{record.username}</span>
                    ),
                  },
                  {
                    name: 'سطوح دسترسی کاربری',
                    key: 'accestance',
                    render: (v: any, record: any) => getAccestance(record.accestance),
                  },

                  {
                    name: 'وضعیت فعالیت',
                    key: 'locked',
                    render: (v: any, record: any) => (
                      <SwitchToggleButton
                        status={record && record.locked}
                        record={record.totalData}
                      />
                    ),
                  },
                  {
                    name: 'شماره موبایل',
                    key: 'mobileNumber',
                    render: (v: any, record: any) => (
                      <span className="text-gray-500">
                        {record.mobileNumber ? (
                          <HiddenMobileNumber
                            value={toPersianDigit(record.mobileNumber[0]) || ''}
                          />
                        ) : (
                          '-'
                        )}
                      </span>
                    ),
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
      <EditOrAddUser
        isOpen={showModal}
        closeModal={() => setShowModal(false)}
        actionType="add"
        actionTitle="کاربر"
        shouldRefresh={shouldRefresh}
      />
    </>
  );
}
