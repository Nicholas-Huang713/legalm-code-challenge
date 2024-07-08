import { useState, useEffect } from "react";

/**
 * @module FilterButton
 * @description Filter component for displaying interactive buttons.
 * Filter component for displaying interactive buttons.
 * @param {function} props.setFilter - filter function to be called when new option selected.
 */

export default function FilterButton({ setFilter }) {
  const optionsArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
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
