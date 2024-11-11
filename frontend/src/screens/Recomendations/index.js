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
              "title": "O Poderoso Chefão",
              "description": "Um épico sobre a família Corleone, uma família mafiosa que controla Nova York.",
              "image_url": "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi03M2E3LWE1ZTgtMzYxZGIzNzMyMjU4XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UX182_CR0,0,182,268_AL_.jpg"
            },
            {
              "title": "O Senhor dos Anéis: A Sociedade do Anel",
              "description": "Um hobbit chamado Frodo precisa destruir o Um Anel, um artefato poderoso que ameaça toda a Terra Média.",
              "image_url": "https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWJmMGQzXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UX182_CR0,0,182,268_AL_.jpg"
            },
            {
              "title": "Pulp Fiction",
              "description": "Um filme não linear que conta histórias interligadas de criminosos e gangsters em Los Angeles.",
              "image_url": "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtMWVmYS00YTVkLWI5OTgtMzM4MDNmZjE3Njc1XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UX182_CR0,0,182,268_AL_.jpg"
            }
          ]
    });

    React.useState(() => { search(); }, [])

    async function search () {
        let response;
        try {
            response = await fetch('http://localhost:3001/recomendations', {
                method: 'POST',
                body: JSON.stringify({
                    question: state.search
                }),
                headers: {
                    'Content-Type': 'application/json',
                  },
            });
        } catch (error) {
            console.log(error)
        }
        const body = await response.json();
        setState(e => ({ ...e, list: body.list }));
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