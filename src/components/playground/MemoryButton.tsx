import React, {ChangeEvent, useState} from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {Link} from "@material-ui/icons";
import InputAdornment from "@material-ui/core/InputAdornment";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {useStyles} from "./styles";

export interface MemoryButtonProps {
    /**
     * Called when the add button is clicked
     */
    onClick: (source: string, target: string) => void;
}

interface MemoryError {
    source?: boolean;
    target?: boolean;
}

export function MemoryButton({onClick}: MemoryButtonProps) {
    const classes = useStyles();
    const [target, setTarget] = useState("");
    const [source, setSource] = useState("");
    const [errors, setErrors] = useState({} as MemoryError);

    function handleClick() {
        if(typeof onClick === 'function') {
            if(target !== "" && source !== "") {
                onClick(source, target);
                setSource("");
                setTarget("");
                setErrors({});
            } else {
                setErrors({
                    source: source === "",
                    target: target === ""
                });
            }
        }
    }

    function handleChangeSource(e: ChangeEvent<HTMLInputElement>) {
        setSource(e.target.value);
    }

    function handleChangeTarget(e: ChangeEvent<HTMLInputElement>) {
        setTarget(e.target.value);
    }

    return (
        <Grid container direction="column" spacing={0}>
            <Grid item>
                <Grid container spacing={0}>
                    <TextField
                        error={errors.source === true}
                        label="source"
                        margin="dense"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        className={classes.textField}
                        variant="outlined"
                        value={source}
                        onChange={handleChangeSource}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end" className={classes.sourceInputAdornmentEnd}>
                                    <Link />
                                </InputAdornment>
                            ),
                            classes: {
                                root: classes.sourceInputRoot,
                                notchedOutline: classes.sourceInputOutline
                            }
                        }}
                    />
                    <TextField
                        error={errors.target === true}
                        label="target"
                        margin="dense"
                        InputLabelProps={{
                            shrink: true
                        }}
                        className={classes.textField}
                        variant="outlined"
                        value={target}
                        onChange={handleChangeTarget}
                        InputProps={{
                            classes: {
                                notchedOutline: classes.targetInputOutline,
                            }
                        }}
                    />
                    <Button
                        variant="outlined"
                        color="primary"
                        className={classes.button}
                        onClick={handleClick}>Add</Button>
                </Grid>
            </Grid>
            <Typography variant="caption"
                        className={classes.helpText}>Enter a phrase pairing you know to be accurate</Typography>
        </Grid>
    );
}