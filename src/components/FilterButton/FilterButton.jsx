import { useState, useEffect } from "react";
const optionsArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function FilterButton({ setFilter }) {
  const [selectedOption, setSelectedOption] = useState(0);

  const renderOptions = () => {
    return optionsArr.map((val) => (
      <option value={val} key={val}>
        {val}
      </option>
    ));
  };

  const handleChange = (event) => setSelectedOption(event.target.value);

  useEffect(() => {
    setFilter(selectedOption);
  }, [selectedOption]);

  return (
    <>
      <label htmlFor="filter">Filter by Exp </label>
      <select id="filter" value={selectedOption} onChange={handleChange}>
        <option value="none">None</option>
        {renderOptions()}
      </select>
    </>
  );
}
