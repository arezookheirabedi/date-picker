import {useEffect, useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import axios from 'axios';
import hcsService from '../../services/hcs.service';
import {convertGregorianDateToJalaliDate, sideCities} from '../../helpers/utils';
import {EERRORS} from '../../constants/errors.enum';

const initialData = {
  categories: [],
  series: [
    {
      name: 'دوز اول',
      data: [],
    },
    {
      name: 'دوز دوم',
      data: [],
    },
    {
      name: 'دوز سوم',
      data: [],
    },
    {
      name: 'دوز چهارم',
      data: [],
    },
    {
      name: 'دوز پنجم',
      data: [],
    },
  ],
} as any;

export default function useGetOverviewOfTheVaccinationProcess(
  query: any,
  hasProvince: boolean = false
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false) as any;
  const [data, setData] = useState<any[]>(initialData) as any;

  const {CancelToken} = axios;
  const source = CancelToken.source();

  // eslint-disable-next-line
  const getIt = async ({retry, ...params}: any) => {
    setLoading(true);
    setError(null);
    try {
      const {data: result} = await hcsService.accumulativeVaccinesTimeBasedReport(params, {
        cancelToken: source.token,
      });

      const categories: any[] = [];

      // eslint-disable-next-line
      let firstDose: any[] = [];
      // eslint-disable-next-line
      let secondDose: any[] = [];
      // eslint-disable-next-line
      let thirdDose: any[] = [];
      // eslint-disable-next-line
      let forthDose: any[] = [];
      // eslint-disable-next-line
      let fifthDose: any[] = [];
      const initialDoses = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0};
      result.forEach((item: any) => {
        // eslint-disable-next-line
        for (const [key, value] of Object.entries({...initialDoses, ...item.doses})) {
          // console.log(key)
          if (Number(key) === 1) {
            firstDose.push(Number(value));
          }

          if (Number(key) === 2) {
            secondDose.push(Number(value));
          }

          if (Number(key) === 3) {
            thirdDose.push(Number(value));
          }

          if (Number(key) === 4) {
            forthDose.push(Number(value));
          }

          if (Number(key) === 5) {
            fifthDose.push(Number(value));
          }

          // if (firstDose.length <= index + 1) firstDose.push(0);
          // if (secondDose.length <= index + 1) secondDose.push(0);
          // if (thirdDose.length <= index + 1) thirdDose.push(0);
          // if (forthDose.length <= index + 1) forthDose.push(0);
          // if (fifthDose.length <= index + 1) fifthDose.push(0);
        }
        categories.push(convertGregorianDateToJalaliDate(item.date));
      });

      // const initialData = {
      //   categories: [],
      //   series: [{
      //     name: 'دوز اول',
      //     data: []
      //   }, {
      //     name: 'دوز دوم',
      //     data: []
      //   }, {
      //     name: 'دوز سوم',
      //     data: []
      //   }, {
      //     name: 'دوز چهارم',
      //     data: []
      //   }, {
      //     name: 'دوز پنجم',
      //     data: []
      //   }]
      // } as any;

      setData(() => {
        return {
          categories,
          series: [
            {
              name: 'دوز اول',
              data: [...firstDose],
            },
            {
              name: 'دوز دوم',
              data: [...secondDose],
            },
            {
              name: 'دوز سوم',
              data: [...thirdDose],
            },
            {
              name: 'دوز چهارم',
              data: [...forthDose],
            },
            {
              name: 'دوز پنجم',
              data: [...fifthDose],
            },
          ],
        };
      });

      setError(false);
      setLoading(false);

      // setDataset([
      //   {
      //     name: 'واکسن نزده',
      //     color: '#FF0060',
      //     data: [...noDose],
      //   },
      //   {
      //     name: 'دوز اول',
      //     color: '#F3BC06',
      //     data: [...firstDose],
      //   },
      //   {
      //     name: 'دوز دوم',
      //     color: '#209F92',
      //     data: [...secondDose],
      //   },
      //   {
      //     name: 'دوز سوم',
      //     color: '#004D65',
      //     data: [...thirdDose],
      //   },
      //   {
      //     name: 'بیش از ۳ دوز',
      //     color: '#BFDDE7',
      //     data: [...moreThanThreeDose],
      //   },
      // ]);
      // setCategories([...provinces]);
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
      source.cancel('Operation canceled by the user.');
      setData(initialData);
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
