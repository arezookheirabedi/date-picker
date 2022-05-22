/* eslint-disable no-nested-ternary */
import React, {useEffect, useState} from 'react';
import {IColumn, OrderDirection} from './constant';
import up from '../../assets/images/icons/sort-arrow-up-active.svg';
import down from '../../assets/images/icons/sort-arrow-down-active.svg';

const STATUS_STATES: OrderDirection[] = [undefined, 'ASC', 'DESC'];

interface IProps {
  column: IColumn;
  handleSortOrder?: (key: any, order: OrderDirection) => void;
  order?: OrderDirection;
}

const TableHeaderColumn: React.FC<IProps> = ({column, handleSortOrder, order}) => {
  const [destination, setDestination] = useState(STATUS_STATES.findIndex(s => s === order));

  const handleClickSortOrder = () => {
    if (column.sortable) {
      const updatedChecked: any = (destination + 1) % STATUS_STATES.length;
      setDestination(updatedChecked);
    }
  };

  useEffect(() => {
    if (handleSortOrder && column.key && column.sortable) {
      handleSortOrder(column.key, STATUS_STATES[destination]);
    }
    // eslint-disable-next-line
  }, [destination]);

  return (
    <th
      // eslint-disable-next-line
      className="px-3 py-1 pb-4 text-xs font-medium uppercase tracking-wider text-gray-500"
      onClick={handleClickSortOrder}
    >
      <div className="flex items-center justify-center space-x-2 whitespace-nowrap rtl:space-x-reverse">
        <span className="inline-flex">{column.name}</span>
        {column.sortable && (
          <div className="flex cursor-pointer items-center justify-center">
            {order === 'ASC' ? (
              <img src={up} className="h-3 w-2" alt="" />
            ) : order === 'DESC' ? (
              <img src={down} className="h-3 w-2" alt="" />
            ) : (
              <>
                <img src={up} className="h-3 w-2" alt="" />
                <img src={down} className="h-3 w-2" alt="" />
              </>
            )}
          </div>
        )}
      </div>
    </th>
  );
};
export default TableHeaderColumn;
