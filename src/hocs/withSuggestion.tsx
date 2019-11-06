import React from "react";
import {useSuggestions, useWordMAP} from "../core/hooks";

interface WithSuggestionProps {
    source: string;
    target: string;
    memory: string[][];
    corpus?: string[];
}

/**
 * Adds a suggestion to the wrapped component.
 * @param WrappedComponent
 * @param {string} source
 * @param {string} target
 * @param {array} memory
 * @param corpus
 * @returns {function(*): *}
 */
export function withSuggestion(WrappedComponent: any, {source, target, memory, corpus = []}: WithSuggestionProps) {
    return (props: object) => {
        const suggestion = useSuggestions(source, target, memory, corpus as string[], 1, false, {});
        return (
            <WrappedComponent suggestion={suggestion} {...props} />
        );
    };
}

interface withWordMAPProps {
    memory: string[][];
}

/**
 * Adds wordMAP to the wrapped component.
 * @param WrappedComponent
 * @param {array} memory
 * @returns {function(*): *}
 */
export function withWordMAP(WrappedComponent: any, {memory}: withWordMAPProps) {
    return (props: object) => {
        const map = useWordMAP(memory);
        return (
            <WrappedComponent wordMAP={map} {...props}/>
        );
    };
}
