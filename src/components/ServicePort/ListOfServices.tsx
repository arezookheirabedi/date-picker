import React, {useEffect, useState} from "react";
import {Menu} from "@headlessui/react";
import {ReactComponent as DownIcon} from "../../assets/images/icons/down.svg";
import Table from "../TableScope";
import CategoryDonut from "../../containers/Guild/components/CategoryDonut";

const filterTypes = [
  {
    name: 'براساس بیشترین فراخوانی',
    enName: 'HIGHEST',
  },
  {
    name: 'براساس کمترین فراخوانی',
    enName: 'LOWEST',
  },
];

// const initialDate = [
//   {
//     serviceName: "ایران من (استعلام مسافران)",
//     receivingDevice: "شرکت علی بابا",
//     serviceGroup: "استعلام مسافران",
//     launchDate: "۱۴۰۰/۱۱/۱۲",
//     provider: "وزارت کشور",
//     numberOfCalls: 1000000,
//     successfulCalling: 600000,
//     failedCall: 400000
//   },
//   {
//     serviceName: "استعلام گذرنامه",
//     receivingDevice: "وزارت کشور",
//     serviceGroup: "استعلام گذرنامه",
//     launchDate: "۱۴۰۰/۱۱/۱۴",
//     provider: "پاوا",
//     numberOfCalls: 2000000,
//     successfulCalling: 900000,
//     failedCall: 1100000
//   },
//   {
//     serviceName: "ایران من (امور استخدامی)",
//     receivingDevice: "شرکت دیجی کالا",
//     serviceGroup: "استعلام پرسنل",
//     launchDate: "۱۴۰۰/۱۱/۲۲",
//     provider: "ایرانسل",
//     numberOfCalls: 3000000,
//     successfulCalling: 2000000,
//     failedCall: 1000000
//   },
//   {
//     serviceName: "ایران من (استعلام مسافران)",
//     receivingDevice: "شرکت علی بابا",
//     serviceGroup: "استعلام مسافران",
//     launchDate: "۱۴۰۰/۱۱/۱۲",
//     provider: "وزارت کشور",
//     numberOfCalls: 500000,
//     successfulCalling: 250000,
//     failedCall: 250000
//   },
//   {
//     serviceName: "ایران من (امور استخدامی)",
//     receivingDevice: "شرکت دیجی کالا",
//     serviceGroup: "استعلام پرسنل",
//     launchDate: "۱۴۰۰/۱۱/۲۲",
//     provider: "ایرانسل",
//     numberOfCalls: 4000000,
//     successfulCalling: 3500000,
//     failedCall: 500000
//   },
// ]

const ListOfServices = () => {
  const [filterType, setFilterType] = useState({name: 'براساس بیشترین فراخوانی', enName: 'HIGHEST'});
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [dataset, setDataset] = useState<any>([]);
  // eslint-disable-next-line
  const [orgDataset, setOrgDataset] = useState<any>([]);


  useEffect(() => {
    const tmp = [...orgDataset].sort((a: any, b: any) => {
      // eslint-disable-next-line
      const reverse = filterType.enName === 'HIGHEST' ? 1 : filterType.enName === 'LOWEST' ? -1 : 1;

      if (a.numberOfCalls < b.numberOfCalls) {
        return reverse * 1;
      }

      if (a.numberOfCalls > b.numberOfCalls) {
        return reverse * -1;
      }
      // a must be equal to b
      return 0;
    });

    setDataset(tmp);
  }, [filterType]);

  function handleSearch(e: any) {
    const {value} = e.target;

    let tmp = [...orgDataset];
    if (value) {
      tmp = [...tmp].filter(x => x.name.indexOf(value) !== -1);
    }

    setDataset(
      [...tmp].sort((a: any, b: any) => {
        const reverse =
          // eslint-disable-next-line
          filterType.enName === 'HIGHEST' ? 1 : filterType.enName === 'LOWEST' ? -1 : 1;

        if (a.infectedPercent < b.infectedPercent) {
          return reverse * 1;
        }

        if (a.infectedPercent > b.infectedPercent) {
          return reverse * -1;
        }
        // a must be equal to b
        return 0;
      })
    );
    setSearchQuery(value);
  }


  return (
    <fieldset className="text-center border rounded-xl p-8">
      <legend className="text-black mx-auto px-3">لیست سرویس ها</legend>
      <div className="flex align-center justify-spacebetween space-x-5 rtl:space-x-reverse mb-8">
        <div className="flex align-center space-x-5 rtl:space-x-reverse">
          <div className="flex items-center">
            <Menu
              as="div"
              className="relative z-20 inline-block text-left shadow-custom rounded-lg px-5 py-1 "
            >
              <div>
                <Menu.Button
                  className="inline-flex justify-between items-center w-full py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                  {/* <div className="flex items-center flex-row-reverse xl:flex-row"> */}
                  {/* <img src={avatar} alt="z" className="w-5 h-5" /> */}
                  <span className="ml-10 whitespace-nowrap truncate">
                    {filterType?.name || 'بیشترین'}
                  </span>
                  <DownIcon className="h-2 w-2.5 mr-2"/>
                </Menu.Button>
              </div>

              <Menu.Items
                style={{width: '250px'}}
                className="z-40 absolute left-0 xl:right-0 max-w-xs mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div className="px-1 py-1 ">
                  {filterTypes.map((value: any, index: any) => {
                    // console.log(value);
                    return (
                      // eslint-disable-next-line
                      <Menu.Item key={index}>
                        {({active}) => (
                          <button
                            type="button"
                            className={`${
                              active ? 'bg-gray-100' : ''
                            } text-gray-900 group flex rounded-md items-center whitespace-nowrap truncate w-full px-2 py-2 text-sm`}
                            onClick={() => {
                              setFilterType(value);
                            }}
                          >
                            {/* <IconWrapper className="w-4 h-4 ml-3" name="exit" /> */}
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

        </div>

        <div className="flex flex-grow align-center justify-end">
          <div className="relative inline-flex align-center leading-3">
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
              placeholder="جستجوی سرویس ها"
              className="py-2 px-4 pr-10 text-sm border border-gray-300 rounded-lg focus:outline-none"
              onChange={handleSearch}
              value={searchQuery}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col align-center justify-center w-full rounded-xl bg-white p-4 shadow">
        <Table
         
          dataSet={[...dataset]}
          pagination={{pageSize: 10, maxPages: 3}}
          columns={[
            {
              name: 'وضعیت کلی',
              key: '',
              render: (v: any, record) => (
                <CategoryDonut
                  data={[
                    {
                      name: 'successfulCalling',
                      title: 'فراخوانی موفق',
                      y: record.successfulCalling || 0,
                      color: {
                        linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
                        stops: [
                          [0, '#05D8A4'], // start
                          [1, '#039572'], // end
                        ],
                      },
                    },
                    {
                      name: 'failedCall',
                      title: 'فراخوانی ناموفق',
                      y: record.failedCall || 0,
                      color: {
                        linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
                        stops: [
                          [0, '#FE2D2F'], // start
                          [1, '#CC0002'], // end
                        ],
                      },
                    },
                  ]}
                />
              ),
              className: 'flex justify-center w-full',
            },
            {
              name: 'نام سرویس',
              key: 'name',
              render: (v: any, record, index: number, page: number) => (
                <div className="flex">
                  {((page - 1) * 10 + (index + 1)).toLocaleString('fa')}.{v}
                </div>
              ),
            },
            {
              name: 'دستگاه دریافت کننده',
              key: 'receivingDevice',
              render: (v: any, record: any) => {
                return (
                  <span>{record.receivingDevice}</span>
                )
              },
            },
            {
              name: 'گروه سرویس',
              key: 'serviceGroup',
              render: (v: any, record: any) => (<span>{record.serviceGroup}</span>),
            },
            {
              name: 'تاریخ راه اندازی',
              key: 'launchDate',
              render: (v: any) => (
                <span>{v || v === 0 ? (v as number).toLocaleString('fa') : '-'}</span>
              ),
            },
            {
              name: 'ارائه دهنده',
              key: 'provider',
              render: (v: any, record: any) => (
                <span>{record.provider}</span>
              ),
            },
            {
              name: 'تعداد فراخوانی',
              key: 'numberOfCalls',
              render: (v: any) => (
                <span>{v || v === 0 ? (v as number).toLocaleString('fa') : '-'}</span>
              ),
            },
            {
              name: 'فراخوانی موفق',
              key: 'successfulCalling',
              render: (v: any) => (
                <span className="text-green-600">{v || v === 0 ? (v as number).toLocaleString('fa') : '-'}</span>
              ),
            },
            {
              name: 'فراخوانی ناموفق',
              key: 'failedCall',
              render: (v: any) => (
                <span className="text-red-600">{v || v === 0 ? (v as number).toLocaleString('fa') : '-'}</span>
              ),
            },
          ]}
          totalItems={(dataset || []).length}
        />
      </div>
    </fieldset>
  )
}

export default ListOfServices;