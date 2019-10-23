import {Link} from "@material-ui/icons";
import React from "react";
import PropTypes from 'prop-types';

export function MemoryLabel({source, target}) {
    return (
        <>
            <span>{source}</span>
            <Link/>
            <span>{target}</span>
        </>
    );
}

MemoryLabel.propTypes = {
    /**
     * The source word or phrase
     */
    source: PropTypes.string.isRequired,
    /**
     * The target word or phrase
     */
    target: PropTypes.string.isRequired
};