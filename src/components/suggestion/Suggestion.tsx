import React, {useState} from 'react';
import {Alignment} from '../alignment';
import {Word} from "../word";
import Popover from '@material-ui/core/Popover';
import {PredictionInfo} from "./PredictionInfo";
import {Suggestion as WordMapSuggestion} from "wordmap/core";
import {useStyles} from "./styles";

export interface SuggestionProps {
    /**
     * A suggestion produced by wordMAP.
     */
    suggestion: WordMapSuggestion;
    /**
     * The language direction of the source text.
     */
    sourceDirection?: 'rtl' | 'ltr';
    /**
     * Enables displaying the prediction info popover.
     */
    withPopover: boolean;
    /**
     * The minimum confidence required for a prediction to be displayed.
     */
    minConfidence: number;
}

/**
 * Renders a grid of word/phrase alignments
 */
export function Suggestion({suggestion, withPopover, minConfidence}: SuggestionProps) {
    const classes = useStyles({suggestion} as SuggestionProps);
    const [anchorEl, setAnchorEl] = useState(null as any);
    const [hoverIndex, setHoverIndex] = useState(-1);

    const handlePopoverOpen = (predictionKey: number) => (event: Event) => {
        if (suggestion.getPredictions()[predictionKey].confidence >= minConfidence) {
            setHoverIndex(predictionKey);
            setAnchorEl(event.currentTarget);
        }
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
        setHoverIndex(-1);
    };

    if (suggestion) {
        const predictionDetails = hoverIndex >= 0 ? suggestion.getPredictions()[hoverIndex] : null;
        const open: boolean = Boolean(anchorEl) && withPopover;
        return (
            <div className={classes.root}>
                {
                    suggestion.getPredictions().map((p, key) => {
                        const alignment = p.alignment;
                        const source: JSX.Element[] = alignment.source.getTokens().map((t, i) => {
                            return (
                                <Word key={i}
                                      occurrence={t.occurrence}
                                      occurrences={t.occurrences}>{t.toString()}</Word>
                            );
                        });
                        let target: JSX.Element[] = [];
                        if (p.confidence >= minConfidence) {
                            target = alignment.target.getTokens().map((t, i) => {
                                return (
                                    <Word key={i}
                                          suggested
                                          occurrence={t.occurrence}
                                          occurrences={t.occurrences}>{t.toString()}</Word>
                                );
                            });
                        }

                        return (
                            <Alignment
                                key={key}
                                rootProps={{
                                    onMouseEnter: handlePopoverOpen(key),
                                    onMouseLeave: handlePopoverClose
                                }}
                                style={hoverIndex === key && withPopover ? {
                                    backgroundColor: '#fff',
                                    border: 'solid 1px rgb(220, 220, 220)'
                                } : {
                                    border: 'solid 1px transparent'
                                }}
                                targetWords={target}
                                sourceWords={source}
                            />
                        );
                    })
                }
                <Popover
                    className={classes.popover}
                    classes={{paper: classes.paper}}
                    open={open}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center'
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    onClose={handlePopoverClose}
                    disableRestoreFocus
                    disableScrollLock
                >
                    {
                        predictionDetails ? (
                            <PredictionInfo prediction={predictionDetails}/>
                        ) : null
                    }
                </Popover>
            </div>
        );
    }
    return null;
}

Suggestion.defaultProps = {
    sourceDirection: 'ltr',
    withPopover: true,
    minConfidence: 0
} as Partial<SuggestionProps>;