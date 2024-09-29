import React from 'react';
import Logo from '../../assets/logo.png';
import * as StyledComponents from './styles.js';

export const Header = props => {

    function navigate(path) {
        window.location.href = path
    }

    return (
        <StyledComponents.Container>
            <StyledComponents.NavContainer>
                <img src={Logo} alt="logo do site" />
            </StyledComponents.NavContainer>
            <StyledComponents.NavContainer
                onClick={e => navigate('/home')}
                selected={window.location.pathname === '/home'}>
                <span>
                    Home
                </span>
            </StyledComponents.NavContainer>
            <StyledComponents.NavContainer
                onClick={e => navigate('/recomendations')}
                selected={window.location.pathname === '/recomendations'}>
                <span>
                    Recomendações
                </span>
            </StyledComponents.NavContainer>
            <StyledComponents.NavContainer
                onClick={e => navigate('/favorites')}
                selected={window.location.pathname === '/favorites'}>
                <span>
                    Minha lista
                </span>
            </StyledComponents.NavContainer>
            <StyledComponents.NavContainer
                onClick={e => navigate('/history')}
                selected={window.location.pathname === '/history'}>
                <span>
                    Histórico
                </span>
            </StyledComponents.NavContainer>
        </StyledComponents.Container>
    );
}