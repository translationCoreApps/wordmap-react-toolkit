import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import React from "react";

export default function PredictionViewer({prediction}) {
    return (
        <Paper>
            {
                prediction.source.getTokens().map(t => {
                    return (
                        <Chip
                            key={t.key}
                            label={t.text}
                        />
                    );
                })
            }
            {
                prediction.target.getTokens().map(t => {
                    return (
                        <Chip
                            key={t.key}
                            label={t.text}
                            color="primary"
                        />
                    );
                })
            }
            {prediction.confidence.toFixed(2)}
        </Paper>
    );
}