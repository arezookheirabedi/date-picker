import React, {useState} from 'react';
import ConfirmOtp from './ConfirmOtp';

import RequestOtpForm from './RequestOtpForm';

interface IProps {
  resetIsOpen: boolean;
  setResetIsOpen: (data: boolean) => void;
}
const ResetPasswordModal: React.FC<IProps> = ({resetIsOpen, setResetIsOpen}) => {
  const [confirmOtpModal, setConfirmOtpModal] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>({});

  return (
    <>
      <RequestOtpForm
        resetIsOpen={resetIsOpen}
        setResetIsOpen={setResetIsOpen}
        setConfirmOtpModal={setConfirmOtpModal}
        setFormData={setFormData}
      />
      <ConfirmOtp
        confirmOtpModal={confirmOtpModal}
        setConfirmOtpModal={setConfirmOtpModal}
        formData={formData}
      />
    </>
  );
};
export default ResetPasswordModal;
