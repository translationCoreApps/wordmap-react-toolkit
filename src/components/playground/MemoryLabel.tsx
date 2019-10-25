import {Link} from "@material-ui/icons";
import React from "react";

export interface MemoryLabelProps {
    /**
     * The source text.
     */
    source: string;
    /**
     * The target text.
     */
    target: string;
}

/**
 * Renders a label for a single alignment memory.
 * @param source The source word or phrase
 * @param target The target word or phrase
 * @constructor
 */
export function MemoryLabel({source, target}: MemoryLabelProps) {
    return (
        <>
            <span>{source}</span>
            <Link/>
            <span>{target}</span>
        </>
    );
}