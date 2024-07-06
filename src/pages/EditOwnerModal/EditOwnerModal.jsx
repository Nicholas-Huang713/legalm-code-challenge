import Modal from "../../components/Modal/Modal";
import Form from "../../components/Form/Form";
import { editOwner } from "../../state/slices/owner/ownerThunks";
import { useDispatch, useSelector } from "react-redux";

export default function EditOwnerModal({ isOpen, handleCloseEditOwnerModal }) {
  const dispatch = useDispatch();
  const currentDogWithOwnerInfo = useSelector((state) => state.dog.dogs);
  return (
    <Modal isOpen={isOpen} onClose={handleCloseEditOwnerModal}>
      <Form
        isEditMode={true}
        sendDataToServer={(data) => dispatch(editOwner(data))}
        handleCloseForm={handleCloseEditOwnerModal}
        currentDogWithOwnerInfo={currentDogWithOwnerInfo}
      />
    </Modal>
  );
}
