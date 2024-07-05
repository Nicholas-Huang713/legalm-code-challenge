import { useState, useEffect } from "react";
import List from "../../components/List/List";
import { useSelector, useDispatch } from "react-redux";
import { fetchDog } from "../../state/slices/dog/dogSlice";
import DetailModal from "../DetailModal/DetailModal";
import Button from "../../components/Button/Button";
import NewOwnerModal from "./../NewOwnerModal/NewOwnerModal";
import { fetchOwners } from "../../state/slices/owner/ownerSlice";
import EditOwnerModal from "../EditOwnerModal/EditOwnerModal";

export default function OwnerList() {
  const dispatch = useDispatch();
  const ownerList = useSelector((state) => state.owner.owners);

  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [newOwnerModalOpen, setNewOwnerModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentModalType, setCurrentModalType] = useState("");

  const handleViewDetails = (dogId) => {
    dispatch(fetchDog(dogId));
    setCurrentModalType("detail");
  };

  const handleOpenEditModal = (dogId) => {
    dispatch(fetchDog(dogId));

    setCurrentModalType("edit");
  };

  const handleDeleteOwner = (ownerId) => {
    console.log("Delete Called", ownerId);
  };

  const handleBtnClick = (event) => {
    const btnType = event.target.textContent;
    const btnValue = event.target.value;
    switch (btnType) {
      case "Details":
        handleViewDetails(btnValue);
        break;
      case "Edit":
        handleOpenEditModal(btnValue);
        break;
      case "X":
        handleDeleteOwner(btnValue);
        break;
      default:
    }
  };

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

  useEffect(() => {
    if (currentModalType === "") return;
    if (currentModalType === "detail") setDetailModalOpen(true);
    else setEditModalOpen(true);
  }, [currentModalType]);

  useEffect(() => {
    dispatch(fetchOwners());
  }, []);

  return (
    <>
      {ownerList.length > 0 ? (
        <>
          <Button
            btnText="Adopt"
            handleClick={() => setNewOwnerModalOpen(true)}
          />
          <Button
            btnText="Filter"
            handleClick={() => setNewOwnerModalOpen(true)}
          />
          <List list={ownerList} handleBtnClick={handleBtnClick} />
        </>
      ) : null}
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
