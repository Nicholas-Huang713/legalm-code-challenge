import { render, screen } from "@testing-library/react";
import List from "./List";

const mockOwners = [
  { id: 1, name: "Alice", exp: 10 },
  { id: 2, name: "Bob", exp: 5 },
  { id: 3, name: "Jerry", exp: 3 },
];

const onClickMock = vi.fn();
const renderPopulatedList = () => {
  return render(<List list={mockOwners} handleBtnClick={onClickMock} />);
};
const renderEmptyList = () => {
  return render(<List list={[]} handleBtnClick={onClickMock} />);
};

describe("List component", () => {
  it("renders list component - populated list", () => {
    const { container } = renderPopulatedList();
    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(3);
    const detailsBtnList = screen.getAllByText("Details");
    expect(detailsBtnList).toHaveLength(3);
    const editBtnList = screen.getAllByText("Edit");
    expect(editBtnList).toHaveLength(3);
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Exp: 10yrs")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("renders empty list message - empty list", () => {
    renderEmptyList();
    expect(screen.getByText("Adopt a Dog")).toBeInTheDocument();
  });
});
