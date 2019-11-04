import React from 'react';
import Typography from "@material-ui/core/Typography";
import {Prediction} from "wordmap/core";
import {Grid} from "@material-ui/core";

interface PredictionInfoProps {
    /**
     * The prediction information to display
     */
    prediction: Prediction;
}

export function PredictionInfo({prediction}: PredictionInfoProps) {
    const keys = prediction.scoreKeys.filter(k => {
        return prediction.getScore(k) > 0;
    });
    return (
        <>
            <Typography variant="h5">{prediction.key}</Typography>
            <Typography variant="h6">Location</Typography>
            <Grid container justify="space-between">
                <Grid item>
                    <Typography>Source</Typography>
                    <Typography>Occurrence: {prediction.source.occurrence}</Typography>
                    <Typography>Occurrences: {prediction.source.occurrences}</Typography>
                    <Typography>Position: {prediction.source.tokenPosition}</Typography>
                </Grid>
                <Grid item>
                    <Typography>Target</Typography>
                    <Typography>Occurrence: {prediction.target.occurrence}</Typography>
                    <Typography>Occurrences: {prediction.target.occurrences}</Typography>
                    <Typography>Position: {prediction.target.tokenPosition}</Typography>
                </Grid>
            </Grid>

            <Typography variant="h6">Scores</Typography>
            {
                keys.map(k => (
                  <Typography>{k}: {prediction.getScore(k)}</Typography>
                ))
            }
        </>
    );
}