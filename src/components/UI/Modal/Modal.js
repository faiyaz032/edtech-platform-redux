import { createPortal } from 'react-dom';

export default function Modal({ children, setOpenModal, title }) {
  const handleClose = e => {
    setOpenModal(false);
  };

  return createPortal(
    <div className="overlay">
      <div className="modal">
        <button className="modal-close-button font-extrabold" onClick={handleClose}>
          X
        </button>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">{title}</h2>
        <div>{children}</div>
      </div>
    </div>,
    document.getElementById('portal')
  );
}
