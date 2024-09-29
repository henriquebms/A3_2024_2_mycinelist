import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const AboutContainer = styled.div`
    width: 50%;
    height: 80%;
    padding: 30px;
    background-color: rgba(0, 0, 0, 0.06);
    border-radius: 10px;
    text-align: start;
    overflow-y: auto;

    & > p {
        font-size: 20px;
    }

    & > h3 {
        text-align: center;
        font-size: 24px;
    }
`;