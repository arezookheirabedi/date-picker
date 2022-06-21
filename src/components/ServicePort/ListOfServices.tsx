// import React, {useEffect, useState} from "react";
// import {Menu} from "@headlessui/react";
// import dataExchangePortService from "../../services/data-exchange-port.service";
// import {ReactComponent as DownIcon} from "../../assets/images/icons/down.svg";
// import Table from "../TableScope";
// import CategoryDonut from "../../containers/Guild/components/CategoryDonut";

// const filterTypes = [
//   {
//     name: 'براساس بیشترین فراخوانی',
//     enName: 'HIGHEST',
//   },
//   {
//     name: 'براساس کمترین فراخوانی',
//     enName: 'LOWEST',
//   },
// ];

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
  // const [filterType, setFilterType] = useState({name: 'براساس بیشترین فراخوانی', enName: 'HIGHEST'});
  // eslint-disable-next-line
  // const [loading, setLoading] = useState(false);
  // const [searchQuery, setSearchQuery] = useState('');
  // const [dataset, setDataset] = useState<any>([]);
  // eslint-disable-next-line
  // const [orgDataset, setOrgDataset] = useState<any>([]);

  // const getListOfServices =async ()=>{
  //   setLoading(true);
  //   try {
  //     const {data} = await dataExchangePortService.getServicesStatistic();
  //       const normalizedData: any[] = [];
  //       data.forEach((item: any, index: number) => {
  //         normalizedData.push({
  //           id: `ovca_${index}`,
  //           name: item.endPoint || 'نامشخص',
  //           receivingDevice: item.consumer || 0,
  //           serviceGroup: item.gateway || 0,
  //           launchDate: item.startDate || 0,
  //           provider: item.provider || 0,
  //           numberOfCalls: item.totalCalls || 0,
  //           successfulCalling: item.successCalls || 0,
  //           failedCall: item.failCalls || 0
  //         });
  //       });
  //
  //       setDataset([...normalizedData]);
  //       setOrgDataset([...normalizedData]);
  //       setFilterType({
  //         name: 'براساس بیشترین فراخوانی',
  //         enName: 'HIGHEST',
  //       });
  //     // setServicesTotalStatistic({...data})
  //     // setProfileNumber(data.count);
  //   } catch (error) {
  //     // eslint-disable-next-line
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }
  // useEffect(() => {
  //   getListOfServices();
  //   // getOverviewByCategory1();
  //   return () => {
  //     // cancelRequest();
  //     setDataset([]);
  //     setOrgDataset([]);
  //   };
  // }, []);
  //
  //
  // useEffect(() => {
  //   const tmp = [...orgDataset].sort((a: any, b: any) => {
  //     // eslint-disable-next-line
  //     const reverse = filterType.enName === 'HIGHEST' ? 1 : filterType.enName === 'LOWEST' ? -1 : 1;
  //
  //     if (a.numberOfCalls < b.numberOfCalls) {
  //       return reverse * 1;
  //     }
  //
  //     if (a.numberOfCalls > b.numberOfCalls) {
  //       return reverse * -1;
  //     }
  //     // a must be equal to b
  //     return 0;
  //   });
  //
  //   setDataset(tmp);
  // }, [filterType]);
  //
  // function handleSearch(e: any) {
  //   const {value} = e.target;
  //
  //   let tmp = [...orgDataset];
  //   if (value) {
  //     tmp = [...tmp].filter(x => x.name.indexOf(value) !== -1);
  //   }
  //
  //   setDataset(
  //     [...tmp].sort((a: any, b: any) => {
  //       const reverse =
  //         // eslint-disable-next-line
  //         filterType.enName === 'HIGHEST' ? 1 : filterType.enName === 'LOWEST' ? -1 : 1;
  //
  //       if (a.infectedPercent < b.infectedPercent) {
  //         return reverse * 1;
  //       }
  //
  //       if (a.infectedPercent > b.infectedPercent) {
  //         return reverse * -1;
  //       }
  //       // a must be equal to b
  //       return 0;
  //     })
  //   );
  //   setSearchQuery(value);
  // }


  return (
    <fieldset className="text-center border rounded-xl p-8">
      <legend className="text-black mx-auto px-3">لیست سرویس ها</legend>

      <div className="p-40 flex justify-center">
        به زودی ...
      </div>
    </fieldset>
  )
}

export default ListOfServices;