import React, { useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import { usePopper } from "react-popper";
import { Portal } from "react-portal";
import Delete from "./Delete"

interface IProps {
  item: any;
  wrapperRef: any;
}
interface IModals {
  [name: string]: boolean;
}

const Actions: React.FC<IProps> = ({ item}) => {
  const popperElRef = React.useRef<any>(null);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [modals, setModals] = useState<IModals>({
    delete: false,
  });
  const element = document.querySelector("body");



  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [
      {
        name: "preventOverflow",
        options: {
          // @ts-ignore
          boundary: element,
          altBoundary: true,
        },
      },
    ],
  });

  const openModal = (type: string) => {
    let modalsModified: IModals = { ...modals };
    Object.keys(modalsModified).forEach(
      // eslint-disable-next-line
      (key: string) => {
        const value = modalsModified[key];
        modalsModified = {
          ...modalsModified,
          [key]: key === type ? !value : false,
        };
      }
    );
    setModals(modalsModified);
  };

  const closeModal = (type: string) => {
    let modalsModified: IModals = { ...modals };
    Object.keys(modalsModified).forEach(
      // eslint-disable-next-line
      (key: string) => {
        const value = modalsModified[key];
        modalsModified = {
          ...modalsModified,
          [key]: key === type ? !value : value,
        };
      }
    );
    setModals(modalsModified);
  };

  return (
    <>
      <Popover as="div" className="relative flex items-center">
        <Popover.Button
          // @ts-ignore
          ref={setReferenceElement}
          className="inline-flex items-center justify-center text-xs font-medium focus:outline-none"
        >
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
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            />
          </svg>
        </Popover.Button>

        <Portal>
          <div ref={popperElRef} style={styles.popper} {...attributes.popper}>
            <Transition
              as="div"
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
              beforeEnter={() => setPopperElement(popperElRef.current)}
              afterLeave={() => setPopperElement(null)}
            >
              <Popover.Panel
                static
                className="absolute right-6 left-auto bottom-0 z-10 mt-2 w-40 origin-top-left divide-y divide-gray-100 rounded-md bg-white text-xs shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none rtl:left-6 rtl:right-auto rtl:origin-top-right"
              >
                <div className="py-1">
                  <div>
                    <Delete.Button onClick={() => openModal("delete")} />
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </div>
        </Portal>
      </Popover>

      <Delete.Modal
        id={item.id}
        name={item.name}
        isOpen={modals.delete}
        closeModal={() => closeModal("delete")}
      />
    </>
  );
};

export default Actions;
