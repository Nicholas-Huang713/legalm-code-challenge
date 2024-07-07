import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import DetailModal from "./DetailModal";
const thunkMiddleware = require("redux-thunk").thunk;
const mockStore = configureMockStore([thunkMiddleware]);
const mockCloseDetailModal = vi.fn();
import {
  emptyDogDataInStore,
  dogDataInStore,
  ownersList,
} from "../../test/mocks/mockValues";

let store;

const initStoreNoDogData = () => {
  store = mockStore({
    owner: ownersList,
    dog: emptyDogDataInStore,
  });
  store.dispatch = vi.fn();
};

const initStoreWithDogData = () => {
  store = mockStore({
    owner: ownersList,
    dog: dogDataInStore,
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
    const { container } = render(
      <Provider store={store}>
        <DetailModal
          isOpen={true}
          handleCloseDetailModal={mockCloseDetailModal}
        />
      </Provider>
    );
    expect(screen.getByText("peanut")).toBeInTheDocument();
    expect(screen.getByText("pizza")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
