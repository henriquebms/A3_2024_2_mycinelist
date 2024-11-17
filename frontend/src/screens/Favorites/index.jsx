import React from 'react';
import * as StyledComponents from './styles';
import persistence from 'services/persistence';
import { ListItem } from './ListItem';

export const Favorites = props => {

    const { list, ...storageData } = persistence.get();

    const [state, setState] = React.useState({
        list: list,
    });

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
    
    console.log('ss', state)
    return (
        <StyledComponents.Wrapper>
            <StyledComponents.Container>
                <StyledComponents.RecomendationList>
                    {
                        state.list.map(e => <ListItem item={e} toggleLiked={toggleLiked} />)
                    }
                </StyledComponents.RecomendationList>
            </StyledComponents.Container>
        </StyledComponents.Wrapper>
    );
}