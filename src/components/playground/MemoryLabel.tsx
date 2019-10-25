import {Link} from "@material-ui/icons";
import React from "react";

/**
 * Renders a label for a single alignment memory.
 * @param source The source word or phrase
 * @param target The target word or phrase
 * @constructor
 */
export function MemoryLabel({source, target} = {source: String, target: String}) {
    return (
        <>
            <span>{source}</span>
            <Link/>
            <span>{target}</span>
        </>
    );
}