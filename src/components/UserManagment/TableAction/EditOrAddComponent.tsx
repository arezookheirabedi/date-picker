import React from 'react';
import Modal from '../../Modal';
import AddOrUpdateUser from './AddOrEditUserForm';
import AddOrUpdateInspector from '../../Inspector/AddOrUpdateInspector';

interface IProps {
  userData?: any;
  isOpen: boolean;
  closeModal: () => void;
  actionType: string;
  actionTitle?: string;
  shouldRefresh: (data: boolean) => void;
}

const Edit: React.FC<IProps> = ({actionType, actionTitle, isOpen, closeModal, shouldRefresh}) => {
  return (
    <Modal showModal={isOpen} setShowModal={closeModal}>
      {actionTitle === 'کاربر' ? (
        <AddOrUpdateUser actionType={actionType} actionTitle={actionTitle} setShowModal={closeModal} shouldRefresh={shouldRefresh}/>
      ) : (
        <AddOrUpdateInspector actionType={actionType} setShowModal={closeModal} shouldRefresh={shouldRefresh} />
      )}
    </Modal>
  );
};

export default Edit;
