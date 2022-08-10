import {ReactElement} from 'react';

interface IProps {
  icon: ReactElement;
  title: string;
  onClick: any;
  disabled: boolean;
}

const ActionButton: React.FC<IProps> = ({onClick: handleClick, title, icon, disabled}) => {
  return (
    <>
      <button
        disabled={disabled}
        type="button"
        onClick={handleClick}
        className="group flex w-full text-slate-800  items-center px-2 py-2 text-sm hover:bg-gray-100 "
      >
        {icon}
        <span className={`${disabled ? 'text-gray-400' : ''}`}> &nbsp;&nbsp;&nbsp;{title}</span>
      </button>
    </>
  );
};
export default ActionButton;
