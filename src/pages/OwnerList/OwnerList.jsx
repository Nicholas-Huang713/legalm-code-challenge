import { useState, useEffect, useContext } from "react";
import List from "../../components/List/List";
import { useSelector, useDispatch } from "react-redux";
import Button from "../../components/Button/Button";
import { fetchOwners } from "../../state/slices/owner/ownerThunks";
import FilterButton from "../../components/FilterButton/FilterButton";
import { ModalContext } from "../../context/ModalContext";
import ModalWrapper from "../ModalWrapper/ModalWrapper";

export default function OwnerList() {
  const dispatch = useDispatch();
  const ownerList = useSelector((state) => state.owner.owners);
  const {
    handleViewDetails,
    handleOpenEditModal,
    handleDeleteOwner,
    setNewOwnerModalOpen,
  } = useContext(ModalContext);
  const [currentOwnerList, setCurrentOwnerList] = useState(0);

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
      <ModalWrapper />
    </>
  );
}
