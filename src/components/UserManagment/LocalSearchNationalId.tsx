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
  const [searchQuery, setSearchQuery] = useState<string | null>(null);

  function handleSearch(e: any) {
    const {value} = e.target;
    setSearchQuery(value);
  }

  useEffect(() => {
    let params = {...queryParams};
    if (searchQuery) {
      setTimeout(() => {
        const NewValue = searchQuery.toEnglishDigits();
        params = {...queryParams, currentPage: 1, [`${objectKey}`]: NewValue};
        setQueryParams(params);
      }, 5000);
    }
  }, [searchQuery]);

  const handleDeselectItem = () => {
    setSearchQuery('');
    setTimeout(() => {
      let params = {...queryParams};
      params = {...queryParams, currentPage: 1, [`${objectKey}`]: null};
      setQueryParams(params);
    }, 5000);
  };
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
        value={searchQuery!}
      />
      <svg
        onClick={() => handleDeselectItem()}
        xmlns="http://www.w3.org/2000/svg"
        className={`${
          searchQuery && searchQuery.length > 0
            ? 'w-4 h-4 absolute top-1/2 transform rotate-45  -translate-y-1/2 left-4'
            : 'hidden'
        }`}
        viewBox="0 0 20 20"
        fill="currentColor"
        stroke="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
};

export default LocalSearchNationalId;
