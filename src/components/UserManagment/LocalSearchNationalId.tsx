import React, {useEffect, useState} from 'react';

interface LocalTableSearchProps {
  setQueryParams: (data: any) => void;
  queryParams: any;
  objectKey: string;
}

const LocalSearchNationalId: React.FC<LocalTableSearchProps> = ({
  setQueryParams,
  objectKey,
  queryParams,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  function handleSearch(e: any) {
    const {value} = e.target;
    setSearchQuery(value);
  }

  useEffect(() => {
    let params = {...queryParams};
    if (searchQuery) {
      const NewValue = searchQuery.toEnglishDigits();
      params = {...queryParams, [`${objectKey}`]: NewValue};
      setQueryParams(params);
    }
  }, [searchQuery]);

  // useEffect(() => {
  //   setSearchQuery('');
  // }, [queryParams]);

  return (
    <div className="relative inline-flex align-center leading-3 h-10 ml-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4 absolute top-1/2 transform -translate-y-1/2 right-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        type="text"
        placeholder="جستجوی کدملی، موبایل"
        className="py-2 px-4 pr-10 text-sm border-none rounded-lg focus:outline-none shadow-custom"
        onChange={handleSearch}
        value={searchQuery}
      />
    </div>
    // <>
    //   <svg
    //     xmlns="http://www.w3.org/2000/svg"
    //     className="absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 transform"
    //     fill="none"
    //     viewBox="0 0 24 24"
    //     stroke="currentColor"
    //   >
    //     <path
    //       strokeLinecap="round"
    //       strokeLinejoin="round"
    //       strokeWidth={2}
    //       d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    //     />
    //   </svg>
    //   <input
    //     type="text"
    //     placeholder={`${placeholder || 'جستجو'}`}
    //     className="focus:outline-none rounded-lg border border-gray-300 py-2 px-4 pr-10 text-sm"
    //     onChange={handleSearch}
    //     value={searchQuery}
    //   />
    // </>
  );
};

export default LocalSearchNationalId;
