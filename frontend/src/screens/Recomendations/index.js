import React from 'react';
import * as Components from 'components';
import * as StyledComponents from './styles';
import { ListItem } from './ListItem';
import persistence from 'services/persistence';

export const Recomendations = props => {

    const { list, ...storageData } = persistence.get();

    const [state, setState] = React.useState({
        search: '',
        loading: false,
        list: [
            {
              "title": "O Poderoso Chefão",
              "description": "Um épico sobre a família Corleone, uma família mafiosa que controla Nova York.",
              "image_url": "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi03M2E3LWE1ZTgtMzYxZGIzNzMyMjU4XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UX182_CR0,0,182,268_AL_.jpg",
              liked: list.find(fav => fav === "O Poderoso Chefão")
            },
            {
              "title": "O Senhor dos Anéis: A Sociedade do Anel",
              "description": "Um hobbit chamado Frodo precisa destruir o Um Anel, um artefato poderoso que ameaça toda a Terra Média.",
              "image_url": "https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWJmMGQzXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UX182_CR0,0,182,268_AL_.jpg",
              liked: list.find(fav => fav === "O Senhor dos Anéis: A Sociedade do Anel")
            
            },
            {
              "title": "Pulp Fiction",
              "description": "Um filme não linear que conta histórias interligadas de criminosos e gangsters em Los Angeles.",
              "image_url": "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtMWVmYS00YTVkLWI5OTgtMzM4MDNmZjE3Njc1XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UX182_CR0,0,182,268_AL_.jpg",
              liked: list.find(fav => fav === "Pulp Fiction")
            
            }
          ]
    });

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
        setState(e => ({ 
            ...e, 
            list: body.list.map(movie => {
                return {
                    ...movie,
                    liked: list.find(fav => fav === movie.title)
                }
            }) 
        }));
    }

    async function toggleLiked (movie) {

        let newList = [...list || []]; 

        if((list || []).find(e => e === movie.title)) {
            newList = (list || []).filter(e => e !== movie.title);
        } else {
            newList.push(movie.title);
        }

        newList = Object.values([
            ...newList || []
        ].reduce((o, k) => (o[k] = k, o), {}));

        persistence.save({ ...storageData, list: newList });

        setState(e => ({ ...e, list: e.list.map(movie => ({ 
            ...movie,
            liked: list.find(fav => fav === movie)
        })) }))
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
                        state.list.map(e => <ListItem  item={e} toggleLiked={toggleLiked} />)
                    }
                </StyledComponents.RecomendationList>
            </StyledComponents.Container>
        </StyledComponents.Wrapper>
    );
}