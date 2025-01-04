import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import {sideCities} from '../../../helpers/utils';
import {EERRORS} from "../../../constants/errors.enum";
import bluePattern from "../../../assets/images/patterns/pie-blue.svg";
import redPattern from "../../../assets/images/patterns/pie-red.svg";
import greenPattern from "../../../assets/images/patterns/pie-green.svg";
import orangePattern from "../../../assets/images/patterns/pie-orange.svg";
import yellowPattern from "../../../assets/images/patterns/pie-yellow.svg";
import grayPattern from "../../../assets/images/patterns/pie-gray.svg"

export default function useGetOverviewInspectionStatus(query: any, hasProvince: boolean = false) {
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line
  const [error, setError] = useState<any>(false);
  const [data, setData] = useState<any>([]);
  const [overviewOfTheReportOfInspectedUnitsInTheWholeCountry, setOverviewOfTheReportOfInspectedUnitsInTheWholeCountry] = useState<any>([]);
  const [overviewOfTheNumberOfActiveAndInactiveInspectedUnitsOfTheEntireCountry, setOverviewOfTheNumberOfActiveAndInactiveInspectedUnitsOfTheEntireCountry] = useState<any>([]);
  const [overviewOfTheReportOfInspectedUnitsInTheWholeCountryColumnChart, setOverviewOfTheReportOfInspectedUnitsInTheWholeCountryColumnChart] = useState<any>(null);
  const [statusOfThePriceLetterAndTheSupplyPriceOfBreadOfTheInspectedUnitsInTheWholeCountry, setStatusOfThePriceLetterAndTheSupplyPriceOfBreadOfTheInspectedUnitsInTheWholeCountry] = useState<any>([]);
  const [statusOfBakingVarietyInTheInspectedUnitsInTheWholeCountry, setStatusOfBakingVarietyInTheInspectedUnitsInTheWholeCountry] = useState<any>(null);
  const [overviewOfTheQualityAndHealthInTheInspectedUnitsInTheWholeCountry, setOverviewOfTheQualityAndHealthInTheInspectedUnitsInTheWholeCountry] = useState<any>([]);

  const {CancelToken} = axios;
  const source = CancelToken.source();



  return {
    loading,
    error,
    data,
    overviewOfTheReportOfInspectedUnitsInTheWholeCountry,
    overviewOfTheNumberOfActiveAndInactiveInspectedUnitsOfTheEntireCountry,
    overviewOfTheReportOfInspectedUnitsInTheWholeCountryColumnChart,
    statusOfThePriceLetterAndTheSupplyPriceOfBreadOfTheInspectedUnitsInTheWholeCountry,
    statusOfBakingVarietyInTheInspectedUnitsInTheWholeCountry,
    overviewOfTheQualityAndHealthInTheInspectedUnitsInTheWholeCountry
  };
}
