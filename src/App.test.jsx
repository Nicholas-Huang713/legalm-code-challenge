import { render, screen } from "@testing-library/react";
import App from "./App";
const thunkMiddleware = require("redux-thunk").thunk;
const mockStore = configureMockStore([thunkMiddleware]);
import { dogDataInStore, ownersList } from "./test/mocks/mockValues";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

let store;

const initStoreWithDogData = () => {
  store = mockStore({
    owner: ownersList,
    dog: dogDataInStore,
  });
  store.dispatch = vi.fn();
};

const renderApp = () =>
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

describe("app", () => {
  it("component renders", () => {
    initStoreWithDogData();
    renderApp();
    expect(screen.getByText("Dog Adoption")).toBeInTheDocument();
  });
});
