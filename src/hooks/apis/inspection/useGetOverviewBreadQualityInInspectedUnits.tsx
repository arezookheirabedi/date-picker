import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import greenPattern from 'src/assets/images/patterns/pie-green.svg';
import yellowPattern from 'src/assets/images/patterns/pie-yellow.svg';
import redPattern from 'src/assets/images/patterns/pie-red.svg';
import {sideCities} from '../../../helpers/utils';
import {EERRORS} from "../../../constants/errors.enum";

export default function useGetOverviewBreadQualityInInspectedUnits(hasProvince: boolean = false) {

  const initialList = [
    {title: 'خوب', count: 54, color: '#07816C', image: greenPattern},
    {title: 'متوسط', count: 32, color: '#F3BC06', image: yellowPattern},
    {title: 'ضعیف', count: 32, color: '#C20A0C', image: redPattern}
  ] as any;

  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line
  const [error, setError] = useState<any>(false);
  const [list, setList] = useState<any>(initialList);

  const {CancelToken} = axios;
  const source = CancelToken.source();


  return {list, error, loading};
}
