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
        className={` relative inline-flex h-8 w-20 items-center rounded-full  shadow focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300    `}
      >
        <span
          className={`${
            enabled ? '-translate-x-14 bg-teal-900  ' : ' bg-gray-400 -translate-x-1'
          } inline-block h-4 w-4 transform rounded-full  px-2`}
        />
        <span
          className={`${
            enabled ? '-translate-x-1' : '-translate-x-2'
          } inline-block h-4 w-8 transform sm:text-sm `}
        >
          {enabled ? 'فعال' : 'غیرفعال'}
        </span>
      </Switch>
    </>
  );
};
export default SwitchToggleButton;
