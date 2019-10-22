import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function TranslationText({children}) {
    return (
        <div>
            <TextField value={children}></TextField>
        </div>
    );
}