import styled from "styled-components";

export const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Container = styled.div`
    width: 60%;
    height: 85%;
    border: 1px solid rgba(0, 0, 0, 0.4);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
`;

export const Header = styled.div`
    width: 90%;
    display: flex;
    flex-direction: row;
    gap: 20px;
    margin-top: 30px;
`;

export const RecomendationList = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    overflow-y: auto;

    & > :first-child {
        margin-top: 10px;
    }

    &::-webkit-scrollbar {
        width: 0;
        height: 0;
        opacity: 0;
    }
`;