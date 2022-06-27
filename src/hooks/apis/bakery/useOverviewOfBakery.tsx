import {useEffect, useState} from 'react';

// api services
import axios from "axios";
import bakeryService from '../../../services/bakery/custom/bakery.service';

const initialBakeries = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0};
const initialNumber = {
  bakery: {...initialBakeries}
};

export default function useOverviewOfBakery() {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<any>(initialNumber);
  const [error, setError] = useState(false);
  const [count, setCount] = useState<any>(0);
  
  const {CancelToken} = axios;
  const source = CancelToken.source();

  // get count of inspections
  const getCount = async () => {
    setLoading(true);
    setError(false)
    try {
      const {data} = await bakeryService.bakeryCount(
        {tag: 'transparent'},
        {cancelToken: source.token}
      );
      setCount(data)
    } catch (err: any) {
        setError(err.message || '')
    } finally {
      setLoading(false);
    }
  }

  const getBakeries = async () => {
    setLoading(true);
    setError(false);
    try {
        const {data} = await bakeryService.bakeryReport(
            {reportName: "general"},
            {cancelToken: source.token}
        );
        const temp = [] as any;
        data.map((res: any) => {
            temp.push(res.value)
            return temp;
        });
        setList({bakery: {...temp}})
    } catch (err: any) {
      setError(err.message || '')
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBakeries();
    getCount()
    return () => {
      source.cancel('Operation canceled by the user.');
    };
  }, []);

  return {
    loading,
    list,
    count,
    error
    };
}