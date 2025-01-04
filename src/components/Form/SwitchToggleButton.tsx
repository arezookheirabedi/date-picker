import {useEffect, useState} from 'react';
import {Switch} from '@headlessui/react';
import {EERRORS} from 'src/constants/errors.enum';
import toast from 'cogo-toast';

interface IProps {
  status: boolean;
  record: any;
}

const SwitchToggleButton: React.FC<IProps> = ({status, record}) => {
  const [enabled, setEnabled] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<any>(null);


  const deactiveUser = () => {
    setEnabled(!enabled);
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
