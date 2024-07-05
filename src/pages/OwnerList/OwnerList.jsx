import { useState, useEffect } from "react";
import List from "../../components/List/List";
import { useSelector, useDispatch } from "react-redux";
import { fetchDog } from "../../state/slices/dog/dogSlice";
import DetailModal from "../DetailModal/DetailModal";
import Button from "../../components/Button/Button";
import NewOwnerModal from "./../NewOwnerModal/NewOwnerModal";
import { fetchOwners, deleteOwner } from "../../state/slices/owner/ownerSlice";
import EditOwnerModal from "../EditOwnerModal/EditOwnerModal";
import FilterButton from "../../components/FilterButton/FilterButton";

export default function OwnerList() {
  const dispatch = useDispatch();
  const ownerList = useSelector((state) => state.owner.owners);

  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [newOwnerModalOpen, setNewOwnerModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentModalType, setCurrentModalType] = useState("");
  const [currentOwnerList, setCurrentOwnerList] = useState(0);

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

  const filterListByExp = (filterOption) => {
    if (filterOption === "none") {
      setCurrentOwnerList(ownerList);
    } else {
      const filteredList = ownerList.filter(
        (owner) => owner.exp == filterOption
      );
      setCurrentOwnerList(filteredList);
    }
  };

  useEffect(() => {
    if (currentModalType === "") return;
    if (currentModalType === "detail") setDetailModalOpen(true);
    else setEditModalOpen(true);
  }, [currentModalType]);

  useEffect(() => {
    dispatch(fetchOwners());
  }, []);

  useEffect(() => {
    setCurrentOwnerList(ownerList);
  }, [ownerList]);

  return (
    <>
      <Button btnText="Adopt" handleClick={() => setNewOwnerModalOpen(true)} />
      <FilterButton setFilter={filterListByExp} />
      {currentOwnerList.length > 0 ? (
        <List list={currentOwnerList} handleBtnClick={handleBtnClick} />
      ) : (
        <div style={{ marginTop: "10px" }}>No Owners To Display</div>
      )}
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
