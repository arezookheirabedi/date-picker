import React, {useEffect, useState} from 'react';
// import Statistic from 'src/containers/Overview/components/Statistic';
import saveIcon from 'src/assets/images/icons/save-color.svg';
import deadIcon from 'src/assets/images/icons/dead-color.svg';
import sufferingIcon from 'src/assets/images/icons/suffering-color.svg';
import guildIcon from 'src/assets/images/icons/guild-color.svg';
import guildPositiveIcon from 'src/assets/images/icons/guild-positive.svg';
import vaccineIcon from 'src/assets/images/icons/vaccine-color.svg';
import noneVacsinateStart from 'src/assets/images/icons/none-vaccinate-start-wok-panel.svg';
import totalVacsinateStart from 'src/assets/images/icons/total-vaccinate-start-work-panel.svg';
import testIcon from 'src/assets/images/icons/test-color.svg';
import GreyVaccine from 'src/assets/images/icons/big-gray-vaccine.svg';
import vaccineService from 'src/services/vaccine.service';
import {cancelTokenSource, msgRequestCanceled} from 'src/helpers/utils';
import Statistic from 'src/containers/Guild/components/Statistic';
import guildService from 'src/services/guild.service';
import {
  // IInitialInquiry,
  IInitialPcrInfo,
  IInitialVacinatelInfo,
  // initialInquiry,
  initialPcrInfo,
  initialVacinatelInfo,
} from './constant';
// import axios from 'axios';

const OverviewGuilds: React.FC<{}> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [pcrLoading, setPcrLoading] = useState<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [inquiryLoading, setInquiryLoading] = useState<boolean>(false);
  const [guildPcrInfo, setGuildPcrInfo] = useState<IInitialPcrInfo>(initialPcrInfo);
  // const [guildInquiry, setGuildInquiry] = useState<IInitialInquiry>(initialInquiry);

  const [guildVacinateInfo, setGuildVacinateInfo] =
    useState<IInitialVacinatelInfo>(initialVacinatelInfo);
  const cancelToken = cancelTokenSource();

  function cancelRequest() {
    cancelToken.cancel(msgRequestCanceled);
  }
  const getPcrResult = async (): Promise<any> => {
    setPcrLoading(true);
    try {
      const res = await guildService.guildTestResult(
        {tag: 'guild'},
        {cancelToken: cancelToken.token}
      );
      if (res.status === 200) {
        const newData = {...guildPcrInfo, ...res.data};
        setGuildPcrInfo(newData);
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setPcrLoading(false);
    }
  };
  const getGuildVacinateInfo = async () => {
    setLoading(true);
    try {
      const res = await vaccineService.membersGeneral(
        {tag: 'guild'},
        {cancelToken: cancelToken.token}
      );
      if (res.status === 200) {
        const newData = {...guildVacinateInfo, ...res.data};
        setGuildVacinateInfo(newData);
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  // const getInquiry = async () => {
  //   setInquiryLoading(true);
  //   try {
  //     const res = await guildService.guildInquiry(
  //       {total: true, disqualified: true},
  //       {cancelToken: cancelToken.token}
  //     );
  //     if (res.status === 200) {
  //       const newData = {...guildInquiry, ...res.data};
  //       setGuildInquiry(newData);
  //     }
  //   } catch (error) {
  //     // eslint-disable-next-line
  //     console.log(error);
  //   } finally {
  //     setInquiryLoading(false);
  //   }
  // };
  useEffect(() => {
    getGuildVacinateInfo();
    getPcrResult();
    // getInquiry();
    return () => {
      cancelRequest();
      setGuildVacinateInfo(initialVacinatelInfo);
      setGuildPcrInfo(initialPcrInfo);
      // setGuildInquiry(initialInquiry);
    };
  }, []);
  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">وضعیت کلی اصناف کشور</legend>

      <div className="flex flex-col justify-between space-y-8">
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            hasInfo
            infoText=""
            icon={guildIcon}
            text="مجموع کارفرمایان صنفی"
            count={guildVacinateInfo.totalPopulation}
            loading={loading}
          />
          <Statistic
            hasInfo
            infoText=""
            icon={sufferingIcon}
            text="مجموع مبتلایان"
            count={guildPcrInfo.positiveMembersCount}
            loading={pcrLoading}
          />
          <Statistic
            hasInfo
            infoText=""
            icon={saveIcon}
            text="مجموع بهبود یافتگان"
            count={guildPcrInfo.recoveredMembersCount}
            loading={pcrLoading}
          />
          <Statistic hasInfo infoText="" icon={deadIcon} text="مجموع فوت‌ شدگان" count="-" />
        </div>
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            hasInfo
            infoText=" افرادی مه دو دوز واکسن دریافت نموده اند واکسینه شده تلقی میگردند."
            icon={vaccineIcon}
            text="مجموع افراد واکسینه شده"
            count={guildVacinateInfo.gtDoses[0] || 0}
            loading={loading}
          />
          <Statistic
            hasInfo
            infoText=""
            icon={GreyVaccine}
            text="مجموع افراد واکسینه نشده"
            count={guildVacinateInfo.totalNonVaccinesCount || 0}
            loading={loading}
          />
          <Statistic
            hasInfo
            infoText=""
            icon={totalVacsinateStart}
            text="تعداد مراجعات واکسیناسیون بعد از شروع سامانه"
            count={guildVacinateInfo.totalVaccinesCountAfterStartOfSystem || 0}
            loading={loading}
          />{' '}
          <Statistic
            hasInfo
            infoText=""
            icon={noneVacsinateStart}
            text="مجموع افراد واکسینه نشده در زمان شروع سامانه"
            count={guildVacinateInfo.totalNonVaccinesCountBeforeStartOfSystem || 0}
            loading={loading}
          />
        </div>
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          {/* <Statistic icon={scanIcon} text="تعداد استعلام شهروندان" count={guildInquiry.total}  loading={inquiryLoading}/>
          <Statistic icon={scanDangerIcon} text="تعداد استعلامهای نتیجه مثبت" count={guildInquiry.disqualified}  loading={inquiryLoading}/> */}
          <Statistic
            hasInfo
            infoText=""
            icon={testIcon}
            text="تعداد آزمایش های کارفرمایان صنفی"
            count={guildPcrInfo.testResultsCount}
            loading={pcrLoading}
          />
          <Statistic
            hasInfo
            infoText=""
            icon={GreyVaccine}
            text="درصد افراد واکسینه نشده"
            count={guildVacinateInfo.totalNonVaccinesCountToTotalPopulationPercentage || 0}
            loading={loading}
          />
          <Statistic
            hasInfo
            infoText=""
            icon={vaccineIcon}
            text="درصد افراد واکسینه شده"
            count={guildVacinateInfo.totalVaccinesCountToTotalPopulationPercentage || 0}
            loading={loading}
          />
          <Statistic
            hasInfo
            infoText=""
            icon={guildPositiveIcon}
            text="درصد ابتلا به کل"
            count={guildPcrInfo.positiveMembersCountToTotalPopulationPercentage || 0}
            loading={pcrLoading}
          />
        </div>
      </div>
    </fieldset>
  );
};

export default OverviewGuilds;
