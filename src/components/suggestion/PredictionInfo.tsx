import React from 'react';
import Typography from "@material-ui/core/Typography";
import {Prediction} from "wordmap/core";

interface PredictionInfoProps {
    /**
     * The prediction information to display
     */
    prediction: Prediction;
}

export function PredictionInfo({prediction}: PredictionInfoProps) {
    return (
        <>
            <Typography variant="h6">{prediction.key}</Typography>
            <Typography>Confidence: {prediction.confidence}</Typography>
        </>
    );
}