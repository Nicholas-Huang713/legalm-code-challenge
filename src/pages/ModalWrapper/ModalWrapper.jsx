import { useContext } from "react";
import { ModalContext } from "../../context/ModalContext";
import DetailModal from "../DetailModal/DetailModal";
import NewOwnerModal from "../NewOwnerModal/NewOwnerModal";
import EditOwnerModal from "../EditOwnerModal/EditOwnerModal";

export default function ModalWrapper() {
  const {
    detailModalOpen,
    newOwnerModalOpen,
    editModalOpen,
    handleCloseDetailModal,
    handleCloseNewOwnerModal,
    handleCloseEditOwnerModal,
  } = useContext(ModalContext);
  return (
    <>
      {detailModalOpen ? (
        <DetailModal
          isOpen={detailModalOpen}
          handleCloseDetailModal={handleCloseDetailModal}
        />
      ) : null}
      {newOwnerModalOpen ? (
        <NewOwnerModal
          isOpen={newOwnerModalOpen}
          handleCloseNewOwnerModal={handleCloseNewOwnerModal}
        />
      ) : null}
      {editModalOpen ? (
        <EditOwnerModal
          isOpen={editModalOpen}
          handleCloseEditOwnerModal={handleCloseEditOwnerModal}
        />
      ) : null}
    </>
  );
}
