import Modal from "../../components/Modal/Modal";
import Form from "../../components/Form/Form";
import { editOwner } from "../../state/slices/owner/ownerSlice";
import { useDispatch } from "react-redux";

export default function EditOwnerModal({ isOpen, handleCloseEditOwnerModal }) {
  const dispatch = useDispatch();
  return (
    <Modal isOpen={isOpen} onClose={handleCloseEditOwnerModal}>
      <Form
        isEditMode={true}
        sendDataToServer={(data) => dispatch(editOwner(data))}
        handleCloseForm={handleCloseEditOwnerModal}
      />
    </Modal>
  );
}
