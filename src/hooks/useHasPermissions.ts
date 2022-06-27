import {IProfile} from 'src/models/authentication.model';
import useLocalStorage from './useLocalStorage';

const useHasPermissions: (PermissionNames: string[]) => boolean = permissionNames => {
  const [currentUser] = useLocalStorage<IProfile>('ministers-userinfo', {
    birthday: '',
    categoryId: '',
    firstName: '',
    guildCode: '',
    id: '',
    lastName: '',
    nationalId: '',
    qrCode: '',
    roles: [],
    permissions: [],
  });
  const {permissions} = currentUser;

  if (!permissions) {
    return false;
  }

  
  if (typeof permissionNames === 'number') {
    return permissions.includes?.(permissionNames);
  }

  if (Array.isArray(permissionNames)) {
    return permissions.some((permissionName: string) =>
      Boolean(permissionNames.includes?.(permissionName))
    );
  }

  return false;
};

export default useHasPermissions;
