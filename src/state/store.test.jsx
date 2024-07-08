import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import configureMockStore from "redux-mock-store";
import { ownersList, dogDataInStore } from "../test/mocks/mockValues";
import App from "../App";

describe("Redux Store Configuration", () => {
  let store;
  const thunkMiddleware = require("redux-thunk").thunk;
  const mockStore = configureMockStore([thunkMiddleware]);

  beforeAll(() => {
    store = mockStore({
      owner: ownersList,
      dog: dogDataInStore,
    });
    store.dispatch = vi.fn();
  });

  it("should handle action correctly", () => {
    const action = { type: "owners/fetchOwners", payload: {} };
    store.dispatch(action);
    const newState = store.getState();
    expect(newState.owner.owners).toHaveLength(2);
  });

  it("should render component with Redux Provider", async () => {
    const { container } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(container).toBeInTheDocument();
  });
});
