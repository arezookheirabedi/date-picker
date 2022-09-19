import {useEffect, useState} from 'react';
import axios from 'axios';
import arbaeenService from 'src/services/arbaeen.service';
import {toPersianDigit} from 'src/helpers/utils';
import dayjs from 'dayjs';
import {EREGION} from 'src/constants/region.enum';
import {ECOLOR} from 'src/constants/color.enum';
import {EERRORS} from '../../constants/errors.enum';

export default function useGetOverviewPilgrimExistAndEntrancePerRegion(query: any) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(false);
  const [data, setData] = useState<any>([]);
  const {CancelToken} = axios;
  const source = CancelToken.source();

  const getTime = (value: string) => {
    const date = toPersianDigit(dayjs(value).calendar('jalali').format('YYYY/MM/DD HH:mm'));
    return date;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getIt = async ({retry, ...params}: any) => {
    setLoading(true);
    try {
      const {data: result} = await arbaeenService.getEntranceAxndExistanceRegion(params, {
        cancelToken: source.token,
      });

      const date: any[] = [];
      const ghasrshirin: any[] = [];
      const khoramshahr: any[] = [];
      const pMehran: any[] = [];
      const mehran: any[] = [];
      const pChazabe: any[] = [];
      const pBashmagh: any[] = [];
      const pKhosravi: any[] = [];
      const pTamarchin: any[] = [];
      const pShalamche: any[] = [];

      result.forEach((item: any) => {
        date.push(getTime(item.submitTime));
        /* 
regionId: 1750001, regionName: "خرمشهر"
regionId: 500001, regionName: "پایانه مرزی شلمچه",
regionId: 250001, regionName: "پایانه مرزی مهران",
regionId: 1500001, regionName: "مهران",
regionId: 1250001, regionName: "قصر شیرین",
regionId: 750001, regionName: "پایانه مرزی چذابه",
regionId: 300001, regionName: "پایانه مرزی باشماق",
regionId: 1, regionName: "پایانه مرزی خسروی",
regionId: 500002, regionName: "پایانه مرزی تمرچین", 

*/
        item.regions.forEach((i: any) => {
          if (Number(i.regionId) === 1250001) {
            ghasrshirin.push(i.samahCount);
          }
          if (Number(i.regionId) === 1750001) {
            khoramshahr.push(i.samahCount);
          }
          if (Number(i.regionId) === 250001) {
            pMehran.push(i.samahCount);
          }
          if (Number(i.regionId) === 1500001) {
            mehran.push(i.samahCount);
          }
          if (Number(i.regionId) === 750001) {
            pChazabe.push(i.samahCount);
          }
          if (Number(i.regionId) === 300001) {
            pBashmagh.push(i.samahCount);
          }
          if (Number(i.regionId) === 1) {
            pKhosravi.push(i.samahCount);
          }
          if (Number(i.regionId) === 500002) {
            pTamarchin.push(i.samahCount);
          }
          if (Number(i.regionId) === 500001) {
            pShalamche.push(i.samahCount);
          }
        });
      });
      setData(() => {
        return {
          categories: [...date],

          series: [
            {
              name: EREGION.MEHRAN,
              marker: {
                fillColor: 'transparent',
                lineColor: ECOLOR.COLOR0,
              },
              data: [...mehran],
            },
            {
              name: EREGION.PAYANE_MEHRAN,
              marker: {
                fillColor: 'transparent',
                lineColor: ECOLOR.COLOR1,
              },
              data: [...pMehran],
            },
            {
              name: EREGION.PAYANE_SHALAMCHE,
              marker: {
                fillColor: 'transparent',
                lineColor: ECOLOR.COLOR2,
              },
              data: [...pShalamche],
            },

            {
              name: EREGION.KHORAMSHAR,
              marker: {
                fillColor: 'transparent',
                lineColor: ECOLOR.COLOR3,
              },
              data: [...khoramshahr],
            },

            {
              name: EREGION.PAYANE_CHAZABE,
              marker: {
                fillColor: 'transparent',
                lineColor: ECOLOR.COLOR4,
              },
              data: [...pChazabe],
            },
            {
              name: EREGION.GHASRSHIRIN,
              marker: {
                fillColor: 'transparent',
                lineColor: ECOLOR.COLOR5,
              },
              data: [...ghasrshirin],
            },
            {
              name: EREGION.PAYANE_KHOSRAVI,
              marker: {
                fillColor: 'transparent',
                lineColor: ECOLOR.COLOR6,
              },
              data: [...pKhosravi],
            },
            {
              name: EREGION.PAYANE_BASHMAGH,
              marker: {
                fillColor: 'transparent',
                lineColor: ECOLOR.COLOR6,
              },
              data: [...pBashmagh],
            },

            {
              name: EREGION.PAYANE_TAMARCHIN,
              marker: {
                fillColor: 'transparent',
                lineColor: ECOLOR.COLOR7,
              },
              data: [...pTamarchin],
            },
          ],
        };
      });
      setError(false);
      setLoading(false);
    } catch (err: any) {
      if (err.message === 'cancel') {
        setLoading(true);
        return;
      }
      setError(err.message || EERRORS.ERROR_500);
      setLoading(false);
    }
  };

  useEffect(() => {
    getIt(query);
    setInterval(() => {
      getIt(query);
    }, 60000 * 5);
    return () => {
      setData([]);
      source.cancel('Operation canceled by the user.');
    };
  }, [query]);

  return {loading, error, data};
}
