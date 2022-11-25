import styled from "styled-components";
import { StringLiteral } from "typescript";

interface ContainerProps{
    bgColor: string;
    borderColor: string;
}
interface CircleProps{
    bgColor: string;
    borderColor?: string;
    text ?: string;
}

const Container = styled.div<ContainerProps>`
    width: 200px;
    height: 200px;
    background-color: ${(props) => props.bgColor};
    border-radius: 50%;
    border: 1px solid ${props => props.borderColor};
`

function Circle({bgColor, borderColor, text = "default Value"}: CircleProps){
    return(
        //  ?? <- 기본값 설정
        <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}> 
            {text}
        </Container>
    );
}

export default Circle;