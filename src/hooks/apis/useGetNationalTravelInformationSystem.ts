import {useEffect, useState} from "react";
import {useHistory, useLocation} from "react-router-dom";
import axios from "axios";
import {sideCities} from "../../helpers/utils";

export default function useGetNationalTravelInformationSystem(hasProvince: boolean = false) {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState<any>({
    healthStatusCalls: null
  });

  const {CancelToken} = axios;
  const source = CancelToken.source();

  const clear = () => {
    setData({
      healthStatusCalls: null
    });
    source.cancel('Operation canceled by the user.');
  }



  const location = useLocation();
  const history = useHistory();





  return {loading, error, data};
}