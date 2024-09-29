import React from 'react';
import * as StyledComponents from './styles';

export const Home = props => {
    return (
        <StyledComponents.Container>
            <StyledComponents.AboutContainer>
                <h3>Sobre o MyCineList</h3>
                <p>
                    O My Cine List utiliza a API do ChatGPT para fornecer sugestões personalizadas com base nas preferências do usuário. Ao interagir com o app, o usuário pode solicitar recomendações, e a API analisa essas informações para gerar uma lista de filmes que se adequam aos interesses fornecidos. Essas recomendações são baseadas em uma combinação de gêneros, diretores, anos de lançamento, e outras preferências que o usuário pode fornecer.
                    Além de apenas recomendar filmes, o aplicativo também permite que o usuário salve uma lista de filmes recomendados, criando uma espécie de biblioteca pessoal de títulos para assistir posteriormente. Essa funcionalidade é importante para que o usuário possa revisitar os filmes de interesse sem precisar buscar por eles repetidamente.
                </p>
            </StyledComponents.AboutContainer>
        </StyledComponents.Container>
    );
}