import React from 'react';
import PropTypes from 'prop-types';
import {useStyles} from "./styles";

/**
 * Renders the alignment of source and target n-grams
 *
 * @property {array} sourceWords
 * @property {array} targetWords
 * @property {bool} hoverBottom - a bottom word is hover over this component
 * @property {bool} hoverTop - a top word is hovering over this component
 * @property {bool} acceptsSourceTokens - this component accepts dropped source tokens
 * @property {bool} acceptsTargetTokens - this component accepts dropped target tokens
 */
export function Alignment(props) {
    const {targetWords, sourceWords} = props;
    const classes = useStyles(props);
    return (
        <div className={classes.root} {...props.rootProps}>
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

Alignment.propTypes = {
    /**
     * Indicates the alignment contains a suggestion.
     */
    suggested: PropTypes.bool,
    /**
     * Displays the top drop zone.
     */
    dropTop: PropTypes.bool,
    /**
     * Indicates something is hovering over the top drop zone.
     */
    hoverTop: PropTypes.bool,
    /**
     * Displays the bottom drop zone
     */
    dropBottom: PropTypes.bool,
    /**
     * Indicates something is hovering over the bottom drop zone.
     */
    hoverBottom: PropTypes.bool,
    /**
     * Words from the source sentence that have been aligned.
     */
    sourceWords: PropTypes.array.isRequired,
    /**
     * Words from the target sentence that have been aligned.
     */
    targetWords: PropTypes.array.isRequired,
    /**
     * The language direction of the target words
     */
    targetDirection: PropTypes.oneOf(['rtl', 'ltr']),
    /**
     * Custom styles applied to the root element.
     */
    styles: PropTypes.object,
    /**
     * Attributes applied to the root element
     */
    rootProps: PropTypes.object
};
Alignment.defaultProps = {
    suggested: false,
    targetDirection: 'ltr',
    dropTop: false,
    hoverTop: false,
    dropBottom: false,
    hoverBottom: false,
    style: {},
    rootProps: {}
};
