import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Alignment} from '../alignment';
import {Word} from "../word";
import {makeStyles} from "@material-ui/core";
import Popover from '@material-ui/core/Popover';
import {PredictionInfo} from "./PredictionInfo";

const useStyles = makeStyles(theme => ({
    root: props => ({
        display: 'flex',
        flexWrap: 'wrap',
        backgroundColor: '#ffffff',
        padding: '0px 10px 10px',
        overflowY: 'auto',
        flexGrow: 2,
        direction: props.sourceDirection,
        alignContent: 'flex-start'
    }),
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        padding: theme.spacing(1),
    }
}));

/**
 * Renders a grid of word/phrase alignments
 */
export function Suggestion({suggestion, withPopover, minConfidence}) {
    const classes = useStyles({suggestion});
    const [anchorEl, setAnchorEl] = useState(null);
    const [hoverIndex, setHoverIndex] = useState(-1);

    const handlePopoverOpen = predictionKey => event => {
        if(suggestion.predictions[predictionKey].confidence >= minConfidence) {
            setHoverIndex(predictionKey);
            setAnchorEl(event.currentTarget);
        }
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
        setHoverIndex(-1);
    };

    const predictionDetails = hoverIndex >= 0 ? suggestion.predictions[hoverIndex] : null;
    const open = Boolean(anchorEl) && withPopover;

    if (suggestion && suggestion.predictions) {
        return (
            <div className={classes.root}>
                {
                    suggestion.predictions.map((p, key) => {
                        const alignment = p.alignment;
                        const source = alignment.source.getTokens().map((t, i) => {
                            return (
                                <Word key={i}
                                      occurrence={t.occurrence}
                                      occurrences={t.occurrences}>{t.text}</Word>
                            );
                        });
                        let target = [];
                        if(p.confidence >= minConfidence) {
                            target = alignment.target.getTokens().map((t, i) => {
                                return (
                                    <Word key={i}
                                          suggested
                                          occurrence={t.occurrence}
                                          occurrences={t.occurrences}>{t.text}</Word>
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
                                style={ hoverIndex === key && withPopover ? {
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

Suggestion.propTypes = {
    /**
     * A suggestion produced by wordMAP
     */
    suggestion: PropTypes.object,
    /**
     * The language direction of the source text
     */
    sourceDirection: PropTypes.oneOf(['rtl', 'ltr']),
    /**
     * Enables displaying the prediction info popover
     */
    withPopover: PropTypes.bool,
    /**
     * The minimum confidence required for a prediction to be displayed
     */
    minConfidence: PropTypes.number
};

Suggestion.defaultProps = {
    sourceDirection: 'ltr',
    withPopover: true,
    minConfidence: 0
};