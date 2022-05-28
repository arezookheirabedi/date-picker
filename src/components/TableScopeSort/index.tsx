import isEqual from 'lodash/isEqual';
import React, {useEffect, useState} from 'react';
import Empty from '../Empty';
import Loading from '../Loading';
import Pagination from '../PaginationScope';
import {IColumn, OrderDirection} from './constant';
import TableHeaderColumn from './TableHeaderColumn';

const PAGE_SIZE = parseInt(process.env.REACT_APP_PAGE_SIZE || '15', 10);

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
  currentPage?: number;
}
interface IProps {
  // api?: undefined | null | string;
  pagination?: undefined | null | IPagination;
  totalItems: number;
  columns: IColumn[];
  dataSet: any[];
  loading: boolean;
  // orderMain: any;
  // handlePageChange: (data: number) => void;
}

const Table: React.FC<IProps> = (props: IProps) => {
  const {dataSet, pagination, columns, totalItems = 0, loading = false} = props;
  const pageSize = pagination?.pageSize || PAGE_SIZE;
  const [firstOrderList, setFirstOrderList] = useState<any>({});
  const [orders, setOrders] = useState<any>({});
  const [page, setPage] = useState<number>(1);
  const [sortData, setSortData] = useState<any[]>([]);

  const makeOrderList = (data: IColumn[]) => {
    const sortableColumn = data.filter((column: IColumn) => column.sortable === true);
    const newData = sortableColumn.map((column: IColumn) => column.key);
    const newObjectOfSortable = newData.reduce(
      (a: any, key: any) => ({...a, [key]: undefined}),
      {}
    );
    setFirstOrderList(newObjectOfSortable);
    setOrders(newObjectOfSortable);
  };

  // get sortable columjns object fro setOrder
  useEffect(() => {
    makeOrderList(columns);
  }, []);
  const getData = (item: any, order: any, data: any[]) => {
    let temp = [];
    if (order) {
      const tmp = [...data].sort((a: any, b: any) => {
        // eslint-disable-next-line
        const reverse = order === 'ASC' ? 1 : order === 'DESC' ? -1 : 1;
        const numberDataA =
          Number.isFinite(a[`${item}`]) === true ? a[`${item}`] : Number(a[`${item}`]);
        const numberDataB =
          Number.isFinite(b[`${item}`]) === true ? b[`${item}`] : Number(b[`${item}`]);
        if (numberDataA < numberDataB) {
          return reverse * 1;
        }
        if (numberDataA > numberDataB) {
          return reverse * -1;
        }
        // a must be equal to b
        return 0;
      });
      temp = tmp;
    } else {
      temp = [...data];
    }
    setSortData(temp);
  };

  useEffect(() => {
    setPage(1);
  }, [dataSet]);

  useEffect(() => {
    const data = dataSet.slice((page - 1) * pageSize, page * pageSize);
    setSortData(data);
    const keyArray = Object.keys(orders);
    const valueArray = Object.values(orders);
    const orderIndex = valueArray.findIndex(element => element !== undefined);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    orderIndex !== -1 && getData(keyArray[orderIndex], valueArray[orderIndex], data);
  }, [orders, dataSet, page]);
  const handleSortOrder = (key: any, order: OrderDirection) => {
    if (!isEqual(orders, {...orders, [key]: order})) {
      const newOrderList = {...firstOrderList, [key]: order};
      setOrders(newOrderList);
    }
  };
  const onChangePage = (e: number) => {
    setPage(e);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    // props.handlePageChange && props.handlePageChange(e);
  };
  return (
    <>
      <div className="relative pl-3 -ml-3 h-full w-full overflow-hidden overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-300">
        <table className="w-full table-auto">
          <thead className="">
            <tr className="border-b border-gray-100">
              {columns.map((column, i) => (
                <>
                  <TableHeaderColumn
                    order={orders && orders[`${column.key}`]}
                    key={i}
                    column={column}
                    handleSortOrder={handleSortOrder}
                  />
                </>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 max-h-screen overflow-hidden overflow-y-scroll">
            {loading ? (
              <tr>
                <td colSpan={columns.length + 1}>
                  <div className="px-4 py-10 flex justify-center items-center">
                    <Loading />
                  </div>
                </td>
              </tr>
            ) : (
              <>
                {sortData && columns && sortData.length > 0 && columns.length > 0 ? (
                  // sortData.slice((page - 1) * pageSize, page * pageSize).map((data, i) => (
                  sortData.map((data, i) => (
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
              </>
            )}
          </tbody>
        </table>
      </div>

      {totalItems && totalItems > pageSize ? (
        <Pagination
          totalItems={totalItems}
          currentPage={page}
          setPage={onChangePage}
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
