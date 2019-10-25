import {makeStyles, Theme} from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: "flex",
        flexDirection: "row"
    },
    textField: {
        marginBottom: 0
    },
    helpText: {
        color: "#888"
    },
    sourceInputOutline: {
        borderRight: "none",
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0
    },
    sourceInputAdornmentEnd: {
        position: "relative",
        left: theme.spacing(1.5)
    },
    sourceInputRoot: {
        paddingRight: 0
    },
    targetInputOutline: {
        borderLeft: "none",
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0
    },
    button: {
        margin: theme.spacing(1),
        marginBottom: 0
    }
}));
