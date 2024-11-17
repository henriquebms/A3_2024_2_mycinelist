import React from 'react';
import { useParams } from 'react-router-dom';
import * as StyledComponents from './styles';
import * as Components from '../../components';
import persistence from 'services/persistence';

export const Recomendation = props => {

    const { list, ...storageData } = persistence.get();

    const [state, setState] = React.useState({
        list: list,
        loading: true,
        movie: null
    })

    const params = useParams();

    React.useEffect(() => { getMovie() }, [])

    async function toggleFavorite (evt) {

        evt.stopPropagation();

        let newList = [...list || []];

        if ((list || []).find(e => e?.title === state.movie.title)) {
            newList = (list || []).filter(e => e?.title !== state.movie.title);
        } else {
            newList.push(state.movie);
        }

        newList = Object.values([
            ...newList || []
        ]
        .map(e => ({ ...e, liked: true }))
        .filter(e => typeof e === 'object')
        .reduce((o, k) => (o[k?.title] = k, o), {}));

        const newState = state.list.map(movie => ({
            ...movie,
            liked: list.some(fav => fav?.title === state.movie?.title)
        }))

        persistence.save({ ...storageData, list: newList });

        setState(e => ({ ...e, list: newState }));
    }

    async function getMovie () {

        let response;
        try {
            response = await fetch('http://localhost:3001/recomendation', {
                method: 'POST',
                body: JSON.stringify({
                    question: params.name
                }),
                headers: {
                    'Content-Type': 'application/json',
                  },
            });
        } catch (error) {
            console.log(error)
        }
        const body = await response.json();
        console.log("Body", body)
        setState(e => ({ 
            ...e,
            loading: false,
            movie: body
        }));
    }

    return (
        <StyledComponents.Wrapper>
            {
                state.loading
                ? <p>Carregando...</p>
                : <StyledComponents.Container>
                <StyledComponents.MovieImageContainer>
                    {/* <StyledComponents.MovieImage src={state.movie.image_url} /> */}
                    <h3>Tags</h3>
                    <StyledComponents.TagContainer>
                        {
                            state.movie.tags
                            .filter((_, i) => i < 6)
                            .map(e => (<Components.Tag name={e} />))
                        }
                    </StyledComponents.TagContainer>
                </StyledComponents.MovieImageContainer>
                <StyledComponents.InformationContainer>
                    <h3>{state.movie.title}</h3>
                    <p>{state.movie.description}</p>
                    <h4>Recomendação:</h4>
                    <p>{state.movie.recommendation}</p>
                    <Components.Button onClick={toggleFavorite}>
                        {
                            (list || []).find(e => e?.title === state.movie.title) 
                            ? 'Remover da minha lista'
                            : 'Colocar na minha lista'
                        }
                    </Components.Button>
                </StyledComponents.InformationContainer>
            </StyledComponents.Container>
            }
        </StyledComponents.Wrapper>
    );
};