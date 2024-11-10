import React from 'react';
import * as StyledComponents from './styles';
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import Persistence from 'services/persistence';
import { useNavigate } from 'react-router-dom';

export function ListItem (props) {

    const nav = useNavigate();

    async function toggleLiked (evt) {
        evt.stopPropagation();
        const newData = [...Persistence.get()]
            .map(e => ({ 
                ...e, 
                liked: props?.item.id === e.id 
                ? !!props?.item?.liked 
                : e.liked 
            }));
        
        Persistence.save(newData);
        
    }

    async function openDetails () {
        nav('/recomendations/' + props.item.title);
    }

    return (
        <StyledComponents.Container onClick={openDetails}>
            <img src={props?.item?.image_url} alt={"imagem do filme: " + props?.item?.title} />
            <StyledComponents.InformationContainer>
                <h3>
                    {props?.item?.title || 'Desconhecido...'}
                    {
                        props?.item?.liked
                        ? <FaHeart color='red' onClick={toggleLiked}/> 
                        : <FaRegHeart onClick={toggleLiked}/>
                    }
                </h3>
                <p>{props?.item?.description || '...'}</p>
            </StyledComponents.InformationContainer>
        </StyledComponents.Container>
    );
}