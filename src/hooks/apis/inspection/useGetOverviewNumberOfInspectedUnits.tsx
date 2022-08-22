import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import greenPattern from 'src/assets/images/patterns/pie-green.svg';
import grayPattern from 'src/assets/images/patterns/pie-gray.svg';
import inspectionService from '../../../services/inspection.service';
import {sideCities} from '../../../helpers/utils';
import {EERRORS} from "../../../constants/errors.enum";

export default function useGetOverviewNumberOfInspectedUnits(hasProvince: boolean = false) {

  const initialList = [
    {title: 'واحد‌های بازرسی شده فعال', count : 54, color: '#07816C', image: greenPattern},
    {title: 'واحد‌های بازرسی شده غیرفعال', count: 32, color: '#8A8A8A', image: grayPattern}
  ] as any;

  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line
  const [error, setError] = useState<any>(false);
  const [list, setList] = useState<any>(initialList);

  const {CancelToken} = axios;
  const source = CancelToken.source();

  const getListOfInspections = async (province: any = null) => {
    setLoading(true);
    try {
      const {data: result} = await inspectionService.inspectionReport(
        {tag: 'transport', province},
        {cancelToken: source.token}
      );
      const {y1, y2} = result[0];
      setList(() => {
        return [
            {title: 'واحد‌های بازرسی شده فعال', count : y1, color: '#07816C', image: greenPattern},
            {title: 'واحد‌های بازرسی شده غیرفعال', count: y2, color: '#8A8A8A', image: grayPattern}
        ]
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
    return () => {
      setList([]);
      source.cancel('Operation canceled by the user.');
    };
  }, []);

  const location = useLocation();
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const provinceName = params.get('provinceName') || ('تهران' as any);
    const existsCity = sideCities.some((item: any) => {
      return item.name === provinceName;
    });
    if (existsCity && hasProvince) {
      getListOfInspections(provinceName);
    }
    // eslint-disable-next-line consistent-return
    return () => {
      source.cancel('Operation canceled by the user.');
      setList([]);
    };
  }, [location.search]);

  return {list, error, loading};
}
