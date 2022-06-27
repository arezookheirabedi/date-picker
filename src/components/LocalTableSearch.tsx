import React, {useEffect, useState} from "react";


interface LocalTableSearchProps {
  orgDataset: any,
  setData: any,
  query: any
}

const LocalTableSearch: React.FC<LocalTableSearchProps> = ({orgDataset, setData, query}) => {

  const [searchQuery, setSearchQuery] = useState('');

  function handleSearch(e: any) {
    const {value} = e.target;

    let tmp = [...orgDataset];
    if (value) {
      tmp = [...tmp].filter(x => x.name.indexOf(value) !== -1);
    }

    setData([...tmp]);
    setSearchQuery(value);
  }

  useEffect(() => {
    setSearchQuery('')
  }, [query])

  return (
    <>
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
        placeholder="جستجو"
        className="py-2 px-4 pr-10 text-sm border border-gray-300 rounded-lg focus:outline-none"
        onChange={handleSearch}
        value={searchQuery}
      />
    </>
  )
}

export default LocalTableSearch;