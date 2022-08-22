import React, {useEffect, useRef, useState} from 'react';
import plusIconGray from '../../assets/images/icons/plusGray.svg';
import {ReactComponent as DownIcon} from '../../assets/images/icons/down.svg';

interface IMultiSelectInModal {
  options: any;
  title?: string;
  getValues?: any;
  selectedValue?: any
}

const MultiSelectInModal: React.FC<IMultiSelectInModal> = ({options, title, getValues, selectedValue}) => {


  const [showOptions, setShowOptions] = useState(false);

  const wholeSelectRef = useRef<any>();
  const selectedRef = useRef<any>();
  const badRef = useRef<any>();
  const ulRef = useRef<any>();

  const openSelectBox = () => {
    setShowOptions(true);
  };

  useEffect(() => {
    selectedRef.current?.scrollIntoView();
    const conditions = (event: any) => {
      if (wholeSelectRef.current.contains(event.target)) return;
      if (showOptions) setShowOptions(false);
    };
    document.getElementById('modal')?.addEventListener('click', conditions);
    return () => document.getElementById('modal')?.removeEventListener('click', conditions);
  }, [showOptions]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedItem, setSelectedItem] = useState<any>([]);

  useEffect(() => {
    if (getValues) {
      getValues(selectedItem);
    }
  }, [selectedItem]);

  const changeOption = (item: any) => {
    const newItem = {
      value: item.value,
      title: item.title,
    };

    const findSelectedItem = selectedItem.findIndex((entity: any) => entity.value === item.value);

    if (findSelectedItem === -1) {
      setSelectedItem((prev: any) => {
        return [...prev, newItem];
      });
    } else {
      const tmp = [...selectedItem];
      tmp.splice(findSelectedItem, 1);
      setSelectedItem(tmp);
    }
  };

  const removeItem = (value: any) => {
    const indexOfObject = selectedItem.findIndex((obj: any) => {
      return obj.value === value;
    });
    selectedItem.splice(indexOfObject, 1);
    setSelectedItem(() => {
      return [...selectedItem];
    });
  };

  useEffect(() => {
    if (selectedValue && options.length > 1) {
      const defaultValue = options.filter((item: any) => {
        return selectedValue.find((entity: any) => {
          return item.value === entity
        })
      })

      const normalizedData: any[] = [];
      defaultValue.forEach((item: any) => {
        normalizedData.push({
          title: item.title,
          value: item.value,
        });
      });
      setSelectedItem(normalizedData);

      // if (defaultValue) {
      //   setSelectedItem(defaultValue)
      // }
    }

  }, [options])

  return (
    <>
      <div>
        <div className="selected-item py-4 flex u-width-85 mx-auto flex-wrap">
          {selectedItem.map((item: any) => {
            return (
              <div
                className="bg-cyan-900 rounded px-3 py-1 flex justify-between items-center ml-2 mt-2 "
                key={item.id}
              >
                <span className="text-xs pl-2 text-white">{item.title}</span>
                <span
                  className="text-white relative top-px text-xl cursor-pointer"
                  onClick={() => removeItem(item.value)}
                >
                  &times;
                </span>
              </div>
            );
          })}

          {/* <div className="bg-cyan-900 rounded px-3 py-1 flex justify-between items-center "> */}
          {/*  <span className="text-xs pl-2 text-white">آرد و نان</span> */}
          {/*  <span className="text-white relative top-px text-xl">&times;</span> */}
          {/* </div> */}
        </div>
      </div>
      <div className="bg-gray-100 flex items-center">
        <div className="u-width-85 mx-auto py-4">
          <label htmlFor="tag" className="flex text-xs text-gray-400 mb-2">
            {title && title}
          </label>
          <div
            className="multi-select-in-modal  cursor-pointer relative border-solid border border-gray-400 rounded py-1 h-9 bg-white"
            onClick={openSelectBox}
            ref={wholeSelectRef}
          >
            <span className="text-xs  flex items-center">
              {options.map((item: any) => {
                return (
                  // eslint-disable-next-line no-nested-ternary
                  item.icon ? (
                    item.title === selectedItem ? (
                      <span className="ml-2">{item.icon}</span>
                    ) : (
                      ''
                    )
                  ) : (
                    ''
                  )
                );
              })}
              <span className="w-20 truncate flex justify-start pr-8 w-full">
                انتخاب &nbsp;
                {title}
              </span>
              <DownIcon className="mr-2 h-2 w-2.5"/>
            </span>
            <ul
              className={`${showOptions ? 'block' : 'hidden'} transition ease-in-out delay-150`}
              ref={ulRef}
            >
              {options.map((item: any, index: any) => {
                return (
                  // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                  <li
                    value={item.value}
                    key={index}
                    ref={selectedItem === item.title ? selectedRef : badRef}
                    className="text-xs"
                    // style={{backgroundColor: selected === item.title ? '#CCCCCCDF' : ''}}
                    onClick={() => changeOption(item)}
                    defaultValue={selectedItem}
                  >
                    <span className="circle-select  ml-2">
                      <span
                        className={
                          selectedItem.find((term: any) => term.title === item.title)
                            ? 'circle-select--selected'
                            : ''
                        }
                      />
                    </span>
                    {item.icon && <i className="ml-2">{item.icon}</i>}
                    {item.title}
                  </li>
                );
              })}
            </ul>
            <img
              src={plusIconGray}
              alt="+"
              className="absolute right-0 top-2 bg-white mr-4 xl:block sm:hidden"
              width={18}
              height={18}
            />
            {/* <input type="text" id="tag" className="w-full pr-12 text-xs"/> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default MultiSelectInModal;
