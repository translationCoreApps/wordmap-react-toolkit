import React, {DetailedReactHTMLElement, HTMLAttributes, ReactElement} from 'react';
import {useSuggestion} from "../../core/hooks";

interface SuggestionProviderProps {
    /**
     * Any React component
     */
    children: ReactElement | ReactElement[];
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
    const suggestion = useSuggestion(source, target, memory);
    return React.Children.map(children, child => {
        return React.cloneElement(child, {
            suggestion
        } as HTMLAttributes<HTMLElement>);
    });
}

SuggestionProvider.defaultProps = {
    memory: []
} as Partial<SuggestionProviderProps>;