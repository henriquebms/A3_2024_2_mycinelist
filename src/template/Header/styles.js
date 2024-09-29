import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 100%;
    background-color: black;
    grid-area: header;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
`;

export const NavContainer = styled.div`
    width: 200px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    & img {
        width: 100px;
        height: 100%;
    }

    & > span {
        font-size: 20px;
        color: ${({ selected }) => selected ? 'black' : 'white'};
    }
    ${({ selected }) => selected && ` background-color: white; `}
`;