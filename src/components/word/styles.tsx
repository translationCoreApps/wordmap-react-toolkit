import {makeStyles} from "@material-ui/styles";
import {WordProps} from "./Word";

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
export const useStyles = makeStyles({
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
        ...props.style,
        ...(props.styles ? props.styles.root : {})
    }),
    word: (props: WordProps) => ({
        width: 'max-content',
        flexGrow: 2,
        color: props.selected ? 'white' : 'inherit',
        cursor: (!props.disabled && typeof props.onClick === 'function') ? 'pointer' : 'inherit',
        ...(props.styles ? props.styles.word : {})
    }),
    content: (props: WordProps) => ({
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        ...(props.styles ? props.styles.content : {})
    })
});
