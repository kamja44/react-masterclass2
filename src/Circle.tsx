import styled from "styled-components";
import { StringLiteral } from "typescript";
import React from "react";

interface ContainerProps{
    bgColor: string;
    borderColor: string;
}
interface CircleProps{
    bgColor: string;
    borderColor?: string;
}

const Container = styled.div<ContainerProps>`
    width: 200px;
    height: 200px;
    background-color: ${(props) => props.bgColor};
    border-radius: 50%;
    border: 1px solid ${props => props.borderColor};
`

function Circle({bgColor, borderColor}: CircleProps){
    const [value, setValue] = React.useState<number | string>(0);
    setValue(2)
    setValue("hello")
    return(
        //  ?? <- 기본값 설정
        <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}> 
        </Container>
    );
}

export default Circle;