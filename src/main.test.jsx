import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import App from "./App";
import store from "./state/store";

describe("Entry Point", () => {
  it("renders the App component without crashing", () => {
    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(getByText("Dog Adoption")).toBeInTheDocument();
  });
});
