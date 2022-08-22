import React, {useState, useEffect, useCallback} from 'react';
import {Menu} from '@headlessui/react';
import {ReactComponent as DownIcon} from '../../../../assets/images/icons/down.svg';
//
import ButtonToggle from '../../../Form/ButtonToggle';
import Table from '../../../TableScope';
import Spinner from '../../../Spinner';
import {sidesCities} from '../../../../helpers/utils';
//
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
//
import useGetOverviewListOfInspections from "../../../../hooks/apis/useGetOverviewListOfInspections";

const OverviewListOfInspections: React.FC<{}> = () => {
    const [inactivity, setInactivity] = useState<any>(false);
    const [listPrice, setListPrice] = useState<any>(false);
    const [businessLicense, setBusinessLicense] = useState<any>(false);
    const [registeredPosDevice, setRegisteredPosDevice] = useState<any>(false);
    const [unapprovedPrice, setUnapprovedPrice] = useState<any>(false);
    const [query, setQuery] = useState<string>("");
    const [serviceType, setServiceType] = useState(null) as any;

    const {loading, list: dataset, count, setCount, filteredDataset, setFilteredDataset} = useGetOverviewListOfInspections();

      const filteredList = useCallback(() => {
        let temp = [...dataset];
        if (inactivity) temp = temp.filter(item => item.inactivity === true);
        if (listPrice) temp = temp.filter(item => item.listPrice === true);
        if (businessLicense) temp = temp.filter(item => item.businessLicense === true);
        if (registeredPosDevice) temp = temp.filter(item => item.registeredPosDevice === true);
        if (unapprovedPrice) temp = temp.filter(item => item.unapprovedPrice === true);
        if (query && query !== "همه") temp = temp.filter(item => item.province.trim() === query);
    
          setFilteredDataset(temp);
          setCount(temp.length)
    
      },[
            inactivity, 
            listPrice, 
            businessLicense, 
            registeredPosDevice, 
            unapprovedPrice, 
            query
        ]);
        
      useEffect(() => {
        filteredList();
    },[filteredList]);

    return (
        <fieldset className="text-center border rounded-xl p-4 mb-16">
            <legend className="text-black mx-auto px-3">
            لیست واحدهای متخلف بعد از بازرسی در کل کشور
            </legend>

            <div className="flex items-center space-x-4 rtl:space-x-reverse my-8 mt-4 text-sm">
                <ButtonToggle
                    name="inactivity"
                    title="عدم فعالیت"
                    selected={inactivity}
                    disabled={loading}
                    onChange={setInactivity}
                    defaultIcon={nonActivityIcon}
                    activeIcon={activityIcon}
                    showCheckedIcon
                />
                <ButtonToggle
                    name="listPrice"
                    title="عدم نصب نرخ نامه"
                    selected={listPrice}
                    disabled={loading}
                    onChange={setListPrice}
                    defaultIcon={listPriceDeactiveIcon}
                    activeIcon={listPriceIcon}
                    showCheckedIcon
                />
                <ButtonToggle
                    name="businessLicense"
                    title="عدم نصب پروانه کسب"
                    selected={businessLicense}
                    disabled={loading}
                    onChange={setBusinessLicense}
                    defaultIcon={businessLicenseDeactiveIcon}
                    activeIcon={businessLicenseIcon}
                    showCheckedIcon
                />
            </div>

            <div className="flex items-center space-x-4 rtl:space-x-reverse my-8 mt-4 text-sm">
                <ButtonToggle
                    name="registeredPosDevice"
                    title="عدم استفاده از کارتخوان ثبت شده در سامانه"
                    selected={registeredPosDevice}
                    onChange={setRegisteredPosDevice}
                    defaultIcon={posDeviceDeactiveIcon}
                    activeIcon={posDeviceIcon}
                    showCheckedIcon
                />
                <ButtonToggle
                    name="unapprovedPrice"
                    title="عرضه نان به قیمت غیر مصوب"
                    selected={unapprovedPrice}
                    onChange={setUnapprovedPrice}
                    defaultIcon={unapprovedPriceDeactiveIcon}
                    activeIcon={unapprovedPriceIcon}
                    showCheckedIcon
                />
                <div className="w-1/3 flex-grow flex items-center justify-between" />
            </div>

            <div className="flex flex-grow items-center justify-between space-x-5 rtl:space-x-reverse mb-8">
                <div className="flex align-center space-x-4 rtl:space-x-reverse">
                    <Menu
                        as="div"
                        className="relative z-20 inline-block text-left shadow rounded px-5 py-1 "
                    >
                        <div>
                        <Menu.Button className="inline-flex justify-between items-center w-full text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                            <span className="ml-10 whitespace-nowrap truncate">
                            {serviceType?.name || 'همه'}
                            </span>
                            <DownIcon className="h-2 w-2.5 mr-2" />
                        </Menu.Button>
                        </div>
                        <Menu.Items className="overflow-y-auto h-40 z-40 absolute left-0 xl:right-0 w-52 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="px-1 py-1 ">
                            {sidesCities.map((value: any, index: any) => {
                            return (
                                // eslint-disable-next-line
                                <Menu.Item key={index}>
                                {({active}) => (
                                    <button
                                    type="button"
                                    className={`${
                                        active ? 'bg-gray-100' : ''
                                    } text-gray-900 group flex rounded-md items-center w-full px-2 py-2 text-sm whitespace-nowrap`}
                                    onClick={() => {
                                        setServiceType(value);
                                        setQuery(value.name);
                                    }}
                                    >
                                    {value.name}
                                    </button>
                                )}
                                </Menu.Item>
                            );
                            })}
                        </div>
                        </Menu.Items>
                    </Menu>
                </div>
                <div className="flex align-center space-x-4 rtl:space-x-reverse">
                    <div className='relative z-20 inline-block text-left px-5 py-1 shadow rounded'>
                        <div className="inline-flex justify-center items-center w-full text-sm font-medium">
                            <span className="mx-3 whitespace-nowrap truncate">
                            <span className="text-gray-500">
                                تعداد ردیف :
                            </span> {count}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col align-center justify-center w-full rounded-xl bg-white p-4 shadow">
                    {loading ? (
                    <div className="p-20">
                        <Spinner />
                    </div>
                    ) : (
                    <Table
                        dataSet={[...filteredDataset]}
                        pagination={{pageSize: 10, maxPages: 3}}
                        columns={[
                        {
                            name: 'شماره خبازی',
                            key: 'number',
                            className: 'flex justify-start',
                            render: (v: any, record, index: number, page: number) => (
                            <div className="flex justify-start items-center space-x-2 rtl:space-x-reverse">
                                <span className="w-8">
                                {((page - 1) * 10 + (index + 1)).toLocaleString('fa')}.
                                </span>
                                <span>{v}</span>
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
                            key: 'name',
                            render: (v: any) => <span>{v}</span>,
                        },
                        {
                            name: 'کد ملی مالک',
                            key: 'nationalId',
                            render: (v: any) => <span>{v}</span>,
                        },
                        {
                            name: 'نوع تخلف',
                            key: 'types',
                            render: (v: any, record: any) => (
                                <div className="flex justify-center items-center">
                                <div className="flex justify-start items-center space-x-3 rtl:space-x-reverse">
                                    {record.inactivity ? (
                                    <div className="w-4 h-4">
                                        <img
                                            className="w-4 h-4"
                                            src={nonActivityIcon}
                                            alt="عدم فعالیت"
                                        />
                                    </div>
                                    ) : (
                                    <div className="w-4 h-4" />
                                    )}
                                    {record.listPrice ? (
                                    <div className="w-4 h-4">
                                        <img className="w-4 h-4" 
                                        src={listPriceDeactiveIcon} 
                                        alt="عدم نصب نرخ نامه" />
                                    </div>
                                    ) : (
                                    <div className="w-4 h-4" />
                                    )}
                                    {record.businessLicense ? (
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
                                    {record.registeredPosDevice ? (
                                    <div className="w-4 h-4">
                                        <img
                                            className="w-4 h-4"
                                            src={posDeviceDeactiveIcon}
                                            alt="عدم استفاده از کارتخوان ثبت شده در سامانه"
                                        />
                                    </div>
                                    ) : (
                                    <div className="w-4 h-4" />
                                    )}
                                    {record.unapprovedPrice ? (
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
                        totalItems={(filteredDataset || []).length}
                    />
                    )}
                </div>
        </fieldset>
    )
}

export default OverviewListOfInspections;