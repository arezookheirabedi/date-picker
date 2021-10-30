import cogoToast from 'cogo-toast';
import React from 'react';

const handleErrorMessage = (data: string) => {
  const value = typeof data === 'string' ? data : 'خطایی در عملیات';
  if (value !== '') {
    cogoToast.error(value, {
      renderIcon: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-red-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    });
  }
};
export default handleErrorMessage;
