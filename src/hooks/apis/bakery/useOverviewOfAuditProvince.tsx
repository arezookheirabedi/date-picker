import {useEffect, useState} from 'react';

// api services
import axios from "axios";

export default function useOverviewOfAuditProvince() {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<any>([]);
  const [filteredDataset, setFilteredDataset] = useState<any>([]);
  const [error, setError] = useState(false);
  const [count, setCount] = useState<any>(0);
  const [provinceName, setProvinceName] = useState<any>();

  const {CancelToken} = axios;
  const source = CancelToken.source();

  // const overviewOfResults = async (from: any = null, to: any = null, province: any) => {

  
  return {
    loading,
    list,
    count,
    setCount,
    filteredDataset,
    setFilteredDataset,
    provinceName,
    setProvinceName,
    error
    };
}