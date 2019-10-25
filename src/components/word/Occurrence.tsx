import React from 'react';
import {Tooltip} from "@material-ui/core";

interface OccurrenceProps {
    /**
     * The order in which this word occurs (1 indexed).
     */
    occurrence: number;
    /**
     * How many times this word occurs in the context.
     */
    occurrences: number;
    /**
     * Overrides the default styles
     */
    style?: any;
}

const styles = {
    top: 0,
    marginTop: '2px',
    opacity: '0.8'
};

/**
 * Renders a words occurrence.
 * This is rendered as a superscript.
 * @constructor
 */
export function Occurrence(props : OccurrenceProps) {
    const computedStyles = {
        ...styles,
        ...props.style
    };
    if (props.occurrences > 1) {
        return (
            <Tooltip title={`${props.occurrence}/${props.occurrences}`}>
                <sup style={computedStyles}>{props.occurrence}</sup>
            </Tooltip>
        );
    } else {
        return <></>;
    }
}

Occurrence.defaultProps = {
    style: {}
} as Partial<OccurrenceProps>;