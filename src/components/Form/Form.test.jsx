// Form.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import Form from "./Form";

const handleCloseForm = vi.fn();
const mockSendDataToServer = vi.fn();

const renderNewOwnerForm = () => {
  return render(
    <Form
      isEditMode={false}
      sendDataToServer={mockSendDataToServer}
      handleCloseForm={handleCloseForm}
    />
  );
};
const renderEditOwnerForm = () => {
  return render(
    <Form
      isEditMode={true}
      sendDataToServer={mockSendDataToServer}
      handleCloseForm={handleCloseForm}
      currentDogWithOwnerInfo={{
        owners: [{ name: "jane", exp: 5 }],
        dog: { img: "imgUrl", name: "peanut", food: "apples" },
      }}
    />
  );
};

describe("Form Component", () => {
  it("renders Form and submits data", async () => {
    const { getByLabelText, getByText } = renderNewOwnerForm();
    fireEvent.change(getByLabelText(/Name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(getByLabelText(/Yrs of Exp/i), {
      target: { value: "5" },
    });
    fireEvent.click(getByText(/Submit/i));
    expect(mockSendDataToServer).toHaveBeenCalled();
  });

  it("error messages appear inputs left blank", async () => {
    renderNewOwnerForm();
    fireEvent.click(screen.getByText(/Submit/i));
    expect(screen.getByText("Name is required")).toBeInTheDocument();
    expect(screen.getByText("Experience is required")).toBeInTheDocument();
  });

  it("error messages appear inputs left blank", async () => {
    renderEditOwnerForm();
    const nameInput = screen.getByLabelText(/Name/i);
    const expInput = screen.getByLabelText(/Yrs of Exp/i);
    expect(nameInput.value).toBe("jane");
    expect(expInput.value).toBe("5");
  });
});
