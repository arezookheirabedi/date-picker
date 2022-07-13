import {useEffect, useState} from 'react';

// api services
import axios from "axios";
import bakeryService from '../../../services/bakery/custom/bakery.service';

export default function useOverviewOfInvalidGuildCodeDetailProvince() {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<any>([]);
  const [error, setError] = useState(false);
  const [provinceName, setProvinceName] = useState<any>();
  const [count, setCount] = useState<any>(0);
  const {CancelToken} = axios;
  const source = CancelToken.source();

  // const overviewOfResults = async (from: any = null, to: any = null, province: any) => {
  const overviewOfResults = async (province : any) => {
    setLoading(true);
    setError(false);
    try {
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
          const sortData = normalizedData.filter(item => {
            return item.province.trim() === province
          })
          setCount(sortData.length);
          setList([...sortData]);
    } catch (err: any) {
      setError(err.message || '')
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // overviewTestResults(query.resultReceiptDateFrom, query.resultReceiptDateTo);
    return () => {
      source.cancel('Operation canceled by the user.');
      setList([]);
    };
    
  }, []);

  useEffect(() => {
    setList([])
    overviewOfResults(provinceName);
  },[provinceName])
  
  return {
    loading,
    list,
    count,
    provinceName,
    setProvinceName,
    error
    };
}