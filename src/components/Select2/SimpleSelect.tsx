import React, {useEffect, useRef, useState} from "react";
import {ReactComponent as DownIcon} from "../../assets/images/icons/down.svg";

interface ISimpleSelect {
  options: any,
  defaultOption?: any
}

const SimpleSelect: React.FC<ISimpleSelect> = ({options, defaultOption}) => {

  const [showOptions, setshowOptions] = useState(false);
  const [selected, setSelected] = useState(defaultOption || options[0].title)

  const wholeSelectRef = useRef<any>();
  const selectedRef = useRef<any>();
  const badRef = useRef<any>();

  const openSelectBox = () => {
    setshowOptions(!showOptions);
  }

  useEffect(() => {
    selectedRef.current?.scrollIntoView();
    const conditions = (event: any) => {
      if (wholeSelectRef.current?.contains(event.target)) return;
      if (showOptions) setshowOptions(false)
    }
    document.body.addEventListener('click', conditions)
    return () => document.body.removeEventListener('click', conditions)
  }, [showOptions]);

  const changeOption = (value: any) => {
    setSelected(value)
  }

  return (
    <div className="simple-select flex items-center shadow-custom rounded-lg px-4 cursor-pointer relative ml-4"
         onClick={openSelectBox} ref={wholeSelectRef}>
            <span className="text-xs  flex items-center">
              {
                options.map((item: any) => {
                  return (
                    // eslint-disable-next-line no-nested-ternary
                    item.icon ? item.title === selected ? <span className="ml-2" >{item.icon}</span> : '' : ''
                  )
                })
              }
              <span className="w-20 truncate">
                {selected}
              </span>
            <DownIcon className="mr-2 h-2 w-2.5"/>
            </span>
      <ul className={`${showOptions ? 'block' : 'hidden'} transition ease-in-out delay-150`}>
        {options.map((item: any, index: any) => {
          return (
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
            <li value={item.value} key={index} ref={selected === item.title ? selectedRef : badRef}
                className="text-xs"
              // style={{backgroundColor: selected === item.title ? '#CCCCCCDF' : ''}}
                onClick={() => changeOption(item.value)}
                defaultValue={selected}>
              <span className="circle-select  ml-2">
                <span className={selected === item.title ? 'circle-select--selected' : ''}/>
              </span>
              {item.icon && <i className="ml-2">{item.icon}</i>}
              {item.title}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default SimpleSelect;