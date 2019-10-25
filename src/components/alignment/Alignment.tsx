import * as React from 'react';
import {useStyles} from "./styles";

export interface AlignmentProps {
    /**
     * Indicates the alignment contains a suggestion.
     */
    suggested?: boolean;
    /**
     * Displays the top drop zone.
     */
    dropTop?: boolean;
    /**
     * Indicates something is hovering over the top drop zone.
     */
    hoverTop?: boolean;
    /**
     * Displays the bottom drop zone
     */
    dropBottom?: boolean;
    /**
     * Indicates something is hovering over the bottom drop zone.
     */
    hoverBottom?: boolean;
    /**
     * Words from the source sentence that have been aligned.
     */
    sourceWords: Element[];
    /**
     * Words from the target sentence that have been aligned.
     */
    targetWords: Element[];
    /**
     * The language direction of the target words
     */
    targetDirection: 'rtl' | 'ltr';
    /**
     * Custom styles applied to the root element.
     */
    style?: any;
    /**
     * Attributes applied to the root element
     */
    rootProps?: any;
}

/**
 * Renders the alignment of source and target n-grams
 * */
export function Alignment({
                              targetWords,
                              sourceWords,
                              suggested = false,
                              dropTop = false,
                              hoverTop = false,
                              dropBottom = false,
                              hoverBottom = false,
                              targetDirection = 'ltr',
                              style = {},
                              rootProps = {}
                          }: AlignmentProps) {
    const classes = useStyles({
        targetWords,
        sourceWords,
        suggested,
        dropTop,
        hoverTop,
        dropBottom,
        hoverBottom,
        targetDirection,
        style,
        rootProps
    });
    return (
        <div className={classes.root} {...rootProps}>
            <div className={classes.content}>
                <div className={classes.top}>
                    <div className={classes.topRow}>
                        {sourceWords}
                    </div>
                </div>
                <div className={classes.bottom}>
                    <div className={classes.bottomRow}>
                        {targetWords}
                    </div>
                </div>
            </div>
        </div>
    );
}