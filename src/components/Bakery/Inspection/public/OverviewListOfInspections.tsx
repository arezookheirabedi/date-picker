/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState, useEffect, useCallback} from 'react';
import {toPersianDigit} from 'src/helpers/utils';
import RetryButton from 'src/components/RetryButton';
import Table from '../../../TableXHR';
import ButtonToggle from '../../../Form/ButtonToggle';
import nonActivityIcon from '../../../../assets/images/icons/non-activity.svg';
import activityIcon from '../../../../assets/images/icons/activity.svg';
import listPriceDeactiveIcon from '../../../../assets/images/icons/list-price-deactive.svg';
import listPriceIcon from '../../../../assets/images/icons/list-price.svg';
import businessLicenseDeactiveIcon from '../../../../assets/images/icons/business-license-deactive.svg';
import businessLicenseIcon from '../../../../assets/images/icons/business-license.svg';
import posDeviceDeactiveIcon from '../../../../assets/images/icons/pos-device-deactive.svg';
import posDeviceIcon from '../../../../assets/images/icons/pos-device.svg';
import unapprovedPriceDeactiveIcon from '../../../../assets/images/icons/unapproved-price-deactive.svg';
import unapprovedPriceIcon from '../../../../assets/images/icons/unapproved-price.svg';
import useGetOverviewListOfInspections from '../../../../hooks/apis/inspection/useGetOverviewListOfInspections';

const pageSize = 10;
const OverviewListOfInspections: React.FC<{}> = () => {
  const [query, setQuery] = useState<any>({
    retry: false,
    currentPage: 1,
    pageSize,
    inactivity: false,
    noListPrice: false,
    noBusinessLicense: false,
    // registeredPosDevice: false,
    unapprovedPrice: false,
  });
  const {
    dataSet,
    loading,
    error: errorMessage,
    totalItems,
  } = useGetOverviewListOfInspections(query);
  const filterChange = (event: any, objectKey: string) => {
    const modifiedQuery = {...query, [`${objectKey}`]: event};
    setQuery({...modifiedQuery});
  };
  function handlePageChange(page: number = 1) {
    setQuery({...query, currentPage: page});
  }
  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">
        لیست واحدهای متخلف بعد از بازرسی در کل کشور
      </legend>

      <div className="flex items-center space-x-4 rtl:space-x-reverse my-8 mt-4 text-sm">
        <ButtonToggle
          name="inactivity"
          title="عدم فعالیت"
          selected={query.inactivity || false}
          disabled={loading}
          onChange={(e: any) => {
            filterChange(e, 'inactivity');
          }}
          defaultIcon={nonActivityIcon}
          activeIcon={activityIcon}
          showCheckedIcon
        />
        <ButtonToggle
          name="noListPrice"
          title="عدم نصب نرخ نامه"
          selected={query.noListPrice || false}
          disabled={loading}
          onChange={(e: any) => {
            filterChange(e, 'noListPrice');
          }}
          defaultIcon={listPriceDeactiveIcon}
          activeIcon={listPriceIcon}
          showCheckedIcon
        />
        <ButtonToggle
          name="noBusinessLicense"
          title="عدم نصب پروانه کسب"
          selected={query.noBusinessLicense || false}
          disabled={loading}
          onChange={(e: any) => {
            filterChange(e, 'noBusinessLicense');
          }}
          defaultIcon={businessLicenseDeactiveIcon}
          activeIcon={businessLicenseIcon}
          showCheckedIcon
        />
      </div>

      <div className="flex items-center space-x-4 rtl:space-x-reverse my-8 mt-4 text-sm">
        {/* <ButtonToggle
          name="registeredPosDevice"
          title="عدم استفاده از کارتخوان ثبت شده در سامانه"
          selected={query.registeredPosDevice || false}
          onChange={(e: any) => {
            filterChange(e, 'registeredPosDevice');
          }}
          defaultIcon={posDeviceDeactiveIcon}
          activeIcon={posDeviceIcon}
          showCheckedIcon
        /> */}
        <ButtonToggle
          name="unapprovedPrice"
          title="عرضه نان به قیمت غیر مصوب"
          selected={query.unapprovedPrice || false}
          onChange={(e: any) => {
            filterChange(e, 'unapprovedPrice');
          }}
          defaultIcon={unapprovedPriceDeactiveIcon}
          activeIcon={unapprovedPriceIcon}
          showCheckedIcon
        />
        <div className="w-1/3 flex-grow flex items-center justify-between" />
      </div>

      <div className="flex flex-grow items-center justify-between space-x-5 rtl:space-x-reverse mb-8">
        {/* <div className="flex align-center space-x-4 rtl:space-x-reverse">
          <div className="relative z-20 inline-block text-left px-5 py-1 shadow rounded">
            <div className="inline-flex justify-center items-center w-full text-sm font-medium">
              <span className="mx-3 whitespace-nowrap truncate">
                <span className="text-gray-500">تعداد ردیف :</span> {Number(1).toPersianDigits()}
              </span>
            </div>
          </div>
        </div> */}
      </div>

      {/* {loading ? (
          <div className="p-20">
            <Spinner />
          </div>
        ) : (
          
        )} */}
      <div className="flex flex-col align-center justify-center w-full rounded-xl bg-white p-4 shadow">
        {errorMessage && !loading ? (
          <div className="p-40">
            <div className="text-red-500">{errorMessage}</div>
            <RetryButton setQuery={setQuery} />
          </div>
        ) : (
          <Table
            handlePageChange={handlePageChange}
            loading={loading}
            dataSet={[...dataSet]}
            pagination={{pageSize, currentPage: query.currentPage}}
            totalItems={totalItems}
            columns={[
              {
                name: 'شماره خبازی',
                key: 'unitNumber',
                className: 'flex justify-start',
                render: (v: any, record, index: number) => (
                  <div className="flex w-full justify-start">
                    {toPersianDigit(((query.currentPage - 1) * pageSize + (index + 1)).toString())}.
                    {record.unitNumber}
                  </div>
                ),
              },
              {
                name: 'استان',
                key: 'province',
                render: (v: any) => <span>{v}</span>,
              },
              {
                name: 'نام مالک',
                key: 'ownerName',
                render: (v: any) => <span>{v}</span>,
              },
              // {
              //   name: 'کد ملی مالک',
              //   key: 'nationalId',
              //   render: (v: any) => <span>{Number(v).toPersianDigits()}</span>,
              // },
              {
                name: 'نوع تخلف',
                key: 'typeViolation',
                render: (v: any, record: any) => (
                  <div className="flex justify-center items-center">
                    {record.typeViolation.lenght > 0 && (
                      <div className="flex justify-start items-center space-x-3 rtl:space-x-reverse">
                        {record.typeViolation.inactivity ? (
                          <div className="w-4 h-4">
                            <img className="w-4 h-4" src={nonActivityIcon} alt="عدم فعالیت" />
                          </div>
                        ) : (
                          <div className="w-4 h-4" />
                        )}
                        {record.typeViolation.noListPrice ? (
                          <div className="w-4 h-4">
                            <img
                              className="w-4 h-4"
                              src={listPriceDeactiveIcon}
                              alt="عدم نصب نرخ نامه"
                            />
                          </div>
                        ) : (
                          <div className="w-4 h-4" />
                        )}
                        {record.typeViolation.noBusinessLicense ? (
                          <div className="w-4 h-4">
                            <img
                              className="w-4 h-4"
                              src={businessLicenseDeactiveIcon}
                              alt="عدم نصب پروانه کسب"
                            />
                          </div>
                        ) : (
                          <div className="w-4 h-4" />
                        )}
                        {/* {record.typeViolation.registeredPosDevice ? (
                          <div className="w-4 h-4">
                            <img
                              className="w-4 h-4"
                              src={posDeviceDeactiveIcon}
                              alt="عدم استفاده از کارتخوان ثبت شده در سامانه"
                            />
                          </div>
                        ) : (
                          <div className="w-4 h-4" />
                        )} */}
                        {record.typeViolation.unapprovedPrice ? (
                          <div className="w-4 h-4">
                            <img
                              className="w-4 h-4"
                              src={unapprovedPriceDeactiveIcon}
                              alt="عرضه نان به قیمت غیر مصوب"
                            />
                          </div>
                        ) : (
                          <div className="w-4 h-4" />
                        )}
                      </div>
                    )}
                  </div>
                ),
              },
              {
                name: 'آدرس',
                key: 'address',
                className: 'flex justify-start',
                render: (v: any) => <span>{v}</span>,
              },
            ]}
          />
        )}
      </div>
    </fieldset>
  );
};

export default OverviewListOfInspections;
