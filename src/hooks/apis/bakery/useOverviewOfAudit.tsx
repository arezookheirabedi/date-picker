import {useEffect, useState} from 'react';

// api services
import axios from "axios";

export default function useOverviewOfAudit() {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<any>([]);
  const [filteredDataset, setFilteredDataset] = useState<any>([]);
  const [error, setError] = useState(false);
  const [count, setCount] = useState<any>(0);
  
  const {CancelToken} = axios;
  const source = CancelToken.source();

  // const overviewTestResults = async (from: any = null, to: any = null) => {


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