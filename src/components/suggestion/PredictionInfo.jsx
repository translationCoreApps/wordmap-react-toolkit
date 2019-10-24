import React from 'react';
import PropTypes from 'prop-types';
import {Paper} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

export function PredictionInfo({prediction}) {
    return (
        <>
            <Typography variant="h6">{prediction.key}</Typography>
            <Typography>Confidence: {prediction.confidence}</Typography>
        </>
    );
}
PredictionInfo.propTypes = {
    /**
     * The prediction information to display
     */
    prediction: PropTypes.object.isRequired
};