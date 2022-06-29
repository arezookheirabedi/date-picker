import {useEffect, useState} from "react";
import {useHistory, useLocation} from "react-router-dom";
import axios from "axios";
import hcsService from "../../services/hcs.service";
import {sideCities} from "../../helpers/utils";

export default function useGetOverviewOfCategories(query: any, hasProvince : boolean = false) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState<any>([]);
  const [orgDataset, setOrgDataset] = useState<any>([]);

  const {CancelToken} = axios;
  const source = CancelToken.source();

  const getIt = async (params: any) => {
    setLoading(true);
    setError(false);
    try {
      setLoading(true);
      const {data: result} = await hcsService.getTableOverviewTestResults({
        ...params,
        lang: 'fa',
      }, {cancelToken: source.token});

      const normalizedData: any[] = [];
      result.forEach((item: any, index: number) => {
        // if (item.total !== 0) {
        normalizedData.push({
          id: `ovca_${index}`,
          name: item.categoryValue,
          employeesCount: item.membersCount || 0,
          infectedCount: item.positiveMembersCount || 0,
          infectedPercent: item.positiveMembersCountToMembersCountPercentage || 0,
          saveCount: item.recoveredMembersCount || 0,
          // deadCount: 120,
        });

      });
      setData([...normalizedData]);
      setOrgDataset([...normalizedData]);
      // setFilterType({name: 'بیشترین', enName: 'HIGHEST'});
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (hasProvince) {
      return;
    }
    getIt(query);
    // eslint-disable-next-line consistent-return
    return () => {
      source.cancel('Operation canceled by the user.');
      setData([]);
    };
  }, [query]);

  useEffect(() => {
    if (!hasProvince) {
      return;
    }
    const params = new URLSearchParams(location.search);
    const provinceName = params.get('provinceName') || ('تهران' as any);
    const existsCity = sideCities.some((item: any) => {
      return item.name === provinceName;
    });
    if (existsCity) {
      getIt({...query, 'province': provinceName});

    } else {
      history.push('/dashboard/health/transport/province');
    }
    // eslint-disable-next-line consistent-return
    return () => {
      source.cancel('Operation canceled by the user.');
      setData([]);
    };
  }, [location.search, query]);



  return {loading, error, data, setData, orgDataset};
}