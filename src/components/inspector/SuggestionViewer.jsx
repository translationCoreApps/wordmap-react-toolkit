import React from 'react';
import PredictionViewer from "./PredictionViewer";

export default function SuggestionViewer({suggestion}) {
    if(suggestion) {
        return (
            <div>
                {
                    suggestion.getPredictions().map(p =>
                        <PredictionViewer prediction={p}/>
                    )
                }
            </div>
        );
    } else {
        return (
            <div>
                Loading...
            </div>
        );
    }
}