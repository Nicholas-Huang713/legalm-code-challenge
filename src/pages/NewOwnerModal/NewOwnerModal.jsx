import Modal from "../../components/Modal/Modal";
import Form from "../../components/Form/Form";
import { addOwner } from "../../state/slices/owner/ownerThunks";
import { useDispatch } from "react-redux";

export default function NewOwnerModal({ handleCloseNewOwnerModal }) {
  const dispatch = useDispatch();

  return (
    <Modal onClose={handleCloseNewOwnerModal}>
      <Form
        isEdit={false}
        sendDataToServer={(data) => dispatch(addOwner(data))}
        handleCloseForm={handleCloseNewOwnerModal}
      />
    </Modal>
  );
}
