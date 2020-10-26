import React from "react";

// StyleSheets
import "./NotFound.scss";

// Material UI Icons
import { ReportProblem as ReportProblemIcon } from "@material-ui/icons";

// Components
import MakeIcon from "../Utility/MakeIcon/MakeIcon";

function NotFound() {
    return (
        <div className="not-found">
            <span className="not-found__icon">
                <MakeIcon icon={ReportProblemIcon} />
            </span>
            <span className="not-found__content">Sorry, page not found</span>
        </div>
    );
}

export default NotFound;
