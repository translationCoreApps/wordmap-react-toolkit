import React from "react";
import {useSuggestion, useWordMAP} from "../core/hooks";

/**
 * Adds a suggestion to the wrapped component.
 * @param WrappedComponent
 * @param {string} source
 * @param {string} target
 * @param {array} memory
 * @returns {function(*): *}
 */
export function withSuggestion(WrappedComponent, {source, target, memory}) {
    return props => {
        const suggestion = useSuggestion(source, target, memory);
        return (
            <WrappedComponent suggestion={suggestion}/>
        );
    };
}

/**
 * Adds wordMAP to the wrapped component.
 * @param WrappedComponent
 * @param {array} memory
 * @returns {function(*): *}
 */
export function withWordMAP(WrappedComponent, {memory}) {
    return props => {
        const map = useWordMAP(memory);
        return (
            <WrappedComponent wordMAP={map}/>
        );
    };
}
