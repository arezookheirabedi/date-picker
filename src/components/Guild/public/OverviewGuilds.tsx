import React, {useEffect, useState} from 'react';
// import Statistic from 'src/containers/Overview/components/Statistic';
import saveIcon from 'src/assets/images/icons/save-color.svg';
import deadIcon from 'src/assets/images/icons/dead-color.svg';
import sufferingIcon from 'src/assets/images/icons/suffering-color.svg';
import guildIcon from 'src/assets/images/icons/guild-color.svg';
import vaccineIcon from 'src/assets/images/icons/vaccine-color.svg';
import scanIcon from 'src/assets/images/icons/scan-color.svg';
import scanDangerIcon from 'src/assets/images/icons/scan-danger-color.svg';
import testIcon from 'src/assets/images/icons/test-color.svg';
import vaccineService from 'src/services/vaccine.service';
import {cancelTokenSource, msgRequestCanceled} from 'src/helpers/utils';
import Statistic from 'src/containers/Guild/components/Statistic';
import guildService from 'src/services/guild.service';
import {
  IInitialInquiry,
  IInitialPcrInfo,
  IInitialVacinatelInfo,
  initialInquiry,
  initialPcrInfo,
  initialVacinatelInfo,
} from './constant';
// import axios from 'axios';

const OverviewGuilds: React.FC<{}> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [pcrLoading, setPcrLoading] = useState<boolean>(false);
  const [inquiryLoading, setInquiryLoading] = useState<boolean>(false);
  const [guildPcrInfo, setGuildPcrInfo] = useState<IInitialPcrInfo>(initialPcrInfo);
  const[guildInquiry,setGuildInquiry]=useState<IInitialInquiry>(initialInquiry)

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
 const getInquiry=async()=>{
  setInquiryLoading(true)
 try {
  const res = await guildService.guildInquiry({total:true,disqualified:true},{cancelToken: cancelToken.token})
 if(res.status===200){
   const newData={...guildInquiry,...res.data}
  setGuildInquiry(newData)
 }
 } catch (error) {
   // eslint-disable-next-line
   console.log(error);
 }finally{ setInquiryLoading(false)}
 }
  useEffect(() => {
    getGuildVacinateInfo();
    getPcrResult();
    getInquiry()
    return () => {
      cancelRequest();
      setGuildVacinateInfo(initialVacinatelInfo);
      setGuildPcrInfo(initialPcrInfo);
      setGuildInquiry(initialInquiry)
    };
  }, []);
  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">وضعیت کلی اصناف کشور</legend>

      <div className="flex flex-col justify-between space-y-8">
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            icon={guildIcon}
            text="مجموع شاغلین"
            count={guildVacinateInfo.totalPopulation}
            loading={loading}
          />
          <Statistic
            icon={sufferingIcon}
            text="مجموع مبتلایان"
            count={guildPcrInfo.positiveMembersCount}
            loading={pcrLoading}
          />
          <Statistic
            icon={saveIcon}
            text="مجموع بهبود یافتگان"
            count={guildPcrInfo.recoveredMembersCount}
            loading={pcrLoading}
          />
          <Statistic icon={deadIcon} text="مجموع فوت‌ شدگان" count="-" />
        </div>
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            icon={vaccineIcon}
            text="مجموع واکسیناسیون"
            count={guildVacinateInfo.totalVaccinesCount}
            loading={loading}
          />
          <Statistic icon={scanIcon} text="تعداد استعلام شهروندان" count={guildInquiry.total}  loading={inquiryLoading}/>
          <Statistic icon={scanDangerIcon} text="تعداد استعلامهای نتیجه مثبت" count={guildInquiry.disqualified}  loading={inquiryLoading}/>
          <Statistic
            icon={testIcon}
            text="تعداد آزمایش های کارمندان"
            count={guildPcrInfo.testResultsCount}
            loading={pcrLoading}
          />
        </div>
      </div>
    </fieldset>
  );
};

export default OverviewGuilds;
