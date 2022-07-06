import {useEffect, useState} from 'react';

// api services
import axios from "axios";
import bakeryService from '../../../services/bakery/custom/bakery.service';

const initialBakeries = {0: 0, 1: 0, 2: 0};
const initialNumber = {
    bakery: {...initialBakeries}
};

export default function useOverviewOfInspectionNeed() {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<any>(initialNumber);
  const [error, setError] = useState(false);
  
  const {CancelToken} = axios;
  const source = CancelToken.source();

  const getBakeries = async () => {
    setLoading(true);
    try {
      const {data} = await bakeryService.bakeryReport(
        {reportName: 'inspectionNeed'},
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
    return () => {
      source.cancel('Operation canceled by the user.');
    };
  }, []);

  return {
    loading,
    list,
    error
    };
}