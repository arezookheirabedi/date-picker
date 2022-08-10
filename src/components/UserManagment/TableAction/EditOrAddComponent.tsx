import React from 'react';
import Modal from '../../Modal';
import AddOrUpdateUser from './AddOrEditUserForm';

interface IProps {
  userData?: any;
  isOpen: boolean;
  closeModal: () => void;
  actionType: string;
  actionTitle?: string;
}

const Edit: React.FC<IProps> = ({actionType, actionTitle, isOpen, closeModal}) => {
  return (
    <Modal showModal={isOpen} setShowModal={closeModal}>
      <AddOrUpdateUser actionType={actionType} actionTitle={actionTitle} />
    </Modal>
  );
};

export default Edit;
