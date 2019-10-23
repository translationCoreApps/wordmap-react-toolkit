import React from 'react';
import PropTypes from 'prop-types';
import {Alignment} from '../alignment';
import {Word} from "../word";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    root: props => ({
        display: 'flex',
        flexWrap: 'wrap',
        backgroundColor: '#ffffff',
        padding: '0px 10px 10px',
        overflowY: 'auto',
        flexGrow: 2,
        direction: props.sourceDirection,
        alignContent: 'flex-start'
    })
});

/**
 * Renders a grid of word/phrase alignments
 */
export function Suggestion({suggestion}) {
    const classes = useStyles({suggestion});

    if(suggestion && suggestion.predictions) {
        return (
            <div className={classes.root}>
                {
                    suggestion.predictions.map((p, key) => {
                        const alignment = p.alignment;
                        const source = alignment.source.getTokens().map((t, i) => {
                            return (
                                <Word key={i}
                                      position={t.position}
                                      occurrence={t.occurrence}
                                      occurrences={t.occurrences}>{t.text}</Word>
                            );
                        });
                        const target = alignment.target.getTokens().map((t, i) => {
                            return (
                                <Word key={i}
                                      suggested
                                      position={t.position}
                                      occurrence={t.occurrence}
                                      occurrences={t.occurrences}>{t.text}</Word>
                            );
                        });

                        return (
                            <Alignment
                                key={key}
                                targetWords={target}
                                sourceWords={source}
                            />
                        );
                    })
                }
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
    sourceDirection: PropTypes.oneOf(['rtl', 'ltr']),
};

Suggestion.defaultProps = {
    sourceDirection: 'ltr'
};