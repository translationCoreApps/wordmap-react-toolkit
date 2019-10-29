import {makeStyles, Theme} from "@material-ui/core";
import {SuggestionProps} from "./Suggestion";

export const useStyles = makeStyles((theme: Theme) => ({
    root: (props: SuggestionProps) => {
        return ({
            display: 'flex',
            flexWrap: 'wrap',
            backgroundColor: '#ffffff',
            padding: '0px 10px 10px',
            overflowY: 'auto',
            flexGrow: 2,
            direction: props.sourceDirection,
            alignContent: 'flex-start',
            ...(props.styles ? props.styles : {})
        });
    },
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        padding: theme.spacing(1),
    }
}));
