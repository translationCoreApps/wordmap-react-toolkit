import React from 'react';
import {Occurrence} from './Occurrence';
import {Controls} from './Controls';
import {useStyles} from "./styles";

export interface WordProps {
    /**
     * The actual word text
     */
    children: string;
    /**
     * Called when clicking on the word title
     */
    onClick: (event: React.MouseEvent) => void;
    /**
     * Called when canceling a suggested word.
     */
    onCancel: (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
    /**
     * Indicates the word is selected
     */
    selected?: boolean;
    /**
     * Indicates the word is disabled
     */
    disabled?: boolean;
    /**
     * Indicates the word is a suggestion
     */
    suggested?: boolean;
    /**
     * Custom styles applied to the root element
     */
    style?: any;
    /**
     * This word instance's order of appearance within the sentence
     */
    occurrence?: number;
    /**
     * How many times the word appears within the sentence
     */
    occurrences?: number;
    /**
     * The language direction
     */
    direction?: 'ltr' | 'rtl';
}

/**
 * Renders a standard word.
 *
 * @param {object} props
 * @constructor
 */
export function Word(props: WordProps) {
    const {children, occurrence, occurrences, suggested, selected} = props;
    const classes = useStyles(props);

    /**
     * Handles click events on the word title.
     * If the word is disabled the click event will be blocked.
     * @param e
     * @private
     */
    function handleClick(e: React.MouseEvent) {
        if (!props.disabled && typeof props.onClick === 'function') {
            e.stopPropagation();
            props.onClick(e);
        }
    }

    /**
     * Handles clicking the cancel button on suggestions
     * @param e
     * @private
     */
    function handleCancelClick(e: React.MouseEvent<SVGSVGElement, MouseEvent>) {
        if (typeof props.onCancel === 'function') {
            e.stopPropagation();
            props.onCancel(e);
        }
    }

    return (
        <div style={{flex: 1}}>
            <div className={classes.root}>
                <span className={classes.content}>
                  <span onClick={handleClick} className={classes.word}>
                    {children}
                  </span>
                    {suggested ? (
                        <Controls style={selected ? {color: 'white'} : null} onCancel={handleCancelClick}/>
                    ) : null}

                </span>
                <Occurrence occurrence={occurrence}
                            occurrences={occurrences}/>
            </div>
        </div>
    );
}

Word.defaultProps = {
    style: {},
    occurrence: 1,
    occurrences: 1,
    disabled: false,
    suggested: false,
    selected: false,
    direction: 'ltr'
} as Partial<WordProps>;
