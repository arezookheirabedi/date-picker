import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import bluePattern from 'src/assets/images/patterns/pie-blue.svg'
import yellowPattern from 'src/assets/images/patterns/pie-yellow.svg';
import greenPattern from 'src/assets/images/patterns/pie-green.svg';
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



  return {list, error, loading};
}
