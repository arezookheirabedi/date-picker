import React from 'react';
import PageItem from './PageItem';
import paginate from './paginate';

interface IProps {
  totalItems: number;
  currentPage: number;
  pageSize: number;
  maxPages: number;
}

const Pagination: React.FC<IProps> = props => {
  const {
    totalItems: totalitems,
    currentPage: currentpage,
    pageSize: pagesize,
    maxPages: maxpages,
  } = props;

  // eslint-disable-next-line
  const {
    // eslint-disable-next-line
    totalItems,
    // eslint-disable-next-line
    currentPage,
    // eslint-disable-next-line
    pageSize,
    // eslint-disable-next-line
    totalPages,
    // eslint-disable-next-line
    startPage,
    // eslint-disable-next-line
    endPage,
    // eslint-disable-next-line
    startIndex,
    // eslint-disable-next-line
    endIndex,
    pages,
  } = paginate(totalitems, currentpage, pagesize, maxpages);

  return (
    <div
      className="mt-6 grid gap-1"
      style={{
        gridTemplateColumns: 'repeat(auto-fill, minmax(1.75rem, 1fr))',
      }}
    >
      {pages && pages.length && currentPage > 2 ? (
        <span className="inline-flex justify-center items-center select-none">...</span>
      ) : (
        ''
      )}

      {pages.map((key: number) => (
        <PageItem key={key} currentPage={currentpage} value={key} label={key} />
      ))}

      {pages && pages.length && currentPage < totalPages - 1 ? (
        <span className="inline-flex justify-center items-center select-none">...</span>
      ) : (
        ''
      )}

      <PageItem
        currentPage={currentpage}
        value={currentpage - 1}
        shadow={false}
        label={
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        }
        disabled={currentpage === 1}
      />

      <PageItem
        currentPage={currentpage}
        value={currentpage + 1}
        shadow={false}
        label={
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </div>
        }
        disabled={currentpage === Math.ceil(totalItems / pagesize)}
      />
    </div>
  );
};

export default Pagination;
