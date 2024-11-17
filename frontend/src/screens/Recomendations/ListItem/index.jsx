import React from 'react';
import * as StyledComponents from './styles';
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import Persistence from 'services/persistence';
import { useNavigate } from 'react-router-dom';
import persistence from 'services/persistence';

export function ListItem (props) {

    const nav = useNavigate();
    const { list, ...storageData } = persistence.get();

    const toggleLiked = (evt) => {
        evt.stopPropagation();
        props.toggleLiked(props.item);
    }

    async function openDetails () {
        nav('/recomendations/' + props.item.title);
    }

    function isFavorite () {
        return list.find(e => e === props?.item?.title);
    }

    return (
        <StyledComponents.Container onClick={openDetails}>
            <StyledComponents.InformationContainer>
                <h3>
                    {props?.item?.title || 'Desconhecido...'}
                    {
                        isFavorite()
                        ? <FaHeart color='red' onClick={toggleLiked}/> 
                        : <FaRegHeart onClick={toggleLiked}/>
                    }
                </h3>
                <p>{props?.item?.description || '...'}</p>
            </StyledComponents.InformationContainer>
        </StyledComponents.Container>
    );
}