import Modal from "../../components/Modal/Modal";
import Form from "../../components/Form/Form";
import { addOwners } from "../../state/slices/owner/ownerSlice";
import { useDispatch } from "react-redux";
export default function NewOwnerModal({ isOpen, handleCloseNewOwnerModal }) {
  const dispatch = useDispatch();

  return (
    <Modal isOpen={isOpen} onClose={handleCloseNewOwnerModal}>
      <Form
        isEdit={false}
        sendDataToServer={(data) => dispatch(addOwners(data))}
        handleCloseForm={handleCloseNewOwnerModal}
      />
    </Modal>
  );
}
