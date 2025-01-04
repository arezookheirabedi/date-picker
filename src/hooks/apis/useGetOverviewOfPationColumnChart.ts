import {useEffect, useState} from 'react';
import axios from 'axios';
import {useHistory, useLocation} from 'react-router-dom';
import {sideCities} from 'src/helpers/utils';
import {EERRORS} from 'src/constants/errors.enum';

export default function useGetOverviewOfPationColumnChart(
  query: any,
  hasProvince: boolean = false
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false) as any;
  const [dataset, setDataset] = useState<any>();

  const {CancelToken} = axios;
  const source = CancelToken.source();



  return {loading, error, dataset};
}
