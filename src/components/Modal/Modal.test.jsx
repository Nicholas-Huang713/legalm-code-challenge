import { render, fireEvent, screen } from "@testing-library/react";
import Modal from "./Modal";

const renderModal = (isOpen, onClose) =>
  render(
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>Children</div>
    </Modal>
  );
const mockOnClose = vi.fn();

describe("Modal component", () => {
  it("renders Modal", () => {
    const { container } = renderModal(true, mockOnClose);
    expect(screen.getByText("Children")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("close btn calls mockOnClose", () => {
    renderModal(true, mockOnClose);
    const closeBtn = screen.getByText("X");
    fireEvent.click(closeBtn);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("click backdrop calls mockOnClose", () => {
    renderModal(true, mockOnClose);
    const backdrop = screen.getByTestId("modal-backdrop");
    fireEvent.click(backdrop);
    expect(mockOnClose).toHaveBeenCalled();
  });
});
