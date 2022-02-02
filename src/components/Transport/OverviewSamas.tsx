// import axios from 'axios';
import React, {useState} from 'react';
import driverInfectedIcon from '../../assets/images/icons/driver-infected.svg';
import deactiveFuelCardIcon from '../../assets/images/icons/deactive-fuel-card.svg';
import informationUpdatedIcon from '../../assets/images/icons/information-updated.svg';
import deactivateInquiryIcon from '../../assets/images/icons/deactivate-inquiry.svg';
import Statistic from '../../containers/Guild/components/Statistic';
// import transportService from '../../services/transport.service';

const OverviewSamas = () => {
  // const [numberOfDrivers, setNumberOfDrivers] = useState(null);
  // eslint-disable-next-line
  const [numberOfDriversLoading, setNumberOfDriversLoading] = useState(false);
  // const [numberOfPlaqueVisited, setNumberOfPlaqueVisited] = useState(null);
  // eslint-disable-next-line
  const [numberOfPlaqueVisitedLoading, setNumberOfPlaqueVisitedLoading] = useState(false);
  // const [numberOfPositiveDrivers, setNumberOfPositiveDrivers] = useState(null);
  // eslint-disable-next-line
  const [numberOfPositiveDriversLoading, setNumberOfPositiveDriversLoading] = useState(false);

  // const {CancelToken} = axios;
  // const source = CancelToken.source();

  // const getNumberOfDrivers = async () => {
  //   setNumberOfDriversLoading(true);
  //   try {
  //     const {data} = await transportService.numberOfDrivers(null, {cancelToken: source.token});
  //     setNumberOfDrivers(data.numberOfDrivers);
  //   } catch (error) {
  //     // eslint-disable-next-line
  //     console.log(error);
  //   } finally {
  //     setNumberOfDriversLoading(false);
  //   }
  // };

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

  // useEffect(() => {
  //   getNumberOfDrivers();
  //   getNumberOfPlaqueVisited();
  //   getNumberOfPositiveDrivers();

  //   return () => {
  //     setNumberOfDrivers(null);
  //     setNumberOfPlaqueVisited(null);
  //     setNumberOfPositiveDrivers(null);
  //     source.cancel('Operation canceled by the user.');
  //   };
  // }, []);

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">سامانه ملی اطلاعات سفر (سماس)</legend>

      <div className="flex flex-col justify-between space-y-8">
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            icon={driverInfectedIcon}
            text="موارد مثبت اعلامی به سماس"
            // count={numberOfDrivers}
            count={0}
            loading={numberOfDriversLoading}
            hasInfo
            infoText="این عدد مشتمل بر تمامی رانندگانی است که تا تاریخ روز در حوزه های مختلف مثبت شناسایی شده اند و به سماس اعلام شده اند"
          />
          <Statistic
            icon={deactivateInquiryIcon}
            text="غیر فعالسازی‌های انجام شده"
            // count={numberOfPositiveDrivers}
            count={0}
            loading={numberOfPositiveDriversLoading}
            hasInfo
            infoText="این عدد مشتمل بر نتایج غیرفعالسازی دریافتی از سماس هستند"
          />
          <Statistic
            icon={informationUpdatedIcon}
            text="اطلاعات به روز رسانی شده"
            // count={numberOfPlaqueVisited}
            count={0}
            loading={numberOfPlaqueVisitedLoading}
            hasInfo
            infoText="این عدد مشتمل بر مجموع اطلاعات به روز رسانی دریافتی از سماس از تاریخ 1400/10/01 است"
          />
          <Statistic
            icon={deactiveFuelCardIcon}
            text="مجموع تعلیق‌های کارت سوخت"
            count="-"
            loading={false}
            hasInfo
            infoText="این عدد نشان دهنده ی مجموع تعلیق های کارت سوخت رانندگان شناسایی شده با تست مثبت است"
          />
        </div>
      </div>
    </fieldset>
  );
};
export default OverviewSamas;
