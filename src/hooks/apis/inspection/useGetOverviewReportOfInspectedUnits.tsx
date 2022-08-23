import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import bluePattern from 'src/assets/images/patterns/pie-blue.svg'
import yellowPattern from 'src/assets/images/patterns/pie-yellow.svg';
import greenPattern from 'src/assets/images/patterns/pie-green.svg';
import inspectionService from '../../../services/inspection.service';
import {sideCities} from '../../../helpers/utils';
import {EERRORS} from "../../../constants/errors.enum";

export default function useGetOverviewReportOfInspectedUnits(hasProvince: boolean = false) {

  const initialList = [
    {title: 'میزان پخت', count: 54, color: '#175A76', image: bluePattern},
    {title: 'آرد فروشی', count: 32, color: '#F3BC06', image: yellowPattern},
    {title: 'سایر', count: 32, color: '#209F92', image: greenPattern}
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
      const {y1, y2, y3} = result[0];
      setList(() => {
        return [
            {title: 'میزان پخت', count: y1, color: '#175A76', image: bluePattern},
            {title: 'آرد فروشی', count: y2, color: '#F3BC06', image: yellowPattern},
            {title: 'سایر', count: y3, color: '#209F92', image: greenPattern}
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
