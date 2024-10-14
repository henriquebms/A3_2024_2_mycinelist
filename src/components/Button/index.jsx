import * as React from 'react';
import B from '@mui/material/Button';

export default function Button (props) {
    return (
        <B variant='contained' {...props}>
            {props.children}
        </B>
    );
}