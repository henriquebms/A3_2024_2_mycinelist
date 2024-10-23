import * as React from 'react';
import Inp from '@mui/material/TextField';

export default function Input (props) {
    return (
        <Inp  variant="outlined" {...props} />
    );
}