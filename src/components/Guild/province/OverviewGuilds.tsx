import React, {useEffect, useState} from 'react';
import Statistic from 'src/containers/Guild/components/Statistic';
import saveIcon from 'src/assets/images/icons/save-color.svg';
import deadIcon from 'src/assets/images/icons/dead-color.svg';
import sufferingIcon from 'src/assets/images/icons/suffering-color.svg';
import guildIcon from 'src/assets/images/icons/guild-color.svg';
import vaccineIcon from 'src/assets/images/icons/vaccine-color.svg';
import scanIcon from 'src/assets/images/icons/scan-color.svg';
import scanDangerIcon from 'src/assets/images/icons/scan-danger-color.svg';
import testIcon from 'src/assets/images/icons/test-color.svg';
import {useHistory, useLocation} from 'react-router-dom';
import {cancelTokenSource, msgRequestCanceled, sideCities} from 'src/helpers/utils';
import vaccineService from 'src/services/vaccine.service';
import guildService from 'src/services/guild.service';
import {
  IInitialInquiry,
  IInitialPcrInfo,
  IInitialVacinatelInfo,
  initialInquiry,
  initialPcrInfo,
  initialVacinatelInfo,
} from '../public/constant';

interface OverviewGuildsProvinceProps {
  cityTitle?: any;
}

const OverviewGuildsProvince: React.FC<OverviewGuildsProvinceProps> = ({cityTitle}) => {
  const location = useLocation();
  const history = useHistory();
  const [inquiryLoading, setInquiryLoading] = useState<boolean>(false);
  const[guildInquiry,setGuildInquiry]=useState<IInitialInquiry>(initialInquiry)
  const [loading, setLoading] = useState<boolean>(false);
  const [guildVacinateInfo, setGuildVacinateInfo] =
    useState<IInitialVacinatelInfo>(initialVacinatelInfo);
  const [pcrLoading, setPcrLoading] = useState<boolean>(false);
  const [guildPcrInfo, setGuildPcrInfo] = useState<IInitialPcrInfo>(initialPcrInfo);

  const cancelToken = cancelTokenSource();

  function cancelRequest() {
    cancelToken.cancel(msgRequestCanceled);
  }

  const getGuildVacinateInfo = async (params: any) => {
    setLoading(true);
    try {
      const res = await vaccineService.membersGeneral(params, {
        cancelToken: cancelToken.token,
      });
      if (res.status === 200) {
        const newData = {...guildVacinateInfo, ...res.data};
        setGuildVacinateInfo(newData);
      } // eslint-disable-next-line
      console.log(res);
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const getPcrResult = async (params: any): Promise<any> => {
    setPcrLoading(true);
    try {
      const res = await guildService.guildTestResult(params, {cancelToken: cancelToken.token});
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
  const getInquiry=async(params:any)=>{
    setInquiryLoading(true)
   try {
    const res = await guildService.guildInquiry(params,{cancelToken: cancelToken.token})
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
    const params = new URLSearchParams(location.search);
    const provinceName = params.get('provinceName') || ('تهران' as any);
    const existsCity = sideCities.some((item: any) => {
      return item.name === provinceName;
    });
    if (existsCity) {
      getInquiry({province: provinceName ,total:true,disqualified:true})
      getPcrResult({tag: 'guild', province: provinceName});
      getGuildVacinateInfo({tag: 'guild', province: provinceName});
    } else {
      history.push('/dashboard/guild/province');
    }

    return () => {
      cancelRequest();
      setGuildVacinateInfo(initialVacinatelInfo);
      setGuildPcrInfo(initialPcrInfo);
      setGuildInquiry(initialInquiry)
    };
  }, [location.search]);

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16" id="guild-overview">
      <legend className="text-black mx-auto px-3">نگاه کلی اصناف در استان {cityTitle}</legend>

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

          <Statistic icon={scanIcon} text="تعداد استعلام شهروندان" count={guildInquiry.total}  loading={inquiryLoading} />
          <Statistic icon={scanDangerIcon} text="تعداد استعلامهای نتیجه مثبت" count={guildInquiry.disqualified}  loading={inquiryLoading} />
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

export default OverviewGuildsProvince;
