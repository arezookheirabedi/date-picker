import {useEffect, useState} from "react";

import Statistic from 'src/containers/Guild/components/Statistic';
import totalCitizen from "../../assets/images/icons/total-citizens.svg";
import totalTests from "../../assets/images/icons/total-tests.svg";
import totalScanQr from "../../assets/images/icons/total-scan-qr.svg";
import numberOfTotalRegisterToday from "../../assets/images/icons/number-of-total-register-today.svg";
import dataExchangePortService from "../../services/data-exchange-port.service";


const Overview = () => {

  const [loadingProfileNumber, setLoadingProfileNumber] = useState<boolean>(false);
  // const [loading, setLoading] = useState<boolean>(false);
  // const [servicesTotalStatistic, setServicesTotalStatistic] = useState<boolean>(false)
  const [profileNumber, setProfileNumber] = useState(null);

  const callGetProfilesNumber = async () => {
    setLoadingProfileNumber(true);
    try {
      const {data} = await dataExchangePortService.getProfilesNumber();
      setProfileNumber(data.count);
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setLoadingProfileNumber(false);
    }
  }

  const callGetServicesTotalStatistic = async () => {
    // setLoading(true);
    try {
      const {data} = await dataExchangePortService.getServicesTotalStatistic();
      console.log(data);
      // setProfileNumber(data.count);
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    } finally {
      // setLoading(false);
    }
  }

  useEffect(() => {
    callGetProfilesNumber();
    callGetServicesTotalStatistic();
  }, [])

  return (
    <fieldset className="text-center border rounded-xl p-4">
      <legend className="text-black mx-auto px-3">درگاه تبادل داده و خدمات</legend>

      <div
        className="flex flex-col lg:flex-row justify-between space-y-5 lg:space-y-0 space-x-0 lg:space-x-5 rtl:space-x-reverse">
        <div
          className="flex-grow flex flex-col md:flex-row space-y-5 md:space-y-0 space-x-0  md:space-x-5 rtl:space-x-reverse">
          <Statistic icon={totalCitizen} text="تعداد کل فراخوانی" count={1000000}/>
          <Statistic icon={totalTests} text="تعداد کل خدمات" count={100}/>
        </div>
        <div
          className="flex-grow flex flex-col md:flex-row space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic icon={totalScanQr} text="دستگاه های سرویس گیرنده" count={100}/>
          <Statistic icon={numberOfTotalRegisterToday} text="تعداد پروفایل شهروندان" count={profileNumber}
                     loading={loadingProfileNumber}/>
        </div>
      </div>
    </fieldset>
  )
}

export default Overview;