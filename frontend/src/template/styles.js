import styled from "styled-components";

export const Container = styled.div`
    width: 100vw;
    height: 100vh;

    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 10% 90%;
    grid-template-areas: "header"
                         "content";
`;