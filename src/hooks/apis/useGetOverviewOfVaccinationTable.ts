import {useEffect, useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import axios from 'axios';
import hcsService from '../../services/hcs.service';
import {sideCities} from '../../helpers/utils';
import {EERRORS} from "../../constants/errors.enum";

export default function useGetOverviewOfVaccinationTable(query: any, hasProvince: boolean = false) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState<any>([]);
  const [orgDataset, setOrgDataset] = useState<any>([]);

  const {CancelToken} = axios;
  const source = CancelToken.source();

  const getIt = async ({retry, ...params}: any) => {
    setLoading(true);
    setError(false);
    try {
      const {data: result} = await hcsService.getVaccinationOverview(
        {
          ...params,
          lang: 'fa',
        },
        {cancelToken: source.token}
      );
      const normalizedData: any[] = [];
      result.forEach((item: any, index: number) => {
        // eslint-disable-next-line

        normalizedData.push({
          id: `ovvac_${index}`,
          name: item.categoryValue,
          firstDosePercentage: item.dosesToMembersCountPercentage[1],
          secondDosePercentage: item.dosesToMembersCountPercentage[2],
          thirdDosePercentage: item.dosesToMembersCountPercentage[3],
          otherDose: item.gtDosesToTotalDosesPercentage[3],
          unknownInformation: 0,
          allDosesPercentage:
            item.gtDosesToTotalDosesPercentage[0] -
              item.totalNonVaccinesCountToMembersCountPercentage || 0,
          allDoses: item.gtDoses['0'] || 0,
          noDose: item.totalNonVaccinesCountToMembersCountPercentage,
          // twoDoseVaccine: twoDoseVaccine ? (twoDoseVaccine * 100) / total : 0,
          // fullDoseVaccine: fullDoseVaccine ? (fullDoseVaccine * 100) / total : 0,
          // // eslint-disable-next-line
          // notVaccine: item.doseCountMap
          //   ? item.doseCountMap[0]
          //     ? (item.doseCountMap[0] * 100) / total
          //     : 0
          //   : 0,
        });
      });

      setData([...normalizedData]);
      setOrgDataset([...normalizedData]);
      setError(false)
      setLoading(false);
      // setFilterType({name: 'کمترین', enName: 'LOWEST'});
    } catch (err: any) {
      if (err.message === 'cancel') {
        setLoading(true);
        return;
      }
      setError(err.message || EERRORS.ERROR_500);
      setLoading(false);
    }
  };

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

  const location = useLocation();
  const history = useHistory();

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
      getIt({...query, province: provinceName});
    } else {
      history.go(-1);
    }
    // eslint-disable-next-line consistent-return
    return () => {
      setData([]);
      source.cancel('Operation canceled by the user.');
    };
  }, [location.search, query]);

  return {loading, error, data, setData, orgDataset};
}
