import React, {useState} from 'react';
import PropTypes from 'prop-types';
import CancelIcon from '@material-ui/icons/Cancel';
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    icon: props => ({
        transition: '0.1s',
        opacity: props.hover ? 1: 0.5,
        marginLeft: 5,
        width: 20,
        height: 20,
        color: '#646464',
        ...props.style
    })
});

/**
 * Renders controls for a word
 * @param {bool} isSuggestion
 * @param {func} onClick
 * @return {*}
 * @constructor
 */
export function Controls(props) {
    const [hover, setHover] = useState(false);
    const classes = useStyles({
        ...props,
        hover
    });

    function handleOver() {
        setHover(true);
    }

    function handleOut() {
        setHover(false);
    }

    return (
        <CancelIcon onClick={props.onCancel}
                    onMouseOver={handleOver}
                    onMouseOut={handleOut}
                    className={classes.icon}/>
    );

}

Controls.propTypes = {
    onCancel: PropTypes.func,
    style: PropTypes.object
};
Controls.defaultProps = {
    style: {}
};