import {ReactElement} from 'react';

interface IProps {
  icon: ReactElement;
  title: string;
  onClick: any;
}

const ActionButton: React.FC<IProps> = ({onClick: handleClick, title, icon}) => {
  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className="group flex w-full text-slate-800  items-center px-2 py-2 text-sm hover:bg-gray-100 "
      >
        {icon}
        &nbsp;&nbsp;&nbsp;{title}
      </button>
    </>
  );
};
export default ActionButton;
