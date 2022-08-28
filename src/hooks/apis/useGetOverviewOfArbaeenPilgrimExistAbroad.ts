import {useEffect, useState} from 'react';
import axios from 'axios';
import arbaeenService from 'src/services/arbaeen.service';
import {sideCities} from 'src/helpers/utils';
import {useHistory, useLocation} from 'react-router-dom';
import {EERRORS} from '../../constants/errors.enum';

const initialData = {
  categories: ['هوایی', 'مرز شلمچه', 'مرز خسروی', 'مرز چزابه ', 'مرز مهران'],
  series: [
    {
      name: 'تعداد',

      data: [
        {name: 'هوایی', y: 0, color: '#209F92'},
        {name: 'شلمچه', y: 0, color: '#004D65'},
        {name: 'خسروی', y: 0, color: '#BFDDE7'},
        {name: 'چزابه', y: 0, color: '#716DE3'},
        {name: 'مهران', y: 0, color: '#FF0060'},
        {name: 'باشماق', y: 0, color: '#F3BC06'},
        {name: 'تمرچین', y: 0, color: '#8800ff'},
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
        count.push(item.count);
      });

      const dataTemp = {
        categories: [...border],
        series: [
          {
            name: 'تعداد',
            data: [
              {
                name: border[
                  border.findIndex((i: any) => {
                    return i === 'هوایی';
                  })
                ],
                y: count[
                  border.findIndex((i: any) => {
                    return i === 'هوایی';
                  })
                ],
                color: '#209F92',
              },

              {
                name: border[
                  border.findIndex((i: any) => {
                    return i === 'شلمچه';
                  })
                ],
                y: count[
                  border.findIndex((i: any) => {
                    return i === 'شلمچه';
                  })
                ],
                color: '#004D65',
              },
              {
                name: border[
                  border.findIndex((i: any) => {
                    return i === 'خسروی';
                  })
                ],
                y: count[
                  border.findIndex((i: any) => {
                    return i === 'خسروی';
                  })
                ],
                color: '#BFDDE7',
              },
              {
                name: border[
                  border.findIndex((i: any) => {
                    return i === 'چزابه';
                  })
                ],
                y: count[
                  border.findIndex((i: any) => {
                    return i === 'چزابه';
                  })
                ],
                color: '#716DE3',
              },
              {
                name: border[
                  border.findIndex((i: any) => {
                    return i === 'مهران';
                  })
                ],
                y: count[
                  border.findIndex((i: any) => {
                    return i === 'مهران';
                  })
                ],
                color: '#FF0060',
              },
              {
                name: border[
                  border.findIndex((i: any) => {
                    return i === 'باشماق';
                  })
                ],
                y: count[
                  border.findIndex((i: any) => {
                    return i === 'باشماق';
                  })
                ],
                color: '#F3BC06',
              },
              {
                name: border[
                  border.findIndex((i: any) => {
                    return i === 'تمرچین';
                  })
                ],
                y: count[
                  border.findIndex((i: any) => {
                    return i === 'تمرچین';
                  })
                ],
                color: '#8800ff',
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
