import React, {Fragment, ReactNode, useEffect, useState} from 'react';
import Loading from '../Loading';
import Empty from '../Empty';
import Pagination from '../PaginationScope';
import TableRow from './TableRow';

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
  currentPage?: number;
  pageSize?: number;
  maxPages?: number;
}
interface IProps {
  // api?: undefined | null | string;
  pagination?: undefined | null | IPagination;
  totalItems: number;
  columns: IColumn[];
  dataSet: any[];
  // eslint-disable-next-line react/require-default-props
  handlePageChange?: (page: number) => void;
  // eslint-disable-next-line react/require-default-props
  expandable?: {
    rowExpandable: (record: any) => boolean;
    expandedRowRender: (record: any) => any;
  };
  loading?: boolean;
}

const Table: React.FC<IProps> = (props: IProps) => {
  const {
    dataSet,
    expandable,
    pagination,
    columns,
    totalItems = 0,
    handlePageChange,
    loading = false,
  } = props;

  // eslint-disable-next-line
  const [page, setPage] = useState<number>(pagination?.currentPage || 1);
  const pageSize = pagination?.pageSize || PAGE_SIZE;

  useEffect(() => {
    if (handlePageChange && page !== pagination?.currentPage) handlePageChange(page);
  }, [page]);

  return (
    <>
      <div className="relative -ml-3 h-full w-full overflow-hidden overflow-x-scroll pl-3 scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-gray-400">
        <table className="w-full table-auto">
          <thead className="">
            <tr className="border-b border-gray-100">
              {expandable ? <th>{}</th> : null}
              {columns.map((column, i) => (
                <th
                  key={i}
                  className="whitespace-nowrap px-3 py-1 pb-4 text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  {column.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="max-h-screen overflow-hidden overflow-y-scroll bg-white dark:bg-gray-900">
            {loading ? (
              <tr>
                <td colSpan={columns.length + 1}>
                  <div className="flex items-center justify-center px-4 py-10">
                    <Loading />
                  </div>
                </td>
              </tr>
            ) : (
              <>
                {dataSet && columns && dataSet.length > 0 && columns.length > 0 ? (
                  dataSet.map((data, i) => (
                    <Fragment key={i}>
                      <TableRow
                        data={data}
                        columns={columns}
                        expandable={expandable}
                        index={i}
                        key={i}
                      />
                    </Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan={columns.length + 1}>
                      <div className="flex items-center justify-center px-4 py-10">
                        <Empty />
                      </div>
                    </td>
                  </tr>
                )}
              </>
            )}
          </tbody>
        </table>
      </div>

      {totalItems && totalItems > pageSize ? (
        <Pagination
          totalItems={totalItems}
          currentPage={pagination?.currentPage || page}
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
