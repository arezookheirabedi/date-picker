import {useEffect, useState} from 'react';
import {cancelTokenSource, msgRequestCanceled} from 'src/helpers/utils';
import {EERRORS} from 'src/constants/errors.enum';

export default function useGetOverviewAverageFlourOfInspectedUnits(query: any) {
  const [error, setError] = useState(null) as any;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});





  return {loading, error, data};
}
