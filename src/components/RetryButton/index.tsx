import React from 'react';

interface RetryButtonProps {
  setQuery: any;
}

const RetryButton: React.FC<RetryButtonProps> = ({setQuery}) => {
  const handleClick = () => {
    setQuery((prev: any) => {
      return {...prev, retry: !prev.retry}
    });
  };
  return (
    <div className="mt-2 flex justify-center">
      <button
        onClick={handleClick}
        type="button"
        className="bg-transparent hover:border-transparent rounded border border-blue-500 py-2 px-4 font-semibold text-blue-700 hover:bg-blue-500 hover:text-white"
      >
        بارگذاری مجدد
      </button>
    </div>
  );
};
export default RetryButton;
