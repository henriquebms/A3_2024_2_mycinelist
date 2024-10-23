import React from 'react';
import * as Components from 'components';
import * as StyledComponents from './styles';
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';

export const Home = props => {

    const nav = useNavigate();
    const [step, setStep] = React.useState(1);

    return (
        <StyledComponents.Container>
            <StyledComponents.AboutContainer
                transition={{
                    duration: 3,
                    type: 'spring',
                    ease: "linear"
                }}
                animate={{
                    marginLeft: step === 1 ? '0px' : '-10000px',

                }
                }
            >
                <h3>Sobre o MyCineList {step}</h3>
                <p>
                    O My Cine List utiliza a API do ChatGPT para fornecer sugestões personalizadas com base nas preferências do usuário. Ao interagir com o app, o usuário pode solicitar recomendações, e a API analisa essas informações para gerar uma lista de filmes que se adequam aos interesses fornecidos. Essas recomendações são baseadas em uma combinação de gêneros, diretores, anos de lançamento, e outras preferências que o usuário pode fornecer.
                    Além de apenas recomendar filmes, o aplicativo também permite que o usuário salve uma lista de filmes recomendados, criando uma espécie de biblioteca pessoal de títulos para assistir posteriormente. Essa funcionalidade é importante para que o usuário possa revisitar os filmes de interesse sem precisar buscar por eles repetidamente.
                </p>
            </StyledComponents.AboutContainer>
            {
                step === 1 &&
                <StyledComponents.AbsoluteButton>
                    <Components.Button onClick={() => setStep(2)}>
                    Começar
                </Components.Button>
                </StyledComponents.AbsoluteButton>
            }

            <StyledComponents.ChooseWrapper
                transition={{
                    duration: 2,
                    type: 'spring',
                    ease: "linear"
                }}
                animate={{
                    marginLeft: step === 1 ? '10000px' : '0px',
                    opacity: step === 1 ? 0 : 1
                }}
            >
                <h3 style={{ fontSize: '30px' }} align='center'>
                    Escolha uma modalidade:
                </h3>
                <StyledComponents.ChooseContainer>
                    <StyledComponents.ChooseContent onClick={() => nav('/recomendations')}>
                        Recomendações por genero
                    </StyledComponents.ChooseContent>
                    <StyledComponents.ChooseContent onClick={() => nav('/game')}>
                        Jogo interativo
                    </StyledComponents.ChooseContent>
                    <StyledComponents.ChooseContent onClick={() => nav('/resume')}>
                        Resumos
                    </StyledComponents.ChooseContent>
                    <StyledComponents.ChooseContent onClick={() => nav('/search')}>
                        Busca por atores ou diretores
                    </StyledComponents.ChooseContent>
                </StyledComponents.ChooseContainer>
            </StyledComponents.ChooseWrapper>

        </StyledComponents.Container>
    );
}