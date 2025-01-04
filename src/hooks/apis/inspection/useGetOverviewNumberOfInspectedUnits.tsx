import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import greenPattern from 'src/assets/images/patterns/pie-green.svg';
import grayPattern from 'src/assets/images/patterns/pie-gray.svg';
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



  return {list, error, loading};
}
