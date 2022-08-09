import {useEffect, useState} from 'react';

// api services
import axios from "axios";
import inspectionService from '../../services/inspection.service';

export default function useOverviewListOfInspections() {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<any>([]);
  const [filteredDataset, setFilteredDataset] = useState<any>([]);
  const [error, setError] = useState(false);
  const [count, setCount] = useState<any>(0);
  
  const {CancelToken} = axios;
  const source = CancelToken.source();

  const overviewOfResults = async () => {
    try {
        setLoading(true);
        setError(false);
        const {data} = await inspectionService.inspectionAll();
        const normalizedData: any[] = [];
        data.forEach((item: any, index: number) => {
          normalizedData.push({
              id: `ovca_${index}`,
              ...item,
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