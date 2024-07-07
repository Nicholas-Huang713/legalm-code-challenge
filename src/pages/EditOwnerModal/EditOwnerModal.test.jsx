import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import EditOwnerModal from "./EditOwnerModal";
import { dogDataInStore, ownersList } from "../../test/mocks/mockValues";

const thunkMiddleware = require("redux-thunk").thunk;
const mockStore = configureMockStore([thunkMiddleware]);
const mockCloseModal = vi.fn();
let store;

const initStoreWithDogData = () => {
  store = mockStore({
    owner: ownersList,
    dog: dogDataInStore,
  });
  store.dispatch = vi.fn();
};

describe("EditOwnerModal component", () => {
  it("submit calls handleCloseDetailModal", async () => {
    initStoreWithDogData();
    const { container } = render(
      <Provider store={store}>
        <EditOwnerModal handleCloseEditOwnerModal={mockCloseModal} />
      </Provider>
    );
    const nameInput = screen.getByLabelText(/Name/i);
    fireEvent.change(nameInput, {
      target: { value: "John Wick" },
    });
    fireEvent.click(screen.getByText("Submit"));
    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith(expect.any(Function));
    });
    expect(container).toMatchSnapshot();
  });
});
