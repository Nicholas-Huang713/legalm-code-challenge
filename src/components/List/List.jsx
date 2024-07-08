import Button from "../Button/Button";
import "./List.scss";

/**
 * @module List
 * @description List component for displaying list of current owners. It can be switched from create mode to edit mode using "isEditMode" prop. Set this value to true to edit items.
 *
 * @param {boolean} props.isEditMode - boolean value to determine create or edit mode. set "true" for editMode
 * @param {function} props.sendDataToServer - function to be called when new submit buttong clicked.
 * @param {function} props.handleCloseForm - close function handler to close a modal wrapper.
 * @param {object} props.currentDogWithOwnerInfo - object with current selected dog and owner to view/edit
 */

export default function List({ list, handleBtnClick }) {
  return (
    <div className="list-container">
      <ul className="list-wrapper">
        {list.length > 0 ? (
          list.map((item) => (
            <li key={item.id} className="list-item">
              <div className="list-content">
                <div>
                  <strong>{item.name}</strong>
                </div>
                <div>Exp: {item.exp}yrs</div>
                <div>
                  <Button
                    btnText="X"
                    handleClick={handleBtnClick}
                    value={item.id}
                  />
                </div>
              </div>
              <div className="list-btn-wrapper">
                <Button
                  btnText="Details"
                  handleClick={handleBtnClick}
                  value={item.dogId}
                />
                <Button
                  btnText="Edit"
                  handleClick={handleBtnClick}
                  value={item.dogId}
                />
              </div>
            </li>
          ))
        ) : (
          <div>Adopt a Dog</div>
        )}
      </ul>
    </div>
  );
}
