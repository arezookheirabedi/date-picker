import {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {IProfile} from 'src/models/authentication.model';
import useLocalStorage from './useLocalStorage';

const useHasProvinceResource = () => {
  const [hasProvinceResources, setHasProvinceResources] = useState(false);

  const [profile] = useLocalStorage<IProfile>('ministers-userinfo', {
    birthday: '',
    categoryId: '',
    firstName: '',
    guildCode: '',
    id: '',
    lastName: '',
    nationalId: '',
    qrCode: '',
    roles: [],
    resources: [],
    permissions: [],
  });
  const {resources} = profile;

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const provinceName = params.get('provinceName') || ('تهران' as any);
    const checkProvinceResources = resources?.find((item: any) => item.name === 'province') as
      | {name: string; value: string[]}
      | undefined;

    if (
      (resources &&
        checkProvinceResources &&
        checkProvinceResources?.value.includes(provinceName)) ||
      checkProvinceResources?.value[0] === '*'
    ) {
      setHasProvinceResources(true);
    } else {
      setHasProvinceResources(false);
    }
  }, [location.search]);

  return [hasProvinceResources];
};

export default useHasProvinceResource;
