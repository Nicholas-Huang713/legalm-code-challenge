import React from 'react'
import List from '../../components/List/List';
import {useSelector} from 'react-redux';


export default function OwnerList() {
    const ownerList = useSelector((state) => state.owner.owners);

    const handleViewDetails = (ownerId) => {
        console.log("View More Called")

    }   
    const handleEditOwner = (ownerId) => {
        console.log("Edit Called")

    }   
    const handleDeleteOwner = (ownerId) => {
        console.log("Delete Called")
    }   

    const handleBtnClick = (event) => {
        const btnType = event.target.textContent;
        const ownerId = event.target.value;
        switch (btnType) {
            case "More":
                handleViewDetails(ownerId)
                break;
            case "Edit":
                handleEditOwner(ownerId)
              break;
            case "Delete":
                handleDeleteOwner(ownerId)
              break;
            default:
          }

    }

    return (
        <>
            {ownerList.length > 0 ?
                <List 
                    list={ownerList} 
                    showBtns={true} 
                    handleBtnClick={handleBtnClick}
                />
                :null
            }
        </>
    )
}
