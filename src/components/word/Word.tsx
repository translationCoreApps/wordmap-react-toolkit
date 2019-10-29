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
     *
     * @deprecated use *styles* instead.
     * Custom styles applied to the root element
     */
    style?: any;
    /**
     * Styles applied to sections of the component
     */
    styles?: {
        /**
         * Overrides styles for the root element
         */
        root?: object,
        /**
         * Overrides styles for the content element
         */
        content?: object,
        /**
         * Overrides styles for word's text element
         */
        word?: object,
        /**
         * Overrides styles for the controls displayed on suggested words
         */
        controls?: object,
        /**
         * Overrides styles for the number of occurrences
         */
        occurrence?: object
    };
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

    const combinedStyles = {
        ...(selected ? {color: 'white'} : {}),
        ...(props.styles ? props.styles.controls: {})
    };

    return (
        <div style={{flex: 1}}>
            <div className={classes.root}>
                <span className={classes.content}>
                  <span onClick={handleClick} className={classes.word}>
                    {children}
                  </span>
                    {suggested ? (
                        <Controls style={combinedStyles} onCancel={handleCancelClick}/>
                    ) : null}

                </span>
                <Occurrence occurrence={occurrence}
                            occurrences={occurrences}
                            style={ props.styles ? props.styles.occurrence : null}
                />
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
