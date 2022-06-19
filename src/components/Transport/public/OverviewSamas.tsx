import axios from 'axios';
import React, {useState, useEffect} from 'react';
import driverInfectedIcon from '../../../assets/images/icons/driver-infected.svg';
import deactiveFuelCardIcon from '../../../assets/images/icons/deactive-fuel-card.svg';
import informationUpdatedIcon from '../../../assets/images/icons/information-updated.svg';
import deactivateInquiryIcon from '../../../assets/images/icons/deactivate-inquiry.svg';
import Statistic from '../../../containers/Guild/components/Statistic';
import transportService from '../../../services/transport.service';

const OverviewSamas = () => {

  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  const [dataset, setDataset] = useState({
    healthStatusCalls: null
  })


  const {CancelToken} = axios;
  const source = CancelToken.source();

  const getNumberOfDrivers = async () => {
    setLoading(true);
    try {
      const {data} = await transportService.getSamasInfo(null, {cancelToken: source.token});
      setDataset(data);
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // const getNumberOfPlaqueVisited = async () => {
  //   setNumberOfPlaqueVisitedLoading(true);
  //   try {
  //     const {data} = await transportService.numberOfPlaqueVisited(null, {
  //       cancelToken: source.token,
  //     });
  //     setNumberOfPlaqueVisited(data.numberOfPlaqueVisited);
  //   } catch (error) {
  //     // eslint-disable-next-line
  //     console.log(error);
  //   } finally {
  //     setNumberOfPlaqueVisitedLoading(false);
  //   }
  // };

  // const getNumberOfPositiveDrivers = async () => {
  //   setNumberOfPositiveDriversLoading(true);
  //   try {
  //     const {data} = await transportService.numberOfPositiveDrivers(null, {
  //       cancelToken: source.token,
  //     });
  //     setNumberOfPositiveDrivers(data.numberOfPositiveDrivers);
  //   } catch (error) {
  //     // eslint-disable-next-line
  //     console.log(error);
  //   } finally {
  //     setNumberOfPositiveDriversLoading(false);
  //   }
  // };

  useEffect(() => {
    getNumberOfDrivers();
    return () => {
      setDataset({
        healthStatusCalls: null
      })
      source.cancel('Operation canceled by the user.');
    };
  }, []);

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">سامانه ملی اطلاعات سفر (سماس)</legend>

      <div className="flex flex-col justify-between space-y-8">
        <div
          className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            icon={driverInfectedIcon}
            text="موارد مثبت اعلامی به سماس"
            // count={numberOfDrivers}
            count={dataset.healthStatusCalls}
            loading={loading}
            hasInfo
            infoText="مجموع موارد مبتلایان مثبت و اعلام شده به سماس در رسته‌های مختلف."
          />
          <Statistic
            icon={deactivateInquiryIcon}
            text="غیر فعالسازی‌های انجام شده"
            // count={numberOfPositiveDrivers}
            count="-"
            loading={false}
            hasInfo
            infoText="غیرفعال‌سازی انجام شده رانندگان مبتلا توسط سماس."
          />
          <Statistic
            icon={informationUpdatedIcon}
            text="اطلاعات به روز رسانی شده"
            // count={numberOfPlaqueVisited}
            count="-"
            loading={false}
            hasInfo
            infoText="مجموع اطلاعات به روزرسانی شده توسط سماس."
          />
          <Statistic
            icon={deactiveFuelCardIcon}
            text="مجموع تعلیق‌های کارت سوخت"
            count="-"
            loading={false}
            hasInfo
            infoText="مجموع کارت سوخت تعیلق شده افراد مختلف توسط سماس."
          />
        </div>
      </div>
    </fieldset>
  );
};
export default OverviewSamas;
