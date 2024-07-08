/**
 * A simple Button component that handles action when clicked.
 * @param {object} props - The component props.
 * @param {string} props.btnText - Text to display in button.
 * @param {string} props.handleClick - Function to be called with button is clicked.
 * @param {string} props.value - Value of button.
 * @returns {JSX.Element} The rendered component.
 */

export default function Button({ btnText, handleClick, value }) {
  return (
    <button value={value ? value : null} onClick={handleClick}>
      {btnText}
    </button>
  );
}
