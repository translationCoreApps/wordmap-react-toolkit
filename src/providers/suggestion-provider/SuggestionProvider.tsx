import React, {DetailedReactHTMLElement, HTMLAttributes, ReactElement} from 'react';
import {useSuggestions} from "../../core/hooks";

interface SuggestionProviderProps {
    /**
     * Any React component
     */
    children: JSX.Element | JSX.Element[];
    /**
     * The source text
     */
    source: string;
    /**
     * The target text
     */
    target: string;
    /**
     * Alignment memory
     */
    memory: string[][];
}

/**
 * Injects a wordMAP suggestion into it's children
 * @param children
 * @param source
 * @param target
 * @param memory
 * @returns {React.DetailedReactHTMLElement<{suggestion: *}, HTMLElement>[]}
 * @constructor
 */
export function SuggestionProvider({children, source, target, memory}: SuggestionProviderProps) {
    const suggestions = useSuggestions(source, target, memory, [], 1, false, {});
    return React.Children.map(children, child => {
        return React.cloneElement(child, {
            suggestion: suggestions[0]
        } as HTMLAttributes<HTMLElement>);
    });
}

SuggestionProvider.defaultProps = {
    memory: []
} as Partial<SuggestionProviderProps>;