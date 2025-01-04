import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import axios from "axios";
import {IInitialNumberOfDoses, initialNumberOfDoses} from "../../components/Passengers/public/constant";
import {sideCities} from "../../helpers/utils";

export default function useGetOverviewOfTheLatestVaccinationStatus(query: any, hasProvince: boolean = false) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState<IInitialNumberOfDoses>(initialNumberOfDoses);

  const {CancelToken} = axios;
  const source = CancelToken.source();


  return {loading, error, data};
}