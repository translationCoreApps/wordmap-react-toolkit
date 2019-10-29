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
    sourceWords: JSX.Element[];
    /**
     * Words from the target sentence that have been aligned.
     */
    targetWords: JSX.Element[];
    /**
     * The language direction of the target words
     */
    targetDirection?: 'rtl' | 'ltr';
    /**
     * @deprecated use *styles* instead.
     * Custom styles applied to the root element.
     */
    style?: any;
    /**
     * Styles applied to sections of the component
     */
    styles?: {
        /**
         * The root element
         */
        root?: object,
        /**
         * The top element
         */
        top?: object,
        /**
         * The bottom element
         */
        bottom?: object,
        /**
         * The top row of words
         */
        topRow?: object,
        /**
         * The bottom row of words
         */
        bottomRow?: object
    };
    /**
     * Attributes applied to the root element
     */
    rootProps?: any;
}

/**
 * Renders the alignment of source and target n-grams
 * */
export function Alignment(props: AlignmentProps) {
    const classes = useStyles(props);
    return (
        <div className={classes.root} {...props.rootProps}>
            <div className={classes.content}>
                <div className={classes.top}>
                    <div className={classes.topRow}>
                        {props.sourceWords}
                    </div>
                </div>
                <div className={classes.bottom}>
                    <div className={classes.bottomRow}>
                        {props.targetWords}
                    </div>
                </div>
            </div>
        </div>
    );
}

Alignment.defaultProps ={
    suggested: false,
    dropTop: false,
    hoverTop: false,
    dropBottom: false,
    hoverBottom: false,
    style: {},
    rootProps: {},
    targetDirection: 'ltr'
} as Partial<AlignmentProps>;