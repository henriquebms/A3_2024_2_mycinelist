import React from 'react';
import * as Components from 'components';
import * as StyledComponents from './styles';
import { ListItem } from './ListItem';

export const Recomendations = props => {

    const [state, setState] = React.useState({
        search: '',
        loading: false,
        list: [
            {
                "title": "Inception",
                "description": "Inception é um thriller de ficção científica dirigido por Christopher Nolan, lançado em 2010. O filme acompanha Dom Cobb, um ladrão que invade sonhos para roubar segredos valiosos. Ele é oferecido uma chance de redimir seu passado ao realizar uma tarefa complexa: plantar uma ideia na mente de alguém. Com uma equipe especializada, Cobb embarca em uma missão que desafia a realidade e os limites do subconsciente, enquanto enfrenta seus próprios demônios internos.",
                "image_url": "https://m.media-amazon.com/images/I/91kFYg4fX3L._AC_SY679_.jpg"
              }
        ]
    });

    async function search () {
    }

    return (
        <StyledComponents.Wrapper>
            <StyledComponents.Container>
                <StyledComponents.Header>
                <Components.Input 
                    placeholder='Pesquise...'
                    onChange={({ target }) => setState(e => ({ ...e, search: target.value }))}
                    style={{ width: '100%' }}/>
                    <Components.Button onClick={search}>
                        Pesquisar
                    </Components.Button>
                </StyledComponents.Header>
                <StyledComponents.RecomendationList>
                    {
                        state.list.map(e => <ListItem  item={e} />)
                    }
                </StyledComponents.RecomendationList>
            </StyledComponents.Container>
        </StyledComponents.Wrapper>
    );
}