import {useEffect, useState} from 'react';
import {Switch} from '@headlessui/react';

interface IProps {
  status: boolean;
}

const SwitchToggleButton: React.FC<IProps> = ({status}) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(status);
  }, [status]);
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
