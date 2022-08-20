import React, {useEffect, useRef, useState} from 'react';
import {ReactComponent as DownIcon} from '../../assets/images/icons/down.svg';

interface ISimpleSelect {
  options: any;
  defaultOption?: any;
  setValueOption?: any;
  setTitle?: any;
  selectedValue?: any;
}

const SingleSelectInModal: React.FC<ISimpleSelect> = ({
  options,
  defaultOption,
  setValueOption,
  setTitle,
  selectedValue,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [selected, setSelected] = useState(defaultOption || options[0]);

  const wholeSelectRef = useRef<any>();
  const selectedRef = useRef<any>();
  const badRef = useRef<any>();

  const openSelectBox = () => {
    setShowOptions(!showOptions);
  };

  useEffect(() => {
    // selectedRef.current?.scrollIntoView();
    const conditions = (event: any) => {
      if (wholeSelectRef.current.contains(event.target)) return;
      if (showOptions) setShowOptions(false);
    };
    document.getElementById('modal')?.addEventListener('click', conditions);
    return () => document.getElementById('modal')?.removeEventListener('click', conditions);
  }, [showOptions]);

  const changeOption = (item: any) => {
    setSelected(item);
    if (setTitle) {
      setTitle(item.title);
    }
    if (setValueOption) {
      setValueOption(item.value);
    }
  };

  useEffect(() => {
    if (selected && selected.value && setValueOption) {
      setValueOption(selected);
    }
  }, [selected]);

  useEffect(() => {
    if (selectedValue && options.length > 1) {
      const defaultValue = options.find((item: any) => item.value === selectedValue);
      if (defaultValue) {
        setSelected(defaultValue);
      }
    } else {
      setSelected(options[0]);
    }
  }, [options]);

  return (
    <div
      className="single-select-in-modal cursor-pointer relative border-solid border border-gray-400 rounded py-1 h-9"
      onClick={openSelectBox}
      ref={wholeSelectRef}
    >
      <span className="text-xs  flex items-center">
        {options.map((item: any) => {
          return (
            // eslint-disable-next-line no-nested-ternary
            item.icon ? (
              item.title === selected.title ? (
                <span className="ml-2">{item.icon}</span>
              ) : (
                ''
              )
            ) : (
              ''
            )
          );
        })}
        <span className="w-20 truncate flex justify-start pr-2 w-full">
          {options.length === 1 ? options[0].title : selected.title}
        </span>
        <DownIcon className="mr-2 h-2 w-2.5" />
      </span>
      <ul className={`${showOptions ? 'block' : 'hidden'} transition ease-in-out delay-150`}>
        {options.map((item: any, index: any) => {
          return (
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
            <li
              value={item.value}
              key={index}
              ref={selected.title === item.title ? selectedRef : badRef}
              className="text-xs"
              // style={{backgroundColor: selected === item.title ? '#CCCCCCDF' : ''}}
              onClick={() => changeOption(item)}
              defaultValue={selected.value}
            >
              <span className="circle-select  ml-2">
                <span className={selected.title === item.title ? 'circle-select--selected' : ''} />
              </span>
              {item.icon && <i className="ml-2">{item.icon}</i>}
              {item.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SingleSelectInModal;
