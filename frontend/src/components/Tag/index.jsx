import React from 'react';
import styled from 'styled-components';

const TagComponent = styled.div`
    width: fit-content;
    height: 15px;
    padding: 6px 15px;
    color: white;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100px;
    background-color: #659eb4;
`;

const Tag = props => {
    return (
        <TagComponent>
            #{props.name}
        </TagComponent>
    );
}

export default Tag;