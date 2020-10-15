import React from 'react';

// Stylesheet
import './Dropdown.scss';

// Material-UI Icons
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';

// Components
import MakeIcon from '../../Utility/MakeIcon/MakeIcon';

function Dropdown(props) {
    const { text, icon, rightIcon, active } = props;
    const classList = ['dropdown'];
    if(active) {
        classList.push('active');
    }
    
    return (
        <li className={classList.join(' ')}>
            {icon && <span className="nav__icon">{icon}</span>}
            {text}
            {rightIcon && <span className="nav__icon nav__icon--right">{<MakeIcon icon={ExpandMoreIcon} />}</span>}
            <ul className="dropdown__list">
                {props.children}
            </ul>
        </li>
    );
}

export default Dropdown;
