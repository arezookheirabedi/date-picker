import {useState} from 'react';
import fsServices from 'src/services/fs.service';
import {EERRORS} from '../../constants/errors.enum';

export default function useUpdateUserManagment(
  formData: any,
  shouldRefresh: (data: boolean) => void
) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line
  const [error, setError] = useState<any>(null);

  const update = async () => {
    setLoading(true);
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const res = await fsServices.updateUser(formData);
      shouldRefresh(true);
      setError(null);
      setLoading(false);
    } catch (err: any) {
      if (err.message === 'cancel') {
        setLoading(true);
        return;
      }
      setError(err.message || EERRORS.ERROR_500);
      setLoading(false);
    }
  };

  return update;
}
