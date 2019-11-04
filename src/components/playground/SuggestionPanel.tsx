import React, {ChangeEvent} from "react";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import {ExpandMore} from "@material-ui/icons";
import {ExpansionPanel, FormGroup, makeStyles, Theme, Typography} from "@material-ui/core";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import {Suggestion} from "../suggestion";
import {Suggestion as WordmapSuggestion} from "wordmap/core";

const useStyles = makeStyles((theme: Theme) => ({
    panel: {
        paddingLeft: 0,
        paddingRight: 0
    },
    settingsGroup: {
        padding: theme.spacing(1)
    }
}));

export interface SuggestionPanelProps {
    suggestions: WordmapSuggestion[];
    sourceDirection?: 'rtl' | 'ltr';
    targetDirection?: 'rtl' | 'ltr';
}

export function SuggestionPanel({suggestions = [], sourceDirection, targetDirection}: SuggestionPanelProps) {
    const classes = useStyles();
    const [suggestionsExpanded, setSuggestionsExpanded] = React.useState(true);
    const [settings, setSettings] = React.useState({
        displayPopover: true,
        onlyShowMemory: false,
        condensed: true
    });

    function handleToggleSuggestions() {
        setSuggestionsExpanded(!suggestionsExpanded);
    }

    const handleSettingChange = (name: string) => (event: ChangeEvent<HTMLInputElement>) => {
        setSettings({...settings, [name]: event.target.checked});
    };

    let WordProps = {};
    let AlignmentProps = {};
    if (settings.condensed) {
        AlignmentProps = {
            styles: {
                root: {
                    margin: 1,
                    padding: 0,
                    minWidth: 10,
                    flexGrow: 0
                },
                top: {
                    minHeight: 0,
                    marginBottom: 0
                },
                bottom: {
                    minHeight: 0
                }
            }
        };
        WordProps = {
            styles: {
                root: {
                    padding: 2,
                    fontSize: '90%'
                },
                controls: {
                    display: 'none'
                },
                occurrence: {
                    paddingLeft: 2
                }
            }
        };
    }

    return (
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
                                label="Hide low scores"
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={settings.condensed}
                                        onChange={handleSettingChange('condensed')}
                                        value="condensed"
                                    />
                                }
                                label="Condensed view"
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item>
                        {
                            suggestions.length > 0 ? (
                                suggestions.map((s, i) => (
                                    <>
                                        <div style={{padding: 10}}>
                                            <Typography
                                                variant="h6"
                                                display="block"
                                                color="textPrimary">Suggestion #{i + 1}</Typography>
                                            <Typography
                                                variant="caption"
                                                display="block"
                                                color="textSecondary">confidence {s.compoundConfidence()}</Typography>
                                        </div>
                                        <Suggestion
                                            suggestion={s}
                                            withPopover={settings.displayPopover}
                                            minConfidence={settings.onlyShowMemory ? 1 : 0}
                                            WordProps={WordProps}
                                            sourceDirection={sourceDirection}
                                            targetDirection={targetDirection}
                                            AlignmentProps={AlignmentProps}
                                        />
                                    </>
                                ))
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
    );
}

SuggestionPanel.defaultProps = {
    sourceDirection: 'ltr',
    targetDirection: 'ltr'
};
