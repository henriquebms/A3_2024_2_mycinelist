import React from 'react';
import * as StyledComponents from './styles.js'
import { Header } from './Header/index.jsx';
import { Content } from './Content/index.jsx';

export const Template = props => {
    return (
        <StyledComponents.Container>
            <Header/>
            <Content>
                {props.children}
            </Content>
        </StyledComponents.Container>
    );
}