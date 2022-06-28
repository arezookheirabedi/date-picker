import {useEffect, useState} from 'react';
import axios from 'axios';
import hcsService from '../../services/hcs.service';

export default function useGetOverviewOfVaccinationTable(query: any) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState<any>([]);
  const [orgDataset, setOrgDataset] = useState<any>([]);

  const {CancelToken} = axios;
  const source = CancelToken.source();

  const getOverviewByVaccine = async (params: any) => {
    setLoading(true);
    try {
      const {data: result} = await hcsService.getVaccinationOverview({...params, lang: 'fa'});
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
      // setFilterType({name: 'کمترین', enName: 'LOWEST'});
    } catch (e: any) {
      setError(e.message || '');
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOverviewByVaccine(query);
    return () => {
      source.cancel('Operation canceled by the user.');
    };
  }, [query]);

  return {loading, error, data, setData, orgDataset};
}
