import React from 'react';
import * as StyledComponents from './styles.js'

export const Content = props => {
    return (
        <StyledComponents.Container>
            {props.children}
        </StyledComponents.Container>
    );
}