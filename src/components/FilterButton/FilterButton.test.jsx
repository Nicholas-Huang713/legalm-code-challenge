import { render, screen, fireEvent } from "@testing-library/react";
import FilterButton from "./FilterButton";

describe("FilterButton Component", () => {
  it("renders FilterButton and changes the filter", () => {
    const setFilter = vi.fn();
    const { container } = render(<FilterButton setFilter={setFilter} />);
    expect(screen.getByLabelText(/Filter by Exp/i)).toBeInTheDocument();
    const selectBox = screen.getByLabelText(/Filter by Exp/i);
    fireEvent.change(selectBox, { target: { value: "5" } });
    expect(setFilter).toHaveBeenCalledWith("5");
    fireEvent.change(selectBox, { target: { value: "10" } });
    expect(setFilter).toHaveBeenCalledWith("10");
    expect(container).toMatchSnapshot();
  });
});
