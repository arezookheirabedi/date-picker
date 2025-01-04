import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import redPattern from 'src/assets/images/patterns/pie-red.svg';
import bluePattern from 'src/assets/images/patterns/pie-blue.svg';
import {sideCities} from '../../../helpers/utils';
import {EERRORS} from "../../../constants/errors.enum";

export default function useGetOverviewStatusOfListPrice(hasProvince: boolean = false) {

  const initialList = [
    {title: 'واحد‌های بازرسی نصب شده', count: 54, color: '#175A76', image: bluePattern},
    {title: 'واحد‌های بازرسی نصب نشده', count: 32, color: '#C20A0C', image: redPattern}
  ] as any;

  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line
  const [error, setError] = useState<any>(false);
  const [list, setList] = useState<any>(initialList);

  const {CancelToken} = axios;
  const source = CancelToken.source();



  const location = useLocation();
 

  return {list, error, loading};
}
