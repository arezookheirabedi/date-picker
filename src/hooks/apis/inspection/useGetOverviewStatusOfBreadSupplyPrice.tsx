import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import greenPattern from 'src/assets/images/patterns/pie-green.svg';
import orangePattern from 'src/assets/images/patterns/pie-orange.svg';
import {sideCities} from '../../../helpers/utils';
import {EERRORS} from "../../../constants/errors.enum";

export default function useGetOverviewStatusOfBreadSupplyPrice(hasProvince: boolean = false) {

  const initialList = [
    {title: 'واحد‌های به قیمت مصوب', count : 23, color: '#07816C', image: greenPattern},
    {title: 'واحد‌های به قیمت غیر مصوب', count: 74, color: '#F38C06', image: orangePattern}
  ] as any;

  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line
  const [error, setError] = useState<any>(false);
  const [list, setList] = useState<any>(initialList);

  const {CancelToken} = axios;
  const source = CancelToken.source();



  return {list, error, loading};
}
