import { useState, useEffect } from "react";
import List from "../../components/List/List";
import { useSelector, useDispatch } from "react-redux";
import { fetchDog } from "../../state/slices/dog/dogSlice";
import DetailModal from "../DetailModal/DetailModal";
import Button from "../../components/Button/Button";
import NewOwnerModal from "./../NewOwnerModal/NewOwnerModal";
import { fetchOwners } from "../../state/slices/owner/ownerSlice";

export default function OwnerList() {
  const dispatch = useDispatch();
  const ownerList = useSelector((state) => state.owner.owners);
  const currentDogToView = useSelector((state) => state.dog.dogs);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [newOwnerModalOpen, setNewOwnerModalOpen] = useState(false);

  const handleViewDetails = (dogId) => {
    dispatch(fetchDog(dogId));
  };
  const handleEditOwner = (ownerId) => {
    console.log("Edit Called");
  };
  const handleDeleteOwner = (ownerId) => {
    console.log("Delete Called");
  };

  const handleBtnClick = (event) => {
    const btnType = event.target.textContent;
    const btnValue = event.target.value;
    switch (btnType) {
      case "Details":
        handleViewDetails(btnValue);
        break;
      case "Edit":
        handleEditOwner(btnValue);
        break;
      case "X":
        handleDeleteOwner(btnValue);
        break;
      default:
    }
  };

  const handleCloseDetailModal = () => {
    setDetailModalOpen(false);
  };

  const handleOpenNewOwnerModal = () => setNewOwnerModalOpen(true);

  const handleCloseNewOwnerModal = () => setNewOwnerModalOpen(false);

  useEffect(() => {
    currentDogToView.dog && setDetailModalOpen(true);
  }, [currentDogToView]);

  useEffect(() => {
    dispatch(fetchOwners());
  }, []);

  return (
    <>
      {ownerList.length > 0 ? (
        <>
          <Button btnText="Adopt" handleClick={handleOpenNewOwnerModal} />
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
    </>
  );
}
