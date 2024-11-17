import styled from "styled-components";

export const Container = styled.div`
    width: 90%;
    height: 120px;

    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    padding: 20px 0 ;
    border: 1px solid rgba(0, 0, 0, 0.4);
    border-radius: 10px;
    
    cursor: pointer;

    transition: all ease 0.5s ;

    &:hover {
        transform: scale(1.020);
    }
    
    & > img {
        width: 150px;
        height: 100%;
        object-fit: contain;
    }
`;

export const InformationContainer = styled.div`
    width: calc(100%);
    padding: 20px;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    

    & > h3 {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 24px;
    }

    & > p {
        overflow-y: auto;

        &::-webkit-scrollbar {
            display: none;
        }
    }

    & > h3, p {
        margin: 0;
        width: 100%;
        text-overflow: ellipsis;
    }
`;