import ReactDOM from "react-dom";
import "./scss/Modal.scss";

export const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      <div className="modal-wrapper">
        <div className="modal-overlay" onClick={onClose} />
        <div className="modal-window">
          {children}
          <button className="close" onClick={onClose}>
            閉じる
          </button>
        </div>
      </div>
    </>,
    document.getElementById("modal-root")
  );
};
