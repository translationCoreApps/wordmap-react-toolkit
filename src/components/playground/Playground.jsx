import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import {Suggestion} from "../suggestion";
import {useSuggestion} from "../..";
import {ExpansionPanel, FormGroup, Typography} from "@material-ui/core";
import {AlignmentMemory} from "./AlignmentMemory";
import Paper from '@material-ui/core/Paper';
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import {ExpandMore} from "@material-ui/icons";
import Switch from '@material-ui/core/Switch';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    group: {
        margin: theme.spacing(1)
    },
    dense: {
        marginTop: theme.spacing(2),
    },
    menu: {
        width: 200,
    },
    paper: {
        paddingTop: theme.spacing(1),
    },
    panel: {
        paddingLeft: 0,
        paddingRight: 0
    },
    settingsGroup: {
        padding: theme.spacing(1)
    }
}));

function Placeholder() {
    return (
        <Typography
            variant="h6"
            display="block"
            color="textSecondary"
            align="center">Start typing to see suggestions...</Typography>
    );
}

export function Playground({sourceText, targetText, memory: initialMemory}) {
    const classes = useStyles();
    const [source, setSource] = useState(sourceText);
    const [target, setTarget] = useState(targetText);
    const [memory, setMemory] = useState(initialMemory);
    const suggestion = useSuggestion(source, target, memory);
    const [memoryExpanded, setMemoryExpanded] = useState(true);
    const [suggestionsExpanded, setSuggestionsExpanded] = useState(true);
    const [settings, setSettings] = useState({
        displayPopover: true,
        onlyShowMemory: false
    });

    function onChangeSource(e) {
        setSource(e.target.value);
    }

    function onChangeTarget(e) {
        setTarget(e.target.value);
    }

    function handleAddMemory(newMemory) {
        setMemory([
            ...memory,
            newMemory
        ]);
    }

    function handleDeleteMemory(index) {
        const newMemory = [...memory];
        newMemory.splice(index, 1);
        setMemory(newMemory);
    }

    function handleToggleMemory() {
        setMemoryExpanded(!memoryExpanded);
    }

    function handleToggleSuggestions() {
        setSuggestionsExpanded(!suggestionsExpanded);
    }

    const handleSettingChange = name => event => {
        setSettings({ ...settings, [name]: event.target.checked });
    };

    return (
        <div>
            <Typography variant="h6">Sentences</Typography>
            <Paper>
                <FormGroup className={classes.group}>
                    <TextField
                        label="Source text"
                        margin="normal"
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={onChangeSource}
                        className={classes.textField}
                        value={source}
                        variant="outlined"
                    />
                    <TextField
                        label="Target text"
                        margin="normal"
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={onChangeTarget}
                        className={classes.textField}
                        value={target}
                        variant="outlined"
                    />
                </FormGroup>
            </Paper>
            <ExpansionPanel
                expanded={memoryExpanded}
                onChange={handleToggleMemory}>
                <ExpansionPanelSummary expandIcon={<ExpandMore/>}>
                    <Typography variant="h6">Alignment Memory</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <AlignmentMemory
                        memory={memory}
                        onAdd={handleAddMemory}
                        onDelete={handleDeleteMemory}/>
                </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel
                expanded={suggestionsExpanded}
                onChange={handleToggleSuggestions}>
                <ExpansionPanelSummary expandIcon={<ExpandMore/>}>
                    <Typography variant="h6">Predictions</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.panel}>
                    <Grid container spacing={1} direction="column" alignItems="stretch">
                        <Grid item>
                            <FormGroup row className={classes.settingsGroup}>
                                <FormControlLabel
                                    control={
                                        <Switch checked={settings.displayPopover}
                                                onChange={handleSettingChange('displayPopover')}
                                                value="displayPopover"
                                        />
                                    }
                                    label="Enable popover"
                                />
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={settings.onlyShowMemory}
                                            onChange={handleSettingChange('onlyShowMemory')}
                                            value="onlyShowMemory"
                                        />
                                    }
                                    label="Show only alignment memory"
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item>
                            {
                                suggestion ? (
                                    <Suggestion
                                        suggestion={suggestion}
                                        withPopover={settings.displayPopover}
                                        minConfidence={settings.onlyShowMemory ? 1 : 0}
                                        />
                                ) : <Placeholder/>
                            }
                        </Grid>
                    </Grid>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
}

Playground.propTypes = {
    sourceText: PropTypes.string,
    targetText: PropTypes.string,
    memory: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};
Playground.defaultProps = {
    sourceText: "",
    targetText: "",
    memory: []
};