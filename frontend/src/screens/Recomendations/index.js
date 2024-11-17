import React from 'react';
import * as Components from 'components';
import * as StyledComponents from './styles';
import { ListItem } from './ListItem';
import persistence from 'services/persistence';

export const Recomendations = props => {

    const { list, ...storageData } = persistence.get();

    const [state, setState] = React.useState({
        search: '',
        error: '',
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

    async function search() {
        let response;
        setState(e => ({ ...e, loading: true }));
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

            const body = await response.json();
            setState(e => ({
                ...e,
                loading: false,
                list: body.list.map(movie => {
                    return {
                        ...movie,
                        liked: list.find(fav => fav === movie.title)
                    }
                })
            }));
        } catch (error) {
            console.log(error);
            setState(e => ({ ...e, error: 'Não foi possivel pesquisar...', loading: false }));
        }

    }

    async function toggleLiked(movie) {

        let newList = [...list || []];

        if ((list || []).find(e => e?.title === movie.title)) {
            newList = (list || []).filter(e => e?.title !== movie.title);
        } else {
            newList.push(movie);
        }

        newList = Object.values([
            ...newList || []
        ]
        .map(e => ({ ...e, liked: true }))
        .filter(e => typeof e === 'object')
        .reduce((o, k) => (o[k?.title] = k, o), {}));

        const newState = state.list.map(movie => ({
            ...movie,
            liked: list.some(fav => fav?.title === movie?.title)
        }))

        persistence.save({ ...storageData, list: newList });

        setState(e => ({ ...e, list: newState }));
    }

    return (
        <StyledComponents.Wrapper>
            {
                state.loading
                    ? <p>Carregando...</p>
                    : state.error 
                      ? <p>{state.error}</p>
                      : <StyledComponents.Container>
                        <StyledComponents.Header>
                            <Components.Input
                                placeholder='Pesquise...'
                                onChange={({ target }) => setState(e => ({ ...e, search: target.value }))}
                                style={{ width: '100%' }} />
                            <Components.Button onClick={search}>
                                Pesquisar
                            </Components.Button>
                        </StyledComponents.Header>
                        <StyledComponents.RecomendationList>
                            {
                                state.list.map(e => <ListItem item={e} toggleLiked={toggleLiked} />)
                            }
                        </StyledComponents.RecomendationList>
                    </StyledComponents.Container>
            }
        </StyledComponents.Wrapper>
    );
}