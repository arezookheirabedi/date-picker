import {useEffect, useState} from 'react';
import axios from 'axios';
import arbaeenService from 'src/services/arbaeen.service';
import {sideCities} from 'src/helpers/utils';
import {useHistory, useLocation} from 'react-router-dom';
import {EBORDERS} from 'src/constants/border.enum';
import {EERRORS} from '../../constants/errors.enum';

const initialData = {
  categories: [
    EBORDERS.HAVAEE,
    EBORDERS.SHALAMCHE,
    EBORDERS.KHOSRAVI,
    EBORDERS.CHAZABE,
    EBORDERS.MEHRAN,
    EBORDERS.BASHMAGH,
    EBORDERS.TAMARCHIN,
  ],
  series: [
    {
      name: 'درصد',

      data: [
        {name: EBORDERS.HAVAEE, y: 0, color: '#3B4D59'},
        {name: EBORDERS.SHALAMCHE, y: 0, color: '#9DAF9F'},
        {name: EBORDERS.KHOSRAVI, y: 0, color: '#F4B108'},
        {name: EBORDERS.CHAZABE, y: 0, color: '#F38c06'},
        {name: EBORDERS.MEHRAN, y: 0, color: '#A0442F'},
        {name: EBORDERS.BASHMAGH, y: 0, color: '#216785'},
        {name: EBORDERS.TAMARCHIN, y: 0, color: '#191222'},
      ],
    },
  ],
} as any;

export default function useGetOverviewOfArbaeenPilgrimExistAbroadPercentage(
  query: any,
  hasProvince: boolean = false
) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(false);
  const [data, setData] = useState<any>(initialData);

  const {CancelToken} = axios;
  const source = CancelToken.source();

  const getIt = async ({retry, ...params}: any) => {
    try {
      setLoading(true);
      const res = await arbaeenService.getPligrimCountPerBorder(params, {
        cancelToken: source.token,
      });

      const border: any[] = [];
      const count: any[] = [];

      const sortData = res.data.sort((a: any, b: any) => (a.count > b.count ? 1 : -1));

      sortData.forEach((item: any) => {
        border.push(item.departureDestinationBorder);
        count.push(item.countPercentage);
      });

      const dataTemp = {
        categories: [...border],
        series: [
          {
            name: 'درصد',
            data: [
              {
                name: border[
                  border.findIndex((i: any) => {
                    return i === EBORDERS.HAVAEE;
                  })
                ],
                y: count[
                  border.findIndex((i: any) => {
                    return i === EBORDERS.HAVAEE;
                  })
                ],
                color: '#3B4D59',
              },

              {
                name: border[
                  border.findIndex((i: any) => {
                    return i === EBORDERS.SHALAMCHE;
                  })
                ],
                y: count[
                  border.findIndex((i: any) => {
                    return i === EBORDERS.SHALAMCHE;
                  })
                ],
                color: '#9DAF9F',
              },
              {
                name: border[
                  border.findIndex((i: any) => {
                    return i === EBORDERS.KHOSRAVI;
                  })
                ],
                y: count[
                  border.findIndex((i: any) => {
                    return i === EBORDERS.KHOSRAVI;
                  })
                ],
                color: '#F4B108',
              },
              {
                name: border[
                  border.findIndex((i: any) => {
                    return i === EBORDERS.CHAZABE;
                  })
                ],
                y: count[
                  border.findIndex((i: any) => {
                    return i === EBORDERS.CHAZABE;
                  })
                ],
                color: '#F38c06',
              },
              {
                name: border[
                  border.findIndex((i: any) => {
                    return i === EBORDERS.MEHRAN;
                  })
                ],
                y: count[
                  border.findIndex((i: any) => {
                    return i === EBORDERS.MEHRAN;
                  })
                ],
                color: '#A0442F',
              },
              {
                name: border[
                  border.findIndex((i: any) => {
                    return i === EBORDERS.BASHMAGH;
                  })
                ],
                y: count[
                  border.findIndex((i: any) => {
                    return i === EBORDERS.BASHMAGH;
                  })
                ],
                color: '#216785',
              },
              {
                name: border[
                  border.findIndex((i: any) => {
                    return i === EBORDERS.TAMARCHIN;
                  })
                ],
                y: count[
                  border.findIndex((i: any) => {
                    return i === EBORDERS.TAMARCHIN;
                  })
                ],
                color: '#191222',
              },
            ],
          },
        ],
      } as any;
      setData(dataTemp);
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
    if (hasProvince) {
      return;
    }
    getIt(query);
    // eslint-disable-next-line consistent-return
    return () => {
      setData(initialData);
      source.cancel('Operation canceled by the user.');
    };
  }, [query]);

  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    if (!hasProvince) {
      return;
    }
    const params = new URLSearchParams(location.search);
    const provinceName = params.get('provinceName') || ('تهران' as any);
    const existsCity = sideCities.some((item: any) => {
      return item.name === provinceName;
    });

    if (existsCity) {
      getIt({...query, province: provinceName});
    } else {
      history.go(-1);
    }
    // eslint-disable-next-line consistent-return
    return () => {
      setData(initialData);
      source.cancel('Operation canceled by the user.');
    };
  }, [location.search, query]);

  return {loading, error, data};
}
