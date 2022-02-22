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
import { cancelTokenSource, msgRequestCanceled, sideCities} from 'src/helpers/utils';
import vaccineService from 'src/services/vaccine.service';
import {IInitialInfo, initialInfo} from '../public/OverviewGuilds';

interface OverviewGuildsProvinceProps {
  cityTitle?: any;
}

const OverviewGuildsProvince: React.FC<OverviewGuildsProvinceProps> = ({cityTitle}) => {
  const location = useLocation();
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const [guildInfo, setGuildInfo] = useState<IInitialInfo>(initialInfo);


  const cancelToken = cancelTokenSource();

  function cancelRequest() {
    cancelToken.cancel(msgRequestCanceled);
  }


  const getGuidInfo = async (params: any) => {
    setLoading(true);
    try {
      const res = await vaccineService.membersGeneral(params, {
        cancelToken:cancelToken.token,
      });

      setGuildInfo((prev: any) => {
        return {...prev, ...res.data};
      });
      // eslint-disable-next-line
      console.log(res);
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const provinceName = params.get('provinceName') || ('تهران' as any);
    const existsCity = sideCities.some((item: any) => {
      return item.name === provinceName;
    });
    if (existsCity) {
      getGuidInfo({tag: 'guild', province: provinceName});
    } else {
      history.push('/dashboard/guild/province');
    }

    return () => {
      // source.cancel(msgRequestCanceled);
      cancelRequest() 
      
      setGuildInfo(initialInfo);
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
            count={guildInfo.totalPopulation}
            loading={loading}
          />

          <Statistic icon={sufferingIcon} text="مجموع مبتلایان" count={2800} />
          <Statistic icon={saveIcon} text="مجموع بهبود یافتگان" count={1450} />
          <Statistic icon={deadIcon} text="مجموع فوت‌ شدگان" count={1200} />
        </div>
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            icon={vaccineIcon}
            text="مجموع واکسیناسیون"
            count={guildInfo.totalVaccinesCount}
            loading={loading}
          />

          <Statistic icon={scanIcon} text="تعداد استعلام شهروندان" count={654} />
          <Statistic icon={scanDangerIcon} text="تعداد استعلامهای نتیجه مثبت" count={428} />
          <Statistic icon={testIcon} text="تعداد آزمایش های کارمندان" count={864} />
        </div>
      </div>
    </fieldset>
  );
};

export default OverviewGuildsProvince;
