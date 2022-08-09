import React, {useState} from 'react';
import ableEye from 'src/assets/images/icons/able-eye-icon.svg';
import disableEye from 'src/assets/images/icons/disable-eye-icon.svg';

interface IProps {
  value: any;
}
const HiddenMobileNumber: React.FC<IProps> = ({value}) => {
  const [typeInputText, setTypeInputText] = useState(false);

  return (
    <>
      <div className="flex justify-center items-center">
        <input
          className={`${typeInputText ? 'text-cyan-400' : ''}focus:outline-none`}
          value={value}
          type={`${typeInputText ? 'text' : 'password'}`}
          readOnly
        />

        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
        <img
          src={`${typeInputText ? disableEye : ableEye}`}
          alt=""
          onClick={() => setTypeInputText(!typeInputText)}
        />
      </div>
    </>
  );
};
export default HiddenMobileNumber;
