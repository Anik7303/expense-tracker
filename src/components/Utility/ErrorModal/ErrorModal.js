import React, { Fragment } from "react";

// Stylesheet
import "./ErrorModal.scss";

// Material-UI Icons
import { ErrorOutlineRounded } from "@material-ui/icons";

// Components
import MakeIcon from "../MakeIcon/MakeIcon";
import Backprop from "../Backdrop/Backdrop";

function ErrorModal(props) {
    const { data, closeFn } = props;
    const element = (
        <Fragment>
            <Backprop show close={closeFn} />
            <div className="modal-error">
                <div className="modal__header">
                    <h4 className="heading-4 heading--modal">
                        <span class="modal__icon">
                            <MakeIcon icon={ErrorOutlineRounded} />
                        </span>
                        <span>Error</span>
                    </h4>
                </div>
                <div className="modal__content">
                    <p className="modal__text">{data?.message}</p>
                </div>
                <div className="modal__footer">
                    <button className="btn btn__close" onClick={closeFn}>
                        Close
                    </button>
                </div>
            </div>
        </Fragment>
    );

    return data ? element : null;
}

export default ErrorModal;
