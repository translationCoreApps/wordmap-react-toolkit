import React, {HTMLAttributes, ReactElement} from 'react';
import {useWordMAP} from "../../core/hooks";

interface WordmapProviderProps {
    /**
     * Any React component
     */
    children: ReactElement | ReactElement [];
    /**
     * Alignment memory
     */
    memory: string[][];
}

/**
 * Injects wordMAP into it's children.
 * @param children
 * @param memory
 * @returns {React.DetailedReactHTMLElement<{wordmap: *}, HTMLElement>[]}
 * @constructor
 */
export function WordmapProvider({children, memory}: WordmapProviderProps) {
    const map = useWordMAP(memory);
    return React.Children.map(children, child => {
        return React.cloneElement(child, {
            wordMAP: map
        } as HTMLAttributes<HTMLElement>);
    });
}

WordmapProvider.defaultProps = {
    memory: []
} as Partial<WordmapProviderProps>;