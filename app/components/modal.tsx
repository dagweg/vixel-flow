import React, { useRef } from "react";

function Modal() {
    const modalref = useRef<HTMLDialogElement>(null);

    return (
        <div>
            <button
                className="btn"
                onClick={() => modalref.current?.showModal()}
            >
                open modal
            </button>
            <dialog ref={modalref} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">
                        Press ESC key or click the button below to close
                    </p>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
}

export default Modal;
