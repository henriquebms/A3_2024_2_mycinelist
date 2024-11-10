import React from 'react';
import { useParams } from 'react-router-dom';
import * as StyledComponents from './styles';
import * as Components from '../../components';
import persistence from 'services/persistence';

export const Recomendation = props => {

    const { list, ...storageData } = persistence.get();

    const [state, setState] = React.useState({
        list: list
    })

    console.log(storageData, list)

    const movie = {
        "title": "Inception",
        "recomendation": "Inception é um thriller de ficção científica dirigido por Christopher Nolan, lançado em 2010. O filme acompanha Dom Cobb, um ladrão que invade sonhos para roubar segredos valiosos. Ele é oferecido uma chance de redimir seu passado ao realizar uma tarefa complexa: plantar uma ideia na mente de alguém. Com uma equipe especializada, Cobb embarca em uma missão que desafia a realidade e os limites do subconsciente, enquanto enfrenta seus próprios demônios internos.",
        "description": "Inception é um thriller de ficção científica dirigido por Christopher Nolan, lançado em 2010. O filme acompanha Dom Cobb, um ladrão que invade sonhos para roubar segredos valiosos. Ele é oferecido uma chance de redimir seu passado ao realizar uma tarefa complexa: plantar uma ideia na mente de alguém. Com uma equipe especializada, Cobb embarca em uma missão que desafia a realidade e os limites do subconsciente, enquanto enfrenta seus próprios demônios internos.",
        "image_url": "https://m.media-amazon.com/images/I/91kFYg4fX3L._AC_SY679_.jpg",
        "tags": ["sci-fi", "space travel", "black holes", "time dilation", "relativity", "future of Earth", "human survival", "love", "family bonds", "exploration", "wormholes", "astronauts", "alien planets", "Nolan", "epic visuals", "space-time", "AI robots"]
    }

    const params = useParams();

    const toggleFavorite = () => {
        
        let newList = state.list;

        if(state.list.find(e => e === movie.title)) {
            newList = state.list.filter(e => e !== movie.title);
        } else {
            newList.push(movie.title);
        }

        newList = Object.values([
            ...newList || []
        ].reduce((o, k) => (o[k] = k, o), {}));

        persistence.save({ ...storageData, list: newList });

        setState(e => ({ ...e, list: newList }));

    }

    return (
        <StyledComponents.Wrapper>
            <StyledComponents.Container>
                <StyledComponents.MovieImageContainer>
                    <StyledComponents.MovieImage src={movie.image_url} />
                    <StyledComponents.TagContainer>
                        {
                            movie.tags
                            .filter((_, i) => i < 6)
                            .map(e => (<Components.Tag name={e} />))
                        }
                    </StyledComponents.TagContainer>
                </StyledComponents.MovieImageContainer>
                <StyledComponents.InformationContainer>
                    <h3>{movie.title}</h3>
                    <p>{movie.description}</p>
                    <h4>Recomendação:</h4>
                    <p>{movie.recomendation}</p>
                    <Components.Button onClick={toggleFavorite}>
                        {
                            (state.list || []).find(e => e === movie.title) 
                            ? 'Remover da minha lista'
                            : 'Colocar na minha lista'
                        }
                    </Components.Button>
                </StyledComponents.InformationContainer>
            </StyledComponents.Container>
        </StyledComponents.Wrapper>
    );
};