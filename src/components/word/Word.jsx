import React from 'react';
import PropTypes from 'prop-types';
import {Occurrence} from './Occurrence';
import {Controls} from './Controls';
import {makeStyles} from "@material-ui/styles";

function makeBorderKey({direction}) {
    return direction === 'ltr' ? 'borderLeft' : 'borderRight';
}

function makeSuggestionStyles(props) {
    if (props.suggested) {
        return {
            [makeBorderKey(props)]: '5px solid #1b7729',
        };
    }
    return {};
}

function makeDisabledStyles(props) {
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

function makeSelectedStyles({selected}) {
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
    root: props => ({
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
    word: props => ({
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

/**
 * Renders a standard word.
 *
 * @param {object} props
 * @constructor
 */
export function Word(props) {
    const {children, occurrence, occurrences, position, suggested, selected} = props;
    const classes = useStyles(props);

    /**
     * Handles click events on the word title.
     * If the word is disabled the click event will be blocked.
     * @param e
     * @private
     */
    function handleClick(e) {
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
    function handleCancelClick(e) {
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
                            occurrences={occurrences}
                            position={position}/>
            </div>
        </div>
    );
}

Word.propTypes = {
    /**
     * Indicates the word is selected
     */
    selected: PropTypes.bool,
    /**
     * Indicates the word is disabled
     */
    disabled: PropTypes.bool,
    /**
     * Indicates the word is a suggestion
     */
    suggested: PropTypes.bool,
    /**
     * Called when clicking on the word title
     */
    onClick: PropTypes.func,
    /**
     * Called when canceling a suggested word.
     */
    onCancel: PropTypes.func,
    /**
     * Custom styles applied to the root element
     */
    style: PropTypes.object,
    /**
     * This word instance's order of appearance within the sentence
     */
    occurrence: PropTypes.number,
    /**
     * How many times the word appears within the sentence
     */
    occurrences: PropTypes.number,
    /**
     * The actual word text
     */
    children: PropTypes.string.isRequired,
    /**
     * The language direction
     */
    direction: PropTypes.oneOf(['ltr', 'rtl']),

    /**
     * The position of this word within the sentence
     */
    position: PropTypes.number
};

Word.defaultProps = {
    style: {},
    occurrence: 1,
    occurrences: 1,
    disabled: false,
    suggested: false,
    selected: false,
    direction: 'ltr',
    position: -1
};