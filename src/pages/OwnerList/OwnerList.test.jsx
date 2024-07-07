import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import OwnerList from "./OwnerList";
import { ModalProvider } from "../../context/ModalContext";
import Modal from "../../components/Modal/Modal";

const thunkMiddleware = require("redux-thunk").thunk;
const mockStore = configureMockStore([thunkMiddleware]);

const mockStoreNoDogData = {
  owner: {
    owners: [
      { id: 1, name: "John Doe", exp: 3, dogId: 1 },
      { id: 2, name: "Jane Doe", exp: 5, dogId: 2 },
    ],
  },
  dog: {
    dogs: {},
  },
};

const mockStoreWithDogData = {
  owner: {
    owners: [
      { id: 1, name: "John Doe", exp: 3, dogId: 1 },
      { id: 2, name: "Jane Doe", exp: 5, dogId: 2 },
    ],
  },
  dog: {
    dogs: {
      dog: { id: 1, name: "Oscar", food: "apples", ownerId: 1 },
      owners: [{ id: 1, name: "Alice", exp: 10, dogId: 1 }],
    },
  },
};

const renderOwnerListNoDogData = () => {
  return render(
    <Provider store={mockStoreNoDogData}>
      <ModalProvider>
        <OwnerList />
      </ModalProvider>
    </Provider>
  );
};

const renderOwnerListWithDogData = () => {
  return render(
    <Provider store={mockStoreWithDogData}>
      <ModalProvider>
        <OwnerList />
      </ModalProvider>
    </Provider>
  );
};

describe.skip("OwnerList Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      owner: {
        owners: [
          { id: 1, name: "John Doe", exp: 3, dogId: 1 },
          { id: 2, name: "Jane Doe", exp: 5, dogId: 2 },
        ],
      },
      dog: {
        dogs: {},
      },
    });
    store.dispatch = vi.fn();
  });

  it("renders List component with correct props when ownerList is not empty", () => {
    // render(
    //   <Provider store={store}>
    //     <OwnerList />
    //   </Provider>
    // );
    renderOwnerListWithDogData();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
  });

  it('calls handleViewDetails when "Details" button is clicked', () => {
    // render(
    //   <Provider store={store}>
    //     <OwnerList />
    //   </Provider>
    // );
    renderOwnerListWithDogData();
    const detailsButton = screen.getAllByText("Details")[0];
    fireEvent.click(detailsButton);
    expect(store.dispatch).toHaveBeenCalled();
  });

  it('calls handleEditOwner when "Edit" button is clicked', () => {
    // render(
    //   <Provider store={store}>
    //     <OwnerList />
    //   </Provider>
    // );
    renderOwnerListWithDogData();
    fireEvent.click(screen.getAllByText("Edit")[0]);
    expect(consoleSpy).toHaveBeenCalledWith("Edit Called");
  });

  //   it('calls handleDeleteOwner when "X" button is clicked', () => {
  //     const consoleSpy = vi.spyOn(console, 'log');
  //     render(
  //       <Provider store={store}>
  //         <OwnerList />
  //       </Provider>
  //     );
  //     fireEvent.click(screen.getAllByText('X')[0]);
  //     expect(consoleSpy).toHaveBeenCalledWith('Delete Called');
  //   });

  it("renders DetailModal when detailModalOpen is true", () => {
    store = mockStore(mockStoreWithDogData);

    // render(
    //   <Provider store={store}>
    //     <OwnerList />
    //   </Provider>
    // );
    renderOwnerListWithDogData();
    // expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("calls handleCloseDetailModal when modal backdrop is clicked", () => {
    // store = mockStore({
    //   owner: {
    //     owners: [
    //       { id: 1, name: "John Doe", exp: 3, dogId: 1 },
    //       { id: 2, name: "Jane Doe", exp: 5, dogId: 2 },
    //     ],
    //   },
    //   dog: {
    //     dogs: {
    //       dog: { id: 1, name: "Dog 1", ownerId: 1 },
    //       owners: [{ id: 1, name: "Alice", exp: 10, dogId: 1 }],
    //     },
    //   },
    // });

    // render(
    //   <Provider store={store}>
    //     <OwnerList />
    //   </Provider>
    // );
    renderOwnerListWithDogData();
    screen.debug();
    // fireEvent.click(screen.getByTestId("modal-backdrop"));
    // expect(screen.queryByText("DetailModal Content")).not.toBeInTheDocument();
  });
});
