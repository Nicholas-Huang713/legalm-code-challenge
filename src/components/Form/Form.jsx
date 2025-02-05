import { useState, useEffect } from "react";
import { getRandomDog } from "../../constants/randomDogInfo";
import "./Form.scss";

/**
 * @module Form
 * @description Form component for displaying interactive owner forms. It can be switched from create mode to edit mode using "isEditMode" prop. Set this value to true to edit items.
 *
 * @param {boolean} props.isEditMode - boolean value to determine create or edit mode. set "true" for editMode
 * @param {function} props.sendDataToServer - function to be called when new submit buttong clicked.
 * @param {function} props.handleCloseForm - close function handler to close a modal wrapper.
 * @param {object} props.currentDogWithOwnerInfo - object with current selected dog and owner to view/edit
 * @returns {ReactNode}
 */

const Form = ({
  isEditMode,
  sendDataToServer,
  handleCloseForm,
  currentDogWithOwnerInfo,
}) => {
  const initialFormData = {
    name: "",
    exp: 0,
  };
  const initialDogData = {
    img: "",
    name: "",
    food: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setValErrors] = useState({});
  const [ownedDog, setOwnedDog] = useState(initialDogData);
  const [randomDog, setRandomDog] = useState(initialDogData);
  const [apiError, setApiError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const errors = {};
    if (!formData.name) {
      errors.name = "Name is required";
    }
    if (!formData.exp) {
      errors.exp = "Experience is required";
    }
    return errors;
  };

  const resetInitialInputs = () => {
    setValErrors({});
    setApiError(null);
    setFormData(initialFormData);
    setRandomDog(initialDogData);
    setOwnedDog(initialDogData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setValErrors(validationErrors);
    } else {
      const dataToSend = {
        dog: isEditMode ? ownedDog : randomDog,
        owner: formData,
      };
      try {
        await sendDataToServer(dataToSend);
        resetInitialInputs();
        handleCloseForm();
      } catch (e) {
        setApiError(e.message);
      }
    }
  };

  useEffect(() => {
    if (isEditMode && currentDogWithOwnerInfo.owners) {
      const { dog, owners } = currentDogWithOwnerInfo;
      setFormData(owners[0]);
      setOwnedDog(dog);
    } else {
      const newRandomDog = getRandomDog();
      setRandomDog(newRandomDog);
    }
    return () => resetInitialInputs();
  }, [currentDogWithOwnerInfo]);

  return (
    <form onSubmit={handleSubmit}>
      <header>
        <h2>{isEditMode ? "Edit Profile" : "Adopt a Dog"}</h2>
      </header>
      {apiError && <div className="form-error">{apiError}</div>}
      <div className="form-input-container">
        <div>
          <label htmlFor="name">Name </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
          />
          <div>
            {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}
          </div>
        </div>
        <div>
          <label htmlFor="exp">Yrs of Exp </label>
          <input
            type="number"
            id="exp"
            name="exp"
            value={formData.exp}
            onChange={handleChange}
          />
          {errors.exp && (
            <div>
              <span style={{ color: "red" }}>{errors.exp}</span>
            </div>
          )}
        </div>
      </div>
      <div>
        <img
          src={isEditMode ? ownedDog.img : randomDog.img}
          className="form-img"
        />
      </div>
      <div className="form-dog-info">
        <div>
          <strong>Name:</strong> {isEditMode ? ownedDog.name : randomDog.name}
        </div>
        <div>
          <strong>Favorite food:</strong>{" "}
          {isEditMode ? ownedDog.food : randomDog.food}
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
