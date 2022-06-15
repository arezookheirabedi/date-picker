import React, {useRef, useState} from 'react';
import {Disclosure, Transition} from '@headlessui/react';

const TableRow: React.FC<{
  expandable: any;
  data: any;
  columns: any[];
  index: number;
}> = ({expandable, data, columns = [], index}) => {
  const [openState, setOpenState] = useState(false);

  const collapseButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      {/* eslint-disable-next-line */}
      <tr className="border-b border-gray-100 transition-all">
        {expandable && expandable.rowExpandable ? (
          <td className="w-8 px-3 py-3 text-sm text-gray-900">
            <button
              type="button"
              className="rounded-full border border-sky-300 bg-sky-100 p-0.5 align-middle text-sky-500"
              onClick={() => collapseButtonRef?.current!.click()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 transform transition-all ${
                  openState ? 'rotate-0' : 'rotate-90'
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </td>
        ) : (
          ''
        )}
        {columns?.map((column, j) => (
          <td
            className={`whitespace-nowrap px-3 py-3 text-sm text-gray-900 ${
              column.className ? column.className : ''
            }`}
            // eslint-disable-next-line
            key={j}
          >
            {column.render ? column.render(data[column.key], data, index) : data[column.key]}
          </td>
        ))}
      </tr>
      {expandable && expandable.rowExpandable ? (
        <tr className="">
          <td className="p-0" colSpan={columns.length + 1}>
            <Disclosure>
              {({open}) => {
                setOpenState(open);
                return (
                  <>
                    <Disclosure.Button className="hidden" ref={collapseButtonRef}>
                      {/* <span>{t("detail")}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg> */}
                    </Disclosure.Button>

                    <Transition
                      enter="transition duration-100 ease-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-100 opacity-100"
                      leave="transition duration-75 ease-out"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <Disclosure.Panel className="whitespace-nowrap border-b border-gray-100 bg-gray-100 px-3 py-3 text-sm text-gray-900">
                        {expandable.expandedRowRender && expandable.expandedRowRender(data)}
                      </Disclosure.Panel>
                    </Transition>
                  </>
                );
              }}
            </Disclosure>
          </td>
        </tr>
      ) : (
        ''
      )}
    </>
  );
};
export default TableRow;