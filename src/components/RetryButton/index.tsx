import React from 'react';

interface RetryButtonProps {
  setShouldUpdate: (data: boolean) => void;
  shouldUpdate: boolean;
}
const RetryButton: React.FC<RetryButtonProps> = ({shouldUpdate, setShouldUpdate}) => {
  const handelClick = () => {
    setShouldUpdate(!shouldUpdate);
  };
  return (
    <div className="mt-2 flex justify-center">
      <button
        onClick={handelClick}
        type="button"
        className="bg-transparent hover:border-transparent rounded border border-blue-500 py-2 px-4 font-semibold text-blue-700 hover:bg-blue-500 hover:text-white"
      >
        بارگذاری مجدد
      </button>
    </div>
  );
};
export default RetryButton;
