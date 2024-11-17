import styled from "styled-components";

export const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Container = styled.div`
    width: 70%;
    height: 85%;
    border: 1px solid rgba(0, 0, 0, 0.4);
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 20px;
    gap: 30px;
`;

export const MovieImage = styled.img`
    object-fit: fill;
    width: 250px;
    border-radius: 10px;
`;

export const MovieImageContainer = styled.div`
    width: 250px;
    height: 100%;

    display: flex;
    flex-direction: column;
    gap: 15px;

    & > h3 {
        margin: 0;
    }
`;

export const InformationContainer = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 10px;

    display: flex;
    flex-direction: column;
    padding: 0 20px;

    & > h3 {
        font-size: 24px;
        margin: 0;
    }

    & > h4 {
        font-size: 20px;
        margin: 0;
    }

    & > :last-child {
        margin-top: auto;
    }
`;

export const TagContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 10px;
`;