import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import {sideCities} from '../../helpers/utils';
import {EERRORS} from "../../constants/errors.enum";

export default function useGetOverviewOfPatients(query: any, hasProvince: boolean = false) {
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line
  const [error, setError] = useState<any>(false);
  const [data, setData] = useState<any>([]);

 



  return {loading, error, data};
}
