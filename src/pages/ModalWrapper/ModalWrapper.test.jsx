import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ModalContext } from "../../context/ModalContext";
import ModalWrapper from "./ModalWrapper";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { dogDataInStore, ownersList } from "../../test/mocks/mockValues";
import { expect } from "vitest";
const thunkMiddleware = require("redux-thunk").thunk;
const mockStore = configureMockStore([thunkMiddleware]);

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

describe("ModalWrapper component", () => {
  const mockHandleCloseDetailModal = vi.fn();
  const mockHandleCloseNewOwnerModal = vi.fn();
  const mockHandleCloseEditOwnerModal = vi.fn();

  const renderWithContextAndStore = (contextValue) => {
    return render(
      <Provider store={store}>
        <ModalContext.Provider value={contextValue}>
          <ModalWrapper />
        </ModalContext.Provider>
      </Provider>
    );
  };

  it("renders DetailModal when detailModalOpen is true", () => {
    const { container } = renderWithContextAndStore({
      detailModalOpen: true,
      newOwnerModalOpen: false,
      editModalOpen: false,
      handleCloseDetailModal: mockHandleCloseDetailModal,
      handleCloseNewOwnerModal: mockHandleCloseNewOwnerModal,
      handleCloseEditOwnerModal: mockHandleCloseEditOwnerModal,
    });

    expect(screen.getByText("peanut")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("renders NewOwnerModal when newOwnerModalOpen is true", () => {
    renderWithContextAndStore({
      detailModalOpen: false,
      newOwnerModalOpen: true,
      editModalOpen: false,
      handleCloseDetailModal: mockHandleCloseDetailModal,
      handleCloseNewOwnerModal: mockHandleCloseNewOwnerModal,
      handleCloseEditOwnerModal: mockHandleCloseEditOwnerModal,
    });

    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
  });

  it("renders EditOwnerModal when editModalOpen is true", () => {
    renderWithContextAndStore({
      detailModalOpen: false,
      newOwnerModalOpen: false,
      editModalOpen: true,
      handleCloseDetailModal: mockHandleCloseDetailModal,
      handleCloseNewOwnerModal: mockHandleCloseNewOwnerModal,
      handleCloseEditOwnerModal: mockHandleCloseEditOwnerModal,
    });
    const nameInput = screen.getByLabelText(/Name/i);
    expect(nameInput).toBeInTheDocument();
    expect(nameInput.value).toBe("John Doe");
  });

  it("calls handleCloseDetailModal when DetailModal close button is clicked", () => {
    renderWithContextAndStore({
      detailModalOpen: true,
      newOwnerModalOpen: false,
      editModalOpen: false,
      handleCloseDetailModal: mockHandleCloseDetailModal,
      handleCloseNewOwnerModal: mockHandleCloseNewOwnerModal,
      handleCloseEditOwnerModal: mockHandleCloseEditOwnerModal,
    });
    fireEvent.click(screen.getByText("X"));
    expect(mockHandleCloseDetailModal).toHaveBeenCalled();
  });

  it("calls handleCloseNewOwnerModal when NewOwnerModal close button is clicked", () => {
    renderWithContextAndStore({
      detailModalOpen: false,
      newOwnerModalOpen: true,
      editModalOpen: false,
      handleCloseDetailModal: mockHandleCloseDetailModal,
      handleCloseNewOwnerModal: mockHandleCloseNewOwnerModal,
      handleCloseEditOwnerModal: mockHandleCloseEditOwnerModal,
    });
    fireEvent.click(screen.getByText("X"));
    expect(mockHandleCloseNewOwnerModal).toHaveBeenCalled();
  });

  it("calls handleCloseEditOwnerModal when EditOwnerModal close button is clicked", () => {
    renderWithContextAndStore({
      detailModalOpen: false,
      newOwnerModalOpen: false,
      editModalOpen: true,
      handleCloseDetailModal: mockHandleCloseDetailModal,
      handleCloseNewOwnerModal: mockHandleCloseNewOwnerModal,
      handleCloseEditOwnerModal: mockHandleCloseEditOwnerModal,
    });
    fireEvent.click(screen.getByText("X"));
    expect(mockHandleCloseEditOwnerModal).toHaveBeenCalled();
  });
});
