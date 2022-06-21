// import {useEffect, useState} from "react";

import Statistic from 'src/containers/Guild/components/Statistic';
import totalCalls from "../../assets/images/icons/total-calls.svg";
import totalServices from "../../assets/images/icons/total-services.svg";
import clientDevices from "../../assets/images/icons/client-devices.svg";
import profilesNumber from "../../assets/images/icons/profile-numbers.svg";
// import dataExchangePortService from "../../services/data-exchange-port.service";


const Overview = () => {

  // const [loadingProfileNumber, setLoadingProfileNumber] = useState<boolean>(false);
  // const [loading, setLoading] = useState<boolean>(false);
  // const [servicesTotalStatistic, setServicesTotalStatistic] = useState<any>(false)
  // const [profileNumber, setProfileNumber] = useState(null);

  // const callGetProfilesNumber = async () => {
  //   setLoadingProfileNumber(true);
  //   try {
  //     const {data} = await dataExchangePortService.getProfilesNumber();
  //     setProfileNumber(data.count);
  //   } catch (error) {
  //     // eslint-disable-next-line
  //     console.log(error);
  //   } finally {
  //     setLoadingProfileNumber(false);
  //   }
  // }

  // const callGetServicesTotalStatistic = async () => {
  //   setLoading(true);
  //   try {
  //     const {data} = await dataExchangePortService.getServicesTotalStatistic();
  //     setServicesTotalStatistic({...data})
  //     // setProfileNumber(data.count);
  //   } catch (error) {
  //     // eslint-disable-next-line
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  // useEffect(() => {
  //   callGetProfilesNumber();
  //   callGetServicesTotalStatistic();
  // }, [])

  return (
    <fieldset className="text-center border rounded-xl p-4">
      <legend className="text-black mx-auto px-3">درگاه تبادل داده و خدمات</legend>

      <div
        className="flex flex-col lg:flex-row justify-between space-y-5 lg:space-y-0 space-x-0 lg:space-x-5 rtl:space-x-reverse">
        <div
          className="flex-grow flex flex-col md:flex-row space-y-5 md:space-y-0 space-x-0  md:space-x-5 rtl:space-x-reverse">
          {/* <Statistic icon={totalCalls} loading={loading} text="تعداد کل فراخوانی" count={servicesTotalStatistic.calls || ''}/> */}
          <Statistic icon={totalCalls} loading={false} text="تعداد کل فراخوانی" count="1102908972"/>
          {/* <Statistic icon={totalServices} loading={loading} text="تعداد کل خدمات" count={servicesTotalStatistic.endPoints || ''}/> */}
          <Statistic icon={totalServices} loading={false} text="تعداد کل خدمات" count="70"/>
        </div>
        <div
          className="flex-grow flex flex-col md:flex-row space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          {/* <Statistic icon={clientDevices} loading={loading} text="دستگاه های سرویس گیرنده" count={servicesTotalStatistic.consumers || ''}/> */}
          <Statistic icon={clientDevices} loading={false} text="دستگاه های سرویس گیرنده" count="52"/>
          {/* <Statistic icon={profilesNumber} text="تعداد پروفایل شهروندان" count={profileNumber} */}
          {/*           loading={loadingProfileNumber}/> */}

          <Statistic icon={profilesNumber} text="تعداد پروفایل شهروندان" count="74855398"
                     loading={false}/>
        </div>
      </div>
    </fieldset>
  )
}

export default Overview;