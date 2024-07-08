import "./Modal.scss";

/**
 * @module Modal
 * @description List component for displaying list of current owners. It can be switched from create mode to edit mode using "isEditMode" prop. Set this value to true to edit items.
 *
 * @param {function} props.onClose - onClose function to handle closeing modal
 * @param {object} props.children - children components withint Modal container
 */

const Modal = ({ onClose, children }) => {
  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      data-testid="modal-backdrop"
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          X
        </button>
        <section className="modal-content-main">{children}</section>
      </div>
    </div>
  );
};

export default Modal;
