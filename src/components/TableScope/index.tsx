import React, {ReactNode, useState} from 'react';
// import qs from 'qs';
// import {useLocation} from 'react-router-dom';
import Empty from '../Empty';
import Pagination from '../PaginationScope';

const PAGE_SIZE = parseInt(process.env.REACT_APP_PAGE_SIZE || '15', 10);

export interface ISelect {
  label: string;
  value: any;
}

export interface IColumn {
  name: string;
  key: string;
  align?: 'left' | 'right' | 'center';
  className?: string;
  colSpan?: number;
  width?: string | number;
  render?: (text: string, record: any, index: number, page: number) => ReactNode;
}

// eslint-disable-next-line
interface IParams {
  _filter?: any;
  _sort?: string;
  _populate?: any;
  _limit?: number | string;
  _start: number;
  _page?: number;
}

interface IPagination {
  pageSize?: number;
  maxPages?: number;
}
interface IProps {
  // api?: undefined | null | string;
  pagination?: undefined | null | IPagination;
  totalItems: number;
  columns: IColumn[];
  dataSet: any[];
}

const Table: React.FC<IProps> = (props: IProps) => {
  const {dataSet, pagination, columns, totalItems = 0} = props;

  // eslint-disable-next-line
  const [page, setPage] = useState<number>(1);
  const pageSize = pagination?.pageSize || PAGE_SIZE;

  return (
    <>
      <div className="relative pl-3 -ml-3 h-full w-full  scrollbar-thumb-gray-400 scrollbar-track-gray-300">
        <table className="min-w-full overflow-x-scroll table-auto">
          <thead className="">
            <tr className="border-b border-gray-100">
              {columns.map((column, i) => (
                <th
                  scope="col"
                  // eslint-disable-next-line
                  key={i}
                  className="px-3 pb-4 py-1 text-xs font-medium tracking-wider text-gray-500 uppercase whitespace-nowrap"
                >
                  {column.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 max-h-screen overflow-hidden overflow-y-scroll">
            {dataSet && columns && dataSet.length > 0 && columns.length > 0 ? (
              dataSet.slice((page - 1) * pageSize, page * pageSize).map((data, i) => (
                // eslint-disable-next-line
                <tr className="transition-all border-b border-gray-100" key={i}>
                  {columns?.map((column, j) => (
                    <td
                      className={`px-3 py-3 text-sm text-gray-900 whitespace-nowrap ${
                        column.className ? column.className : ''
                      }`}
                      // eslint-disable-next-line
                      key={j}
                    >
                      {column.render
                        ? column.render(data[column.key], data, i, page)
                        : data[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + 1}>
                  <div className="px-4 py-10 flex justify-center items-center">
                    <Empty />
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalItems && totalItems > pageSize ? (
        <Pagination
          totalItems={totalItems}
          currentPage={page}
          setPage={setPage}
          pageSize={pageSize}
          maxPages={4}
        />
      ) : (
        <></>
      )}
    </>
  );
};

Table.defaultProps = {
  pagination: null,
  // api: null,
};

export default Table;
