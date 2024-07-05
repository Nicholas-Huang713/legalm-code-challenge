export default function Button({ btnText, handleClick, value }) {
  return (
    <button value={value ? value : null} onClick={handleClick}>
      {btnText}
    </button>
  );
}
