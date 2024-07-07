import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import OwnerList from "./OwnerList";
import { ModalProvider } from "../../context/ModalContext";

import { dogDataInStore, ownersList } from "../../test/mocks/mockValues";
const thunkMiddleware = require("redux-thunk").thunk;
const mockStore = configureMockStore([thunkMiddleware]);

const renderOwnerList = () => {
  return render(
    <Provider store={store}>
      <ModalProvider>
        <OwnerList />
      </ModalProvider>
    </Provider>
  );
};

let store;

const initStoreWithDogData = () => {
  store = mockStore({
    owner: ownersList,
    dog: dogDataInStore,
  });
  store.dispatch = vi.fn();
};

beforeEach(() => {
  initStoreWithDogData();
});

describe("OwnerList Component", () => {
  it("renders List component with correct props when ownerList is not empty", () => {
    const { container, getByText } = renderOwnerList();
    expect(getByText("John Doe")).toBeInTheDocument();
    expect(getByText("Jane Doe")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('calls handleViewDetails when "Details" button is clicked', () => {
    renderOwnerList();
    const detailsButton = screen.getAllByText("Details")[0];
    fireEvent.click(detailsButton);
    expect(store.dispatch).toHaveBeenCalled();
  });

  it('calls handleEditOwner when "Edit" button is clicked', () => {
    renderOwnerList();
    fireEvent.click(screen.getAllByText("Edit")[0]);
    expect(store.dispatch).toHaveBeenCalled();
  });

  it('calls handleDeleteOwner when "X" button is clicked', () => {
    renderOwnerList();
    fireEvent.click(screen.getAllByText("X")[0]);
    expect(store.dispatch).toHaveBeenCalled();
  });

  it("filters list based on filter selection", () => {
    renderOwnerList();
    const selectBox = screen.getByLabelText(/Filter by Exp/i);
    fireEvent.change(selectBox, { target: { value: "5" } });
    expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    fireEvent.change(selectBox, { target: { value: "3" } });
    expect(screen.queryByText("Jane Doe")).not.toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    fireEvent.change(selectBox, { target: { value: "none" } });
    expect(screen.getAllByText("Details")).toHaveLength(2);
  });
});
