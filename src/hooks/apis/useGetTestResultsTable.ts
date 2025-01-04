import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import {sideCities} from '../../helpers/utils';
import {EERRORS} from "../../constants/errors.enum";

export default function useGetTestResultsTable(query: any, hasProvince: boolean = false) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState<any>([]);
  const [orgDataset, setOrgDataset] = useState<any>([]);

  const {CancelToken} = axios;
  const source = CancelToken.source();

 


  return {loading, error, data, setData, orgDataset};
}
