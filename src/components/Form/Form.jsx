import { useState, useEffect } from "react";
import { getRandomDog } from "../../constants/randomDogInfo";
import "./Form.scss";

const Form = ({
  isEditMode,
  formValuesToEdit,
  sendDataToServer,
  handleCloseForm,
}) => {
  const initialFormData = {
    name: "",
    experience: 0,
  };
  const initialDogData = {
    img: "",
    name: "",
    food: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
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
    if (!formData.experience) {
      errors.experience = "Experience is required";
    }
    return errors;
  };

  const resetInitialInputs = () => {
    setErrors({});
    setApiError(null);
    setFormData(initialFormData);
    setRandomDog(initialDogData);
    setOwnedDog(initialDogData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
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
    if (isEditMode && formValuesToEdit) {
      const { ownedDog, ownerData } = formValuesToEdit;
      setFormData(ownerData);
      setOwnedDog(ownedDog);
    } else {
      const newRandomDog = getRandomDog();
      setRandomDog(newRandomDog);
    }
    () => {
      resetInitialInputs();
    };
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <header>
        <h2>{isEditMode ? "Edit Profile" : "Adopt a Dog"}</h2>
      </header>
      {apiError && <div className="form-error">{apiError}</div>}
      <div className="form-input-container">
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
          />
          {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}
        </div>
        <div>
          <label htmlFor="experience">Yrs of Exp</label>
          <input
            type="number"
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
          />
          {errors.experience && (
            <span style={{ color: "red" }}>{errors.experience}</span>
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
