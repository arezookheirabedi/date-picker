import {useEffect, useState} from 'react';

// api services
import axios from "axios";

export default function useOverviewOfActiveTime() {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<any>([]);
  const [error, setError] = useState(null);

  const {CancelToken} = axios;
  const source = CancelToken.source();

  // const getColumnChartTestResult = async (params: any) => {

// }, [query]);
  
  return {loading, list, error};
}