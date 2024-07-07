import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import DetailModal from "./DetailModal";

const thunkMiddleware = require("redux-thunk").thunk;
const mockStore = configureMockStore([thunkMiddleware]);
const mockCloseDetailModal = vi.fn();

let store;

const initStoreNoDogData = () => {
  store = mockStore({
    owner: {
      owners: [
        { id: 1, name: "John Doe", exp: 3, dogId: 1 },
        { id: 2, name: "Jane Doe", exp: 5, dogId: 2 },
      ],
    },
    dog: {
      dogs: {
        dog: {},
        owners: [],
      },
    },
  });
  store.dispatch = vi.fn();
};

const initStoreWithDogData = () => {
  store = mockStore({
    owner: {
      owners: [
        { id: 1, name: "John Doe", exp: 3, dogId: 1 },
        { id: 2, name: "Jane Doe", exp: 5, dogId: 2 },
      ],
    },
    dog: {
      dogs: {
        dog: { id: 1, name: "peanut", food: "pizza", ownerId: "1" },
        owners: [{ id: 1, name: "John Doe", exp: 3, dogId: 1 }],
      },
    },
  });
  store.dispatch = vi.fn();
};

describe("DetailModal component", () => {
  it("renders no data text when no dog data to display", () => {
    initStoreNoDogData();
    render(
      <Provider store={store}>
        <DetailModal
          isOpen={true}
          handleCloseDetailModal={mockCloseDetailModal}
        />
      </Provider>
    );
    expect(screen.getByText("No data to display")).toBeInTheDocument();
  });

  it("renders modal with dog data", () => {
    initStoreWithDogData();
    render(
      <Provider store={store}>
        <DetailModal
          isOpen={true}
          handleCloseDetailModal={mockCloseDetailModal}
        />
      </Provider>
    );
    expect(screen.getByText("peanut")).toBeInTheDocument();
    expect(screen.getByText("pizza")).toBeInTheDocument();
  });
});
