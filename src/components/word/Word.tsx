import React from 'react';
import {Occurrence} from './Occurrence';
import {Controls} from './Controls';
import {makeStyles} from "@material-ui/styles";

function makeBorderKey({direction}: WordProps) {
    return direction as string === 'ltr' ? 'borderLeft' : 'borderRight';
}

function makeSuggestionStyles(props: WordProps) {
    if (props.suggested) {
        return {
            [makeBorderKey(props)]: '5px solid #1b7729',
        };
    }
    return {};
}

function makeDisabledStyles(props: WordProps) {
    if (props.disabled) {
        return {
            [makeBorderKey(props)]: '5px solid #868686',
            opacity: 0.3,
            cursor: 'not-allowed',
            userSelect: 'none'
        };
    }
    return {};
}

function makeSelectedStyles({selected}: WordProps) {
    if (selected) {
        return {
            backgroundColor: '#44C6FF'
        };
    }
    return {};
}

/**
 * Generates the component styles
 * @param props
 * @return {object}
 */
const useStyles = makeStyles({
    root: (props: WordProps) => ({
        [makeBorderKey(props)]: '5px solid #44C6FF',
        padding: '9px',
        backgroundColor: '#FFFFFF',
        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'row',
        ...makeSuggestionStyles(props),
        ...makeDisabledStyles(props),
        ...makeSelectedStyles(props),
        ...props.style
    }),
    word: (props: WordProps) => ({
        width: 'max-content',
        flexGrow: 2,
        color: props.selected ? 'white' : 'inherit',
        cursor: (!props.disabled && typeof props.onClick === 'function') ? 'pointer' : 'inherit'
    }),
    content: {
        flex: 1,
        display: 'flex',
        alignItems: 'center'
    }
});

interface WordProps {
    /**
     * Indicates the word is selected
     */
    selected: boolean;
    /**
     * Indicates the word is disabled
     */
    disabled: boolean;
    /**
     * Indicates the word is a suggestion
     */
    suggested: boolean;
    /**
     * Called when clicking on the word title
     */
    onClick: Function;
    /**
     * Called when canceling a suggested word.
     */
    onCancel: Function;
    /**
     * Custom styles applied to the root element
     */
    style: any;
    /**
     * This word instance's order of appearance within the sentence
     */
    occurrence: number;
    /**
     * How many times the word appears within the sentence
     */
    occurrences: number;
    /**
     * The actual word text
     */
    children: string;
    /**
     * The language direction
     */
    direction: 'ltr' | 'rtl';
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
    function handleCancelClick(e: Event) {
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
};