import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import NewOwnerModal from "./NewOwnerModal";
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

describe("NewOwnerModal component", () => {
  it("renders successfully", async () => {
    initStoreWithDogData();
    render(
      <Provider store={store}>
        <NewOwnerModal handleCloseNewOwnerModal={mockCloseModal} />
      </Provider>
    );
    const nameInput = screen.getByLabelText(/Name/i);
    expect(nameInput).toBeInTheDocument();
  });
});
