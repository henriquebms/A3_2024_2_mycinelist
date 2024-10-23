import { motion } from "framer-motion";
import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    overflow-x: hidden;
    position: relative;
    & > h3 {
        font-size: 30px;
        text-align: center;
    }
`;

export const AbsoluteButton = styled.div`
    position: relative;
    top: 350px;
`;

export const AboutContainer = styled(motion.div)`
    width: 50%;
    height: 60%;
    padding: 30px;
    background-color: rgba(0, 0, 0, 0.06);
    border-radius: 10px;
    text-align: start;
    overflow-y: auto;
    position: absolute;
    & > p {
        font-size: 20px;
    }

    & > h3 {
        font-size: 26px;
        text-align: center;
    }
`;

export const ChooseWrapper = styled(motion.div)`
    align-items: center;
    justify-content: center;
    position: absolute;
    opacity: 0;
`;

export const ChooseContainer = styled(motion.div)`
    width: 850px;
    height: 200px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
`;

export const ChooseContent = styled.div`
    width: 400px;
    height: 100px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: black;
    color: white;
    font-size: 20px;
    cursor: pointer;
    transition: ease 0.5s;

    &:hover {
        transform: scale(1.025);
    }
`;