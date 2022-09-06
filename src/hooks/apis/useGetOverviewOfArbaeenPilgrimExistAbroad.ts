import {useEffect, useState} from 'react';
import axios from 'axios';
import arbaeenService from 'src/services/arbaeen.service';
import {sideCities} from 'src/helpers/utils';
import {useHistory, useLocation} from 'react-router-dom';
import {EBORDERS} from 'src/constants/border.enum';
import {ECOLOR} from 'src/constants/color.enum';
import {EERRORS} from '../../constants/errors.enum';

const initialDataCount = {
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
      name: 'تعداد',

      data: [
        {name: EBORDERS.HAVAEE, y: 0, color: ECOLOR.COLOR4},
        {name: EBORDERS.SHALAMCHE, y: 0, color: ECOLOR.COLOR3},
        {name: EBORDERS.KHOSRAVI, y: 0, color: ECOLOR.COLOR2},
        {name: EBORDERS.CHAZABE, y: 0, color: ECOLOR.COLOR1},
        {name: EBORDERS.MEHRAN, y: 0, color: ECOLOR.COLOR7},
        {name: EBORDERS.BASHMAGH, y: 0, color: ECOLOR.COLOR5},
        {name: EBORDERS.TAMARCHIN, y: 0, color: ECOLOR.COLOR6},
      ],
    },
  ],
} as any;

const initialDataPercentage = {
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
        {name: EBORDERS.HAVAEE, y: 0, color: ECOLOR.COLOR4},
        {name: EBORDERS.SHALAMCHE, y: 0, color: ECOLOR.COLOR3},
        {name: EBORDERS.KHOSRAVI, y: 0, color: ECOLOR.COLOR2},
        {name: EBORDERS.CHAZABE, y: 0, color: ECOLOR.COLOR1},
        {name: EBORDERS.MEHRAN, y: 0, color: ECOLOR.COLOR7},
        {name: EBORDERS.BASHMAGH, y: 0, color: ECOLOR.COLOR5},
        {name: EBORDERS.TAMARCHIN, y: 0, color: ECOLOR.COLOR6},
      ],
    },
  ],
} as any;
export default function useGetOverviewOfArbaeenPilgrimExistAbroad(
  query: any,
  hasProvince: boolean = false
) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(false);
  const [dataCount, setDataCount] = useState<any>(initialDataCount);
  const [dataPercentage, setDataPercentage] = useState<any>(initialDataPercentage);

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
      const countPercentage: any[] = [];

      const sortDataCount = res.data.sort((a: any, b: any) => (a.count > b.count ? 1 : -1));

      sortDataCount.forEach((item: any) => {
        border.push(item.departureDestinationBorder);
        count.push(item.count);
        countPercentage.push(item.countPercentage);
      });

      const dataTempCount = {
        categories: [...border],
        series: [
          {
            name: 'تعداد',
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
                color: ECOLOR.COLOR4,
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
                color: ECOLOR.COLOR3,
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
                color: ECOLOR.COLOR2,
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
                color: ECOLOR.COLOR1,
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
                color: ECOLOR.COLOR7,
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
                color: ECOLOR.COLOR5,
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
                color: ECOLOR.COLOR6,
              },
            ],
          },
        ],
      } as any;
      setDataCount(dataTempCount);
      const dataTempPercentage = {
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
                y: countPercentage[
                  border.findIndex((i: any) => {
                    return i === EBORDERS.HAVAEE;
                  })
                ],
                color: ECOLOR.COLOR4,
              },

              {
                name: border[
                  border.findIndex((i: any) => {
                    return i === EBORDERS.SHALAMCHE;
                  })
                ],
                y: countPercentage[
                  border.findIndex((i: any) => {
                    return i === EBORDERS.SHALAMCHE;
                  })
                ],
                color: ECOLOR.COLOR3,
              },
              {
                name: border[
                  border.findIndex((i: any) => {
                    return i === EBORDERS.KHOSRAVI;
                  })
                ],
                y: countPercentage[
                  border.findIndex((i: any) => {
                    return i === EBORDERS.KHOSRAVI;
                  })
                ],
                color: ECOLOR.COLOR2,
              },
              {
                name: border[
                  border.findIndex((i: any) => {
                    return i === EBORDERS.CHAZABE;
                  })
                ],
                y: countPercentage[
                  border.findIndex((i: any) => {
                    return i === EBORDERS.CHAZABE;
                  })
                ],
                color: ECOLOR.COLOR1,
              },
              {
                name: border[
                  border.findIndex((i: any) => {
                    return i === EBORDERS.MEHRAN;
                  })
                ],
                y: countPercentage[
                  border.findIndex((i: any) => {
                    return i === EBORDERS.MEHRAN;
                  })
                ],
                color: ECOLOR.COLOR7,
              },
              {
                name: border[
                  border.findIndex((i: any) => {
                    return i === EBORDERS.BASHMAGH;
                  })
                ],
                y: countPercentage[
                  border.findIndex((i: any) => {
                    return i === EBORDERS.BASHMAGH;
                  })
                ],
                color: ECOLOR.COLOR5,
              },
              {
                name: border[
                  border.findIndex((i: any) => {
                    return i === EBORDERS.TAMARCHIN;
                  })
                ],
                y: countPercentage[
                  border.findIndex((i: any) => {
                    return i === EBORDERS.TAMARCHIN;
                  })
                ],
                color: ECOLOR.COLOR6,
              },
            ],
          },
        ],
      } as any;
      setDataPercentage(dataTempPercentage);
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
      setDataCount(initialDataCount);
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
      setDataCount(initialDataCount);
      source.cancel('Operation canceled by the user.');
    };
  }, [location.search, query]);

  return {loading, error, dataCount, dataPercentage};
}
