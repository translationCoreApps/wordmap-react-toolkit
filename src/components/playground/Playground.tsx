import React, {ChangeEvent, SetStateAction} from 'react';
import * as PropTypes from 'prop-types';
import {makeStyles, Theme} from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import {Suggestion} from "../suggestion";
import {useSuggestion} from "../../core/hooks";
import {ExpansionPanel, FormGroup, Typography} from "@material-ui/core";
import {AlignmentMemory} from "./AlignmentMemory";
import Paper from '@material-ui/core/Paper';
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import {ExpandMore} from "@material-ui/icons";
import Switch from '@material-ui/core/Switch';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme: Theme) => ({
    group: {
        margin: theme.spacing(1)
    },
    panel: {
        paddingLeft: 0,
        paddingRight: 0
    },
    settingsGroup: {
        padding: theme.spacing(1)
    }
}));

interface PlaygroundProps {
    /**
     * The initial source text.
     */
    sourceText: string;
    /**
     * The initial target text.
     */
    targetText: string;
    /**
     * The initial alignment memory to use.
     */
    memory: string[][];
}

export function Playground({sourceText, targetText, memory: initialMemory = []} = {
    sourceText: String,
    targetText: String,
    memory: []
}) {
    const classes = useStyles();
    const [source, setSource] = React.useState(sourceText);
    const [target, setTarget] = React.useState(targetText);
    const [memory, setMemory] = React.useState<string[][]>(initialMemory);
    const suggestion = useSuggestion(source, target, memory);
    const [memoryExpanded, setMemoryExpanded] = React.useState(true);
    const [suggestionsExpanded, setSuggestionsExpanded] = React.useState(true);
    const [settings, setSettings] = React.useState({
        displayPopover: true,
        onlyShowMemory: false
    });

    function onChangeSource(e: ChangeEvent<HTMLInputElement>) {
        setSource(e.target.value);
    }

    function onChangeTarget(e: ChangeEvent<HTMLInputElement>) {
        setTarget(e.target.value);
    }

    function handleAddMemory(source: string, target: string) {
        setMemory([
            ...memory,
            [source, target]
        ] as SetStateAction<string[][]>);
    }

    function handleDeleteMemory(index: number) {
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

    const handleSettingChange = (name: string) => (event: ChangeEvent<HTMLInputElement>) => {
        setSettings({...settings, [name]: event.target.checked});
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
                                ) : (
                                    <Typography
                                        variant="h6"
                                        display="block"
                                        color="textSecondary"
                                        align="center">Start typing to see suggestions...</Typography>
                                )
                            }
                        </Grid>
                    </Grid>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
}

Playground.defaultProps = {
    sourceText: "",
    targetText: "",
    memory: []
} as Partial<PlaygroundProps>;