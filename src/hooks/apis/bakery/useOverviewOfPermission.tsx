import {useEffect, useState} from 'react';

// api services
import axios from "axios";
import bakeryService from '../../../services/bakery/custom/bakery.service';

export default function useOverviewOfPermission() {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<any>([]);
  const [error, setError] = useState(false);

  const {CancelToken} = axios;
  const source = CancelToken.source();

  // const overviewOfResults = async (from: any = null, to: any = null, province: any) => {
  const overviewOfResults = async () => {
    try {
      setLoading(true);
      setError(false);
      const { data } = await bakeryService.bakeryReport(
        { reportName: "permission" },
        { cancelToken: source.token }
      );
      // const {data} = await bakeryService.bakeryAudit({
      //   lang: 'fa',
      //   // from,
      //   // to,
      // });
      const normalizedData: any[] = [];
      data.forEach((item: any, index: number) => {
        // if (item.total !== 0) {
        normalizedData.push({
          id: `ovca_${index}`,
          ...item
        });
      });
      setList([...normalizedData]);
    } catch (err: any) {
      setError(err.message || '')
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // overviewTestResults(query.resultReceiptDateFrom, query.resultReceiptDateTo);
    overviewOfResults()
    return () => {
      source.cancel('Operation canceled by the user.');
      setList([]);
    };
    
  }, []);
  
  return {loading, list, error};
}