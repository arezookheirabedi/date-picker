import {useEffect, useState} from 'react';
import {Switch} from '@headlessui/react';
import fsServices from 'src/services/fs.service';
import {EERRORS} from 'src/constants/errors.enum';
import toast from 'cogo-toast';

interface IProps {
  status: boolean;
  record: any;
  // shouldRefresh: (data: boolean) => void;
  // refresh: boolean;
}

const SwitchToggleButton: React.FC<IProps> = ({
  status,
  record,
  //  shouldRefresh, refresh
}) => {
  const [enabled, setEnabled] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<any>(null);

  const update = async (formData: any) => {
    setLoading(true);
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const res = await fsServices.updateUser(formData);
      // shouldRefresh(!refresh);
      setError(null);
      setLoading(false);
      toast.success('عملیات با موفقیت انجام شد.');
    } catch (err: any) {
      if (err.message === 'cancel') {
        setLoading(true);
        return;
      }
      toast.error(err.message || EERRORS.ERROR_500);
      setLoading(false);
      setEnabled(enabled);
    }
  };
  useEffect(() => {
    setEnabled(status);
  }, [status]);
  const deactiveUser = () => {
    setEnabled(!enabled);
    update({...record, locked: enabled});
  };

  return (
    <>
      <Switch
        checked={enabled}
        onChange={deactiveUser}
        className={`${
          enabled
            ? 'shadow focus-visible:ring-2 focus-visible:ring-gray focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300  '
            : ' bg-gray-100'
        } relative inline-flex h-8 w-20 items-center rounded-full     `}
      >
        <span
          className={`${
            enabled ? '-translate-x-14 bg-teal-900  ' : ' bg-gray-400 -translate-x-1'
          } inline-block h-4 w-4 transform rounded-full  px-2`}
        />
        <span
          className={`${
            enabled ? '-translate-x-1 text-gray-900' : '-translate-x-2 text-gray-400'
          } inline-block h-4 w-8 transform sm:text-sm `}
        >
          {enabled ? 'فعال' : 'غیرفعال'}
        </span>
      </Switch>
    </>
  );
};
export default SwitchToggleButton;
