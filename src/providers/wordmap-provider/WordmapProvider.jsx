import React from 'react';
import PropTypes from 'prop-types';
import {useWordMAP} from "../../utils/hooks";

/**
 * Injects wordMAP into it's children.
 * @param children
 * @param memory
 * @returns {React.DetailedReactHTMLElement<{wordmap: *}, HTMLElement>[]}
 * @constructor
 */
export function WordmapProvider({children, memory}) {
    const map = useWordMAP(memory);
    return React.Children.map(children, child => {
        return React.cloneElement(child, {
            wordMAP: map
        });
    });
}
WordmapProvider.propTypes = {
    /**
     * Any React component
     */
    children: PropTypes.element.isRequired,
    /**
     * Alignment memory
     */
    memory: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};

WordmapProvider.defaultProps = {
    memory: []
};