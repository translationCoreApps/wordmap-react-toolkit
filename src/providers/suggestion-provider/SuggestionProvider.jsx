import React from 'react';
import PropTypes from 'prop-types';
import {useSuggestion} from "../../utils/hooks";

/**
 * Injects a wordMAP suggestion into it's children
 * @param children
 * @param source
 * @param target
 * @param memory
 * @returns {React.DetailedReactHTMLElement<{suggestion: *}, HTMLElement>[]}
 * @constructor
 */
export function SuggestionProvider({children, source, target, memory}) {
    const suggestion = useSuggestion(source, target, memory);
    return React.Children.map(children, child => {
        return React.cloneElement(child, {
            suggestion
        });
    });
}

SuggestionProvider.propTypes = {
    /**
     * Any React component
     */
    children: PropTypes.element.isRequired,
    /**
     * The source text
     */
    source: PropTypes.string.isRequired,
    /**
     * The target text
     */
    target: PropTypes.string.isRequired,
    /**
     * Alignment memory
     */
    memory: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};
SuggestionProvider.defaultProps = {
    memory: []
};