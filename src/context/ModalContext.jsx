import { createContext, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteOwner } from "../state/slices/owner/ownerThunks";
import { fetchDog } from "../state/slices/dog/dogSlice";
export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [newOwnerModalOpen, setNewOwnerModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentModalType, setCurrentModalType] = useState("");

  const handleCloseNewOwnerModal = () => {
    setNewOwnerModalOpen(false);
    setCurrentModalType("");
  };

  const handleCloseEditOwnerModal = () => {
    setEditModalOpen(false);
    setCurrentModalType("");
  };

  const handleCloseDetailModal = () => {
    setDetailModalOpen(false);
    setCurrentModalType("");
  };

  const handleViewDetails = async (dogId) => {
    await dispatch(fetchDog(dogId));
    setCurrentModalType("detail");
  };

  const handleOpenEditModal = async (dogId) => {
    await dispatch(fetchDog(dogId));
    setCurrentModalType("edit");
  };

  const handleDeleteOwner = async (ownerId) => {
    await dispatch(deleteOwner(ownerId));
  };

  useEffect(() => {
    if (currentModalType === "") return;
    if (currentModalType === "detail") setDetailModalOpen(true);
    else setEditModalOpen(true);
  }, [currentModalType]);

  return (
    <ModalContext.Provider
      value={{
        handleDeleteOwner,
        handleOpenEditModal,
        handleViewDetails,
        handleCloseDetailModal,
        handleCloseEditOwnerModal,
        handleCloseNewOwnerModal,
        detailModalOpen,
        newOwnerModalOpen,
        setNewOwnerModalOpen,
        editModalOpen,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
