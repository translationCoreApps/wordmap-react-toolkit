import React, {ChangeEvent} from 'react';
import {makeStyles, Theme} from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import {useSuggestions} from "../../core/hooks";
import {ExpansionPanel, FormGroup, Typography} from "@material-ui/core";
import {AlignmentMemory} from "./AlignmentMemory";
import Paper from '@material-ui/core/Paper';
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import {ExpandMore} from "@material-ui/icons";
import Grid from "@material-ui/core/Grid";
import {Corpus} from "./Corpus";
import {SuggestionPanel} from "./SuggestionPanel";
import {getTextDirection} from "../../core/string";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

const useStyles = makeStyles((theme: Theme) => ({
    group: {
        margin: theme.spacing(1)
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
    /**
     * The initial corpus to use.
     */
    corpus: string[];
}

export function Playground({sourceText, targetText, memory: initialMemory, corpus: initialCorpus}: PlaygroundProps) {
    const classes = useStyles();
    const [source, setSource] = React.useState(sourceText);
    const [target, setTarget] = React.useState(targetText);
    const [memory, setMemory] = React.useState(initialMemory as string[][]);
    const [corpus, setCorpus] = React.useState(initialCorpus as string[]);
    const [enableCorpus, setEnableCorpus] = React.useState(initialCorpus.length > 0);
    const suggestions = useSuggestions(source, target, memory, corpus, 3, !enableCorpus, {forceOccurrenceOrder: true});
    const [memoryExpanded, setMemoryExpanded] = React.useState(true);
    const [sourceDirection, setSourceDirection] = React.useState(getTextDirection(sourceText));
    const [targetDirection, setTargetDirection] = React.useState(getTextDirection(targetText));

    function handleToggleCorpus() {
        setEnableCorpus(!enableCorpus);
    }

    function onChangeSource(e: ChangeEvent<HTMLInputElement>) {
        setSource(e.target.value);
        setSourceDirection(getTextDirection(e.target.value));
    }

    function onChangeTarget(e: ChangeEvent<HTMLInputElement>) {
        setTarget(e.target.value);
        setTargetDirection(getTextDirection(e.target.value));
    }

    function handleAddMemory(source: string, target: string) {
        setMemory([
            ...memory,
            [source, target]
        ]);
    }

    function handleDeleteMemory(index: number) {
        const newMemory = [...memory];
        newMemory.splice(index, 1);
        setMemory(newMemory);
    }

    function handleToggleMemory() {
        setMemoryExpanded(!memoryExpanded);
    }

    function handleCorpusChange(newCorpus: string[]) {
        setCorpus(newCorpus);
    }

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

            <Grid container spacing={1} direction="column" alignItems="stretch">
                <Grid item>
                    <FormGroup row className={classes.settingsGroup}>
                        <FormControlLabel
                            control={
                                <Switch checked={enableCorpus}
                                        onChange={handleToggleCorpus}
                                />
                            }
                            label="Enable Corpus"
                        />
                    </FormGroup>
                </Grid>
            </Grid>

            <ExpansionPanel disabled={!enableCorpus}>
                <ExpansionPanelSummary expandIcon={<ExpandMore/>}>
                    <Typography variant="h6">Corpus</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid container direction="column" alignItems="stretch">
                        <Grid item>
                            <Typography variant="caption">Enter matching lines of text below. The source and target
                                fields must contain the same number of lines.</Typography>
                        </Grid>
                        <Grid item>
                            <Corpus corpus={corpus} onChange={handleCorpusChange}/>
                        </Grid>
                    </Grid>
                </ExpansionPanelDetails>
            </ExpansionPanel>

            <SuggestionPanel suggestions={suggestions}

                             sourceDirection={sourceDirection}
                             targetDirection={targetDirection}/>
        </div>
    );
}

Playground.defaultProps = {
    sourceText: "",
    targetText: "",
    memory: [],
    corpus: []
} as Partial<PlaygroundProps>;