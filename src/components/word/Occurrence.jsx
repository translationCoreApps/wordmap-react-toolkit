import React from 'react';
import PropTypes from 'prop-types';
import {Tooltip} from "@material-ui/core";

const styles = {
    top: 0,
    marginTop: '2px',
    opacity: '0.8'
};

/**
 * Renders a words occurrence.
 * This is rendered as a superscript.
 * @param {int} occurrence - the order in which this word occurs (1 indexed).
 * @param {int} occurrences - how many times this word occurs in the context
 * @param {object} [style] - overrides the default styles
 * @return {*}
 * @constructor
 */
export function Occurrence({occurrence, occurrences, style}) {
    const computedStyles = {
        ...styles,
        ...style
    };
    if (occurrences > 1) {
        return (
            <Tooltip title={`${occurrence}/${occurrences}`}>
                <sup style={computedStyles}>{occurrence}</sup>
            </Tooltip>
        );
    } else {
        return <></>;
    }
}

Occurrence.propTypes = {
    occurrence: PropTypes.number.isRequired,
    occurrences: PropTypes.number.isRequired,
    style: PropTypes.object
};