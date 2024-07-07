import "./Modal.scss";

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
