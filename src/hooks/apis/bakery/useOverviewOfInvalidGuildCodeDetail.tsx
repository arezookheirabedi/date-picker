import {useEffect, useState} from 'react';

// api services
import axios from "axios";
import bakeryService from '../../../services/bakery/custom/bakery.service';

export default function useOverviewOfInvalidGuildCodeDetail() {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<any>([]);
  const [filteredDataset, setFilteredDataset] = useState<any>([]);
  const [error, setError] = useState(false);
  const [count, setCount] = useState<any>(0);
  const {CancelToken} = axios;
  const source = CancelToken.source();

  // const overviewOfResults = async (from: any = null, to: any = null, province: any) => {
  const overviewOfResults = async () => {
    
    try {
      setLoading(true);
      setError(false);
      const { data } = await bakeryService.bakeryReport(
        { reportName: "invalidGuildCodeDetail" },
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
          province: item.province,
          city: item.city,
          simaId : item.simaId,
          guildCode: item.guildCode,
          buyerAsnafStatus: item.buyerAsnafStatus,
          nationalId : item.nationalId,
          address: item.address
        });
      });
      setCount(normalizedData.length);
      setList([...normalizedData]);
      setFilteredDataset([...normalizedData]);
    } catch (err: any) {
      setError(err.message || '')
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // overviewTestResults(query.resultReceiptDateFrom, query.resultReceiptDateTo);
    overviewOfResults();
    return () => {
      source.cancel('Operation canceled by the user.');
      setList([]);
    };
    
  }, []);

  return {
    loading,
    list,
    count,
    setCount,
    filteredDataset,
    setFilteredDataset,
    error
    };
}