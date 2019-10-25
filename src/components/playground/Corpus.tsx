import React, {ChangeEvent, useState} from "react";
import {makeStyles, TextField, Theme} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {Link} from "@material-ui/icons";

interface CorpusProps {
    /**
     * The corpus to display
     */
    corpus: string[];
    /**
     * Called when the corpus changes
     * @param text
     */
    onChange: (corpus: string[]) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
    textField: {
        flexGrow: 1
    },
    textColumn: {
        flexGrow: 1,
        display: "flex"
    }
}));

export function Corpus({corpus, onChange}: CorpusProps) {
    const classes = useStyles();
    const [source, setSource] = useState(corpus[0]);
    const [target, setTarget] = useState(corpus[1]);

    // TODO: may need to tie in updates from the props.

    function handleChangeSource(e: ChangeEvent<HTMLInputElement>) {
        setSource(e.target.value);
    }

    function handleChangeTarget(e: ChangeEvent<HTMLInputElement>) {
        setTarget(e.target.value);
    }

    function handleSave() {
        onChange([source, target]);
    }

    return (
        <Grid container direction="row" spacing={1}>
            <Grid container alignItems="center">
                <Grid item className={classes.textColumn}>
                    <TextField
                        classes={{
                            root: classes.textField
                        }}
                        InputLabelProps={{
                            shrink: true
                        }}
                        label="Source corpus text"
                        multiline
                        margin="normal"
                        rows={10}
                        variant="outlined"
                        value={source}
                        onChange={handleChangeSource}/>
                </Grid>
                <Grid item>
                    <Link/>
                </Grid>
                <Grid item className={classes.textColumn}>
                    <TextField
                        classes={{
                            root: classes.textField
                        }}
                        label="Target corpus text"
                        InputLabelProps={{
                            shrink: true
                        }}
                        multiline
                        margin="normal"
                        rows={10}
                        variant="outlined"
                        value={target}
                        onChange={handleChangeTarget}/>
                </Grid>
            </Grid>
            <Grid item>
                <Button onClick={handleSave} variant="contained" color="primary">Save</Button>
            </Grid>
        </Grid>
    );
}