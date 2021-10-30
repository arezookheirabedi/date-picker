import React from 'react';
import alert from 'src/assets/images/patterns/alert-white.svg';

interface IProps {
  message: string;
}

const Info: React.FC<IProps> = ({message}) => (
  <div className="relative bg-gray-400 text-white shadow-xl rounded py-3 px-4">
    <div className="relative flex items-start space-x-2 rtl:space-x-reverse">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
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
      <span className="">{message}</span>
    </div>
    <div
      className="absolute z-10 top-0 left-0 bottom-0 rounded-xl w-5/6 h-full bg-cover bg-top bg-no-repeat"
      style={{backgroundImage: `url("${alert}")`}}
    />
  </div>
);

export default Info;
